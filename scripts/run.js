const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory(
		'WavePortal'
	);
	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther('0.1'),
	});
	await waveContract.deployed();
	console.log('Contract addy: ', waveContract.address);
	console.log('Contract deployed by: ', owner.address);

	/*
	 * Get Contract balance
	 */
	let contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address
	);
	console.log(
		'Contract balance: ',
		hre.ethers.utils.formatEther(contractBalance)
	);

	let waveCount;
	waveCount = await waveContract.getTotalWaves();
	console.log(waveCount.toNumber());

	/*
	 * Send Wave
	 */
	const waveTxn1 = await waveContract.wave('This is wave #1');
	await waveTxn1.wait();

	const waveTxn2 = await waveContract.wave('This is wave #2');
	await waveTxn2.wait();

	/*
	 * Get Contract balance to see what happened
	 */
	contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address
	);
	console.log(
		'Contract balance:',
		hre.ethers.utils.formatEther(contractBalance)
	);

	let allWaves = await waveContract.getAllWaves();
	// console.log(allWaves);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
