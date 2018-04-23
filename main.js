var level = {
  gates: [
    new Switch(300, 300, 0, 1),
    new WinBox(550, 300, 'left'),
    new NotGate(100, 50),
    new AndGate(100, 150),
    new OrGate(300, 50),
    new XorGate(300, 150),
  ],
};
level.wires = [
  new Wire([50, 300], level.gates[0]),
  new Wire(level.gates[0], level.gates[1]),
];
level.wires[0].wire.node().dispatchEvent(new Event('on'));