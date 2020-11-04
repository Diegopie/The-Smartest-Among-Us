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
    //   references: {
    //     model: "Accounts",
    //     key: "accountID",
    //   },
    // },
  });

  Quiz.associate = (models) => {
    Quiz.belongsTo(models.User, {
      foreignKey: "accountID",
    });
    Quiz.hasMany(models.Question, {
      foreignKey: "quizID",
      sourceKey: "quizID",
    });
    Quiz.hasMany(models.Score, {
      foreignKey: "quizID",
      sourceKey: "quizID",
    });
  };

  return Quiz;
};
