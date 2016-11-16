d3.json('https://s3-eu-west-1.amazonaws.com/jorge-aguirre/devmeetings.json', (error, full_data)=> {

  const data_filter = (data, year)=> {
    return data.filter((d)=> { return d.date.endsWith(year) });
  }

  const update_graphs = ()=> {

    const year_value = d3.select('#year-selector').property('value');
    const yearly_data = data_filter(full_data, year_value);

    const hashtag_data = yearly_data.map((d)=> { return { 'hashtag': d.hashtag }; });
    update_hashtag_section(hashtag_data);

    const age_data = yearly_data.map((d)=> { return { 'age': d.user.age }; });
    update_age_groups_section(age_data);

    const category_data = yearly_data.map((d)=> { return { 'category': d.category }; });
    update_categories_section(category_data);

    const males = d3.sum(yearly_data, (d)=> { return d.user.gender === 'male' ? 1 : 0 });
    const females = yearly_data.length - males;
    update_bar_chart_gender(males, females);
  };

  update_graphs();

  d3.select('#year-selector').on('change', update_graphs);

  function update_hashtag_section(data) {
    let hashtags = {};
    data.forEach((element)=> {
      if (hashtags[element.hashtag] === undefined) hashtags[element.hashtag] = 1;
      else hashtags[element.hashtag]++;
    });

    let hashtags_array = [];
    for (let key in hashtags) hashtags_array.push({tag: key, value: hashtags[key]});

    hashtags_array.sort((d1, d2)=> { return d1.value - d2.value; });

    const pie_transform = d3.pie().sort(null).value((d)=> { return d.value; });

    hashtags_array = pie_transform(hashtags_array);

    const radius = 450;
    const pie_arc = d3.arc().outerRadius(radius).innerRadius(0);
    const colors = d3.schemeCategory10;

    let svg = d3.select('#hashtag-section');
    let container = svg.select('.container');

    if (container.empty()) {
      container = svg.append('g')
        .attr('class', 'container')
        .attr('transform', 'translate(500, 500)')
    }

    let updated_data = container.selectAll('.arc').data(hashtags_array);
    let new_data = updated_data.enter();
    let old_data = updated_data.exit();

    new_data.append('path')
      .attr('class', 'arc')
      .attr('d', pie_arc)
      .style('fill', (element, index)=> { return colors[index]; });

    updated_data
      .attr('d', pie_arc)
      .style('fill', (element, index)=> { return colors[index]; });

    old_data.remove();

  }

  function update_age_groups_section(data) {
    let age_distribution = [
      { group: '0-18', total: 0 },
      { group: '18-25', total: 0 },
      { group: '25-35', total: 0 },
      { group: '35-50', total: 0 },
      { group: '50+', total: 0 },
    ];

    data.forEach((element)=> {
      if (element.age < 18) age_distribution[0].total++;
      else if (element.age < 25) age_distribution[1].total++;
      else if (element.age < 35) age_distribution[2].total++;
      else if (element.age < 50) age_distribution[3].total++;
      else age_distribution[4].total++;
    });

    const pie_transform = d3.pie().sort(null).value((d)=> { return d.total; });

    age_distribution = pie_transform(age_distribution);

    const radius = 450;
    const pie_arc = d3.arc().outerRadius(radius).innerRadius(radius/2);
    const colors = d3.schemeCategory10;

    let svg = d3.select('#age-groups-section');
    let container = svg.select('.container');
    if (container.empty()) {
      container = svg.append('g')
       .attr('class', 'container')
       .attr('transform', 'translate(500, 500)')
    }

    let updated_data = container.selectAll('.arc').data(age_distribution);
    let new_data = updated_data.enter();
    let old_data = updated_data.exit();

     new_data.append('path')
       .attr('class', 'arc')
       .attr('d', pie_arc)
       .style('fill', (element, index)=> { return colors[index]; });

     updated_data
       .attr('d', pie_arc)
       .style('fill', (element, index)=> { return colors[index]; });

     old_data.remove();
  }

  function update_categories_section(data) {
    let categories = []; // Array will be filled with {key: 'category', value: 0} objects

    data.forEach((element)=> {
      for (let index in categories) {
        if (categories[index].key === element.category) {
          categories[index].value++;
          return;
        }
      }
      categories.push({key: element.category, value: 1});
    });

    let previous_total = 0;
    categories = categories.map((element)=> {
      const result = {value: element.value, offset: previous_total};
      previous_total += element.value;
      return result;
    });

    let total = d3.sum(categories, (element)=> { return element.value; });
    let x_scale = d3.scaleLinear().domain([0, total]).range([0, 1800]);
    let colors = d3.schemeCategory20;

    let container = d3.select('#categories-section').select('#stacked-bar-container');
    if (container.empty()) {
      container = d3.select('#categories-section')
        .append('g')
        .attr('id', 'stacked-bar-container')
        .attr('transform', 'translate(100, 0)');
    }

    let categories_elements = container.selectAll('.category').data(categories);
    let new_categories_elements = categories_elements.enter();
    let old_categories_elements = categories_elements.exit();

    new_categories_elements.append('rect')
      .classed('category', true)
      .attr('y',  20)
      .attr('height', 80)
      .attr('x', (d)=> { return x_scale(d.offset); })
      .attr('width', (d)=> { return x_scale(d.value); })
      .attr('fill', (d, i)=> { return colors[i%20]; });

    categories_elements
      .attr('x', (d)=> { return x_scale(d.offset); })
      .attr('width', (d)=> { return x_scale(d.value); })
      .attr('fill', (d, i)=> { return colors[i%20]; });

    old_categories_elements.remove();
  }

  function update_bar_chart_gender(males, females) {
    let genders = [
      {gender: 'female', value: females, offset: 0},
      {gender: 'male', value: males, offset: females}
    ];
    let total = d3.sum(genders, (element)=> { return element.value; });
    let x_scale = d3.scaleLinear().domain([0, total]).range([0, 1800]);
    let colors = ['rgb(71,141,205)' ,'pink'];

    let container = d3.select('#gender-section').select('#stacked-bar-container');
    if (container.empty()) {
      container = d3.select('#gender-section')
        .append('g')
        .attr('id', 'stacked-bar-container')
        .attr('transform', 'translate(100, 20)');
    }

    let genders_elements = container.selectAll('.gender').data(genders);
    let new_genders_elements = genders_elements.enter();
    let old_genders_elements = genders_elements.exit();

    new_genders_elements.append('rect')
      .classed('gender', true)
      .attr('x', (d)=> { return x_scale(d.offset); })
      .attr('y',  0)
      .attr('height', 60)
      .attr('width', (d)=> { return x_scale(d.value); })
      .attr('fill', (d, i)=> { return colors[i]; });

    genders_elements
      .attr('x', (d)=> { return x_scale(d.offset); })
      .attr('width', (d)=> { return x_scale(d.value); })
      .attr('fill', (d, i)=> { return colors[i]; });

    old_genders_elements.remove();
  }

});
