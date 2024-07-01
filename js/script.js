// 1. Seleccionar formulario y campos
const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

// 2. Controlar estados
const campos = {
  monto: false,
  tiempo: false,
  interes: false,
  tipo: false,
};

// 3. Validación con expresiones regulares
const expresiones = {
  monto: /^\d+(\.\d+)?$/,
  tiempo: /^\d+$/,
  interes: /^(0\.[1-9]\d*|[1-9]\d*(\.\d+)?)$/,
};

// 4. Validar cada campo
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    campos[campo] = true;
    // Eliminar estilos de campo inválido
    document
      .getElementById(`error-message-${campo}`)
      .classList.remove("error-message-active"); //message
    document
      .getElementById(`block-container-${campo}`)
      .classList.remove("block-container-active"); //borde
  } else {
    campos[campo] = false;
    // Agregar estilos de campo inválido
    document
      .getElementById(`error-message-${campo}`)
      .classList.add("error-message-active"); //message
    document
      .getElementById(`block-container-${campo}`)
      .classList.add("block-container-active"); //borde
  }
};

// 5. Validar campo tipo
const validarCampoTipo = (input) => {
  var radios = document.querySelectorAll('input[name="tipo"]');
  var radio1 = radios[0];
  var radio2 = radios[1];
  //estados
  radio1.checked || radio2.checked
    ? (campos.tipo = true)
    : (campos.tipo = false);
  //estilos radio 1
  if (radio1.checked) {
    document
      .getElementById("block-container-tipo1")
      .classList.add("fondo-active"); //fondo
    document
      .getElementById("block-container-tipo1")
      .classList.add("borde-active"); //borde
  } else {
    document
      .getElementById("block-container-tipo1")
      .classList.remove("fondo-active"); //fondo
    document
      .getElementById("block-container-tipo1")
      .classList.remove("borde-active"); //borde
  }
  //estilos radio 2
  if (radio2.checked) {
    document
      .getElementById("block-container-tipo2")
      .classList.add("fondo-active"); //fondo
    document
      .getElementById("block-container-tipo2")
      .classList.add("borde-active"); //borde
  } else {
    document
      .getElementById("block-container-tipo2")
      .classList.remove("fondo-active"); //fondo
    document
      .getElementById("block-container-tipo2")
      .classList.remove("borde-active"); //borde
  }
};

// 6. Validar formulario
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "monto":
      validarCampo(expresiones.monto, e.target, "monto");
      console.log("monto");
      break;
    case "tiempo":
      validarCampo(expresiones.tiempo, e.target, "tiempo");
      break;
    case "interes":
      validarCampo(expresiones.interes, e.target, "interes");
      break;
    case "tipo":
      validarCampoTipo(e.target);
      break;
  }
  console.log(campos);
};

// 7. Agregar eventos
inputs.forEach((input) => {
  // Al soltar tecla
  input.addEventListener("keyup", validarFormulario);
  // Al desenfocar
  input.addEventListener("blur", validarFormulario);
});

// 8. Event listener para submit del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (campos.monto && campos.tiempo && campos.interes && campos.tipo) {
    document.getElementById("result-zero").classList.add("display-none");
    document.getElementById("result-total").classList.add("display-flex");
    calcularHipoteca();
  } else {
    console.log("Formulario Invalido");
  }
});

// 9. Calcular hipoteca
const calcularHipoteca = () => {
  // Obtener valores de entrada
  const P = parseFloat(document.getElementById("monto").value);
  const years = parseInt(document.getElementById("tiempo").value);
  const annualInterestRate = parseFloat(
    document.getElementById("interes").value
  );
  const mortgageType = document.querySelector(
    'input[name="tipo"]:checked'
  ).value;

  // Calcular valores necesarios
  const r = annualInterestRate / 100 / 12; // Tasa de interés mensual
  const n = years * 12; // Número total de pagos (meses)

  let M = 0;
  let totalRepayments = 0;

  if (mortgageType === "repayment") {
    // Fórmula para el cálculo de la cuota mensual en hipoteca de reembolso
    M = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    totalRepayments = M * n;
  } else if (mortgageType === "interest-only") {
    // Cálculo de la cuota mensual en hipoteca solo intereses
    M = P * r;
    totalRepayments = M * n + P; // Incluyendo el pago del capital al final
  }

  // Formatear los valores para mostrar como moneda
  const formatCurrency = (num) =>
    "£" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  // Actualizar el DOM con los resultados
  document.getElementById("payments").innerText = formatCurrency(M);
  document.getElementById("reimbursement").innerText =
    formatCurrency(totalRepayments);
};

// 10. Limpiar formulario
const ctaclean = document.getElementById("clear-all");
ctaclean.addEventListener("click", function (event) {
  event.preventDefault();
  // Resetear campos del formulario
  formulario.reset();
  for (let key in campos) {
    campos[key] = false;
  }
  // Resetear estilos de los tipos de hipoteca
  const tipo1 = document.getElementById("block-container-tipo1");
  const tipo2 = document.getElementById("block-container-tipo2");
  tipo1.classList.remove("fondo-active", "borde-active");
  tipo2.classList.remove("fondo-active", "borde-active");
  // Mostrar sección inicial y ocultar resultados
  document.getElementById("result-zero").classList.remove("display-none");
  document.getElementById("result-total").classList.remove("display-flex");
  document.getElementById("result-zero").classList.add("display-flex");
  document.getElementById("result-total").classList.add("display-none");
  // Recargar la página actual
  window.location.reload();
});
