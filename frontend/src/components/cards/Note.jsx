import { useContext, useState } from "react";
import Delete from "../modals/Delete";
import CreateEditNote from "../modals/CreateEditNote";
import NoteDetail from "../modals/NoteDetail";
import axios from "axios";
import Context from "../../Context";

const Note = ({ id, title, content, updatedAt, isArchived, tags }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { setUserNotes } = useContext(Context);
  const url = "https://noteback-f4ao.onrender.com/api";

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getData = async () => {
    try {
      const { data: notesList } = await axios.get(url);
      setUserNotes(notesList);
    } catch (error) {
      console.log(error);
    }
  };

  const getArchiveData = async () => {
    const endpoint = "/archived";
    try {
      const { data: notesList } = await axios.get(url + endpoint);
      setUserNotes(notesList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleArchive = async () => {
    const endpoint = `/${id}`;
    if (isArchived === true) {
      try {
        await axios.put(url + endpoint, {
          isArchived: false,
        });
        getArchiveData();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.put(url + endpoint, {
          isArchived: true,
        });
        getData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <a className="grid grid-cols-6 place-items-center w-[450px] p-2 bg-gray-200 border border-gray-400 rounded-lg shadow hover:bg-gray-100">
        <i className="col-span-1 fa-solid fa-note-sticky fa-5x"></i>
        <div
          onClick={() => setShowDetail(true)}
          className="col-span-4 hover:cursor-pointer"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {`Last Updated: ${formatDate(updatedAt)}`}
          </p>
        </div>
        <div className="col-span-1">
          <div className="grid gap-3 justify-end">
            <i
              onClick={handleArchive}
              className={
                isArchived
                  ? "fa-solid fa-arrow-up-from-bracket hover:cursor-pointer"
                  : "fa-solid fa-box-archive hover:cursor-pointer"
              }
            ></i>
            <i
              onClick={() => setShowCreate(true)}
              className="fa-solid fa-pen hover:cursor-pointer"
            ></i>
            <i
              onClick={() => setShowDelete(true)}
              className="fa-solid fa-trash hover:cursor-pointer"
            ></i>
          </div>
        </div>
      </a>
      {showDelete && (
        <Delete setShowDelete={setShowDelete} id={id} isArchived={isArchived} />
      )}
      {showCreate && (
        <CreateEditNote
          id={id}
          title={title}
          content={content}
          updatedAt={updatedAt}
          isArchived={isArchived}
          tags={tags}
          setShowCreate={setShowCreate}
        />
      )}
      {showDetail && (
        <NoteDetail
          id={id}
          title={title}
          content={content}
          updatedAt={updatedAt}
          isArchived={isArchived}
          tags={tags}
          setShowDetail={setShowDetail}
        />
      )}
    </div>
  );
};

export default Note;
