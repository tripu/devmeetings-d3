d3.json('https://s3-eu-west-1.amazonaws.com/jorge-aguirre/devmeetings.test.json', (e, datos)=> {


  let svg = d3.select('#svg')

  svg.attr('viewBox', `0 0 ${datos.length*100} 200`)

  let circulos = svg.selectAll('circle').data(datos);
  let circulos_nuevos = circulos.enter()
  let circulos_obsoletos = circulos.exit()

  circulos_nuevos.append('circle')
    .attr('cx', (d,i)=> { return 50+100*i})
    .attr('cy', (d, i)=> {
      return 100 - 20*Math.abs(i-4)
    })
    .attr('r', (d)=> {
      if (d.size === 'small') return 20;
      else if (d.size === 'medium') return 30;
      else if (d.size === 'large') return 40;
    })
    .attr('fill', (d)=> {return d.color})
    .attr('stroke', (d)=> { if (d.border) return 'black' })
    .attr('stroke-width', '2px')
})
