namespace ProjetoWebApi.Common.Interfaces
{
    public interface IDomainEventHandler<TEvent> where TEvent : IDomainEvent
    {
        Task Handler(TEvent @event, CancellationToken cancellationToken = default);
    }
}
