module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { len: [3, 1000] }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
