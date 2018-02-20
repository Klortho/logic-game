function log(msg) {
  document.getElementById('log').textContent += msg + '\n';
}

var draw = SVG('drawing').size(700, 350);

var NotGate = {
  x: 200,
  y: 100
};

drawNotGate(NotGate);

function drawWireToNot (from, gate){
  draw.polyline([from, [gate.x-28, gate.y]])
    .attr({'class': 'wire'});
}
drawWireToNot([100, 100], NotGate)

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
drawWireFromNot(NotGate, [500, 200]);




//-------------------------------------
function drawNotGate(gate) {
  draw.circle()
    .attr({'class': 'notGate'})
    .radius(6)
    .attr({cx: gate.x+22, cy: gate.y});
  draw.polygon('' +
    (gate.x-28) + ',' + (gate.y-30) + ' ' + 
    (gate.x-28) + ',' + (gate.y+30) + ' ' +
    (gate.x+16) + ',' + (gate.y))
    .attr({'class': 'notGate'});
}

