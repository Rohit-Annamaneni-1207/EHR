import React, { useContext } from 'react';

import { Footer, Loader, Navbar, Services, Transactions, Auth } from './components';
import { EHRContext } from './context/ehrContext'

const App = ()=>{

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
    login} = useContext(EHRContext);

    
  return (
      <div className="min-h-screen">
        <div className='gradient-bg-welcome'>
          <Navbar />
        </div>
        <Auth />
        <Services />
        <Transactions />
        <Footer />
      </div>
  )
}

// const App = ()=>{
//   return (
//       <div className="min-h-screen">
//         {(()=>{
//           if (userType=="guest")
//           {
//             return (
//                     <div className="min-h-screen">
//                       <div className='gradient-bg-welcome'>
//                         <Navbar />
//                       </div>
//                       <Auth />
//                       <Services />
//                       <Transactions />
//                       <Footer />
//                     </div>
//                 );
//           }
//           else if (userType == "patient")
//           {
//             return (
//               <div className="min-h-screen">
//                 <div className='gradient-bg-welcome'>
//                   <Navbar />
//                 </div>
//                 {/* <Auth /> */}
//                 Patient page
//                 <Services />
//                 <Transactions />
//                 <Footer />
//               </div>
//           );
//           }
//           else{
//             return (
//               <div className="min-h-screen">
//                 <div className='gradient-bg-welcome'>
//                   <Navbar />
//                 </div>
//                 {/* <Auth /> */}
//                 Doctor page
//                 <Services />
//                 <Transactions />
//                 <Footer />
//               </div>
//           );
//           }
//         })}
//       </div>
//   )
// }

export default App;
