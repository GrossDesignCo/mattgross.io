import React from "react"

function CV() {
  return (
    <article className="margin-off cap-width">
      <h1>Matt Gross: CV</h1>

      {/* Tesla */}
      <section>
        <h2>Tesla</h2>
        <h3>Sr. Software Engineer (Front End)</h3>

        <ol>
          <li>
            Work with a team to iterate on, collaboratively build and steward
            the parts tesla.com related to new & used inventory vehicles,
            principally inventory search & details systems.
          </li>
          <li>
            Own the inventory details experience, allowing customers to view
            photos of vehicles & get further information about a specific one
            before purchasing. Truly the nitty-gritty of the web development
            world :)
          </li>
          <li>
            Contribute to Tesla Design System, especially focusing on tiny
            details, classiness, and animation{" "}
            <div>
              <em>* Currently one of the top 5 contributors :)</em>
            </div>
          </li>
        </ol>
      </section>

      {/* EvenVision */}
      <section>
        <h2>EvenVision</h2>

        <ol>
          <li>
            <h3>Lead Front-End Engineer</h3>
            <p>
              I worked at the intersection of design & development in a variety
              of environments, taught & mentored new staff, and designed the
              tools & components the rest of the team use every day. That means
              that I also worked with our clients to best understand their needs
              and how we could improve the outcome of our projects over time.
            </p>
          </li>

          <li>
            <h3>Lead Web & UI Developer</h3>
            <p>
              Build rich, smooth, useful tools from the ground up, both for
              clients and for their customers. I gradually moved from a junior
              web designer to the lead front-end developer, working principally
              on the most complex & interactive components of our projects.
            </p>
          </li>

          <li>
            <h3>Web Developer</h3>
            <ul className="margin-half">
              <li>
                Design & build client marketing websites, from concept to
                completion.
              </li>
              <li>
                Work with business owners to understand needs, capabilities, and
                define project scopes.
              </li>
              <li>
                Spearhead EvenVision’s transition from Fixed-Width to Responsive
                web development.
              </li>
            </ul>
          </li>

          <li>
            <h3>Graphic & Web Designer</h3>
            <p>
              After freelancing for a time, and spending every waking hour
              learning everything I could, I went to work with EvenVision as a
              graphic & web designer, making neat things from business cards to
              mockups in Illustrator to handling the styling & basic dev on
              websites.
            </p>
          </li>
        </ol>
      </section>

      {/* UW Bothell */}
      <section>
        <h2>
          University of Washington{" "}
          <span className="separate text-light">Bothell</span>
        </h2>
        <p>High-intensity replacement for a BS in Computer Science</p>
        <h4>Coursework:</h4>
        <ul className="margin-off">
          <li>CSS 501: Object Oriented Programming I</li>
          <li>CSS 502: Object Oriented Programming II</li>
          <li>CSS 503: Systems Programming</li>
          <li>More to come...</li>
        </ul>
      </section>
    </article>
  )
}

export default CV
