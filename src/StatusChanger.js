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
        if (status.streaming) {
            presence.setStreaming(status.build());
        }
        if (status.competing) {
            presence.setCompeting(status.build());
        }
        if (status.custom) {
            presence.setCustom(status.build());
        }

    },
    build: function(obj) {
        var arr = [];

        function registerStatuses(statusesArr, type) {
            if (statusesArr) {
                for (var i = 0; i < statusesArr.length; i++) {
                    var text = statusesArr[i];
                    var s = new Status(text);
                    s[type] = true;
                    arr.push(s);
                }
            }
        }

        registerStatuses(obj.playing, 'playing');
        registerStatuses(obj.listening, 'listening');
        registerStatuses(obj.watching, 'watching');
        registerStatuses(obj.streaming, 'streaming');
        registerStatuses(obj.competing, 'competing');
        registerStatuses(obj.custom, 'custom');

        return arr;
    }
}

module.exports = StatusChanger
