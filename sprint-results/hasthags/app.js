d3.json('https://s3-eu-west-1.amazonaws.com/jorge-aguirre/data.json', (e, datos)=> {

  hashtags(datos)

})


function hashtags(data) {

  let data_2016 = data.filter((dato)=> {
    return (dato.date.endsWith('2016'))
  })

  let hashtags = {}; // {netflix: 15, politica: 12} ....

  data_2016.forEach((dato)=> {
    if (hashtags[dato.hashtag] == undefined) hashtags[dato.hashtag] = 1
    else hashtags[dato.hashtag]++
  })

  let hashtag_array = []

  for (let key in hashtags) {
    hashtag_array.push({clave: key, valor: hashtags[key]})
  }

  const pie_transform = d3.pie().sort(null).value(d=>d.valor);
  const datos_transformados = pie_transform(hashtag_array);

  const arc = d3.arc().outerRadius(400).innerRadius(0);
  const colors = d3.schemeCategory10;

  let svg = d3.select("#hashtag").select(".container")

  svg.selectAll('path').data(datos_transformados)
    .enter()
      .append('path')
        .attr('d', arc)
        .attr('fill', (d,i)=> {return colors[i]})
}
