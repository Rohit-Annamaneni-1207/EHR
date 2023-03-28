// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ehr {
    struct Record
    {
        string r_id;
        // string p_id;
        // string d_id;
        uint timestamp;
    }

    struct Patient
    {
        address id;
        string name;
        uint totalRecords;

        mapping(uint => Record) records;

        mapping(address => bool) doctorsPermitted;
    }

    event PatientCreated(address id, string name);
    event DoctorCreated(address id, string name);
    event PatientRecordUploaded(address p_id, uint record_num, uint timestamp);
    event grantedAccess(address p_id, address d_id);

    struct Doctor
    {
        address id;
        string name;

        mapping(address => bool) patientGranted;
    }


    mapping (address => Patient) public patient_map;
    mapping (address => Doctor) public doctor_map;
    // mapping (address => Record[]) public patient_to_records;

    modifier senderExists {
    require(doctor_map[msg.sender].id == msg.sender || patient_map[msg.sender].id == msg.sender, "Sender does not exist");
    _;
  }


    modifier patientExists(address patientId) {
        require(patient_map[patientId].id == patientId, "Patient does not exist");
        _;
    }

    modifier senderIsDoctor {
    require(doctor_map[msg.sender].id == msg.sender, "Sender is not a doctor");
    _;
  } // validate doctor

    modifier senderIsNotDoctor {
    require(doctor_map[msg.sender].id != msg.sender, "Sender is already a doctor");
    _;
  }

    modifier senderIsPatient {
    require(patient_map[msg.sender].id == msg.sender, "Sender is not a patient");
    _;
  }

    modifier senderIsNotPatient {
    require(patient_map[msg.sender].id != msg.sender, "Sender is already a patient");
    _;
  }


    function login () public view returns (string memory userType)
    {
        if (patient_map[msg.sender].id == msg.sender)
        {
            return "patient";
        }

        if (doctor_map[msg.sender].id == msg.sender)
        {
            return "doctor";
        }

        return "guest";
    }

    function addPatient (string memory _name) public senderIsNotPatient
    {
        // require(patient_map[msg.sender].id != msg.sender, "This patient already exists.");

        patient_map[msg.sender].id = msg.sender;
        patient_map[msg.sender].name = _name;
        patient_map[msg.sender].totalRecords = 0;

        emit PatientCreated(msg.sender, _name);
    }

    function grant_access (address d_id) public senderIsPatient
    {
        require(doctor_map[d_id].id == d_id, "Doctor does not exist");
        require(patient_map[msg.sender].doctorsPermitted[d_id]==false && doctor_map[d_id].patientGranted[msg.sender]==false, "Access already granted");

        patient_map[msg.sender].doctorsPermitted[d_id] = true;
        doctor_map[d_id].patientGranted[msg.sender] = true;
        // validate patient

        emit grantedAccess(msg.sender, d_id);
    }

    function revoke_access (address d_id) public senderIsPatient
    {

    }

    function addRecord (address p_id, string memory rec_id) public senderIsDoctor
    {
        require(patient_map[p_id].id == p_id, "Not a Patient");

        Patient storage _patient = patient_map[p_id];
        _patient.totalRecords++;
        _patient.records[_patient.totalRecords].r_id = rec_id;
        uint timestamp = block.timestamp;
        _patient.records[_patient.totalRecords].timestamp = timestamp;

        emit PatientRecordUploaded(p_id, _patient.totalRecords, timestamp);
        // validate doctor 
    }


    function addDoctor (string memory _name) public senderIsNotDoctor
    {
        // require(doctor_map[msg.sender].id != msg.sender, "This doctor already exists.");
        doctor_map[msg.sender].id = msg.sender;
        doctor_map[msg.sender].name = _name;

        emit DoctorCreated(msg.sender, _name);
    }

    function getPatientRecords (address p_id, uint record_num) public view returns (string memory rec_id, uint time_stamp)
    {
        require (patient_map[p_id].id == p_id, "Invalid patient");

        if (p_id != msg.sender)
        {
            require(doctor_map[msg.sender].id == msg.sender, "Access not authorized");
            require(patient_map[p_id].doctorsPermitted[msg.sender] == true, "Access not authorized");
        }

        require(record_num > 0 && record_num <= patient_map[p_id].totalRecords, "Invalid record request");
        
        Record storage _record = patient_map[p_id].records[record_num];

        return (_record.r_id, _record.timestamp);
    }

}