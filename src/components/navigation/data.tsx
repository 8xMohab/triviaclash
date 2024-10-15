import {
  BookOpenTextIcon,
  ChartAreaIcon,
  CircleAlertIcon,
  HomeIcon,
  Package2Icon,
  SettingsIcon,
  SwordsIcon,
  UserIcon,
} from 'lucide-react'
const navigationLinks = {
  public: [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'About',
      href: '/about',
    },
  ],
  authentication: [
    {
      text: 'Login',
      href: '/signin',
    },
    {
      text: 'Sign up',
      href: '/register',
    },
  ],
  private: [
    {
      title: 'Challenge',
      links: [
        {
          text: 'Start Challenge',
          href: '/challenge',
          icon: <SwordsIcon />,
        },
      ],
    },
    {
      title: 'Profile',
      links: [
        {
          text: 'View Profile',
          href: '/profile',
          icon: <UserIcon />,
        },
        {
          text: 'History',
          href: '/profile/history',
          icon: <Package2Icon />,
        },
        {
          text: 'Statistics',
          href: '/profile/statistics',
          icon: <ChartAreaIcon />,
        },
      ],
    },
    {
      title: 'TriviaClash',
      links: [
        {
          text: 'Home',
          href: '/',
          icon: <HomeIcon />,
        },
        {
          text: 'Blog',
          href: '/blog',
          icon: <BookOpenTextIcon />,
        },
        {
          text: 'About',
          href: '/about',
          icon: <CircleAlertIcon />,
        },
        {
          text: 'Settings',
          href: '/settings',
          icon: <SettingsIcon />,
        },
      ],
    },
  ],
}

export const publicLinks = navigationLinks.public
export const privateLinks = navigationLinks.private
export default navigationLinks
