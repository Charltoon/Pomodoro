import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MonthYear = styled.h4`
  margin: 0;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #111111;
    border-radius: 4px;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.125rem;
  margin-bottom: 0.25rem;
`;

const WeekDay = styled.div`
  text-align: center;
  color: #888888;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.125rem;
`;

const Day = styled.div<{ isCurrentMonth: boolean; isToday: boolean; isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  font-size: 0.75rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  background: ${props => {
    if (props.isSelected) return '#ffffff';
    if (props.isToday) return '#333333';
    return 'transparent';
  }};
  
  color: ${props => {
    if (props.isSelected) return '#000000';
    if (props.isCurrentMonth) return '#ffffff';
    return '#666666';
  }};
  
  font-weight: ${props => props.isToday ? '600' : '400'};

  &:hover {
    background: ${props => props.isCurrentMonth ? '#222222' : 'transparent'};
  }
`;

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty days for the beginning of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date): boolean => {
    return selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavigationButton onClick={goToPreviousMonth}>
          ‹
        </NavigationButton>
        <MonthYear>{formatMonthYear(currentDate)}</MonthYear>
        <NavigationButton onClick={goToNextMonth}>
          ›
        </NavigationButton>
      </CalendarHeader>

      <WeekDays>
        {weekDays.map(day => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>

      <DaysGrid>
        {days.map((day, index) => (
          <Day
            key={index}
            isCurrentMonth={day !== null}
            isToday={day ? isToday(day) : false}
            isSelected={day ? isSelected(day) : false}
            onClick={() => day && handleDateClick(day)}
          >
            {day ? day.getDate() : ''}
          </Day>
        ))}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default Calendar; 