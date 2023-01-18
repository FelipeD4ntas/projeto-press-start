using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.VendaCommands.AtualizarVenda
{
    public class AtualizarVendaRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; set; }
        public Guid ClienteId { get; set; }
        public DateTime DataFaturamento { get; set; }
        public List<AtualizarVendaItemDto> Itens { get; set; }

    }
}
