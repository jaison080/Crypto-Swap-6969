import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import { useContext } from "react";
import { AppContext } from "../../App";

import { connectWallet } from '../../utils/ConnectWallet';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  // const { state, dispatch } = useContext(AppContext);
  async function onConnectWalletClick() {
    const signer = await connectWallet();
    if(signer) {
      setSigner(signer);
      console.log(signer);
      const account = await signer.getAddress();
      setConnectedAccount(account);
    } else {
      setSigner(null);
      setConnectedAccount(null);
    }
  }
  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
             <span className="text-color-primary">Crypto Swap</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Crypto Swap helps you invest in Crypto Baskets curated by Crypto Experts.
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="https://cryptoswap69.netlify.app/">
                    Login with Binance
                    </Button>
                  {/* <Button tag="a" color="dark" wideMobile href="https://cryptoswap69.netlify.app/">
                    Connect Wallet
                    </Button> */}
                  
                  {signer && connectedAccount
                  ? 
                    (
                      <Button color="dark" wideMobile onClick={onConnectWalletClick}>
                      {`Connected to: ${connectedAccount}`}
                      </Button>
                    )
                  : 
                    (
                      <Button color="dark" wideMobile onClick={onConnectWalletClick}>
                        Connect Wallet
                      </Button>
                    )
                  }
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;