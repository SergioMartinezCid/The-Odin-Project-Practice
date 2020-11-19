module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Comment", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { len: [10, 1500] }
        }
    });
};
