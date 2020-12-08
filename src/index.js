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
  const userInput = 100000;//document.getElementById('dollar_input').value;
  const comparatorValue = 4;//comps[document.getElementById('comparators').value];
  const totalComparators = Math.ceil(userInput/comparatorValue);
  const numColumns = Math.ceil(Math.sqrt(totalComparators));
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const itemWidth = vw/numColumns;
  console.log(itemWidth);

  let data = [];
  let row = itemWidth/2;
  let x = itemWidth/2;
  let i = 0;
  while (i < totalComparators) {
    let column = i % numColumns;
    if (i>0 && column === 0){
      row += itemWidth;
    }
    data.push([x + (column * itemWidth),row]);
    i++;
  }
//debugger;


  //const data = [[1,2], [6,2], [11,2], [16,2]];

  const whiteBoard = d3.select("canvas")
    .call(d3.zoom()
    .scaleExtent([.1, 8])
    .on("zoom", zoom))
    .attr("width", vw)
    .attr("height",vw);

  const context = whiteBoard.node().getContext("2d");

  draw();

  function zoom() {
    var transform = d3.event.transform;
    context.save();
    context.clearRect(0, 0, vw, vw);
    context.translate(transform.x, transform.y);
    context.scale(transform.k, transform.k);
    draw();
    context.restore();
  }

  function draw() {
    let i = -1;
    let n = data.length;
    let d;
    context.beginPath();
    while (++i < n) {
      d = data[i];
      context.moveTo(d[0], d[1]);
      context.arc(d[0], d[1], itemWidth/2, 0, 2 * Math.PI);
    }
    context.fill();
  }

  // //num rows and columns
  // const numCols = Math.ceil(Math.sqrt(totalComparators));
  // //const numRows = Math.ceil(totalComparators/numCols)
  
  // const x = d3.scaleBand()
  //           .range([0, vw])
  //           .domain(d3.range(numCols));

  // const y = d3.scaleBand()
  //           .range([0,vw])
  //           .domain(d3.range(numCols));

  // const g = whiteBoard.append("g");

  // const circle = g.selectAll("circle")
  //   .data(data)
  //   .enter().append("circle")
  //   .attr('cx', function (d) { return x(d % numCols) })
  //   .attr('cy', function (d) { return y(Math.floor(d / numCols)) })
  //   .attr("r", 1.5)
  //   //.attr("transform", function (d) { return "translate(" + d + ")"; });

  // whiteBoard.append("rect")
  //   .attr("fill", "none")
  //   .attr("pointer-events", "all")
  //   .attr("width", vw)
  //   .attr("height", vh)
  //   .call(d3.zoom()
  //     .scaleExtent([.1, 10])
  //     .on("zoom", zoom));

  // function zoom() {
  //   g.attr("transform", d3.event.transform);
  // }
}