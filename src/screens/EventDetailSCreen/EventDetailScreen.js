import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import userAvatar from '../../assets/youngBoyAvatar.png';
import avatarBoy from '../../assets/img_avatar_boy.png';
import UserListItem from '../../components/UserListItem/UserListItem';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';

const { searchNew } = RoutePathConstants;

class EventDetailScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      speakers: [
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
          is_favourite: false,
          isMentorUser: true
        },
        {
          id: 2,
          userProfileImage: avatarBoy,
          userActiveStatus: 'active',
          userName: 'Tom',
          profession: '',
          userBiography:
            'Tom graduated in 2003 with a BA in Engineering and is an active alumni ',
          isMentorUser: true
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
      ]
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

  handleUserListItemClick = id => {
    history.push(`/${searchNew}/${id}`);
  };

  render() {
    const { isOnMobileSize, speakers } = this.state;
    const { reserveButtonBackgroundColor } = this.props;

    return isOnMobileSize ? (
      <div className="event-detail-container">
        <div className="event-detail-header">
          <ScreenHeader heartIconVisible={true} buttonBackVisible={true} />
          <div className="reservation-section-container">
            <div className="event-detail-header-text reservation-text">
              You need to reserve a seat for this event. Seats remaining 8/30
            </div>
            <button
              className={`event-detail-header-text reserve-button purple ${reserveButtonBackgroundColor}`}
            >
              RESERVE A SEAT
            </button>
          </div>
          <div className="event-detail-header-text event-schedule-time-label">
            <p>Creative Stage 8:15 - 09:10</p>
          </div>
        </div>
        <div className="event-detail-content">
          <div className="event-sub-container description-container">
            <div className="event-detail-sub-header event-description-header event-detail-content-text">
              Future of Education
            </div>
            <div className="event-speaker-label event-detail-content-text">
              Meet the most innovative EdTech startups from Finland!
            </div>
            <div className="event-description event-detail-content-text">
              <p>
                Liveable flat white boutique sleepy Baggu uniforms lovely global
                Shinkansen. Artisanal Muji sophisticated delightful, Helsinki
                sharp Airbus A380. Singapore pintxos first-class iconic wardrobe
                Winkreative bulletin discerning punctual sophisticated Baggu.
                Handsome carefully curated smart impeccable hand-crafted
                concierge Scandinavian alluring lovely emerging Toto.
              </p>
            </div>
          </div>
          <div className="event-sub-container event-speaker-list">
            <div className="event-detail-sub-header event-detail-content-text event-speaker-list">
              Speakers
            </div>
            {speakers.map((speaker, id) => (
              <UserListItem
                onClick={this.handleUserListItemClick}
                key={id}
                userProfileImage={speaker.userProfileImage}
                id={speaker.id}
                userActiveStatus={speaker.userActiveStatus}
                userBiography={speaker.userBiography}
                userName={speaker.userName}
                isMentorUser={speaker.isMentorUser}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventDetailScreen;
