const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index; 
        this.timestamp = timestamp; 
        this.data = data; 
        this.previousHash = previousHash; 
        this.hash = this.calculateHash(); 
    }

    // Hàm tính toán mã băm của khối
    calculateHash() {
        return crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Tạo blockchain với khối gốc (Genesis Block)
    }

    // Tạo khối gốc đầu tiên
    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), "Khối khởi tạo", "0");
    }

    // Lấy khối mới nhất trong chuỗi
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Thêm một khối mới vào chuỗi
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // Liên kết với khối trước đó
        newBlock.hash = newBlock.calculateHash(); // Tính mã băm mới
        this.chain.push(newBlock);
    }

    // Kiểm tra tính hợp lệ của blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const websiteBlockchain = new Blockchain();

websiteBlockchain.addBlock(new Block(1, new Date().toISOString(), { change: "Cập nhật màu tiêu đề" }));
websiteBlockchain.addBlock(new Block(2, new Date().toISOString(), { change: "Thêm biểu mẫu liên hệ" }));

console.log(JSON.stringify(websiteBlockchain, null, 4));
console.log("Chuỗi khối có hợp lệ không?", websiteBlockchain.isChainValid());
