import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import './style.css';
import IsMobileSize from '../../helpers/MobileDetect';
import EditScreenHeader from '../../components/EditScreensHeader';
import EditProfileContent from '../../components/EditScreenContent';
import UnsavedAlert from '../../components/UnsavedAlert';
import UserActions from '../../actions/UserActions';
import history from '../../history';

class EditProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      unsavedAlert: false,
      userName: 'Marsu Mentor'
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);
    this.props.getUserDetail('8bbc80f0-90a0-5092-ab27-29cc35f52d0c');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleButtonNoClick = () => {
    const { unsavedAlert } = this.state;

    this.setState({ unsavedAlert: !unsavedAlert });
  };

  handleCancelButtonClick = () => {
    const { userName } = this.state;
    const {
      User: { userDetail }
    } = this.props;

    if (!_.isEqual(userDetail.username, userName)) {
      this.setState({ unsavedAlert: true });
    } else {
      history.goBack();
    }
  };

  handleNameInputOnChange = e => {
    this.setState({ userName: e.target.value });
  };

  render() {
    const { isOnMobileSize, unsavedAlert } = this.state;
    const {
      User: { userDetail }
    } = this.props;

    if (_.isEmpty(userDetail)) return null;

    return isOnMobileSize ? (
      <div className="edit-profile-container">
        <EditScreenHeader
          editScreenHeaderBackgroundColor="purple-gradient"
          editScreenHeaderName="EDIT PROFILE"
          onClick={this.handleCancelButtonClick}
        />
        <div className="edit-screen-content">
          <EditProfileContent
            userInformation={userDetail}
            userName={userDetail.username}
            onUserNameInputChange={this.handleNameInputOnChange}
          />
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

export default connect(
  state => _.pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(EditProfile);
