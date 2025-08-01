﻿using Microsoft.Extensions.DependencyInjection;
using ProjetoWebApi.Common.Interfaces;
using System.Windows.Input;

namespace ProjetoWebApi.Common.Dispatcher
{
    public class Dispatcher
    {
        private readonly IServiceProvider _serviceProvider;

        public Dispatcher(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        public async  Task Send<TCommand> (TCommand command, CancellationToken cancellationToken = default)
            where TCommand : Interfaces.ICommand
        {
            try
            {
                var handler = _serviceProvider.GetRequiredService<ICommandHandler<TCommand>>();
                await handler.Handler(command, cancellationToken);
            }
            catch (Exception ex) 
            {
                throw new InvalidOperationException($"Erro ao atribuir a handler {ex.Message}");
            }
            
        }

        public async Task<TResult> Query<TQuery, TResult>(TQuery query, CancellationToken cancellationToken = default)
            where TQuery : IQuery<TResult> 
        {
            var handler = _serviceProvider.GetRequiredService<IQueryHandler<TQuery, TResult>>();
            return await handler.Handler(query, cancellationToken);
        }
    }
}
