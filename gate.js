const drawing = d3.select(document.body).append('svg').attrs({
  width: 600,
  height: 500,
})

class Gate {
  constructor(x, y, direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.d3g = drawing.append('g').attrs({
      transform: `translate(${x}, ${y}) rotate(${this.direction})`,
    });
  }
  position(dx, dy) {
    const angle = this.direction * Math.PI / 180;
    return [
      this.x + dx * Math.cos(angle) + dy * Math.sin(angle),
      this.y + dx * Math.sin(angle) + dy * Math.cos(angle)
    ];
  }
  connectWire(wire){
    this.connectedWire = wire;
  }
  outputOn(){
    if(this.connectedWire){
      this.connectedWire.wire.node().dispatchEvent(
        new Event('on')
      );
    }
  }
  outputOff(){
    if(this.connectedWire){
      this.connectedWire.wire.node().dispatchEvent(
        new Event('off')
      );
    }
  }
}

class Switch extends Gate{
  constructor(x, y, direction, isOpen=0, swapPins=false) {
    super (x, y, direction);
    this.swapPins = swapPins;
    this.rect = this.d3g.append('rect').attrs({
      x: -25,
      y: -10,
      width: 50,
      height: 20,
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      'pointer-events': 'visible'
    });
    var sw = this;
    function clickHandler() {
      if(sw.isOpen){
        sw.close();
      } else {
        sw.open();
      }
    }
    this.rect.node().addEventListener('click', clickHandler);
    this.circle0 = this.d3g.append('circle').attrs({
      r: 6,
      cx: -12.5,
      cy: 0,
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      'pointer-events': 'none'
    });
    this.circle1 = this.d3g.append('circle').attrs({
      r: 6,
      cx: 12.5,
      cy: 0,
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      'pointer-events': 'none'
    });
    this.path = this.d3g.append('path').attrs({
      fill: 'none',
      stroke: 'grey',
      'stroke-width': 3,
      'pointer-events': 'visible'
    });
    this.path.node().addEventListener('click', clickHandler);
    this.wire = this.d3g.append('polyline').attrs({
      points: [[-12.5, 0], [12.5, 0]],
      fill: 'none',
      stroke: 'black',
      'stroke-width': 3,
      opacity: 0,
      'pointer-events': 'none'
    });
    if (isOpen){
      this.open();
    } else {
      this.close();
    }
  }
  drawToggler() {
    var adeg;
    if (this.isOpen) adeg = 70;
    else adeg = 110;
    const a = adeg * Math.PI / 180,
          R = 35,
          r = 7,
          cp = [R * Math.cos(a), -(10 + R * Math.sin(a))],
          tp0 = [cp[0] - r * Math.sin(a), cp[1] - r * Math.cos(a)],
          tp1 = [cp[0] + r * Math.sin(a), cp[1] + r * Math.cos(a)];
    this.path.attr('d',
      'M -2.5 -10 L ' + tp0[0] +
      ' ' + tp0[1] + ' ' + 'A ' + r + ' ' + r +
      ' 0 0 1 ' + tp1[0] + ' ' + tp1[1] + ' ' +
      'L 2.5 -10'
    );
  }
  open() {
    this.isOpen = true;
    this.drawToggler();
    this.wire.attr('opacity', 0);
    this.outputOff();
  }
  close() {
    this.isOpen = false;
    this.drawToggler();
    this.wire.attr('opacity', 1);
    this.outputOn();
  }
  outputPos() {
    return this.position((this.swapPins ? -12.5 : 12.5), 0);
  }
  inputPos(){
    return this.position((this.swapPins ? 12.5 : -12.5), 0);
  }
}
class NotGate extends Gate{
  constructor(x, y, direction = 0){
    super (x, y, direction);
    this.circle = this.d3g.append('circle').attrs({
      r: 6,
      cx: 22,
      cy: 0,
      fill: 'none',
      stroke: 'red',
      'stroke-width': 3,
    });
    this.polygon = this.d3g.append('polygon').attrs({
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
    this.d3g.append('path').attrs({
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
    this.d3g.append('path').attrs({
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
    this.d3g.append('path').attrs({
      d: 'M ' + (-47.5) + ',' + (-30) + ' ' +
        'h 32.5 a 100 100 0 0 1 47.5 30 a 100 100 0 0 1 -47.5 30 ' +
        'h -32.5 a 60 60 0 0 0 0 -60',
      fill: 'none',
      stroke: 'purple',
      'stroke-width': 3,
    });
    this.d3g.append('path').attrs({
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
    this.rect = this.d3g.append('rect').attrs({
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
