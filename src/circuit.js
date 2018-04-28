const Circuit = (drawing, spec) => {
  const gatesById = {};
  const specDefaults = {
    orientation: 'right',
  };
  const gateClasses = {
    in: Input,
    not: NotGate,
    and: AndGate,
    j: Junction,
    or: OrGate,
    xor: XorGate,
    sw: Switch,
    win: WinBox,
  };

  const makeGate = spec => {
    const opts = Object.assign({}, specDefaults, spec);
    const {id, position, orientation} = opts;

    const type = id.replace(/\d+/, '');
    if (!(type in gateClasses))
      throw Error(`Bad id "${id}", unrecognized type "${type}"`);
    const gate = new gateClasses[type](drawing, id, position, orientation);
    return gate;
  };

  // This returns [gate, pinNum] from a spec.
  const gateAndPinNum = spec => {
    const [id, pin] = spec.split('-');
    const gate = gatesById[id];
    if (!(id in gatesById)) throw Error(`Bad gate/pin spec "${spec}"`);
    return [gate, +pin];
  };

  const makeWire = spec => {
    const [fromSpec, toSpec, wp] = spec;
    const from = gateAndPinNum(fromSpec);
    console.log('from: ', from);
    const to = gateAndPinNum(toSpec);
    console.log('to: ', to);
    const waypoints = typeof wp === 'undefined' ? [] : wp;
    const wire = new Wire(drawing, from, to, waypoints);
    return wire;
  };

  const gates = spec.gates.map(makeGate);
  gates.forEach(gate => {
    gatesById[gate.id] = gate;
  })

  const wires = spec.wires.map(makeWire);

  gates.forEach(gate => gate.update());

  return {
    gates,
    gatesById,
    wires,
  };
};
