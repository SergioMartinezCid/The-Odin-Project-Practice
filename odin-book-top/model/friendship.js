module.exports = (sequelize, DataTypes, User) => {
    return sequelize.define("Friendship", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        requestingFriendId: {
            type: DataTypes.INTEGER,
            references: {
              model: User,
              key: 'id'
            }
          },
          friendBeingRequestedId: {
            type: DataTypes.INTEGER,
            references: {
              model: User,
              key: 'id'
            },
        }, 
        answered: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
};
