'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            this.hasMany(models.Apartment, {
                foreignKey: 'owner', targetKey: 'uuid', constraints: false
            })
            this.hasMany(models.Favorite, {
                foreignKey: 'user', targetKey: 'uuid', constraints: false
            })

        }
    };
    User.init({
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        accountType: {
            type: DataTypes.ENUM(['TENANT', 'LANDLORD'])
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
