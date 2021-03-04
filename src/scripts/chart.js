export function drawGraph() {

  let body = document.querySelector('body');
  const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const width = body.offsetWidth + parseInt(getComputedStyle(body).borderRightWidth);

  const background = document.getElementById("background");
  const ctxBackground = background.getContext('2d');
  background.height = height;
  background.width = width;
  background.style.position = "absolute";
  console.log(background);

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  canvas.height = height;
  canvas.width = width;
  canvas.style.position = "absolute";
  console.log(canvas);

  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
  svg.style.position = "relative";
  console.log(svg);

  const brush = d3
    .brush()
    .on("start brush", brushed)
    .on("end", end);

  const scanned = [];
  const selected = [];
  const r = 4.5;
  const dotWidth = r * 2.1;
  let comparators = 100000;
  const numColumns = Math.floor(width / dotWidth);
  let data = getData(numColumns);
  console.log(`numColumns = ${numColumns}`)
  console.log(data);

  function getData(numColumns){
    let i = 0;
    let data = [];

    let row = r * 2.1;
    console.log(row);
    while (i < comparators) {
      let column = i % numColumns;

      if (i > 0 && column === 0) {
        row += dotWidth;
      }
      data.push([dotWidth / 2 + (column * dotWidth), row]);
      i++;
    }
    return data;



  }

  function circle(ctx, x, y, radius) {
    ctx.lineWidth = radius * 2;
    ctx.lineCap = 'round';
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + .1);
  }



  function renderBackground(ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#220";
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    for (const [x, y] of data) circle(ctx, x, y, r);
    ctx.stroke();
  }

  function renderSelected(ctx) {
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    for (const d of scanned) circle(ctx, d[0], d[1], r);
    ctx.strokeStyle = `rgba(200, 183, 52,0.7)`;
    ctx.stroke();

    ctx.beginPath();
    for (const d of selected) circle(ctx, d[0], d[1], r);
    ctx.strokeStyle = `rgba(230,0,0,0.9)`;
    ctx.stroke();
  }

  renderBackground(ctxBackground);

  svg
    .append("g")
    .call(brush)
    .call(brush.move, [[100, 100], [400, 300]]);



    console.log("quadtree");
    

  function brushed({ selection }) {

    let quadtree = d3.quadtree()
      .extent([[-1, -1], [width + 1, height + 1]])
      .addAll(data)

    if (selection) search(quadtree, selection, scanned, selected);
    renderSelected(ctx);
  }

  function end() {
    canvas.dispatchEvent(new CustomEvent('input'));
  }

  canvas.value(selected);

}



function search(quadtree, [[x0, y0], [x3, y3]], scanned, selected) {
  scanned.length = 0;
  selected.length = 0;
  quadtree.visit((node, x1, y1, x2, y2) => {
    if (!node.length) {
      do {
        const { data: d, data: [x, y] } = node;
        const test = x >= x0 && x < x3 && y >= y0 && y < y3;
        test ? selected.push(d) : null;
        return test;
      } while ((node = node.next));
    }
    return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
  });
}