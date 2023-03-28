import { Footer, Loader, Navbar, Services, Transactions, Welcome } from './components';
import { EHRContext } from './context/ehrContext'

const App = ()=>{
  return (
      <div className="min-h-screen">
        <div className='gradient-bg-welcome'>
          <Navbar />
        </div>
        <Welcome />
        <Services />
        <Transactions />
        <Footer />
      </div>
  )
}

export default App;
