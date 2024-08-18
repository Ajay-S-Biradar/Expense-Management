import React from 'react'
import { motion } from 'framer-motion'

const LandingPage = () => {
  return (
    <motion.div
      className='bg-[#1a1f2a] w-full h-full flex justify-center items-center flex-col font-bold gap-6 relative overflow-hidden' // Add overflow-x-hidden
    >
      <motion.div 
        initial={{ rotate: -180 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className='absolute bottom-0 right-0 origin-bottom-right'>
          <img className='h-60' src="assets/expense_gif2.gif" alt="" />
      </motion.div>
      <motion.div 
        initial={{ y:-500 }}
        animate={{ y:0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className='absolute top-5 left-5 origin-bottom-right'>
          <img className='h-60 rounded-xl' src="assets/expense_gif4.gif" alt="" />
      </motion.div>
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className='absolute bottom-5 left-5'>
          <img className='h-60 rounded-full' src="assets/expense_gif1.gif" alt="" />
      </motion.div>
      <motion.div 
        initial={{ x: +700 }}
        animate={{ x: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className='absolute top-5 right-5'>
          <img className='h-60 rounded-md' src="assets/expense_gif3.gif" alt="" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0.5, y: -400 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className='font-heading text-purple-500 text-5xl'
      >
        Welcome to the Expense Management
      </motion.div>
      <motion.button 
        initial={{ opacity: .5, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className='font-serif bg-blue-300 text-sm p-2 m-2 rounded-2xl'
      >
        Login/SignUp
      </motion.button>
    </motion.div>
  )
}

export default LandingPage
