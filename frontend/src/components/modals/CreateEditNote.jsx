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
  tags,
}) => {
  const url = "http://localhost:3000/api";
  const { setUserNotes, setTagNames } = useContext(Context);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});

  const getData = async () => {
    const endpoint = "/notes";
    try {
      const { data: notesList } = await axios.get(url + endpoint);
      setFormData({
        ...formData,
        title: title,
        content: content,
      });
      const tagEndpoint = "/tags";
      const { data: tagList } = await axios.get(url + tagEndpoint);
      setTagNames(tagList);
      if (id) {
        const tagArray = [];
        tags.map((ele) => {
          tagArray.push(ele.name);
        });
        setCategories(tagArray);
        try {
          const allTagsEndpoint = `/notes/${id}/tags`;
          const { data: noteTagList } = await axios.get(url + allTagsEndpoint);
          let newArr = [];
          const newTagList = noteTagList[0].tags;
          newTagList.map((ele) => {
            newArr.push({ tagId: ele.tagId, name: ele.name });
          });
          console.log(newArr);
          setCategories(newArr);
        } catch (error) {
          console.error(error);
        }
      }
      setUserNotes(notesList);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handlePublish = async () => {
    const { title, content } = formData;
    const notesEndpoint = "/notes";
    const tagsEndpoint = "/tags";
    const relationEndpoint = "/relations";
    const publishTags = [];
    try {
      if (!title) return alert("Must have at least a title");
      const { data: noteRes } = await axios.post(url + notesEndpoint, formData);
      let catBody = categories.map((ele) => ({
        name: ele,
      }));
      const promises = catBody.map(async (tag) => {
        let response = await axios.post(url + tagsEndpoint, tag);
        return response.data;
      });
      const tagIds = await Promise.all(promises);

      tagIds.forEach((ele) => {
        publishTags.push({
          noteId: noteRes.noteId,
          tagId: ele.tagId,
        });
      });

      const relationPromises = publishTags.map(async (ele) => {
        let response = await axios.post(url + relationEndpoint, ele);
        return response.data;
      });
      await Promise.all(relationPromises);
      setShowCreate(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const endpoint = `/notes/${id}`;
    const { title, content } = formData;
    try {
      if (!title) return alert("Must have at least a title");
      await axios.put(url + endpoint, formData);
      setShowCreate(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (event) => {
    const { name, value } = event.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const updateCategory = async () => {
    const tagsEndpoint = "/tags";
    const relationEndpoint = "/relations";
    try {
      let response = await axios.post(url + tagsEndpoint, newCategory);
      const tagId = response.data.tagId;
      console.log(response.data);
      const publishTag = {
        noteId: id,
        tagId: tagId,
      };
      await axios.post(url + relationEndpoint, publishTag);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const removeCategory = async (tag_id) => {
    const deleteRelationEndpoint = `/relations/${id}/${tag_id}`;
    const deleteUnusedTagsEndpoint = `/tags`;
    try {
      await axios.delete(url + deleteRelationEndpoint);
      await axios.delete(url + deleteUnusedTagsEndpoint);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const removeTag = (e) => {
    console.log(e.target.id);
    let filtered = categories.filter((el) => el.tagId != e.target.id);
    console.log(filtered);
    setCategories(filtered);
    removeCategory(e.target.id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity overflow-y-auto min-h-full w-full flex place-items-center sm:items-center sm:p-0">
        <div className="relative mx-auto p-5 border shadow-lg rounded-lg bg-white transition-all text-left sm:my-8 sm:w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white p-8 rounded-xl"
          >
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
                  rows={6}
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
                <ul className="flex gap-4 p-2 w-full md:w-5/6">
                  {categories.map((ele) => (
                    <li key={ele.tagId}>
                      {`#${ele.name}`}
                      <a
                        onClick={removeTag}
                        id={ele.tagId}
                        className="hover:cursor-pointer text-sm"
                      >
                        ❌
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-end mb-6">
                <input
                  type="text"
                  id="new-category"
                  name="name"
                  value={newCategory["name"]}
                  placeholder="New Category"
                  onChange={handleCategory}
                  className="border border-gray-300 rounded-xl p-4 pl-6 h-10 w-full basis-5/6 md:basis-4/6"
                />
                <button
                  onClick={updateCategory}
                  className="border border-gray-700 bg-gray-300 rounded-xl p-1 w-full h-10 basis-1/6"
                >
                  Add
                </button>
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
