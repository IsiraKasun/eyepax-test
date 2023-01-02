// This file contains database connection details
const mysql = require('mysql');
const appConfig = require('./config')

let pool = mysql.createPool({
    connectionLimit: 100,
    host: appConfig.configs[appConfig.mode].db.host,
    user: appConfig.configs[appConfig.mode].db.user,
    password: appConfig.configs[appConfig.mode].db.password,
    database: appConfig.configs[appConfig.mode].db.db
});

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('DB connection exception ' + err);
                reject(err);
            }

            if (connection) {
                resolve(connection);
            }
        });
    });
}

exports.getConnection = getConnection;


