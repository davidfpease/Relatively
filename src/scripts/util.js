const burger = new Image();
burger.src = './src/assets/hamburger-solid.svg';

const house = new Image();
house.src = './src/assets/home-solid.svg';

const school = new Image();
house.src = './src/assets/school-solid.svg';



export const comparators = {
  "burger": 4,
  "house": 400000,
  "middle-school": 26500000,

}

export function validData() {
  let userInputDollar = document.getElementById("dollar_input");
  const userCompSelection = document.getElementById('comps');
  let inputValueNoCommmas = userInputDollar.value.replace(/,/g, '');
  let numCheck = /^\d+$/.test(inputValueNoCommmas);

  if (numCheck && userCompSelection.value !== 'empty' && inputValueNoCommmas.length >0){
    return true;
  } else {
    return false;
  }

}

export function reset(e) {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('dollar_input').value = '';
  document.getElementById('comps').value = 'empty';
  d3.select(".total").text('');

}
//export const burger = new Image



//new Path2D("M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z");