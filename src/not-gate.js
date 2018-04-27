class NotGate extends Gate {
  constructor(drawing, id, position, orientation) {
    super(drawing, id, position, orientation);
    this.g.append('circle').attrs({
      r: 5,
      cx: 17,
      cy: 0,
      fill: 'none',
      stroke: this.color,
      'stroke-width': 2,
    });
    this.g.append('polygon').attrs({
      points: [[11, 0], [-22, 20], [-22, -20]],
      fill: 'none',
      'stroke-width': 2,
      stroke: this.color,
    });
  }
  get color() {
    return 'red';
  }
  get labelPos() {
    return [-10, 0];
  }
  get pinPositions() {
    return [
      [-22, 0],
      [22, 0],
    ];
  }
}
