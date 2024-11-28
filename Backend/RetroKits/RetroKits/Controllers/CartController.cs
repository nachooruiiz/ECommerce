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
            private object? product;

            public CartController(MyDbContext context)
            {
                _context = context;
            }

            // Obtener el carrito del usuario actual
            [HttpGet]
            public IActionResult GetCart()
            {
                var userId = 1;
                // Comprobar que el usuario tiene sesión iniciada
                if (userId == null)
                {
                    var localCartItems = HttpContext.Request.Headers["localCart"];
                    if (string.IsNullOrEmpty(localCartItems))
                    {
                        return BadRequest("No hay productos en el carrito local.");
                    }
                    var localCart = System.Text.Json.JsonSerializer.Deserialize<List<CartItemDto>>(localCartItems);
                    var IdList = localCart.Select(p => p.ProductId);

                    foreach(var id in IdList) {
                        var product = _context.Products.Where(p => p.Id == id)
                            .Select(p => new
                            {
                                p.Name,
                                p.Price,
                                p.ImageUrl,
                                quantity = localCart.FirstOrDefault(item => item.ProductId == p.Id)
                            });
                    }

                    return Ok(product);
                }

                // Obtener el ID del usuario desde el token
                //var userId = int.Parse(User.FindFirstValue("id"));

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

                // Si el usuario no está registrado se crea un carrito local con el id y la cantidad de producto
                if (User.FindFirstValue("id") == null)
                {
                    var localCart = new List<object>
                    {
                        itemDto.ProductId,
                        itemDto.Quantity,
                    };

                    return Ok(localCart);
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

                var cart = _context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefault(c => c.UserId == userId);
                if (cart == null)
                {
                    return NotFound("No se encontró un carrito para este usuario.");
                }

                var item = cart.Items.FirstOrDefault(i => i.ProductId == itemDto.ProductId);
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

            [HttpPost("SyncCart")]
            public IActionResult SyncCart([FromBody] List<CartItemDto> localProducts)
            {
                var userId = int.Parse(User.FindFirstValue("id"));

                // Se comprueba si el usuario tiene carrito y si no se crea
                var cart = _context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefault(c => c.UserId == userId);
                if (cart == null)
                {
                    cart = new Cart { UserId = userId };
                    _context.Carts.Add(cart);
                    _context.SaveChanges();
                }


                foreach (var localProduct in localProducts)
                {
                    // Buscar el producto en la base de datos
                    var product = _context.Products.FirstOrDefault(p => p.Id == localProduct.ProductId);
                    if (product == null)
                    {
                        return NotFound("Producto no encontrado.");
                    }

                    // Verificar si el producto ya está en el carrito
                    var existingItem = cart.Items.SingleOrDefault(i => i.ProductId == localProduct.ProductId);

                    // Verificar si hay suficiente stock
                    if (product.Stock < localProduct.Quantity)
                    {
                        return BadRequest($"Solo hay {product.Stock} unidades disponibles en stock.");
                    }

                    if (existingItem != null)
                    {
                        // Comprobar si la cantidad total excede el stock disponible
                        if (product.Stock < existingItem.Quantity + localProduct.Quantity)
                        {
                            return BadRequest($"No puedes agregar esa cantidad. Stock restante: {product.Stock - existingItem.Quantity}.");
                        }

                        // Incrementar la cantidad en el carrito
                        existingItem.Quantity += localProduct.Quantity;
                    }
                    else
                    {
                        // Agregar un nuevo producto al carrito
                        var newItem = new CartItem
                        {
                            ProductId = localProduct.ProductId,
                            Quantity = localProduct.Quantity,
                            CartId = cart.Id
                        };
                        cart.Items.Add(newItem);
                    }

                    _context.SaveChanges();
                }

                return Ok();
            }
        }

        
    }

}
