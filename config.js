//This file is maintained application environment configurations
const mode = 'dev'; //dev

const configs = {
    dev: {
        db: {
            host: 'localhost',
            user: 'root',
            password: '',
            db: 'parker_inc'
        }
    }
}

exports.configs = configs;
exports.mode = mode;