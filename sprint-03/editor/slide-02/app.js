const margin = {top: 10, bottom: 30, left: 40, right: 10}
const width = 600
const height = 100
let svg = d3.select('#svg')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)

let content = d3.append('g')
  .attr('class', 'content')
  .attr('transform', `translate(${margin.top}, ${margin.left})`);

const asignaturas = [
  {asignatura: 'Mates', nota: 57},
  {asignatura: 'Física', nota: 72},
  {asignatura: 'Historia', nota: 17},
  {asignatura: 'Sociales', nota: 65},
  {asignatura: 'Lengua', nota: 89},
  {asignatura: 'Quimica', nota: 59}
]

// 4/ Importante que el dominio es una serie de valores, correspondientes a cada banda
let x_scale = d3.scaleBand()
  .domain(asignaturas.map(d=>d.asignatura))
  .range([0, width])
  .paddingInner(.2);

// 7/ La x y el ancho lo dan la escala de bandas!!
content.selectAll('rect').enter()
  .append('rect')
  .attr('x', (d)=> { return x_scale(d.asignatura) })
  .attr('width', (d)=> { return x_scale.bandwidth() })
  .attr('y' (d)=> { return height - d.nota })
  .attr('height', d=>d.nota)
  .attr('fill', 'steelblue');
