import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { TimerState, SessionType, TimerSettings } from '../types';
import Icon from './Icon';

interface TimerProps {
  settings: TimerSettings;
  onSessionComplete: (type: SessionType) => void;
  currentSession: SessionType;
  completedPomodoros: number;
  currentTask?: string;
  currentCycle: number;
}

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #000000;
  border: 1px solid #333333;
  color: #ffffff;
  min-height: 400px;
  border-radius: 12px;
  position: relative;
`;

const TimerCircle = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const CircleProgress = styled.svg`
  position: absolute;
  width: 300px;
  height: 300px;
  transform: rotate(-90deg);
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #333333;
  stroke-width: 8;
`;

const CircleProgressBar = styled.circle<{ progress: number }>`
  fill: none;
  stroke: #ffffff;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 880;
  stroke-dashoffset: ${props => 880 - (880 * props.progress) / 100};
  transition: stroke-dashoffset 0.3s ease;
`;

const TimerDisplay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const TimeText = styled.div`
  font-size: 3.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  letter-spacing: 2px;
`;

const SessionTypeText = styled.div<{ sessionType: SessionType }>`
  font-size: 1.4rem;
  color: ${props => {
    switch (props.sessionType) {
      case 'pomodoro':
        return '#FF4444';
      case 'shortBreak':
        return '#4CAF50';
      case 'longBreak':
        return '#2196F3';
      default:
        return '#FF4444';
    }
  }};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ControlButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 70px;
  border: 1px solid #333333;
  background: ${props => props.variant === 'primary' ? '#ffffff' : 'transparent'};
  color: ${props => props.variant === 'primary' ? '#000000' : '#ffffff'};
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 0.4rem;
  border-radius: 8px;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#ffffff' : '#111111'};
    border-color: #ffffff;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.div`
  font-size: 1.8rem;
  font-weight: 300;
`;

const ButtonText = styled.div`
  font-size: 0.7rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Badge = styled.div`
  background: #111111;
  color: #888888;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SessionInfo = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SessionCount = styled.div`
  font-size: 1rem;
  color: #888888;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CurrentTaskDisplay = styled.div`
  background: #111111;
  border: 1px solid #333333;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 300px;
  text-align: center;
`;

const CurrentTaskLabel = styled.div`
  font-size: 0.8rem;
  color: #888888;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

const CurrentTaskText = styled.div`
  font-size: 1rem;
  color: #ffffff;
  font-weight: 500;
`;

const Timer: React.FC<TimerProps> = ({ 
  settings, 
  onSessionComplete, 
  currentSession, 
  completedPomodoros,
  currentTask,
  currentCycle
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerState, setTimerState] = useState<TimerState>('idle');

  // Get session duration in seconds
  const getSessionDuration = useCallback((sessionType: SessionType): number => {
    switch (sessionType) {
      case 'pomodoro':
        return settings.pomodoroDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
      default:
        return settings.pomodoroDuration * 60;
    }
  }, [settings]);

  // Initialize timer when session changes
  useEffect(() => {
    const duration = getSessionDuration(currentSession);
    setTimeLeft(duration);
    setTimerState('idle');
  }, [currentSession, getSessionDuration]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerState === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setTimerState('completed');
            onSessionComplete(currentSession);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerState, onSessionComplete, currentSession]);

  const startTimer = () => {
    if (timerState === 'idle' || timerState === 'paused') {
      setTimerState('running');
    }
  };

  const pauseTimer = () => {
    if (timerState === 'running') {
      setTimerState('paused');
    }
  };

  const resetTimer = () => {
    const duration = getSessionDuration(currentSession);
    setTimeLeft(duration);
    setTimerState('idle');
  };

  const skipSession = () => {
    onSessionComplete(currentSession);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    const totalDuration = getSessionDuration(currentSession);
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  const getSessionTypeDisplay = (): string => {
    switch (currentSession) {
      case 'pomodoro':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Focus Time';
    }
  };

  const getSessionInfoDisplay = (): string => {
    switch (currentSession) {
      case 'pomodoro':
        return `Pomodoro ${completedPomodoros + 1} of ${settings.pomodorosBeforeLongBreak}`;
      case 'shortBreak':
        return `Short Break`;
      case 'longBreak':
        return `Long Break`;
      default:
        return `Pomodoro ${completedPomodoros + 1} of ${settings.pomodorosBeforeLongBreak}`;
    }
  };

  const progress = getProgress();

          return (
          <TimerContainer>
            <SessionInfo>
              <SessionTypeText sessionType={currentSession}>{getSessionTypeDisplay()}</SessionTypeText>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                <Badge>Cycle {currentCycle}</Badge>
                <Badge>{completedPomodoros} Pomodoros</Badge>
              </div>
            </SessionInfo>

      <TimerCircle>
        <CircleProgress>
          <CircleBackground cx="150" cy="150" r="140" />
          <CircleProgressBar cx="150" cy="150" r="140" progress={progress} />
        </CircleProgress>
        
        <TimerDisplay>
          <TimeText>{formatTime(timeLeft)}</TimeText>
        </TimerDisplay>
      </TimerCircle>

      <ControlsContainer>
        {timerState === 'running' ? (
          <ControlButton onClick={pauseTimer} variant="primary">
            <ButtonIcon>
              <Icon name="pause" size={24} />
            </ButtonIcon>
            <ButtonText>Pause</ButtonText>
          </ControlButton>
        ) : (
          <ControlButton onClick={startTimer} variant="primary">
            <ButtonIcon>
              <Icon name="play" size={24} />
            </ButtonIcon>
            <ButtonText>Start</ButtonText>
          </ControlButton>
        )}
        
        <ControlButton onClick={skipSession}>
          <ButtonIcon>
            <Icon name="skip" size={24} />
          </ButtonIcon>
          <ButtonText>Skip</ButtonText>
        </ControlButton>
        
        <ControlButton onClick={resetTimer}>
          <ButtonIcon>
            <Icon name="reset" size={24} />
          </ButtonIcon>
          <ButtonText>Reset</ButtonText>
        </ControlButton>
      </ControlsContainer>

      {currentTask && (
        <CurrentTaskDisplay>
          <CurrentTaskLabel>Working on</CurrentTaskLabel>
          <CurrentTaskText>{currentTask}</CurrentTaskText>
        </CurrentTaskDisplay>
      )}
    </TimerContainer>
  );
};

export default Timer; 