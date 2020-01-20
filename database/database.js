const fs = require('fs')

const dataset = []

module.exports = {
    
    loadData() {
        console.log('[DATA] Initializing databse')
        dataset = JSON.parse(fs.readFileSync('./database.json'))
        console.log('[DATA] database loaded!')
    },

    saveData() {
        fs.writeFileSync('./database.json', JSON.stringify(dataset))
        console.log('[DATA] database saved!')
    },

    addObject(obj) {
        dataset.push(obj)
    }

}