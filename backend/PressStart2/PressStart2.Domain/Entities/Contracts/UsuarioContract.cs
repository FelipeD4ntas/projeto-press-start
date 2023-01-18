using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class UsuarioContract 
    {
        public static void AdicionarUsuarioContract(this Usuario usuario)
        {
            new AddNotifications<Usuario>(usuario)
                .IfNullOrInvalidLength(u => u.Nome, 3, 80)
                .IfNullOrInvalidLength(u => u.Login, 3, 80)
                .IfNotEmail(u => u.Login)
                .IfNullOrInvalidLength(u => u.Senha, 8, 100);
        }
    }
}
