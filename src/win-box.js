class WinBox extends Gate {
  constructor(drawing, id, position, orientation) {
    super(drawing, id, position, orientation);
    this.g.append('rect').attrs({
      x: -40,
      y: -15,
      width: 80,
      height: 30,
      fill: 'none',
      stroke: this.color,
      'stroke-width': 2,
    });
    this.initPins(4, 4);
  }
  get color() {
    return 'yellow';
  }
  get pinPositions(){
    return [
      [0, -15],
      [0, 15],
      [-40, 0],
      [40, 0],
    ];
  }
  update() {
  }
}
