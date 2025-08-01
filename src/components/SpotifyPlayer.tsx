import React, { useState } from 'react';
import styled from 'styled-components';

interface SpotifyPlayerProps {
  // For now, we'll use mock data, but this could be connected to Spotify Web API later
}

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #000000;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

const PlayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PlayerTitle = styled.h4`
  margin: 0;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
`;

const SpotifyLogo = styled.div`
  color: #FF4444;
  font-size: 1.2rem;
  font-weight: bold;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const AlbumArt = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #FF4444, #ff6666);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.5rem;
`;

const TrackDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackName = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtistName = styled.div`
  color: #888888;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #333333;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: #FF4444;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: #888888;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button<{ isPlay?: boolean }>`
  background: ${props => props.isPlay ? '#FF4444' : 'transparent'};
  border: 1px solid ${props => props.isPlay ? '#FF4444' : '#666666'};
  color: #ffffff;
  width: ${props => props.isPlay ? '40px' : '32px'};
  height: ${props => props.isPlay ? '40px' : '32px'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${props => props.isPlay ? '1.2rem' : '1rem'};

  &:hover {
    background: ${props => props.isPlay ? '#ff6666' : '#333333'};
    border-color: ${props => props.isPlay ? '#ff6666' : '#888888'};
    transform: scale(1.05);
  }
`;

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Wrapper functions to ensure clean integer values when setting state
  const setCleanCurrentTime = (value: number) => {
    setCurrentTime(toCleanInteger(value));
  };

  const setCleanDuration = (value: number) => {
    setDuration(toCleanInteger(value));
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = localStorage.getItem('spotify-access-token');

  // Mock data for when Spotify API is not available
  const mockTrack = {
    name: 'Eenie Meenie',
    artists: [{ name: 'Sean Kingston' }],
    album: {
      images: [{ url: 'https://via.placeholder.com/60x60/FF4444/FFFFFF?text=♪' }]
    }
  };

  // Helper function to ensure clean integer values
  const toCleanInteger = (value: number): number => {
    // Force conversion to integer by truncating and ensuring no decimal parts
    return Math.floor(Math.abs(value));
  };

  const formatTime = (seconds: number): string => {
    // Ensure we have a clean integer value
    const cleanSeconds = toCleanInteger(seconds);
    const mins = Math.floor(cleanSeconds / 60);
    const secs = cleanSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  // Fetch current playback state
  const fetchCurrentPlayback = async () => {
    if (!accessToken) {
      // Use mock data if no access token
      setCurrentTrack(mockTrack);
      setCleanCurrentTime(36); // Start at 0:36 to match the image
      setCleanDuration(201); // 3:21 in seconds (3*60 + 21 = 201)
      return;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.item) {
          setIsPlaying(data.is_playing);
          setCurrentTrack(data.item);
          setCleanCurrentTime(data.progress_ms / 1000);
          setCleanDuration(data.item.duration_ms / 1000);
          setError(null);
        } else {
          // Use mock data if no active playback
          setCurrentTrack(mockTrack);
          setCleanCurrentTime(36);
          setCleanDuration(201);
          setError(null);
        }
      } else if (response.status === 401) {
        console.error('Spotify token expired or invalid. Using mock data.');
        setCurrentTrack(mockTrack);
        setCleanCurrentTime(36);
        setCleanDuration(201);
        setError('Token expired - using demo mode');
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching playback state:', error);
      // Use mock data on error
      setCurrentTrack(mockTrack);
      setCleanCurrentTime(36);
      setCleanDuration(201);
      setError('Connection error - using demo mode');
    }
  };

  // Control playback
  const controlPlayback = async (action: string) => {
    if (!accessToken) {
      // Mock functionality when no access token
      if (action === 'play') {
        setIsPlaying(true);
      } else if (action === 'pause') {
        setIsPlaying(false);
      } else if (action === 'next') {
        setCleanCurrentTime(0);
        setCurrentTrack(mockTrack);
      } else if (action === 'previous') {
        setCleanCurrentTime(0);
        setCurrentTrack(mockTrack);
      }
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (response.ok) {
        // Refresh playback state
        setTimeout(fetchCurrentPlayback, 500);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error(`Error ${action} playback:`, error);
      setError(`Failed to ${action} - check Spotify connection`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      controlPlayback('pause');
    } else {
      controlPlayback('play');
    }
  };

  const skipPrevious = () => {
    controlPlayback('previous');
  };

  const skipNext = () => {
    controlPlayback('next');
  };

  // Update progress every second
  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCleanCurrentTime(currentTime + 1);
        // Reset to 0 if we reach the end
        if (currentTime + 1 >= duration) {
          setCleanCurrentTime(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  // Fetch initial playback state
  React.useEffect(() => {
    fetchCurrentPlayback();
    const interval = setInterval(fetchCurrentPlayback, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <PlayerContainer>
      <PlayerHeader>
        <PlayerTitle>Now Playing</PlayerTitle>
        <SpotifyLogo>♪</SpotifyLogo>
      </PlayerHeader>

      {error && (
        <div style={{ 
          color: '#FF4444', 
          fontSize: '0.7rem', 
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <TrackInfo>
        <AlbumArt>
          {currentTrack?.album?.images?.[0]?.url ? (
            <img 
              src={currentTrack.album.images[0].url} 
              alt="Album Art"
              style={{ width: '100%', height: '100%', borderRadius: '4px', objectFit: 'cover' }}
            />
          ) : (
            '♪'
          )}
        </AlbumArt>
        <TrackDetails>
          <TrackName>{currentTrack?.name || 'No track playing'}</TrackName>
          <ArtistName>{currentTrack?.artists?.[0]?.name || 'Unknown Artist'}</ArtistName>
        </TrackDetails>
      </TrackInfo>

      <ProgressContainer>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <TimeInfo>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </TimeInfo>
      </ProgressContainer>

      <Controls>
        <ControlButton onClick={skipPrevious} disabled={isLoading}>
          ⏮
        </ControlButton>
        <ControlButton isPlay onClick={togglePlay} disabled={isLoading}>
          {isLoading ? '⋯' : (isPlaying ? '⏸' : '▶')}
        </ControlButton>
        <ControlButton onClick={skipNext} disabled={isLoading}>
          ⏭
        </ControlButton>
      </Controls>
    </PlayerContainer>
  );
};

export default SpotifyPlayer; 