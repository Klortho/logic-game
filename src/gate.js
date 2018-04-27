
class Gate {
  // orientation is one of `up`, `right`, `down`, or `left`
  constructor(drawing, x, y, orientation='right') {
    Object.assign(this, {drawing, x, y, orientation});
    this.g = drawing.append('g').attrs({
      transform: `translate(${x}, ${y}) rotate(${this.angleDegrees})`,
    });
    this.inputWires = [];
    this.outputWire = null;
    this.outputState = null;
  }

  // This is a "getter". It computes the angle of the gate, in degrees,
  // from its orientation.
  get angleDegrees() {
    return {
      up: 90,
      right: 0,
      down: -90,
      left: 180,
    }[this.orientation];
  }

  // Gets the angle in radians.
  get angleRadians() {
    return this.angleDegrees * Math.PI / 180;
  }

  // Returns the absolute position of a point on the gate, given the
  // point's coordinates relative to the center
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

  turnOutputOn() {
    if (this.outputState === 'on') return;
    this.outputState = 'on';
    if (this.outputWire) this.outputWire.turnOn();
  }

  turnOutputOff() {
    if (this.outputState === 'off') return;
    this.outputState = 'off';
    if (this.outputWire) this.outputWire.turnOff();
  }
}
