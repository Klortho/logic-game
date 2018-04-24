class Terminal extends Gate{
  constructor(x, y) {
    super (x, y, 'right');

    this.g.append('circle').attrs({
      cx: 0,
      cy: 1,
      fill: 'blue',
      stroke: 'blue',
      'stroke-width': 3,
      'pointer-events': 'none',
    });
  }
  outputPos() {
    return this.position(0, 0);
  }
}
