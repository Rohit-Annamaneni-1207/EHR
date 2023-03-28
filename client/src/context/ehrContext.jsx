import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const EHRContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const ehrContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log(provider, signer, ehrContract);
}

export const EHRProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [docData, setDocData] = useState({ name: "" });
    const [patientData, setPatientData] = useState({ name: "" });

    const handleChange = (e, name) => {
        setFormData
    }

    const checkIfWalletIsConnected = async () => {
        try{
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length)
            {
                setCurrentAccount(accounts[0]);
                // console.log(currentAccount);
            }
            else
            {
                console.log("No accounts found");
            }
        }
        catch(error)
        {
            console.log(error);

            throw new Error("No ethereum object.");
        }
        // console.log(currentAccount);
    }

    const connectWallet = async () => {
        try{
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        }
        catch (error){
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

    const addDoctor = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        // console.log(currentAccount);
    }, [])

    return (
        <EHRContext.Provider value={{ connectWallet, currentAccount }}>
            {children}
        </EHRContext.Provider>
    );
}