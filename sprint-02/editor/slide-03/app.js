// 6/ Nos creamos un <rect>
let rect = d3.select('svg').append('rect')
  .attr('x', 20)
  .attr('y', 20)
  .attr('width', 30)
  .attr('height', 30)
  .attr('fill', 'steelblue');

// 3/ Una transicion sencilla se puede conseguir asi
rect.transition()
  .duration(1000)
  .attr('width', 300);

// 4/ Se pueden retrasar
rect.transition()
  .delay(1500)
  .duration(1000)
  .attr('height', 300);

// 5/ Se pueden combinar varios cambios
rect.transition()
  .duration(1000)
  .attr('width', 50)
  .attr('height', 50)
  .style('opacity', .5)

// 6/ Se pueden anidar transiciones
rect.transition()
  .duration(300)
  .attr('width', 300)
  .transition()
    .duration(300)
    .attr('height', 300);

// 6/ Tienen eventos propios
rect.transition()
  .duration(500)
    .style('opacity', 0)
    .on('end', function() {
      d3.select(this).remove();
    });
