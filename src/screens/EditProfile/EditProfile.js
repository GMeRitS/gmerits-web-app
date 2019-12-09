import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import queryString from 'query-string';

import './style.css';
import IsMobileSize from '../../helpers/MobileDetect';
import EditScreenHeader from '../../components/EditScreensHeader';
import EditProfileContent from '../../components/EditScreenContent';
import AlertBox from '../../components/AlertBox';
import UserActions from '../../actions/UserActions';
import AuthAction from '../../actions/AuthActions';
import { generateImageData } from '../../helpers/UploadImageHelper';
import history from '../../history';
import AuthConstants from '../../constants/AuthConstants';
import RoutePathConstants from '../../constants/RoutePathConstants';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';

const lineHeight = 18;
const { Invalid_magic_login_token_error_code } = AuthConstants;
const { search, loginScreen } = RoutePathConstants;

class EditProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      unsavedAlert: false,
      userName: props.User.myDetail.username,
      textareaValue: props.User.myDetail.biography,
      textareaRow: 3,
      userImage: props.User.myDetail['image_url'],
      imageIdentifier: null,
      imageData: {}
    };
  }

  componentDidMount() {
    const { loginToken } = queryString.parse(history.location.search);

    loginToken && this.props.validateMagicLoginToken(loginToken);
    !_.isEmpty(AuthDataStorage.getUuid()) &&
      this.props.getMyProfileDetail(AuthDataStorage.getUuid());
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
    const { unsavedAlert } = this.state;

    this.setState({ unsavedAlert: !unsavedAlert });
  };

  handleButtonYesClick = () => {
    history.goBack();
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
    const editedFields = {
      profile: { username: userName, biography: textareaValue }
    };
    this.props.updateEditedUserProfile(AuthDataStorage.getUuid(), editedFields);
    if (!_.isEmpty(imageData) && imageIdentifier !== null) {
      this.props.uploadUserProfileImage(imageIdentifier, imageData);
    }
    history.push(`/${search}`);
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

  render() {
    const { unsavedAlert, textareaRow, userImage } = this.state;
    const {
      User: { myDetail },
      Auth: { errors }
    } = this.props;
    const { loginToken } = queryString.parse(history.location.search);

    if (
      !_.isEmpty(loginToken) &&
      errors === Invalid_magic_login_token_error_code
    ) {
      history.push(`/${loginScreen}`);
    }
    if (_.isEmpty(myDetail)) return null;

    return (
      <div className="edit-profile-container">
        <EditScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          defaultGradientBottom="rgb(35, 24, 45)"
          editScreenHeaderName="EDIT PROFILE"
          onClick={this.handleCancelButtonClick}
          onSaveButtonClick={this.handleSaveButtonClick}
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
            isAnonymousUser={_.isEmpty(myDetail.roles)}
          />
        </div>
        {unsavedAlert && (
          <AlertBox
            alertTextLabel="Unsaved changes"
            alertText="You have unsaved changes. Are you sure you want to cancel?"
            onLeftOptionClick={this.handleButtonNoClick}
            leftOption="No"
            rightOption="Yes"
            onRightOptionClick={this.handleButtonYesClick}
            leftOptionVisible={true}
            rightOptionVisible={true}
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
