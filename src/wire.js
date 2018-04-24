class Wire {
  // `from` should be a gate instance or an object with `position` and
  // `initial` values. `initial` should be either "on" or "off".
  constructor(from, toGate, inputNum, waypoints=[]) {
    const start = from.outputPos();
    from.connectWire(this)
    this.toGate = toGate;
    const end = toGate.inputPos(inputNum);
    var x = start[0];
    var y = start[1];
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const wayP = [];
    for (var i = 0; i < waypoints.length; i++){
      if (waypoints[i][0] == "h"){
        x += dx * waypoints[i][1];
      }
      else if (waypoints[i][0] == "v"){
        y += dy * waypoints[i][1];
      }
      else {
        x = waypoints[i][0];
        y = waypoints[i][1];
      }
      wayP.push([x,y]);
    }
    const points = [start, ...wayP, end];
    this.points = points;
    this.wire = drawing.append('polyline').attrs({
      points,
      fill: 'none',
      stroke: 'blue',
      'stroke-width': 3,
    });

    this.state = 'off';
    this.timerId = null;
    if (from.initial === 'on') this.turnOn();
  }

  // This creates one dot that will slide down the wire
  spit() {
    const points = this.points;
    const start = points[0];
    const dot = drawing.append('circle').attrs({
      r: 4.5,
      cx: start[0],
      cy: start[1],
      fill: 'yellow',
      stroke: 'none',
    });
    var selection = dot;
    for (var nextP = 1; nextP < points.length; nextP++) {
      var p0 = points[nextP - 1];
      var p1 = points[nextP];
      var xd = p1[0] - p0[0];
      var yd = p1[1] - p0[1];
      var dist = Math.sqrt(xd * xd + yd * yd);
      var duration = dist * 5;
      selection = selection.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attrs({
          cx: points[nextP][0],
          cy: points[nextP][1],
        });
    }
    //selection.on("end", function(){
    //})
    selection.remove();
  }

  turnOn() {
    if (this.state === 'on') return;
    this.timerId = setInterval(() => this.spit(), 500);
    this.state = 'on';
  }
  turnOff() {
    if (this.state === 'off') return;
    clearInterval(this.timerId);
    this.timerId = null;
    this.state === 'off';
  }
}
