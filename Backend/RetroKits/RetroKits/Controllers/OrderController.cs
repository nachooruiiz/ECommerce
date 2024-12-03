using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroKits.Database;
using RetroKits.Models;
using System.Security.Claims;

namespace RetroKits.Controllers;
[Route("api/[controller]")]
[ApiController]
public class OrderController : Controller
{
    private readonly MyDbContext _context;

    public OrderController(MyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetOrder()
    {
        
       
        if (User.FindFirstValue("id") == null)
        {
            return BadRequest("No has hecho ningún pedido todavía");
        }

        var userId = int.Parse(User.FindFirstValue("id"));

        var orders = _context.Orders
                .Where(c => c.UserId == userId)
                .Select(o => new
                {
                    OrderId = o.Id,
                    OrderDate = o.Date,
                    TotalAmount = o.TotalAmount,
                    Items = o.Items.Select(oi => new
                    {
                        OrderId = oi.OrderId,
                        ProductId = oi.ProductId,
                        ProductName = oi.Product.Name,
                        ProductUrl = oi.Product.ImageUrl,
                        Quantity = oi.Quantity,
                        ProductPrice = oi.Price
                    })
                })
                .ToList();

        return Ok(orders);
    }

    [HttpPost("AddOrder")]
    public IActionResult AddOrder([FromBody] OrderItemDto OrderDto) 
    {
       
        // Comprobar si el usuario tiene la sesión iniciada
        if (User.FindFirstValue("id") == null)
        {
           return BadRequest("Hay que tener la sesión iniciada para realizar el pedido");
        }

        var userId = int.Parse(User.FindFirstValue("id"));

        // Se comprueba que el producto existe en la base de datos
        var product = _context.Products.FirstOrDefault(p => p.Id == OrderDto.ProductId);
        if (product == null)
        {
            return NotFound("Producto no encontrado.");
        }

        var productPrice = float.Parse(product.Price);

        var newOrder = new Order
        {
            UserId = userId,
            Date = DateTime.Now,
            TotalAmount = productPrice * OrderDto.Quantity,
            Items = new List<OrderItem>(),
        };

        var pedidoItem = new OrderItem
        {
            ProductId = OrderDto.ProductId,
            Quantity = OrderDto.Quantity,
            Price = product.Price,
        };

        newOrder.Items.Add(pedidoItem);

        product.Stock -= OrderDto.Quantity;

        _context.Orders.Add(newOrder);
        _context.SaveChanges();

        return Ok(new
        {
            Message = "Pedido realizado correctamente",
            OrderId = newOrder.Id,
            TotalAmount = newOrder.TotalAmount,
        });
    }

}
