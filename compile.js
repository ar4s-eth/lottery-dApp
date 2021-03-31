const path = require('path');
const fs = require('fs');
const solc = require ('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
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

const output = JSON.parse(solc.compile(JSON.stringify(input)));
//console.log(output.contracts['Inbox.sol']['Inbox'].abi);
//console.log(output.contracts['Inbox.sol']['Inbox']['evm'].bytecode); to get bytecode
module.exports = output.contracts['Lottery.sol']['Lottery'];

// const source = fs.readFileSync(inboxPath, 'utf8');

// module.exports = solc.compile(source, 1).contracts[':Inbox'];