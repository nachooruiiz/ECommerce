using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;

namespace RetroKits.Database;

public class MyDbContext : DbContext
{
    private const string DATABSE_PATH = "ecommerce.db";

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string baseDir = AppDomain.CurrentDomain.BaseDirectory;
        optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABSE_PATH}");
    }
}
