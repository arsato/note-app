import { useContext, useEffect, useState } from "react";
import Note from "../cards/Note";
import { useNavigate } from "react-router-dom";
import CreateEditNote from "../modals/CreateEditNote";
import test from "../modals/test";
import axios from "axios";
import Context from "../../Context";
import Test from "../modals/test";

const MyNotes = () => {
  const navigate = useNavigate();
  const toArchived = () => navigate("/archived");
  const [showCreate, setShowCreate] = useState(false);
  const { userNotes, setUserNotes } = useContext(Context);
  const [loaded, setLoaded] = useState(false);

  const url = "http://localhost:3000/api/notes";

  const getData = async () => {
    try {
      const { data: notesList } = await axios.get(url);
      setUserNotes(notesList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        {loaded &&
          userNotes.map(({ noteId, title, content, updatedAt, isArchived }) => (
            <Note
              key={noteId}
              id={noteId}
              title={title}
              content={content}
              updatedAt={updatedAt}
              isArchived={isArchived}
            />
          ))}
      </div>
      {showCreate && <CreateEditNote setShowCreate={setShowCreate} />}
      {/* <Test /> */}
    </main>
  );
};

export default MyNotes;
