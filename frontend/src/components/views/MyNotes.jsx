import { useContext, useEffect, useState } from "react";
import Note from "../cards/Note";
import { useNavigate } from "react-router-dom";
import CreateEditNote from "../modals/CreateEditNote";
import axios from "axios";
import Context from "../../Context";

const MyNotes = () => {
  const navigate = useNavigate();
  const toArchived = () => navigate("/archived");
  const [showCreate, setShowCreate] = useState(false);
  const { userNotes, setUserNotes, tagNames, setTagNames } = useContext(Context);
  const [filters, setFilter] = useState({});
  const [loaded, setLoaded] = useState(false);

  const url = "http://localhost:3000/api";

  const handleFilters = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setFilter({ ...filters, ...field });
  };

  const getData = async () => {
    const noteEndpoint = "/notes";
    try {
      const { data: notesList } = await axios.get(url + noteEndpoint);
      setUserNotes(notesList);
      const tagEndpoint = "/tags";
      const { data: tagList } = await axios.get(url + tagEndpoint);
      setTagNames(tagList);
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
          <select
            onChange={handleFilters}
            name="category"
            id="category"
            className="border border-gray-300 rounded-xl pl-8 text-gray-600 h-10 pr-8 bg-white hover:cursor-pointer hover:bg-gray-100 ease-in-out duration-300"
          >
            <option value="all" selected="selected" defaultChecked>
              Category
            </option>
            {loaded &&
              tagNames.map(({ name }) => (
                <option key={name + 3} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {loaded &&
          userNotes
            .filter((note) => {
              if (filters.category === undefined || filters.category === "all") {
                return note;
              } else {
                let array = note.tags;
                let result = array.some((tag) => tag.name === filters.category);
                if (result) {
                  return note;
                }
              }
            })
            .map(({ noteId, title, content, updatedAt, isArchived, tags }) => {
              if (isArchived == false) {
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
            })}
      </div>
      {showCreate && <CreateEditNote setShowCreate={setShowCreate} />}
    </main>
  );
};

export default MyNotes;
