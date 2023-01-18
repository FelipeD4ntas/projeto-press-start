using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Domain.Services;
using PressStart2.Infra.Data.Context;
using PressStart2.Infra.Data.Repositories;
using System.Text;

namespace PressStart2
{
    public static class Setup
    {
        public static void ConfigureDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<PressStart2Context>(options => options.UseSqlServer(connectionString));
        }

        public static void ConfigureAuthentication(this IServiceCollection services, string securityKey)
        {
            var key = Encoding.ASCII.GetBytes(securityKey);

            services.AddAuthentication(config =>
            {
                config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(config =>
            {
                config.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateLifetime = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = "PressStart2",
                    ValidAudience = "PressStart2"
                };
            });
        }

        public static void ConfigureRepository(this IServiceCollection services)
        {
            services.AddTransient<IRepositoryCliente, RepositoryCliente>();
            services.AddTransient<IRepositoryVenda, RepositoryVenda>();
            services.AddTransient<IRepositoryUsuario, RepositoryUsuario>();
            services.AddTransient<TokenService>();
        }

        public static void ConfigureMediator(this IServiceCollection services)
        {
            var assemblyDomain = AppDomain.CurrentDomain.Load("PressStart2.Domain");
            services.AddMediatR(assemblyDomain);
        }

        public static void MigrationInitialisation(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<PressStart2Context>();

                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
            }
        }
    }
}