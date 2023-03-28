import { Footer, Loader, Navbar, Services, Transactions, Auth } from './components';
import { EHRContext } from './context/ehrContext'

const App = ()=>{
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

export default App;
