using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.ClienteCommands.ObterCliente
{
    public class ObterClienteRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; set; }

        public ObterClienteRequest(Guid id)
        {
            Id = id;
        }
    }
}
