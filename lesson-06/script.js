try {
  var nextGateId = 0;

  class SvgElement {
    constructor(tag, attrs) {
      this.elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (let name in attrs) {
        this.elem.setAttribute(name, attrs[name]);
      }
    }
  }

  class SvgContainer extends SvgElement {
    constructor(tag, attrs) {
      super(tag, attrs);
    }

    g(attrs) {
      const shape = new SvgContainer('g', attrs);
      this.elem.appendChild(shape.elem);
      return shape;
    }

    circle(attrs) {
      const shape = new SvgElement('circle', attrs);
      this.elem.appendChild(shape.elem);
      return shape;
    }

    path(attrs) {
      const shape = new SvgElement('path', attrs);
      this.elem.appendChild(shape.elem);
      return shape;
    }

    polygon(attrs) {
      const shape = new SvgElement('polygon', attrs);
      this.elem.appendChild(shape.elem);
      return shape;
    }

    polyline(attrs) {
      const shape = new SvgElement('polyline', attrs);
      this.elem.appendChild(shape.elem);
      return shape;
    }

    text(attrs, content) {
      const shape = new SvgElement('text', attrs);
      this.elem.appendChild(shape.elem);
      const t = document.createTextNode(content);
      shape.elem.appendChild(t);
      return shape;
    }

    line(attrs) {
      const shape = new SvgElement('line', attrs);
      this.elem.appendChild(shape.elem);
      return shape;
    }
  }

  class Svg extends SvgContainer {
    constructor(parent, attrs) {
      super('svg', attrs);
      parent.appendChild(this.elem);
    }
  }

  const drawing = new Svg(document.body, {
    width: 1840,
    height: 500,
  });

  const directions = {
    right: 0,
    down: 90,
    left: 180,
    up: 270
  };
  function rad(deg) {
    return Math.PI * deg / 180;
  }

  class Gate {
    constructor(x, y, direction, _class) {
      this['class'] = _class;
      this.id = nextGateId++;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.tg = drawing.g({
        'class': _class,
        transform: 'translate(' + x + ', ' + y + ')'
      });
      this.tg.text({
        'text-anchor': 'middle',
        'alignment-baseline': 'middle'
      }, this.id);
      this.g = this.tg.g({
        transform: 'rotate(' + directions[direction] + ')'
      });
    }
    relativePos(dx, dy) {
      const angle = directions[this.direction];
      return [Math.cos(rad(angle)) * dx + Math.sin(rad(angle)) * dy,
              Math.sin(rad(angle)) * dx + Math.cos(rad(angle)) * dy];
    }
    absolutePos(dx, dy) {
      const relPos = this.relativePos(dx, dy);
      return [this.x + relPos[0], this.y + relPos[1]];
    }
  }


  class NotGate extends Gate {
    constructor(x, y, direction='right') {
      super(x, y, direction, 'not');
      this.g.circle({
        r: 6,
        cx: 32,
        cy: 0,
      });
      this.g.polygon({
        points: [[26, 0], [-18, 30], [-18, -30]],
      });
    }
    outputPos() {
      return this.absolutePos(38, 0);
    }
    inputPos() {
      return this.absolutePos(-18, 0);
    }
  }

  class AndGate extends Gate {
    constructor(x, y, direction='right') {
      super(x, y, direction, 'and');
      this.g.path({
        d: 'M 2,-30 ' +
           'h -26 ' +
           'v 60 ' +
           'h 26 ' +
           'a 30 30 0 0 0 0 -60',
      });
    }
    outputPos() {
      return this.absolutePos(32, 0);
    }
    inputPos(inputNum) {
      var dy;
      if (inputNum === 0) dy = -15;
      else dy = 15;
      return this.absolutePos(-24, dy);
    }
  }

  class OrGate extends Gate {
    constructor(x, y, direction='right') {
      super(x, y, direction, 'or');
      this.g.path({
        d: 'M -37.5,-30 ' +
           'h 32.5 ' +
           'c 25,0 43,20 47.5,30 ' +
           'c -4.5,10 -22.5,30 -47.5,30 ' +
           'h -32.5 ' +
           'a 60 60 0 0 0 0 -60',
      });
    }
    outputPos() {
      return this.absolutePos(42.5, 0);
    }
    inputPos(inputNum) {
      var dy;
      if (inputNum === 0) dy = -15;
      else dy = 15;
      return this.absolutePos(-32, dy);
    }
  }

  class Wire {
    constructor(fromGate, toGate, inputNum, route = Wire.direct) {
      this.fromGate = fromGate;
      this.toGate = toGate;
      const start = fromGate.outputPos();
      const end = toGate.inputPos(inputNum);
      const points = [start];
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      const routePoints = route(dx, dy);
      for (let p of routePoints) {
        const lastPoint = points[points.length - 1];
        points.push([lastPoint[0] + p[0], lastPoint[1] + p[1]]);
      }
      points.push(end);
      drawing.polyline({
        'class': 'wire',
        points: points
      });
    }
    static direct(dx, dy) {
      return [];
    }
    static xy(dx, dy) {
      return [[dx, 0]];
    }
    static yx(dx, dy) {
      return [[0, dy]];
    }
    static xyx(dx, dy) {
      return [[dx/2, 0], [0, dy]];
    }
  }

  var notGate0 = new NotGate(50, 50);
  var notGate1 = new NotGate(50, 200, 'down');
  var notGate2 = new NotGate(400, 150, 'left');
  var andGate3 = new AndGate(150, 300);
  var orGate4 = new OrGate(200, 100);

  const wire5 = new Wire(notGate0, orGate4, 0, Wire.xyx);
  const wire6 = new Wire(notGate1, andGate3, 0, Wire.yx);
  const wire7 = new Wire(orGate4, notGate2, null,
    (dx, dy) => [[dx + 20, 0], [0, dy]]);
}
catch(err) {
  console.error(err.message, err.stack);
}
