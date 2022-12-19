const compare = (a, b, sign, y, x1, x2) => {
  const eq = a * x1 + b * x2;
  if (sign === '≤') {
    if (eq < y || eq === y) return true;
    else return false;
  } else if (sign === '≥') {
    if (eq > y || eq === y) return true;
    else return false;
  } else return 'swrong parameters';
};

export const getX2 = (a, b, y, x1) => {
  const result = (y - a * x1) / b;
  return result;
};

const getX1 = (a, b, y, x2) => {
  const result = (y - b * x2) / a;
  return result;
};

const getVariables = (constraint1, constraint2) => {
  const x1 =
    (constraint2.y * constraint1.b - constraint1.y * constraint2.b) /
    (constraint2.a * constraint1.b - constraint1.a * constraint2.b);
  const x2 =
    constraint1.b !== 0
      ? getX2(constraint1.a, constraint1.b, constraint1.y, x1)
      : getX2(constraint2.a, constraint2.b, constraint2.y, x1);
  return [x1, x2];
};

export const compute = (originalCons) => {
  const values = [];
  const constraints = [...originalCons];
  constraints.push({ a: 1, b: 0, sign: '≥', y: 0 });
  constraints.push({ a: 0, b: 1, sign: '≥', y: 0 });
  constraints.forEach((item, i) => {
    const sliced = [...constraints].slice(i + 1, constraints.length);
    sliced.forEach((elem, j) => {
      let test = true;
      const result = getVariables(item, elem);
      if (result[0] < 0 || result[1] < 0) {
        test = false;
      } else {
        const temp = [...constraints].filter(
          (_, k) => k !== j + i + 1 && k !== i
        );
        temp.forEach((it) => {
          const isValid = compare(
            it.a,
            it.b,
            it.sign,
            it.y,
            result[0],
            result[1]
          );
          if (!isValid) {
            test = false;
          }
        });
      }
      if (test) {
        const isThere = values.find(
          (item) => item.x1 === result[0] && item.x2 === result[1]
        );
        if (!isThere) values.push({ x1: result[0], x2: result[1] });
      }
    });
  });
  // test (0,0)
  const isThere = values.find((item) => item.x1 === 0 && item.x2 === 0);
  if (!isThere) {
    let test0 = true;
    originalCons.forEach((item, i) => {
      const isValid = compare(item.a, item.b, item.sign, item.y, 0, 0);
      if (!isValid) {
        test0 = false;
      }
    });
    if (test0) values.push({ x1: 0, x2: 0 });
  }
  return values;
};

export const getPoints = (constraints, values) => {
  const points = [];
  constraints.forEach((it, i) => {
    points.push({ coordinates: [] });
  });
  constraints.forEach((item, i) => {
    if (item.b === 0) {
      values.forEach((elem, j) => {
        if (points[i].coordinates.length === 0) {
          const x1 = getX1(item.a, item.b, item.y, elem.x2);
          if (x1 && x1 !== Infinity) {
            points[i].coordinates.push({ x1: x1, x2: elem.x2 });
          }
        } else if (points[i].coordinates.length < 2) {
          points[i].coordinates.push({
            x1: points[i].coordinates[0].x1,
            x2: points[i].coordinates[0].x2 === 0 ? 1 : 0,
          });
        }
      });
    } else if (item.a === 0) {
      values.forEach((elem, j) => {
        if (points[i].coordinates.length === 0) {
          const x2 = getX2(item.a, item.b, item.y, elem.x1);
          if (x2 && x2 !== Infinity) {
            points[i].coordinates.push({ x1: elem.x1, x2: x2 });
          }
        } else if (points[i].coordinates.length < 2)
          points[i].coordinates.push({
            x1: points[i].coordinates[0].x1 === 0 ? 1 : 0,
            x2: points[i].coordinates[0].x2,
          });
      });
    } else {
      values.forEach((elem, j) => {
        if (points[i].coordinates.length < 2) {
          const x2 = getX2(item.a, item.b, item.y, elem.x1);
          if (points[i].coordinates[0]?.x1 !== elem.x1) {
            points[i].coordinates.push({ x1: elem.x1, x2: x2 });
          }
        }
      });
      if (points[i].coordinates.length < 2) {
        if (points[i].coordinates[0]?.x1 === 0) {
          const x2 = getX2(item.a, item.b, item.y, 1);
          points[i].coordinates.push({ x1: 1, x2: x2 });
        } else {
          const x2 = getX2(item.a, item.b, item.y, 0);
          points[i].coordinates.push({ x1: 0, x2: x2 });
        }
      }
    }
  });

  //case where values is empty
  if (!values) {
    constraints.forEach((item, i) => {
      if (item.a === 0) {
        points[i].coordinates.push({ x1: 0, x2: item.y / item.b });
        points[i].coordinates.push({ x1: 5, x2: item.y / item.b });
      } else if (item.b === 0) {
        points[i].coordinates.push({ x1: item.y / item.a, x2: 0 });
        points[i].coordinates.push({ x1: item.y / item.a, x2: 5 });
      } else {
        points[i].coordinates.push({
          x1: 0,
          x2: getX2(item.a, item.b, item.y, 0),
        });
        points[i].coordinates.push({
          x1: 5,
          x2: getX2(item.a, item.b, item.y, 5),
        });
      }
    });
  }

  return points;
};

export const getMaxValues = (points) => {
  let maxX1 = 0;
  let maxX2 = 0;
  points?.forEach((item, i) => {
    item.coordinates.forEach((elem, j) => {
      if (elem.x1 > maxX1) maxX1 = elem.x1;
      if (elem.x2 > maxX2) maxX2 = elem.x2;
    });
  });
  return [maxX1, maxX2];
};

const insertCoordinate = (array, index, newPoint) => {
  let element = array[index];
  const newCoors = [...element?.coordinates, newPoint];
  element = { ...element, coordinates: newCoors };
  /* let filtered = [...array].filter((item,i) => (i === index)); */
  array.splice(index, 1, element);
  return array;
};

export const addMaxValues = (constraints, points) => {
  let temp = [...points];
  const maxValues = getMaxValues(points);
  constraints.forEach((item, i) => {
    if (item.a === 0) {
      insertCoordinate(temp, i, {
        x1: maxValues[0],
        x2: temp[i]?.coordinates[0]?.x1,
      });
    } else if (item.b === 0) {
      insertCoordinate(temp, i, {
        x1: temp[i]?.coordinates[0]?.x1,
        x2: maxValues[1],
      });
    } else {
      const x0 = getX2(item.a, item.b, item.y, 0);
      insertCoordinate(temp, i, { x1: 0, x2: x0 });
      const x2 = getX2(item.a, item.b, item.y, maxValues[0] + 1);
      insertCoordinate(temp, i, { x1: maxValues[0] + 1, x2: x2 });
    }
  });
  return temp;
};

export const generateDenseArray = (values) => {
  const denseValues = Array(Math.pow(values.length, 2)).fill(0);
  let rightPointer = denseValues.length - 1;
  for (let i = 0; i < values.length; i++) {
    denseValues[i] = values[i];
    for (let j = 0; j < values.length; j++) {
      if (i === j) continue;
      denseValues[rightPointer--] = values[j];
    }
  }
  return denseValues;
};
