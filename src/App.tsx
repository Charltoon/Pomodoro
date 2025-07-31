import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';
import Settings from './components/Settings';
import TaskManager from './components/TaskManager';
import Statistics from './components/Statistics';
import Icon from './components/Icon';
import { TimerSettings, SessionType, Task, DailyStats } from './types';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  padding: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333333;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  color: #888888;
  font-size: 1rem;
  margin: 0;
  font-weight: 400;
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TimerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  border: 1px solid ${props => props.active ? '#ffffff' : '#333333'};
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${props => props.active ? '#ffffff' : '#111111'};
    border-color: #ffffff;
    transform: translateY(-1px);
  }
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
  const [showStats, setShowStats] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
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

  const currentTask = tasks.find(task => task.id === currentTaskId);

  return (
    <AppContainer>
                   <Header>
               <Title>Pomodoro Timer</Title>
             </Header>

      <ControlsContainer>
        <ControlButton
          active={!showSettings && !showStats && !showTasks}
          onClick={() => {
            setShowSettings(false);
            setShowStats(false);
            setShowTasks(false);
          }}
        >
          Timer
        </ControlButton>
        <ControlButton
          active={showTasks}
          onClick={() => {
            setShowTasks(!showTasks);
            setShowSettings(false);
            setShowStats(false);
          }}
        >
          Tasks
        </ControlButton>
        <ControlButton
          active={showStats}
          onClick={() => {
            setShowStats(!showStats);
            setShowSettings(false);
            setShowTasks(false);
          }}
        >
          <Icon name="chart" size={16} />
          Stats
        </ControlButton>
        <ControlButton
          active={showSettings}
          onClick={() => {
            setShowSettings(!showSettings);
            setShowStats(false);
            setShowTasks(false);
          }}
        >
          <Icon name="settings" size={16} />
          Settings
        </ControlButton>
      </ControlsContainer>

      {!showSettings && !showStats && !showTasks && (
        <MainContent>
                           <TimerSection>
                   <Timer
                     settings={settings}
                     onSessionComplete={handleSessionComplete}
                     currentSession={currentSession}
                     completedPomodoros={completedPomodoros}
                     currentTask={currentTask?.title}
                     currentCycle={currentCycle}
                   />
          </TimerSection>

                           <Sidebar>
                   <TaskManager
                     tasks={tasks}
                     onTasksChange={handleTasksChange}
                     currentTaskId={currentTaskId}
                     onTaskSelect={handleTaskSelect}
                     title="Quick Tasks"
                   />
                 </Sidebar>
        </MainContent>
      )}

      {showTasks && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <TaskManager
            tasks={tasks}
            onTasksChange={handleTasksChange}
            currentTaskId={currentTaskId}
            onTaskSelect={handleTaskSelect}
            title="Task Manager"
          />
        </div>
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

      {showStats && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Statistics
            dailyStats={dailyStats}
            tasks={tasks}
            totalPomodorosCompleted={totalPomodorosCompleted}
          />
        </div>
      )}
    </AppContainer>
  );
};

export default App;
