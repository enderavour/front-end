import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_APP_NAME = process.env.REACT_APP_APP_NAME;
export { REACT_APP_APP_NAME };

function App() {
  return <Home />;
}

export default App;
