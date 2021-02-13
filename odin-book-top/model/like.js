module.exports = (sequelize, DataTypes, User, Post) => {
    return sequelize.define("Friendship", {
        UserId: {
            type: DataTypes.INTEGER,
            references: {
              model: User,
              key: 'id'
            },
            primaryKey: true
          },
        PostId: {
            type: DataTypes.INTEGER,
            references: {
              model: Post,
              key: 'id'
            },
            primaryKey: true
          },

    });
};
