var modelo = new brain.NeuralNetwork();
var lista = [];
var resultado = "";


document.getElementById("botonEntrenamiento").addEventListener("click", function () {
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
  // Blanco (255, 255, 255)
  lista.push({ input: [255 / 255, 255 / 255, 255 / 255], output: { claro: 1 } });
  // Negro (0, 0, 0)
  lista.push({ input: [0, 0, 0], output: { oscuro: 1 } });
  // Gris Claro (192, 192, 192)
  lista.push({ input: [192/255,192/255,192/255], output: { claro: 1 } });
  // Gris Oscuro (64,64,64)
  lista.push({ input: [64/255,64/255,64/255], output: { oscuro: 1 } });

  console.log(JSON.stringify(lista));
  return lista;
}

document.getElementById("botonResultado").addEventListener("click", function () {
  var color = document.getElementById("colorSeleccionado").value;
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  var rgb = [r / 255, g / 255, b / 255]
  var salida = modelo.run(rgb);
  console.log(JSON.stringify(rgb));
  console.log(JSON.stringify(salida));
  var resultado = esOscuro(salida.oscuro);
  document.getElementById("resultadoFinal").innerHTML = "El color es " + resultado;
  document.getElementById("botonIncorrecto").style.display = "block";
});

function esOscuro(salida) {
  if (salida > 0.5) {
    return "oscuro";
  } else {
    return "claro";
  }
}

document.getElementById("botonIncorrecto").addEventListener("click", function () {
  if (resultado == "oscuro"){
    lista.push({input: rgb, output: {claro:1}})
  } else {
    lista.push({input: rgb, output: {oscuro:1}})
  }
  console.log(JSON.stringify(lista));
  modelo.train(lista)
});