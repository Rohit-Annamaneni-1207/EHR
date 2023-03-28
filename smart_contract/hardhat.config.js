// https://eth-goerli.g.alchemy.com/v2/xToKjuoQGCXp-Xfuzd9Ss49UsnubKFdJ

require("@nomiclabs/hardhat-waffle")

module.exports = {
  solidity: '0.8.0',
  networks:{
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/kOPCXXBlRsIqJVAou2-8fjxo5iNcc_59",
      accounts: [ 'ebdd601a7c3377a47b79f55cda4c6be8480ac80283e11375a01b6ac76e8b8517' ]
    }
  }
}