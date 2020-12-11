import "./styles/index.scss";
import { comparators } from "./scripts/data.js";

const comps = comparators;
// get user input value
let userInputDollar = document.getElementById("dollar_input");
userInputDollar.addEventListener("keydown", e => {
  if (e.key === 'Enter') {
    //add a validation function to check user input first
    drawGraph();
  }
});


function drawGraph() {
  let userInput = 100000;//document.getElementById('dollar_input').value;
  let comparatorValue = 4;//comps[document.getElementById('comparators').value];
  let totalComparators = Math.ceil(userInput/comparatorValue);
;
  // 
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  const data = Array.from({ length: totalComparators }, (v, i) => i);

  const whiteBoard = d3.select("#whiteboard")
    .append("svg")
    .attr("viewBox", [0, 0, vw, vh]);


  //num rows and columns
  const numCols = Math.ceil(Math.sqrt(totalComparators));
  //const numRows = Math.ceil(totalComparators/numCols)
  
  const x = d3.scaleBand()
            .range([0, vw])
            .domain(d3.range(numCols));

  const y = d3.scaleBand()
            .range([0,vw])
            .domain(d3.range(numCols));

  const g = whiteBoard.append("g");

  const circle = g.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr('cx', function (d) { return x(d % numCols) })
    .attr('cy', function (d) { return y(Math.floor(d / numCols)) })
    .attr("r", 1.5)
    //.attr("transform", function (d) { return "translate(" + d + ")"; });

  whiteBoard.append("rect")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .attr("width", vw)
    .attr("height", vh)
    .call(d3.zoom()
      .scaleExtent([.1, 10])
      .on("zoom", zoom));

  function zoom() {
    g.attr("transform", d3.event.transform);
  }
}