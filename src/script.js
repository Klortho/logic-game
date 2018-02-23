function log(msg) {
  document.getElementById('log').textContent += msg + '\n';
}

class SvgElement {
  constructor(tag, attrs) {
    this.elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (let name in attrs) {
      this.elem.setAttribute(name, attrs[name]);
    }
  }
}

const drawing = new SvgElement('svg', {
  width: 1840,
  height: 500,
});
drawing.circle = function(attrs) {
  const shape = new SvgElement('circle', attrs);
  this.elem.appendChild(shape.elem);
  return shape;
};
drawing.polygon = function(attrs) {
  const shape = new SvgElement('polygon', attrs);
  var pointsStr = '';
  for (let point of attrs.points) {
    pointsStr += point[0] + ',' + point[1] + ' ';
  }
  attrs.points = pointsStr;
  this.elem.appendChild(shape.elem);
  return shape;
};
drawing.polyline = function(attrs) {
  const shape = new SvgElement('polyline', attrs);
  var pointsStr = '';
  for (let point of attrs.points) {
    pointsStr += point[0] + ',' + point[1] + ' ';
  }
  attrs.points = pointsStr;
  this.elem.appendChild(shape.elem);
  return shape;
};
drawing.path = function(attrs) {
  const shape = new SvgElement('path', attrs);
  this.elem.appendChild(shape.elem);
  return shape;
};

document.body.appendChild(drawing.elem);


class NotGate {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.circle = drawing.circle({
      r: 6,
      cx: x + 22,
      cy: y,
      fill: 'none',
      stroke: 'red',
      'stroke-width': 3,
    });
    this.polygon = drawing.polygon({
      points: [[x + 16, y], [x - 28, y + 30], [x - 28, y - 30]],
      fill: 'none',
      stroke: 'red',
      'stroke-width': 3,
    });
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

    drawing.path({
      d: 'M ' + (x - 2) + ',' + (y - 30) + ' ' +
         'h -26 ' +
         'v 60 ' +
         'h 26 ' +
         'a 30 30 0 0 0 0 -60',
      fill: 'none',
      stroke: 'green',
      'stroke-width': 3,
    });
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

    drawing.path({
      d: 'M ' + (x - 47.5) + ',' + (y - 30) + ' ' +
                'h 32.5 ' +
                'c 25,0 43,20 47.5,30 ' +
                'c -4.5,10 -22.5,30 -47.5,30 ' +
                'h -32.5 ' +
                'a 60 60 0 0 0 0 -60',
      fill: 'none',
      stroke: 'orange',
      'stroke-width': 3,
    });
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
    this.wire = drawing.polyline({
      points: points,
      fill: 'none',
      stroke: 'blue',
      'stroke-width': 2,
    });
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
