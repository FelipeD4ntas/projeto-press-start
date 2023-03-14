using MediatR;
using Microsoft.AspNetCore.Mvc;
using PressStart2.Domain.DTOs;
using PressStart2.Domain.Commands.VendaCommands.AdicionarVenda;
using PressStart2.Domain.Commands.VendaCommands.AtualizarVenda;
using PressStart2.Domain.Commands.VendaCommands.ListarVenda;
using PressStart2.Domain.Commands.VendaCommands.ObterVenda;
using PressStart2.Domain.Commands.VendaCommands.RemoverVenda;
using Microsoft.AspNetCore.Authorization;

namespace PressStart2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VendaController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VendaController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("obter/{id}")]
        public async Task<IActionResult> Obter(Guid id)
        {
            var response = await _mediator.Send(new ObterVendaRequest(id));
            
            if (response.Sucesso)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }

        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> Listar([FromQuery] ListarVendaRequest request)
        {
            var response = await _mediator.Send(request);

            if (response.Sucesso)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }

        [HttpPost]
        [Route("adicionar")]
        public async Task<IActionResult> Adicionar(AdicionarVendaRequest request)
        {
            CommandResponse response = await _mediator.Send(request);

            if (response.Sucesso)
            {
                return Created("adicionar", response);
            }

            return BadRequest(response);
        }

        [HttpPut]
        [Route("atualizar")]
        public async Task<IActionResult> Atualizar(AtualizarVendaRequest request)
        {
            var response = await _mediator.Send(request);

            if (response.Sucesso)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }

        [HttpDelete]
        [Route("deletar")]
        public async Task<IActionResult> Deletar(Guid id)
        {
            var response = await _mediator.Send(new RemoverVendaRequest(id));

            if (response.Sucesso)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }
    }
}
