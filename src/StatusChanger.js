var Status = require('./Status')

function StatusChanger(presence) {
    this.presence = presence
}

StatusChanger.prototype = {
    apply: function(game) {
        this.presence.setActivity(game)
    },
    build: function(obj) {
        var arr = []
        var playing = obj.playing
        var listening = obj.listening
        var watching = obj.watching

        if (playing) {
            for (var i = 0; i < playing.length; i++) {
                var text = playing[i];
                arr.push(new Status('PLAYING', text))
            }
        }

        if (listening) {
            for (var i = 0; i < listening.length; i++) {
                var text = listening[i];
                arr.push(new Status('LISTENING', text))
            }
        }

        if (watching) {
            for (var i = 0; i < watching.length; i++) {
                var text = watching[i];
                arr.push(new Status('WATCHING', text))
            }
        }

        return arr;
    }
}

module.exports = function(jda) {
    return new StatusChanger(jda.getPresence())
}
