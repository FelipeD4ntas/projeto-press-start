namespace PressStart2.Domain.DTOs
{
    public class ListarClienteDTO
    {
        public Guid Id { get; set; }
        public string Nome { get; }
        public string Email { get; }
        public string Telefone { get; }
        public string CPF { get; }
        public bool Inativo { get; }

        public ListarClienteDTO(Guid id, string nome, string email, string telefone, string cpf, bool inativo)
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
