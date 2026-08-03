import './App.css';
import { AppRouter } from "./routes/AppRouter";
import { useAppDispatch } from './hooks/hooks';
import { useTokenExpiration } from './hooks/useTokenExpiration';


function App() {
  useTokenExpiration();

  return <AppRouter />;
}

export default App;
