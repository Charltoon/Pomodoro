import React from 'react';
import styled from 'styled-components';
import { DailyStats, Task } from '../types';

interface StatisticsProps {
  dailyStats: DailyStats;
  tasks: Task[];
  totalPomodorosCompleted: number;
}

const StatsContainer = styled.div`
  width: 100%;
`;

const StatsTitle = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StatCard = styled.div`
  background: #000000;
  border: 1px solid #444444;
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.color || '#ffffff'};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.65rem;
  color: #888888;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: #888888;
  font-size: 0.8rem;
  background: #000000;
  border: 1px solid #444444;
  border-radius: 4px;
`;

const NoDataText = styled.p`
  margin: 0;
  color: #888888;
  line-height: 1.3;
  font-size: 0.75rem;
`;

const Statistics: React.FC<StatisticsProps> = ({
  dailyStats,
  tasks,
  totalPomodorosCompleted
}) => {
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const totalFocusTime = totalPomodorosCompleted * 25;
  const dailyAverage = totalPomodorosCompleted > 0 ? Math.round(totalPomodorosCompleted / 7) : 0;
  const activeDays = Math.min(totalPomodorosCompleted, 7);

  return (
    <StatsContainer>
      <StatsTitle>Statistics</StatsTitle>
      <StatsGrid>
        <StatCard>
          <StatValue>{totalPomodorosCompleted}</StatValue>
          <StatLabel>Total Pomodoros</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="#4CAF50">{formatTime(totalFocusTime)}</StatValue>
          <StatLabel>Focus Time</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="#2196F3">{dailyAverage}</StatValue>
          <StatLabel>Daily Average</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="#FF9800">{activeDays}</StatValue>
          <StatLabel>Active Days</StatLabel>
        </StatCard>
      </StatsGrid>

      {totalPomodorosCompleted === 0 && (
        <NoDataMessage>
          <NoDataText>
            Complete your first Pomodoro to see your progress!
          </NoDataText>
        </NoDataMessage>
      )}
    </StatsContainer>
  );
};

export default Statistics; 