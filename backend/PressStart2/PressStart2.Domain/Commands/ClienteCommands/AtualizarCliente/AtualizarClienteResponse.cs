namespace PressStart2.Domain.Commands.ClienteCommands.AtualizarCliente
{
    public class AtualizarClienteResponse
    {
        public string Mensagem { get; }

        public AtualizarClienteResponse(string mensagem)
        {
            Mensagem = mensagem;
        }
    }
}
