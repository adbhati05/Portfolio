import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";
import "./index.css";

function App() {
  return (
    <>
      {/* React router dom ensures user is navigated to the appropriate page when interacting with the site. */}
      <BrowserRouter>
        <Routes>
          {/* When users access this site, this is the page they will land on. */}
          <Route index element={<Home />} />

          {/* Wildcard route for handling cases where users access elements that do not exist or perform an operation that is not defined. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
