let fechaBase;

let eventos;

var inputSearch = document.getElementById("inputSearch");
var formulary = document.getElementById("idContacto");
var estadisticas = document.getElementById("idEstadistica");
let modalComentario = document.getElementById("modalComentario");

let checkCheckedBoxes = [];
let search = "";

async function getData() {
  let datosApi;
  await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
    .then((response) => response.json())
    .then((json) => (datosApi = json));

  eventos = datosApi.eventos;
  fechaBase = datosApi.fechaActual;

  imprimir();
}
getData();

//Navegación de eventos, pasados y futuros.
//Primero le colocamos la misma clase a los botones del navbar "navlink" y un id distindo "home","upcoming" y "past"

var textoBoton = [];
var buttonNav = document.getElementsByClassName("nav-link");

for (var i = 0; i < buttonNav.length; i++) {
  const element = buttonNav[i];
  textoBoton.push(buttonNav[i].innerText);

  element.addEventListener("click", (e) => {
    setState("paginaANavegar", e.target.id);

    for (let i = 0; i < buttonNav.length; i++) {
      const elementos = buttonNav[i];

      if (elementos.id !== e.target.id) {
        elementos.style.backgroundColor = "transparent";
        elementos.style.color = "black";
        elementos.style.fontWeight = "normal";
      } else {
        element.style.backgroundColor = "rgb(240, 123, 158)";
        element.style.color = "white";
        element.style.fontWeight = "bold";
        element.style.borderRadius = "5px";
      }
    }
    document.getElementById("carousel").innerHTML = e.target.innerText;
    imprimir(e.target.id); //llamada de la función
  });
}

//una vez que obtenemos el dato llamamos a la función imprimir pasandole el "id" que obtuvimos
function imprimir() {
  switch (initialState.paginaANavegar) {
    case "upcoming":
      let eventosFuturos = eventos.filter((evento) => evento.date > fechaBase);
      arrayAFiltrar = eventosFuturos;
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      inputSearch.value = "";
      checkCheckedBoxes = [];
      display(eventosFuturos);
      eventosCategories(eventosFuturos);
      document.getElementById("pestaña").innerHTML = "Upcoming Events";
      break;

    case "past":
      let eventosPasados = eventos.filter((evento) => evento.date < fechaBase);
      arrayAFiltrar = eventosPasados;
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      inputSearch.value = "";
      checkCheckedBoxes = [];
      display(eventosPasados);
      eventosCategories(eventosPasados);
      document.getElementById("pestaña").innerHTML = "Past Events";
      break;
    case "contact":
      searchContainer.style.display = "none";
      todosLosEventos.style.display = "none";
      idContacto.style.display = "flex";
      idEstadistica.style.display = "none";
      formulario();
      //display();
      document.getElementById("pestaña").innerHTML = "Contact";
      break;

    case "stats":
      searchContainer.style.display = "none";
      todosLosEventos.style.display = "none";
      idContacto.style.display = "none";
      idEstadistica.style.display = "flex";
      initStats();
      estadistica();
      //display()
      document.getElementById("pestaña").innerHTML = "Stats";
      break;

    default:
      arrayAFiltrar = eventos;
      searchContainer.style.display = "flex";
      todosLosEventos.style.display = "flex";
      idContacto.style.display = "none";
      idEstadistica.style.display = "none";
      inputSearch.value = "";
      checkCheckedBoxes = [];
      display(eventos);
      eventosCategories(eventos);
      document.getElementById("pestaña").innerHTML = "Home";
  }
}

function display(array) {
  //esta función recibe un array,

  var url;
  if (location.pathname == "./pages/details.html") {
    url = "./details.html";
  } else {
    url = "./pages/details.html";
  }

  var html = "";

  array.map(
    (evento) =>
      (html += `  
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
    <div class="card text-center">
      <img src="${evento.image}"  class="card-img-top" alt=${evento.name}>
      <div class="card-body p-md-2 p-1">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text"> ${evento.category}</p>
        <div class="row justify-content-around item pt-2">
          <p class="col-6 texto-price">Price: $ ${evento.price}</p>
          <a href="${url}?id=${evento.id}" class="col-4 btn">Ver mas</a> 
        </div>
      </div>
    </div>
  </div>
  `)
  );
  document.getElementById("todosLosEventos").innerHTML = html;
}

//Página de contactos

function formulario() {
  formulary.innerHTML = `
  <div class="container"> 
    <div class="text">Contactanos!!!</div>
    <form action="#">
      <div class="form-row">
        <div class="input-data">
          <input type="text" required>
          <div class="underline"></div>
          <label for="">First Name</label>
        </div>
        <div class="input-data">
          <input type="text" required>
          <div class="underline"></div>
          <label for="">Last Name</label>
        </div>
      </div>
      <div class="form-row">
        <div class="input-data">
          <input type="text" required>
          <div class="underline"></div>
                <label for="">Email Address</label>
              </div>
              <div class="input-data">
                <input type="text" required>
                <div class="underline"></div>
                <label for="">Website Name</label>
              </div>
          </div>
          <div class="form-row">          
              <div class="input-data textarea">              
                <textarea rows="8" cols="80" required></textarea>
                <br/>
                <div class="underline"></div>
                  <label for="">Write your message</label>
                  <br/>                
                <div class="form-row submit-btn">
                    <div class="input-data">
                      <div class="inner"></div>
                      <input type="submit" value="submit">
                    </div>
                </div>
              </div>
          </div>
        </form>
  </div>
`;
  let form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    actionForm(event);
  });
}

//Funcion que crea la tabla de estadística.

function estadistica() {
  estadisticas.innerHTML = `
<table id="general">
  <tr class="color">
  <th colspan="3">Estadísticas de Eventos</th>
</tr>
<tr class="titulo-tabla">
  <th>Evento con Mayor Porcentaje de Asistencia</th>
  <th>Evento con Menor Porcentaje de Asistencia</th>
  <th>Evento de Mayor Capacidad</th>
</tr>
<tr id="mayoresymenores">  
</tr>
</table>  
<table id="statsFuturos">
<tr class="color">
  <th colspan="3">Estadisticas de Eventos Futuros por Categoría</th>
</tr>
<tr class="titulo-tabla">
  <th>Categorías</th>
  <th>Estimacion de Ingresos</th>
  <th>Asistencia Estimada</th>
</tr>
</table>  
<table id="statsPasados">
<tr class="color">
    <th colspan="3">Estadisticas de Eventos Pasados por Categoría</th>
</tr>
<tr class="titulo-tabla">
  <th>Categorías</th>
  <th>Ingresos</th>
  <th>Asistencia</th>
</tr>
</table>
`;
}

var time = location.search.split("?time=");

switch (time[1]) {
  case "upcoming":
    setState("paginaANavegar", "upcoming");
    document.getElementById("carousel").innerHTML = "Upcoming Events";
    break;

  case "past":
    setState("paginaANavegar", "past");
    document.getElementById("carousel").innerHTML = "Past Events";
    break;

  case "contact":
    setState("paginaANavegar", "contact");
    document.getElementById("carousel").innerHTML = "Contact";
    break;

  case "stats":
    setState("paginaANavegar", "stats");
    document.getElementById("carousel").innerHTML = "Stats";
    break;

  default:
    document.getElementById("carousel").innerHTML = "Home";
}

//carrusel

//función que dinamisa los botones del carousel left y right

var buttonLeft = document.getElementById("left");

buttonLeft.addEventListener("click", function (e) {
  var leftTitle = document.getElementById("carousel").innerText;

  if (textoBoton.indexOf(leftTitle) > 0) {
    changePage(textoBoton.indexOf(leftTitle) - 1);
  } else {
    changePage(4);
  }
});
var botonRight = document.getElementById("right");

botonRight.addEventListener("click", function (e) {
  var rightTitle = document.getElementById("carousel").innerText;

  if (textoBoton.indexOf(rightTitle) < 4) {
    changePage(textoBoton.indexOf(rightTitle) + 1);
  } else {
    changePage(0);
  }
});

async function changePage(i) {
  switch (i) {
    case 0:
      await setState("paginaANavegar", "home");
      imprimir();
      document.getElementById("carousel").innerHTML = textoBoton[i];
      break;

    case 1:
      await setState("paginaANavegar", "upcoming");
      imprimir();
      document.getElementById("carousel").innerHTML = textoBoton[i];
      break;

    case 2:
      await setState("paginaANavegar", "past");
      imprimir();
      document.getElementById("carousel").innerHTML = textoBoton[i];
      break;

    case 3:
      formulario();
      searchContainer.style.display = "none";
      todosLosEventos.style.display = "none";
      idContacto.style.display = "flex";
      idEstadistica.style.display = "none";
      document.getElementById("carousel").innerHTML = textoBoton[i];
      break;

    case 4:
      initStats();
      estadistica();
      searchContainer.style.display = "none";
      todosLosEventos.style.display = "none";
      idContacto.style.display = "none";
      idEstadistica.style.display = "flex";
      document.getElementById("carousel").innerHTML = textoBoton[i];
      break;
  }
}

//Input Search

inputSearch.addEventListener("keyup", function (evento) {
  var datoInput = evento.target.value;

  search = datoInput.trim().toLowerCase();

  filtroCombinado();
});

//Checkbox

//CREACIÓN DINÁMICA DE CHECKBOX POR CATEGORÍA

function eventosCategories(array) {
  let categories = array.map((evento) => evento.category);

  //el método SET devuelve del array un objeto con los datos unicos, no los repite
  let unica = new Set(categories);

  //trasformo en un array el contenido del objeto unica
  let lastCategories = [...unica];

  let categoriasEventos = "";

  lastCategories.map(
    (category) =>
      (categoriasEventos += `
<div class="form-check">
<input
  class="form-check-input checkCuadro"
  type="checkbox"
  value="${category}"
  id="flexCheckDefault"
/>
<label
  class="form-check-label checkCategoria"
  for="flexCheckDefault"
>
  ${category}
</label>
</div>
`)
  );

  document.getElementById("checkcategories").innerHTML = categoriasEventos;

  checkboxListener();
}

function checkboxListener() {
  //ESCUCHA Y GUARDADO DE CHECKBOX CHECKED
  //por un selectorAll capturo las etiquetas input de tipo checkbox
  var checkboxs = document.querySelectorAll("input[type=checkbox");

  //recorro cada uno de los input checkbox y le apilico un escuachador de eventos change
  for (var i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener("change", function () {
      //limpio el array donde voyaa guardar los inut con checked true ya que utilizo un método push
      //caso contrario se van a agregar más eventos
      checkCheckedBoxes = [];

      //recorro el array de checkbox para extraer aquellos cuyo atributo checked sea true
      for (var i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          //si se cumple la condición de checked true los empujo al array que defini para almacenar
          //los checkbox chequeados
          checkCheckedBoxes.push(checkboxs[i].value);
        }
      }
      filtroCombinado();
    });
  }
}

function filtroCombinado() {
  var filtrado = [];
  if (search !== "" && checkCheckedBoxes.length > 0) {
    checkCheckedBoxes.map((category) =>
      filtrado.push(
        ...arrayAFiltrar.filter(
          (eventos) =>
            eventos.name.toLowerCase().includes(search) &&
            eventos.category === category
        )
      )
    );
  } else if (search !== "" && checkCheckedBoxes.length == 0) {
    filtrado = arrayAFiltrar.filter((eventos) =>
      eventos.name.toLowerCase().includes(search)
    );
  } else if (search === "" && checkCheckedBoxes.length > 0) {
    checkCheckedBoxes.map((category) =>
      filtrado.push(
        ...arrayAFiltrar.filter((eventos) => eventos.category === category)
      )
    );
  } else {
    filtrado = arrayAFiltrar;
  }
  filtrado.length > 0
    ? display(filtrado)
    : (todosLosEventos.innerHTML = `<h1 class="ceroResult">No se encontraron eventos para tu búsqueda </h1>`);
}
