namespace RetroKits.Database.Seeder;

public class Seeder
{
    private readonly MyDbContext _dbContext;
    public Seeder (MyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Seed()
    {
        Product[] products =
            [
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "http://localhost:puerto/ruta de la imagen",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                },
                new Product
                {
                    Name = "Malaga",
                    Description = "ymkumyukmg",
                    ImageUrl = "URL",
                    Price = "12"
                }
        ];
        _dbContext.Products.AddRange (products);
        _dbContext.SaveChanges();
    }
}
