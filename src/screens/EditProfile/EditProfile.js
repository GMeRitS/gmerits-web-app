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

const lineHeight = 18;

class EditProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      unsavedAlert: false,
      userName: props.User.userDetail.username,
      textareaValue: props.User.userDetail.biography,
      textareaRow: 3,
      userImage: props.User.userDetail['image_url']
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
    const { userName, textareaValue, userImage } = this.state;
    const {
      User: { userDetail }
    } = this.props;

    if (
      !_.isEqual(userDetail.username, userName) ||
      !_.isEqual(userDetail.biography, textareaValue) ||
      !_.isEqual(userDetail['image_url'], userImage)
    ) {
      this.setState({ unsavedAlert: true });
    } else {
      history.goBack();
    }
  };

  handleNameInputOnChange = e => {
    this.setState({ userName: e.target.value });
  };

  handleResizeTextArea = e => {
    const oldRows = e.target.rows;
    e.target.rows = 3;
    const newRows = e.target.scrollHeight / lineHeight;

    if (newRows === oldRows) {
      e.target.rows = newRows;
    }

    this.setState({
      textareaValue: e.target.value,
      textareaRow: newRows
    });
  };

  handleProfileImageOnChange = e => {
    this.setState({
      userImage: URL.createObjectURL(e.target.files[0])
    });
  };

  render() {
    const { isOnMobileSize, unsavedAlert, textareaRow, userImage } = this.state;
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
            onUserBiographyInputChange={this.handleResizeTextArea}
            textareaRow={textareaRow}
            resizeStyle={{
              lineHeight: `${lineHeight}px`
            }}
            userProfileImage={userImage}
            onChangeUserProfileImage={this.handleProfileImageOnChange}
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
