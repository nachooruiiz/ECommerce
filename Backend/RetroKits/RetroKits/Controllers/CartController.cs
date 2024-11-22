namespace RetroKits.Controllers
{
    using global::RetroKits.Database;
    using global::RetroKits.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Security.Claims;

    namespace RetroKits.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        //[Authorize]
        public class CartController : ControllerBase
        {
            private readonly MyDbContext _context;

            public CartController(MyDbContext context)
            {
                _context = context;
            }

            // Obtener el carrito del usuario actual
            [HttpGet]
            public IActionResult GetCart()
            {
                if(User.FindFirstValue("id") == null)
                {
                    return Ok();
                }
                // Obtener el ID del usuario desde el token
                var userId = int.Parse(User.FindFirstValue("id"));

                // Buscar el carrito del usuario
                var cart = _context.Carts
                    .Where(c => c.UserId == userId)
                    .Select(c => new
                    {
                        c.Id,
                        Items = c.Items.Select(i => new
                        {
                            i.ProductId,
                            i.Product.Name,
                            i.Quantity,
                            i.Product.Price,
                            i.Product.Stock,
                            i.Product.ImageUrl,
                        })
                    })
                    .FirstOrDefault();

                if (cart == null)
                {
                    return NotFound("No se encontró un carrito para este usuario.");
                }

                return Ok(cart);
            }

            // Agregar un producto al carrito
            [HttpPost("AddItem")]
            public IActionResult AddItem([FromBody] CartItemDto itemDto)
            {
                if (User.FindFirstValue("id") == null)
                {
                    var carritoLocal = new[]
                    {
                        itemDto.ProductId,
                        itemDto.Quantity,
                    };
                    return Ok("Producto agregado al carrito.");
                }

                var userId = int.Parse(User.FindFirstValue("id"));

                // Buscar el producto en la base de datos
                var product = _context.Products.FirstOrDefault(p => p.Id == itemDto.ProductId);
                if (product == null)
                {
                    return NotFound("Producto no encontrado.");
                }

                // Verificar si hay suficiente stock
                if (product.Stock < itemDto.Quantity)
                {
                    return BadRequest($"Solo hay {product.Stock} unidades disponibles en stock.");
                }

                // Buscar el carrito del usuario o crear uno nuevo
                var cart = _context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefault(c => c.UserId == userId);
                if (cart == null)
                {
                    cart = new Cart { UserId = userId };
                    _context.Carts.Add(cart);
                    _context.SaveChanges();
                }

                // Verificar si el producto ya está en el carrito
                var existingItem = cart.Items.SingleOrDefault(i => i.ProductId == itemDto.ProductId);

                if (existingItem != null)
                {
                    // Comprobar si la cantidad total excede el stock disponible
                    if (product.Stock < existingItem.Quantity + itemDto.Quantity)
                    {
                        return BadRequest($"No puedes agregar esa cantidad. Stock restante: {product.Stock - existingItem.Quantity}.");
                    }

                    // Incrementar la cantidad en el carrito
                    existingItem.Quantity += itemDto.Quantity;
                }
                else
                {
                    // Agregar un nuevo producto al carrito
                    var newItem = new CartItem
                    {
                        ProductId = itemDto.ProductId,
                        Quantity = itemDto.Quantity,
                        CartId = cart.Id
                    };
                    cart.Items.Add(newItem);
                }

                _context.SaveChanges();
                return Ok("Producto agregado al carrito.");
            }


            // Actualizar la cantidad de un producto en el carrito
            [HttpPut("UpdateItem")]
            public IActionResult UpdateItem([FromBody] CartItemDto itemDto)
            {
                var userId = int.Parse(User.FindFirstValue("id"));

                var cart = _context.Carts.Include(c => c.Items).FirstOrDefault(c => c.UserId == userId);

                if (cart == null)
                {
                    return NotFound("No se encontró un carrito para este usuario.");
                }

                var item = cart.Items.SingleOrDefault(i => i.ProductId == itemDto.ProductId);
                if (item == null)
                {
                    return NotFound("El producto no está en el carrito.");
                }

                item.Quantity = itemDto.Quantity;
                _context.SaveChanges();

                return Ok("Cantidad actualizada.");
            }

            // Eliminar un producto del carrito
            [HttpDelete("RemoveItem/{productId}")]
            public IActionResult RemoveItem([FromRoute] int productId)
            {
                var userId = int.Parse(User.FindFirstValue("id"));

                var cart = _context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefault(c => c.UserId == userId);
                if (cart == null)
                {
                    return NotFound("No se encontró un carrito para este usuario.");
                }

                var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);
                if (item == null)
                {
                    return NotFound("El producto no está en el carrito.");
                }

                cart.Items.Remove(item);
                _context.SaveChanges();

                return Ok("Producto eliminado del carrito.");
            }

            // Vaciar el carrito
            [HttpDelete("ClearCart")]
            public IActionResult ClearCart()
            {
                var userId = int.Parse(User.FindFirstValue("id"));

                // Buscar el carrito del usuario
                var cart = _context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefault(c => c.UserId == userId);

                if (cart == null)
                {
                    return NotFound("No se encontró un carrito para este usuario.");
                }

                // Eliminar todos los elementos del carrito
                cart.Items.Clear();
                _context.SaveChanges();

                return Ok("Carrito vaciado con éxito.");
            }

            // Sincronizar carritos del local storage y usuario
            [HttpPost("Synchronize")]
            [Authorize]
            public async Task<IActionResult> SynchronizeCart([FromBody] List<CartItemDto> items)
            {
                var userId = int.Parse(User.FindFirstValue("id"));

                if (userId == null)
                {
                    return Unauthorized(new { message = "Usuario no autorizado." });
                }

                foreach (var item in items)
                {
                    var existingItem = await _context.CartItems
                        .FirstOrDefaultAsync(ci => ci.ProductId == item.ProductId && ci.UserId == userId);

                    if (existingItem != null)
                    {
                        existingItem.Quantity += item.Quantity;
                    }
                    else
                    {
                        var newItem = new CartItem
                        {
                            UserId = userId,
                            ProductId = item.ProductId,
                            Quantity = item.Quantity
                        };
                        _context.CartItems.Add(newItem);
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Carrito sincronizado con éxito." });
            }
        }

        
    }

}
