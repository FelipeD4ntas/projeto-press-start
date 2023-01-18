namespace PressStart2.Domain.Commands.ClienteCommands.RemoverCliente
{
    public class RemoverClienteResponse
    {
        public string Mensagem { get; }

        public RemoverClienteResponse(string mensagem)
        {
            Mensagem = mensagem;
        }
    }
}
