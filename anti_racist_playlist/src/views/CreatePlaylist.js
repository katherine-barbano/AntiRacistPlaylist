import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../utils/SectionProps';
import Test from '../components/sections/GenericSection';
import Input from '.././components/elements/Input';
import {
  Stitch,
  UserPasswordCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import Button from './../components/elements/Button';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const GenericSection = ({
  className,
  children,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const outerClasses = classNames(
    'section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const appId = 'antiracistplaylist-qvlud';

  // Get a client for your Stitch app, or instantiate a new one
  const stitchClient = Stitch.hasAppClient(appId)
    ? Stitch.getAppClient(appId)
    : Stitch.initializeDefaultAppClient(appId);

    login('katherine.barbano@duke.edu', 'HackDuke2020').then(() => {
      // Initialize a MongoDB Service Client
      const mongodb = stitchClient.getServiceClient(
        RemoteMongoClient.factory,
        'mongodb-atlas'
      );
      // Get a hook to the employees collection
      const contacts = mongodb.db('createdPlaylistsDatabase').collection('createdPlaylistsCollection');

      const someString = "hackdukeyay"

     

      const newItem = {
        "spotify_id": someString,
        "playlist_name": "Let's write",
      };
      
      contacts.insertOne(newItem)

      return contacts.find({}, {
        // limit: 3,
        // sort: { 'salary': -1 }
      })
        .asArray();
    })
      .then(displayContacts)

      // Renders the the contacts' information in the table
      function displayContacts(contacts) {
      
      }
    
    function login(email, password) {
      const credential = new UserPasswordCredential(email, password);
      return stitchClient.auth.loginWithCredential(credential);
    }

  

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div id="container">
        <div className={innerClasses}>
          <h1> Make a playlist here</h1>
      <div class='input-form'>
        <label for='artist'>Choose an Artist</label>
        <Input class='form-control' name='artist'/>
        <label for='friend'>Choose a Friend</label>
        <Input class='form-control' name='friend'/>
      
          <Button class="btn btn-info btn-sm" type="button"  onClick={() => {}}>  Send this root!</Button>
  
      </div>

        
          {children}
        </div>
        <Test />
      </div>
    

    
    </section>
  );
}

GenericSection.propTypes = propTypes;
GenericSection.defaultProps = defaultProps;

export default GenericSection;