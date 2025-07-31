import React from 'react';
import styled from 'styled-components';
import { TimerSettings } from '../types';
import Icon from './Icon';

interface SettingsProps {
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
  onClose: () => void;
  isOpen: boolean;
}

const SettingsContainer = styled.div`
  background: #1A1A1A;
  border: 1px solid #333333;
  padding: 2rem;
  border-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333333;
`;

const Title = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SettingGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const SettingLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 400;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #333333;
  background: #000000;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffffff;
    background: #111111;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  background: #000000;
  border: 1px solid #333333;
  cursor: pointer;
  transition: all 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #333333;
    top: 1px;
    left: 1px;
    transition: transform 0.3s ease;
  }

  input:checked + & {
    background: #ffffff;
    border-color: #ffffff;
  }

  input:checked + &:after {
    transform: translateX(26px);
    background: #000000;
  }
`;

const ToggleInput = styled.input`
  display: none;
`;

const SaveButton = styled.button`
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: #cccccc;
    color: #000000;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: 1px solid #666666;
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: #333333;
    border-color: #888888;
    transform: scale(1.05);
  }
`;

const Settings: React.FC<SettingsProps> = ({ 
  settings, 
  onSettingsChange, 
  onClose, 
  isOpen 
}) => {
  const [localSettings, setLocalSettings] = React.useState<TimerSettings>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleInputChange = (key: keyof TimerSettings, value: string | boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: typeof value === 'boolean' ? value : parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleClose = () => {
    setLocalSettings(settings);
    onClose();
  };

  return (
    <SettingsContainer>
      <Header>
        <Title>Timer Settings</Title>
        <CloseButton onClick={handleClose}>
          ×
        </CloseButton>
      </Header>

      <Section>
        <SectionTitle>Timer Duration Settings</SectionTitle>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <SettingGroup>
            <SettingLabel>Work Duration (minutes)</SettingLabel>
            <Input
              type="number"
              min="1"
              max="60"
              value={localSettings.pomodoroDuration}
              onChange={(e) => handleInputChange('pomodoroDuration', e.target.value)}
            />
          </SettingGroup>

          <SettingGroup>
            <SettingLabel>Short Break (minutes)</SettingLabel>
            <Input
              type="number"
              min="1"
              max="30"
              value={localSettings.shortBreakDuration}
              onChange={(e) => handleInputChange('shortBreakDuration', e.target.value)}
            />
          </SettingGroup>

          <SettingGroup>
            <SettingLabel>Long Break (minutes)</SettingLabel>
            <Input
              type="number"
              min="1"
              max="60"
              value={localSettings.longBreakDuration}
              onChange={(e) => handleInputChange('longBreakDuration', e.target.value)}
            />
          </SettingGroup>
        </div>

        <SettingGroup>
          <SettingLabel>Pomodoros before Long Break</SettingLabel>
          <Input
            type="number"
            min="1"
            max="10"
            value={localSettings.pomodorosBeforeLongBreak}
            onChange={(e) => handleInputChange('pomodorosBeforeLongBreak', e.target.value)}
          />
        </SettingGroup>
      </Section>

      <Section>
        <SectionTitle>Sound Settings</SectionTitle>
        
        <SettingGroup>
          <ToggleContainer>
            <ToggleInput
              type="checkbox"
              checked={localSettings.soundEnabled}
              onChange={(e) => handleInputChange('soundEnabled', e.target.checked)}
            />
            <Toggle />
            <SettingLabel>Completion Sound</SettingLabel>
          </ToggleContainer>
          <div style={{ fontSize: '0.8rem', color: '#888888', marginTop: '0.25rem' }}>
            Play sound when timer completes
          </div>
        </SettingGroup>

        <SettingGroup>
          <ToggleContainer>
            <ToggleInput
              type="checkbox"
              checked={localSettings.tickSoundEnabled}
              onChange={(e) => handleInputChange('tickSoundEnabled', e.target.checked)}
            />
            <Toggle />
            <SettingLabel>Ticking Sound</SettingLabel>
          </ToggleContainer>
          <div style={{ fontSize: '0.8rem', color: '#888888', marginTop: '0.25rem' }}>
            Play ticking sound during timer
          </div>
        </SettingGroup>
      </Section>

      <SaveButton onClick={handleSave}>
        Reset to Defaults
      </SaveButton>
    </SettingsContainer>
  );
};

export default Settings; 