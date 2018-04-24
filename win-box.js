class WinBox extends Gate {
  constructor(x, y, inputSide='up'){
    super (x, y, 0);
    this.inputSide = inputSide;
    this.rect = this.g.append('rect').attrs({
      x: -40,
      y: -15,
      width: 80,
      height: 30,
      fill: 'none',
      stroke: 'yellow',
      'stroke-width': 3,
    });
  }
  inputPos(){
    return this.inputSide === 'up' ? this.position(0, -15)
      : this.inputSide === 'down' ? this.postion(0, 15)
      : this.inputSide === 'left' ? this.position(-40, 0)
      : this.position(40, 0);
  }
}
