namespace PressStart2.Domain.Commands.VendaCommands.RemoverVenda
{
    public class RemoverVendaResponse
    {
        public string Mensagem { get; }

        public RemoverVendaResponse(string mensagem)
        {
            Mensagem = mensagem;
        }
    }
}
