import React, { Component, Fragment } from "react"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      test: "yes"
    }
  }

  render() {
    return (
      <Fragment>
        <header>
          <a href="/">Matt Gross</a>
        </header>
        <main>
          <h1>Matt Gross: CV</h1>
          <section>
            <h2>Tesla</h2>
            <div>Sr. Software Engineer (Front End)</div>
            <ol>
              <li>
                Work with a team to iterative on, collaboratively build and
                steward the parts tesla.com related to new & used inventory
                vehicles, principally inventory search & details systems.
              </li>
              <li>
                Own the inventory details experience, allowing customers to view
                photos of vehicles & get further information about a specific
                one before purchasing. Truly the nitty-gritty of the web
                development world :)
              </li>
              <li>
                Contribute to Tesla Design System, especially focusing on tiny
                details, classiness, and animation{" "}
                <em>* Currently one of the top 5 contributors :)</em>
              </li>
            </ol>
          </section>
        </main>
        <footer>© Matt Gross {new Date().getFullYear()}</footer>
      </Fragment>
    )
  }
}

export default App
