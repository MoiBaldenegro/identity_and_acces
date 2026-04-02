// src/presentation/App.tsx
import "./app.module.css";

import { AppRouter } from "./auth/presentation/router/AppRouter";

function App() {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;