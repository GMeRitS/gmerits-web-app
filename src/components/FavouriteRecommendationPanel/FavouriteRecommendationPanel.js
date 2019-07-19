import React, { Component } from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import _isEmpty from 'lodash/isEmpty';
import SwipeToDelete from 'react-swipe-to-delete-component';

import './style.css';

import UserListItem from '../UserListItem/UserListItem';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import UserActions from '../../actions/UserActions';

const { searchNew } = RoutePathConstants;

class FavouriteRecommendationPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slidingHrStyle: {}
    };
  }

  componentDidMount() {
    this.props.getFavouriteUsers();
    this.props.getMatchRecommendations();
  }

  handleMyFavouritesTabClick = () => {
    this.setState({ slidingHrStyle: { marginLeft: '0' } });
  };

  handleRecommendationsTabClick = () => {
    this.setState({ slidingHrStyle: { marginLeft: '50%' } });
  };

  handleUserListItemClick = id => {
    history.push(`/${searchNew}/${id}`);
  };

  handleRemoveFavouriteUser = key => {
    console.log(key);
  };

  render() {
    const { slidingHrStyle } = this.state;
    const {
      User: { favouriteUserList, recommendationList }
    } = this.props;

    return (
      <div className="favourite-recommendation-container">
        <Tabs className="favourite-recommendation-sub-container">
          <TabLink
            to="my-favourites-tab"
            className="tab-link favourite-tab"
            onClick={this.handleMyFavouritesTabClick}
          >
            <p>MY FAVOURITES</p>
          </TabLink>
          <TabLink
            to="recommendation-tab"
            className="tab-link recommendation-tab"
            onClick={this.handleRecommendationsTabClick}
          >
            <p>RECOMMENDATIONS</p>
          </TabLink>

          <hr className="sliding-hr" style={slidingHrStyle} />

          <div className="tab-panel">
            <TabContent for="my-favourites-tab">
              <div className="list-group">
              {!_isEmpty(favouriteUserList) &&
                favouriteUserList.map((user, id) => (
                  <SwipeToDelete key={id} onDelete={() => {
                    this.props.removeFavouriteUser(user['uu_id'])
                  }}>
                    <UserListItem
                      key={id}
                      userProfileImage={user['image_url']}
                      isImageUrlAvailable={user['image_url']}
                      userName={user.username}
                      userBiography={user.biography}
                      userActiveStatus={user.online}
                      id={user['uu_id']}
                      onClick={this.handleUserListItemClick}
                      isMentorUser={user.isMentorUser}
                    />
                  </SwipeToDelete>
                ))}
              </div>
            </TabContent>
            <TabContent for="recommendation-tab">
              {!_isEmpty(recommendationList) &&
                recommendationList.map((user, id) => (
                  <UserListItem
                    key={id}
                    userProfileImage={user['image_url']}
                    isImageUrlAvailable={user['image_url']}
                    userName={user.username}
                    userBiography={user.biography}
                    userActiveStatus={user.online}
                    id={user['uu_id']}
                    onClick={this.handleUserListItemClick}
                    isMentorUser={user.isMentorUser}
                  />
                ))}
            </TabContent>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(FavouriteRecommendationPanel);
