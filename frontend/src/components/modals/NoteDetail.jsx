import React from "react";

const NoteDetail = ({
  setShowDetail,
  id,
  title,
  content,
  updatedAt,
  isArchived,
  tags,
}) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity overflow-y-auto min-h-full w-full flex place-items-center sm:items-center sm:p-0">
        <div className="relative mx-auto p-5 border shadow-lg rounded-lg bg-white transition-all text-left sm:my-8 sm:w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <div className="bg-white p-8 rounded-xl">
            <div className="flex flex-col">
              <h2 className="text-center text-lg mb-6 font-medium">{title}</h2>
              <div className="border-2 border-gray-400 flex flex-col xl:flex-row items-center justify-between mb-6">
                {content}
              </div>
              <div className=" flex gap-4 items-center justify-end mb-6">
                {tags.map((ele) => (
                    <h3 key={ele.tagId}>
                      {`#${ele.name}`}
                    </h3>
                ))}
              </div>
              <div className=" flex xl:flex-row items-center justify-end mb-6">
                {`Last Updated: ${formatDate(updatedAt)}`}
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
                onClick={() => setShowDetail(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
