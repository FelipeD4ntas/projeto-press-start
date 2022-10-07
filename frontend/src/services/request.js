export default async function request(url, classeDoContainer) {
  try {
    const resposta = await fetch(url);
    const container = document.createElement('div');
    if (resposta.ok) {
      const conteudoTemplate =  resposta.text()
      const template = await conteudoTemplate;
      container.setAttribute('class', classeDoContainer);
      container.innerHTML = template;

      return container
    }
  } catch (error) {
    console.log(error)
  }
}