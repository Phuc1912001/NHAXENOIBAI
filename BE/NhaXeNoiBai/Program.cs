using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Behaviours;
using NhaXeNoiBai.Repository.Interfaces;
using NhaXeNoiBai.Service.Behaviours;
using NhaXeNoiBai.Service.Interfaces;
using AutoMapper;
using NhaXeNoiBai.Model.Mapper;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddDbContext<TranportDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("TransportDataBase"));
});
builder.Services.AddScoped<IPriceService, PriceService>();
builder.Services.AddScoped<IPriceRepositoryService, PriceRepositoryService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

var app = builder.Build();


app.UseCors(options =>
    options
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

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
