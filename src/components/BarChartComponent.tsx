import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "2019", amount: 30000 },
  { name: "2020", amount: 50000 },
  { name: "2021", amount: 40000 },
  { name: "2022", amount: 70000 },
];

const BarChartComponent: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow max-sm:hidden">
      <h4 className="text-gray-600 mb-2">Total Amount</h4>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
