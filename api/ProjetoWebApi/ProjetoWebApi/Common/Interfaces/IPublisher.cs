namespace ProjetoWebApi.Common.Interfaces
{
    public interface IPublisher
    {
        Task Publish<TEvent>(TEvent @event, CancellationToken cancellationToken = default) where TEvent : IDomainEvent;
    }
}
