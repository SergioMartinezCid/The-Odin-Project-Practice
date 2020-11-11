module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Genre", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [3, 1000] }
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `/catalog/genre/${this.id}`;
            }
        }
    });
};
