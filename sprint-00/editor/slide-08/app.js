let header = d3.select('.header')
  .text(`D3 versión ${d3.version}`)
  .style('text-transform', 'uppercase');

let svg = d3.select('#main-content').select('svg');

// 7/ Típicamente no vendrá un array de String, sino un JSON
const datos = [
  { color: 'steelblue', radius: '25'},
  { color: 'turqouise', radius: '25'},
  { color: 'steelblue', radius: '30'},
  { color: 'gray', radius: '15'},
  { color: 'steelblue', radius: '20'}
];

let circles = svg.selectAll('circle').data(datos);

let new_circles = circles.enter();

let old_circles = circles.exit();

// 5/ Usamos las arrow functions para obtener los datos
new_circles.append('circle')
  .attr('cx', (d, i)=> { return 50+100*i })
  .attr('cy', 50)
  .attr('r', d=>+d.radius)
  .attr('fill', d=>d.color);
