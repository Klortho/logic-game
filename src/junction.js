class Junction {
  constructor(g) {
    g.append('circle').attrs({
      cx: 0,
      cy: 0,
      r: 3,
      fill: 'blue',
      stroke: 'none',
      'pointer-events': 'none',
    });
  }
  pinPos(pinNum) {
    return [0, 0];
  }
}
