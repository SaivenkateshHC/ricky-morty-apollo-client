import React from 'react'

const MainLayout = ({children}) => {
  return (
    <div className={'global-container p-3 '}>
	    {children}
    </div>
  )
}

export default MainLayout
