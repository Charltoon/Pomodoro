import React from 'react';
import styled from 'styled-components';
import { DailyStats, Task } from '../types';
import Icon from './Icon';

interface StatisticsProps {
  dailyStats: DailyStats;
  tasks: Task[];
  totalPomodorosCompleted: number;
}

const StatsContainer = styled.div`
  background: #000000;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: left;
  padding: 0 2rem;
`;

const Title = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding: 0 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: #1A1A1A;
  border: 1px solid #333333;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #444444;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div<{ color: string }>`
  font-size: 1.5rem;
  color: ${props => props.color};
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.color || '#ffffff'};
  margin-bottom: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #888888;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
`;

const ProgressSection = styled.div`
  margin-top: 2rem;
`;

const ProgressTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ProgressBar = styled.div`
  background: #000000;
  height: 20px;
  overflow: hidden;
  margin-bottom: 0.5rem;
  border: 1px solid #333333;
`;

const ProgressFill = styled.div<{ percentage: number; color: string }>`
  height: 100%;
  background: #697565;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const GraphContainer = styled.div`
  background: #1A1A1A;
  border: 1px solid #333333;
  padding: 3rem;
  border-radius: 12px;
  margin: 0 2rem 2rem 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const GraphTitle = styled.h4`
  margin: 0 0 2rem 0;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
`;

const GraphContent = styled.div`
  position: relative;
  padding-left: 3rem;
  padding-right: 1rem;
`;

const GraphGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.5rem;
  height: 200px;
  align-items: end;
  padding: 1.5rem 0;
  position: relative;
`;

const GraphBar = styled.div<{ height: number; isToday: boolean }>`
  background: ${props => props.isToday 
    ? 'linear-gradient(180deg, #4CAF50 0%, #45A049 100%)' 
    : 'linear-gradient(180deg, #555555 0%, #444444 100%)'
  };
  height: ${props => props.height}%;
  min-height: 8px;
  border-radius: 6px 6px 0 0;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${props => props.isToday 
    ? '0 2px 8px rgba(76, 175, 80, 0.3)' 
    : '0 1px 4px rgba(0, 0, 0, 0.2)'
  };

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.isToday 
      ? '0 4px 12px rgba(76, 175, 80, 0.4)' 
      : '0 3px 8px rgba(0, 0, 0, 0.3)'
    };
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 16px;
    background: transparent;
  }
`;

const GraphLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
  text-align: center;
`;

const DayLabel = styled.div`
  font-size: 0.8rem;
  color: #888888;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
`;

const YAxisLabels = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666666;
  font-weight: 500;
  width: 2rem;
`;

const YAxisLine = styled.div`
  position: absolute;
  left: 2.5rem;
  top: 0;
  width: 1px;
  height: 100%;
  background: #333333;
`;

const XAxisLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #333333;
`;

const BarValue = styled.div<{ isToday: boolean }>`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.isToday ? '#4CAF50' : '#888888'};
  opacity: 0;
  transition: opacity 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
`;

const GraphBarContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: end;

  &:hover ${BarValue} {
    opacity: 1;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #888888;
  font-size: 0.9rem;
  background: #1A1A1A;
  border: 1px solid #333333;
  border-radius: 8px;
  margin: 0 2rem 2rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #697565;
  font-weight: 300;
`;

const TaskProgress = styled.div`
  margin-top: 1rem;
`;

const TaskProgressItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #697565;

  &:last-child {
    border-bottom: none;
  }
`;

const TaskName = styled.div`
  font-weight: 400;
  color: #ECDFCC;
  font-size: 0.9rem;
`;

const TaskProgressBar = styled.div`
  background: #1E201E;
  height: 8px;
  width: 100px;
  overflow: hidden;
  margin: 0 1rem;
  border: 1px solid #697565;
`;

const TaskProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  background: #697565;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const Statistics: React.FC<StatisticsProps> = ({
  dailyStats,
  tasks,
  totalPomodorosCompleted
}) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const totalEstimatedPomodoros = tasks.reduce((sum, task) => sum + task.estimatedPomodoros, 0);
  const totalCompletedPomodoros = tasks.reduce((sum, task) => sum + task.completedPomodoros, 0);
  const pomodoroProgress = totalEstimatedPomodoros > 0 ? (totalCompletedPomodoros / totalEstimatedPomodoros) * 100 : 0;

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Generate last 7 days data
  const getLast7DaysData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // For demo purposes, generate some realistic data
      const pomodoros = Math.floor(Math.random() * 5); // 0-4 pomodoros per day
      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        pomodoros: pomodoros,
        isToday: i === 0
      });
    }
    
    return days;
  };

  const weekData = getLast7DaysData();
  const maxPomodoros = Math.max(...weekData.map(d => d.pomodoros), 4);

  return (
    <StatsContainer>
      <Header>
        <Title>Statistics</Title>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatValue>{totalPomodorosCompleted}</StatValue>
          <StatLabel>Total Pomodoros</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="#4CAF50">{formatTime(totalPomodorosCompleted * 25)}</StatValue>
          <StatLabel>Total Focus Time</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="#2196F3">{Math.round(totalPomodorosCompleted / 7)}</StatValue>
          <StatLabel>Daily Average</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="#FF9800">{Math.min(totalPomodorosCompleted, 7)}</StatValue>
          <StatLabel>Active Days</StatLabel>
        </StatCard>
      </StatsGrid>

                  <GraphContainer>
              <GraphTitle>Last 7 Days</GraphTitle>
              <GraphContent>
                <YAxisLine />
                <XAxisLine />
                <YAxisLabels>
                  <div>{maxPomodoros}</div>
                  <div>{Math.floor(maxPomodoros * 0.75)}</div>
                  <div>{Math.floor(maxPomodoros * 0.5)}</div>
                  <div>{Math.floor(maxPomodoros * 0.25)}</div>
                  <div>0</div>
                </YAxisLabels>
                <GraphGrid>
                  {weekData.map((day, index) => (
                    <GraphBarContainer key={day.date}>
                      <GraphBar
                        height={(day.pomodoros / maxPomodoros) * 100}
                        isToday={day.isToday}
                        title={`${day.dayName}: ${day.pomodoros} pomodoros`}
                      />
                      <BarValue isToday={day.isToday}>
                        {day.pomodoros}
                      </BarValue>
                    </GraphBarContainer>
                  ))}
                </GraphGrid>
                <GraphLabels>
                  {weekData.map(day => (
                    <DayLabel key={day.date}>{day.dayName}</DayLabel>
                  ))}
                </GraphLabels>
              </GraphContent>
            </GraphContainer>

      {totalPomodorosCompleted === 0 && (
        <NoDataMessage>
          No statistics yet. Complete your first Pomodoro to see your progress!
        </NoDataMessage>
      )}
    </StatsContainer>
  );
};

export default Statistics; 