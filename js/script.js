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
    // Agregar estilos de campo válido
  } else {
    campos[campo] = false;
    // Eliminar estilos de campo válido
    // Agregar estilos de campo inválido
  }
};

// 5. Validar campo tipo
const validarCampoTipo = (input, campo) => {
  if (input.value == "repayment" || input.value == "interest-only") {
    campos[campo] = true;
    // Eliminar estilos de campo inválido
    // Agregar estilos de campo válido
  } else {
    campos[campo] = false;
    // Eliminar estilos de campo válido
    // Agregar estilos de campo inválido
  }
  console.log(campos);
};

// 6. Validar formulario
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "monto":
      validarCampo(expresiones.monto, e.target, "monto");
      break;
    case "tiempo":
      validarCampo(expresiones.tiempo, e.target, "tiempo");
      break;
    case "interes":
      validarCampo(expresiones.interes, e.target, "interes");
      break;
    case "tipo":
      validarCampoTipo(e.target, "tipo");
      break;
  }
};

// 7. Agregar eventos
inputs.forEach((input) => {
  // Al soltar tecla
  input.addEventListener("keyup", validarFormulario);
  // Al desenfocar
  input.addEventListener("blur", validarFormulario);
});
