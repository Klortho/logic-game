try {
  function log(msg) {
    document.getElementById('log').textContent += msg + '\n';
  }
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
    relativeX(dx, dy) {
      const angle = directions[this.direction];
      return Math.cos(rad(angle)) * dx +
             Math.sin(rad(angle)) * dy;
    }
    relativeY(dx, dy) {
      const angle = directions[this.direction];
      return Math.sin(rad(angle)) * dx +
             Math.cos(rad(angle)) * dy;
    }
    relativePos(dx, dy) {
      return [this.relativeX(dx, dy), this.relativeY(dx, dy)];
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
    constructor(fromGate, toGate, inputNum) {
      this.fromGate = fromGate;
      this.toGate = toGate;
      var start = fromGate.outputPos();
      var end = toGate.inputPos(inputNum);
      var points = [start];
      if(start[1] != end[1]) {
        points.push([(start[0] + end[0]) / 2, start[1]]);
        points.push([(start[0] + end[0]) / 2, end[1]]);
      }
      points.push(end);
      this.wire = drawing.polyline({
        points: points,
        fill: 'none',
        stroke: 'blue',
        'stroke-width': 2,
      });
    }
  }

  var notGate0 = new NotGate(100, 100);
  var notGate1 = new NotGate(200, 150, 'down');
  var notGate2 = new NotGate(500, 150, 'left');
  var andGate3 = new AndGate(300, 300);
  var orGate4 = new OrGate(300, 100);
  const wire5 = new Wire(notGate0, orGate4, 0);
  const wire6 = new Wire(notGate1, andGate3, 0);
  const wire7 = new Wire(orGate4, notGate2);

}
catch(err) {
  console.error(err.message, err.stack);
}
