import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { SandboxProject } from '../types';

const SandboxSection = styled.section`
  padding: 5rem 2rem;
  background: rgba(30, 41, 59, 0.3);
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

const SectionSubtitle = styled.p`
  text-align: center;
  color: var(--gray);
  font-size: 1.2rem;
  margin-bottom: 3rem;
`;

const SandboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SandboxCard = styled.div`
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease forwards;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(59, 130, 246, 0.3);
    border-color: var(--primary);
  }
`;

const SandboxPreview = styled.div`
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.5);
`;

const BrowserMockup = styled.div`
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const BrowserBar = styled.div`
  background: #0f172a;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BrowserDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

const BrowserUrl = styled.div`
  flex: 1;
  background: #1e293b;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--gray);
`;

const BrowserContent = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
`;

const PreviewImage = styled.div`
  font-size: 4rem;
  opacity: 0.5;
  animation: float 3s ease-in-out infinite;

  &::after {
    content: attr(data-emoji);
  }
`;

const SandboxContent = styled.div`
  padding: 2rem;
`;

const SandboxTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--light);
`;

const SandboxDescription = styled.p`
  color: var(--gray);
  margin-bottom: 1.5rem;
  line-height: 1.8;
`;

const SandboxFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FeatureTag = styled.span`
  background: rgba(139, 92, 246, 0.2);
  color: var(--secondary);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const SandboxTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
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

const SandboxLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SandboxLink = styled.a<{ $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  border: 2px solid rgba(59, 130, 246, 0.2);
  color: var(--primary);

  ${props => props.$primary && `
    background: var(--gradient);
    color: white;
    border: none;
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$primary 
      ? '0 10px 20px rgba(59, 130, 246, 0.4)' 
      : '0 5px 15px rgba(59, 130, 246, 0.3)'};
  }
`;

const sandboxProjects: SandboxProject[] = [
  {
    id: 'fitness-trainer',
    title: 'FitLife Pro - Personal Trainer Website',
    subtitle: 'fitlifepro.com',
    description: 'A modern fitness website with client signup forms, service showcases, transformation galleries, and email integration. Built with cutting-edge design trends for 2024.',
    emoji: '💪',
    url: 'fitlifepro.com',
    features: ['📱 Responsive Design', '📧 Email Integration', '📊 Analytics Ready', '🎯 Conversion Optimized'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Forms API'],
    links: {
      demo: '/sandbox/fitness-trainer/',
      secondary: {
        text: '💬 Discuss Project',
        href: '#contact'
      }
    }
  },
  {
    id: 'dnd-campaign',
    title: 'LuesHub D&D - Campaign Manager',
    subtitle: 'dnd.lueshub.com',
    description: 'A comprehensive Dungeons & Dragons web application featuring character sheets, dice rollers, spell management, campaign tracking, and ambient music. Built for both players and Dungeon Masters.',
    emoji: '🎲',
    url: 'dnd.lueshub.com',
    features: ['🧙‍♂️ Character Sheets', '🎲 3D Dice Roller', '📚 Spell Database', '🎵 Ambient Music'],
    technologies: ['JavaScript', 'PHP', 'MySQL', 'Three.js'],
    links: {
      demo: '/sandbox/dnd-campaign/current-dnd/',
      secondary: {
        text: '📂 View Code',
        href: 'https://github.com/Cal9233/lueshub_dnd'
      }
    }
  },
  {
    id: 'lg-alcesa',
    title: 'LG ALCESA Corp. - Construction Services',
    subtitle: 'lgalcesa.com',
    description: 'Professional construction company website featuring comprehensive services for residential and commercial projects. Showcases exterior/interior work, painting, and general contracting with modern, responsive design.',
    emoji: '🏗️',
    url: 'lgalcesa.com',
    features: ['🏠 Residential & Commercial', '🔨 Full Service', '📱 Mobile Responsive', '📞 Contact Forms'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    links: {
      demo: '/sandbox/lg-alcesa-construction/',
      secondary: {
        text: '📧 Get Quote',
        href: '#contact'
      }
    }
  }
];

const Sandbox: React.FC = () => {
  const { ref } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <SandboxSection id="sandbox" ref={ref}>
      <SectionTitle>Sandbox - Live Projects</SectionTitle>
      <SectionSubtitle>Interactive demos showcasing full-stack development capabilities</SectionSubtitle>
      <SandboxGrid>
        {sandboxProjects.map(project => (
          <SandboxCard key={project.id}>
            <SandboxPreview>
              <BrowserMockup>
                <BrowserBar>
                  <BrowserDots>
                    <Dot $color="#ef4444" />
                    <Dot $color="#f59e0b" />
                    <Dot $color="#10b981" />
                  </BrowserDots>
                  <BrowserUrl>{project.url}</BrowserUrl>
                </BrowserBar>
                <BrowserContent>
                  <PreviewImage data-emoji={project.emoji} />
                </BrowserContent>
              </BrowserMockup>
            </SandboxPreview>
            <SandboxContent>
              <SandboxTitle>{project.title}</SandboxTitle>
              <SandboxDescription>{project.description}</SandboxDescription>
              <SandboxFeatures>
                {project.features.map(feature => (
                  <FeatureTag key={feature}>{feature}</FeatureTag>
                ))}
              </SandboxFeatures>
              <SandboxTech>
                {project.technologies.map(tech => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </SandboxTech>
              <SandboxLinks>
                <SandboxLink 
                  href={project.links.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $primary
                >
                  {project.id === 'dnd-campaign' ? '🎮 Play Now' : project.id === 'lg-alcesa' ? '🏗️ View Website' : '🚀 Launch Demo'}
                </SandboxLink>
                {project.links.secondary && (
                  <SandboxLink 
                    href={project.links.secondary.href}
                    target={project.links.secondary.href.startsWith('#') ? undefined : '_blank'}
                    rel={project.links.secondary.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                  >
                    {project.links.secondary.text}
                  </SandboxLink>
                )}
              </SandboxLinks>
            </SandboxContent>
          </SandboxCard>
        ))}
      </SandboxGrid>
    </SandboxSection>
  );
};

export default Sandbox;