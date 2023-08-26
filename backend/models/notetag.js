const getNoteTagModel = (sequelize) => {
    const NoteTag = sequelize.define("notetag", {

    });
  
    return NoteTag;
  };
  
  module.exports = getNoteTagModel;