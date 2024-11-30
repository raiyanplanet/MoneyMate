import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Corporate Card", value: 400 },
  { name: "Credit Card", value: 300 },
  { name: "Cash", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const PieChartComponent: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="text-gray-600 mb-2">Scheduled Payments</h4>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
