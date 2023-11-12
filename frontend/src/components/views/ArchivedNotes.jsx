import { useNavigate } from "react-router-dom";
import Note from "../cards/Note";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import axios from "axios";
import CreateEditNote from "../modals/CreateEditNote";

const Archived = () => {
  const navigate = useNavigate();
  const toMyNotes = () => navigate("/");
  const [showCreate, setShowCreate] = useState(false);
  const { userNotes, setUserNotes } = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  const [tags, setTags] = useState({});
  const [tagNames, setTagNames] = useState([]);

  const url = "https://noteback-f4ao.onrender.com/api";

  const getData = async () => {
    const noteEndpoint = "/notes";
    try {
      const { data: notesList } = await axios.get(url + noteEndpoint);
      setUserNotes(notesList);
      const tagEndpoint = "/tags";
      const { data: tagList } = await axios.get(url + tagEndpoint);
      setTags(tagList);
      let names = tagList.map((ele) => ({
        name: ele.name,
      }));
      setTagNames(names);
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
        {loaded &&
          userNotes.map(
            ({ noteId, title, content, updatedAt, isArchived, tags }) => {
              if (isArchived == true) {
                return (
                  <Note
                    key={noteId}
                    id={noteId}
                    title={title}
                    content={content}
                    updatedAt={updatedAt}
                    isArchived={isArchived}
                    tags={tags}
                  />
                );
              }
            }
          )}
      </div>
      {showCreate && <CreateEditNote setShowCreate={setShowCreate} />}
    </main>
  );
};

export default Archived;
