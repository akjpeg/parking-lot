using ASPNETCoreBackend.Entities;
using Microsoft.EntityFrameworkCore;
using ASPNETCoreBackend.Repositories.Implementations;
using ASPNETCoreBackend.Repositories.Interfaces;
using ASPNETCoreBackend.Services.Implementations;
using ASPNETCoreBackend.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<ParkingLotDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), dbOptions =>
    {
        dbOptions.MigrationsHistoryTable("__EFMigrationsHistory", "parking_lot_system");
    });
});


builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddScoped<IParkingLotRepository, ParkingLotRepository>();
builder.Services.AddScoped<IParkingLotActivityRepository, ParkingLotActivityRepository>();
builder.Services.AddScoped<IParkingLotManager,  ParkingLotManager>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddHttpsRedirection(options =>
{
    options.HttpsPort = 443; // Set the HTTPS port
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthorization();

//app.UseCors("AllowLocalhost");

app.MapControllers();

app.Run();