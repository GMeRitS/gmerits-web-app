import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import './style.css';
import IsMobileSize from '../../helpers/MobileDetect';
import EditScreenHeader from '../../components/EditScreensHeader';
import EditProfileContent from '../../components/EditScreenContent';
import AlertBox from '../../components/AlertBox';
import UserActions from '../../actions/UserActions';
import history from '../../history';

const lineHeight = 18;

class EditProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      unsavedAlert: false,
      userName: props.User.myDetail.username,
      textareaValue: props.User.myDetail.biography,
      textareaRow: 3,
      userImage: props.User.myDetail['image_url']
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);
    this.props.getMyProfileDetail('8bbc80f0-90a0-5092-ab27-29cc35f52d0c');
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

  handleButtonYesClick = () => {
    history.goBack()
  };

  handleCancelButtonClick = () => {
    const { userName, textareaValue, userImage } = this.state;
    const {
      User: { myDetail }
    } = this.props;

    if (
      !_.isEqual(myDetail.username, userName) ||
      !_.isEqual(myDetail.biography, textareaValue) ||
      !_.isEqual(myDetail['image_url'], userImage)
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
      User: { myDetail }
    } = this.props;

    if (_.isEmpty(myDetail)) return null;

    return isOnMobileSize ? (
      <div className="edit-profile-container">
        <EditScreenHeader
          editScreenHeaderBackgroundColor="purple-gradient"
          editScreenHeaderName="EDIT PROFILE"
          onClick={this.handleCancelButtonClick}
        />
        <div className="edit-screen-content">
          <EditProfileContent
            userInformation={myDetail}
            userName={myDetail.username}
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
          <AlertBox
            alertTextLabel='Unsaved changes'
            alertText='You have unsaved changes. Are you sure you want to cancel?'
            onLeftOptionClick={this.handleButtonNoClick}
            leftOption='No'
            rightOption='Yes'
            onRightOptionClick={this.handleButtonYesClick}
          />
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
