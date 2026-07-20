import './App.css';
import { AppRouter } from "./routes/AppRouter";
import { useAppDispatch } from './hooks/hooks';
import { useTokenExpiration } from './hooks/useTokenExpiration';

const REACT_APP_APP_NAME = process.env.REACT_APP_APP_NAME;
export { REACT_APP_APP_NAME };

function App() {
  useTokenExpiration();

  return <AppRouter />;
}

export default App;
