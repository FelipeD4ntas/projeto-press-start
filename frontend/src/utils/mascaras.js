function aplicarMascaraDataAutenticada(data) {
  return mascararItem(
    data,
    /^(\d{2})(\d{2})/g, "$1/$2",
    /(\d{4})$/, "/$1"
  )
}

function aplicarMascaraData(data) {
  return new Date(data).toLocaleDateString()
}

function aplicarMascaraPrecoUnitario(precoUnitario) {
  const estiloDaMoeda = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'});
  const valorPrecoBruto = precoUnitario.replace(/\D/g, '');
  const valorFormatado = (estiloDaMoeda.format(parseFloat(valorPrecoBruto / 100)));
  return valorFormatado;
}

function aplicarMsascaraValorTotal(valorTotal) {
  return valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

function aplicarMascaraCpf(cpfCliente) {
  return mascararItem(
    cpfCliente, 
    /^(\d{3})(\d{3})/g, "$1.$2", 
    /(\d{3})(\d{2})$/,".$1-$2"
  );
}

function aplicarMascaraTelefone(telefoneCliente) {
  return mascararItem(
    telefoneCliente,
    /^(\d{2})(\d{5})/g, "($1) $2",
    /(\d{5})(\d{4})$/, "$1-$2"
  );
}

function mascararItem(
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

export { aplicarMascaraDataAutenticada, aplicarMascaraData, aplicarMascaraPrecoUnitario, aplicarMsascaraValorTotal, aplicarMascaraCpf, aplicarMascaraTelefone }