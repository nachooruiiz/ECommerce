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
                    ImageUrl = "https://localhost:7261/Images/17.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1970 BRAZIL - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/2.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1993 MARCEL SABOU - Camiseta ",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/3.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1909 REAL SOCIEDAD  - Camiseta",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/4.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 CHINA - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/5.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1982 ARGELIA - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/6.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1986 ARGENTINA World Cup ",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/7.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1970 ATLÉTICO DE MADRID Home",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/8.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1899 BLAUGRANA - Camiseta fútbol ",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/9.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = " 1908 INTER NERAZZURRI - Camiseta ",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/10.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1892 REDS - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/11.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 ITALY - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/12.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1974 GRANADA CF - Camiseta fútbol",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/13.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 FRANCE - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/14.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1958 PELE Santos Away - Camiseta",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/15.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1935 BOCA JUNIORS M/CORTA ",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/16.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1946 ISIDRO LÁNGARA. Camiseta Real Oviedo",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/18.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 SPAIN - Jersey Fútbol Retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/19.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1966 PORTUGAL - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/20.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1968 RED DEVILS - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "https://localhost:7261/Images/21.jpg",
                    Price = "49,99"
                },
            ];

        _dbContext.Products.AddRange(products);
        _dbContext.SaveChanges();
    }
}