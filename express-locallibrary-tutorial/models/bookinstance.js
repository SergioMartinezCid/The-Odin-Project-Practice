const { DateTime } = require("luxon");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("BookInstance", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
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
                return `/catalog/book/${this.id}`;
              }
        },
        due_back_formatted: {
          type: DataTypes.VIRTUAL,
          get() {
            return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
          }
        }
    });
};
