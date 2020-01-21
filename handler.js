const database = require('./database/database')

const commands = [
    {
        name: 'perola',
        execute: (args = null, context = null) => {
            let perola = args.join(' ').toString()
            
        }
    },
    {
        name: 'database',
        execute: (args = null, context = null) => {
            if (args.length < 1) {
                context('Usage: !database [reset]')
                return
            }
            if (args[0] == 'reset') {
                context('Database reseted!')
                database.resetDatabase()
            } else {
                context('Argument not found: Use !database [reset]')
            }
        }
    },
    {
        name: 'rank',
    }
]

module.exports = class Handler {

    _text = ''

    constructor(text) {
        this._text = text
    }

    isCommand() {
        return this._text.startsWith('!')
    }

    isCommandValid() {
        return this.isCommand() && this.getCommand() != null
    }

    getCommandName() {
        return this._text.substring(1, this._text.indexOf(' ') != -1 ? this._text.indexOf(' ') : this._text.length).toLowerCase()
    }

    getCommand() {
        return commands.filter(c => c.name == this.getCommandName())[0]
    }

    executeCommand(context) {
        let args = this._text.indexOf(' ') != -1  ? this._text.toLowerCase().substring(this._text.indexOf(' ') + 1).split(' ') : []
        this.getCommand().execute(args, context)
    }

}