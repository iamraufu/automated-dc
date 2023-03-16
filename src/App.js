import { Route, Routes } from 'react-router-dom';
import './App.css';
import Attendance from './pages/Attendance';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Picker from './pages/Picker';
import VehicleAssign from './pages/VehicleAssign';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/attendance' element={<Attendance />} />
      <Route path='/picker' element={<Picker />} />
      <Route path='/vehicle-assign' element={<VehicleAssign />} />
      
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;