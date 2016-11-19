// 2/ Podemos poner el viewBox nosotros
let svg = d3.select('#svg')
  .attr('viewBox', '0 0 400 600')
  .style('width', '100%')
  .style('height', '400px')

let legend_container = svg.append('g').attr('class', 'container');

let idem = (datos)=> {
  let leyenda = legend_container.selectAll('g').data(datos);
  let nueva_leyenda = legend_container.enter();
  let vieja_leyenda = legend_container.exit();

  // Los elementos que sobran son faciles
  vieja_leyenda.remove();

  // 3/ Ojo que, como ahora no es solo un elemento, sino varios, hay que guardar la info;
  let nuevos_items = nueva_leyenda.append('g')
    .attr('transform', (d,i)=> {return `translate(${20, 30*(i+1)})`})

  // 6/ Colocamos un rect
  nuevos_items.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', d=>d.color)

  // 3/ Pero tambien un text
  nuevos_items.append('text')
    .attr('x', 25)
    .text(d=>d.nombre)

  // 2/ Los elementos actuales hay que actualizarlos, pero es más facil
  leyenda.select('rect').attr('fill', d=>d.color)
  leyenda.select('text').text(d=>d.nombre)
}


// 7/ Datos para la leyenda
let datos_1 = [
  {nombre: 'Jorge', color: 'blue'},
  {nombre: 'Antonio', color: 'red'},
  {nombre: 'María', color: 'green'},
  {nombre: 'Luis', color: 'pink'},
  {nombre: 'Clara', color: 'steelblue'},
]

// 7/ Llamamos a la funcion
idem(datos_1);
setTimeout(()=> {
  datos_1.pop();
  datos_1.pop();
  datos_1.push({'Eva', color: 'brown'})
  idem(datos_1)
}, 3000)
