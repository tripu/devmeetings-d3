// Establecemos unos margenes acorde a los ejes que vamos a usar
const margin = {top: 10, bottom: 30, left: 40, right: 10}

// 2/ Establecemos ancho y alto
const width = 600
const height = 400

// 2/ Generamos el viewbox
let svg = d3.select('#svg')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)

// 3/ Generamos el contenido
let content = svg.append('g')
  .attr('class', 'content')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// 6/ Veamos un rect como queda
content.append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'steelblue')
