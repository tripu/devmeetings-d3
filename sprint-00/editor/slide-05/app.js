let header = d3.select('.header')
  .text(`D3 versión ${d3.version}`)
  .style('text-transform', 'uppercase');

let svg = d3.select('#main-content').select('svg');

const datos = ['circulo', 'circulo', 'circulo', 'circulo'];

let circles = svg.selectAll('circle').data(datos);

let new_circles = circles.enter();

let old_circles = circles.exit();

// 5/ Los datos además de un valor constante, admiten una function(d, i, array)
new_circles.append('circle')
  .attr('cx', (d, i)=> { return 50+100*i })
  .attr('cy', 50)
  .attr('r', 20)
  .attr('fill', 'steelblue');
