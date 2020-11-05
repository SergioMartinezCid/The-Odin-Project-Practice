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
          },
          set(value){
            throw new Error('Do not try to set the `name` value!');
          }
        },
        lifespan: {
          type: DataTypes.VIRTUAL,
          get(){
            return (new Date(this.date_of_death.format('DD/MM/YYYY h:mm:ss'))
              - new Date(this.date_of_birth.format('DD/MM/YYYY h:mm:ss')));
          },
          set(value){
            throw new Error('Do not try to set the `lifespan` value!');
          }
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `/catalog/author/${this.firstName}`;
              },
              set(value) {
                throw new Error('Do not try to set the `url` value!');
              }
        }
    });
};
