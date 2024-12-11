using RetroKits.Database;

namespace RetroKits.Models;

public class UserDto
{
    public string Name {  get; set; }
    public string Email { get; set; }
    public string Addres { get; set; }
    public string Password { get; set; }
    public string? Birthday { get; set; }
    public ICollection<Order> Orders { get; set; }
}
