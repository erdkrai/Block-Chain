const SHA256 = require('crypto-js/sha256');

class Block{
    constructor (index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
     return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined: " + this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.creatGenesisBlock()];
        this.difficulty = 5;
    }

    creatGenesisBlock(){
        return new Block(0, "22/02/2019", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }

}

let savjeeCoin = new BlockChain();

console.log('Mining Block 1...');
savjeeCoin.addBlock(new Block(1, "23/02/2019", { amount: 10000 }));

console.log('Mining Block 2...');
savjeeCoin.addBlock(new Block(2, "25/02/2019", { amount: 13000 }));

console.log('Mining Block 3...');
savjeeCoin.addBlock(new Block(3, "28/02/2019", { amount: 8000 }));

//console.log('Is the Chain Valid ? ' + savjeeCoin.isChainValid());

//savjeeCoin.chain[1].data = { amount: 50000 };
//savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();
//console.log('Is the Chain Valid ? ' + savjeeCoin.isChainValid());


//console.log(JSON.stringify(savjeeCoin, null, 4));