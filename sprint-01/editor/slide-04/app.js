let idempotente = (datos)=> {
  let svg = d3.select('#svg');

  let container = svg.select('.container');
  if (container.empty()) {
    container = svg.append('g')
      .attr('class', 'container')
      .attr('transform', 'translate(75, 75)');
  }

  let circulos = container.selectAll('circle').data(datos)
  let nuevos_circulos = circulos.enter();
  let viejos_circulos = circulos.exit();

  nuevos_circulos.append('circle')
    .attr('cx', (d,i)=> {return 75*i})
    .attr('cy', 0)
    .attr('fill', d=>d.color)
    .attr('r', d=>d.radio)

  circulos
    .attr('fill', d=>d.color)
    .attr('r', d=>d.radio)

  viejos_circulos.remove();
}

idempotente([{color: 'steelblue', radio:50}, {color: 'turquoise', radio:50}])

setTimeout(()=> {
  idempotente([{color: 'steelblue', radio:25}])
}, 3000);

setTimeout(()=> {
  idempotente([{color: 'turquoise', radio:40}, {color: 'pink', radio:50}])
}, 6000);
