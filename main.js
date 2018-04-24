const drawing = d3.select(document.body).append('svg').attrs({
  width: 1000,
  height: 922.5,
});

const gates = [
  new NotGate(250, 100),
  new Switch(100, 100, 0, 1),
  new WinBox(400, 100, 'left'),
];

const wires = [
  new Wire([10, 100], gates[1]),
  new Wire(gates[1], gates[0]),
  new Wire(gates[0], gates[2]),
];
wires[0].wire.node().dispatchEvent(new Event('on'));
