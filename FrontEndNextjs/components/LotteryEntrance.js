import React from "react";
import { useWeb3Contract } from "react-moralis";

const LotteryEntrance = () => {
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

  return <div>LotteryEntrance</div>;
};

export default LotteryEntrance;
