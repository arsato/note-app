import { useState } from "react";
import Router from "./components/router/Router";
import Context from "./Context";

function App() {
  const [userNotes, setUserNotes] = useState(null);

  return (
    <>
      <Context.Provider value={{ userNotes, setUserNotes }}>
        <Router />
      </Context.Provider>
    </>
  );
}

export default App;
