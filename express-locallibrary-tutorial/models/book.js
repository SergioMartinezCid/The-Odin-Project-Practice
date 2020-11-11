module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Book", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isbn: {
          type: DataTypes.STRING,
          allowNull: false
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `/catalog/book/${this.id}`;
              }
        }
    });
};
