using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.VendaCommands.AdicionarVenda
{
    public class AdicionarVendaRequest : IRequest<CommandResponse>
    {
        public Guid ClienteId { get; set; }
        public DateTime DataFaturamento { get; set; }
        public List<AdicionarVendaItemDto> Itens { get; set; }
    }
}
