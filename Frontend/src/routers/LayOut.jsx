import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../Pages/Footer'

const LayOut =()=>{
  return(
    <>
     <Header/>
    
    <Outlet/> 
    
    <Footer/>
    </>
  )
}


export default LayOut;
