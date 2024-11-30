const Header: React.FC = () => {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <input
          type="text"
          placeholder="Search"
          className="border rounded-lg px-4 py-2 w-1/3"
        />
      </header>
    );
  };
  
  export default Header;
  