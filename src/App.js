import { Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateOutlet from './components/PrivateOutlet';
import AuthProvider from './context/AuthProvider';
import Attendance from './pages/Attendance';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Notice from './pages/Notice';
import Picker from './pages/Picker';
import TicketDescription from './pages/TicketDescription';
import Tickets from './pages/Tickets';
import VehicleAssign from './pages/VehicleAssign';
import PickerDetails from './pages/PickerDetails';
import PoData from './components/PoData';
import PickerDate from './pages/PickerDate';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/podata' element={<PoData />} />
        <Route path='*' element={<NotFound />} />

        <Route path='/' element={<PrivateOutlet />}>
          <Route path='/' element={<Home />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/picker' element={<Picker />} />
          <Route path='/picker-details/:id' element={<PickerDetails />} />
          <Route path='/picker-date/:date' element={<PickerDate />} />
          <Route path='/vehicle-assign' element={<VehicleAssign />} />
          <Route path='/tickets' element={<Tickets />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/ticket-details/:id' element={<TicketDescription />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;