module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Genre", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [3, 1000] }
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `/catalog/genre/${this.firstName}`;
            }
        }
    });
};
