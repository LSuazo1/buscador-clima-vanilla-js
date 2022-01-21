const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        //hubo un  error
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    //Consultamos la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        //Crear una alerta 
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3',
            'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${mensaje}</span>
  `;
        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }


}

function consultarAPI(ciudad, pais) {

    const apiKey = 'ApiKeyde';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

    
    
    setTimeout(() => {
        Spinner();
    }, 5000);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        limpiarHTML();
        if (data.cod === '404') {
            mostrarError('Ciudad no encontrada');
            return;
        }

        //Imprimir
        mostrarClima(data);
    });
   

}

function mostrarClima(clima) {
    const { name, main: { temp_min, temp_max, temp } } = clima;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombre = document.createElement('p');
    nombre.innerHTML = `Clima en ${name}`;
    nombre.classList.add('font-bold', 'text-2xl');


    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');


    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML = `
       <div class="dot1"></div>
       <div class="dot2"></div>
       <div class="dot1"></div>
       <div class="dot2"></div>
       <div class="dot1"></div>
       <div class="dot2"></div>
    `;


    resultado.appendChild(divSpinner);
}