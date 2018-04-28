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
  /*
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
  */
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
  initPins(total, numInputs) {
    this.pins = [];
    for (var i = 0; i < total; ++i) {
      this.pins[i] = {
        type: i < numInputs ? 'in' : 'out',
        state: false,
        wire: null,
        timer: null,
      };
    }
  }
  connect(pinNum, wire) {
    if (this.pins[pinNum].wire !== null)
      throw Error('Can\'t connect two wires to the same pin!');
    this.pins[pinNum].wire = wire;
  }

  clearInputTimer(pinNum) {
    const inPin = this.pins[pinNum];
    if (inPin.timer) clearTimeout(inPin.timer);
    inPin.timer = null;
  }
  setGateInputOff(pinNum) {
    this.clearInputTimer(pinNum);
    const inPin = this.pins[pinNum];
    inPin.state = false;
    this.update();
  }
  // This is called by a Wire object
  setGateInputOn(pinNum) {
    this.clearInputTimer(pinNum);
    const inPin = this.pins[pinNum];
    inPin.state = true;
    inPin.timer = setTimeout(() => {
      this.setGateInputOff(pinNum);
    }, Wire.duration * 1.1);
    this.update();
  }

  // These are called from this gate's update() method
  setGateOutputOff(pinNum) {
    const outPin = this.pins[pinNum];
    outPin.state = false;
    if (outPin.wire === null) return;
    outPin.wire.setWireOff();
  }
  setGateOutputOn(pinNum) {
    const outPin = this.pins[pinNum];
    outPin.state = true;
    if (outPin.wire === null) return;
    outPin.wire.setWireOn();
  }
  setGateOutputState(pinNum, state) {
    this['setGateOutput' + (state ? 'On' : 'Off')](pinNum);
  }
}
