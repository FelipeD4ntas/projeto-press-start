using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.ClienteCommands.RemoverCliente
{
    public class RemoverClienteRequest : IRequest<CommandResponse>
    {
        public Guid Id { get; }

        public RemoverClienteRequest(Guid id)
        {
            Id = id;
        }
    }
}
