using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ProjetoWebApi;
using ProjetoWebApi.Common.Dispatcher;
using ProjetoWebApi.Common.Extensions;
using ProjetoWebApi.Features.Client.Commands;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Model;
using ProjetoWebApi.Features.Client.Queries;
using ProjetoWebApi.Features.Client.Services;
using ProjetoWebApi.Infrastructure;
using ProjetoWebApi.Model;
using ProjetoWebApi.Services;
using System.Reflection;
using System.Security.Cryptography.Xml;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(x =>
{
    x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    x.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string> ()
        }
    });
});

builder.Services.AddTransient<ILoginRepository, LoginRepository>();
builder.Services.AddTransient<IAdminRepository, AdminRepository>();
builder.Services.AddTransient<ILoginServices, LoginServices>();
builder.Services.AddTransient<IAdminServices, AdminServices>();
builder.Services.AddTransient<IContextConnection, ContextConnection>();
builder.Services.AddTransient<IClientServices, ClientServices>();
builder.Services.AddScanCqrsHandlers(Assembly.GetExecutingAssembly());
builder.Services.AddTransient<Dispatcher>();

var key = Encoding.ASCII.GetBytes(Key.Secret);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };

});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
    builder => builder.WithOrigins("http://localhost:5502", "http://127.0.0.1:5502")
                          .AllowAnyHeader()
                          .AllowAnyMethod());

});

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
