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

