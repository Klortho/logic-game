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
  outputPos() {
    return [this.x + 28, this.y];
  }
  inputPos(){
    return [this.x - 28, this.y];
  }
}

class AndGate {
  constructor(x, y){
    this.x = x;
    this.y = y;

    const svg = document.getElementsByTagName('svg')[0];
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M ' + (x - 2) + ',' + (y - 30) +
                      ' h -26 v 60 h 26 a 30 30 0 0 0 0 -60');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'green');
    path.setAttribute('stroke-width', 3);
    svg.appendChild(path);
  }
  outputPos() {
    return [this.x + 28, this.y];
  }
  inputPos(inputNum) {
    var y;
    if (inputNum === 0) y = this.y - 15;
    else y = this.y + 15;
    return [this.x - 28, y];
  }
}

class OrGate {
  constructor(x, y){
    this.x = x;
    this.y = y;

    const svg = document.getElementsByTagName('svg')[0];
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = 'M ' + (x - 47.5) + ',' + (y - 30) + ' ' +
              'h 32.5 ' +
              'c 25,0 43,20 47.5,30 ' +
              'c -4.5,10 -22.5,30 -47.5,30 ' +
              'h -32.5 ' +
              'a 60 60 0 0 0 0 -60';
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'orange');
    path.setAttribute('stroke-width', 3);
    svg.appendChild(path);
  }
  outputPos() {
    return [this.x + 32.5, this.y];
  }
  inputPos(inputNum) {
    var y;
    if (inputNum === 0) y = this.y - 15;
    else y = this.y + 15;
    return [this.x - 42, y];
  }
}

class Wire {
  constructor(fromGate, toGate, inputNum) {
    this.fromGate = fromGate;
    this.toGate = toGate;
    var start = fromGate.outputPos();
    var end = toGate.inputPos(inputNum);
    var points = [start];
    if(start[1] != end[1]){
      points.push([(start[0] + end[0]) / 2, start[1]]);
      points.push([(start[0] + end[0]) / 2, end[1]]);
    }
    points.push(end);
    this.wire = draw.polyline(points)
    .attr({stroke: 'blue', 'stroke-width': 2, fill: 'none'});
  }
}

var notGate0 = new NotGate(100,100);
var notGate1 = new NotGate(200,150);
var notGate2 = new NotGate(500,150);
var andGate = new AndGate(300,300);
var orGate = new OrGate(300,100);
const wire0 = new Wire(notGate0, orGate, 0);
const wire1 = new Wire(notGate1, andGate, 0);
const wire2 = new Wire(orGate, notGate2);
