export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export type SessionType = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  pomodoroDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  pomodorosBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
  tickSoundEnabled: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  estimatedPomodoros: number;
  completedPomodoros: number;
  createdAt: Date;
}

export interface PomodoroSession {
  id: string;
  type: SessionType;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  completed: boolean;
}

export interface DailyStats {
  date: string;
  pomodorosCompleted: number;
  totalFocusTime: number; // in minutes
  tasksCompleted: number;
} 