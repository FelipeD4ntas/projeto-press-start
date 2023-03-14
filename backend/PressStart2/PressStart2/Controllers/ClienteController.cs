using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PressStart2.Domain.Commands.ClienteCommands.AdicionarCliente;
using PressStart2.Domain.Commands.ClienteCommands.AtualizarCliente;
using PressStart2.Domain.Commands.ClienteCommands.ListarCliente;
using PressStart2.Domain.Commands.ClienteCommands.ObterCliente;
using PressStart2.Domain.Commands.ClienteCommands.RemoverCliente;
using PressStart2.Domain.DTOs;

namespace PressStart2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClienteController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ClienteController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("obter/{id}")]
        public async Task<IActionResult> Obter(Guid id)
        {
            var cliente = await _mediator.Send(new ObterClienteRequest(id));
            return Ok(cliente);
        }

        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> Listar([FromQuery] ListarClienteRequest request)
        {
            CommandResponse response = await _mediator.Send(request);
            
           
            if (response.Sucesso)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }

        [HttpPost]
        [Route("adicionar")]
        public async Task<IActionResult> Adicionar(AdicionarClienteRequest request)
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
        public async Task<IActionResult> Atualizar(AtualizarClienteRequest request)
        {
            CommandResponse response = await _mediator.Send(request);

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
            CommandResponse response = await _mediator.Send(new RemoverClienteRequest(id));
            
            if (response.Sucesso)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }
    }
}
