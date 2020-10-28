module.exports = function (sequelize, DataTypes) {
  const Quiz = sequelize.define("Quiz", {
    quizID: {
      type: Sequelize.INTEGER,
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
    accountID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Quiz;
};
