const { DateTime } = require("luxon");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Author", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [0, 100]}
        },
        family_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [0, 100]}
        },
        date_of_birth: DataTypes.DATE,
        date_of_death: DataTypes.DATE,
        name: {
          type: DataTypes.VIRTUAL,
          get(){
            return `${this.family_name}, ${this.first_name}`;
          }
        },
        date_of_birth_formatted: {
          type: DataTypes.VIRTUAL,
          get(){
            if (this.date_of_birth != null){
              return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
            } else {
              return '';
            }
          }
        },
        date_of_death_formatted: {
          type: DataTypes.VIRTUAL,
          get(){
            if (this.date_of_death != null){
              return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
            } else {
              return '';
            }
          }
        },
        lifespan: {
          type: DataTypes.VIRTUAL,
          get(){
            if (this.date_of_birth != null && this.date_of_death != null){
              return (new Date(this.date_of_death.format('DD/MM/YYYY h:mm:ss'))
                - new Date(this.date_of_birth.format('DD/MM/YYYY h:mm:ss')));
            } else {
              return 'Unknown';
            }
          }
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `/catalog/author/${this.firstName}`;
              }
        }
    });
};
