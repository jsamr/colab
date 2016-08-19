import { ensuresArg } from './ensure'

function twoDigit (int) {
  if (int > 9) return `${int}`
  else return `0${int}`
}

function fromMinSec (mins, secs) {
  ensuresArg('fromMinSec, arg `mins`', mins, Number)
  ensuresArg('fromMinSec, arg `secs`', secs, Number)
  return mins + (secs / 60)
}

const raw = {
  readable (value, sep1 = '′', sep2 = '″') {
    let min = Math.floor(value)
    let sec = Math.floor((value - min) * 60)
    return twoDigit(min) + sep1 + twoDigit(sec) + sep2
  },
  fromMinSec,
  fromSeconds (seconds) { return seconds / 60 },
  minutes (rawMinutes) {
    return Math.floor(rawMinutes)
  },
  parse: (function () {
    let regex = /^([0-9]*)(?:m)(?:\W*)([0-5]?[0-9])(?:s)$/i
    let self = function (rawString) {
      ensuresArg('parse, arg `rawString`', rawString, String)
      const matched = self.match(rawString)
      if (!matched) throw new TypeError('Wrong date format for ' + rawString)
      return fromMinSec(parseInt(matched[ 1 ], 10), parseInt(matched[ 2 ], 10))
    }
    self.test = rawString => regex.test(rawString)
    self.match = rawString => regex.exec(rawString)
    return self
  })()
}

export {
  raw,
  twoDigit
}
