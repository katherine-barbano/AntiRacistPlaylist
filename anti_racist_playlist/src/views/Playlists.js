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
import Routes from './../utils/Routes';

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
      const contacts = mongodb.db('createdPlaylistsDatabase').collection('finishedPlaylistsCollection');

     

      return contacts.find({}, {
        // limit: 3,
        // sort: { 'salary': -1 }
      })
        .asArray();
    })
      .then(displayContacts)

      // Renders the the contacts' information in the table
      function displayContacts(contacts) {
        const contactsTableBody = document.getElementById('contacts');
        const numResultsEl = document.getElementById('num-results');
        const tableRows = contacts.map(contact => {
          return `
            <tr>
              <td>${contact.friend_id}</td>
              <td>Sonata for Violin Solo No. 1 in G Minor</td>
              <td>Violin Concerto No. 2</td>
              <td>Another Day Of Sun</td>
              <td>No Me Diga</td>
              <td>City Of Stars - Hollywood Remix</td>
              <td>Life Goes On</td>
              <td>Drowning</td>
            </tr>
          `;
        });
        contactsTableBody.innerHTML = tableRows.join('');
        numResultsEl.innerHTML = contacts.length;
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
          <h1> Here are your playlists</h1>
          <div class='results-bar'>
        <p>Number of playlists:</p>
        <span id='num-results' class='results-bar__count'></span>
        <h1></h1>
      </div>
  
      <table class='table table-striped'>
        <thead class='thead'>
          <tr>
            <th>Friend</th>
            <th>Playlist</th>
            <th> </th>
            <th> </th>
            <th> </th>
            <th> </th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody id='contacts'></tbody>
      </table>
        
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