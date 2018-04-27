# Logic Game


## Implementation

A game progresses as a sequence of Levels. Each Level
displays a complete Circuit. A circuit comprises a set of
Gates and Connectors, and data about their layout.

A Gate has an array of pins, along with the relative coordinates
of each. There are two types of pins: input and output.

Each Connectors specifies how one output pin is connected to one
or more input pins. The Connectors is implemented as a tree of
Wires. The root of the tree is the Wire that eminates from the
output pin. Each leaf Wire connects to one output pin. Non-leaf
wires connect to their child Wires at junctions.

A Circuit can be specified as, for example:


```javascript
Circuit(drawing, {
  gates: [
    { id: 'in0',
      position: [10, 30],
    },
    { id: 'in1',
      position: [10, 150],
    },
    { id: 'not0',
      position: [80, 30],
    },
    { id: 'sw0',
      position: [80, 150],
    },
    { id: 'j0',
      position: [150, 30],
    },
    { id: 'j1',
      position: [150, 120],
    },
    { id: 'j2',
      position: [140, 150],
    },
    { id: 'and0',
      position: [220, 45],
    },
    { id: 'or0',
      position: [220, 135],
    },
    { id: 'xor0',
      position: [220, 225],
    },
    { id: 'and1',
      position: [330, 135],
    },
    { id: 'win',
      position: [410, 135],
    },    
  ],
  wires: [
    ['in0-0', 'not0-0'],
    ['not0-1', 'j0'],
    ['j0', 'and0-0'],
    ['j0', 'j1'],
    ['j1', 'or0-0'],
    ['j1', 'xor0-0', ['v']],
    ['in1-0', 'sw0-0'],
    ['sw0-1', 'j2'],
    ['j2', 'or0-1'],
    ['j2', 'xor0-1', ['v']],
    ['or0-2', 'and0-1', ['H 20', 'v 0.5', 'H -100', 'v']],
    ['and0-2', 'and1-0', ['h 0.75']],
    ['xor0-2', 'and1-1', ['h 0.75']],
    ['and1-2', 'win-0'],
  ],
});
```
