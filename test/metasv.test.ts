import {Mnemonic} from "../dist/bsv";
import {API_NET, API_TARGET, Wallet} from "../dist";

describe("metasvTest", ()=>{
    it("test mnemonic", async ()=>{
        const seed = process.env.MNEMONIC;
        let mnemonic = Mnemonic.fromString(seed);
        console.log(mnemonic.toString())
        let privateKey = mnemonic.toHDPrivateKey("", API_NET.TEST).deriveChild("m/44'/145'/0'");
        console.log(privateKey.hdPublicKey.toString())
        let poolKey = privateKey.deriveChild(0).deriveChild(0);
        console.log(poolKey.privateKey.toAddress(API_NET.TEST).toString())

        let testKey = privateKey.deriveChild(0).deriveChild(1);

        let wallet = new Wallet(poolKey.privateKey.toWIF(), API_NET.TEST, 0.25, API_TARGET.METASV);
        const balance = await wallet.getBalance();
        console.log(balance)

        let secondAddress = testKey.privateKey.toAddress("testnet").toString();
        console.log("send to second address %s", secondAddress)
        let txComposer = await wallet.send(secondAddress, 10000000).catch(e=>{
            console.log(e)
        });
        console.log("send successful %s", txComposer)


    });
})
