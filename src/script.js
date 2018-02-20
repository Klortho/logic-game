function log(msg) {
  document.getElementById('log').textContent += msg + '\n';
}

var draw = SVG('drawing').size(700, 350);


class NotGate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    draw.circle()
      .attr({'class': 'notGate'})
      .radius(6)
      .attr({cx: this.x+22, cy: this.y});
    draw.polygon('' +
        (this.x-28) + ',' + (this.y-30) + ' ' +
        (this.x-28) + ',' + (this.y+30) + ' ' +
        (this.x+16) + ',' + (this.y))
      .attr({'class': 'notGate'});
  }
  getInputPoint() {
    return [this.x - 28, this.y];
  }
}

var notGate = new NotGate(200, 100);
notGate.draw();


function drawWireToNot (from, gate){
  draw.polyline([from, [gate.x-28, gate.y]])
    .attr({'class': 'wire'});
}
drawWireToNot([100, 100], notGate)

function drawWireFromNot(gate, to) {
  var points = [];
  var x0 = gate.x + 28;
  points.push([x0, gate.y]);

  if (points[0][1] != to[1]) {
    points.push([(to[0]-x0)/2+points[0][0], points[0][1]]);
    points.push([(to[0]-x0)/2+points[0][0], to[1]] );
  }
  points.push(to);
  draw.polyline(points)
    .attr({'class': 'wire'});
}
drawWireFromNot(notGate, [500, 200]);
