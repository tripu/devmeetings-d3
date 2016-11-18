let header = d3.select('.header')
  .text(`D3 versión ${d3.version}`)
  .style('text-transform', 'uppercase');

let svg = d3.select('#main-content').select('svg');

const datos = ['circulo', 'circulo', 'circulo', 'circulo'];

let circles = svg.selectAll('circle').data(datos);

let new_circles = circles.enter();

let old_circles = circles.exit();

new_circles.append('circle')
  .attr('cx', (d, i)=> { return 50+100*i })
  .attr('cy', 50)
  .attr('r', 20)
  .attr('fill', 'steelblue');

// Ponemos un timeout y volvemos a hacer el JOIN. Ahora hay elementos DOM.
setTimeout(()=> {
  // Ahora metemos 2 circulos
  const nuevos_datos = ['circulo', 'circulo'];
  let circles = svg.selectAll('circle').data(nuevos_datos);
  let old_circles = circles.exit();
  // Los DOM sin datos, típicamente se borran.
  old_circles.remove();
  // Vamos cambiar alguna cosa de los circulos actuales
  circles.attr('fill', 'turquoise')
}, 3000)
