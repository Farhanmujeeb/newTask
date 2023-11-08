import React from 'react'
import "./NewTask.css"

const Sign = ({isOpen, closeMenu}) => {

    
  return (
    <div className={`offcanvas-menus ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={closeMenu}>
        Close
      </button>
      {/* Add your menu content here */}
    </div>
  )
}

export default Sign