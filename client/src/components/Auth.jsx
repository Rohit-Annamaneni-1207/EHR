import React, { useContext } from 'react';

import { Loader } from ".";
import { EHRContext } from "../context/ehrContext";

const Input = ({ placeholder , name, type, value ,handleChange }) => {
    return(
        <input 
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange = {(e)=>handleChange(e, name)}
        className="my-2 w-full rounded-small p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        ></input>
    )
}

// const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Auth = () => {

    const { 
        connectWallet, 
        currentAccount, 
        docData, 
        setDocData, 
        patientData, 
        setPatientData, 
        handleChangeDoc, 
        handleChangePatient, 
        addDoctor, 
        addPatient,
        userType,
        setUserType,
        login,
        addressData,
        setAddressData,
        recordList,
        setRecordList,
        fetchRecordsForPatient} = useContext(EHRContext);
    
    const handleSubmitDoc = (e) => {
        const { name } = docData;

        e.preventDefault();

        if (!name)
        {
            alert("Enter the details before submit.");
            return;
        }

        addDoctor();
    }

    const handleSubmitPatient = (e) => {
        const { name } = patientData;

        e.preventDefault();

        if (!name)
        {
            alert("Enter the details before submit.");
            return;
        }

        addPatient();
    }

    if (userType == "guest")
    {
        return (
            <div className="flex w-full justify-center items-center">
                <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                    <div className="flex flex-1 justify-start flex-col md:mr-10">
                        <h1 className="text-3xl sm:text-5xl py-1">
                            Health records ledger
                        </h1>
                        <button type="button" onClick={login} className="flex flex-row justify-center items-center my-5 bg-[#30265bfe] p-3 rounded-full cursor-pointer hover:bg-[#442aaf]">
                        <p className="text-white text-base font-semibold">Login</p>
                        </button>
                        <button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#30265bfe] p-3 rounded-full cursor-pointer hover:bg-[#442aaf]">
                        <p className="text-white text-base font-semibold">Connect wallet</p>
                        </button>
                        {!currentAccount ? (<Loader />) : (<div><div className="p-5 sm:w-100 w-full flex flex-col justify-center items-center blue-glassmorphism form-bg">
                            <Input placeholder="Doctor Name" name="name" type="text" handleChange={handleChangeDoc} />
                            {/* <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} /> */}
                            {/* <Input placeholder="Prescription id" name="keyword" type="text" handleChange={handleChange} /> */}
                            {/* <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} /> */}

                            <div>
                                <button
                                    type="button"
                                    onClick={handleSubmitDoc}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#322279fe] hover:bg-[#442aaf] rounded-full cursor-pointer"
                                    >
                                    Register Doctor
                                </button>
                            </div>
                        </div>
                        <div className="p-5 sm:w-100 w-full flex flex-col justify-center items-center blue-glassmorphism form-bg">
                            <Input placeholder="Patient Name" name="name" type="text" handleChange={handleChangePatient} />
                            {/* <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} /> */}
                            {/* <Input placeholder="Prescription id" name="keyword" type="text" handleChange={handleChange} /> */}
                            {/* <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} /> */}

                            <div>
                                <button
                                    type="button"
                                    onClick={handleSubmitPatient}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#322279fe] hover:bg-[#442aaf] rounded-full cursor-pointer"
                                    >
                                    Register Patient
                                </button>
                            </div>
                        </div>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
    else if (userType=="patient")
    {
        // fetchRecordsForPatient();
        return (
            <div>
                Patient page
                <br />
                Address: {currentAccount}
            </div>
        );
    }
    else
    {
        return (
            <div>
                Doctor page
                <br />
                Address: {currentAccount}
            </div>
        );
    }
}

export default Auth;