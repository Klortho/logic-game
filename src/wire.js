class Wire {
  constructor(drawing, from, to, waypoints) {
    const [fromGate, fromPin] = from;
    const [toGate, toPin] = to;


    const startPos = fromGate.pinPos(fromPin);
    const endPos = toGate.pinPos(toPin);

    var x = startPos[0];
    var y = startPos[1];
    const dx = endPos[0] - startPos[0];
    const dy = endPos[1] - startPos[1];
    const wayP = [];
    for (var i = 0; i < waypoints.length; i++) {
      const [cmd, val] = waypoints[i];
      if (cmd === 'h') {
        x += dx * val;
      }
      else if (cmd === 'v') {
        y += dy * val;
      }
      else if (cmd === 'H') {
        x += val;
      }
      else if (cmd === 'V') {
        y += val;
      }
      else {
        x = cmd;
        y = val;
      }
      wayP.push([x,y]);
    }
    const points = [startPos, ...wayP, endPos];
    this.points = points;
    console.log('points: ', points);
    this.wire = drawing.append('polyline').attrs({
      points,
      fill: 'none',
      stroke: 'blue',
      'stroke-width': 2,
    });
  }

  // This creates one dot that will slide down the wire
  spit() {
    const points = this.points;
    const startPos = points[0];
    const dot = drawing.append('circle').attrs({
      r: 4.5,
      cx: startPos[0],
      cy: startPos[1],
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
