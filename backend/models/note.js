const getNoteModel = (sequelize, { DataTypes }) => {
  const Note = sequelize.define("note", {
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  return Note;
};

module.exports = getNoteModel;
