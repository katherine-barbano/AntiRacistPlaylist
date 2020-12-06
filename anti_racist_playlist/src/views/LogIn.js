import React from 'react';
import Button from "../components/elements/Button";
import classNames from 'classnames';
import { SectionProps } from '../utils/SectionProps';
import ButtonGroup from '../components/elements/ButtonGroup';

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
        <div className="hero-content">
          <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
         <span className="text-color-primary">Diversify </span>your Spotify.
      
          </h1>
          <div className="container-xs">
            <div className="reveal-from-bottom" data-reveal-delay="600">
            <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Create playlists with friends.
              </p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Empower diverse artists.
              </p>
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Save directly to your Spotify account.
              </p>
              <ButtonGroup>

              <Button tag="a" color="primary" wideMobile variant="btn btn-success" onClick={() => spotifyAuthentication()}>
                    Log in to your Spotify here
                    </Button>
                 

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

function spotifyAuthentication() {
  var title = "TestPlaylist";
  var g_tracks = []

  var client_id = '';
  var redirect_uri = '';

  client_id = '802d7ae8caf44a2c906346486811d999';
  redirect_uri = 'http://localhost:3000/Home';

  var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
      '&response_type=token' +
      '&scope=playlist-read-private%20playlist-modify%20playlist-modify-private' +
      '&redirect_uri=' + encodeURIComponent(redirect_uri);
  localStorage.setItem('createplaylist-tracks', JSON.stringify(g_tracks));
  localStorage.setItem('createplaylist-name', title);
  window.open(url, "_self", 'asdf', 'WIDTH=400,HEIGHT=500');
}

export default Hero; 