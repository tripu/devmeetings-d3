let header = d3.select('.header')
  .text(`D3 versión ${d3.version}`)
  .style('text-transform', 'uppercase');

let svg = d3.select('#main-content').select('svg');

// Típicamente tendremos un array de datos
const datos = ['circulo', 'circulo', 'circulo', 'circulo'];

// Vamos a crear hacer un JOIN de los datos con el SVG.
let circles = svg.selectAll('circle').data(datos);

// Distinguimos los datos sin correspondencia DOM
let new_circles = circles.enter();

// Distinguimos los elementos DOM sin dato
let old_circles = circles.exit();

// 5/ Tenemos que crear el DOM de los nuevos circulos.
new_circles.append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 20)
  .attr('fill', 'steelblue');
