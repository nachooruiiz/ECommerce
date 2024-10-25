using Microsoft.EntityFrameworkCore;

namespace RetroKits.Database;

// Ponemos el email como único, no se puede repetir en la bd
[Index(nameof(Email), IsUnique = true)]
// Creamos la clase usuario con sus atributos correspondientes
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public string Rol { get; set; }
}
