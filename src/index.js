import Slackbot from 'slackbots'
import {Handler} from './handler'

import { slackToken, channelName } from './config.json'
import database from './database/database'

console.log('[BOT] Hello CI&T Support Team, bot initializing...')

const bot = new Slackbot({
    token: slackToken,
    name: 'perolasbot'
})

bot.on('start', () => {
    console.log('[BOT] bot sucessfuly initialized')
    new Handler().initBot()
})

bot.on('message', data => {
    if (data.type != 'message') return

    let messageHandler = new Handler(data.text)
    
    if (!messageHandler.isCommand()) return

    messageHandler.executeCommand(data)

    console.log(`[BOT] command executed: ${messageHandler.getCommandName()}`)
})

bot.sendMessage = (text) => {
    bot.postMessageToChannel(channelName, text)
}

bot.sendMessageToUser = (user, text) => {
    bot.postMessageToUser(user, text)
}

export default bot