namespace PressStart2.Domain.Commands.ClienteCommands.AdicionarCliente
{
    public class AdicionarClienteResponse
    {
        public Guid Id { get; }
        public string Mensagem { get; }

        public AdicionarClienteResponse(Guid id, string mensagem)
        {
            Id = id;
            Mensagem = mensagem;
        }
    }
}
