using F23.StringSimilarity;
using Microsoft.AspNetCore.Mvc;
using RetroKits.Database;
using RetroKits.Services;

namespace RetroKits.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SmartSearchController : ControllerBase
{
    private readonly MyDbContext _dbContext;
    public SmartSearchController(MyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IEnumerable<Product> Search([FromQuery] string query, [FromQuery] string option = "none")
    {
        SmartSearchService smartSearchService = new SmartSearchService(_dbContext);

        return smartSearchService.Search(query, option);
    }
}
