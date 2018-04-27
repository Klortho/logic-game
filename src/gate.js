class Gate {
  // orientation is one of `up`, `right`, `down`, or `left`
  constructor(drawing, id, position, orientation) {
    Object.assign(this, {id, position, orientation});

    this.angle = {
      right: 0,
      up: 270,
      left: 180,
      down: 90,
    }[orientation];
    this.g = drawing.append('g').attr('transform', [
      `translate(${position.join(', ')})`,
      `rotate(${this.angle})`
    ].join(' '));

    const labelXY = this.absPos(...this.labelPos);
    this.label = drawing.append('text').attrs({
      x: labelXY[0],
      y: labelXY[1],
      fill: this.color,
      'font-family': 'Verdana',
      'font-size': 10,
      'text-anchor': 'middle',
      'alignment-baseline': 'middle',
    })
    .text(id);

    this.inputs = [];
    this.outputs = [];
  }

  // default color
  get color() {
    return 'black';
  }
  // default labelPos
  get labelPos() {
    return [0, 0];
  }

  // Gets the angle in radians.
  get aRads() {
    return this.angle * Math.PI / 180;
  }
  get x() {
    return this.position[0];
  }
  get y() {
    return this.position[1];
  }

  // Returns the absolute position of a point on the gate, given the
  // point's coordinates relative to the center
  absPos(rx, ry) {
    const a = this.aRads;
    return [
      this.x + rx * Math.cos(a) + ry * Math.sin(a),
      this.y + rx * Math.sin(a) + ry * Math.cos(a)
    ];
  }

  pinPos(pinNum) {
    return this.absPos(...this.pinPositions[pinNum]);
  }
}
