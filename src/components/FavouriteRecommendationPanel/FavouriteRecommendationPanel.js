import React, { Component } from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

import './style.css';
import userAvatar from "../../assets/youngBoyAvatar.png";
import avatarBoy from "../../assets/img_avatar_boy.png";
import userAvatarWomen from "../../assets/img_avatar_women.png";
import doc_emiliaAvatar from "../../assets/doc_emilia_avatar.png";
import UserListItem from '../UserListItem/UserListItem';
import history from "../../history";
import RoutePathConstants from "../../constants/RoutePathConstants";

const { userSearch: searchScreen } = RoutePathConstants;

class FavouriteRecommendationPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slidingHrStyle: {},
      favouriteUsers: [
        {
          id: 1,
          userProfileImage: userAvatar,
          userActiveStatus: 'active',
          userName: 'Mia',
          profession: '',
          userBiography:
            'I’m a award winning designer. If you need tutoring for art studies',
          userTopics: [
            {
              id: 1,
              topicName: 'BioChemistry',
              voters: [2, 3, 4, 9]
            },
            {
              id: 2,
              topicName: 'Biofuels',
              voters: [2, 3]
            },
            {
              id: 3,
              topicName: 'Industrial-academic',
              voters: [2, 3, 4, 9]
            },
            {
              id: 4,
              topicName: 'Science communication',
              voters: [2, 3, 4, 9]
            },
            {
              id: 5,
              topicName: 'Entrepreneurship',
              voters: [2, 3, 5]
            },
            {
              id: 6,
              topicName: 'Industrial-academic',
              voters: [2, 3, 4, 5, 6]
            }
          ],
          is_favourite: false
        },
        {
          id: 2,
          userProfileImage: avatarBoy,
          userActiveStatus: 'active',
          userName: 'Tom',
          profession: '',
          userBiography:
            'Tom graduated in 2003 with a BA in Engineering and is an active alumni '
        },
        {
          id: 3,
          userProfileImage: userAvatar,
          userActiveStatus: 'active',
          userName: 'Zharif',
          profession: '',
          userBiography:
            'Football is my life! I’m a professional football player and a junior coach'
        }
      ],
      recommendationUsers: [
        {
          id: 7,
          userProfileImage: userAvatarWomen,
          userActiveStatus: 'active',
          userName: 'Maj-Lis',
          profession: '',
          userBiography:
            'Football is my life! I’m a professional football player and a junior coach'
        },
        {
          id: 8,
          userProfileImage: doc_emiliaAvatar,
          userActiveStatus: 'active',
          userName: 'Doc Emilia',
          userBiography:
          "I'm RSE Enterprise Fellow in the Biochemistry Department in Cambridge and a GFC Fellow in Innovation & Entrepreneurship at the World. I'm RSE Enterprise Fellow in the Biochemistry Department in Cambridge and a GFC Fellow in Innovation & Entrepreneurship at the Worldddd",
            profession: 'postdoc',
          userTopics: [
          {
            id: 1,
            topicName: 'BioChemistry',
            voters: [2, 3, 4]
          },
          {
            id: 2,
            topicName: 'Biofuels',
            voters: [2, 3, 4, 9]
          },
          {
            id: 3,
            topicName: 'Industrial-academic',
            voters: [2, 3, 4, 9]
          },
          {
            id: 4,
            topicName: 'Science communication',
            voters: [2, 3, 4, 9]
          },
          {
            id: 5,
            topicName: 'Entrepreneurship',
            voters: [2, 3, 5]
          },
          {
            id: 6,
            topicName: 'Industrial-academic',
            voters: [2, 3, 4, 5, 6]
          }]
        }
      ]
    };
  }

  handleMyFavouritesTabClick = () => {
    this.setState({ slidingHrStyle: { marginLeft: '0' } });
  };

  handleRecommendationsTabClick = () => {
    this.setState({ slidingHrStyle: { marginLeft: '50%' } });
  };

  handleUserListItemClick = id => {
    history.push(`/${searchScreen}/${id}`);
  };

  render() {
    const { slidingHrStyle, favouriteUsers, recommendationUsers } = this.state;

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
              {favouriteUsers.map((user, id) => (
                <UserListItem
                  key={id}
                  userProfileImage={user.userProfileImage}
                  userName={user.userName}
                  userBiography={user.userBiography}
                  userActiveStatus={user.userActiveStatus}
                  id={user.id}
                  onClick={this.handleUserListItemClick}
                />
              ))}
            </TabContent>
            <TabContent for="recommendation-tab">
              {recommendationUsers.map((user, id) => (
                <UserListItem
                  key={id}
                  userProfileImage={user.userProfileImage}
                  userName={user.userName}
                  userBiography={user.userBiography}
                  userActiveStatus={user.userActiveStatus}
                  id={user.id}
                  onClick={this.handleUserListItemClick}
                />
              ))}
            </TabContent>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default FavouriteRecommendationPanel;
