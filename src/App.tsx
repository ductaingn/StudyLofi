import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  type TimeFormat = {
    hour: Number;
    minute: Number;
    second: Number;
  };

  const [defaultTimer, setDefaultTimer] = useState<TimeFormat>({
    hour: 0,
    minute: 25,
    second: 0,
  });

  return (
    <div className="main absolute">
      <Routes>
        <Route
          path="/StudyLofi"
          element={
            <Home
              defaultTimer={defaultTimer}
              setDefaultTimer={setDefaultTimer}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
