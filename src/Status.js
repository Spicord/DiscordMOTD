const server = require('server')

function Status(text) {
    this.text = text
}

Status.prototype = {
    build: function build() {
        return buildText(this.text)
    }
}

function buildText(text) {
    return text
        .replace('{online_count}', server.getOnlineCount())
        .replace('{online_max}', server.getPlayerLimit())
        .replace('{random_player}', getRandomPlayer())
}

function getRandomPlayer() {
    var players = server.getOnlinePlayers()
    var len = players.length
    if (len !== 0) {
        var x = Math.floor((Math.random() * len))
        return players[x]
    }
    return 'Sheidy' // when there are no players online... im in
}

module.exports = Status
