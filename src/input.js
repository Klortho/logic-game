class Input {
  constructor(g) {
    g.append('circle').attrs({
      cx: 0,
      cy: 0,
      r: 4,
      fill: 'white',
      stroke: 'blue',
      'stroke-width': 1,
      'pointer-events': 'none',
    });
  }
  pinPos(pinNum) {
    return [0, 0];
  }
}
