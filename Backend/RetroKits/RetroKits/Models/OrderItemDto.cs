namespace RetroKits.Models;

public class OrderItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public int Price { get; set; }
    public int TotalAmount{ get; set; }

}
