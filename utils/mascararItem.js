export default function mascararItem(
  valorInput, 
  primeiroConjutoRegra,
  novoFormatoPrimeiroConjunto,  
  segundoConjuntoRegra,
  novoFormatoSegundoConjunto
  ) {
  valorInput = valorInput.replace(/\D/g, "");
  valorInput = valorInput.replace(primeiroConjutoRegra, novoFormatoPrimeiroConjunto);
  valorInput = valorInput.replace(segundoConjuntoRegra, novoFormatoSegundoConjunto);

  return valorInput
}