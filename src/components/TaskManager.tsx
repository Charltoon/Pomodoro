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
}

const TaskManagerContainer = styled.div`
  background: #000000;
  border: 1px solid #333333;
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #333333;
`;

const Title = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TaskCount = styled.div`
  background: #333333;
  color: #ffffff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
`;

const AddTaskButton = styled.button`
  background: #000000;
  color: #ffffff;
  border: 1px solid #333333;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  font-weight: 400;
  transition: all 0.3s ease;
  border-radius: 6px;

  &:hover {
    background: #111111;
    border-color: #ffffff;
    transform: translateY(-1px);
  }
`;

const AddTaskForm = styled.div`
  background: #111111;
  border: 1px solid #333333;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TaskSection = styled.div`
  margin-bottom: 2rem;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #333333;
  background: #111111;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  border-radius: 6px;

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

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TaskItem = styled.div<{ isSelected: boolean; isCompleted: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${props => props.isSelected ? '#111111' : '#1A1A1A'};
  border: 1px solid ${props => props.isSelected ? '#ffffff' : '#333333'};
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.isCompleted ? 0.5 : 1};
  margin-bottom: 0.5rem;
  border-radius: 8px;

  &:hover {
    border-color: #ffffff;
    background: ${props => props.isSelected ? '#111111' : '#222222'};
    transform: translateY(-1px);
  }
`;

const TaskContent = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const TaskTitle = styled.div<{ isCompleted: boolean }>`
  font-weight: 400;
  color: #ffffff;
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
`;

const TaskMeta = styled.div`
  font-size: 0.75rem;
  color: #888888;
  display: flex;
  gap: 1rem;
  font-weight: 300;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ variant?: 'success' | 'danger' | 'warning' }>`
  background: none;
  border: none;
  padding: 0.5rem;
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
  font-size: 0.8rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 1.5rem;
  color: #888888;
  font-style: italic;
  font-size: 0.85rem;
`;

const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  onTasksChange,
  currentTaskId,
  onTaskSelect,
  title = "Quick Tasks"
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

  // Function to increment pomodoros for a task (can be used for manual tracking)
  // const handleIncrementPomodoros = (taskId: string) => {
  //   onTasksChange(tasks.map(task =>
  //     task.id === taskId ? { ...task, completedPomodoros: task.completedPomodoros + 1 } : task
  //   ));
  // };

  return (
    <TaskManagerContainer>
      <Header>
        <Title>
          {title}
          <TaskCount>{tasks.filter(t => !t.completed).length}</TaskCount>
        </Title>
        <AddTaskButton onClick={() => setShowAddForm(!showAddForm)}>
          <Icon name="plus" size={16} />
        </AddTaskButton>
      </Header>

      {showAddForm && (
        <AddTaskForm>
          <FormInput
            type="text"
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <AddTaskButton onClick={handleAddTask}>
            <Icon name="plus" size={16} />
          </AddTaskButton>
        </AddTaskForm>
      )}

      <TaskSection>
        <SectionTitle>Active Tasks</SectionTitle>
        <TaskList>
          {tasks.filter(task => !task.completed).length === 0 ? (
            <EmptyState>
              No active tasks. Add one to get started!
            </EmptyState>
          ) : (
            tasks.filter(task => !task.completed).map(task => (
              <TaskItem
                key={task.id}
                isSelected={currentTaskId === task.id}
                isCompleted={task.completed}
                onClick={() => onTaskSelect(task.id)}
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
                  {editingTaskId === task.id ? (
                    <FormInput
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <TaskTitle isCompleted={task.completed}>
                      {task.title}
                    </TaskTitle>
                  )}
                  <TaskMeta>
                    <span>
                      {task.completedPomodoros} pomodoro{task.completedPomodoros !== 1 ? 's' : ''}
                      {task.estimatedPomodoros > 1 && ` / ${task.estimatedPomodoros} estimated`}
                    </span>
                    <span>Created {task.createdAt.toLocaleDateString()}</span>
                  </TaskMeta>
                </TaskContent>

                <TaskActions>
                  {editingTaskId === task.id ? (
                    <>
                      <ActionButton
                        variant="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit();
                        }}
                      >
                        Save
                      </ActionButton>
                      <ActionButton
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(task);
                        }}
                      >
                        <Icon name="edit" size={16} />
                      </ActionButton>
                      <ActionButton
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.id);
                        }}
                      >
                        <Icon name="delete" size={16} />
                      </ActionButton>
                    </>
                  )}
                </TaskActions>
              </TaskItem>
            ))
          )}
        </TaskList>
      </TaskSection>

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
    </TaskManagerContainer>
  );
};

export default TaskManager; 