require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const CampaignFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    process.env.MNEMONIC, process.env.INFURA_URL
);


const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(CampaignFactory.interface))
        .deploy({ data: CampaignFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};


deploy();

// DEPLOYED TO: 0xBDBC18DcA71d5A1c3E0CdcBd6dD912333920cC56
