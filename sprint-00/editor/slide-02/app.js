// Podemos seleccionar etiquetas.
let body = d3.select('body');

// Podemos seleccionar por clase
let header = d3.select('.header');

// Podemos seleccionar por id
let main = d3.select('#main-content');

// Podemos crear nuevos elementos con append
let svg = body.append('svg');

// Podemos cambiar el texto (ES6):
header.text(`D3 versión ${d3.version}`);

// Podemos cambiar el estilo
header.style('text-transform', 'uppercase');

// Podemos añadir atributos
body.attr('class', 'body');
