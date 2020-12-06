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
import $ from 'jquery';

var artistState = "";

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
        <Input class='form-control' id='artist'/>
        <label for='friend'>Choose a Friend</label>
        <Input class='form-control' id='friend'/>     
          <Button class="btn btn-info btn-sm" type="button"  onClick={() => {writeToDatabase($("#artist").val(),$("#friend").val())}}>  Send this root!</Button>  
      </div>      
          {children}
        </div>
        <Test />
      </div>
    </section>
  );
}

function updateInputValue(evt) {
  console.log(evt.target.value)
  artistState = evt.target.value;
}

function writeToDatabase(artist, friend) {
  alert(artist+" sent to "+friend);
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
      const contacts = mongodb.db('createdPlaylistsDatabase').collection('unfinishedPlaylistsCollection');

      const newItem = {
        "sender": "alex.chao",
        "receiver": friend,
        "sender_artist": artist,
      };
      contacts.insertOne(newItem);
    })
    
    function login(email, password) {
      const credential = new UserPasswordCredential(email, password);
      return stitchClient.auth.loginWithCredential(credential);
    }
}

GenericSection.propTypes = propTypes;
GenericSection.defaultProps = defaultProps;

export default GenericSection;