namespace PressStart2.Domain.Commands.UsuarioCommands.AdicionarUsuario
{
    public class AdicionarUsuarioResponse
    {
        public Guid Id { get; set; }
        public string Mensagem { get; set; }

        public AdicionarUsuarioResponse(Guid id, string mensagem)
        {
            Id = id;
            Mensagem = mensagem;
        }
    }
}
