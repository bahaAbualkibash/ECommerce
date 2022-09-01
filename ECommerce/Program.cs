using ECommerce.Data;
using ECommerce.Errors;
using ECommerce.Helpers;
using ECommerce.Identity;
using ECommerce.Middleware;
using ECommerce.Models;
using ECommerce.Models.Identity;
using ECommerce.Repo;
using ECommerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddScoped(typeof(IGenaricRepo<>), typeof(GenaricRepo<>));
builder.Services.AddScoped<IProductRepo, ProductRepo>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var tokenSettings = builder.Configuration.GetSection("TokenSettings").Get<TokenSettings>();
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings.SecretKey)),
            ValidIssuer = tokenSettings.Issuer,
            ValidateIssuer = true,
            ValidateAudience = false
        };
    });
builder.Services.AddScoped<IAccountService,AccountService>();
builder.Services.AddScoped<IOrderService,OrderService>();
builder.Services.AddScoped<IUploadService,UploadService>();
builder.Services.AddIdentityCore<AppUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppIdentityDbContext>()
    .AddDefaultTokenProviders()
    .AddSignInManager<SignInManager<AppUser>>();

builder.Services.Configure<TokenSettings>(builder.Configuration.GetSection("TokenSettings"));
builder.Services.AddDbContext<StoreContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefualtConnection")));
builder.Services.AddControllers();

builder.Services.AddDbContext<AppIdentityDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection"))
);
builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
{
    var config = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"),true);
    return ConnectionMultiplexer.Connect(config);
});
builder.Services.AddScoped<IBasketRepo,BasketRepo>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = actionContext =>
    {
        var errors = actionContext.ModelState
        .Where(e => e.Value.Errors.Count > 0)
        .SelectMany(x => x.Value.Errors)
        .Select(x => x.ErrorMessage).ToArray();

        var errorResponse = new ApiValidationErrorResponse
        {
            Errors = errors
        };
        return new BadRequestObjectResult(errorResponse);
    };
});

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
    });
});

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStatusCodePagesWithRedirects("/errors/{0}");

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseStaticFiles();

app.MapControllers();

app.UseAuthorization();

app.Run();
