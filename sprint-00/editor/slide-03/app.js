// 3/ En D3 se pueden concatenar las llamadas sobre una seleccion
let header = d3.select('.header')
  .text(`D3 versión ${d3.version}`)
  .style('text-transform', 'uppercase');

// Podemos hacer selecciones anidadas
let svg = d3.select('#main-content').select('svg');

// 6/ Creamos un círculo en el SVG!
svg.append('circle')
  .attr('class', 'circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 20)
  .style('fill', 'steelblue')
