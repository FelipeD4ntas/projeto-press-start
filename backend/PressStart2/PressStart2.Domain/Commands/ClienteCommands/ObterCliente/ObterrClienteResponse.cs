namespace PressStart2.Domain.Commands.ClienteCommands.ObterCliente
{
    public class ObterrClienteResponse
    {
        public Guid Id { get; }
        public string Nome { get; }
        public string Email { get; }
        public string Telefone { get; }
        public string CPF { get; }
        public bool Inativo { get; }

        public ObterrClienteResponse(Guid id, string nome, string email, string telefone, string cpf, bool inativo)
        {
            Id = id;
            Nome = nome;
            Email = email;
            Telefone = telefone;
            CPF = cpf;
            Inativo = inativo;
        }
    }
}
