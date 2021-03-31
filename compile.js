const path = require('path');
const fs = require('fs');
const solc = require ('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

const input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: fs.readFileSync(lotteryPath, 'utf8')
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'];

for (let contract in output) {
  module.exports = output[contract];
}