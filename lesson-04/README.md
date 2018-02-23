# Lesson 4 - Create our own SVG library

In this lesson, we'll get rid of SVG.js. Instead of using that library,
we'll create our own class, called
`SvgElement`, that will make drawing SVG objects easy.

The `SvgElement` class will look like this:

```javascript
class SvgElement {
  constructor(tag, attrs) {
    this.elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (let name in attrs) {
      this.elem.setAttribute(name, attrs[name]);
    }
  }
}
```

Next, we'll create an instance of this class, called `drawing`, which will
be the main `<svg>` element itself. This will take the place of the old
SVG.js `draw` object.

```javascript
const drawing = new SvgElement('svg', {
  width: 1840,
  height: 500,
});
```

Next, for each of the types of shapes that we need, we'll add a method to
the `drawing` object that will create the shape, and add it to the drawing.

For example, the `circle` method is defined like this:

```javascript
drawing.circle = function(attrs) {
  const shape = new SvgElement('circle', attrs);
  this.elem.appendChild(shape.elem);
  return shape;
};
```

When we create the circle in the `NotGate` constructor, we'll call this
method, and pass it the SVG attributes that control what the circle looks
like:

```javascript
this.circle = drawing.circle({
  r: 6,
  cx: x + 22,
  cy: y,
  fill: 'none',
  stroke: 'red',
  'stroke-width': 3,
});
```

We'll create another method for `drawing`, that creates an SVG `path` element.
This method looks almost exactly like the `circle` method:

```javascript
drawing.path = function(attrs) {
  const shape = new SvgElement('path', attrs);
  this.elem.appendChild(shape.elem);
  return shape;
};                                                       // #/path-method
```

The other two types of shapes that we use are `polygon` and `polyline`.
One of the nice features of the SVG.js library is that it allows us to
create these shapes using arrays of points. But the SVG elements require
these points to be inside Strings. So, when we create the `drawing` methods
for these two, we'll add a little bit of code to convert the arrays of
points into strings. The `polygon` method looks like this:

```javascript
drawing.polygon = function(attrs) {
  const shape = new SvgElement('polygon', attrs);
  var pointsStr = '';
  for (let point of attrs.points) {
    pointsStr += point[0] + ',' + point[1] + ' ';
  }
  attrs.points = pointsStr;
  this.elem.appendChild(shape.elem);
  return shape;
};
```

The `polyline` method is almost identical!

The final thing we need to do in this lesson is to convert all of the
SVG.js `draw` method calls into our new `drawing` method calls. You have
already seen an example above (`drawing.circle`). The others are left as
an exercise!
