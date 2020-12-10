import { comparators, reset, validData } from "./scripts/util.js";
import { getDoDData } from "./scripts/dodData.js";
import "./styles/index.scss";
// SVG images from FontAwesome
// https://fontawesome.com/license




const comps = comparators;
const dod = getDoDData();

// get user input value
let userInputDollar = document.getElementById("dollar_input");
const userCompSelection = document.getElementById('comps');


const burger = new Image();
burger.src = './src/assets/hamburger-solid.svg';
const house = new Image();
house.src = './src/assets/home-solid.svg';
const school = new Image();
school.src = './src/assets/school-solid.svg';

userCompSelection.addEventListener('change', ()=> {
  userCompSelection.className='';
})

userInputDollar.addEventListener("keydown", e => {
  
  if (e.key === 'Enter') {
    if (userCompSelection.value === 'empty') {
      userCompSelection.classList.add('wrong');
    }
    else if (validData()) {
      drawGraph();
      document.getElementById('dollar_input').value = '';
    }
  }
});

userInputDollar.addEventListener("keyup", e => {
  let input = document.getElementById('dollar_input');
  let inputBar = document.getElementById('dollar_input');
  let inputValueNoCommmas = input.value.replace(/,/g, '');
  let numCheck = /^\d+$/.test(inputValueNoCommmas);
  
  if (!numCheck && input.value.length >0){
    //input.value = input.value.slice(0,-1);
    inputBar.classList.add("wrong");
  } else if (numCheck && input.value.length >0) {
    inputBar.className = '';
    inputBar.value = parseInt(inputValueNoCommmas).toLocaleString('en', { useGrouping: true });
  }  
});

userCompSelection.addEventListener("keydown", e => {
  if (e.key === 'Enter') {
    if (validData()) {
      //add a validation function to check user input first
      drawGraph();
      document.getElementById('dollar_input').value = '';
    }
  }
});

document.querySelector(".reset-button").addEventListener("click", reset);

document.querySelector(".dod-button").addEventListener("click", () => {
  getDoDData().then(totalAwarded => {
    userInputDollar.value = totalAwarded.toLocaleString('en',{ useGrouping: true});
    userCompSelection.value = "middle-school";
    debugger;
    drawGraph();
  });
});


function drawGraph() {
  const userInput = document.getElementById('dollar_input').value.replace(/,/g, '');
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
  const totalComparatorsCommas = totalComparators.toLocaleString('en', { useGrouping: true })
  const numColumns = Math.ceil(Math.sqrt(totalComparators));


  let body = document.querySelector('body');
  const vw = body.offsetWidth + parseInt(getComputedStyle(body).borderRightWidth);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const itemWidth = vw/numColumns;
  

  
  
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
    context.strokeText(`${totalComparatorsCommas} ${userCompSelection.value}s!`, vw / 2, vh * .4);
    context.lineWidth = 1;
    context.fillText(`${totalComparatorsCommas} ${userCompSelection.value}s!`,vw/2,vh*.4)


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


