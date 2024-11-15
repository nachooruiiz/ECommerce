namespace RetroKits.Models;

public class ProductDto
{
    public string Name { get; set; }
    public string Price { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public int Stock { get; set;  }
    public string ?Long_description { set; get; }
}
