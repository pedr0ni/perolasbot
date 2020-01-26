import fs from 'fs'

let dataset = []

const file = './database.json'

export default {
    
    loadData() {
        console.log('[DATA] Initializing databse')
        dataset = JSON.parse(fs.readFileSync(file))
        console.log('[DATA] database loaded!')
    },

    saveData() {
        fs.writeFileSync(file, JSON.stringify(dataset))
        console.log('[DATA] database saved!')
    },

    resetDatabase() {
        dataset = []
        fs.writeFileSync(file, JSON.stringify(dataset));
        console.log('[DATA] database restored')
    },

    addObject(obj) {
        dataset.push(obj)
    }

}