import React from "react"

import "./index.scss"

function Footer() {
  return (
    <footer className="nowrap sticky">
      <div className="cap-width">
        <div>
          <a href="https://www.linkedin.com/in/m-gross/">LinkedIn</a>
          {", "}
          <a href="https://github.com/GrossDesignCo">GitHub</a>
        </div>
        <div>© {new Date().getFullYear()}</div>
      </div>
    </footer>
  )
}

export default Footer
