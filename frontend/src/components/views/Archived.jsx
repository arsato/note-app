import { useNavigate } from "react-router-dom";
import Note from "../cards/Note";

const Archived = () => {
  const navigate = useNavigate();
  const toMyNotes = () => navigate("/");
  return (
    <main className="container mx-auto mt-6">
      <div className="flex justify-between mb-6">
        <div className="flex gap-6">
          <h2 className="text-3xl font-bold text-gray-800">Archived Notes</h2>
        </div>

        <button
          className="bg-gray-400 hover:bg-gray-500 w-32 py-2 text-white text-sm font-light rounded-lg hover:scale-[1.02] ease-in-out duration-300"
          onClick={toMyNotes}
        >
          Back to My Notes
        </button>
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

export default Archived;
