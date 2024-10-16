const yaml      = require('yaml')
const BaseAddon = require('base-addon')
const path      = require('path')
const worker    = require('worker')

const configPath = path.join(__data, 'config.yml')
const config     = yaml.load(configPath)
const conf       = JSON.parse(config.toString())

var interval = conf['status-interval']

//var print = (a) => java.lang.System.out.println(a)

const addon = new BaseAddon()
const StatusChanger = require('./StatusChanger');

var status = {}
var statuses = []

let theBot;

addon.on('ready', bot => {
    theBot = bot;
    status = new StatusChanger(bot);
    statuses = status.build({
        playing: conf.playing,
        listening: conf.listening,
        watching: conf.watching,
        streaming: conf.streaming,
        competing: conf.competing,
        custom: conf.custom
    });
    start();
})

var currentStatus = 0

function next() {
    if (conf.status == "dnd") {
        theBot.getPresence().setDoNotDisturb();
    }
    if (conf.status == "online") {
        theBot.getPresence().setOnline();
    }
    if (conf.status == "idle") {
        theBot.getPresence().setIdle();
    }
    if (conf.status == "invisible") {
        theBot.getPresence().setInvisible();
    }

    if (currentStatus < statuses.length) {
        status.apply(statuses[currentStatus])
        currentStatus++
    } else {
        currentStatus = 0
    }
}

function start() {
    next()
    worker.setInterval(next, interval * 1000);
}

module.exports = addon
