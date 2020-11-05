module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Book", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
          type: DataTypes.STRING,
          allowNull: false
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `/catalog/book/${this.firstName}`;
              },
              set(value) {
                throw new Error('Do not try to set the `url` value!');
              }
        }
    });
};
