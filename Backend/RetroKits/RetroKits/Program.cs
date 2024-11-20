
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.IdentityModel.Tokens;
using RetroKits.Controllers;
using RetroKits.Database;
using RetroKits.Database.Seeder;
using RetroKits.Repository;
using RetroKits.Services;
using System.Text;
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

        // Permite CORS
        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Así añadimos los servicios creados
        builder.Services.AddScoped<MyDbContext>();
        builder.Services.AddScoped<UserRepository>();
        builder.Services.AddScoped<ProductRepository>();
        builder.Services.AddScoped<SmartSearchService>();
        builder.Services.AddScoped<ReviewController>();

        builder.Services.AddAuthentication()
         .AddJwtBearer(options =>
         {
             string key = "nduncsdicunseu37846%$�(�/&(T/�gb87";


             options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()

             {
                 ValidateIssuer = false,
                 ValidateAudience = false,
                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
             };

         });

       
        var app = builder.Build();
        
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        // Habilita el servicio de archivos estáticos
        app.UseStaticFiles();
        app.UseRouting();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger(); 
            app.UseSwaggerUI();

            app.UseCors();
        }


        // Habilita la autenticaci�n
        app.UseAuthentication();
        // Habilita la autorizaci�n
        app.UseAuthorization();


        app.MapControllers();
        //Llamamos al metodo
        SeedDatabase(app.Services);

        app.Run();

    }

    //Metodo para crear y usar el Seeder
    static void SeedDatabase(IServiceProvider serviceProvider)
    {
        using IServiceScope scope = serviceProvider.CreateScope();
        using MyDbContext dbContext = scope.ServiceProvider.GetService<MyDbContext>();

        // Si no existe la base de datos entonces la creamos y ejecutamos el seeder
        if (dbContext.Database.EnsureCreated())
        {
            Seeder seeder = new Seeder(dbContext);
            seeder.Seed();
        }
    }
}
