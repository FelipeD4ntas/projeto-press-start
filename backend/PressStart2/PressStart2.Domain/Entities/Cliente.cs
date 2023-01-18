using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class Cliente : EntidadeBase
    {
        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Telefone { get; private set; }
        public string CPF { get; private set; }
        public bool Inativo { get; private set; }

        protected Cliente() { }

        public Cliente(string nome, string email, string telefone, string cpf)
        {
            Nome = nome;
            Email = email;
            Telefone = telefone;
            CPF = cpf;
            Inativo = false;

            this.AdicionarClienteContract();
        }

        public void Atualizar(string nome, string email, string telefone, string cpf)
        {
            Nome = nome;
            Email = email;
            Telefone = telefone;
            CPF = cpf;

            this.AtualizarClienteContract();
        }

        public void Ativar()
        {
            Inativo = false;
        }

        public void Inativar()
        {
            Inativo = true;
        }

    }
}
