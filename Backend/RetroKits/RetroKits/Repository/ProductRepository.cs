using RetroKits.Database;

namespace RetroKits.Repository;

public class ProductRepository : Repository<Product>
{
    public ProductRepository(MyDbContext context) : base(context)
    {
    }
}
