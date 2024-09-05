import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemsToAdd from "./ItemstoAdd";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/items-to-add" element={<ItemsToAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
