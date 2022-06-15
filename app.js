const axios  = require('axios')
const bitcore =  require('bitcore-lib')
const sendBitcoin = async(sender, receipients, amount) => {
	
	const network = 'BTC'
	const privateKey =
		"1125a1005c06216844c618f16452e18b927333413967b368c9defa13604944f4";
	const source = sender

	const amount_in_satoshi = amount * 100000000
	let fee = 0;
	let inputcount = 0;
	let outputcount = 0;

	const unspent_output = await axios.get(
		`https://chain.so/api/v2/get_tx_unspent/${network}/${sender}`
	);
	const transaction = new bitcore.Transaction()
	let totalamountavailable = 0;
	let inputs = [];
	unspent_output.data.data.txs.forEach(tx => {
		let utxo = {}
		utxo.satoshis = Math.floor(Number(tx.value) * 100000000);
		utxo.script = tx.script_hex
		utxo.address = unspent_output.data.data.address;
		utxo.txId = tx.txid;
		utxo.outputIndex = tx.output_no
		totalamountavailable += utxo.satoshis
		inputcount += 1
		inputs.push(utxo)
	})
	console.log(inputs);

	const transactionSize = inputcount * 146 * outputcount * 34 + 10 - inputcount;
	fee = transactionSize * 20
	
	if (totalamountavailable - amount_in_satoshi - fee < 0) {
		throw new Error('Balance is too low for this transaction')
	}

	transaction.from(inputs)

	transaction.to(receipients, amount_in_satoshi)
	transaction.change(sender)
	transaction.fee(fee * 20)
	transaction.sign(privateKey)
	const serializedTransaction = transaction.serialize()

	const res = await axios({
		method: "POST",
		url: `https://chain.so/api/v2/send_tx/${network}`,
		data: {
			tx_hex: serializedTransaction,
		}
	});

	console.log(res);
}

sendBitcoin(
	"19qNErr9omZmnNrKW6V4Di9zFAXKmgUCDm",
	"16rP72U1MmQqKHkSxkh6pds3JXnHGmT4du",
	0.00001638
);

// const getBalance = async ()=>{
// const response = await axios.get(
// 	"https://chain.so/api/v2/get_address_balance/BTC/19qNErr9omZmnNrKW6V4Di9zFAXKmgUCDm/500"
// 	);
	
// 	console.log(response);
// };
// getBalance()