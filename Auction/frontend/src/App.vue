<template>
  <div id="app">
    <button class="primaryButton" @click="connectWallet">Connect Wallet</button>
    <button class="primaryButton" @click="sendEth">Send ETH</button>
    <button class="primaryButton" @click="getInfo">Get some info</button>
    <button class="primaryButton" @click="readContract">Read Contract</button>
    <button class="primaryButton" @click="writeContract">Write Contract</button>
  </div>
</template>

<script>
import { ethers } from "ethers";

export default {
  name: "App",
  data() {
    return {
      currentAccount: null,
      account1: "0xf649b827203086cA5eeE197aAA828C6423416C07",
      deedAddress: "0xB28f52A9c5EaAbe9C3b3d3c49D23dC71859CfC5B",
      deedAbi: [
        "function registerDeed(uint256 _tokenId, string memory _uri) public",
        "function addDeedMetadata(uint256 _tokenId, string memory _uri) public returns (bool)",
        "event DeedRegistered(address _by, uint256 _tokenId)",
        "function name() public view virtual override returns (string memory)",
        "function symbol() public view virtual override returns (string memory)",
        "function balanceOf(address owner) public view virtual override returns (uint256)",
        "function ownerOf(uint256 tokenId) public view virtual override returns (address)",
        "function tokenURI(uint256 tokenId) public view virtual override returns (string memory)",
      ],
    };
  },
  methods: {
    connectWallet: async function () {
      try {
        //const { ethereum } = window;
        if (!window.ethereum) {
          alert("you need metamask to use Dapp");
          return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log("Connected", accounts[0]);
        this.currentAccount = accounts[0];
      } catch (error) {
        console.log("reject your connection request", error);
      }
    },
    sendEth: async function () {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const tx = signer.sendTransaction({
          to: this.account1,
          value: ethers.utils.parseEther("0.1"),
        });
        console.log(tx);
      } catch (error) {
        console.log("failed to send transaction", error);
      }
    },
    getInfo: async function () {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const blockNumber = await provider.getBlockNumber();
        const balance = await provider.getBalance(this.currentAccount);
        console.log("blockNumber", blockNumber);
        console.log("balance", ethers.utils.formatEther(balance));
      } catch (error) {
        console.log("failed to get info", error);
      }
    },
    readContract: async function () {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const deedContract = await new ethers.Contract(
          this.deedAddress,
          this.deedAbi,
          provider
        );
        const name = await deedContract.name();
        const symbol = await deedContract.symbol();
        const balance = await deedContract.balanceOf(this.currentAccount);
        console.log("name", name);
        console.log("symbol", symbol);
        console.log("balance", ethers.utils.formatEther(balance));
      } catch (error) {
        console.log("failed contract", error);
      }
    },
    writeContract: async function () {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const deedContract = await new ethers.Contract(
          this.deedAddress,
          this.deedAbi,
          provider
        );
        const deedWithSigner = deedContract.connect(signer);
        const tx = await deedWithSigner.registerDeed("002", "https://002.com/");
        console.log(tx);
      } catch (error) {
        console.log("failed to send transaction", error);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
