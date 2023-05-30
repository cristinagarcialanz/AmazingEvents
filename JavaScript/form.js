function actionForm(event) {
  event.preventDefault();

  let formData = {
    firstName: event.target[0].value,
    lastName: event.target[1].value,
    emailAddress: event.target[2].value,
    webSiteName: event.target[3].value,
    message: event.target[4].value,
  };

  saludo(formData);

  var modalComentario = document.getElementById("modalComentario");

  function saludo() {
    form.style.display = "none";
    saludoHTML.style.display = "flex";
    modalComentario.innerHTML = `

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">GRACIAS!!!!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        Hola ${formData.firstName} ${formData.lastName} !!!. Gracias por dejarnos tu ${formData.message}, revisaremos tu sitio web ${formData.webSiteName}
        y nos pondremos en contacto al mail que nos has dejado ${formData.emailAddress} a la brevedad posible, saludos.
        </div>
        <div class="modal-footer">
          <button type="button" id="botonModal"class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`;
  }
}

let botonModal = document.getElementById("botonModal");

botonModal.addEventListener("click", function () {
  backHome();
});

function backHome() {
  setState("paginaANavegar", "home");
  imprimir();
}
