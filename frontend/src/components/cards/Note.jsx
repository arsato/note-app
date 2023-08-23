const Note = () => {
  return (
    <div>
      <a
        href="#"
        className="grid grid-cols-6 place-items-center w-[450px] p-2 bg-gray-200 border border-gray-400 rounded-lg shadow hover:bg-gray-100"
      >
        <i className="col-span-1 fa-solid fa-note-sticky fa-5x"></i>
        <div className="col-span-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
            This is some note
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Edited: 23/08/23
          </p>
        </div>
        <div className="col-span-1">
          <div className="grid gap-3 justify-end">
            {/* <i class="fa-solid fa-arrow-up-from-bracket"></i> */}
            <i class="fa-solid fa-box-archive"></i>
            <i class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Note;
