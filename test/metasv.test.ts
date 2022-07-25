import {Mnemonic} from "../dist/bsv";
import {API_NET, API_TARGET, Wallet} from "../dist";

describe("metasvTest", ()=>{
    it("test mnemonic", async ()=>{
        const seed = process.env.MNEMONIC;
        let mnemonic = Mnemonic.fromString(seed);
        console.log(mnemonic.toString())
        let privateKey = mnemonic.toHDPrivateKey("", "mainnet").deriveChild("m/44'/145'/0'");
        console.log(privateKey.hdPublicKey.toString())
        let poolKey = privateKey.deriveChild(0).deriveChild(0);

        let testKey = privateKey.deriveChild(0).deriveChild(1);

        let wallet = new Wallet(poolKey.privateKey.toWIF(), API_NET.MAIN, 0.25, API_TARGET.METASV);
        const balance = await wallet.getBalance();
        console.log(balance)

        let secondAddress = testKey.privateKey.toAddress("mainnet").toString();
        console.log("send to second address %s", secondAddress)
        let txComposer = await wallet.send(secondAddress, 100000000);
        console.log("send successful %s", txComposer.tx.id)


    });
})
