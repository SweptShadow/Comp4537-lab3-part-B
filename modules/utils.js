// utility mod to get current date & time w/ greeting message
const messages = require('../lang/en/en.json');

class Utils {

    getDate(name) {

        const safeName = name && String(name).trim() ? String(name).trim() : 'Guest';
        const now = new Date();
        return `${messages.greeting.replace("%1", safeName)} ${now}`;
    
    }
    
}

module.exports = Utils;
