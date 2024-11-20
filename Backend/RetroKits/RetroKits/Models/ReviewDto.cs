using System.ComponentModel.DataAnnotations;

namespace RetroKits.Models
{
    public class ReviewDto
    {
        public string Comment { get; set; }
        public int ProductId { get; set; }
    }
}
