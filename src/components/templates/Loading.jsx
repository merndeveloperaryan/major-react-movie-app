import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-zinc-800'>
      <span className='h-20 w-20 rounded-full overflow-hidden border-b-2 border-t-2 border-green-500 animate-spin'></span>
    </div>
  )
}

export default Loading
