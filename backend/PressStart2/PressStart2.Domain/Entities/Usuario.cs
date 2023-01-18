using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class Usuario : EntidadeBase
    {
        public string Nome { get; private set; }
        public string Login { get; private set; }
        public string Senha { get; private set; }

        protected Usuario() { }

        public Usuario(string nome, string login, string senha)
        {
            Nome = nome;
            Login = login;
            Senha = senha;

            this.AdicionarUsuarioContract();
        }
    }
}
