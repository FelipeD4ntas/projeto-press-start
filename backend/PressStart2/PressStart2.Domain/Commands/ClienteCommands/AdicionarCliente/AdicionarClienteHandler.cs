using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Extensions;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.CrossCutting.Constants;
using prmToolkit.NotificationPattern;
using System.Text.RegularExpressions;

namespace PressStart2.Domain.Commands.ClienteCommands.AdicionarCliente
{
    public class AdicionarClienteHandler : Notifiable, IRequestHandler<AdicionarClienteRequest, CommandResponse>
    {
        private readonly IRepositoryCliente _repositoryCliente;

        public AdicionarClienteHandler(IRepositoryCliente repositoryCliente)
        {
            _repositoryCliente = repositoryCliente;
        }

        public Task<CommandResponse> Handle(AdicionarClienteRequest request, CancellationToken cancellationToken)
        {
            if (_repositoryCliente.CpfJaExistente(request.CPF))
            {
                AddNotification(Notificacoes.CLIENTE_MODULO, Notificacoes.CPF_CADASTRADO);
                return Task.FromResult(new CommandResponse(this));
            }

            if (_repositoryCliente.NomeTemNumero(request.Nome))
            {
                AddNotification(Notificacoes.CLIENTE_MODULO, Notificacoes.NOME_CLIENTE_COM_NUMEROS);
                return Task.FromResult(new CommandResponse(this));
            }

            var telefoneFormatado = request.Telefone.FormatarStringParaSomenteNumeros();
            var CPFFormatado = request.CPF.FormatarStringParaSomenteNumeros();
            var emailFormatado = request.Email.ToLower();

            Cliente cliente = new Cliente(request.Nome, emailFormatado, telefoneFormatado, CPFFormatado);
            AddNotifications(cliente);

            if (IsInvalid())
            {
                return Task.FromResult(new CommandResponse(this));
            }
            _repositoryCliente.Adicionar(cliente);
            _repositoryCliente.Commit();

            AdicionarClienteResponse clienteResponse = new AdicionarClienteResponse(cliente.Id, Notificacoes.CLIENTE_REGISTRADO);

            return Task.FromResult(new CommandResponse(clienteResponse, this));
        }
    }
}
