module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Post", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
};
