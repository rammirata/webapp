import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Legend = ({ data, colors }) => {
  return (
    <div className="flex flex-col ml-8 gap-2.5">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            style={{ backgroundColor: colors[index % colors.length] }}
            className="w-4 h-4 rounded-full mr-2"
          ></div>
          <span className="whitespace-nowrap">{`${entry.name} ${entry.value}`}</span>
        </div>
      ))}
    </div>
  );
};

const pieChart_1 = ({ p_data_1, GRADIENTS }) => (
  <>
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <defs>
          {GRADIENTS.map((gradient, index) => (
            <linearGradient
              id={gradient.id}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              key={`gradient-${index}`}
            >
              <stop offset="5%" stopColor={gradient.start} stopOpacity={1} />
              <stop offset="95%" stopColor={gradient.end} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          data={p_data_1}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={80}
          paddingAngle={5}
        >
          {p_data_1.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#${GRADIENTS[index % GRADIENTS.length].id})`}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <Legend data={p_data_1} colors={GRADIENTS.map((g) => g.start)} />
  </>
);

const pieChart_2 = ({ data2, GRADIENTS2 }) => (
  <>
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <defs>
          {GRADIENTS2.map((gradient, index) => (
            <linearGradient
              id={gradient.id}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              key={`gradient-${index}`}
            >
              <stop offset="5%" stopColor={gradient.start} stopOpacity={1} />
              <stop offset="95%" stopColor={gradient.end} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          data={data2}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={80}
          paddingAngle={5}
        >
          {data2.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#${GRADIENTS2[index % GRADIENTS2.length].id})`}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <Legend data={data2} colors={GRADIENTS2.map((g) => g.start)} />
  </>
);

export { pieChart_1, pieChart_2 };
