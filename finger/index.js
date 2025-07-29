let triangle = document.getElementById("triangle");

function mapValue(inValue, minIn, maxIn, minOut, maxOut) {
  return ((inValue - minIn) * (maxOut - minOut)) / (maxIn - minIn) + minOut;
}

// Declarar variables para almacenar el nombre del estado actual y el anterior
var oldStateName = "";
var stateName = "";

// Función que recibe datos (coordenadas x, y) y actualiza la posición del triángulo en el mapa
Protobject.Core.onReceived((data) => {
  
  // Mapea el valor de data.y, que va de 0.2 a 0.8, al rango de 0 a 600 píxeles para el movimiento vertical
  let cursorTop = mapValue(data.y, 0.2, 0.8, 0, 600);
  triangle.style.top = cursorTop + "px"; // Actualiza la posición vertical del triángulo

  // Mapea el valor de data.x, que va de 0.2 a 0.8, al rango de 0 a 800 píxeles para el movimiento horizontal
  let cursorLeft = mapValue(data.x, 0.2, 0.8, 0, 800);
  triangle.style.left = cursorLeft + "px"; // Actualiza la posición horizontal del triángulo

  // Llama a la función para activar la detección de hover en base a las coordenadas del cursor
  activateHover(cursorLeft, cursorTop);
});

// Función que detecta si el cursor está sobre un estado en el mapa SVG
function activateHover(x, y) {
  
  // Obtiene el elemento en las coordenadas (x, y)
  var state = document.elementFromPoint(x, y);


  // Si el elemento es un <path> (que representa un estado en el SVG), obtenemos su id
  if (state && state.tagName === "path") {
    stateName = state.getAttribute("id");
  }

  // Si el estado detectado es diferente al anterior y no es undefined, procesa el nuevo estado
  if (stateName != oldStateName && stateName != undefined) {
    console.log("Estado seleccionado:", stateName); // Muestra en consola el estado seleccionado
    oldStateName = stateName; // Actualiza el estado anterior con el nuevo
    

    // Recorre los datos para encontrar el estado por su código y reproduce una descripción por audio
    countrydata.forEach(function (el) {
      if (el.code == stateName) {
        Protobject.TextToSpeech.play(
          "es-CL",
          el.state +
            " exporta " +
            parseInt(el["total exports"]) +
            " millones de dólares por año en fruta"
        );
      }
    });
  }
}
