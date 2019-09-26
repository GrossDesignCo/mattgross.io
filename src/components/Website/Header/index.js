import React from "react"

import "./index.scss"

function Header() {
  const getTagline = () => {
    const taglines = [
      "Codes for Jesus",
      "Works at Tesla",
      "Serves the Lord",
      "Builds the Internet",
      "Really likes Coffee",
      "Loves his Wife :)"
    ]

    const index = Math.floor(Math.random() * Math.floor(taglines.length))
    return taglines[index]
  }

  return (
    <header className="nowrap height-half align-bottom sticky">
      <div className="cap-width">
        <h3>
          <a href="/">Matt Gross</a>
        </h3>
        <div>{getTagline()}</div>
      </div>
    </header>
  )
}

export default Header
