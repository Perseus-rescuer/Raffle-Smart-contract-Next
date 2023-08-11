const { network, ethers } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const FUND_AMOUNT = ethers.parseEther("1") // 1 Ether, or 1e18 (10^18) Wei

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address, subscriptionId, vrfCoordinatorV2Mock

    if (chainId == 31337) {
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")

        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.runner.address

        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transactionResponse.wait()
        subscriptionId = transactionReceipt.logs[0].args.subId

        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const arguments = [
        vrfCoordinatorV2Address,
        networkConfig[chainId]["raffleEntranceFee"],
        networkConfig[chainId]["gasLane"],
        subscriptionId,
        networkConfig[chainId]["callbackGasLimit"],
        networkConfig[chainId]["keepersUpdateInterval"],
    ]
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(raffle.address, arguments)
    }

    console.log("_________________________________________________")
}

module.exports.tags = ["all", "raffle"]

// const { network, ethers } = require("hardhat")
// const { developmentChains, networkConfig } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")

// const FUND_AMOUNT = ethers.parseEther("1")

// module.exports = async function ({ getNamedAccounts, deployments }) {
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     let vrfCoordinatorV2Address, subscriptionId
//     const chainId = network.config.chainId

//     if (developmentChains.includes(network.name)) {
//         vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
//         vrfCoordinatorV2Address = vrfCoordinatorV2Mock.getAddress
//         const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
//         const transactionReceipt = await transactionResponse.wait()
//         subscriptionId = transactionReceipt.events[0].args.subId

//         await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT)
//     } else {
//         vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
//         subscriptionId = networkConfig[chainId]["subscriptionId"]
//     }

//     const arguments = [
//         vrfCoordinatorV2Address,
//         subscriptionId,
//         networkConfig[chainId]["gasLane"],
//         networkConfig[chainId]["keepersUpdateInterval"],
//         networkConfig[chainId]["raffleEntranceFee"],
//         networkConfig[chainId]["callbackGasLimit"],
//     ]

//     const raffle = await deploy("Raffle", {
//         from: deployer,
//         args: [],
//         log: true,
//         waitConfirmations: network.config.blockConfirmations || 1,
//     })

//     // Verify the deployment
//     if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
//         log("Verifying...")
//         await verify(raffle.address, arguments)
//     }
// }

// module.exports.tags = ["all", "raffle"]
