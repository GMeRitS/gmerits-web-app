import startupRefugees from '../assets/stratuprefugees.png';
import userAvatar from '../assets/youngBoyAvatar.png';
import avatarBoy from '../assets/img_avatar_boy.png';
import userAvatarWomen from '../assets/img_avatar_women.png';

export default [
  {
    id: 1,
    organizationName: 'CHANNEL XYZ',
    organizationImage: startupRefugees,
    usersWithinOrganization: [
      {
        id: 1,
        userProfileImage: userAvatar,
        userActiveStatus: 'active',
        userName: 'Mia',
        profession: '',
        userBiography:
          'I’m a award winning designer. If you need tutoring for art studies',
        organization: [
          {
            id: 1,
            organizationName: 'Channel XYZ'
          },
          {
            id: 2,
            organizationName: 'Mesensei'
          }
        ],
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
        ]
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
      },
      {
        id: 4,
        userProfileImage: userAvatarWomen,
        userActiveStatus: 'offline',
        userName: 'Yeo',
        profession: '',
        userBiography:
          'I’m the marketing manager and co-founder of Sisters in Business and'
      }
    ]
  }
];
