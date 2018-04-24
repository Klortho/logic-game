class Gate {
  // orientation should be one of 'up', 'right', 'down', or 'left'
  constructor(x, y, orientation) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.g = drawing.append('g').attrs({
      transform: `translate(${x}, ${y}) rotate(${this.angleDegrees})`,
    });
    this.inputWires = [];
    this.outputWire = null;
    this.state = 'off';
  }

  get angleDegrees() {
    return {
      up: 90,
      right: 0,
      down: -90,
      left: 180,
    }[this.orientation];
  }
  get angleRadians() {
    return this.angleDegrees * Math.PI / 180;
  }
  position(dx, dy) {
    const a = this.angleRadians;
    return [
      this.x + dx * Math.cos(a) + dy * Math.sin(a),
      this.y + dx * Math.sin(a) + dy * Math.cos(a)
    ];
  }

  addInputWire(wire) {
    this.inputWires.push(wire);
  }
  setOutputWire(wire) {
    this.outputWire = wire;
  }

  outputOn() {
    if (this.outputWire) this.outputWire.turnOn();
  }
  outputOff() {
    if (this.outputWire) this.outputWire.turnOff();
  }
}
