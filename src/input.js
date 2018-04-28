class Input extends Gate {
  constructor(drawing, id, position, orientation) {
    super(drawing, id, position, orientation);
    this.g.append('circle').attrs({
      cx: 0,
      cy: 0,
      r: 4,
      fill: 'white',
      stroke: this.color,
      'stroke-width': 1,
      'pointer-events': 'none',
    });
    this.initPins(1, 0);
  }
  get color() {
    return 'blue';
  }
  get labelPos() {
    return [0, 15];
  }
  get pinPositions() {
    return [[0, 0]];
  }
  update() {
    this.setGateOutputOn(0);
  }
}
