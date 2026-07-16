import './App.css';
import { AppRouter } from "./routes/AppRouter";

const REACT_APP_APP_NAME = process.env.REACT_APP_APP_NAME;
export { REACT_APP_APP_NAME };

function App() {
  return <AppRouter />;
}

export default App;
