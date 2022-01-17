/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database','username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const dbConnect = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch(error) {
        console.log('Unable to connect to the database:', error);
    }
}

exports.dbConnect = dbConnect();