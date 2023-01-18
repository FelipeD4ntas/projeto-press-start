using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.ClienteCommands.ListarCliente
{
    public class ListarClienteRequest : IRequest<CommandResponse>
    {
    }
}
