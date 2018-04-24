const drawing = d3.select(document.body).append('svg').attrs({
  width: 1000,
  height: 922.5,
});

// FIXME: make it so that you don't have to call `new`:
const gates = [
  new Terminal(10, 100, {state: 'on'}),
  new Switch(100, 100, {state: 'open'}),
  new NotGate(250, 100),
  new WinBox(400, 100, 'left'),
];

const wires = [
  new Wire({position: [10, 100], initial: 'on'}, gates[1]),
  new Wire(gates[1], gates[0]),
  new Wire(gates[0], gates[2]),
];
wires[0].turnOn();
