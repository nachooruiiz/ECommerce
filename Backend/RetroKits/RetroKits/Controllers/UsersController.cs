using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RetroKits.Database;
using RetroKits.Repository;

namespace RetroKits.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly UserRepository _userRepository;

    public UsersController(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _userRepository.GetAllAsync();
    }

}
