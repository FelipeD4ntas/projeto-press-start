namespace PressStart2.Infra.CrossCutting.Constants
{
    public struct Notificacoes
    {
        public const string CLIENTE_MODULO = "Cliente";
        public const string VENDA_MODULO = "Venda";
        public const string USUARIO_MODULO = "Usuario";

        public const string CLIENTE_NAO_ENCONTRADO = "Cliente não encontrado.";
        public const string CLIENTE_REGISTRADO = "Cliente Registrado com Sucesso.";
        public const string CLIENTE_ATUALIZADO = "Cliente Atualizado com Sucesso.";
        public const string CLIENTE_REMOVIDO = "Cliente Removido com Sucesso.";
        public const string CPF_CADASTRADO = "CPF já cadastrado.";
        public const string CLIENTE_POSSUI_VENDAS = "Não é possível deletar cliente enquanto ele possuir alguma venda ativa.";

        public const string VENDA_NAO_ENCONTRADA = "Venda não encontrada.";
        public const string VENDA_REGISTRADA = "Venda Registrada com Sucesso.";
        public const string VENDA_ATUALIZADA = "Venda Atualizada com Sucesso.";
        public const string VENDA_REMOVIDA = "Venda Removida com Sucesso.";

        public const string USUARIO_REGISTRADO = "Usuario Registrado com Sucesso.";
        public const string USUARIO_SENHA_NAO_CONFERE = "Senhas não Conferem.";
        public const string USUARIO_LOGIN_INCORRETO = "Dados de login não conferem.";
        public const string USUARIO_EMAIL_CADASTRADO = "Email já cadastrado.";
    }
}