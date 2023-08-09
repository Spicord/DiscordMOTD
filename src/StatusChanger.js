var Status = require('./Status')

function StatusChanger(bot) {
    this.bot = bot
}

StatusChanger.prototype = {
    apply: function(status) {
        var presence = this.bot.getPresence();

        if (status.playing) {
            presence.setPlaying(status.build());
        }
        if (status.listening) {
            presence.setListening(status.build());
        }
        if (status.watching) {
            presence.setWatching(status.build());
        }

    },
    build: function(obj) {
        var arr = []
        var playing = obj.playing
        var listening = obj.listening
        var watching = obj.watching

        if (playing) {
            for (var i = 0; i < playing.length; i++) {
                var text = playing[i];
                var s = new Status(text);
                s.playing = true;
                arr.push(s);
            }
        }

        if (listening) {
            for (var i = 0; i < listening.length; i++) {
                var text = listening[i];
                var s = new Status(text);
                s.listening = true;
                arr.push(s);
            }
        }

        if (watching) {
            for (var i = 0; i < watching.length; i++) {
                var text = watching[i];
                var s = new Status(text);
                s.watching = true;
                arr.push(s);
            }
        }

        return arr;
    }
}

module.exports = StatusChanger
