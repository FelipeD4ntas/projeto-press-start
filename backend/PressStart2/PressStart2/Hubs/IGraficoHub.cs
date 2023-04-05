using prmToolkit.NotificationPattern.Resources;

namespace PressStart2.Hubs
{
    public interface IGraficoHub
    {
        Task ReceivedMessage(decimal[] valoresTotais);
    }
}
