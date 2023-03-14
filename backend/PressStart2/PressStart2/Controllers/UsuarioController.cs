using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PressStart2.Domain.Commands.UsuarioCommands.AdicionarUsuario;
using PressStart2.Domain.Commands.UsuarioCommands.LoginUsuario;
using System.IdentityModel.Tokens.Jwt;

namespace PressStart2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsuarioController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsuarioController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPost("adicionar")]
        public async Task<IActionResult> Adicionar(AdicionarUsuarioRequest request)
        {
            var response = await _mediator.Send(request);

            if (response.Sucesso)
            {
                return Created("", response);
            }

            return BadRequest(response);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUsuarioRequest request)
        {
            var response = await _mediator.Send(request);

            if (response.Sucesso)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }


        [HttpGet("validar-token")]
        public async Task<IActionResult> ValidarToken()
        {
            return Ok();
        }
    }
}
