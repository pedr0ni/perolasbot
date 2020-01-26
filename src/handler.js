import database from './database/database'

import slack from './api/slack'

let bot = null

const commands = [
    {
        name: 'perola',
        execute: (args = null, event = null) => {
            if (args.length < 1) {
                let user = slack.getUserById(event.user)
                console.log(user)
                bot.sendMessageToUser('@' + event.user, 'Usage: !perola "you text here" @user or !perola @user "your text here"')
                return
            }
            let text = args.join(' ').toString()
            let user = text.substring(text.indexOf('<') + 2, text.indexOf('>')).toUpperCase()
            if (user == null || user.length == 0 || user == '"') {
                bot.sendMessage('You need to tag a user to send a perola')
                return
            }
            let perola = text.substring(text.indexOf('"') + 1, text.lastIndexOf('"'))
            if (perola == null || perola.length == 0) {
                bot.sendMessage('You text need to be inside double quotes like: !perola "your text here" @user or !perola @user "your text here"')
                return
            }
            console.log(event)
            bot.sendMessage(`*_"${perola}"_*, (${user}, ${new Date().getFullYear()})`)
        }
    },
    {
        name: 'database',
        execute: (args = null, event = null) => {
            if (args.length < 1) {
                bot.sendMessage('Usage: !database [reset]')
                return
            }
            if (args[0] == 'reset') {
                bot.sendMessage('Database reseted!')
                database.resetDatabase()
            } else {
                bot.sendMessage('Argument not found: Use !database [reset]')
            }
        }
    },
    {
        name: 'rank',
    }
]

export class Handler {

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

    executeCommand(event) {
        let args = this._text.indexOf(' ') != -1  ? this._text.toLowerCase().substring(this._text.indexOf(' ') + 1).split(' ') : []
        this.getCommand().execute(args, event)
    }

    initBot() {
        bot = require('./index').default
    }

}