using AspNetCore.IQueryable.Extensions;
using AspNetCore.IQueryable.Extensions.Attributes;
using AspNetCore.IQueryable.Extensions.Filter;
using AspNetCore.IQueryable.Extensions.Pagination;
using MediatR;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Entities;

namespace PressStart2.Domain.Commands.VendaCommands.ListarVenda
{
    public class ListarVendaRequest : IRequest<CommandResponse>, ICustomQueryable, IQueryPaging
    {
        [QueryOperator(Operator = WhereOperator.Contains)]
        public string? NomeCliente { get; set; }

        [QueryOperator(Operator = WhereOperator.Equals)]
        public int? QuantidadeItens { get; set; }

        [QueryOperator(Operator = WhereOperator.Equals)]
        public decimal? ValorTotal { get; set; }

        [QueryOperator(Operator = WhereOperator.Equals)]
        public DateTime? DataVenda { get; set; }

        [QueryOperator(Operator = WhereOperator.Equals)]
        public DateTime? DataFaturamento { get; set; }
        public int? Limit { get; set; }
        public int? Offset { get; set; }
    }
}
