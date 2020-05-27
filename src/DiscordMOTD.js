const yaml      = require('yaml')
const BaseAddon = require('base-addon')
const path      = require('path')
const worker    = require('worker')

const configPath = path.join(__data, 'config.yml')
const config     = yaml.load(configPath)
const conf       = JSON.parse(config.toString())

var playing   = conf.playing
var listening = conf.listening
var watching  = conf.watching

var interval = conf['status-interval']

//var print = (a) => java.lang.System.out.println(a)

const addon = new BaseAddon()
const StatusChanger = require('./StatusChanger');

var status = {}
var statuses = []

addon.on('ready', bot => {
    status = StatusChanger(bot.getJda())
    statuses = status.build({
        playing: playing,
        listening: listening,
        watching: watching
    })
    start()
})

var currentStatus = 0

function next() {
    if (currentStatus < statuses.length) {
        status.apply(statuses[currentStatus].build())
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