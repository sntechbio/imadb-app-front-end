const url = "http://localhost:8080/api/analises/correlacao"

let heatmapData;

document.querySelector('#inputGroupFileAddon04').addEventListener('click', function(){
  const file = document.querySelector('#inputGroupFile04').files[0];
  const formData = new FormData();
  formData.append('file',file);

  axios.post(url, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }).then(response => {
      heatmapData = response.data;
      console.log(response);
      plotHeatMap(heatmapData);
  }).catch(error => {
      console.log(error);
  });
});

function plotHeatMap(heatmapData) {
  const width = 500;
  const height = 500;
  const xLabels = heatmapData.map(d => d.a);
  const yLabels = heatmapData.map(d => d.b);

  const xScale = d3.scaleBand()
    .domain(xLabels)
    .range([0, width]);

  const yScale = d3.scaleBand()
    .domain(yLabels)
    .range([0, height]);

  const colorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(['white', 'red']);

  const svg = d3.select("#heatmap")
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const rects = svg.selectAll('rect')
    .data(heatmapData)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.a))
    .attr('y', d => yScale(d.b))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .style('fill', d => colorScale(d.value));
}

/* function plotHeatMap(data) {
  const width = 400;
  const height = 400;
  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };
  const padding = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };
  const svg = d3.select('#heatmap')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.a))
    .range([margin.left + padding.left, width - margin.right - padding.right]);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.b))
    .range([margin.top + padding.top, height - margin.bottom - padding.bottom]);

  const colorScale = d3.scaleLinear()
    .domain([0,1])
    .range(['#f2f2f2','#006699']);

  const xAxis = d3.axisBottom(xScale)
    .tickSizeOuter(0);

  const yAxis = d3.axisLeft(yScale)
    .tickSizeOuter(0);

  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom - padding.bottom})`)
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${margin.left + padding.left}, 0)`)
    .call(yAxis);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.a))
    .attr('y', d => yScale(d.b))
    .attr('width', (width - margin.left - margin.right - padding.left - padding.right) / 6)
    .attr('height', (height - margin.top - margin.bottom - padding.top - padding.bottom) / 6)
    .style('fill', d => colorScale(d.value))
    .style('stroke', '#000000');

} */

