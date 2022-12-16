import React, { useEffect } from 'react';
import { useFormik, getIn } from 'formik';
import * as Yup from 'yup';
import SelectBox from './SelectBox';
import { useState } from 'react';
import ObjectiveFunction from './ObjectiveFunction';
import Constraint from './Constraint';
import { useDispatch } from 'react-redux';
import { setDisplay } from '../redux/actions/setDisplayAction';
import { setParams } from '../redux/actions/setParametersAction';
import { useSelector } from 'react-redux';
import { solve } from '../apiOperations/solve';
import Examples from './Examples';

const Parameteres = () => {
  const { objective, objectiveFunction, constraints } = useSelector(
    (state) => state.graphReducer
  );
  const [constraintNumber, setConstraintNumber] = useState(
    constraints.length || 2
  );
  const [predefinedExamples, setPredefinedExamples] = useState([]);
  const constraint = { a: 0, b: 0, y: 0, sign: '≤' };
  const [error, setError] = useState();
  const [selectedExample, setSelectedExample] = useState(null);
  const [objectiveType, setObjectiveType] = useState(objective || 'Maximize');
  const dispatch = useDispatch();
  const increaseCons = (array) => {
    setError(null);
    setConstraintNumber((item) => item + 1);
    array.push(constraint);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('examples'));
    if (items) {
      setPredefinedExamples(items);
    }
  }, []);

  useEffect(() => {
    if (selectedExample) {
      setObjectiveType(
        predefinedExamples[selectedExample - 1].objective === 'maximization'
          ? 'Maximize'
          : 'Minimize'
      );
      let extras = [...predefinedExamples[selectedExample - 1].constraints]
        .slice(
          0,
          predefinedExamples[selectedExample - 1].constraints.length - 2
        )
        .map((item) => {
          return {
            ...item,
            sign: '<=' ? '≤' : '≥',
          };
        });
      if (extras.length > 2) extras = extras.slice(2, extras.length);
      else extras = [];
      formik.setValues({
        objFuncA: predefinedExamples[selectedExample - 1].objective_function.a,
        objFuncB: predefinedExamples[selectedExample - 1].objective_function.b,
        cons1A: predefinedExamples[selectedExample - 1].constraints[0].a,
        cons1B: predefinedExamples[selectedExample - 1].constraints[0].b,
        cons2A: predefinedExamples[selectedExample - 1].constraints[1].a,
        cons2B: predefinedExamples[selectedExample - 1].constraints[1].b,
        cons1Y: predefinedExamples[selectedExample - 1].constraints[0].y,
        cons2Y: predefinedExamples[selectedExample - 1].constraints[1].y,
        cons1Sign:
          predefinedExamples[selectedExample - 1].constraints[0].sign === '<='
            ? '≤'
            : '≥',
        cons2Sign:
          predefinedExamples[selectedExample - 1].constraints[1].sign === '<='
            ? '≤'
            : '≥',
        extraCons: extras,
      });
    }
  }, [selectedExample]);

  const resetValues = {
    objFuncA: 0,
    objFuncB: 0,
    cons1A: 0,
    cons1B: 0,
    cons2A: 0,
    cons2B: 0,
    cons1Y: 0,
    cons2Y: 0,
    cons1Sign: '≤',
    cons2Sign: '≤',
    extraCons: [],
  };

  const formik = useFormik({
    initialValues: {
      objFuncA: objectiveFunction.a || 0,
      objFuncB: objectiveFunction.b || 0,
      cons1A: constraints[0].a || 0,
      cons1B: constraints[0].b || 0,
      cons2A: constraints[1].a || 0,
      cons2B: constraints[1].b || 0,
      cons1Y: constraints[0].y || 0,
      cons2Y: constraints[1].y || 0,
      cons1Sign: constraints[0].sign || '≤',
      cons2Sign: constraints[1].sign || '≤',
      extraCons: constraints.slice(2, constraints.length) || [],
    },
    validationSchema: Yup.object({
      objFuncA: Yup.number().required('Required'),
      objFuncB: Yup.number().required('Required'),
      cons1A: Yup.number().required('Required'),
      cons2A: Yup.number().required('Required'),
      cons1B: Yup.number().required('Required'),
      cons2B: Yup.number().required('Required'),
      cons1Y: Yup.number().required('Required'),
      cons2Y: Yup.number().required('Required'),
      extraCons: Yup.array(
        Yup.object({
          a: Yup.number().required('Required'),
          b: Yup.number().required('Required'),
          y: Yup.number().required('Required'),
          sign: Yup.string(),
        })
      ),
    }),
    onSubmit: (values) => {
      if (values.objFuncA === 0 && values.objFuncB === 0) {
        setError(
          'You may not leave blank or place 0 in both coefficients of the objective function'
        );
        return;
      }
      if (!verifyConstraints()) {
        return;
      } else setError(null);
      const model = createModel(values);
      dispatch(
        setParams(model.objective, model.objectiveFunction, model.constraints)
      );
      solve(
        model.objective,
        model.objectiveFunction,
        model.constraints,
        dispatch
      );
      dispatch(setDisplay('graph'));
    },
  });

  const decreaseCons = (array) => {
    setError(null);
    if (constraintNumber === 2) {
      setError('There must be at least 2 constraints');
      return;
    }
    setConstraintNumber((item) => item - 1);
    if (formik.errors.extraCons) formik.errors.extraCons.pop();
    array.pop();
  };

  const verifyConstraints = () => {
    let loopResult = true;
    if (formik.values.cons1A === 0 && formik.values.cons1B === 0) {
      setError(
        'You cannot leave blank or place 0 in both coefficients of the constraint 1'
      );
      return false;
    } else if (formik.values.cons2A === 0 && formik.values.cons2B === 0) {
      setError(
        'You cannot leave blank or place 0 in both coefficients of the constraint 2'
      );
      return false;
    }
    formik.values.extraCons.forEach((item, i) => {
      if (item.a === 0 && item.b === 0) {
        setError(
          `You cannot leave blank or place 0 in both coefficients of the constraint ${
            i + 3
          } `
        );
        loopResult = false;
      }
    });
    if (!loopResult) return false;
    return true;
  };

  const createModel = (values = formik.values) => {
    const constraints = [
      {
        a: parseFloat(values.cons1A),
        b: parseFloat(values.cons1B),
        y: parseFloat(values.cons1Y),
        sign: values.cons1Sign,
      },
      {
        a: parseFloat(values.cons2A),
        b: parseFloat(values.cons2B),
        y: parseFloat(values.cons2Y),
        sign: values.cons2Sign,
      },
      ...values.extraCons.map((item) => {
        return {
          a: parseFloat(item.a),
          b: parseFloat(item.b),
          y: parseFloat(item.y),
          sign: item.sign,
        };
      }),
    ];
    const model = {
      objectiveFunction: {
        a: parseFloat(values.objFuncA),
        b: parseFloat(values.objFuncB),
      },
      constraints: constraints,
      objective: objectiveType,
    };
    return model;
  };

  return (
    <div className="parameteres-container">
      <div className="col-lg-7 col-md-9 d-flex gap-4 flex-column">
        <Examples selected={selectedExample} setSelected={setSelectedExample} />
        <SelectBox
          selected={objectiveType}
          setSelected={setObjectiveType}
          title={'Objective:'}
          fields={['Maximize', 'Minimize']}
        />
        <form
          onSubmit={formik.handleSubmit}
          className=" d-flex flex-column gap-3"
        >
          <ObjectiveFunction
            errors={formik.errors}
            a={formik.values.objFuncA}
            b={formik.values.objFuncB}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <h2 style={{ textAlign: 'left', fontSize: 20 }}>Constraints</h2>
          <Constraint
            setSign={formik.setFieldValue}
            sign={formik.values.cons1Sign}
            errorA={formik.errors.cons1A}
            errorB={formik.errors.cons1B}
            errorY={formik.errors.cons1Y}
            number={1}
            a={formik.values.cons1A}
            b={formik.values.cons1B}
            y={formik.values.cons1Y}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Constraint
            setSign={formik.setFieldValue}
            sign={formik.values.cons2Sign}
            errorA={formik.errors.cons2A}
            errorB={formik.errors.cons2B}
            errorY={formik.errors.cons2Y}
            number={2}
            a={formik.values.cons2A}
            b={formik.values.cons2B}
            y={formik.values.cons2Y}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.values.extraCons.map((item, index) => (
            <div key={index}>
              <Constraint
                customName={`extraCons[${index}].`}
                errorA={getIn(formik.errors, `extraCons[${index}].a`)}
                errorB={getIn(formik.errors, `extraCons[${index}].b`)}
                errorY={getIn(formik.errors, `extraCons[${index}].y`)}
                number={index + 3}
                a={item.a}
                b={item.b}
                y={item.y}
                sign={item.sign}
                setSign={formik.setFieldValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          ))}
          <span className="d-flex justify-content-center">
            <span className="input-group-text X plain-text" id="basic-addon2">
              X<span className="number">{1}</span>
            </span>
            ,
            <span className="input-group-text X plain-text" id="basic-addon2">
              X<span className="number">{2}</span>
            </span>
            {'≥'}0
          </span>
          <div className="d-flex justify-content-center gap-3 col-md-4 col-5 align-self-center">
            <button
              onClick={() => increaseCons(formik.values.extraCons)}
              type="button"
              className="btn btn-success w-25"
            >
              +
            </button>
            <button
              onClick={() => decreaseCons(formik.values.extraCons)}
              type="button"
              className="btn btn-danger w-25"
            >
              -
            </button>
          </div>
          <button
            type="submit"
            className="btn col-8 btn-primary  align-self-center col-sm-6"
          >
            Graph
          </button>
          <button
            onClick={() => formik.setValues(resetValues)}
            type="button"
            className="btn col-8 btn-outline-primary  align-self-center col-sm-6"
          >
            Reset
          </button>
        </form>
        {error && (
          <div className="alert alert-danger text-center my-3">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Parameteres;
