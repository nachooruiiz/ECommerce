
using RetroKits.Database;
using RetroKits.Repository;
using System.Text.Json.Serialization;

namespace RetroKits;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Así añadimos los servicios creados
        builder.Services.AddScoped<MyDbContext>();
        builder.Services.AddScoped<UserRepository>();

        var app = builder.Build();

        // Se crea la base de datos vacia
        using (IServiceScope scope = app.Services.CreateScope())
        {
            MyDbContext dbContext = scope.ServiceProvider.GetService<MyDbContext>();
            dbContext.Database.EnsureCreated();
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}
