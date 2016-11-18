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
  // Ahora metemos 5 circulos
  const nuevos_datos = ['circulo', 'circulo', 'circulo', 'circulo', 'circulo'];
  let circles = svg.selectAll('circle').data(nuevos_datos);
  let new_circles = circles.enter();
  // 5/ Claro, al ser más circulos, no van a caber, los apretamos un poco
  new_circles.append('circle')
    .attr('cx', (d, i)=> { return 40+80*i })
    .attr('cy', 50)
    .attr('r', 20)
    .attr('fill', 'steelblue');
  // Pero también hay que mover los circulos actuales
  circles.attr('cx', (d, i)=> { return 40+80*i })
}, 3000)
