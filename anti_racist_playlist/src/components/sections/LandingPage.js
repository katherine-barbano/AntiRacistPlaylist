import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import history from '../../utils/History';

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
       
                <ButtonGroup>
            
                  <Button tag="a" color="primary" wideMobile variant="btn btn-success" onClick={() => history.push('/CreatePlaylist')}>
                    Start a playlist
                    </Button>
                  <Button tag="a" color="dark" wideMobile variant="btn btn-success" onClick={() => history.push('/FinishPlaylist')}>
                    Finish a playlist
                    </Button>
                    <Button tag="a" color="dark" wideMobile variant="btn btn-success" onClick={() => history.push('/Playlists')}>
                    View my playlists
                    </Button>
                

                </ButtonGroup>
            
         </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;