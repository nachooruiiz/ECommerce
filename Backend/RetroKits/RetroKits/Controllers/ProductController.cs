using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RetroKits.Database;
using RetroKits.Models;
using RetroKits.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroKits.Controllers
{
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

        // GET: api/product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllAsync();

            // Mapeo de productos a ProductDto para enviar solo los campos necesarios al frontend
            var productDtos = products.Select(p => new ProductDto
            {
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Stock = p.Stock,
                Long_description = p.Long_description,
            });

            return Ok(productDtos);
        }

        [HttpGet("mostrarproduct")]
        public ActionResult<IEnumerable<ProductDto>> GetOneProduct([FromQuery] int id_product)
        {
            var producto = _dbContext.Products.SingleOrDefault(u => u.Id == id_product);

            if (producto != null)
            {
                return Ok(producto);
            }
            else
            {
                return Conflict("El producto no existe o no ha sido encontrado");
            }
        }

        // POST: api/product/registroproduct
        [HttpPost("registroproduct")]
        public ActionResult RegisterProduct([FromBody] ProductDto data)
        {
            // 1. Verificar si el producto ya existe
            var existingProduct = _dbContext.Products.SingleOrDefault(u => u.Name == data.Name);

            if (existingProduct != null)
            {
                return Conflict("El producto ya existe.");
            }

            // 2. Si el producto no existe, crearlo y añadirlo a la base de datos
            var newProduct = new Product
            {
                Name = data.Name,
                Price = data.Price,
                Description = data.Description,
                ImageUrl = data.ImageUrl,
                Stock = data.Stock,
                Long_description = data.Long_description,
            };

            _dbContext.Products.Add(newProduct);
            _dbContext.SaveChanges();

            return Ok("Producto registrado con éxito.");
        }
    }
}
