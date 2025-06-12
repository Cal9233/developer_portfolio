import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from '../types';

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${props => props.$scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)'};
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  ${props => props.$scrolled && 'box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);'}
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: logo-pulse 2s ease-in-out infinite;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinkItem = styled.a`
  color: var(--light);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#sandbox', label: 'Sandbox' },
  { href: '#contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Nav $scrolled={scrolled}>
      <NavContainer>
        <Logo>CM</Logo>
        <NavLinks>
          {navLinks.map(link => (
            <li key={link.href}>
              <NavLinkItem 
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </NavLinkItem>
            </li>
          ))}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;