import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface HeatmapData {
  hour: number;
  intensity: number; // 0-4 levels
  pomodoros: number;
}

interface DailyHeatmapProps {
  dailyStats?: {
    pomodorosCompleted: number;
    totalFocusTime: number;
  };
}

const HeatmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeatmapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const HeatmapTitle = styled.h4`
  margin: 0;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: #888888;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LegendBox = styled.div<{ intensity: number }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${props => {
    switch (props.intensity) {
      case 0: return '#1A1A1A';
      case 1: return '#2D4A3E';
      case 2: return '#3A7A5F';
      case 3: return '#4CAF50';
      case 4: return '#66BB6A';
      default: return '#1A1A1A';
    }
  }};
  border: 1px solid #333333;
`;

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 2px;
  flex: 1;
  min-height: 120px;
`;

const HourLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: #888888;
  height: 20px;
  font-weight: 500;
`;

const HeatmapCell = styled.div<{ intensity: number; hasData: boolean }>`
  width: 100%;
  height: 100%;
  min-height: 20px;
  border-radius: 2px;
  background: ${props => {
    if (!props.hasData) return '#1A1A1A';
    switch (props.intensity) {
      case 0: return '#1A1A1A';
      case 1: return '#2D4A3E';
      case 2: return '#3A7A5F';
      case 3: return '#4CAF50';
      case 4: return '#66BB6A';
      default: return '#1A1A1A';
    }
  }};
  border: 1px solid #333333;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
    border-color: #ffffff;
  }
`;

const Tooltip = styled.div<{ visible: boolean; x: number; y: number }>`
  position: absolute;
  background: #000000;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid #333333;
  z-index: 10;
  pointer-events: none;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.2s ease;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  white-space: nowrap;
`;

const DailyHeatmap: React.FC<DailyHeatmapProps> = ({ dailyStats }) => {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({
    visible: false,
    content: '',
    x: 0,
    y: 0,
  });

  // Generate sample heatmap data based on daily stats
  useEffect(() => {
    const generateHeatmapData = () => {
      const data: HeatmapData[] = [];
      const totalPomodoros = dailyStats?.pomodorosCompleted || 0;
      
      // Create a more realistic productivity pattern
      for (let hour = 0; hour < 24; hour++) {
        let intensity = 0;
        let pomodoros = 0;
        
        // Early morning productivity (6-8 AM)
        if (hour >= 6 && hour <= 8) {
          if (Math.random() > 0.6) {
            pomodoros = Math.floor(Math.random() * 2) + 1;
            intensity = Math.min(pomodoros, 3);
          }
        }
        // Morning work session (9-11 AM) - peak productivity
        else if (hour >= 9 && hour <= 11) {
          if (Math.random() > 0.3) {
            pomodoros = Math.floor(Math.random() * 4) + 2;
            intensity = Math.min(pomodoros, 4);
          }
        }
        // Lunch break dip (12-1 PM)
        else if (hour >= 12 && hour <= 13) {
          if (Math.random() > 0.8) {
            pomodoros = Math.floor(Math.random() * 1) + 1;
            intensity = Math.min(pomodoros, 2);
          }
        }
        // Afternoon work (2-5 PM) - moderate productivity
        else if (hour >= 14 && hour <= 17) {
          if (Math.random() > 0.5) {
            pomodoros = Math.floor(Math.random() * 3) + 1;
            intensity = Math.min(pomodoros, 3);
          }
        }
        // Evening work (6-9 PM) - some late work
        else if (hour >= 18 && hour <= 21) {
          if (Math.random() > 0.7) {
            pomodoros = Math.floor(Math.random() * 2) + 1;
            intensity = Math.min(pomodoros, 3);
          }
        }
        // Night hours (10 PM - 5 AM) - minimal activity
        else if (hour >= 22 || hour <= 5) {
          if (Math.random() > 0.95) {
            pomodoros = Math.floor(Math.random() * 1) + 1;
            intensity = Math.min(pomodoros, 1);
          }
        }
        
        data.push({
          hour,
          intensity,
          pomodoros,
        });
      }
      
      setHeatmapData(data);
    };

    generateHeatmapData();
  }, [dailyStats]);

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12am';
    if (hour === 12) return '12pm';
    if (hour > 12) return `${hour - 12}pm`;
    return `${hour}am`;
  };

  const handleCellHover = (event: React.MouseEvent, data: HeatmapData) => {
    const rect = event.currentTarget.getBoundingClientRect();
    let content = '';
    
    if (data.pomodoros > 0) {
      if (data.pomodoros === 1) {
        content = `${formatHour(data.hour)} - 1 focus session completed`;
      } else {
        content = `${formatHour(data.hour)} - ${data.pomodoros} focus sessions completed`;
      }
    } else {
      content = `${formatHour(data.hour)} - No focus sessions`;
    }
    
    setTooltip({
      visible: true,
      content,
      x: event.clientX - rect.left + 10,
      y: event.clientY - rect.top - 30,
    });
  };

  const handleCellLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <HeatmapContainer>
      <HeatmapHeader>
        <HeatmapTitle>Daily Activity</HeatmapTitle>
        <Legend>
          <LegendItem>
            <LegendBox intensity={0} />
            <span>None</span>
          </LegendItem>
          <LegendItem>
            <LegendBox intensity={1} />
            <span>Low</span>
          </LegendItem>
          <LegendItem>
            <LegendBox intensity={2} />
            <span>Medium</span>
          </LegendItem>
          <LegendItem>
            <LegendBox intensity={3} />
            <span>High</span>
          </LegendItem>
          <LegendItem>
            <LegendBox intensity={4} />
            <span>Very High</span>
          </LegendItem>
        </Legend>
      </HeatmapHeader>

                           <HeatmapGrid>
          {heatmapData.map((data) => (
            <HeatmapCell
              key={data.hour}
              intensity={data.intensity}
              hasData={data.pomodoros > 0}
            />
          ))}
        </HeatmapGrid>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(24, 1fr)', 
          gap: '2px', 
          marginTop: '0.5rem',
          fontSize: '0.6rem',
          color: '#888888',
          height: '20px',
          alignItems: 'center'
        }}>
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.6rem',
              color: '#888888',
              height: '20px',
              fontWeight: '500'
            }}>
              {i % 3 === 0 ? formatHour(i) : ''}
            </div>
          ))}
        </div>
    </HeatmapContainer>
  );
};

export default DailyHeatmap; 