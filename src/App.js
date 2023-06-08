import { BrowserRouter, Routes, Route } from "react-router-dom";
import Helmet from "react-helmet";
import Home from "./pages/home/home";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Dead Body Project</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
