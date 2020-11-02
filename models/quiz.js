module.exports = function (sequelize, DataTypes) {
  const Quiz = sequelize.define("Quiz", {
    quizID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quizName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    randomize: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    // accountID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Account, {
      foreignKey: "accountID",
      targetKey: "accountID",
    });
  };
  return Quiz;
};
