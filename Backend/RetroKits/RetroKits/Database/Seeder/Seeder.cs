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
                    ImageUrl = "/Images/17.jpg",
                    Price = "59,99",
                    Stock = 4,
                    Long_description = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
                },
                new Product
                {
                    Name = "1970 BRAZIL - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/2.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1993 MARCEL SABOU - Camiseta ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/3.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1909 REAL SOCIEDAD  - Camiseta",
                    Description = "Retrokits",
                    ImageUrl = "/Images/4.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 CHINA - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/5.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1982 ARGELIA - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/6.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1986 ARGENTINA World Cup ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/7.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1970 ATLÉTICO DE MADRID Home",
                    Description = "Retrokits",
                    ImageUrl = "/Images/8.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1899 BLAUGRANA - Camiseta fútbol ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/9.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = " 1908 INTER NERAZZURRI - Camiseta ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/10.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1892 REDS - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/11.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 ITALY - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/12.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1974 GRANADA CF - Camiseta fútbol",
                    Description = "Retrokits",
                    ImageUrl = "/Images/13.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 FRANCE - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/14.jpg",
                    Price = "59,99"
                },
                new Product
                {
                    Name = "1958 PELE Santos Away - Camiseta",
                    Description = "Retrokits",
                    ImageUrl = "/Images/15.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1935 BOCA JUNIORS M/CORTA ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/16.jpg",
                    Price = "39,99"
                },
                new Product
                {
                    Name = "1946 ISIDRO LÁNGARA. Camiseta Real Oviedo",
                    Description = "Retrokits",
                    ImageUrl = "/Images/18.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1982 SPAIN - Jersey Fútbol Retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/19.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1966 PORTUGAL - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/20.jpg",
                    Price = "49,99"
                },
                new Product
                {
                    Name = "1968 RED DEVILS - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/21.jpg",
                    Price = "49,99"
                },
            ];

        _dbContext.Products.AddRange(products);
        _dbContext.SaveChanges();
    }
}