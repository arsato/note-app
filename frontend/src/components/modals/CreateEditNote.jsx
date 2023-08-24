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
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>

        <div className="fixed inset-0 z-10">
          <div className="flex min-h-full min-w-full justify-center p-4 text-center items-center sm:items-center sm:p-0">
            <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form className="w-[700px] bg-white p-8 rounded-xl">
                <div className="flex flex-col">
                  <h2 className="text-center text-lg mb-6 font-medium">
                    Create/Edit note
                  </h2>
                  <div className="flex flex-col xl:flex-row items-center justify-between mb-6">
                    <label htmlFor="title" className="hidden xl:block">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-xl p-4 pl-6 h-12 w-full xl:w-5/6"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <label htmlFor="content" className="hidden xl:block">
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
                      className="resize-none border border-gray-300 rounded-xl p-4 pl-6 w-full xl:w-5/6"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <label htmlFor="categories" className="hidden xl:block">
                      Categories
                    </label>
                    <input
                      type="text"
                      id="categories"
                      name="categories"
                      value={formData.categories}
                      readOnly
                      className="border text-gray-400 border-gray-300 rounded-xl p-4 pl-6 h-12 w-full xl:w-5/6"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <label
                      htmlFor="new-category"
                      className="hidden xl:block mr-[-33px]"
                    >
                      New <br /> category
                    </label>
                    <input
                      type="text"
                      id="new-category"
                      name="category"
                      value={formData.categories}
                      placeholder="New Category"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-xl p-4 pl-6 h-12 w-full xl:w-5/6"
                    />
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
      </div>
    </div>
  );
};

export default CreateEditNote;
