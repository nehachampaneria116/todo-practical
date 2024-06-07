module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        username: {
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    });

    return Users;
};