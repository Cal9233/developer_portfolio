import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
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

const ContactSubtitle = styled.p`
  margin-bottom: 2rem;
  color: var(--gray);
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 0.5rem;
  color: var(--light);
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 0.5rem;
  color: var(--light);
  font-family: inherit;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled.button<{ $loading?: boolean }>`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  background: ${props => props.$loading ? 'var(--gray)' : 'var(--primary)'};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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
    width: ${props => props.$loading ? '0' : '300px'};
    height: ${props => props.$loading ? '0' : '300px'};
  }

  &:hover {
    background: ${props => props.$loading ? 'var(--gray)' : 'var(--primary-dark)'};
    transform: ${props => props.$loading ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$loading ? 'none' : '0 10px 20px rgba(59, 130, 246, 0.3)'};
  }
`;

const StatusMessage = styled.div<{ $type: 'success' | 'error' }>`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${props => props.$type === 'success' 
    ? 'rgba(34, 197, 94, 0.1)' 
    : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.$type === 'success' 
    ? '#22c55e' 
    : '#ef4444'};
  border: 1px solid ${props => props.$type === 'success' 
    ? 'rgba(34, 197, 94, 0.3)' 
    : 'rgba(239, 68, 68, 0.3)'};
`;

const SetupInstructions = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.5rem;
  text-align: left;
  
  h4 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
  
  ol {
    margin-left: 1.5rem;
    color: var(--gray);
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  code {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
  }
`;

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setStatus(null);

  try {
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus({
        type: 'error',
        message: 'Email service not configured. Please check environment variables.'
      });
      setIsLoading(false);
      return;
    }

    // Send email using EmailJS - Updated template params to match your template
    const templateParams = {
      title: "New Website Contact Form Submission",
      name: formData.name,
      name_initial: formData.name.charAt(0).toUpperCase(),
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email error:', error);
    setStatus({
      type: 'error',
      message: 'Failed to send message. Please try again or email directly.'
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  console.log(formData)

  return (
    <ContactSection id="contact">
      <SectionTitle>Let's Connect</SectionTitle>
      <ContactSubtitle>Currently seeking Ruby collaborations and MySQL assistance!</ContactSubtitle>
      <ContactForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Let's talk about Ruby, MySQL, or any exciting project!"
            required
          />
        </FormGroup>
        <SubmitButton type="submit" $loading={isLoading} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </SubmitButton>
        
        {status && (
          <StatusMessage $type={status.type}>
            {status.message}
          </StatusMessage>
        )}
      </ContactForm>

      {(!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) && (
        <SetupInstructions>
          <h4>📧 EmailJS Setup Instructions:</h4>
          <ol>
            <li>Go to <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer">EmailJS.com</a> and create a free account</li>
            <li>Add Gmail as an email service (you'll connect your Gmail account)</li>
            <li>Create an email template with these variables: <code>from_name</code>, <code>from_email</code>, <code>message</code></li>
            <li>Get your Service ID, Template ID, and Public Key from the EmailJS dashboard</li>
            <li>Replace the placeholder values in this file:
              <ul>
                <li><code>EMAILJS_SERVICE_ID</code> (starts with "service_")</li>
                <li><code>EMAILJS_TEMPLATE_ID</code> (starts with "template_")</li>
                <li><code>EMAILJS_PUBLIC_KEY</code> (your public key)</li>
              </ul>
            </li>
            <li>Rebuild and redeploy the app</li>
          </ol>
        </SetupInstructions>
      )}
    </ContactSection>
  );
};

export default Contact;