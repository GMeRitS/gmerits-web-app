import React, { Component } from 'react';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader';
import RoutePathConstants from '../../constants/RoutePathConstants';

const { privacyPolicy } = RoutePathConstants;

class ServiceTermsScreen extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="service-terms-container">
        <ScreenHeader
          headerBackgroundColor="purple-gradient"
          screenHeaderName="service terms"
          screenHeaderNameVisible={true}
          buttonBackVisible={true}
        />
        <div className="service-terms-content">
          <div className="service-terms-content-header">
            <h1>MESENSEI MOBILE APPLICATION SERVICE TERMS</h1>
            <p>
              Mesensei Mobile App is a service provided by Mesensei Oy
              (“Mesensei”). The service helps you to find and connect with
              mentors. Mesensei mobile application does not require
              registration. You can connect with the mentors directly with chat
              messages and IP -based voice calls using a nickname.
            </p>
          </div>

          <div className="service-terms-content-text">
            <ol>
              <li>
                GENERAL
                <p>
                  Service is available as a downloadable application for iOS and
                  Android devices.
                </p>
                <p>
                  By installing the software you accept these terms. Please take
                  the time to read and become familiar with these terms before
                  you accept them. If you do not agree to these terms, do not
                  install the application and stop using it if you have
                  installed it already.
                </p>
              </li>

              <li>
                THE USE OF THE SERVICE
                <p>
                  Downloading and using the application is free. The application
                  does not yet have premium content, or features requiring a
                  payment or a purchase. However, such features might be added
                  later.
                </p>
                <p>
                  When you start using the service you are only asked to enter a
                  nickname. The provision of further information about yourself
                  is voluntary. The use of the Mesensei App does not require you
                  to provide personally identifiable contact information. To
                  find out more, please refer to our
                  <a href={`/${privacyPolicy}`}> Privacy Policy</a>.
                </p>
              </li>

              <li>
                THE USER AND THE MENTOR
                <p>
                  The service functions as a connecting medium between you and
                  the mentors. Mesensei is not responsible for the nature or the
                  quality of the conversations, or the information and the
                  advice offered to you by the mentors. The mentors are not
                  employed by Mesensei and they do not represent Mesensei.
                </p>
                <p>
                  It is your and your mentor’s responsibility to agree on the
                  nature, terms and conditions of your relationship. You are
                  solely responsible for any actions, inactions, or decisions
                  you make based on the conversations and advice provided to
                  you.
                </p>
              </li>

              <li>
                CHANGES TO THESE TERMS
                <p>
                  Mesensei reserves the right to add, edit or remove parts of
                  the service, to add paid content, and to discontinue the
                  service partly or completely.
                </p>
              </li>

              <li>
                LIMITATION OF RESPONSIBILITY AND OFFERED CONTENT
                <p>
                  The service is provided without a warranty. Mesensei does not
                  guarantee the functionality of the service features, the
                  service as a whole, or the accuracy of the content. Mesensei
                  is not responsible for any direct or indirect damages or
                  inconveniences caused by the user of the service, its
                  deficiencies or unavailability. Mesensei is not obliged to
                  offer any compensations to you or third parties. As a user you
                  are solely responsible for the service use and the content you
                  send using the service to Mesensei or third parties.
                </p>
              </li>

              <li>
                COPYRIGHT
                <p>
                  Mesensei reserves all the rights to the application and it’s
                  content. The user has the right use the service privately for
                  non-commercial use. To learn more please refer to the license
                  agreement in the application settings.
                </p>
              </li>

              <li>
                APPLICABLE LAW
                <p>
                  These terms and the use of the service are governed by the
                  applicable laws of Finland. If you encounter inappropriate,
                  unethical behaviour or content please report it immediately to
                  Customer Service at hello@mesensei.com
                </p>
              </li>

              <li>
                SERVICE PROVIDER CONTACT INFORMATION
                <p>
                  The service provider is Mesensei Oy (FI27838022), Ensi Linja
                  1, 00530, Helsinki, Finland. To find out more about your
                  rights or privacy, please contact the Customer Support at
                  hello@mesensei.com
                </p>
              </li>

              <li>
                UPDATES
                <p>
                  These are the service terms for application version 1.8 and
                  they they are valid until further notice beginning from
                  2.9.2017. Mesensei reserves all the rights to update these
                  terms.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceTermsScreen;
