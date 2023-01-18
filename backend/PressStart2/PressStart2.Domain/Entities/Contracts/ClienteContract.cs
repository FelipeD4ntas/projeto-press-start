using prmToolkit.NotificationPattern;

namespace PressStart2.Domain.Entities.Contracts
{
    public static class ClienteContract
    {
        public static void AdicionarClienteContract(this Cliente cliente)
        {
            new AddNotifications<Cliente>(cliente)
                .IfNullOrInvalidLength(ct => ct.Nome, 3, 80)
                .IfNotEmail(ct => ct.Email)
                .IfNullOrInvalidLength(ct => ct.Telefone, 11, 20)
                .IfNotCpf(ct => ct.CPF, "O campo CPF deve ser um CPF válido.");
        }

        public static void AtualizarClienteContract(this Cliente cliente)
        {
            new AddNotifications<Cliente>(cliente)
                .IfNullOrInvalidLength(ct => ct.Nome, 3, 80)
                .IfNotEmail(ct => ct.Email)
                .IfNullOrInvalidLength(ct => ct.Telefone, 11, 20)
                .IfNotCpf(ct => ct.CPF);
        }
    }
}
