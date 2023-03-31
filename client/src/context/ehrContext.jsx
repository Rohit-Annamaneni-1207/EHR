import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const EHRContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const ehrContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({provider:provider, signer:signer, contract:ehrContract});

    return ehrContract;
}

export const EHRProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [docData, setDocData] = useState({ name: "" });
    const [patientData, setPatientData] = useState({ name: "" });
    const [userType, setUserType] = useState("guest");
    const [addressData, setAddressData] = useState({ address:"" });

    const handleChangeAddress = (e, name) => {
        setAddressData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const handleChangeDoc = (e, name) => {
        setDocData((prevState) => ({ ...prevState, [name]: e.target.value }));
        // console.log(docData);
    }

    const handleChangePatient = (e, name) => {
        setPatientData((prevState) => ({ ...prevState, [name]: e.target.value }));
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

            const { name } = docData;
            const ehrContract = getEthereumContract();

            const transactionHash = await ehrContract.addDoctor(name);
            console.log(`LOADING: ${transactionHash}`);
            await transactionHash.wait();
            console.log(`SUCCESS: ${transactionHash}`);
            
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object.");
        }
    }

    const addPatient = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const { name } = patientData;
            const ehrContract = getEthereumContract();

            const transactionHash = await ehrContract.addPatient(name);
            console.log(`LOADING: ${transactionHash}`);
            await transactionHash.wait();
            console.log(`SUCCESS: ${transactionHash}`);
            
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object.");
        }
    }

    const login = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const ehrContract = getEthereumContract();

            let user = await ehrContract.login();
            console.log(user);

            setUserType(user);

        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object.");
        }
    }

    const grantAccess = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const { address } = addressData;
            const ehrContract = getEthereumContract();

            const transactionHash = await ehrContract.grant_access(address);
            console.log(`LOADING: ${transactionHash}`);
            await transactionHash.wait();
            console.log(`SUCCESS: ${transactionHash}`);
            
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
        <EHRContext.Provider value={{
                connectWallet,
                currentAccount, 
                docData, 
                setDocData, 
                patientData, 
                setPatientData, 
                handleChangeDoc, 
                handleChangePatient, 
                addDoctor ,
                addPatient,
                userType,
                setUserType,
                login,
                addressData,
                setAddressData,
                grantAccess,
                handleChangeAddress
            }}>
            {children}
        </EHRContext.Provider>
    );
}