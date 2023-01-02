//This file contains all the persisting related logic
const dbConnect = require('../db-connect');

//Persisting employee details as a transaction
const createEmployee= (employee) => {
    return new Promise((resolve, reject) => {
        dbConnect.getConnection().then((conn) => {
            conn.beginTransaction((transactionErr) => {
                if (transactionErr) {
                    console.log('DB Transaction exception T1- ' + transactionErr);
                    resolve(transactionErr);
                } else {
                    conn.query("INSERT INTO employee (name, email, profile_picture, created_at, modified_at, status) VALUES (?, ?, ?, ?, ?, ?)", [employee.name, employee.email, employee.profile_picture, employee.created_at, employee.modified_at, employee.status], (err, results, fields) => {
                        if (err) {
                            console.log('DB Query exception - Q1' + err);
                            resolve(err);
                        } else {
                            conn.commit((commitError) => {
                                if (commitError) {
                                    console.log('DB Commit exception - C1' + err);
                                    conn.rollback(() => {})
                                    resolve(err);
                                } else {
                                    resolve(results);
                                }
                            });
                        }
                    });
                }
            })

            conn.release();
        });
    })
}


exports.createEmployee = createEmployee;