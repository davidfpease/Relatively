// SVG images from FontAwesome
// https://fontawesome.com/license



import "./styles/index.scss";
import { comparators } from "./scripts/data.js";

const comps = comparators;
// get user input value
let userInputDollar = document.getElementById("dollar_input");
const userCompSelection = document.getElementById('comps');

const burger = new Image();
burger.src = './src/assets/hamburger-solid.svg';
const house = new Image();
house.src = './src/assets/home-solid.svg';
const school = new Image();
school.src = './src/assets/school-solid.svg';


userInputDollar.addEventListener("keydown", e => {
  if (e.key === 'Enter') {
    //add a validation function to check user input first
    drawGraph();
    document.getElementById('dollar_input').value = '';
  }
});

userCompSelection.addEventListener("keydown", e => {
  if (e.key === 'Enter') {
    //add a validation function to check user input first
    drawGraph();
    document.getElementById('dollar_input').value = '';
  }
});

document.querySelector(".reset-button").addEventListener("click", reset);

function reset(e) {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width, canvas.height);
  document.getElementById('dollar_input').value = '';
  document.getElementById('comps').value = 'None';
  d3.select(".total").text('');

}



function drawGraph() {
  const userInput = document.getElementById('dollar_input').value;
  const comparator = document.getElementById('comps').value;
  const comparatorValue = comps[comparator];
  let image;
  if (comparator === "burger"){
    image = burger;
  } else if (comparator === "house"){
    image = house;
  } else {
    image = school;
  }

 
  const totalComparators = Math.ceil(userInput/comparatorValue);
  const numColumns = Math.ceil(Math.sqrt(totalComparators));


  let body = document.querySelector('body');
  const vw = body.offsetWidth + parseInt(getComputedStyle(body).borderRightWidth);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const itemWidth = vw/numColumns;
  console.log(itemWidth);

  
  
  let data = [];
  let row = itemWidth/2;
  let x = itemWidth/2;
  let i = 0;

  

  //build grid 
  while (i < totalComparators) {
    let column = i % numColumns;
    if (i>0 && column === 0){
      row += itemWidth;
    }
    data.push([x + (column * itemWidth),row]);
    i++;
  }
  
  //addColors(data, numColumns);
  
  const whiteBoard = d3.select("canvas")
  .call(d3.zoom()
  .scaleExtent([.1, 8])
  .on("zoom", zoom))
  .attr("width", vw)
  .attr("height",vh);
  
  const context = whiteBoard.node().getContext("2d");
  
  // d3.select(".total").text(totalComparators + ` ${comparator}s!`)
  //   .transition().style("font-size", "100px").duration(1000);
  //   //.transition().position();

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
      context.drawImage(image, d[0], d[1], itemWidth - (.2 * itemWidth), itemWidth - (.2 * itemWidth));
      //context.arc(d[0], d[1], itemWidth/2, 0, 2 * Math.PI);
     
    }
    context.font = '75px Montserrat';
    context.fillStyle = '#b34d4d';
    context.textAlign= "center";
    context.strokeStyle= "black";
    context.miterLimit = 2;
    context.lineJoin = 'circle';
    context.lineWidth = 2;
    context.strokeText(`${totalComparators} ${userCompSelection.value}s!`, vw / 2, vh * .4);
    context.lineWidth = 1;
    context.fillText(`${totalComparators} ${userCompSelection.value}s!`,vw/2,vh*.4)


  }
}



const addColors = function(data, columns) {
  let length = data.length;
  let step = Math.ceil(254/columns);
  let r = 0;
  let g = 255;
  let b = 0;
  let i = 0;
  let index = 0;
  let colorArray = [];

  while (i < length) {
    let colNum = i % columns;

    if (i > 0 && r >= 255) {
      r = 0;
    }
    if (i > 0 && g <= 0) {
      g = 255;
    }
    if (i > 0 && b >= 255) {
      b = 0;
    }
    data[i].push(`rgb(${r},${g},${b})`);
    r += step;
    g -= step;
    b += step;
    i++;
  }
}


