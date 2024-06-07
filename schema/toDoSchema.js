module.exports = (sequelize, Sequelize) => {
    const TODO = sequelize.define("users_todo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        dueDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        reminderTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
    });

    return TODO;
};