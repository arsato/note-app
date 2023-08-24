import { Route, Routes } from "react-router-dom";
import MyNotes from "../views/MyNotes";
import Archived from "../views/ArchivedNotes";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyNotes />} />
        <Route path="/archived" element={<Archived />} />
      </Routes>
    </>
  );
};

export default Router;
