using Microsoft.Extensions.DependencyInjection;
using ProjetoWebApi.Common.Interfaces;
using Scrutor;
using System.Reflection;

namespace ProjetoWebApi.Common.Extensions
{
    public static class IoCExtensions
    {
        public static  IServiceCollection AddScanCqrsHandlers(this IServiceCollection services, Assembly assembly)
        {
            services.Scan(scan => scan
                .FromAssemblies(assembly) //Procura nesse Projeto
                .AddClasses(classes => classes.AssignableTo(typeof(ICommandHandler<>))) //Classes que implementão a interface
                .AsImplementedInterfaces() //Registra a classe pela inteface implementada
                .WithTransientLifetime()); //Ciclo de vida

            services.Scan(scan => scan
                .FromAssemblies(assembly)
                .AddClasses(classes => classes.AssignableTo(typeof(IQueryHandler<,>)))
                .AsImplementedInterfaces()
                .WithTransientLifetime());

            services.Scan(scan => scan
                .FromAssemblies(assembly)
                .AddClasses(classes => classes.AssignableTo(typeof(IDomainEventHandler<>)))
                .AsImplementedInterfaces()
                .WithTransientLifetime());

            return services;
        }
    }
}
