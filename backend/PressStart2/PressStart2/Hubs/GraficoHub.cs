using Microsoft.AspNetCore.SignalR;

namespace PressStart2.Hubs
{
    public class GraficoHub : Hub<IGraficoHub>
    {
        public async Task SendMessage(decimal[] valoresTotais)
        {
            await Clients.All.ReceivedMessage(valoresTotais);
        }
    }
}
