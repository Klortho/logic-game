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
    const end = toGate.inputPos(inputNum);
    var x = start[0];
    var y = start[1];
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const wayP = [];
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
    const points = [start, ...wayP, end];
    this.wire = drawing.append('polyline').attrs({
      points,
      fill: 'none',
      stroke: 'blue',
      'stroke-width': 3,
    });
    this.points = points;

    this.wire.node().addEventListener('on', function() {
      this.timerId = setInterval(spitElec, 500);
    });
    this.wire.node().addEventListener('off', function(){
      clearInterval(this.timerId);
    });
    function spitElec(){
      const dot = drawing.append('circle').attrs({
        r: 4.5,
        cx: start[0],
        cy: start[1],
        fill: 'yellow',
        stroke: 'none',
      });
      var sel = dot;
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
      sel.on("end", function(){

      })
      sel.remove();
    }
  }
}
