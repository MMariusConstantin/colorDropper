import React from "react"

function Header() {
  return (
    <div className="header bg-blue-500">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="title text-white text-2xl font-bold">
          <h4>Color Dropper</h4>
        </div>
      </div>
    </div>
  );
}

export default Header;