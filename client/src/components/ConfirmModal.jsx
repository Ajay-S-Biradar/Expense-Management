import React from 'react'

const ConfirmModal = ({setConfirm, setConfirmModal}) => {
    const handleSignOut = ()=>{
        setConfirmModal(false);
        setConfirm(true)
    }
    
  return (
    <div className='absolute bg-opacity-70 bg-gray-300 h-[100vh] w-[100vw] flex justify-center items-center text-white  '>
        <div className='bg-slate-600 m-3 p-3 rounded-2xl'>
            <div className='text-xl'>
                Are your sure you wana sign out ??
            </div>
            <div className='flex justify-around mt-5'>
                <button className='hover:bg-slate-700 py-1 px-2 m-1 rounded-xl' onClick={()=>setConfirmModal(false)}>
                    Cancel
                </button>
                <button className='hover:bg-slate-700 py-1 px-2 m-1 rounded-xl' onClick={()=>handleSignOut()}>
                    Sign out
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal