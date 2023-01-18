export default (url, classeDoContainer) => {
  const request = new XMLHttpRequest();
  const container = document.createElement('div');

  request.addEventListener('readystatechange', () => {
    const requesicaoConteudoEstaOk = request.readyState === 4 && request.status === 200;

    if (requesicaoConteudoEstaOk) {
      const conteudoTemplate = request.responseText;
      const template = conteudoTemplate;

      container.setAttribute('class', classeDoContainer);
      container.innerHTML = template;
    };
  });

  request.open('GET', url);
  request.send();

  return container;
}