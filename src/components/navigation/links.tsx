import {
  BookOpenTextIcon,
  CircleAlertIcon,
  HomeIcon,
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
      text: 'Sign in',
      href: '/signin',
    },
    {
      text: 'Sign up',
      href: '/signup',
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
      ],
    },
  ],
}

export const publicLinks = navigationLinks.public
export const privateLinks = navigationLinks.private
export const authLinks = navigationLinks.authentication
export default navigationLinks
