module.exports = function (sequelize, DataTypes) {
  const Question = sequelize.define("Question", {
    // quizID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    questionNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    wrongAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    wrongAnswer2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wrongAnswer3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Question.associate = (models) => {
    Question.belongsTo(models.Quiz, {
      foreignKey: "quizID",
      targetKey: "quizID",
      onDelete: "cascade",
    });
  };
  return Question;
};
