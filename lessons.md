# Logic Game


## Lesson 3 - Or Gate

## Lesson 4 - SVG functions

In this lesson, we'll get rid of SVG.js. We'll create our own class, called
`SvgElement`, to make drawing SVG objects easy:

```javascript
>>>src/script.js 5-12
```

Next, we'll create an instance of this class, called `drawing`, which will
be the main `<svg>` element itself. This will take the place of the old
SVG.js `draw` object.

```javascript
>>>src/script.js 14-17
```

Next, for each of the types of shapes that we need, we'll add a method to
the `drawing` object that will create the shape, and add it to the drawing.

For example, the `circle` method looks like this:

```javascript
>>>src/script.js 19-22
```
