import * as React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { CV } from './content/CV';

import './index.scss';

const isWindowDesktop = () => {
  return window.matchMedia('(min-width: 800px)').matches;
};

export class Website extends React.Component<
  {},
  {
    layoutDesktop: boolean;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      layoutDesktop: isWindowDesktop()
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.updateLayout());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateLayout());
  }

  updateLayout() {
    const { layoutDesktop } = this.state;
    const windowDesktop = isWindowDesktop();

    if (layoutDesktop !== windowDesktop) {
      this.setState({ layoutDesktop: windowDesktop });
    }
  }

  render() {
    const { layoutDesktop } = this.state;

    return (
      <>
        {!layoutDesktop && (
          <>
            <Header />

            <main>
              <CV />
            </main>

            <Footer />
          </>
        )}

        {layoutDesktop && (
          <>
            <aside className="margin-off animated-bg">
              <Header />
              <Footer />
            </aside>

            <main>
              <CV />
            </main>
          </>
        )}
      </>
    );
  }
}
