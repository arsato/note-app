const getTagModel = (sequelize, { DataTypes }) => {
  const Tag = sequelize.define("tag", {
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Note, { through: models.NoteTag });
  };

  return Tag;
};

module.exports = getTagModel;
