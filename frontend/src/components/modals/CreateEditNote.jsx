import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../../Context";

const CreateEditNote = ({
  setShowCreate,
  id,
  title,
  content,
  updatedAt,
  isArchived,
}) => {
  const url = "http://localhost:3000/api/notes";
  const { setUserNotes } = useContext(Context);

  const getData = async () => {
    try {
      const { data: notesList } = await axios.get(url);
      setFormData({
        ...formData,
        title: title,
        content: content,
      });
      setUserNotes(notesList);
    } catch (error) {
      console.log(error);
    }
  };

  const getArchiveData = async () => {
    const endpoint = "/archived";
    try {
      const { data: notesList } = await axios.get(url + endpoint);
      setFormData({
        ...formData,
        title: title,
        content: content,
      });
      setUserNotes(notesList);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateEdit = () => {
    if (id) {
      handleUpdate();
    } else {
      handlePublish();
    }
  };

  const handlePublish = async (e) => {
    const { title, content } = formData;
    try {
      if (!title) return alert("Must have at least a title");
      await axios.post(url, formData);
      setShowCreate(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    const endpoint = `/${id}`;
    const { title, content } = formData;
    if (isArchived === true) {
      try {
        if (!title) return alert("Must have at least a title");
        await axios.put(url + endpoint, formData);
        setShowCreate(false);
        getArchiveData();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (!title) return alert("Must have at least a title");
        await axios.put(url + endpoint, formData);
        setShowCreate(false);
        getData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    isArchived ? getArchiveData() : getData();
  }, []);

  return (
    <div>
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity overflow-y-auto min-h-full w-full flex place-items-center sm:items-center sm:p-0"
      >
        <div class="relative mx-auto p-5 border shadow-lg rounded-lg bg-white transition-all text-left sm:my-8 sm:w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <form className="bg-white p-8 rounded-xl">
            <div className="flex flex-col">
              <h2 className="text-center text-lg mb-6 font-medium">
                Create/Edit note
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <label htmlFor="title" className="hidden md:block ">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-xl p-4 pl-6 h-10 w-full md:w-5/6"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label htmlFor="content" className="hidden md:block">
                  Content
                </label>
                <textarea
                  type="textarea"
                  rows={7}
                  id="content"
                  name="content"
                  placeholder="Content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="resize-none border border-gray-300 rounded-xl p-4 pl-6 w-full md:w-5/6"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label htmlFor="categories" className="hidden md:block">
                  Categories
                </label>
                <input
                  type="text"
                  id="categories"
                  name="categories"
                  value={formData.categories}
                  placeholder="Categories"
                  className="border text-gray-400 border-gray-300 rounded-xl p-4 pl-6 h-10 w-full md:w-5/6"
                />
              </div>
              <div className="flex items-center justify-end mb-6">
                <input
                  type="text"
                  id="new-category"
                  name="category"
                  value={formData.categories}
                  placeholder="New Category"
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-xl p-4 pl-6 h-10 w-full basis-5/6 md:basis-4/6"
                />
                <button className="border border-gray-700 bg-gray-300 rounded-xl p-1 w-full h-10 basis-1/6">Add</button>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gren-500 sm:ml-3 sm:w-auto"
                onClick={handleCreateEdit}
              >
                Save
              </button>
              <button
                onClick={() => setShowCreate(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEditNote;
