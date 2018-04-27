class Junction extends Gate {
  constructor(drawing, id, position, orientation) {
    super(drawing, id, position, orientation);
    this.g.append('circle').attrs({
      cx: 0,
      cy: 0,
      r: 3,
      fill: this.color,
      stroke: 'none',
      'pointer-events': 'none',
    });
  }
  get color() {
    return 'blue';
  }
  get labelPos() {
    return [-12, 12];
  }
  get pinPositions() {
    return [[0, 0]];
  }
}
