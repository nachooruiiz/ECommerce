using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroKits.Database;
using RetroKits.Models;
using RetroKits.Repository;
using System.Net;
using System.Security.Claims;

namespace RetroKits.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly UserRepository _userRepository;
    private readonly MyDbContext _dbContext;

    public UsersController(UserRepository userRepository, MyDbContext dbContext)
    {
        _userRepository = userRepository;
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _userRepository.GetAllAsync();
    }

    [HttpPut("UpdateData")]
    public IActionResult UpdateUser([FromBody] UserDto changes)
    {

        var userId = int.Parse(User.FindFirstValue("id"));
        if (userId == 0)
        {
            return BadRequest("Para poder modificar un usuario tienes que ser administrador");
        }

        var existingUser = _dbContext.Users.SingleOrDefault(o => o.Id == userId);        

        if (existingUser == null)
        {
            return NotFound("No se encontró el usuario.");
        }

        if (!string.IsNullOrEmpty(changes.Email))
        {
            existingUser.Email = changes.Email;
        }
        if (!string.IsNullOrEmpty(changes.Addres))
        {
            existingUser.Address = changes.Addres;
        }
        if (!string.IsNullOrEmpty(changes.Name))
        {
            existingUser.Name = changes.Name;
        }
        if (!string.IsNullOrEmpty(changes.Password))
        {
            existingUser.Password = changes.Password;
        }
        if (!string.IsNullOrEmpty(changes.Birthday))
        {
            existingUser.Birthday = changes.Birthday;
        }


        _dbContext.SaveChanges();

        return Ok("Usuario actualizado correctamente.");
    }



    [HttpPut("ChangeRole/{userId}")]
    public IActionResult ChangeRole([FromRoute] int userId, [FromBody] AdminDto changes)
    {

        var userRole = User.FindFirstValue(ClaimTypes.Role);
        if (userRole != "Admin") 
        {
            return BadRequest("Para poder modificar un usuario tienes que ser administrador");
        }

        var existingUser = _dbContext.Users.SingleOrDefault(o => o.Id == userId);

        if (existingUser == null)
        {
            return NotFound("No se encontró el usuario.");
        }

        if (!string.IsNullOrEmpty(changes.Rol))
        {
            existingUser.Role = changes.Rol;
        }

        _dbContext.SaveChanges();

        return Ok("Usuario actualizado correctamente.");
    }

    [HttpDelete("DeleteUser")]
    public IActionResult DeleteUser()
    {
        var userRole = User.FindFirstValue(ClaimTypes.Role);
        if (userRole != "Admin")
        {
            return BadRequest("Para poder modificar un usuario tienes que ser administrador");
        }

        var userId = int.Parse(User.FindFirstValue("id"));

        var user = _dbContext.Users.FirstOrDefault(o => o.Id == userId);

        _dbContext.Users.Remove(user);        
        _dbContext.SaveChanges();

        return Ok("Usuario eliminado exitosamente.");
    }

    [HttpGet("GetCurrentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUserAsync()
    {
        try
        {

            var userId = int.Parse(User.FindFirstValue("id"));

            // Obtener el usuario desde la base de datos
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("No se encontró el usuario.");
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error interno del servidor: {ex.Message}");
        }
    }



}
