import { contractAddresses, abi } from "../constants";
import styled from "styled-components";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";

export const LotteryEntrance = () => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();

  // These get re-rendered every time due to our connect button!
  const chainId = parseInt(chainIdHex);
  // console.log(`ChainId is ${chainId}`);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  // State hooks

  const [entranceFee, setEntranceFee] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const dispatch = useNotification();

  const {
    runContractFunction: enterRaffle,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: {},
  });

  /* View Functions */

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getPlayersNumber } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUIValues() {
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numPlayersFromCall = (await getPlayersNumber()).toString();
    const recentWinnerFromCall = await getRecentWinner();
    setEntranceFee(entranceFeeFromCall);
    setNumberOfPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled]);

  // An example filter for listening for events, we will learn more on this next Front end lesson
  // const filter = {
  //     address: raffleAddress,
  //     topics: [
  //         // the name of the event, parnetheses containing the data type of each event, no spaces
  //         utils.id("RaffleEnter(address)"),
  //     ],
  // }

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      updateUIValues();
      handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <RaffleContainer>
        <h1 className="py-4 px-4 font-bold text-3xl">Ethereum Lottery</h1>
        {raffleAddress ? (
          <>
            <EntranceFee>
              Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
            </EntranceFee>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
              onClick={async () =>
                await enterRaffle({
                  // onComplete:
                  // onError:
                  onSuccess: handleSuccess,
                  onError: (error) => console.log(error),
                })
              }
              disabled={isLoading || isFetching}
            >
              {isLoading || isFetching ? (
                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
              ) : (
                "Enter Raffle"
              )}
            </button>

            <h3>
              Current Player <span>{numberOfPlayers}</span> participated
            </h3>
            <h3>
              Previous Winner:
              <br />
              <span>
                {recentWinner.slice(0, 6)}...
                {recentWinner.slice(-7)}
              </span>
            </h3>
          </>
        ) : (
          <div>Please connect to a supported chain </div>
        )}
      </RaffleContainer>
    </>
  );
};

const RaffleContainer = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  background-color: rgb(34, 34, 34);
  backdrop-filter: blur(10px);
  color: #ffffff;
  border-radius: 4px;

  box-shadow: rgba(34, 34, 34, 0.3) 0px 19px 38px,
    rgba(34, 34, 34, 0.22) 0px 25px 25px;

  h1 {
    color: #ffffff;
  }

  h3 {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    padding: 0px 2px;
    margin-bottom: 25px;
    text-align: center;
    span {
      font-size: 35px;
      fontweight: 600;
      color: rgb(239, 75, 37);
      border: 1px solid rgb(239, 75, 37);
      padding: 0px 6px;
    }
    br {
      margin-bottom: 15px;
    }
  }

  button {
    margin: 40px 0px 40px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(239, 75, 37);
    padding: 10px 60px;
    border-radius: 4px;
    border: none;
    outline: none;
    transition: all 100ms ease;
    border: 2px solid #fff;
    &:hover {
      background-color: rgb(239, 75, 37, 0.9);
      span {
        color: rgb(255, 255, 255, 0.9);
      }
    }
  }
`;

const EntranceFee = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  background-color: rgb(34, 34, 34);
  backdrop-filter: blur(10px);
  color: #ffffff;
  border-bottom: 1px solid rgb(239, 75, 37);
  h1 {
    color: #ffffff;
  }
`;

export default LotteryEntrance;
