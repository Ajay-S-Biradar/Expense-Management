import { useState } from 'react';
import './App.css'
import LandingPage from './pages/LandingPage';
import LoginSignUp from './pages/LoginSignUp';

function App() {
  // const [, set] = useState();
  return (
    <div className="w-[100vw] h-[100vh] ">
      <LoginSignUp />
    </div>
  )
}

export default App
