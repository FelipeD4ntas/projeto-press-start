using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities
{
    public abstract class EntidadeBase : Notifiable
    {
        public Guid Id { get; private set; }
    }
}
