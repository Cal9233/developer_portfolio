import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  animation: fadeInUp 1s ease;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient 3s ease infinite;
  background-size: 200% 200%;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: var(--gray);
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FunFact = styled.div`
  font-size: 1rem;
  color: var(--primary);
  margin-top: 1rem;
  opacity: 0;
  animation: fadeIn 2s ease 2s forwards;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.a`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  &:hover::before {
    width: 300px;
    height: 300px;
  }
`;

const PrimaryButton = styled(Button)`
  background: var(--primary);
  color: white;
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }
`;

const OutlineButton = styled(Button)`
  border: 2px solid var(--primary);
  color: var(--primary);
  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState<string>('');
  const fullText = 'Calvin Malagon';

  useEffect(() => {
    // Reset display text when component mounts
    setDisplayText('');
    
    const timer = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          const nextChar = fullText[currentIndex];
         
          // Use callback form to ensure we're working with latest state
          setDisplayText((prevText: string) => {
            const newText = prevText + nextChar;
            return newText;
          });
          
          currentIndex++;
        } else {
          console.log('Typewriter effect complete');
          clearInterval(interval);
        }
      }, 100);
      
      // Store interval ID for cleanup
      return () => clearInterval(interval);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []); // Remove fullText from dependencies since it's constant

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <HeroSection id="home">
      <HeroContent>
        <HeroTitle>{displayText}</HeroTitle>
        <HeroSubtitle>Full Stack Developer & Freelancer</HeroSubtitle>
        <FunFact>💡 Fun fact: I code standing up</FunFact>
        <HeroButtons>
          <PrimaryButton 
            href="#projects"
            onClick={(e) => handleSmoothScroll(e, '#projects')}
          >
            View My Work
          </PrimaryButton>
          <OutlineButton 
            href="https://github.com/Cal9233" 
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Profile
          </OutlineButton>
        </HeroButtons>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;