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
import AuthAction from '../../actions/AuthActions';
import { generateImageData } from '../../helpers/UploadImageHelper';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';
import UserInfoStorage from "../../helpers/StorageHelpers/UserInfoStorage";

const lineHeight = 18;
const { startScreen } = RoutePathConstants;

const ALERT_BOX_CONTENT_KEYS = {
  cancelCreateProfile: 0,
  unsaveChanges: 1,
  waitingForApproval: 2
};

class EditProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      userName:
        props.User.myDetail.user !== undefined
          ? props.User.myDetail.user.username
          : '',
      textareaValue:
        props.User.myDetail.user !== undefined
          ? props.User.myDetail.user.biography
          : '',
      textareaRow: 3,
      userImage:
        props.User.myDetail.user !== undefined
          ? props.User.myDetail.user['image_url']
          : '',
      imageIdentifier: null,
      imageData: {},
      alertBoxVisible: false,
      currentAlertBoxContentKey: ALERT_BOX_CONTENT_KEYS.cancelCreateProfile,
      alertBoxContents: [
        {
          alertTextLabel: 'Do you want to cancel?',
          alertText:
            'If you cancel now you need to restart the login the next time.',
          leftOption: 'No',
          rightOption: 'Yes',
          onLeftOptionClick: this.handleButtonNoClick,
          onRightOptionClick: this.handleButtonYesCancelCreateProfileClick,
          leftOptionVisible: true,
          rightOptionVisible: true
        },
        {
          alertTextLabel: 'Unsaved changes',
          alertText:
            'You have unsaved changes. Are you sure you want to cancel?',
          leftOption: 'No',
          rightOption: 'Yes',
          onLeftOptionClick: this.handleButtonNoClick,
          onRightOptionClick: this.handleButtonYesClick,
          leftOptionVisible: true,
          rightOptionVisible: true
        },
        {
          alertTextLabel: 'Submitted for review!',
          alertText:
            'Before you can use the app, your profile will be reviewed & approved. You’ll be notified by email once your profile is approved.',
          leftOption: 'OK',
          rightOption: '',
          onLeftOptionClick: this.handleOkButtonToWaitForApproval,
          onRightOptionClick: () => {},
          leftOptionVisible: true,
          rightOptionVisible: false
        }
      ]
    };
  }

  componentDidMount() {
    !_.isEmpty(AuthDataStorage.getUuid()) && this.props.getMyProfileDetail();
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
    this.setState({ alertBoxVisible: false });
  };

  handleButtonYesClick = () => {
    if (!AuthDataStorage.getUserAuthentication()) {
      AuthDataStorage.removeApiKeyAndUuid();
      UserInfoStorage.removeUserRole();
      history.push(`/${startScreen}`);
    } else {
      history.goBack();
    }
  };

  handleButtonYesCancelCreateProfileClick = () => {
    AuthDataStorage.removeApiKeyAndUuid();
    UserInfoStorage.removeUserRole();
    history.push(`/${startScreen}`);
  };

  handleOkButtonToWaitForApproval = () => {
    AuthDataStorage.removeApiKeyAndUuid();
    history.push(`/${startScreen}`);
  };

  handleCancelButtonClick = () => {
    const { userName, textareaValue, userImage } = this.state;
    const {
      User: {
        myDetail: { user }
      }
    } = this.props;

    if (!AuthDataStorage.getUserAuthentication()) {
      this.displayAlertBox(ALERT_BOX_CONTENT_KEYS.cancelCreateProfile);
    } else {
      if (
        !_.isEqual(user.username, userName) ||
        !_.isEqual(user.biography, textareaValue) ||
        !_.isEqual(user['image_url'], userImage)
      ) {
        this.displayAlertBox(ALERT_BOX_CONTENT_KEYS.unsaveChanges);
      } else {
        history.goBack();
      }
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

    this.readFile(e.target.files[0]).then(result => {
      let imageData = generateImageData(AuthDataStorage.getUuid(), result);
      this.setState({
        imageIdentifier: imageData.id,
        imageData: imageData.image
      });
    });
  };

  handleSaveButtonClick = () => {
    const { userName, textareaValue, imageIdentifier, imageData } = this.state;
    const {
      User: {
        myDetail: { user }
      }
    } = this.props;
    const editedFields = {
      user: { username: userName || user.username, biography: textareaValue }
    };

    this.props.updateEditedUserProfile(editedFields);
    if (!_.isEmpty(imageData) && imageIdentifier !== null) {
      this.props.uploadUserProfileImage(imageIdentifier, imageData);
    }
    if (!user.accepted) {
      this.displayAlertBox(ALERT_BOX_CONTENT_KEYS.waitingForApproval);
    }
  };

  readFile = file => {
    return new Promise(resolve => {
      let reader = new FileReader();
      // Read file content on file loaded event
      reader.onload = function(event) {
        resolve(event.target.result);
      };

      // Convert data to base64
      reader.readAsDataURL(file);
    });
  };

  displayAlertBox(alertBoxContentKey) {
    this.setState({
      alertBoxVisible: true,
      currentAlertBoxContentKey: alertBoxContentKey
    });
  }

  render() {
    const {
      textareaRow,
      userImage,
      alertBoxContents,
      alertBoxVisible,
      currentAlertBoxContentKey
    } = this.state;
    const {
      User: {
        myDetail: { user }
      }
    } = this.props;

    return (
      <div className="edit-profile-container">
        <EditScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          defaultGradientBottom="rgb(35, 24, 45)"
          editScreenHeaderName={
            AuthDataStorage.getUserAuthentication()
              ? 'EDIT PROFILE'
              : 'CREATE PROFILE'
          }
          onClick={this.handleCancelButtonClick}
          onSaveButtonClick={this.handleSaveButtonClick}
        />
        <div className="edit-screen-content">
          <EditProfileContent
            userInformation={user ? user : ''}
            userName={user ? user.username : ''}
            onUserNameInputChange={this.handleNameInputOnChange}
            onUserBiographyInputChange={this.handleResizeTextArea}
            textareaRow={textareaRow}
            resizeStyle={{
              lineHeight: `${lineHeight}px`
            }}
            userProfileImage={user ? userImage : null}
            onChangeUserProfileImage={this.handleProfileImageOnChange}
            isAnonymousUser={user ? user.roles[0] === 'ROLE_PSEUDO' : ''}
          />
        </div>
        {alertBoxVisible && (
          <AlertBox
            alertTextLabel={
              alertBoxContents[currentAlertBoxContentKey].alertTextLabel
            }
            alertText={alertBoxContents[currentAlertBoxContentKey].alertText}
            leftOption={alertBoxContents[currentAlertBoxContentKey].leftOption}
            rightOption={
              alertBoxContents[currentAlertBoxContentKey].rightOption
            }
            onLeftOptionClick={
              alertBoxContents[currentAlertBoxContentKey].onLeftOptionClick
            }
            onRightOptionClick={
              alertBoxContents[currentAlertBoxContentKey].onRightOptionClick
            }
            leftOptionVisible={
              alertBoxContents[currentAlertBoxContentKey].leftOptionVisible
            }
            rightOptionVisible={
              alertBoxContents[currentAlertBoxContentKey].rightOptionVisible
            }
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['User', 'Auth']),
  dispatch => bindActionCreators({ ...UserActions, ...AuthAction }, dispatch)
)(EditProfile);
