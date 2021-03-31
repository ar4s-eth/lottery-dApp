require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const abi = require('./compile').abi;
const bytecode = require('./compile').evm.bytecode.object;

const provider = new HDWalletProvider(process.env.SEED_PHRASE, process.env.INFURA_API_KEY);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  // let limit = await web3.eth.getGasPrice().then(x => { return x })

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: ['Hello World'] })
    .send({ gas: 5000000, gasPrice: 5000000000, from: accounts[0] });
  
  return console.log('Contract deployed to: ', result.options.address);
};

deploy();