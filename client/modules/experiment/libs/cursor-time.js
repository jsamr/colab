import { raw } from '/imports/time'

function readableRelativeTime (cursor) {
  return raw.readable(cursor)
}

function readableAbsoluteTime (cursor, begin) {
  const newDate = new Date(begin)
  newDate.setMinutes(newDate.getMinutes() + cursor)
  newDate.setSeconds(newDate.getSeconds() + (cursor - Math.floor(cursor)) * 60)
  return newDate.toLocaleTimeString()
}

export {
  readableAbsoluteTime,
  readableRelativeTime
}
