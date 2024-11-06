using RetroKits.Database;

namespace RetroKits.Services;

public class FilterService
{
    public IEnumerable<Product> SortProducts(IEnumerable<Product> products, string option)
    {
        return option switch
        {
            "PriceAsc" => products.OrderBy(p => p.Price),
            "PriceDesc" => products.OrderByDescending(p => p.Price),
            "NameAsc" => products.OrderBy(p => p.Name),
            "NameDesc" => products.OrderByDescending(p => p.Name),
            _ => products // Sin ordenar
        };
    }
}
