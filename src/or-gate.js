class OrGate {
  constructor(g) {
    g.append('path').attrs({
      d: ['M', -44, -30,
          'h', 24,
          'c', 25, 0, 43, 20, 47.5, 30,
          'c', -4.5, 10, -22.5, 30, -47.5, 30,
          'h', -24,
          'a', 60, 60, 0, 0, 0, 0, -60].join(' '),
      fill: 'none',
      stroke: 'orange',
      'stroke-width': 2,
    });
  }
  pinPos(pinNum) {
    return [
      [-42, -15],
      [-42, 15],
      [32.5, 0],
    ][pinNum];
  }
}
