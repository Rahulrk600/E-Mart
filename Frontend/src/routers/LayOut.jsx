import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../Pages/Footer'
import { useSelector } from 'react-redux'

const LayOut =()=>{

  const {theme} = useSelector((state)=> state.theme)
  return(
    <>
    
     <Header theme={theme}/>
    
    <Outlet/> 
    
    <Footer/>
    
    </>
  )
}


export default LayOut;
