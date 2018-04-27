const Circuit = (drawing, spec) => {
  const gatesById = {};

  const makeGate = spec => {
    const opts = Object.assign({}, {
      orientation: 'right',
    }, spec);
    const {id, position, orientation} = opts;
    const angle = {
      'right': 0,
      'up': 270,
      'left': 180,
      'down': 90,
    }[orientation];

    const g = drawing.append('g').attr('transform', [
      `translate(${position.join(', ')})`,
      `rotate(${angle})`
    ].join(' '));

    const type = id.replace(/\d+/, '');
    const gateClass =
      type === 'in' ? Input :
      type === 'not' ? NotGate :
      type === 'and' ? AndGate :
      type === 'j' ? Junction :
      type === 'or' ? OrGate :
      type === 'xor' ? XorGate :
      type === 'sw' ? Switch :
      type === 'win' ? WinBox : null;
    if (gateClass === null)
      throw Error(`Bad id "${id}", unrecognized type "${type}"`);
    const gate = new gateClass(g);

    Object.assign(gate, {
      id,
      position,
      orientation,
      angle,
      g,
      type,
      'class': gateClass,
    })
    return gate;
  };

  // This returns [gate, pinNum] from a spec like 'not0-1' or
  // 'j0'. If the spec doesn't include a pin number, then `pinNum`
  // will be null.
  const gateAndPinNum = spec => {
    const [id, pin] = spec.split('-');
    const gate = gatesById[id];
    if (!(id in gatesById)) throw Error(`Bad gate/pin spec "${spec}"`);
    const pinNum = typeof pin === 'undefined' ? null : +pin;
    return [gate, pinNum];
  };



/*
  const makeWire = spec => {
    const [fromSpec, toSpec, waypoints] = spec;
    const from = gateAndPinNum(fromSpec);
    console.log('from: ', from);
    const to = gateAndPinNum(toSpec);
    console.log('to: ', to);
    const wire = new Wire(drawing, from, to, waypoints)
  };
*/

  const gates = spec.gates.map(makeGate);
  gates.forEach(gate => {
    gatesById[gate.id] = gate;
  })

/*
  const wires = spec.wires.map(makeWire);
*/
};
