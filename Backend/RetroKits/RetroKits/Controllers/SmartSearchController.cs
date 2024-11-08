using F23.StringSimilarity;
using Microsoft.AspNetCore.Mvc;
using RetroKits.Database;
using RetroKits.Services;
using System.Collections.Generic;

namespace RetroKits.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmartSearchController : ControllerBase
    {
        private readonly SmartSearchService _smartSearchService;

        // Inyección de dependencia para SmartSearchService
        public SmartSearchController(SmartSearchService smartSearchService)
        {
            _smartSearchService = smartSearchService;
        }

        // Endpoint para realizar búsqueda con filtro y ordenación
        [HttpGet]
        public ActionResult<IEnumerable<Product>> Search([FromQuery] string? query, [FromQuery] string option = "none", [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var products = _smartSearchService.Search(query, option, page, pageSize);

            return Ok(products);
        }
    }
}
