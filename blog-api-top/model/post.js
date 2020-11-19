module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Post", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [3, 1000] }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
};
