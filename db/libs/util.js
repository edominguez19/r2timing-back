'use strict'

function getDateFormatToDB (date) {
  const dateResult = date ? new Date(date) : new Date()
  return `${dateResult.toLocaleString()}.${dateResult.getMilliseconds()}`
}

module.exports = { getDateFormatToDB }
