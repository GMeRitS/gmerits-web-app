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
    userDescription:
      'I’m a award winning designer. If you need tutoring for art studies',
    organization:[
      'Mesensei', 'Mesensei x Marsu'
    ],
    userTopics: [
      {
        id: 1,
        numberOfEndorsement: '174',
        skill: 'BioChemistry',
        voteStatus: "voted"
      },
      {
        id: 2,
        numberOfEndorsement: '154',
        skill: 'Biofuels'
      },
      {
        id: 3,
        numberOfEndorsement: '1',
        skill: 'Industrial-academic',
      },
      {
        id: 4,
        numberOfEndorsement: '2',
        skill: 'Science communication',
      },
      {
        id: 5,
        numberOfEndorsement: '3',
        skill: 'Entrepreneurship',
        voteStatus: "voted"
      },
      {
        id: 6,
        numberOfEndorsement: '0',
        skill: 'Industrial-academic',
      }
    ]
  },
  {
    id: 2,
    userProfileImage: avatarBoy,
    userActiveStatus: 'active',
    userName: 'Tom',
    profession: '',
    userDescription:
      'Tom graduated in 2003 with a BA in Engineering and is an active alumni '
  },
  {
    id: 3,
    userProfileImage: userAvatar,
    userActiveStatus: 'active',
    userName: 'Zharif',
    profession: '',
    userDescription:
      'Football is my life! I’m a professional football player and a junior coach'
  },
  {
    id: 4,
    userProfileImage: userAvatarWomen,
    userActiveStatus: 'offline',
    userName: 'Yeo',
    profession: '',
    userDescription:
      'I’m the marketing manager and co-founder of Sisters in Business and'
  },
  {
    id: 5,
    userProfileImage: userAvatar,
    userActiveStatus: 'active',
    userName: 'John',
    profession: '',
    userDescription:
      'I’m a award winning designer. If you need tutoring for art studies'
  },
  {
    id: 6,
    userProfileImage: avatarBoy,
    userActiveStatus: 'active',
    userName: 'Oscar',
    profession: '',
    userDescription:
      'Oscar graduated in 2003 with a BA in Engineering and is an active alumni'
  },
  {
    id: 7,
    userProfileImage: userAvatarWomen,
    userActiveStatus: 'active',
    userName: 'Maj-Lis',
    profession: '',
    userDescription:
      'Football is my life! I’m a professional football player and a junior coach'
  },
  {
    id: 8,
    userProfileImage: doc_emiliaAvatar,
    userActiveStatus: 'active',
    userName: 'Doc Emilia',
    profession: 'postdoc',
    userDescription:
      "I'm RSE Enterprise Fellow in the Biochemistry Department in Cambridge and a GFC Fellow in Innovation & Entrepreneurship at the Worldddd",
    organization:[
      'University', 'Alumni Network'
    ],
    userTopics: [
      {
        id: 1,
        numberOfEndorsement: '174',
        skill: 'BioChemistry',
        voteStatus: "voted"
      },
      {
        id: 2,
        numberOfEndorsement: '154',
        skill: 'Biofuels'
      },
      {
        id: 3,
        numberOfEndorsement: '174',
        skill: 'Industrial-academic',
      },
      {
        id: 4,
        numberOfEndorsement: '174',
        skill: 'Science communication',
      },
      {
        id: 5,
        numberOfEndorsement: '174',
        skill: 'Entrepreneurship',
        voteStatus: "voted"
      },
      {
        id: 6,
        numberOfEndorsement: '174',
        skill: 'Industrial-academic',
      }
    ]
  }
];
