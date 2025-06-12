import styled from 'styled-components';

const LoaderContainer = styled.div<{ $hidden: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease;
  opacity: ${props => props.$hidden ? 0 : 1};
  pointer-events: ${props => props.$hidden ? 'none' : 'all'};
`;

const LoaderContent = styled.div`
  text-align: center;
`;

const LoaderCircle = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(59, 130, 246, 0.2);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
`;

const LoaderText = styled.p`
  color: var(--light);
`;

interface LoaderProps {
  hidden?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ hidden = false }) => {
  return (
    <LoaderContainer $hidden={hidden}>
      <LoaderContent>
        <LoaderCircle />
        <LoaderText>Loading awesome content...</LoaderText>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default Loader;