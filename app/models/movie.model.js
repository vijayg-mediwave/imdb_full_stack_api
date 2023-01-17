module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movie", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    genre: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
    yearOfRelease: {
      type: Sequelize.INTEGER,
    },
    createdByUser: {
      type: Sequelize.UUID,
      refrences: {
        model: "users",
        key: "id",
      },
    },
  });

  // associations
  // Movie.associate = (models) => {
  //   Movie.belongsTo(models.user, {
  //     foreignKey: "createdByUser",
  //     as: "createdUserInfo",
  //   });
  // };

  return Movie;
};
