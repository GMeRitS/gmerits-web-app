import userAvatar from '../assets/youngBoyAvatar.png';
import votedIcon from '../assets/voted.png';
import notVotedIcon from '../assets/notVoted.png';
import avatarBoy from '../assets/img_avatar_boy.png';
import userAvatarWomen from '../assets/img_avatar_women.png';

export default [
  {
    id: 1,
    userProfileImage: userAvatar,
    userActiveStatus: 'active',
    userName: 'Mia',
    profession: '',
    userDescription:
      'I’m a award winning designer. If you need tutoring for art studies',
    userSkills: [
      {
        numberOfVotes: '174',
        skill: 'BioChemistry',
        voteStatus: votedIcon
      },
      {
        numberOfVotes: '154',
        skill: 'Biofuels',
        voteStatus: notVotedIcon
      },
      {
        numberOfVotes: '174',
        skill: 'Industrial-academic',
        voteStatus: notVotedIcon
      },
      {
        numberOfVotes: '174',
        skill: 'Science communication',
        voteStatus: votedIcon
      },
      {
        numberOfVotes: '174',
        skill: 'Entrepreneurship',
        voteStatus: notVotedIcon
      },
      {
        numberOfVotes: '174',
        skill: 'Industrial-academic',
        voteStatus: notVotedIcon
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
    userProfileImage: userAvatarWomen,
    userActiveStatus: 'active',
    userName: 'Doc Emilia',
    profession: 'postdoc',
    userDescription:
      "I'm RSE Enterprise Fellow in the Biochemistry Department in Cambridge and a GFC Fellow in Innovation & Entrepreneurship at the Worldddd",
    userSkills: [
      {
        numberOfVotes: '174',
        skill: 'BioChemistry',
        voteStatus: votedIcon
      },
      {
        numberOfVotes: '154',
        skill: 'Biofuels',
        voteStatus: notVotedIcon
      },
      {
        numberOfVotes: '174',
        skill: 'Industrial-academic',
        voteStatus: notVotedIcon
      },
      {
        numberOfVotes: '174',
        skill: 'Science communication',
        voteStatus: votedIcon
      },
      {
        numberOfVotes: '174',
        skill: 'Entrepreneurship',
        voteStatus: notVotedIcon
      },
      {
        numberOfVotes: '174',
        skill: 'Industrial-academic',
        voteStatus: notVotedIcon
      }
    ]
  }
];
