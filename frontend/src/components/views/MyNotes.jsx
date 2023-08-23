import Note from "../cards/Note";
import { useNavigate } from "react-router-dom";

const MyNotes = () => {
  const navigate = useNavigate();
  const toArchived = () => navigate("/archived");

  return (
    <main className="container mx-auto mt-6">
      <div className="flex justify-between mb-6">
        <div className="flex gap-6">
          <h2 className="text-3xl font-bold text-gray-800">My Notes</h2>
          <button
            className="bg-gray-400 hover:bg-gray-500 w-32 py-2 text-white text-sm font-light rounded-lg hover:scale-[1.02] ease-in-out duration-300"
            onClick={toArchived}
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
    </main>
  );
};

export default MyNotes;
