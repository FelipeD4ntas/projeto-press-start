function manipularPopup(dataPopup, classeAcao) {
  const popup = document.querySelector(`[data-js=${dataPopup}]`);
  
  function fecharPopup(event) {
    const classeElementoClicado = event.target.classList.value;
      const classNames = ['closedPopup', classeAcao, 'mostrar-popup'];
      const clicouElementoFecharPopup = classNames.some(className => className === classeElementoClicado);
      
      if (clicouElementoFecharPopup ) {
        popup.classList.remove('mostrar-popup') ;
      } 
  }

  mostrarPopup(popup);
  popup.addEventListener('click', fecharPopup);
}

function mostrarPopup(popup) {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  
  popup.classList.add('mostrar-popup');
}

export { manipularPopup, mostrarPopup }