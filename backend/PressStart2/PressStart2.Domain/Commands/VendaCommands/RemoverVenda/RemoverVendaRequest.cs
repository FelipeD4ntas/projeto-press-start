using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.VendaCommands.RemoverVenda
{
    public class RemoverVendaRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; }
        public RemoverVendaRequest(Guid id)
        {
            Id = id;
        }
    }
}
