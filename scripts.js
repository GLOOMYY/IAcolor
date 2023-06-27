var modelo = new brain.NeuralNetwork();

document
  .getElementById("botonEntrenamiento")
  .addEventListener("click", function () {
    /*
     *Espera click al boton para entrenar, envia los datos a la red neuronal y muestra los botones que estaban ocultos
     *
     * @param {str}: click
     */
    modelo.train(generarListaEntrenamiento());
    document.getElementById("entrenamientoListo").style.display = "block";
    document.getElementById("preguntar").style.display = "block";
  });

function generarListaEntrenamiento() {
  /*
   * Esta funcion genera una lista con colores para el entrenamiento de la red
   *
   * @returns {array} arreglo con los colores (input) y su resultado (output)
   */
  var lista = [];

  // Blanco (255, 255, 255)
  lista[0] = { input: [255 / 255, 255 / 255, 255 / 255], output: { claro: 1 } };

  // Negro (0, 0, 0)
  lista[1] = { input: [0, 0, 0], output: { oscuro: 1 } };

  // Otros colores claros
  // lista[2] = { input: [255 / 255, 255 / 255, 0], output: { claro: 1 } }; // Amarillo
  // lista[3] = { input: [0, 255 / 255, 0], output: { claro: 1 } }; // Verde
  // lista[7] = { input: [129 / 255, 129 / 255, 129 / 255], output: { oscuro: 1 } }; //ultimo claro

  // Otros colores oscuros
  // lista[4] = { input: [128 / 255, 0, 0], output: { oscuro: 1 } }; // Rojo oscuro
  // lista[5] = { input: [0, 0, 128 / 255], output: { oscuro: 1 } }; // Azul oscuro
  // lista[6] = { input: [127 / 255, 127 / 255, 127 / 255], output: { oscuro: 1 } }; //ultimo oscuro

  console.log(JSON.stringify(lista));
  return lista;
}

document
  .getElementById("botonResultado")
  .addEventListener("click", function () {
    var color = document.getElementById("colorSeleccionado").value;
    const r = parseInt(color.substring(1, 2), 16);
    const g = parseInt(color.substring(3, 2), 16);
    const b = parseInt(color.substring(5, 2), 16);
    var salida = modelo.run([r / 255, g / 255, b / 255]);
    console.log(JSON.stringify(salida));
    var resultado = esOscuro(salida.oscuro);
    document.getElementById("resultadoFinal").innerHTML =
      "El color es " + resultado;
  });

function esOscuro(salida) {
  if (salida > 0.5) {
    return "oscuro";
  } else {
    return "claro";
  }
}
