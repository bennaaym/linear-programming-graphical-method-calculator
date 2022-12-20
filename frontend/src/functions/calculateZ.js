export const calculateZ = (objectiveFunction, objective, values) => {
  let optimum = 0;
  values.forEach((item, i) => {
    const z = objectiveFunction.a * item.x1 + objectiveFunction.b * item.x2;
    switch (objective) {
      case 'Maximize':
        if (z > optimum) optimum = z;
        break;
      case 'Minimize':
        if (z < optimum) optimum = z;
        break;
      default:
        break;
    }
  });
  return optimum;
};

export const getOptimumValues = (objectiveFunction, objective, values) => {
  let optimum = 0;
  let optimumVariables = { x1: 0, x2: 0 };
  values.forEach((item, i) => {
    const z = objectiveFunction.a * item.x1 + objectiveFunction.b * item.x2;
    switch (objective) {
      case 'Maximize':
        if (z > optimum) {
          optimum = z;
          optimumVariables.x1 = item.x1;
          optimumVariables.x2 = item.x2;
        }
        break;
      case 'Minimize':
        if (z < optimum) {
          optimum = z;
          optimumVariables.x1 = item.x1;
          optimumVariables.x2 = item.x2;
        }
        break;
      default:
        break;
    }
  });
  return optimumVariables;
};
