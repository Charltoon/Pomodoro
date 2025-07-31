# 🍅 Pomodoro Timer App

A modern, feature-rich Pomodoro timer application built with React and TypeScript. Stay focused, boost productivity, and track your progress with this beautiful and intuitive timer.

## ✨ Features

### 🎯 Core Timer Functionality
- **25/5/15 Pomodoro Technique**: 25-minute work sessions, 5-minute short breaks, 15-minute long breaks
- **Visual Countdown**: Beautiful circular progress bar with real-time countdown
- **Timer Controls**: Start, pause, skip, and reset functionality
- **Auto-session Switching**: Automatically transitions between work and break periods
- **Session Counter**: Tracks completed Pomodoros and cycles

### ⚙️ Customizable Settings
- **Flexible Durations**: Customize Pomodoro, short break, and long break lengths
- **Cycle Management**: Set number of Pomodoros before long breaks
- **Auto-start Options**: Automatically start breaks or Pomodoros
- **Sound Controls**: Enable/disable timer completion and ticking sounds

### 📋 Task Management
- **Add & Manage Tasks**: Create tasks with estimated Pomodoro counts
- **Task Progress Tracking**: Monitor completed vs estimated Pomodoros per task
- **Task Selection**: Link current Pomodoro session to specific tasks
- **Task Completion**: Mark tasks as complete with visual indicators

### 📊 Productivity Statistics
- **Daily Progress**: Track Pomodoros completed, focus time, and tasks finished
- **Visual Progress Bars**: See completion rates for tasks and overall progress
- **Session History**: Monitor your productivity patterns
- **Real-time Updates**: Statistics update automatically as you work

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Gradients**: Modern color schemes and smooth animations
- **Intuitive Navigation**: Easy switching between timer, settings, and stats
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pomodoro-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Styled Components for CSS-in-JS
- **Icons**: React Icons (Feather Icons)
- **State Management**: React Hooks (useState, useEffect)
- **Local Storage**: Browser localStorage for data persistence
- **Build Tool**: Create React App

## 📱 How to Use

### Basic Timer Usage
1. **Start a Pomodoro**: Click the play button to begin a 25-minute work session
2. **Take Breaks**: After each Pomodoro, take a 5-minute short break
3. **Long Breaks**: After 4 Pomodoros, enjoy a 15-minute long break
4. **Track Progress**: Watch the circular progress bar and session counter

### Task Management
1. **Add Tasks**: Click "Add Task" and enter task details with estimated Pomodoros
2. **Select Current Task**: Click on a task to link it to your current session
3. **Track Progress**: See real-time progress as you complete Pomodoros
4. **Mark Complete**: Check off tasks when finished

### Customization
1. **Access Settings**: Click the settings icon to customize timer durations
2. **Adjust Preferences**: Modify auto-start options and sound settings
3. **Save Changes**: Your settings are automatically saved to localStorage

### View Statistics
1. **Check Progress**: Click the statistics icon to view daily productivity metrics
2. **Monitor Trends**: Track your focus time and task completion rates
3. **Stay Motivated**: Use progress bars to visualize your achievements

## 🎯 Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

### Benefits
- **Improved Focus**: Short, focused work sessions reduce mental fatigue
- **Better Time Management**: Clear structure helps prioritize tasks
- **Reduced Procrastination**: Breaking work into manageable chunks
- **Enhanced Productivity**: Regular breaks maintain high energy levels

### How It Works
1. **Work Session**: Focus on a single task for 25 minutes
2. **Short Break**: Take a 5-minute break to rest and recharge
3. **Repeat**: Complete 4 Pomodoros, then take a longer break
4. **Long Break**: Enjoy a 15-30 minute break after 4 work sessions

## 🔧 Customization Options

### Timer Durations
- **Pomodoro**: 1-60 minutes (default: 25)
- **Short Break**: 1-30 minutes (default: 5)
- **Long Break**: 1-60 minutes (default: 15)
- **Cycles**: 1-10 Pomodoros before long break (default: 4)

### Auto-start Features
- **Auto-start Breaks**: Automatically begin break timers
- **Auto-start Pomodoros**: Automatically begin work sessions
- **Sound Notifications**: Audio alerts for timer completion
- **Ticking Sound**: Optional background ticking during sessions

## 📊 Data Persistence

The app uses browser localStorage to save:
- **Timer Settings**: All customization preferences
- **Task List**: Your current tasks and progress
- **Session Data**: Daily statistics and completion tracking

Your data persists between browser sessions and page refreshes.

## 🎨 Design Features

- **Responsive Layout**: Adapts to any screen size
- **Modern Gradients**: Beautiful color transitions
- **Smooth Animations**: Fluid transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader support
- **Dark Mode Ready**: Prepared for future dark theme implementation

## 🚀 Future Enhancements

### Planned Features
- **Dark Mode**: Toggle between light and dark themes
- **Browser Notifications**: Desktop notifications when timer ends
- **PWA Support**: Install as a desktop/mobile app
- **Data Export**: Export statistics and task data
- **Cloud Sync**: Sync data across devices
- **Advanced Analytics**: Detailed productivity insights
- **Focus Mode**: Distraction-free fullscreen mode
- **Custom Themes**: User-selectable color schemes

### Technical Improvements
- **Offline Support**: Service worker for offline functionality
- **Performance Optimization**: Lazy loading and code splitting
- **Unit Tests**: Comprehensive test coverage
- **E2E Tests**: Automated user interaction testing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Francesco Cirillo** for developing the Pomodoro Technique
- **React Team** for the amazing framework
- **Styled Components** for the excellent styling solution
- **React Icons** for the beautiful icon library

---

**Happy Focusing! 🍅✨**
