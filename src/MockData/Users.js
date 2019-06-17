import userAvatar from '../assets/youngBoyAvatar.png';
import avatarBoy from '../assets/img_avatar_boy.png';
import userAvatarWomen from '../assets/img_avatar_women.png';
import doc_emiliaAvatar from '../assets/doc_emilia_avatar.png';

export default [
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
    isMentorUser: true,
    is_favourite: false
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
      'Football is my life! I’m a professional football player and a junior coach',
    isMentorUser: false
  },
  {
    id: 4,
    userProfileImage: userAvatarWomen,
    userActiveStatus: 'offline',
    userName: 'Yeo',
    profession: '',
    userBiography:
      'I’m the marketing manager and co-founder of Sisters in Business and',
    isMentorUser: false
  },
  {
    id: 5,
    userProfileImage: userAvatar,
    userActiveStatus: 'active',
    userName: 'John',
    profession: '',
    userBiography:
      'I’m a award winning designer. If you need tutoring for art studies',
    isMentorUser: false
  },
  {
    id: 6,
    userProfileImage: avatarBoy,
    userActiveStatus: 'active',
    userName: 'Oscar',
    profession: '',
    userBiography:
      'Oscar graduated in 2003 with a BA in Engineering and is an active alumni',
    isMentorUser: false
  },
  {
    id: 7,
    userProfileImage: userAvatarWomen,
    userActiveStatus: 'active',
    userName: 'Maj-Lis',
    profession: '',
    userBiography:
      'Football is my life! I’m a professional football player and a junior coach',
    isMentorUser: false
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
      }
    ],
    isMentorUser: false
  }
];
