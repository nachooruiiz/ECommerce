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
                    Name = "1973 VIBERTI -  Camiseta fútbol retro ",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/17.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1970 BRAZIL - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/2.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1993 MARCEL SABOU - Camiseta ",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/3.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1909 REAL SOCIEDAD  - Camiseta",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/4.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 CHINA - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/5.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1982 ARGELIA - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/6.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1986 ARGENTINA World Cup ",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/7.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1970 ATLÉTICO DE MADRID Home",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/8.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1899 BLAUGRANA - Camiseta fútbol ",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/9.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = " 1908 INTER NERAZZURRI - Camiseta ",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/10.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1892 REDS - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/11.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 ITALY - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/12.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1974 GRANADA CF - Camiseta fútbol",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/13.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 FRANCE - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/14.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1958 PELE Santos Away - Camiseta",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/15.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1935 BOCA JUNIORS M/CORTA ",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/16.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1946 ISIDRO LÁNGARA. Camiseta Real Oviedo",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/18.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 SPAIN - Jersey Fútbol Retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/19.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1966 PORTUGAL - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/20.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1968 RED DEVILS - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "http://localhost:7261/21.jpg",
                    Price = "49,99"
                },
            ];

        _dbContext.Products.AddRange(products);
        _dbContext.SaveChanges();
    }
}