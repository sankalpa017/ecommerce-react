import { HomePage } from './pages/HomePage';
import { OrdersPage } from './pages/OrdersPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { TrackingPage } from './pages/TrackingPage';
import { PageNotFound } from './pages/PageNotFound';
import { Routes, Route} from 'react-router';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
