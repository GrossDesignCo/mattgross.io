import React, { Component, Fragment } from "react"

import Header from "./Header"
import Footer from "./Footer"
import CV from "./content/CV"

import "./index.scss"

const isWindowDesktop = () => {
  return window.matchMedia("(min-width: 800px)").matches
}

class Website extends Component {
  constructor(props) {
    super(props)

    this.state = {
      layoutDesktop: isWindowDesktop()
    }
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.updateLayout())
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateLayout())
  }

  updateLayout() {
    const { layoutDesktop } = this.state
    const windowDesktop = isWindowDesktop()

    if (layoutDesktop !== windowDesktop) {
      this.setState({ layoutDesktop: windowDesktop })
    }
  }

  render() {
    const { layoutDesktop } = this.state

    return (
      <Fragment>
        <If condition={!layoutDesktop}>
          <Header />

          <main>
            <CV />
          </main>

          <Footer />
        </If>

        <If condition={layoutDesktop}>
          <aside className="margin-off">
            <Header />
            <Footer />
          </aside>

          <main>
            <CV />
          </main>
        </If>
      </Fragment>
    )
  }
}

export default Website
