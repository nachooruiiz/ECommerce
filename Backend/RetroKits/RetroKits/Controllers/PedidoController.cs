using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroKits.Database;
using RetroKits.Models;
using System.Security.Claims;

namespace RetroKits.Controllers
{
    public class PedidoController : Controller
    {
        private readonly MyDbContext _context;

        public PedidoController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPedido()
        {
            return Ok();
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

            var newOrder = new Order
            {
                UserId = userId,
                Date = DateTime.Now,
                TotalAmount= OrderDto.TotalAmount,
                Items = new List<OrderItem>(),
            };

            var pedidoItem = new OrderItem
            {
                ProductId = OrderDto.ProductId,
                Quantity = OrderDto.Quantity,
                Price = OrderDto.Price,
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
}
