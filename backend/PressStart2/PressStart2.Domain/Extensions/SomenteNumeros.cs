using MediatR;
using System.Text.RegularExpressions;

namespace PressStart2.Domain.Extensions
{
    public static class SomenteNumeros
    {
        public static string FormatarStringParaSomenteNumeros(this string texto)
        {
            return Regex.Replace(texto, "[^0-9]", "");
        }
    }
}
