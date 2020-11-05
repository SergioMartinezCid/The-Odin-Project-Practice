module.exports = (sequelize, DataTypes) => {
    return sequelize.define("BookInstance", {
        imprint: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Available', 'Maintenance', 'Loaned', 'Reserved'),
            defaultValue: 'Maintenance',
            allowNull: false,
        },
        due_back: {
          type: DataTypes.DATE,
          defaultValue: sequelize.NOW
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
