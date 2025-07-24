namespace ProjetoWebApi.Common.Interfaces
{
    public interface ICommandHandler<TCommand> where TCommand : ICommand
    {
        Task Handler(TCommand command, CancellationToken cancellationToken = default);
    }
}
