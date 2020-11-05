module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Genre", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [3, 1000]}
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `/catalog/genre/${this.firstName}`;
              },
              set(value) {
                throw new Error('Do not try to set the `url` value!');
              }
        }
    });
};
