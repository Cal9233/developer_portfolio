import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BgAnimation = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background: linear-gradient(to bottom right, #0f172a, #1e293b);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    animation: rotate 30s linear infinite;
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Shape = styled.div<{ $delay: number; $top?: string; $left?: string; $right?: string; $bottom?: string; $size: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 50%;
  filter: blur(40px);
  animation: float 20s infinite ease-in-out;
  animation-delay: ${props => props.$delay}s;
  ${props => props.$top && `top: ${props.$top};`}
  ${props => props.$left && `left: ${props.$left};`}
  ${props => props.$right && `right: ${props.$right};`}
  ${props => props.$bottom && `bottom: ${props.$bottom};`}
`;

const Particles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;


const Background: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 15 + Math.random() * 10
      });
    }

    if (particlesRef.current) {
      particles.forEach(particle => {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.width = '4px';
        el.style.height = '4px';
        el.style.background = 'rgba(59, 130, 246, 0.5)';
        el.style.borderRadius = '50%';
        el.style.left = `${particle.left}%`;
        el.style.animation = `particle-float ${particle.duration}s infinite linear`;
        el.style.animationDelay = `${particle.delay}s`;
        particlesRef.current?.appendChild(el);
      });
    }
  }, []);

  return (
    <>
      <BgAnimation>
        <FloatingShapes>
          <Shape $size={300} $top="20%" $left="10%" $delay={0} />
          <Shape $size={200} $top="60%" $right="10%" $delay={5} />
          <Shape $size={250} $bottom="10%" $left="50%" $delay={10} />
        </FloatingShapes>
      </BgAnimation>
      <Particles ref={particlesRef} />
    </>
  );
};

export default Background;