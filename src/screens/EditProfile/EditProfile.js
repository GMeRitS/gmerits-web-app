import React, { Component } from 'react';

import './style.css';
import IsMobileSize from '../../helpers/MobileDetect';
import EditScreenHeader from '../../components/EditScreensHeader/EditScreensHeader';
import EditProfileContent from '../../components/EditScreenContent/EditProfileContent';
import UnsavedAlert from '../../components/UnsavedAlert/UnsavedAlert';

class EditProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      unsavedAlert: false
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleButtonNoClick = () => {
    this.setState({ unsavedAlert: false });
  };

  render() {
    const { isOnMobileSize, unsavedAlert } = this.state;

    return isOnMobileSize ? (
      <div className="edit-profile-container">
        <EditScreenHeader
          editScreenHeaderBackgroundColor="purple-gradient"
          editScreenHeaderName="EDIT PROFILE"
        />
        <div className="edit-screen-content">
          <EditProfileContent />
        </div>
        {unsavedAlert && (
          <UnsavedAlert onButtonNoClick={this.handleButtonNoClick} />
        )}
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EditProfile;
