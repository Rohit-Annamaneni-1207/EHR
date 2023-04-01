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

const Services = () => {

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
        grantAccess,
        handleChangeAddress,
        recordData,
        setRecordData,
        handleChangeRecord,
        add_record} = useContext(EHRContext);

        const handleGrantSubmit = (e) => {
            const { address } = addressData;
    
            e.preventDefault();
    
            if (!address)
            {
                alert("Enter the details before submit.");
                return;
            }

            grantAccess();

        }

        const handleRecordSubmit = (e) => {
            const { p_address, record_id } = recordData;
            console.log(p_address, record_id);

            e.preventDefault();

            if (!p_address || !record_id)
            {
                alert("Enter the details before submit.");
                return;
            }

            add_record();
        }

    if (userType=="guest")
    {
        return(
            <div>

            </div>
        );
    }
    else if (userType=="patient")
    {
        return(
            <div>
                PATIENT PAGE
                <br />
                <br />
                <br />
                GRANT ACCESS TO DOCTOR
                <br />
                <div className="p-5 sm:w-100 w-full flex flex-col justify-center items-center blue-glassmorphism form-bg">
                <Input placeholder={"Doctor address"} name={"address"} type={"text"} handleChange={handleChangeAddress}/>
                    <div>
                        
                        <button
                            type="button"
                            onClick={handleGrantSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#322279fe] hover:bg-[#442aaf] rounded-full cursor-pointer"
                            >
                            Grant Access
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    else
    {
        return(
            <div>
                DOCTOR PAGE
                <br />
                <br />
                <br />
                ADD RECORD
                <br />
                <div className="p-5 sm:w-100 w-full flex flex-col justify-center items-center blue-glassmorphism form-bg">
                <Input placeholder={"Patient address"} name={"p_address"} type={"text"} handleChange={handleChangeRecord}/>
                <Input placeholder={"Record id"} name={"record_id"} type={"text"} handleChange={handleChangeRecord}/>
                    <div>
                        
                        <button
                            type="button"
                            onClick={handleRecordSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#322279fe] hover:bg-[#442aaf] rounded-full cursor-pointer"
                            >
                            Submit Record
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Services;