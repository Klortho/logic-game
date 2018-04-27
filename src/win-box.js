class WinBox {
  constructor(g) {
    g.append('rect').attrs({
      x: -40,
      y: -15,
      width: 80,
      height: 30,
      fill: 'none',
      stroke: 'yellow',
      'stroke-width': 2,
    });
  }
  pinPos(pinNum){
    return [
      [0, -15],
      [0, 15],
      [-40, 0],
      [40, 0],
    ][pinNum];
  }
}
