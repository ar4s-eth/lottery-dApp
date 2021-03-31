const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const initialString = 'Hello World'

beforeEach(async () => {
  // Get a list of accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // a contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [initialString] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('Should deploy a contract', () => {
    assert.ok(inbox.options.address);
  });

  it(`Should have a default message ${initialString}`, async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, initialString);
  });

  it('Should change the message', async () => {
    await inbox.methods.setMessage('Peaches').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'Peaches');
  })
});
