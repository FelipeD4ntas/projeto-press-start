using SecureIdentity.Password;

namespace PressStart2.Domain.Extensions
{
    public static class Encrypt
    {
        public static string EncryptSenha(this string senha)
        {
            return PasswordHasher.Hash(senha);
        }
    }
}
