const margin = {top: 10, bottom: 30, left: 40, right: 10}
const width = 600
const height = 100
let svg = d3.select('#svg')
  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)

let content = d3.append('g')
  .attr('class', 'content')
  .attr('transform', `translate(${margin.top}, ${margin.left})`);

// 2/ Generamos una escala para cada eje
let x_scale = d3.scaleLinear().domain([0, 1000]).range([0, width]);
let y_scale = d3.scaleLinear().domain([0, 1000]).range([height, 0]);

// 5/ Ejemplo de escala vertical
let y_axis_data = d3.axisLeft(y_scale).ticks(5);
let y_axis = svg.append('g')
  .attr('class', 'y axis')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);
y_axis.call(y_axis_data);

// 5/ Ejemplo de escala horizontal
let x_axis_data = d3.axisBottom(x_scale).ticks(7);
let x_axis = svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(${margin.left}, ${margin.top + height})`);
x_axis.call(x_axis_data);
