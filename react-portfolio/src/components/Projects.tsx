import { useRef } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { Project } from '../types';

const ProjectsSection = styled.section`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div<{ $delay: number }>`
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  transform: translateY(20px);
  opacity: 0;
  animation: slideUp 0.6s ease forwards;
  animation-delay: ${props => props.$delay}s;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 30px 60px rgba(59, 130, 246, 0.3);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background: var(--gradient);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  opacity: 0.5;

  &::after {
    content: attr(data-emoji);
    animation: bounce 2s ease-in-out infinite;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: var(--gray);
  margin-bottom: 1rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(59, 130, 246, 0.2);
  color: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.3);
    transform: scale(1.05);
  }
`;

const ProjectLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-dark);
    transform: translateX(3px);
  }
`;

const projectsData: Project[] = [
  {
    id: 'pdf-converter',
    title: 'PDF Converting Tool',
    description: 'A comprehensive Python-based tool for converting and processing PDF files with Excel export capabilities. Features batch processing and multiple format support.',
    emoji: '📄',
    technologies: ['Python', 'PDF Processing', 'Excel'],
    links: {
      github: 'https://github.com/Cal9233/pdf_converting'
    }
  },
  {
    id: 'xiobook',
    title: 'XioBook Tool',
    description: 'A TypeScript-powered web application deployed on Vercel. Modern, responsive design with real-time features and excellent user experience.',
    emoji: '📚',
    technologies: ['TypeScript', 'Vercel', 'Web App'],
    links: {
      demo: 'https://xiobook-tool.vercel.app',
      github: 'https://github.com/Cal9233/xiobook_tool'
    }
  },
  {
    id: 'masters',
    title: 'Masters Program',
    description: 'Educational platform with comprehensive HTML structure and modern web development practices. Features interactive learning modules and progress tracking.',
    emoji: '🎓',
    technologies: ['HTML', 'JavaScript', 'Education'],
    links: {
      github: 'https://github.com/Cal9233/Masters_Program'
    }
  }
];

const Projects: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { ref } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    card.style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg) translateY(-10px) scale(1.02)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    }
  };

  return (
    <ProjectsSection id="projects" ref={ref}>
      <SectionTitle>Featured Projects</SectionTitle>
      <ProjectsGrid>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            $delay={index * 0.1}
            ref={el => cardRefs.current[index] = el}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <ProjectImage data-emoji={project.emoji} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTech>
                {project.technologies.map(tech => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </ProjectTech>
              <ProjectLinks>
                {project.links.demo && (
                  <ProjectLink href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    Live Demo →
                  </ProjectLink>
                )}
                {project.links.github && (
                  <ProjectLink href={project.links.github} target="_blank" rel="noopener noreferrer">
                    {project.links.demo ? 'GitHub' : 'View on GitHub'} →
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;