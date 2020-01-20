const commands = [
    {
        name: 'perola',
        execute: (params) => {

        }
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
        return this._text.substring(1, this._text.indexOf(' ')).toLowerCase()
    }

    getCommand() {
        return commands.filter(c => c.name == this.getCommandName())[0]
    }

    executeCommand() {
        
    }

}