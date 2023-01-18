namespace PressStart2.Domain.Commands.VendaCommands.AtualizarVenda
{
    public class AtualizarVendaResponse
    {
        public Guid Id { get; }
        public string Mensagem { get; }

        public AtualizarVendaResponse(Guid id, string mensagem)
        {
            Id = id;
            Mensagem = mensagem;
        }
    }
}
