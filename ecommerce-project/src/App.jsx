import { HomePage } from './pages/HomePage';
import { OrdersPage } from './pages/OrdersPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { TrackingPage } from './pages/TrackingPage';
import { Routes, Route} from 'react-router';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  )
}

export default App
