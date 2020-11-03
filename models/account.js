module.exports = function (sequelize, DataTypes) {
  const Account = sequelize.define("Account", {
    accountID: {
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
    adminKey: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 6],
      },
    },
  });

  Account.associate = (models) => {
    Account.hasMany(models.Quiz, {
      foreignKey: "accountID",
      sourceKey: "accountID",
    });
  };

  return Account;
};
