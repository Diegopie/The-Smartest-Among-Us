module.exports = function (sequelize, DataTypes) {
  const Score = sequelize.define("Score", {
    scoreID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 12],
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // quizID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });
  Score.associate = (models) => {
    Score.belongsTo(models.Quiz, {
      foreignKey: "quizID",
      onDelete: "cascade",
    });
  };
  return Score;
};
