class WinBox extends Gate{
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
    if (this.inputSide == 'up'){
      return this.position(0, -15);
    } else if (this.inputSide == 'down'){
      return this.postion(0, 15);
    } else if (this.inputSide == 'left'){
      return this.position(-40, 0);
    } else {
      return this.position(40, 0);
    }
  }
}
