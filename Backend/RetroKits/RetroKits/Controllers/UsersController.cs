using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroKits.Database;
using RetroKits.Models;
using RetroKits.Repository;
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

    [HttpPut("UpdateItem/{userId}")]
    public IActionResult UpdateUser([FromRoute] int userId, [FromBody] UserDto changes)
    {
        var existingUser = _dbContext.Users.SingleOrDefault(o => o.Id == userId);

        if (existingUser == null)
        {
            return NotFound("No se encontró el usuario.");
        }

        if (!string.IsNullOrEmpty(changes.Name)) 
        {
            existingUser.Name = changes.Name;
        }
        if (!string.IsNullOrEmpty(changes.Addres))
        {
            //existingUser = changes.Addres;
        }
        if (!string.IsNullOrEmpty(changes.Email))
        {
            existingUser.Email = changes.Email;
        }

        _dbContext.SaveChanges();

        return Ok("Usuario actualizado correctamente.");
    }

    [HttpDelete("DeleteUser")]
    public IActionResult DeleteUser()
    {
        var userId = int.Parse(User.FindFirstValue("id"));

        var user = _dbContext.Users.FirstOrDefault(o => o.Id == userId);

        _dbContext.Users.Remove(user);        
        _dbContext.SaveChanges();

        return Ok("Usuario eliminado exitosamente.");
    }
}
