module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user: {
      type: Sequelize.UUID,
      refrences: {
        model: "users",
        key: "id",
      },
    },
    movie: {
      type: Sequelize.UUID,
      refrences: {
        model: "movies",
        key: "id",
      },
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Rating;
};

/*
  {
    "id": "1231314321",
    "user": "8312321938232",
    "movie": "3131242542222242",
    "rating": 4, // max is 5
    "createdAt": DATE,
    "updatedAt": DATE
  }
  */
