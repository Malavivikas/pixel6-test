import Navbar from "./components/Navbar";
import UsersList from "./components/UsersList";

function App() {
  return (
    <div className="w-full h-full relative overflow-auto">
      <Navbar />
      <div className="flex justify-between mt-10 px-6">
        <div>
          <h2 className="text-3xl font-bold">Employees</h2>
        </div>
      </div>
      <UsersList />
    </div>
  );
}

export default App;
