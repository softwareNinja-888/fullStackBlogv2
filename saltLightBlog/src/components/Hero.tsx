import { Line } from "./helper/Line";
import { motion } from "framer-motion";
import heroImg_backup from "/hero.avif"; 


function Search() {

  return (
    <>
      <form action="#" method="post" className="relative mt-4">
        <div className="absolute transitiona-all duration-1000 opacity-30 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
          <div className="relative space-y-4 sm:flex sm:space-y-0 sm:items-end">
          <div className="flex-1">
              <label htmlFor="" className="sr-only">Search</label>
              <div>
              <input type="text" name="" id="" className="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 sm:text-sm focus:ring-gray-900 focus:border-gray-900" placeholder="Search Blogs"/>
              </div>
          </div>
          <button type="button" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer">
            Search
          </button>
        </div>
      </form>
    </>
  );
}


export function Hero() {

  function ImgBackup({src,backUp,alt}){
    const handleErr = (e)=>{
      e.target.onerror = null;
      e.target.src = backUp
    }
  
    return <img src={src} onError={handleErr} alt={alt}/>
  }

  const heroImg = "https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-center justify-center gap-16 w-screen py-20 px-6 md:px-16 "
      >
        {/* Text Content */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center md:items-start justify-center text-center md:text-left w-full lg:w-1/2 md:gap-3 gap-8"
        >
          <div className="text-3xl md:text-5xl font-poppins text-black">Daily Bread Blog&#39;s</div>
          <div className="text-lg md:text-xl font-mono mt-2 text-black">
						Welcome to a Salt&Light blogs where your knowledge and faith grow deep. Explore God&#39;s  word, share the journey, and be encouraged as you follow Jesus each and everyday.
          </div>
          <motion.div variants={itemVariants} className="mt-0 w-full max-w-md ">
            <Search />
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          variants={imageVariants}
          className="w-full md:w-1/2 justify-center hidden lg:flex"
        >
          <ImgBackup src={heroImg} backUp={heroImg_backup} alt='Hero Image'/>
        </motion.div>
      </motion.div>
      <Line />
    </>
  );
}
