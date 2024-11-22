using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetroKits.Database;
using RetroKits.Models;
using RetroKits.Repository;
using System.Security.Claims;

namespace RetroKits.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ReviewController : Controller
{
    private readonly MyDbContext _dbContext;

    public ReviewController(MyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // GET: api/product
    [HttpPost("CreateReview")]

    public IActionResult CreateReview([FromBody] ReviewDto review)
    {
        // Comprueba que la reseña no sea vacia
        if (string.IsNullOrWhiteSpace(review.Comment))
        {
            return BadRequest("La reseña no puede estar vacia");
        }

        // Comprueba que el producto existe buscando por su ID
        var product = _dbContext.Products.Find(review.ProductId);
        if (product == null) 
        {
            return NotFound("Producto no encontrado");
        }

        // Buscar en el token el id del usuario autenticado
        var userId = int.Parse(User.FindFirstValue("id"));
        var user = _dbContext.Users.Find(userId);
        if (user == null)
        {
            return NotFound("Usuario no encontrado");
        }

        var newReview = new Review
        {
            Comment = review.Comment,
            ProductId = review.ProductId,
            UserId = userId,
        };

        _dbContext.Reviews.Add(newReview);
        _dbContext.SaveChanges();

        return Ok(new {Message = "Reseña registrada con éxito"});
    }

    [HttpGet("review{productId}")]
    public IActionResult ObtenerReview([FromRoute] int productId)
    {
        var review = _dbContext.Reviews
            .Where(r => r.ProductId == productId)
            .Select(r => new
            {
                r.User.Name,
                r.Comment,
                r.DateCreated,
            })
            .ToList();

        if (review == null)
        {
            return NotFound("No hay reseñas para este producto");
        }

        return Ok(review);
    }
}
