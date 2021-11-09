'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Apartment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'owner', targetKey: 'uuid', constraints: false
            })
            this.belongsTo(models.Room, {
                targetKey: 'apartment', foreignKey: "uuid", constraints: false
            })
            // this.belongsTo(models.Favorite, {
            //     foreignKey: 'uuid', targetKey: 'apartment', constraints: false
            // })
        }
    };
    Apartment.init({
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        owner: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false
        },
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        postCode: DataTypes.STRING,
        lat: DataTypes.FLOAT,
        lng: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Apartment',
    });
    return Apartment;
};
