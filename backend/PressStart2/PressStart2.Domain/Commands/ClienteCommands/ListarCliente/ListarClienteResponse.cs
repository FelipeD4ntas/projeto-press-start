using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.ClienteCommands.ListarCliente
{
    public class ListarClienteResponse
    {
        public int QuantidadeClientesFiltrados { get; }
        public List<ListarClienteDTO> Clientes { get; set; }

        public ListarClienteResponse(int quantidadeClientesFiltrados, List<ListarClienteDTO> clientes)
        {
            QuantidadeClientesFiltrados = quantidadeClientesFiltrados;
            Clientes = clientes;
        }
    }


}
