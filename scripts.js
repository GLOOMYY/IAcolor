var modelo = new brain.NeuralNetwork();

document.getElementById("botonEntrenamiento").addEventListener("click", function(){

  modelo.train(generarListaEntrenamiento())
  document.getElementById("entrenamientoListo").style.display = "block";
  document.getElementById("preguntar").style.display = "block";

});



function generarListaEntrenamiento(){
  /*
  Esta funcion genera una lista con colores para el entrenamiento de la red
  * 
  * @returns {array} arreglo con los colores (input) y su resultado (output)
  */
  var lista = [];

  //Blanco (255,255,255)
  lista[0] = {input:[255/255,255/255,255/255], output:{claro:1}} // Dividimos entre 255 mismo para asi obtener un valor entre 0 y 1, y asi calcular mejor los datos

  // Negro (0,0,0)
  lista[1] = {input:[0,0,0],output:{oscuro:1}}

  console.log(JSON.stringify(lista));
  return lista;
}

document.getElementById("botonResultado").addEventListener("click", function(){

  var color = document.getElementById("colorSeleccionado").value;
  const r = parseInt(color.substring(1,2),16);
  const g = parseInt(color.substring(3,4),16);
  const b = parseInt(color.substring(5,6),16);
  var salida = modelo.run([r/255,g/255,b/255]);
  console.log(JSON.stringify(salida))
  var resultado = esOscuro(salida.oscuro);
  document.getElementById(resultadoFinal).innerHTML= "El color es "+resultado;
});

function esOscuro(salida){
  if (salida>0.5){
    return 'oscuro'
  } else if (salida<0.5){
    return 'claro'
  } else {
    return 'algo no anda bien'
  }
}