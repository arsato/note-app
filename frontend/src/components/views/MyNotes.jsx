import { useState } from "react";
import Note from "../cards/Note";
import { useNavigate } from "react-router-dom";
import CreateEditNote from "../modals/CreateEditNote";

const MyNotes = () => {
  const navigate = useNavigate();
  const toArchived = () => navigate("/archived");
  const [showCreate, setShowCreate] = useState(false)

  return (
    <main className="container mx-auto mt-6">
      <div className="flex justify-between mb-6">
        <div className="flex gap-6">
          <h2 className="text-3xl font-bold text-gray-800">My Notes</h2>
          <button
            className="bg-gray-400 hover:bg-gray-500 w-32 py-2 text-white text-sm font-light rounded-lg hover:scale-[1.02] ease-in-out duration-300"
            onClick={() => setShowCreate(true)}
          >
            Create Note
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 w-32 py-2 text-white text-sm font-light rounded-lg hover:scale-[1.02] ease-in-out duration-300"
            onClick={toArchived}
          >
            Archived Notes
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-4 flex-wrap justify-center">
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
      {showCreate && <CreateEditNote setShowCreate={setShowCreate}/>}
    </main>
  );
};

export default MyNotes;
