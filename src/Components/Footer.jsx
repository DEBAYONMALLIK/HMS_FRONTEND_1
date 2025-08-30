import { BsFacebook,BsInstagram ,BsLinkedin,BsTwitter  } from "react-icons/bs";

function Footer(){
   const currentDate= new Date();
   const currentYear=currentDate.getFullYear();

 return(
    <>
    <footer className="  sm:px-20 left-0 bottom-0 h-[10vh]  flex flex-col sm:flex-row items-center justify-between bg-gray-800 ">
  <section className="text-lg">  
   Copyright {currentYear} | All rights reserved
  </section>

  <section className="flex gap-5 justify-center items-center text-2xl text-white" >

    <a href="" className="hover:text-yellow-500 transition-all duration-300 ease-in-out"> 
      <BsFacebook ></BsFacebook>
    </a>
      
     <a href="" className="hover:text-yellow-500 transition-all duration-300 ease-in-out"> 
      <BsInstagram ></BsInstagram>
    </a>
    
     <a href="" className="hover:text-yellow-500 transition-all duration-300 ease-in-out"> 
      <BsLinkedin ></BsLinkedin>
    </a>
    
     <a href="" className="hover:text-yellow-500 transition-all duration-300 ease-in-out"> 
      <BsTwitter ></BsTwitter>
    </a>
    
   

  </section>
    
    </footer>

    </>
 );

}


export default Footer;