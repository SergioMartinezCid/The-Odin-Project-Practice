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
            validate: { len: [3, 1000] }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('AUTHOR', 'USER'),
            allowNull: false
        }
    });
};
