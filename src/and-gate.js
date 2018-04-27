class AndGate {
  constructor(g) {
    g.append('path').attrs({
      d: ['M', -2, -30,
          'h', -26,
          'v', 60,
          'h', 26,
          'a', 30, 30, 0, 0, 0, 0, -60].join(' '),
      fill: 'none',
      stroke: 'green',
      'stroke-width': 2,
    });
  }
  pinPos(pinNum) {
    const pins = [
      [-28, -15],
      [-28, 15],
      [28, 0],
    ];
    return pins[pinNum];
  }
}
