const config = {
    paisURL: 'https://api.countrystatecity.in/v1/countries',
    estadoURL: 'https://api.countrystatecity.in/v1/countries/[ciso]/states',
    apiKey: 'TnFqSXNkdHQzcFZ5OXltWEF5OFhrdkNrb0NFdnFJZTN4eGhxVG83Qw==',
}

const selectPais = document.getElementById('paises');
const selectArea = document.getElementById('areas');
const selectCiudad = document.getElementById('ciudades');

function cargarPaises() {
    let parametros = config.paisURL;

    fetch(parametros, {headers: {"X-CSCAPI-KEY": config.apiKey}})
        .then(response => response.json())
        .then(paises => {
            // console.log(paises);
            paises.forEach(pais => {
                const option = document.createElement('option');
                option.value = pais.iso2;
                option.textContent = pais.name;
                selectPais.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar paises: ", error);
        });

        selectArea.disabled= true;
        selectCiudad.disabled= true;
        selectArea.style.pointerEvents = 'none';
        selectCiudad.style.pointerEvents = 'none';
}

function cargarAreas() {

    selectArea.disabled= false;
    selectCiudad.disabled= true;
    selectArea.style.pointerEvents = 'auto';
    selectCiudad.style.pointerEvents = 'none';

    const paisSeleccionado = selectPais.value;
    // console.log(paisSeleccionado);
     selectArea.innerHTML = '<option value="">Seleccione el area</option>'; //Limpia todas las opciones de areas existentes

     fetch(`${config.paisURL}/${paisSeleccionado}/states`, {headers: {"X-CSCAPI-KEY": config.apiKey}})
        .then(response => response.json())
        .then(areas => {
            // console.log(areas);

            areas.forEach(area => {
                const option = document.createElement('option');
                option.value = area.iso2;
                option.textContent = area.name;
                selectArea.appendChild(option);
            })
        })
        .catch(error => {
            console.error("Error al cargar provincias: ", error);
        });
}

function cargarCiudades(){

    selectCiudad.disabled= false;
    selectCiudad.style.pointerEvents = 'auto';

    const paisSeleccionado = selectPais.value;
    const areaSeleccionada = selectArea.value;

    // console.log(paisSeleccionado, areaSeleccionada);

    selectCiudad.innerHTML = '<option value="">Seleccione la ciudad</option>'; //Limpia las optiones de ciudades existentes

    fetch(` ${config.paisURL}/${paisSeleccionado}/states/${areaSeleccionada}/cities`, {headers: {"X-CSCAPI-KEY": config.apiKey}})
        .then(response => response.json())
        .then(ciudades => {
            // console.log(ciudades);

            ciudades.forEach(ciudad => {
                const option = document.createElement('option');
                option.value = ciudad.iso2;
                option.textContent = ciudad.name;
                selectCiudad.appendChild(option);
            })
        })
        .catch(error => {
            console.error("Error al cargar las ciudades: ", error);
        })

}

window.onload = cargarPaises;
