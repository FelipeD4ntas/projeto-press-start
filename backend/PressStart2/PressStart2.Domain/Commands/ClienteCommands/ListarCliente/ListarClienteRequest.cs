using AspNetCore.IQueryable.Extensions;
using AspNetCore.IQueryable.Extensions.Attributes;
using AspNetCore.IQueryable.Extensions.Filter;
using AspNetCore.IQueryable.Extensions.Pagination;
using MediatR;
using PressStart2.Domain.DTOs;

namespace PressStart2.Domain.Commands.ClienteCommands.ListarCliente
{
    public class ListarClienteRequest : IRequest<CommandResponse>, ICustomQueryable, IQueryPaging
    {
        [QueryOperator(Operator = WhereOperator.Contains)]
        public string? Nome { get; set; }

        [QueryOperator(Operator = WhereOperator.Contains)]
        public string? Email { get; set; }

        [QueryOperator(Operator = WhereOperator.Contains)]
        public string? Telefone { get; set; }

        [QueryOperator(Operator = WhereOperator.Contains)]
        public string? CPF { get; set; }

        [QueryOperator(Operator = WhereOperator.Equals)]
        public bool? Inativo { get; set; }
        public int? Limit { get; set; }
        public int? Offset { get; set; }
    }
}
