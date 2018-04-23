class Gate {
  constructor(x, y, direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.g = drawing.append('g').attrs({
      transform: `translate(${x}, ${y}) rotate(${this.direction})`,
    });
  }
  position(dx, dy) {
    const angle = this.direction * Math.PI / 180;
    return [
      this.x + dx * Math.cos(angle) + dy * Math.sin(angle),
      this.y + dx * Math.sin(angle) + dy * Math.cos(angle)
    ];
  }
  connectWire(wire){
    this.connectedWire = wire;
  }
  outputOn(){
    if (this.connectedWire) {
      this.connectedWire.wire.node().dispatchEvent(
        new Event('on')
      );
    }
  }
  outputOff() {
    if (this.connectedWire) {
      this.connectedWire.wire.node().dispatchEvent(
        new Event('off')
      );
    }
  }
}
