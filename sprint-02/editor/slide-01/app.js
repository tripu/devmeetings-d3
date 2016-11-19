// 3/ Seleccionamos los elementos HTML
let r1 = d3.select('#r1')
let r2 = d3.select('#r2')
let p = d3.select('#p')

// Podemos hacer un bind de cualquier evento
r1.on('mouseenter', ()=> { p.text('Has entrado en r1') })
// Cualquiera
r1.on('mousemove', ()=> { p.text('Te mueves por r1') })

// Además si no usas =>, en "this" está el nodo DOM
r2.on('click', function() { d3.select(this).attr('fill', 'pink'); })
