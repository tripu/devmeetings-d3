// Cogemos el SVG
let svg = d3.select('#svg');

// Generamos datos:
const datos = [{value: 300}, {value: 150}, {value: 100}, {value: 50}];

// Esto genera un transformador para los datos
const pie_transform = d3.pie().sort(null).value(d=>d.value);

// 2/ Vamos a ver que quedaría
const datos_transformados = pie_transform(datos);
console.log(datos_transformados);

// Existe otra funcion llamada arc, que genera el arco del angulo indicado
const arc = d3.arc().outerRadius(100).innerRadius(0);

// Esto son unos colores muy bonicos que tiene d3 metidos es un array
const colors = d3.schemeCategory10;

// 5/ Arc es directamente la función que necesitamos, asi que la ponemos tal cual
svg.selectAll('path').data(datos_transformados)
  .enter()
    .append('path')
      .attr('d', arc)
      .attr('fill', (d,i)=> {return colors[i]})
