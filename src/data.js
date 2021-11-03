import {
  awsLogo,
  dscLogo,
  firebaseLogo,
  hoohoop,
  hoohoopLogo,
  iosd,
  iosdLogo,
  mongodbLogo,
  monktree,
  monktreeLogo,
  nodejsLogo,
  poll,
  pracify,
  pracifyLogo,
  reactjsLogo,
  reduxLogo,
  angularLogo,
  razorpayLogo,
  egjsLogo,
  paypalLogo,
  materialLogo,
  socketioLogo,
  herokuLogo,
} from "./Assets";

const data = {
  internships: [
    {
      name: "HooHoop",
      description:
        "HooHoop is the first company in NZ to offer this 360 virtual experience and by doing so saves plenty of time.",
      image: hoohoopLogo,
    },
    {
      name: "Pracify",
      description:
        "Pracify helps companies scale on-demand by connecting them to a network of selected and trained gig workers for performing easily doable task-based jobs on a pay-per-performance system.",
      image: pracifyLogo,
    },
    {
      name: "IOSD",
      description:
        "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts",
      image: iosdLogo,
    },
    {
      name: "Monktree",
      description:
        "Monktree improves student's education quality from stationary to learning, from internship to Placement.",
      image: monktreeLogo,
    },
  ],

  projects: [
    {
      name: "Pracify",
      points: [
        "Pracify helps companies scale on-demand by connecting them to a network of selected and trained gig workers for performing easily doable task-based jobs on a pay-per-performance system.",
        "Companies can directly monitor there tasks completion in real time.",
        "Users can redeem there earned rewards from there wallet anytime.",
      ],
      bgColor:"#FF2E63",
      image: pracify,
      techstack: [
        {
          logo: reactjsLogo,
          alt: "React JS",
        },
        {
          logo: nodejsLogo,
          alt: "Node JS",
        },
        {
          logo: mongodbLogo,
          alt: "Mongo DB",
        },
        {
          logo: reduxLogo,
          alt: "Redux",
        },

        {
          logo: firebaseLogo,
          alt: "Firebase",
        },

        {
          logo: awsLogo,
          alt: "aws",
        },
      ],
    },

    {
      name: "HooHoop",
      points: [
        "Hoohoop NZ is a New-Zealand-based Car Search & Deal Venture.",
        "Features like Gyroscope enabled 360° interior and 360° exterior view for cars.",
        "Anyone can add there car for selling after paying minimal amount for posting",
      ],
      image: hoohoop,
      bgColor:"#ED5A62",
      techstack: [
        {
          logo: reactjsLogo,
          alt: "React JS",
        },
        {
          logo: reduxLogo,
          alt: "Redux",
        },
        {
          logo: egjsLogo,
          alt: "egjs",
        },
        {
          logo: paypalLogo,
          alt: "paypal",
        },

        {
          logo: materialLogo,
          alt: "Material UI",
        },
      ],
    },

    {
      name: "IOSD ",
      points: [
        "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts.",
        "Anyone can watch the recorded lectures or playlist after paying subscription fee",
        "Student's can get regular updates about what IOSD is planning in different colleges",
        "Every college activities were updated by their college IOSD council members",
      ],
      image: iosd,
      bgColor:"#49A9FF",
      techstack: [
        {
          logo: angularLogo,
          alt: "Angular JS",
        },
        {
          logo: nodejsLogo,
          alt: "Node JS",
        },
        {
          logo: mongodbLogo,
          alt: "Mongo DB",
        },
        {
          logo: razorpayLogo,
          alt: "Razorpay",
        },

        {
          logo: awsLogo,
          alt: "aws",
        },
      ],
    },

    {
      name: "Monktree",
      points: [
        "Monktree improves student's education quality from stationary to learning, from internship to Placement.",
        "Anyone can get access to all these features after paying the subscription fee",
      ],
      image: monktree,
      bgColor:"#ED5A62",
      techstack: [
        {
          logo: reactjsLogo,
          alt: "React JS",
        },
        {
          logo: nodejsLogo,
          alt: "Node JS",
        },
        {
          logo: mongodbLogo,
          alt: "Mongo DB",
        },
        {
          logo: reduxLogo,
          alt: "Redux",
        },

        {
          logo: firebaseLogo,
          alt: "Firebase",
        },

        {
          logo: awsLogo,
          alt: "aws",
        },
      ],
    },

    {
      name: "Real Time Poll",
      points: [
        "Real Time Polling system build on top of web sockets.",
        "User's can create or vote on a poll anonymously.",
        "Anyone can see the poll results instantly.",
      ],
      image: poll,
      bgColor:"#9976E9",
      techstack: [
        {
          logo: reactjsLogo,
          alt: "React JS",
        },
        {
          logo: nodejsLogo,
          alt: "Node JS",
        },
        {
          logo: mongodbLogo,
          alt: "Mongo DB",
        },
        {
          logo: reduxLogo,
          alt: "Redux",
        },

        {
          logo: socketioLogo,
          alt: "Socket IO",
        },

        {
          logo: herokuLogo,
          alt: "heroku",
        },
      ],
    },
    // {
    //   name: "Fourier Series Visualizer",
    //   points: [
    //     "Visualization of a mathematical concept fourier series",
    //   ],
    //   image: fourier,
    // },

    // {
    //   name: "Git Forker",
    //   points: [
    //     "Real Time Polling system build on top of web sockets.",
    //     "User's can create or vote on a poll anonymously.",
    //     "Anyone can see the poll results instantly.",
    //   ],
    //   image: gitforker,
    // },

    // {
    //   name: "Read Speak",
    //   points: [
    //     "Real Time Polling system build on top of web sockets.",
    //     "User's can create or vote on a poll anonymously.",
    //     "Anyone can see the poll results instantly.",
    //   ],
    //   image: poll,
    // },
  ],
  education: [
    {
      degree: "Bachelors In Technology",
      duration: "2019 - 2022",
      branch: "Information Technology",
      college: "Maharaja Agrasen Institute of Technology",
    },
    {
      degree: "Diploma",
      duration: "2016 - 2019",
      branch: "Computer Science",
      college: "Guru Nanak Dev Institute of Technology",
    },
  ],
  communities: [
    {
      name: "Developer Student Clubs",
      description:
        "Developer Student Clubs is university based community groups for students interested in Google developer and latest technologies.",
      image: dscLogo,
    },
    {
      name: "International Organization of Software Developers",
      description:
        "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts",
      image: iosdLogo,
    },

    // {
    //   name: "Mini Troika",
    //   description:
    //     "IOSD helps student's in improving there coding skills by building open source projects and teaching programming concepts",
    //   image: minitroika,
    // },
  ],
};

export default data;
