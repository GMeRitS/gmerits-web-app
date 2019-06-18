import React from 'react';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

const PrivacyPolicyScreen = () => (
  <div className="service-terms-container">
    <ScreenHeader
      headerBackgroundColor="purple-gradient"
      screenHeaderName="privacy policy"
      screenHeaderNameVisible={true}
      buttonBackVisible={true}
    />
    <div className="privacy-policy-content">
      <div className="privacy-policy-content-header">
        <h1>MESENSEI MOBILE APPLICATION PRIVACY POLICY</h1>
      </div>

      <div className="privacy-policy-content-text">
        <ol>
          <li>
            PERSONAL DATA
            <p>
              Mesensei is driven by Privacy by Design and compliance with EU
              General Data Protection Regulation. Mesensei is committed to the
              principles of data minimisation and Data Subject Rights. Therefore
              the use of the Mesensei mobile app does not require personally
              identifiable contact information.
            </p>
          </li>

          <li>
            PRIVACY AND DATA PROTECTION
            <p>
              When you install the application and start using it, you are asked
              to enter a nickname. If you wish to remain anonymous do not use a
              nickname, which can be associated to you.
            </p>
            <p>
              The application contacts servers used by Mesensei and your device
              is assigned an unique user id, which connects your device to your
              user account.The identifier is locked to the device you use and
              cannot be transferred to another device. Therefore, the
              application and the content you have generated cannot be
              transferred to another device. If you install the application to
              another device your nickname, message history, and stored
              favourites will not be transferred and Mesensei administration
              cannot restore them.
            </p>
            <p>
              Beyond the device identifier, Mesensei does not collect personal,
              or any other data, with the intention to identify to unique users
              personally.
            </p>
            <p>
              Message and voice communication is protected by data encryption.
              The voice calls are not recorded or stored by Mesensei. Chat
              history remains accessible on both your and your mentor’s device
              and on the servers needed for the message content relay.
            </p>
            <p>
              Please keep in mind that the mentors are acting on their own
              behalf. Mesensei does not monitor any communication between you
              and the mentors and is not responsible for the relationship you
              establish in the application, or during the event. Do not provide
              any confidential information information if you do not trust the
              other party.
            </p>
          </li>

          <li>
            ACCESS TO PHONE FEATURES
            <p>
              In order to function as intended, the application will require the
              access to the following phone features
            </p>
            <ul>
              <li>Microphone</li>
              <li>Notifications</li>
              <li>Mobile Data &amp; Wifi</li>
              <li>Storage</li>
              <li>Background Modes</li>
              <li>Photos (optional)</li>
              <li>Camera (optional)</li>
            </ul>
            <br />
          </li>

          <li id="data-policy">
            DATA STORED BY THE SERVICE
            <p className="bold-text">4.1 User Account</p>
            <p>
              The following data will be stored on the servers in association of
              your user account:
            </p>
            <ul>
              <li>Nickname you have provided</li>
              <li>
                Synthetic identifier, which a user account is associated to an
                individual mobile device
              </li>
            </ul>
            <p>You can additionally provide the following optional data:</p>
            <ul>
              <li>Gender</li>
            </ul>
            <p className="bold-text">4.2. Transactional technical data</p>
            <ul>
              <li>
                Technical information about between your device and the
                communication with the server (e.g. software version, phone
                model, timestamps)
              </li>
              <li>The search terms you have used</li>
              <li>The number of mentors you have contacted</li>
              <li>
                The number and the duration of the phone calls you have made and
                received
              </li>
              <li>The number of messages you have sent and received</li>
              <li>The content of the messages</li>
              <li>The recommendations you have given</li>
              <li>The favourites you have added</li>
            </ul>
            <br />
          </li>

          <li>
            HOW WE USE THE INFORMATION WE GATHER
            <p>
              Mesensei uses the data collected and described in the section 4 to
              provide you with the service. Additionally the data can be used
              for the development of products and services, for scientific and
              academic study and statistical analysis.
            </p>
            <p>
              The data can also be used for targeted content to provide you with
              personalised content. Mesensei reserves the right to combine the
              data collected in Mesensei Mobile Application with other relevant
              data associated with Mesensei hosted services, events, programs,
              and other activities collected under the same, or similar, privacy
              policy.
            </p>
            <p>
              The uniques identifier of your device can be used to target the
              mobile application with push notifications. The communication can
              include, but is not restricted to event information, personalised
              recommendations, customer relations communication, marketing,
              feedback, research, etc.
            </p>
          </li>

          <li>
            SERVICE PROVIDER CONTACT INFORMATION
            <p>
              The service provider is Mesensei Oy (FI27838022), Ensi Linja 1,
              00530, Helsinki, Finland. To find out more about your rights or
              privacy, please contact the Customer Support at hello@mesensei.com
            </p>
          </li>

          <li>
            UPDATES
            <p>
              This Privacy Policy is valid until further notice beginning from
              12.9.2017. Mesensei reserves all the rights to update this policy.
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
);

export default PrivacyPolicyScreen;
