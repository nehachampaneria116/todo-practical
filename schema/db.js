const Sequelize = require("sequelize");
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize(process.env.db, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: process.env.dialect,
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        collate: 'utf8_general_ci'
    },
    logging: false,
    freezeTableName: true
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.', process.env.db);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


sequelize.sync()

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userSchema')(sequelize, Sequelize)
db.todo = require('./toDoSchema')(sequelize, Sequelize)


/**
 * users - to do 
 */
db.users.hasMany(db.todo, {
    as: 'userToDo',
    foreignKey: 'userId',
    sourceKey: 'id',
});

db.todo.belongsTo(db.users, {
    as: 'users',
    foreignKey: 'userId',
    sourceKey: 'id',
});

module.exports = db