'use strict'
const { map } = require('lodash')

function separatorResult (results) {
  let process = null

  if (Array.isArray(results)) {
    process = []
    results.map(value => {
      process.push(separatorResult(value))
    })
  } else if (typeof results === 'object') {
    process = {}
    Object.keys(results).map((key) => {
      let processKey = key.split('.')
      if (processKey.length === 2) {
        if (!process[processKey[0]])
          process[processKey[0]] = {}
        process[processKey[0]][processKey[1]] = results[key]
      } else {
        process[processKey[0]] = results[key]
      }
    })
  }
  return process
}

function strToJson (str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

function arrayToJson (array, key, value, group) {
  let result = {}
  map(array, function (row) {
    if (group) {
      result[row[group]] = result[row[group]] ? result[row[group]] : {}
      result[row[group]][row[key]] = row[value]
    } else {
      result[row[key]] = row[value]
    }
  })
  return result
}

function secondsToString (seconds) {
  let hour = Math.floor(seconds / 3600)
  hour = (hour < 10) ? '0' + hour : hour
  let minute = Math.floor((seconds / 60) % 60)
  minute = (minute < 10) ? '0' + minute : minute
  let second = seconds % 60
  second = (second < 10) ? '0' + second : second
  return hour + ':' + minute + ':' + second
}

function unixTime(values){

  let date = new Date(values * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();

   return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

module.exports = {
  separatorResult,
  strToJson,
  arrayToJson,
  secondsToString,
  unixTime
}
