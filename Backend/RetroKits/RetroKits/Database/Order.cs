namespace RetroKits.Database;

public class Order
{
    public int Id { get; set; }
    public float TotalAmount{ get; set; }
    public DateTime Date {  get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
