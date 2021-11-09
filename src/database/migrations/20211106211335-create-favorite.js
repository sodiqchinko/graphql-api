'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Favorites', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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
            user: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'Users',
                    },
                    key: 'uuid'
                },
                allowNull: false
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
        await queryInterface.dropTable('Favorites');
    }
};
