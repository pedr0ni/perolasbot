const Slackbot = require('slackbots')
const Handler = require('./handler')

const config = require('./config.json')
const database = require('./database/database')

console.log('[BOT] Hello CI&T Support Team, bot initializing...')

const bot = new Slackbot({
    token: config.slackToken,
    name: 'perolasbot'
})

bot.on('start', () => {
    console.log('[BOT] bot sucessfuly initialized')
})

bot.on('message', data => {
    if (data.type != 'message') return

    let messageHandler = new Handler(data.text)
    
    if (!messageHandler.isCommand()) return

    messageHandler.executeCommand(sendMessage)

    console.log(`[BOT] command executed: ${messageHandler.getCommandName()}`)
})

let sendMessage = (text) => {
    bot.postMessageToChannel(config.channelName, text)
}