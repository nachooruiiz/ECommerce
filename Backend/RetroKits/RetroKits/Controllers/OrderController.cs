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
        var user = 1;
        //User.FindFirstValue("id")
        if ( user == null)
        {
            return BadRequest("No has hecho ningún pedido todavía");
        }

        //var userId = int.Parse(User.FindFirstValue("id"));

        var orders = _context.Orders
                .Where(c => c.UserId == user)
                .ToList();

        return Ok(orders);
    }

    [HttpPost("AddOrder")]
    public IActionResult AddOrder([FromBody] OrderItemDto OrderDto) 
    {
        var user = 1;
        // Comprobar si el usuario tiene la sesión iniciada
        if (user == null)
        {
           return BadRequest("Hay que tener la sesión iniciada para realizar el pedido");
        }

        //var userId = int.Parse(User.FindFirstValue("id"));

        // Se comprueba que el producto existe en la base de datos
        var product = _context.Products.FirstOrDefault(p => p.Id == OrderDto.ProductId);
        if (product == null)
        {
            return NotFound("Producto no encontrado.");
        }

        var newOrder = new Order
        {
            UserId = user,
            Date = DateTime.Now,
            TotalAmount= OrderDto.TotalAmount,
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
