class NotGate {
  constructor(g) {
    g.append('circle').attrs({
      r: 5,
      cx: 17,
      cy: 0,
      fill: 'none',
      stroke: 'red',
      'stroke-width': 2,
    });
    g.append('polygon').attrs({
      points: [[11, 0], [-22, 20], [-22, -20]],
      fill: 'none',
      'stroke-width': 2,
      stroke: 'red',
    });
  }
  pinPos(pinNum) {
    return [pinNum === 0 ? -22 : 22, 0];
  }
}
