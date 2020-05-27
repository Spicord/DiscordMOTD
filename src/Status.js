const server = require('server')
const Game = net.dv8tion.jda.core.entities.Game
const GameType = Game.GameType

function Status(type, text) {
    this.type = type
    this.text = text
}

Status.prototype = {
    clone: function clone() {
        return new Status(this.type, this.text)
    },
    build: function build() {
        return Game.of(GameType.valueOf(this.type), buildText(this.text))
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
        var x = Math.floor((Math.random() * plen))
        return players[x]
    }
    return 'Sheidy' // when there are no players online... im in
}

function jstring(str) {
    return new java.lang.String(str)
}

module.exports = Status