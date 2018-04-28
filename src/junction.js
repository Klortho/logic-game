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
    this.initPins(3, 1);
  }
  get color() {
    return 'blue';
  }
  get labelPos() {
    return [-12, 12];
  }
  get pinPositions() {
    return [
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  update() {
    for (const pinNum of [1, 2]) {
      this.setGateOutputState(pinNum, this.pins[0].state);      
    }
  }
}
