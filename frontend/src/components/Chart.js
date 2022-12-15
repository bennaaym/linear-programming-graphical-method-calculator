import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ComposedChart,
} from 'recharts';
import { getMaxValues } from '../functions/compute';

var colors = ['purple', 'green', 'blue', 'orange', 'yellow', 'pink'];

function Chart({ data, values, extended }) {
  const max = getMaxValues(extended);
  const computed = extended.map((item, i) => {
    return {
      name: `constraint${i + 1}`,
      data: item.coordinates,
    };
  });

  computed.push({
    name: ``,
    data: [
      { x1: 0, x2: 0 },
      { x1: 0, x2: max[1] },
    ],
  });

  computed.push({
    name: ``,
    data: [
      { x1: 0, x2: 0 },
      { x1: max[0], x2: 0 },
    ],
  });

  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value, name } = props;
    console.log(payload);
    const point = values.find(
      (item) => payload.x1 === item.x1 && payload.x2 === item.x2
    );
    if (point) {
      return (
        <svg
          x={cx - 10}
          y={cy - 10}
          width={20}
          height={20}
          fill="purple"
          viewBox="0 0 1024 1024"
        >
          <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
        </svg>
      );
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    /* console.log(payload,active) */
    let point = null;
    values.forEach((element) => {
      const exists = payload.find(
        (item) =>
          item.payload.x1 === element.x1 && item.payload.x2 === element.x2
      );
      if (exists) point = exists;
    });
    if (active && payload && payload.length && point) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`x1 : ${point.payload.x1}`}</p>
          <p className="label">{`x2 : ${point.payload.x2}`}</p>
        </div>
      );
    }

    return null;
  };

  const sortedData = computed.map((element) => {
    return {
      name: element.name,
      data: element.data.sort((a, b) => a.x1 - b.x1),
    };
  });

  return (
    <>
      <ResponsiveContainer width="100%" aspect={3}>
        <ComposedChart
          data={values}
          margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis
            startOffset={0}
            max={max[0]}
            dataKey="x1"
            type="number"
            interval={'preserveStartEnd'}
            tickCount={12}
            domain={[0, max[0]]}
          />
          <YAxis type="number" domain={[0, max[1]]} tickCount={12}></YAxis>
          <Legend />
          <Tooltip content={<CustomTooltip />} />
          {/* <Tooltip /> */}
          {sortedData.map((c, i) => (
            <>
              <ReferenceLine x={0} stroke="blue" />
              <Line
                dataKey="x2"
                data={c.data}
                name={c.name}
                strokeWidth={2}
                key={c.name}
                stroke={colors[i]}
                dot={<CustomizedDot />}
              />
              <ReferenceLine
                segment={[
                  { x: c.data[1]?.x1, y: c.data[1]?.x2 },
                  { x: c.data[1]?.x1, y: c.data[1]?.x2 },
                ]}
                label={c.name}
                stroke="red"
              />
              <ReferenceLine y={0} stroke="red" />
            </>
          ))}
          {values.length > 2 && (
            <Area
              type="linearClosed"
              dataKey="x2"
              fill="#8884d8"
              stroke="transparent"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;
