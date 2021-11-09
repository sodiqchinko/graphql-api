'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Rooms', {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            apartment: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'Apartments',
                    },
                    key: 'uuid'
                },
                allowNull: false

            },
            name: {
                type: Sequelize.STRING
            },
            size: {
                type: Sequelize.INTEGER
            },
            bathrooms: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.DOUBLE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Rooms');
    }
};
