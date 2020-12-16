import './App.css';
import empData from './empData.json';
import EmployeeTable from './EmployeeTable';

function App() {
  return (
    <div className="App">
      <EmployeeTable employees={empData} />
    </div>
  );
}

export default App;
