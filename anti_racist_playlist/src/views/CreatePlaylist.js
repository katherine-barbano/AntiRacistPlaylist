import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../utils/SectionProps';
import Test from '../components/sections/GenericSection';
import Helmet from "react-helmet";
import useScript from './useScript';
import {
  Stitch,
  UserPasswordCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
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
      const contacts = mongodb.db('createdPlaylistsDatabase').collection('createdPlaylistsCollection');
      
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
              <td>${contact.spotify_id}, ${contact.playlist_name}</td>
              <td>${contact.email}</td>
              <td>${contact.gender}</td>
              <td>${contact.ip_address}</td>
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
          <h1> Make a playlist here</h1>
          <Test />
          {children}
        </div>
      </div>

      <div class='results-bar'>
        <p>Count of Results:</p>
        <span id='num-results' class='results-bar__count'></span>
      </div>
      <div class='input-form'>
        <label for='first_name'>First Name:</label>
        <input class='form-control' name='first_name'></input>
        <label for='last_name'>Last Name:</label>
        <input class='form-control' name='last_name'></input>
        <label for='email'>Email:</label>
        <input class='form-control' name='email'></input>
        <label for='ip_address'>IP Address:</label>
        <input class='form-control' name='ip_address'></input>
      </div>
      <table class='table table-striped'>
        <thead class='thead'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody id='contacts'></tbody>
      </table>
    </section>
  );
}

GenericSection.propTypes = propTypes;
GenericSection.defaultProps = defaultProps;

export default GenericSection;