class Switch extends Gate {
  constructor(drawing, id, position, orientation) {
    super(drawing, id, position, orientation);

    const rect = this.g.append('rect').attrs({
      x: -25,
      y: -10,
      width: 50,
      height: 20,
      fill: 'none',
      stroke: this.color,
      'stroke-width': 2,
      'pointer-events': 'visible'
    });
    const pinCircle = cx => {
      this.g.append('circle').attrs({
        r: 4,
        cx,
        cy: 0,
        fill: 'white',
        stroke: this.color,
        'stroke-width': 2,
        'pointer-events': 'none'
      });
    };
    pinCircle(-12);
    pinCircle(12);
    this.path = this.g.append('path').attrs({
      fill: 'none',
      stroke: this.color,
      'stroke-width': 2,
      'pointer-events': 'visible'
    });
    this.jumper = this.g.append('polyline').attrs({
      points: [[-12, 0], [12, 0]],
      fill: 'none',
      stroke: 'blue',
      'stroke-width': 2,
      opacity: 0,
      'pointer-events': 'none'
    });

    const handleClick = () => this.toggle();
    rect.node().addEventListener('click', handleClick);
    this.path.node().addEventListener('click', handleClick);

    // The switch always starts in the "open" state
    this.isOpen = false;
    return this.open();
  }
  get color() {
    return 'grey';
  }
  get labelPos() {
    return [0, 20];
  }

  drawToggler() {
    const adeg = this.isOpen ? 70 : 110;
    const a = adeg * Math.PI / 180;
    const R = 35;
    const r = 7;
    const cp = [R * Math.cos(a), -(10 + R * Math.sin(a))];
    const tp0 = [cp[0] - r * Math.sin(a), cp[1] - r * Math.cos(a)];
    const tp1 = [cp[0] + r * Math.sin(a), cp[1] + r * Math.cos(a)];
    return this.path.attr('d',
      ['M', -2.5, -10,
       'L', ...tp0,
       'A', r, r, 0, 0, 1, ...tp1,
       'L', 2.5, -10].join(' ')
    );
  }
  toggle() {
    return this.isOpen ? this.close() : this.open();
  }
  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.drawToggler();
    this.jumper.attr('opacity', 0);
    return this;
  }
  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.drawToggler();
    this.jumper.attr('opacity', 1);
    return this;
  }

  get pinPositions() {
    return [
      [-12, 0],
      [12, 0],
    ];
  }
}
