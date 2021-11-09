'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Favorite.init({
        apartment: {
            type: DataTypes.UUID,
            references: {
                model: 'Apartments',
                key: 'uuid'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false
        },
        user: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Favorite',
    });
    return Favorite;
};
