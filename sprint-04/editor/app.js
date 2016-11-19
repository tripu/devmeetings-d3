let svg = d3.select('#svg');

let tooltip = d3.select('#tooltip')

let rect = svg.append('rect')
  .attr('x', 20)
  .attr('y', 20)
  .attr('width', 100)
  .attr('height', 100)
  .attr('fill', 'steelblue');

// 3/ El mouse-enter
rect.on('mouseenter', ()=> {
  tooltip.style('display', 'block');
})

// 8/ El mouse-move
rect.on('mousemove', ()=> {
  if (tooltip.style('display') === 'none') tooltip.style('display', 'block');
  const tooltip_height = tooltip.node().getBoundingClientRect().height
  const tooltip_width = tooltip.node().getBoundingClientRect().width
  tooltip
    .style('top', `${d3.event.pageY - tooltip_height - 20}px`)
    .style('left', `${d3.event.pageX - tooltip_width/2}px`);
})

// 3/ El mouse leave
rect.on('mouseleave', ()=> {
  tooltip.style('display', 'none');
})
