'use client'
import React from 'react'

import { useSelector } from 'react-redux';

import { motion } from "framer-motion";
const HeroSection = () => {
  const scrollValue = useSelector((state) => state.scrollValue.value);
  console.log(scrollValue)
 

  const heading1 = ["Connecting", "Life", "with", "Life"];
  const heading2 = ['Saving', "lives,", 'one', 'drop', 'at', 'a', 'time']
  const subheading1 = ['Find', 'the', 'right', 'blood', 'donor', 'when', 'you', 'need', 'it', 'the', 'most.',]
  const subHeading2 = ['Register', 'as', 'a', 'donor', 'or', 'search', 'for', 'available', 'donors']

  return (
    <>

      <div className='flex w-full h-[170vh] bg-fixed z-0 bg-herobg bg-top relative'>

        <div className={`flex flex-col justify-center z-50 ${scrollValue > 1000 ? 'hidden':''} bg-transparent px-4 mx-auto w-full max-w-[1440px]`}>

          <h1 className=" fixed top-64    left-[2%] md:left-[11%] font-bold leading-none text-black">
            {heading1.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  opacity: scrollValue > 400 ? 0 : 1, // Hide items when scrollValue > 100
                  y: scrollValue > 400 ? -20 : 0, // Move items up when hiding
                }}
                transition={{
                  delay: index * 0.2, // Stagger effect for animation
                  duration: 0.4,
                }}
                className="inline-block   font-bold  text-[50px] md:text-[60px] lg:text-[70px] mx-1"
              >
                {item}
              </motion.span>
            ))}
          </h1>
          <h1 className=" fixed top-64 left-[2%] md:left-[11%]  font-bold leading-none text-black">
            {heading2.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }} // Initially hidden
                animate={{
                  opacity: scrollValue > 450 && scrollValue <= 800 ? 1 : 0, // Show between scroll 110 and 450
                  y: scrollValue > 450 && scrollValue <= 800 ? 0 : -20, // Hide when out of range
                }}
                transition={{
                  delay: index * 0.1, // Stagger animation
                  duration: 0.4,
                }}
                className="inline-block   font-bold  text-[50px] md:text-[60px] lg:text-[70px] mx-1"
              >
                {item}
              </motion.span>
            ))}
          </h1>
          <h1 className={`fixed top-64 left-[2%] md:left-[11%] ${scrollValue > 400 ? 'mt-40 md:mt-20':'mt-28 md:mt-20'} anim5  font-bold leading-none text-black`}>
            {subheading1.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  opacity: scrollValue > 800 ? 0 : 1, // Hide items when scrollValue > 200
                  y: scrollValue > 800 ? -20 : 0, // Move items up when hiding
                }}
                transition={{
                  delay: index * 0.05, // Stagger effect for animation
                  duration: 0.1,
                }}
                className="inline-block text-[20px] md:text-[25px] lg:text-[30px] font-bold leading-none mx-1 text-black "
              >
                {item}
              </motion.span>
            ))}
          </h1>
          <h1 className={`fixed top-72 left-[2%] md:left-[11%] ${scrollValue > 400 ? 'mt-[180px] sm:mt-20':'mt-32 md:mt-20'} anim5  font-bold leading-none text-black`}>
            {subHeading2.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1, y: 0 }}
                animate={{
                  opacity: scrollValue > 800 ? 0 : 1, // Hide items when scrollValue > 200
                  y: scrollValue > 800 ? -20 : 0, // Move items up when hiding
                }}
                transition={{
                  delay: index * 0.05, // Stagger effect for animation
                  duration: 0.1,
                }}
                className="inline-block text-[20px] md:text-[25px] lg:text-[30px] font-bold leading-none mx-1 text-black "
              >
                {item}
              </motion.span>
            ))}
          </h1>

          <div className={` flex items-center flex-wrap gap-6 fixed ${scrollValue > 400 ? 'mt-36 sm:mt-10':'mt-24 md:mt-10'} anim5 top-96 left-[2%] md:left-[11%] `}>
            
            <motion.button 
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: scrollValue > 800 ? 0 : 1, // Hide items when scrollValue > 200
              y: scrollValue > 800 ? -20 : 0, // Move items up when hiding
            }}
            transition={{
              delay: 0.1, // Stagger effect for animation
              duration: 0.1,
            }}
            className={`px-6 py-2.5 ${scrollValue > 1000 ? 'opacity-0 -mt-6' : scrollValue > 510 ? 'opacity-100' : 'opacity-100'}  ${scrollValue > 1200 && 'hidden'} rounded-full text-white font-semibold bg-red`}>Become a Donor</motion.button>
            <motion.button 
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: scrollValue > 800 ? 0 : 1, // Hide items when scrollValue > 200
              y: scrollValue > 800 ? -20 : 0, // Move items up when hiding
            }}
            transition={{
              delay: 0.1, // Stagger effect for animation
              duration: 0.1,
            }}
            className={`px-6 py-2.5 ${scrollValue > 1000 ? 'opacity-0 -mt-6' : scrollValue > 530 ? 'opacity-100' : 'opacity-100'}  ${scrollValue > 1200 && 'hidden'} rounded-full text-white font-semibold bg-red`}>Find a Donor</motion.button>

          </div>
         
         
        </div>
      </div>

    </>
  )
}

export default HeroSection
// Saving Lives, One Drop at a Time
// Join our community to make a difference—donate blood or find a donor instantly.