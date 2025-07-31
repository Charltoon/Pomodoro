import React, { useState } from 'react';
import styled from 'styled-components';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LandingCard = styled.div`
  background: #1A1A1A;
  border: 1px solid #333333;
  border-radius: 16px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.div`
  font-size: 3rem;
  color: #FF4444;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  color: #888888;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SpotifyInfo = styled.div`
  background: linear-gradient(45deg, #1DB954, #1ed760);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  text-align: left;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #ffffff;
  font-size: 1rem;
`;

const FeatureIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #FF4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: bold;
`;

const LoginForm = styled.div`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #333333;
  background: #000000;
  color: #ffffff;
  font-size: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FF4444;
    background: #111111;
  }

  &::placeholder {
    color: #666666;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background: #FF4444;
  color: #ffffff;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #ff6666;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DemoButton = styled.button`
  width: 100%;
  background: transparent;
  color: #888888;
  border: 1px solid #333333;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    border-color: #666666;
    color: #ffffff;
    background: #222222;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333333;
  color: #666666;
  font-size: 0.9rem;
`;

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSpotifyLogin = () => {
    setIsLoading(true);
    
    // For now, use demo mode to avoid OAuth issues
    setTimeout(() => {
      localStorage.setItem('spotify-access-token', 'demo-token');
      setIsLoading(false);
      onLogin();
    }, 1500);
    
    // TODO: Enable real Spotify OAuth when HTTPS is properly configured
    /*
    // Real Spotify OAuth configuration
    const clientId = '0b64c792742d40b694c34df0eac4aacc';
    const redirectUri = encodeURIComponent('https://192.168.1.2:3000');
    const scope = encodeURIComponent('user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private');
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}&show_dialog=true`;
    
    // Store the intended redirect
    localStorage.setItem('spotify-auth-redirect', 'true');
    
    // Redirect to Spotify authorization
    window.location.href = authUrl;
    */
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
    const hash = window.location.hash;
    if (hash && localStorage.getItem('spotify-auth-redirect')) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      
      if (accessToken) {
        // Store the token
        localStorage.setItem('spotify-access-token', accessToken);
        localStorage.removeItem('spotify-auth-redirect');
        
        // Clear the URL hash
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Login to the app
        onLogin();
      }
    }
  }, [onLogin]);

  return (
    <LandingContainer>
      <LandingCard>
        <Logo>🍅</Logo>
        <Title>Pomodoro Timer</Title>
                 <Subtitle>
           Boost your productivity with focused work sessions and intelligent breaks
         </Subtitle>

         <SpotifyInfo>
           🎵 Connect your Spotify account to control music directly from the app
         </SpotifyInfo>

         <FeaturesList>
          <FeatureItem>
            <FeatureIcon>⏱</FeatureIcon>
            <span>Customizable timer sessions</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>📊</FeatureIcon>
            <span>Track your daily progress</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>📝</FeatureIcon>
            <span>Manage tasks efficiently</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>🎯</FeatureIcon>
            <span>Stay focused and motivated</span>
          </FeatureItem>
        </FeaturesList>

                 <LoginForm>
           <LoginButton 
             onClick={handleSpotifyLogin}
             disabled={isLoading}
             style={{ marginBottom: '1rem' }}
           >
             {isLoading ? 'Connecting to Spotify...' : '🎵 Login with Spotify'}
           </LoginButton>
           
           <DemoButton onClick={handleDemoLogin}>
             Try Demo Mode
           </DemoButton>
         </LoginForm>

        <Footer>
          <p>© 2024 Pomodoro Timer. Built for productivity.</p>
        </Footer>
      </LandingCard>
    </LandingContainer>
  );
};

export default LandingPage; 