using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.VendaCommands.ObterVenda
{
    public class ObterVendaRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; }

        public ObterVendaRequest(Guid id)
        {
            Id = id;
        }
    }
}
