interface KPIBoxProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
  }
  
  const KPIBox: React.FC<KPIBoxProps> = ({ title, value, change, isPositive }) => {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h4 className="text-gray-600">{title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{value}</span>
          <span
            className={`text-sm font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </span>
        </div>
      </div>
    );
  };
  
  export default KPIBox;
  