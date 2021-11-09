'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Apartment, {
                foreignKey: 'apartment', targetKey: 'uuid', constraints: false
            })

        }
    };
    Room.init({
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
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
        name: DataTypes.STRING,
        size: DataTypes.INTEGER,
        bathrooms: DataTypes.INTEGER,
        price: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'Room',
    });
    return Room;
};
