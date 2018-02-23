# Lesson 4 - Create our own SVG library

In this lesson, we'll get rid of SVG.js. Instead of using that library, we'll
create our own class, called `SvgElement`, that will make drawing SVG objects
easy.

First, take the `<script>` element out of your index.html file. It tells the
browser to load the SVG.js library, and we won't be needing that anymore. It
looks like this:

```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/svg.js/2.6.4/svg.min.js'></script>
```

Just delete that line. After it's gone, the program won't work anymore, until
we get our new code up and running.

The `SvgElement` class will look like this:

>>>script.js#class SvgElement

Next, we'll create an instance of this class, called `drawing`, which will be
the main `<svg>` element itself. This will take the place of the old SVG.js
`draw` object.

>>>script.js#const drawing

Next, for each of the types of shapes that we need, we'll add a method to the
`drawing` object that will create the shape, and add it to the drawing.

For example, the `circle` method is defined like this:

>>>script.js#drawing.circle

When we create the circle in the `NotGate` constructor, we'll call this method,
and pass it the SVG attributes that control what the circle looks like:

>>>script.js#this.circle

We'll create another method for `drawing`, that creates an SVG `path` element.
This method looks almost exactly like the `circle` method:

>>>script.js#drawing.path

The other two types of shapes that we use are `polygon` and `polyline`. One of
the nice features of the SVG.js library is that it allows us to create these
shapes using arrays of points. But the SVG elements require these points to be
inside Strings. So, when we create the `drawing` methods for these two, we'll
add a little bit of code to convert the arrays of points into strings. The
`polygon` method looks like this:

>>>script.js#drawing.polygon

The `polyline` method is almost identical!

The final thing we need to do in this lesson is to convert all of the SVG.js
`draw` method calls into our new `drawing` method calls. You have already seen
an example above (`drawing.circle`). The others are left as an exercise!
