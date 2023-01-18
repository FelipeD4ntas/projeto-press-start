namespace PressStart2.Domain.Commands.VendaCommands.AdicionarVenda
{
    public class AdicionarVendaResponse
    {
        public Guid Id { get; set; }
        public string Mensagem { get; set; }

        public AdicionarVendaResponse(Guid id, string mensagem)
        {
            Id = id;
            Mensagem = mensagem;
        }
    }
}
