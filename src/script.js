function log(msg) {
  document.getElementById('log').textContent += msg + '\n';
}

var draw = SVG('drawing').size(1840, 500);

class NotGate {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.circle = draw.circle(12).fill('none')
      .attr({'stroke-width': 3, stroke: 'red'})
      .move(x + 16, y - 6);

    this.polygon = draw.polygon([[x + 16, y], [x - 28, y + 30], [x - 28, y - 30]])
      .attr({fill: 'none', 'stroke-width': 3, stroke: 'red'});
  }
  draw() {
    var x = this.x;
    var y = this.y;
    this.circle.move(x + 16, y - 6)
    this.polygon.plot([[x + 16, y], [x - 28, y + 30], [x - 28, y - 30]])
  }
  outputPos() {
    return [this.x + 28, this.y]
  }
  inputPos(){
    return [this.x - 28, this.y]
  }
}

class AndGate {
  constructor(x, y){
    this.x = x;
    this.y = y;

    const svg = document.getElementsByTagName('svg')[0];
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M ' + (x - 2) + ',' + (y - 30) + ' h -26 v 60 h 26 a 30 30 0 0 0 0 -60');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'green');
    path.setAttribute('stroke-width', 3);
    svg.appendChild(path);
  }
  draw() {
    var x = this.x;
    var y = this.y;
    this.circle.move(x + 16, y - 6)
    this.polygon.plot([[x + 16, y], [x - 28, y + 30], [x - 28, y - 30]])
  }
  outputPos() {
    return [this.x + 28, this.y]
  }
  inputPos(){
    return [this.x - 28, this.y]
  }
}

class Wire {
  constructor(fromGate, toGate){
    this.fromGate = fromGate;
    this.toGate = toGate;
    var start = fromGate.outputPos()
    var end = toGate.inputPos()
    var points = [start]
    if(start[1] != end[1]){
      points.push([(start[0] + end[0]) / 2, start[1]])
      points.push([(start[0] + end[0]) / 2, end[1]])
    }
    points.push(end)
    this.wire = draw.polyline(points)
    .attr({stroke: 'blue', 'stroke-width': 2, fill: 'none'});
  }
}

var andGate = new AndGate(100, 100);


var notGate = new NotGate(700,100);

var notGate2 = new NotGate(1000,150)

const wire = new Wire(notGate, notGate2)

notGate.draw();
