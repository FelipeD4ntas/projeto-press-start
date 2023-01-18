namespace PressStart2.Domain.Commands.ClienteCommands.ListarCliente
{
    public class ListarClienteResponse
    {
        public Guid Id { get; set; }
        public string Nome { get; }
        public string Email { get; }
        public string Telefone { get; }
        public string CPF { get; }
        public bool Inativo { get; }

        public ListarClienteResponse(Guid id, string nome, string email, string telefone, string cpf, bool inativo)
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
