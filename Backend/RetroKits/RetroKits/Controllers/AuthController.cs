using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RetroKits.Database;
using RetroKits.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RetroKits.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly MyDbContext _dbContext;
    private readonly TokenValidationParameters _tokenParameters;

    public AuthController(IConfiguration configuration, MyDbContext dbContext, IOptionsMonitor<JwtBearerOptions> jwtOptions)
    {
        _configuration = configuration;
        _dbContext = dbContext;
        _tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme)
            .TokenValidationParameters;
    }

    [HttpPost("register")]
    public ActionResult<string> Register([FromBody] RegisterDto data)
    {
        // 1. Comprobar si el usuario ya existe
        var existingUser = _dbContext.Users.SingleOrDefault(u => u.Email == data.Email);

        if (existingUser != null)
        {
            return Conflict("El usuario ya está registrado.");
        }

        // 2. Crear un nuevo usuario si no existe
        var newUser = new User
        {
            Name = data.Name,
            Email = data.Email,
            Password = data.Password,
            Address = data.Address,
            Role = "user" // Rol por defecto para nuevos usuarios
        };

        _dbContext.Users.Add(newUser);
        _dbContext.SaveChanges();

        // 3. Crear las claims y el token JWT

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Claims = new Dictionary<string, object>
            {
                {"id", newUser.Id },
                {ClaimTypes.Name, newUser.Name },
                {ClaimTypes.Role, newUser.Role }
            },
            Expires = DateTime.UtcNow.AddDays(5),
            SigningCredentials = new SigningCredentials(
                _tokenParameters.IssuerSigningKey,
                SecurityAlgorithms.HmacSha256Signature)
        };

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
        string tokenString = tokenHandler.WriteToken(token);

        return Ok(tokenString);
    }

    // Función para el login
    [HttpPost("login")]
    public ActionResult<string> Login([FromBody] LoginDto data)
    {
        // 1. Comprobar si el usuario ya existe
        var existingUser = _dbContext.Users.SingleOrDefault(u => u.Email == data.Email);

        if (existingUser == null)
        {
            return NotFound(data);
        }
        if (existingUser.Password != data.Password)
        {
            return Unauthorized(data);
        }

        // 2. Crear las claims y el token JWT

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Claims = new Dictionary<string, object>
            {
                {"id", existingUser.Id },
                {ClaimTypes.Name, existingUser.Name },
                {ClaimTypes.Email, existingUser.Email },
                {ClaimTypes.Role, existingUser.Role }
            },
            Expires = DateTime.UtcNow.AddDays(5),
            SigningCredentials = new SigningCredentials(
                _tokenParameters.IssuerSigningKey,
                SecurityAlgorithms.HmacSha256Signature)
        };

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
        string tokenString = tokenHandler.WriteToken(token);

        return Ok(tokenString);

    }
}