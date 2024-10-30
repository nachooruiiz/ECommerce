
using Microsoft.IdentityModel.Tokens;
using RetroKits.Database;
using RetroKits.Repository;
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

        builder.Services.AddAuthentication()
         .AddJwtBearer(options =>
         {
             string key = "nduncsdicunseu37846%$·(·/&(T/ñgb87";


             options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()

             {
                 ValidateIssuer = false,
                 ValidateAudience = false,
                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
             };

         });

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

        

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger(); 
            app.UseSwaggerUI();

            app.UseCors();
        }


        // Habilita la autenticación
        app.UseAuthentication();
        // Habilita la autorización
        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}
