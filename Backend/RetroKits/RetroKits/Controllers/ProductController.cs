using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RetroKits.Database;
using RetroKits.Models;
using RetroKits.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace RetroKits.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ProductRepository _productRepository;
    private readonly MyDbContext _dbContext;

    public ProductController(IConfiguration configuration, ProductRepository productRepository, MyDbContext dbContext)
    {
        _productRepository = productRepository;
        _dbContext = dbContext;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _productRepository.GetAllAsync();
    }

    // Función para crear los productos
    [HttpPost("registroproduct")]
    public ActionResult<string> RegistroProdutc([FromBody] ProductDto data)
    {
        // 1. Comprobar si el producto ya existe
        var existingProduct= _dbContext.Products.SingleOrDefault(u => u.Name == data.Name);

        if (existingProduct != null)
        {
            return NotFound(data);
        }

        // 2. Si el producto no existe se crea y se añada a la base de datos
        var newProduct = new Product
        {
            Name = data.Name,
            Price = data.Price,
            Description = data.Description,
            ImageUrl = data.ImageUrl,
        };

        _dbContext.Products.Add(newProduct);
        _dbContext.SaveChanges();

        return Ok();
    }
}
