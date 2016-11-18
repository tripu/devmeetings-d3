// Generamos una escala lineal que transforma de [0-25] a [0, 100], vamos, un x4
let linearScale = d3.scaleLinear().domain([0, 25]).range([0, 100])

let body = d3.select('body');

// 2/ Escalar es facil
body.append('p')
  .text(`${17} escalado se transforma en: ${linearScale(17)}`);

// 2/ Escalar es muy facil
body.append('p')
  .text(`${12} escalado se transforma en: ${linearScale(12)}`)
