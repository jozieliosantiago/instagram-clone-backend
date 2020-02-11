const mongoose = require('mongoose');
const db;

module.exports = () => {
    if(!db) {
        db = mongoose.connec('mongodb://localhost/teste')
    }
    return db;
}