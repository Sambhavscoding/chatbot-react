import {Routes, Route} from "react-router";
import { HomePage } from './pages/homepage.jsx'
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<div> TEst </div>} />
    </Routes>
      
  )
}

export default App
