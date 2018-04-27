class AndGate extends Gate {
  constructor(drawing, id, position, orientation) {
    super(drawing, id, position, orientation);
    this.g.append('path').attrs({
      d: ['M', -2, -30,
          'h', -26,
          'v', 60,
          'h', 26,
          'a', 30, 30, 0, 0, 0, 0, -60].join(' '),
      fill: 'none',
      stroke: this.color,
      'stroke-width': 2,
    });
  }
  get color() {
    return 'green';
  }
  get pinPositions() {
    return [
      [-28, -15],
      [-28, 15],
      [28, 0],
    ];
  }
}
