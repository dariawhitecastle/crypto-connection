const socket = require('socket.io')()
const axios = require('axios')

let coins = []
const coinMarketCapApi = ['https://api.coinmarketcap.com/v2/ticker/74/?convert=BTC',
'https://api.coinmarketcap.com/v2/ticker/2/?convert=BTC',
'https://api.coinmarketcap.com/v2/ticker/328/?convert=BTC']


const promises = coinMarketCapApi.map(api => axios.get(api, (err, response, body) => JSON.parse(body)).then(response => response.data))


Promise.all(promises).then(values => {return coins = values.map(value => value.data )})

socket.on('connection', (messageEmitter) => { // my socket app has started

  // 2) make connection with messageEmitter
  messageEmitter.on('getTickerPrices', (interval) => {

    setInterval(() => {socket.emit('connectionReceived', coins)}, interval)
  })

  messageEmitter.on('getIntervalPrices', (interval) => {
    setInterval(() => {socket.emit('intervalConnectionReceived', coins)}, interval)
  })

})





socket.listen(8000)

console.log('listening on port 8000');
