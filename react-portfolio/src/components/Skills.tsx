import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { Skill } from '../types';

const SkillsSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: var(--gradient);
    border-radius: 2px;
    animation: width-pulse 2s ease-in-out infinite;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled.div<{ $delay: number }>`
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
  animation: slideUp 0.6s ease forwards;
  animation-delay: ${props => props.$delay}s;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkillName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const SkillLevel = styled.span`
  color: var(--primary);
  font-weight: 700;
`;

const SkillBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const SkillProgress = styled.div<{ $width: number; $animate: boolean }>`
  height: 100%;
  background: var(--gradient);
  border-radius: 4px;
  transition: width 1.5s ease;
  width: ${props => props.$animate ? `${props.$width}%` : '0'};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span<{ $isRuby?: boolean }>`
  background: ${props => props.$isRuby ? 'rgba(204, 52, 45, 0.2)' : 'rgba(59, 130, 246, 0.2)'};
  color: ${props => props.$isRuby ? 'var(--ruby)' : 'var(--primary)'};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$isRuby ? 'rgba(204, 52, 45, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
    transform: scale(1.05);
  }
`;

const skillsData: Skill[] = [
  {
    name: 'Frontend Development',
    level: 95,
    tags: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS']
  },
  {
    name: 'Backend Development',
    level: 90,
    tags: ['Python', 'Node.js', 'MySQL', 'Ruby (Learning)'],
    isRuby: true
  },
  {
    name: 'Tools & Technologies',
    level: 85,
    tags: ['Git/GitHub', 'Docker', 'Vercel', 'CI/CD']
  },
  {
    name: 'Current Projects',
    level: 100,
    tags: ['genthrust.org', 'PDF Tools', 'Web Apps']
  }
];

const Skills: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <SkillsSection id="skills" ref={ref}>
      <SectionTitle>Technical Expertise</SectionTitle>
      <SkillsGrid>
        {skillsData.map((skill, index) => (
          <SkillCard key={skill.name} $delay={index * 0.1}>
            <SkillHeader>
              <SkillName>{skill.name}</SkillName>
              <SkillLevel>{skill.level}%</SkillLevel>
            </SkillHeader>
            <SkillBar>
              <SkillProgress $width={skill.level} $animate={inView} />
            </SkillBar>
            <SkillTags>
              {skill.tags.map(tag => (
                <Tag 
                  key={tag} 
                  $isRuby={skill.isRuby && tag.includes('Ruby')}
                >
                  {tag}
                </Tag>
              ))}
            </SkillTags>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills;