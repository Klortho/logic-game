class NotGate extends Gate{
  constructor(x, y, direction = 0){
    super (x, y, direction);
    this.circle = this.g.append('circle').attrs({
      r: 6,
      cx: 22,
      cy: 0,
      fill: 'none',
      stroke: 'red',
      'stroke-width': 3,
    });
    this.polygon = this.g.append('polygon').attrs({
      points: [[16, 0], [-28, 30], [-28, -30]],
      fill: 'none',
      'stroke-width': 3,
      stroke: 'red',
    });
  }
  outputPos() {
    return this.position(28, 0);
  }
  inputPos(){
    return this.position(-28, 0);
  }
}

class AndGate extends Gate{
  constructor(x, y, direction = 0){
    super(x, y, direction);
    this.g.append('path').attrs({
      d: 'M ' + (-2) + ',' + (-30) + ' h -26 v 60 h 26 a 30 30 0 0 0 0 -60',
      fill: 'none',
      stroke: 'green',
      'stroke-width': 3,
    });
  }
  outputPos() {
    return this.position(28, 0);
  }
  inputPos(inputNum){
    var dy;
    if (inputNum === 0) dy = -15;
    else if (inputNum === 1) dy = 15;
    return this.position(-28, dy);
  }
}
class OrGate extends Gate{
  constructor(x, y, direction = 0){
    super (x, y, direction);
    this.g.append('path').attrs({
      d: 'M ' + (-47.5) + ',' + (-30) +
        ' h 32.5 a 100 100 0 0 1 47.5 30 a 100 100 ' +
        '0 0 1 -47.5 30 h -32.5 a 60 60 0 0 0 0 -60',
      fill: 'none',
      stroke: 'orange',
      'stroke-width': 3,
    });
  }
  outputPos() {
    return this.position(32.5, 0);
  }
  inputPos(inputNum){
    var dy;
    if (inputNum === 0) dy = -15;
    else if (inputNum === 1) dy = 15;
    return this.position(-42, dy);
  }
}
class XorGate extends Gate{
  constructor(x, y, direction = 0){
    super (x, y, direction);
    this.g.append('path').attrs({
      d: 'M ' + (-47.5) + ',' + (-30) + ' ' +
        'h 32.5 a 100 100 0 0 1 47.5 30 a 100 100 0 0 1 -47.5 30 ' +
        'h -32.5 a 60 60 0 0 0 0 -60',
      fill: 'none',
      stroke: 'purple',
      'stroke-width': 3,
    });
    this.g.append('path').attrs({
      d: 'M ' + (-55) + ', ' + (-30) + ' a 60 60 0 0 1 0 60',
      fill: 'none',
      stroke: 'purple',
      'stroke-width': 3});
  }
  outputPos() {
    return this.position(32.5, 0);
  }
  inputPos(inputNum){
    var dy;
    if (inputNum === 0) dy = -15;
    else if (inputNum === 1) dy = 15;
    return this.position(-42, dy);
  }
}
class WinBox extends Gate{
  constructor(x, y, inputSide='up'){
    super (x, y, 0);
    this.inputSide = inputSide;
    this.rect = this.g.append('rect').attrs({
      x: -40,
      y: -15,
      width: 80,
      height: 30,
      fill: 'none',
      stroke: 'yellow',
      'stroke-width': 3,
    });
  }
  inputPos(){
    if (this.inputSide == 'up'){
      return this.position(0, -15);
    } else if (this.inputSide == 'down'){
      return this.postion(0, 15);
    } else if (this.inputSide == 'left'){
      return this.position(-40, 0);
    } else {
      return this.position(40, 0);
    }
  }
}
class Wire {
  constructor(from, toGate, inputNum, wp=[]) {
    var start;
    if (from instanceof Gate) {
      start = from.outputPos();
      from.connectWire(this)
    } else {
      start = from;
      drawing.append('circle').attrs({
        cx: from[0],
        cy: from[1],
        fill: 'blue',
        stroke: 'blue',
        'stroke-width': 3,
        'pointer-events': 'none',
      });
    }
    this.toGate = toGate;
    var end = toGate.inputPos(inputNum);
    var x = start[0];
    var y = start[1];
    var dx = end[0] - start[0];
    var dy = end[1] - start[1];
    var wayP = [];
    for (var i = 0; i < wp.length; i++){
      if (wp[i][0] == "h"){
        x += dx * wp[i][1];
      } else if (wp[i][0] == "v"){
        y += dy * wp[i][1];
      }
      else {
        x = wp[i][0];
        y = wp[i][1];
      }
      wayP.push([x,y]);
    }
    var points = [start, ...wayP, end];
    this.wire = drawing.append('polyline').attrs({
      points,
      fill: 'none',
      stroke: 'blue',
      'stroke-width': 3,
    });
    this.points = points;
/////////////////////////////////////////////////////////
    this.wire.node().addEventListener('on', function() {
      this.timerId = setInterval(spitElec, 500);
    });
    this.wire.node().addEventListener('off', function(){
      clearInterval(this.timerId);
    });
    function spitElec(){
      var d3Dot = drawing.append('circle').attrs({
        r: 4.5,
        cx: start[0],
        cy: start[1],
        fill: 'yellow',
        stroke: 'none',
      });
      var sel = d3Dot;
      for (var nextP = 1; nextP < points.length; nextP++) {
        var p0 = points[nextP - 1];
        var p1 = points[nextP];
        var xd = p1[0] - p0[0];
        var yd = p1[1] - p0[1];
        var dist = Math.sqrt(xd * xd + yd * yd);
        var duration = dist * 5;
        sel = sel.transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .attrs({
            cx: points[nextP][0],
            cy: points[nextP][1],
          });
      }
      sel.remove();
    }
  }
}
