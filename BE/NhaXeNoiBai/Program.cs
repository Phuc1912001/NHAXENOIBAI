using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Behaviours;
using NhaXeNoiBai.Repository.Interfaces;
using NhaXeNoiBai.Service.Behaviours;
using NhaXeNoiBai.Service.Interfaces;
using AutoMapper;
using NhaXeNoiBai.Model.Mapper;
using Amazon.S3;
using NhaXeNoiBai.Controllers;
using NhaXeNoiBai.Model.Helper;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddDbContext<TranportDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("TransportDataBase"));
});

builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<IEmailRepositoryService, EmailRepositoryServcie>();

builder.Services.AddScoped<IPriceService, PriceService>();
builder.Services.AddScoped<IPriceRepositoryService, PriceRepositoryService>();
builder.Services.AddScoped<IDoccumentService, DoccumentService>();   
builder.Services.AddScoped<IDoccumentRepositoryService, DoccumentRepositoryService>();
builder.Services.AddScoped<IDiscountService, DiscountService>();
builder.Services.AddScoped<IDiscountRepositoryService, DiscountRepositoryService>();
builder.Services.AddScoped<IDiscountCodeService, DiscountCodeService>();
builder.Services.AddScoped<IDiscountCodeRepositoryService, DiscountCodeRespositoryService>();
builder.Services.AddScoped<IMoneyService, MoneyService>();
builder.Services.AddScoped<IMoneyRepositoryService, MoneyRepositoryService>();
builder.Services.AddScoped<IBookCarService, BookCarService>();
builder.Services.AddScoped<IBookCarRespositoryService, BookCarRespositoryService>();
builder.Services.AddHostedService<DiscountCodeBackgroundService>();
builder.Services.AddControllers();
builder.Services.AddHttpClient();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<IAmazonS3>();
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
