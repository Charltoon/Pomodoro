import React, { useState } from 'react';
import styled from 'styled-components';
import { Task } from '../types';
import Icon from './Icon';

interface TaskManagerProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  currentTaskId?: string;
  onTaskSelect: (taskId: string) => void;
  title?: string;
  compact?: boolean;
}

const TaskManagerContainer = styled.div<{ compact?: boolean }>`
  background: ${props => props.compact ? 'transparent' : '#000000'};
  border: ${props => props.compact ? 'none' : '1px solid #333333'};
  padding: ${props => props.compact ? '0' : '2rem'};
  border-radius: ${props => props.compact ? '0' : '12px'};
  max-width: ${props => props.compact ? 'none' : '800px'};
  margin: ${props => props.compact ? '0' : '0 auto'};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div<{ compact?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.compact ? '0.5rem' : '1rem'};
  padding-bottom: ${props => props.compact ? '0.25rem' : '0.5rem'};
  border-bottom: ${props => props.compact ? 'none' : '1px solid #333333'};
`;

const Title = styled.h2<{ compact?: boolean }>`
  margin: 0;
  color: #ffffff;
  font-size: ${props => props.compact ? '1rem' : '1.2rem'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TaskCount = styled.div`
  background: #333333;
  color: #ffffff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
`;

const AddTaskButton = styled.button<{ compact?: boolean }>`
  background: #000000;
  color: #ffffff;
  border: 1px solid #333333;
  padding: ${props => props.compact ? '0.25rem' : '0.5rem'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.compact ? '28px' : '36px'};
  height: ${props => props.compact ? '28px' : '36px'};
  font-size: ${props => props.compact ? '1rem' : '1.2rem'};
  font-weight: 400;
  transition: all 0.3s ease;
  border-radius: 6px;

  &:hover {
    background: #111111;
    border-color: #ffffff;
    transform: translateY(-1px);
  }
`;

const AddTaskForm = styled.div<{ compact?: boolean }>`
  background: #111111;
  border: 1px solid #333333;
  padding: ${props => props.compact ? '0.5rem' : '1rem'};
  margin-bottom: ${props => props.compact ? '0.5rem' : '2rem'};
  border-radius: 6px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SectionTitle = styled.h3<{ compact?: boolean }>`
  margin: 0 0 ${props => props.compact ? '0.5rem' : '1rem'} 0;
  color: #ffffff;
  font-size: ${props => props.compact ? '0.9rem' : '1.1rem'};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TaskSection = styled.div<{ compact?: boolean }>`
  margin-bottom: ${props => props.compact ? '0.5rem' : '2rem'};
`;

const FormInput = styled.input<{ compact?: boolean }>`
  flex: 1;
  padding: ${props => props.compact ? '0.5rem' : '0.75rem'};
  border: 1px solid #333333;
  background: #111111;
  color: #ffffff;
  font-size: ${props => props.compact ? '0.85rem' : '1rem'};
  transition: all 0.3s ease;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #ffffff;
    background: #000000;
  }

  &::placeholder {
    color: #888888;
  }

  &[type="number"] {
    width: 80px;
    text-align: center;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const FormButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: 1px solid #333333;
  background: ${props => props.variant === 'primary' ? '#ffffff' : 'transparent'};
  color: ${props => props.variant === 'primary' ? '#000000' : '#ffffff'};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  min-width: 60px;
  white-space: nowrap;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#cccccc' : '#111111'};
    color: #000000;
  }
`;

const TaskList = styled.div<{ compact?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.compact ? '0.125rem' : '0.5rem'};
`;

const TaskItem = styled.div<{ isSelected: boolean; isCompleted: boolean; compact?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props => props.compact ? '0.5rem' : '0.75rem'};
  background: ${props => {
    if (props.compact) {
      return props.isSelected ? '#111111' : 'transparent';
    }
    return props.isSelected ? '#111111' : '#1A1A1A';
  }};
  border: ${props => {
    if (props.compact) {
      return props.isSelected ? '1px solid #ffffff' : 'none';
    }
    return `1px solid ${props.isSelected ? '#ffffff' : '#333333'}`;
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.isCompleted ? 0.5 : 1};
  margin-bottom: ${props => props.compact ? '0.0625rem' : '0.25rem'};
  border-radius: ${props => props.compact ? '0' : '4px'};

  &:hover {
    border-color: ${props => props.compact ? '#ffffff' : '#ffffff'};
    background: ${props => {
      if (props.compact) {
        return props.isSelected ? '#111111' : '#111111';
      }
      return props.isSelected ? '#111111' : '#222222';
    }};
    transform: ${props => props.compact ? 'none' : 'translateY(-1px)'};
  }
`;

const TaskContent = styled.div<{ compact?: boolean }>`
  flex: 1;
  margin-left: ${props => props.compact ? '0.5rem' : '1rem'};
`;

const TaskTitle = styled.div<{ isCompleted: boolean; compact?: boolean }>`
  font-weight: 400;
  color: #ffffff;
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  margin-bottom: ${props => props.compact ? '0.0625rem' : '0.25rem'};
  font-size: ${props => props.compact ? '0.8rem' : '0.85rem'};
`;

const TaskMeta = styled.div<{ compact?: boolean }>`
  font-size: ${props => props.compact ? '0.65rem' : '0.75rem'};
  color: #888888;
  display: flex;
  gap: ${props => props.compact ? '0.5rem' : '1rem'};
  font-weight: 300;
`;

const TaskActions = styled.div<{ compact?: boolean }>`
  display: flex;
  gap: ${props => props.compact ? '0.25rem' : '0.5rem'};
`;

const ActionButton = styled.button<{ variant?: 'success' | 'danger' | 'warning'; compact?: boolean }>`
  background: none;
  border: none;
  padding: ${props => props.compact ? '0.25rem' : '0.5rem'};
  cursor: pointer;
  color: ${props => {
    switch (props.variant) {
      case 'success': return '#ffffff';
      case 'danger': return '#ffffff';
      case 'warning': return '#ffffff';
      default: return '#888888';
    }
  }};
  transition: all 0.3s ease;
  font-size: ${props => props.compact ? '0.7rem' : '0.8rem'};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;

const EmptyState = styled.div<{ compact?: boolean }>`
  text-align: center;
  padding: ${props => props.compact ? '1rem' : '1.5rem'};
  color: #888888;
  font-style: italic;
  font-size: ${props => props.compact ? '0.75rem' : '0.85rem'};
`;

const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  onTasksChange,
  currentTaskId,
  onTaskSelect,
  title = "Task Manager",
  compact = false
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPomodoros, setNewTaskPomodoros] = useState(1);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        estimatedPomodoros: newTaskPomodoros,
        completedPomodoros: 0,
        createdAt: new Date()
      };
      onTasksChange([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskPomodoros(1);
      setShowAddForm(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    onTasksChange(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    onTasksChange(tasks.filter(task => task.id !== taskId));
    if (currentTaskId === taskId) {
      onTaskSelect('');
    }
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editingTaskId) {
      onTasksChange(tasks.map(task =>
        task.id === editingTaskId ? { ...task, title: editTitle.trim() } : task
      ));
      setEditingTaskId(null);
      setEditTitle('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle('');
  };

  return (
    <TaskManagerContainer compact={compact}>
      {title && (
        <Header compact={compact}>
          <Title compact={compact}>
            {title}
            <TaskCount>{tasks.filter(t => !t.completed).length}</TaskCount>
          </Title>
          <AddTaskButton compact={compact} onClick={() => setShowAddForm(!showAddForm)}>
            <Icon name="plus" size={compact ? 12 : 16} />
          </AddTaskButton>
        </Header>
      )}
      
      {!title && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <AddTaskButton compact={compact} onClick={() => setShowAddForm(!showAddForm)}>
            <Icon name="plus" size={compact ? 10 : 14} />
          </AddTaskButton>
        </div>
      )}

      {showAddForm && (
        <AddTaskForm compact={compact}>
          <FormInput
            compact={compact}
            type="text"
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <AddTaskButton compact={compact} onClick={handleAddTask}>
            <Icon name="plus" size={compact ? 12 : 16} />
          </AddTaskButton>
        </AddTaskForm>
      )}

      <TaskSection compact={compact}>
        {title && <SectionTitle compact={compact}>Active Tasks</SectionTitle>}
        <TaskList compact={compact}>
          {tasks.filter(task => !task.completed).length === 0 ? (
            <EmptyState compact={compact}>
              No active tasks. Add one to get started!
            </EmptyState>
          ) : (
            tasks.filter(task => !task.completed).map(task => (
              <TaskItem
                key={task.id}
                isSelected={currentTaskId === task.id}
                isCompleted={task.completed}
                compact={compact}
                onClick={() => onTaskSelect(task.id)}
              >
                <ActionButton
                  variant="success"
                  compact={compact}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleTask(task.id);
                  }}
                >
                  <Icon name="check" size={compact ? 12 : 16} />
                </ActionButton>

                <TaskContent compact={compact}>
                  {editingTaskId === task.id ? (
                    <FormInput
                      compact={compact}
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <TaskTitle isCompleted={task.completed} compact={compact}>
                      {task.title}
                    </TaskTitle>
                  )}
                  <TaskMeta compact={compact}>
                    <span>
                      {task.completedPomodoros} pomodoro{task.completedPomodoros !== 1 ? 's' : ''}
                      {task.estimatedPomodoros > 1 && ` / ${task.estimatedPomodoros} estimated`}
                    </span>
                    <span>Created {task.createdAt.toLocaleDateString()}</span>
                  </TaskMeta>
                </TaskContent>

                <TaskActions compact={compact}>
                  {editingTaskId === task.id ? (
                    <>
                      <ActionButton
                        variant="success"
                        compact={compact}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit();
                        }}
                      >
                        Save
                      </ActionButton>
                      <ActionButton
                        compact={compact}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit();
                        }}
                      >
                        Cancel
                      </ActionButton>
                    </>
                  ) : (
                    <>
                      <ActionButton
                        variant="warning"
                        compact={compact}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(task);
                        }}
                      >
                        <Icon name="edit" size={compact ? 12 : 16} />
                      </ActionButton>
                      <ActionButton
                        variant="danger"
                        compact={compact}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.id);
                        }}
                      >
                        <Icon name="delete" size={compact ? 12 : 16} />
                      </ActionButton>
                    </>
                  )}
                </TaskActions>
              </TaskItem>
            ))
          )}
        </TaskList>
      </TaskSection>

      {!compact && (
        <TaskSection>
          <SectionTitle>Completed Tasks</SectionTitle>
          <TaskList>
            {tasks.filter(task => task.completed).length === 0 ? (
              <EmptyState>
                No completed tasks yet.
              </EmptyState>
            ) : (
              tasks.filter(task => task.completed).map(task => (
                <TaskItem
                  key={task.id}
                  isSelected={false}
                  isCompleted={task.completed}
                  onClick={() => {}}
                >
                  <ActionButton
                    variant="success"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleTask(task.id);
                    }}
                  >
                    <Icon name="check" size={16} />
                  </ActionButton>

                  <TaskContent>
                    <TaskTitle isCompleted={task.completed}>
                      {task.title}
                    </TaskTitle>
                    <TaskMeta>
                      <span>
                        {task.completedPomodoros} pomodoro{task.completedPomodoros !== 1 ? 's' : ''}
                        {task.estimatedPomodoros > 1 && ` / ${task.estimatedPomodoros} estimated`}
                      </span>
                      <span>Created {task.createdAt.toLocaleDateString()}</span>
                    </TaskMeta>
                  </TaskContent>

                  <TaskActions>
                    <ActionButton
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                      }}
                    >
                      <Icon name="delete" size={16} />
                    </ActionButton>
                  </TaskActions>
                </TaskItem>
              ))
            )}
          </TaskList>
        </TaskSection>
      )}
    </TaskManagerContainer>
  );
};

export default TaskManager; 