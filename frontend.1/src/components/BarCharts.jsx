import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";

const barChart_1 = ({ b_data1, GRADIENTS3 }) => (
  <ResponsiveContainer width="100%" height={550}>
    <BarChart data={b_data1}>
      <defs>
        {GRADIENTS3.map((gradient, index) => (
          <linearGradient
            id={gradient.id}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            key={`bar-gradient-${index}`}
          >
            <stop offset="5%" stopColor={gradient.start} stopOpacity={1} />
            <stop offset="70%" stopColor={gradient.mid} stopOpacity={1} />
            <stop offset="95%" stopColor={gradient.end} stopOpacity={1} />
          </linearGradient>
        ))}
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        <Cell key="bar-cell-0" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-1" fill={`${GRADIENTS3[1].start}`} />
        <Cell key="bar-cell-2" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-3" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-4" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-5" fill={`url(#${GRADIENTS3[5].id})`} />
        <Cell key="bar-cell-6" fill={`url(#${GRADIENTS3[6].id})`} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const barChart_2 = ({ b_data2, GRADIENTS3 }) => (
  <ResponsiveContainer width="100%" height={550}>
    <BarChart data={b_data2}>
      <defs>
        {GRADIENTS3.map((gradient, index) => (
          <linearGradient
            id={gradient.id}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            key={`bar-gradient-${index}`}
          >
            <stop offset="5%" stopColor={gradient.start} stopOpacity={1} />
            <stop offset="70%" stopColor={gradient.mid} stopOpacity={1} />
            <stop offset="95%" stopColor={gradient.end} stopOpacity={1} />
          </linearGradient>
        ))}
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        <Cell key="bar-cell-0" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-1" fill={`${GRADIENTS3[1].start}`} />
        <Cell key="bar-cell-2" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-3" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-4" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-5" fill={`url(#${GRADIENTS3[5].id})`} />
        <Cell key="bar-cell-6" fill={`url(#${GRADIENTS3[6].id})`} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const barChart_3 = ({ b_data3, GRADIENTS3 }) => (
  <ResponsiveContainer width="100%" height={550}>
    <BarChart data={b_data3}>
      <defs>
        {GRADIENTS3.map((gradient, index) => (
          <linearGradient
            id={gradient.id}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            key={`bar-gradient-${index}`}
          >
            <stop offset="5%" stopColor={gradient.start} stopOpacity={1} />
            <stop offset="70%" stopColor={gradient.mid} stopOpacity={1} />
            <stop offset="95%" stopColor={gradient.end} stopOpacity={1} />
          </linearGradient>
        ))}
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        <Cell key="bar-cell-0" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-1" fill={`${GRADIENTS3[1].start}`} />
        <Cell key="bar-cell-2" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-3" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-4" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-5" fill={`url(#${GRADIENTS3[5].id})`} />
        <Cell key="bar-cell-6" fill={`url(#${GRADIENTS3[6].id})`} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const barChart_4 = ({ b_data4, GRADIENTS3 }) => (
  <ResponsiveContainer width="100%" height={550}>
    <BarChart data={b_data4}>
      <defs>
        {GRADIENTS3.map((gradient, index) => (
          <linearGradient
            id={gradient.id}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            key={`bar-gradient-${index}`}
          >
            <stop offset="5%" stopColor={gradient.start} stopOpacity={1} />
            <stop offset="70%" stopColor={gradient.mid} stopOpacity={1} />
            <stop offset="95%" stopColor={gradient.end} stopOpacity={1} />
          </linearGradient>
        ))}
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        <Cell key="bar-cell-0" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-1" fill={`${GRADIENTS3[1].start}`} />
        <Cell key="bar-cell-2" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-3" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-4" fill={`url(#${GRADIENTS3[6].id})`} />
        <Cell key="bar-cell-5" fill={`url(#${GRADIENTS3[5].id})`} />
        <Cell key="bar-cell-6" fill={`url(#${GRADIENTS3[6].id})`} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export { barChart_1, barChart_2, barChart_3, barChart_4 };
