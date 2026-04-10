import "./app.module.css";
import { AppRouter } from "./routes/AppRouter";
import { useAuthCheck } from "./auth/presentation/hooks/useAuthCheck";

function App() {
  useAuthCheck();

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
