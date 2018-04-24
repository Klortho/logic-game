const drawing = d3.select(document.body).append('svg').attrs({
  width: 600,
  height: 500,
});

const gates = [
  new NotGate(100, 50),
  new OrGate(300, 50),
  new AndGate(100, 150),
  new XorGate(300, 150),
  new Switch(100, 250, 0, 1),
  new WinBox(300, 250, 'left'),
];

const wires = [
  new Wire([10, 250], gates[4]),
  new Wire(gates[4], gates[5]),
];
wires[0].wire.node().dispatchEvent(new Event('on'));
