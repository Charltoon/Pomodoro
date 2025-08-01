import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';
import Settings from './components/Settings';
import TaskManager from './components/TaskManager';
import Statistics from './components/Statistics';
import Calendar from './components/Calendar';
import DailyHeatmap from './components/DailyHeatmap';
import SpotifyPlayer from './components/SpotifyPlayer';
import LandingPage from './components/LandingPage';
import Icon from './components/Icon';
import { TimerSettings, SessionType, Task, DailyStats } from './types';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  padding: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

  @media (max-width: 1024px) {
    padding: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
  }

  @media (max-width: 320px) {
    padding: 0.25rem;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333333;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  @media (max-width: 1024px) {
    margin-bottom: 1.75rem;
    padding-bottom: 0.875rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    gap: 0.75rem;
  }

  @media (max-width: 360px) {
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    gap: 0.5rem;
  }

  @media (max-width: 320px) {
    margin-bottom: 0.5rem;
    padding-bottom: 0.25rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    gap: 0.25rem;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;

  @media (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 0.5px;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    letter-spacing: 0.25px;
  }

  @media (max-width: 360px) {
    font-size: 1.1rem;
    letter-spacing: 0.25px;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
    letter-spacing: 0.25px;
  }
`;

const SettingsButton = styled.button`
  background: #000000;
  color: #ffffff;
  border: 1px solid #333333;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    background: #111111;
    border-color: #ffffff;
    transform: translateY(-1px);
  }
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }

  @media (max-width: 360px) {
    gap: 0.5rem;
  }

  @media (max-width: 320px) {
    gap: 0.25rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }

  @media (max-width: 360px) {
    gap: 0.5rem;
  }

  @media (max-width: 320px) {
    gap: 0.25rem;
  }
`;

const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }

  @media (max-width: 360px) {
    gap: 0.5rem;
  }

  @media (max-width: 320px) {
    gap: 0.25rem;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }

  @media (max-width: 360px) {
    gap: 0.5rem;
  }

  @media (max-width: 320px) {
    gap: 0.25rem;
  }
`;

const TimerSection = styled.div`
  background: #000000;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;

  @media (max-width: 1024px) {
    padding: 1.75rem;
    min-height: 450px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 400px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    min-height: 350px;
    border-radius: 8px;
  }

  @media (max-width: 360px) {
    padding: 0.75rem;
    min-height: 300px;
    border-radius: 6px;
  }

  @media (max-width: 320px) {
    padding: 0.5rem;
    min-height: 250px;
    border-radius: 4px;
  }
`;

const QuickTasksSection = styled.div`
  background: #000000;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: 1.25rem;
    min-height: 190px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 180px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    min-height: 160px;
    border-radius: 8px;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
    min-height: 140px;
    border-radius: 6px;
  }

  @media (max-width: 320px) {
    padding: 0.25rem;
    min-height: 120px;
    border-radius: 4px;
  }
`;

const CalendarSection = styled.div`
  background: #000000;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: 1.25rem;
    min-height: 190px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 180px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    min-height: 160px;
    border-radius: 8px;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
    min-height: 140px;
    border-radius: 6px;
  }

  @media (max-width: 320px) {
    padding: 0.25rem;
    min-height: 120px;
    border-radius: 4px;
  }
`;

const HeatmapSection = styled.div`
  background: #000000;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 1.5rem;
  height: 300px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: 1.25rem;
    height: 280px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    height: 250px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    height: 200px;
    border-radius: 8px;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
    height: 180px;
    border-radius: 6px;
  }

  @media (max-width: 320px) {
    padding: 0.25rem;
    height: 160px;
    border-radius: 4px;
  }
`;

const StatisticsSection = styled.div`
  background: #000000;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 1.5rem;
  height: 150px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: 1.25rem;
    height: 130px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    height: 120px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    height: 100px;
    border-radius: 8px;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
    height: 90px;
    border-radius: 6px;
  }

  @media (max-width: 320px) {
    padding: 0.25rem;
    height: 80px;
    border-radius: 4px;
  }
`;

const LogoutSection = styled.div`
  background: #000000;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 150px;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: center;
`;

const defaultSettings: TimerSettings = {
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  pomodorosBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  tickSoundEnabled: false,
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is already logged in on app start
    const token = localStorage.getItem('spotify-access-token');
    return !!token;
  });
  const [spotifyUser, setSpotifyUser] = useState<any>(null);
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('pomodoro-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [currentSession, setCurrentSession] = useState<SessionType>('pomodoro');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [totalPomodorosCompleted, setTotalPomodorosCompleted] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('pomodoro-tasks');
    return saved ? JSON.parse(saved).map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt)
    })) : [];
  });

  const [currentTaskId, setCurrentTaskId] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    date: new Date().toISOString().split('T')[0],
    pomodorosCompleted: 0,
    totalFocusTime: 0,
    tasksCompleted: 0,
  });

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  }, [settings]);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Update daily stats
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (dailyStats.date !== today) {
      setDailyStats({
        date: today,
        pomodorosCompleted: 0,
        totalFocusTime: 0,
        tasksCompleted: 0,
      });
    }
  }, [dailyStats.date]);

  const handleSessionComplete = (sessionType: SessionType) => {
    if (sessionType === 'pomodoro') {
      const newCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(newCompletedPomodoros);
      setTotalPomodorosCompleted(prev => prev + 1);
      
      // Update daily stats
      setDailyStats(prev => ({
        ...prev,
        pomodorosCompleted: prev.pomodorosCompleted + 1,
        totalFocusTime: prev.totalFocusTime + settings.pomodoroDuration,
      }));

      // Update current task if one is selected
      if (currentTaskId) {
        setTasks(prev => prev.map(task =>
          task.id === currentTaskId
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        ));
      }

      // Check if it's time for a long break
      if (newCompletedPomodoros % settings.pomodorosBeforeLongBreak === 0) {
        setCurrentSession('longBreak');
        // Increment cycle after long break
        setCurrentCycle(prev => prev + 1);
      } else {
        setCurrentSession('shortBreak');
      }
    } else {
      // Break completed, start next pomodoro
      setCurrentSession('pomodoro');
      
      // Reset completed pomodoros count after long break
      if (sessionType === 'longBreak') {
        setCompletedPomodoros(0);
      }
    }

    // Auto-start next session if enabled
    if (sessionType === 'pomodoro' && settings.autoStartBreaks) {
      // Auto-start break logic would go here
    } else if (sessionType !== 'pomodoro' && settings.autoStartPomodoros) {
      // Auto-start pomodoro logic would go here
    }

    // Play sound if enabled
    if (settings.soundEnabled) {
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.play().catch(() => {
        // Ignore errors if audio fails to play
      });
    }
  };

  const handleSettingsChange = (newSettings: TimerSettings) => {
    setSettings(newSettings);
  };

  const handleTasksChange = (newTasks: Task[]) => {
    setTasks(newTasks);
    
    // Update daily stats for completed tasks
    const completedTasks = newTasks.filter(task => task.completed).length;
    setDailyStats(prev => ({
      ...prev,
      tasksCompleted: completedTasks,
    }));
  };

  const handleTaskSelect = (taskId: string) => {
    setCurrentTaskId(taskId);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchSpotifyUser();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSpotifyUser(null);
    localStorage.removeItem('spotify-access-token');
  };

  const fetchSpotifyUser = async () => {
    const accessToken = localStorage.getItem('spotify-access-token');
    if (!accessToken || accessToken === 'demo-token') return;

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setSpotifyUser(userData);
      } else if (response.status === 401) {
        console.error('Spotify token expired or invalid. Please re-login.');
        // Clear invalid token
        localStorage.removeItem('spotify-access-token');
        setIsLoggedIn(false);
        setSpotifyUser(null);
      }
    } catch (error) {
      console.error('Error fetching Spotify user:', error);
    }
  };

  // Fetch user data on app load if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchSpotifyUser();
    }
  }, [isLoggedIn]);

  const currentTask = tasks.find(task => task.id === currentTaskId);

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <AppContainer>
      <Header>
        <Title>Pomodoro Timer</Title>
        <SettingsButton onClick={() => setShowSettings(true)}>
          <Icon name="settings" size={20} />
        </SettingsButton>
      </Header>

      {!showSettings && (
        <MainContent>
          <LeftColumn>
            <TimerSection>
              <SectionTitle>Timer</SectionTitle>
              <Timer
                settings={settings}
                onSessionComplete={handleSessionComplete}
                currentSession={currentSession}
                completedPomodoros={completedPomodoros}
                currentTask={currentTask?.title}
                currentCycle={currentCycle}
              />
            </TimerSection>
          </LeftColumn>

          <MiddleColumn>
            <QuickTasksSection>
              <SectionTitle>Quick Tasks</SectionTitle>
              <TaskManager
                tasks={tasks}
                onTasksChange={handleTasksChange}
                currentTaskId={currentTaskId}
                onTaskSelect={handleTaskSelect}
                title=""
                compact={true}
              />
            </QuickTasksSection>
            
                             <CalendarSection>
                   <SectionTitle>Calendar</SectionTitle>
                   <Calendar />
                 </CalendarSection>

                 <SpotifyPlayer />
          </MiddleColumn>

          <RightColumn>
            <HeatmapSection>
              <SectionTitle>Daily Heatmap</SectionTitle>
              <DailyHeatmap dailyStats={dailyStats} />
            </HeatmapSection>
            
            <StatisticsSection>
              <SectionTitle>Statistics</SectionTitle>
              <div style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                <div>Today's Pomodoros: {dailyStats.pomodorosCompleted}</div>
                <div>Focus Time: {dailyStats.totalFocusTime} min</div>
                <div>Tasks Completed: {dailyStats.tasksCompleted}</div>
              </div>
            </StatisticsSection>
            
                             <LogoutSection>
                   <SectionTitle>User Profile</SectionTitle>
                   <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '0.75rem',
                     marginBottom: '1rem',
                     flex: '1'
                   }}>
                     <div style={{
                       width: '40px',
                       height: '40px',
                       background: spotifyUser?.images?.[0]?.url 
                         ? 'transparent'
                         : 'linear-gradient(45deg, #FF4444, #ff6666)',
                       borderRadius: '50%',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       color: '#ffffff',
                       fontSize: '1.2rem',
                       fontWeight: 'bold',
                       overflow: 'hidden'
                     }}>
                       {spotifyUser?.images?.[0]?.url ? (
                         <img 
                           src={spotifyUser.images[0].url} 
                           alt="Profile"
                           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                         />
                       ) : (
                         spotifyUser?.display_name?.charAt(0) || 'U'
                       )}
                     </div>
                     <div>
                       <div style={{
                         color: '#ffffff',
                         fontSize: '0.9rem',
                         fontWeight: '600'
                       }}>
                         {spotifyUser?.display_name || 'User'}
                       </div>
                       <div style={{
                         color: '#888888',
                         fontSize: '0.8rem'
                       }}>
                         {spotifyUser?.email || 'user@spotify.com'}
                       </div>
                     </div>
                   </div>
                   <button
                     onClick={handleLogout}
                     style={{
                       background: '#FF4444',
                       color: '#ffffff',
                       border: 'none',
                       padding: '0.75rem 1.5rem',
                       borderRadius: '6px',
                       cursor: 'pointer',
                       fontSize: '0.9rem',
                       fontWeight: '600',
                       width: '100%',
                       outline: 'none',
                       boxSizing: 'border-box',
                       display: 'block',
                       marginTop: 'auto'
                     }}
                   >
                     Sign Out
                   </button>
                 </LogoutSection>
          </RightColumn>
        </MainContent>
      )}

      {showSettings && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Settings
            settings={settings}
            onSettingsChange={handleSettingsChange}
            onClose={() => setShowSettings(false)}
            isOpen={showSettings}
          />
        </div>
      )}
    </AppContainer>
  );
};

export default App;
