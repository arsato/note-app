import React, { useState } from "react";

const CreateEditNote = ({ setForm }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    date: "",
    archived: "",
    categories: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setForm(false)}
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
