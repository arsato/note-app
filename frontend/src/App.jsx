import { useState } from "react";
import Router from "./components/router/Router";
import Context from "./Context";

function App() {
  const [userNotes, setUserNotes] = useState(null);
  const [tagNames, setTagNames] = useState(null)

  return (
    <>
      <Context.Provider value={{ userNotes, setUserNotes, tagNames, setTagNames }}>
        <Router />
      </Context.Provider>
    </>
  );
}

export default App;
