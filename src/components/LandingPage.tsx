import React, { useState } from 'react';
import styled from 'styled-components';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    padding-top: 1.5rem;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
    padding-top: 1rem;
  }

  @media (max-width: 320px) {
    padding: 0.25rem;
    padding-top: 0.5rem;
  }
`;

const LandingContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
  }

  @media (max-width: 360px) {
    gap: 1rem;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    order: 2;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 3.5rem;
  color: #FF4444;
  margin-bottom: 0.5rem;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }

  @media (max-width: 360px) {
    font-size: 1.75rem;
  }

  @media (max-width: 320px) {
    font-size: 1.5rem;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }

  @media (max-width: 360px) {
    font-size: 1.5rem;
  }

  @media (max-width: 320px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  color: #888888;
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const FeatureCard = styled.div`
  background: #000000;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 1.25rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #FF4444;
    background: #111111;
  }

  @media (max-width: 1024px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
    border-radius: 4px;
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #FF4444;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;

  @media (max-width: 1024px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
    border-radius: 4px;
  }

  @media (max-width: 360px) {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

const FeatureTitle = styled.h3`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;

  @media (max-width: 1024px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;

const FeatureDescription = styled.p`
  color: #888888;
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }

  @media (max-width: 360px) {
    font-size: 0.65rem;
  }
`;

const AuthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  background: #000000;
  border: 1px solid #333333;
  border-radius: 12px;

  @media (max-width: 768px) {
    order: 1;
    padding: 2rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    padding: 1rem;
    border-radius: 4px;
  }
`;

const SpotifyInfo = styled.div`
  background: #000000;
  border: 1px solid #1DB954;
  border-radius: 8px;
  padding: 1.5rem;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;

  @media (max-width: 1024px) {
    padding: 1.25rem;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 0.75rem;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    padding: 0.75rem;
    font-size: 0.7rem;
    border-radius: 4px;
  }
`;

const SpotifyTitle = styled.h3`
  color: #1DB954;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
  }
`;

const SpotifyDescription = styled.p`
  color: #888888;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;

  @media (max-width: 1024px) {
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }

  @media (max-width: 360px) {
    font-size: 0.7rem;
  }
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 100%;
  background: #000000;
  color: #1DB954;
  border: 1px solid #1DB954;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #1DB954;
    color: #ffffff;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 1024px) {
    padding: 0.875rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.625rem;
    font-size: 0.85rem;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

const DemoButton = styled.button`
  width: 100%;
  background: transparent;
  color: #888888;
  border: 1px solid #333333;
  padding: 0.875rem;
  font-size: 0.95rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #666666;
    color: #ffffff;
    background: #222222;
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 1024px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0.625rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.8rem;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    padding: 0.375rem;
    font-size: 0.75rem;
    border-radius: 4px;
  }
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #333333;
  color: #666666;
  font-size: 0.85rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
    padding-top: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-top: 0.75rem;
    padding-top: 0.5rem;
    font-size: 0.8rem;
  }
`;

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSpotifyLogin = () => {
    setIsLoading(true);
    
    // Real Spotify OAuth configuration
    const clientId = '0b64c792742d40b694c34df0eac4aacc';
    const redirectUri = encodeURIComponent('https://tomato-pomodoro.vercel.app');
    const scope = encodeURIComponent('user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private');
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&show_dialog=true`;
    
    // Store the intended redirect
    localStorage.setItem('spotify-auth-redirect', 'true');
    
    // Redirect to Spotify authorization
    window.location.href = authUrl;
  };

  const handleDemoLogin = () => {
    onLogin();
  };

  // Check if returning from Spotify auth or if already logged in
  React.useEffect(() => {
    // Check if user is already logged in
    const existingToken = localStorage.getItem('spotify-access-token');
    if (existingToken && existingToken !== 'demo-token') {
      onLogin();
      return;
    }

    // Check if returning from Spotify auth
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code && localStorage.getItem('spotify-auth-redirect')) {
      // Exchange code for token
      exchangeCodeForToken(code);
    }
  }, [onLogin]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const clientId = '0b64c792742d40b694c34df0eac4aacc';
      const clientSecret = 'ab447301bbde4714bc0e6357eebdcb79';
      
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'https://tomato-pomodoro.vercel.app'
        })
      });

      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        localStorage.setItem('spotify-access-token', tokenData.access_token);
        localStorage.removeItem('spotify-auth-redirect');
        
        // Clear the URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Login to the app
        onLogin();
      } else {
        console.error('Failed to exchange code for token');
        // Fallback to demo mode for now
        localStorage.setItem('spotify-access-token', 'demo-token');
        onLogin();
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      // Fallback to demo mode for now
      localStorage.setItem('spotify-access-token', 'demo-token');
      onLogin();
    }
  };

  return (
    <LandingContainer>
      <LandingContent>
        <HeroSection>
          <div>
            <Logo>🍅</Logo>
            <Title>Pomodoro Timer</Title>
            <Subtitle>
              Boost your productivity with focused work sessions and intelligent breaks. 
              Stay motivated and track your progress with our modern, intuitive interface.
            </Subtitle>
          </div>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>⏱</FeatureIcon>
              <FeatureTitle>Smart Timer</FeatureTitle>
              <FeatureDescription>
                Customizable Pomodoro sessions with intelligent break management
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Progress Tracking</FeatureTitle>
              <FeatureDescription>
                Visual insights into your daily productivity and focus patterns
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🎵</FeatureIcon>
              <FeatureTitle>Spotify Integration</FeatureTitle>
              <FeatureDescription>
                Control your music directly from the app for seamless focus
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>📝</FeatureIcon>
              <FeatureTitle>Task Management</FeatureTitle>
              <FeatureDescription>
                Organize and prioritize your work with our intuitive task system
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </HeroSection>

        <AuthSection>
          <SpotifyInfo>
            <SpotifyTitle>
              <span style={{ color: '#1DB954' }}>♪</span> Spotify Integration
            </SpotifyTitle>
            <SpotifyDescription>
              Connect your Spotify account to control music directly from the app and create the perfect focus environment.
            </SpotifyDescription>
          </SpotifyInfo>
          
          <LoginForm>
            <LoginButton 
              onClick={handleSpotifyLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Connecting to Spotify...' : 'Continue with Spotify'}
            </LoginButton>
            
            <DemoButton onClick={handleDemoLogin}>
              Try Demo Mode
            </DemoButton>
          </LoginForm>

          <Footer>
            <p>©tonton-dev. Tomato Pomodoro.</p>
          </Footer>
        </AuthSection>
      </LandingContent>
    </LandingContainer>
  );
};

export default LandingPage; 