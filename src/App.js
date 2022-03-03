import './App.css';
import Home from './pages/home';
import Payment from './pages/payment';
import Room from './pages/room';
import Success from './pages/success';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
         <Routes>
      <Route path="/" element={<Home />} />
      <Route path="room" element={<Room />} />
      <Route path="payment" element={<Payment />} />
      <Route path="success" element={<Success />} />
    </Routes>
    </div>
  );
}

export default App;
