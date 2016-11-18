// Cogemos el SVG
let svg = d3.select('#svg');

// Generamos datos:
const datos = [{value: 180}, {value: 260}, {value: 550}];

// 4/ Generamos nuestra escala.
let max_value = d3.max(datos, d=>d.value);
let linearScale = d3.scaleLinear()
  .domain([0, max_value])
  .range([0, 1000])

// Pintamos los rect. Solo contemplamos el enter.
let nuevos_rect = svg.selectAll('rect').data(datos).enter();

// 6/ Ojo que escalamos el valor, para que nos cuadre con el viewBox
nuevos_rect.append('rect')
  .attr('x', 0)
  .attr('y', (d,i)=> {return 100*i})
  .attr('height', 60)
  .attr('width', (d)=> { return linearScale(d.value); })
  .attr('fill', 'steelblue');
