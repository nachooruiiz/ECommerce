using System.ComponentModel.DataAnnotations;

namespace RetroKits.Database;

public class Review
{
    public int Id { get; set; }
    [Required]
    public int UserId { get; set; }
    public User User { get; set; }
    [Required]
    public int ProductId { get; set; }
    public Product Product { get; set; }
    [StringLength(1000, ErrorMessage = "La reseña no puede exceder de 1000 caracteres")]
    public string Comment { get; set; }
    [Range(1, 5)]
    public int Rating { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.Now;
}
