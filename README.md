# Vanilla JavaScript To-Do App

A beautiful, modern to-do application built with vanilla HTML, CSS, and JavaScript. Features a clean, responsive design with smooth animations and persistent storage.

## Features

### Core Functionality
- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Filter tasks (All, Pending, Completed)
- ✅ Clear all completed tasks
- ✅ Persistent storage using localStorage

### User Experience
- 🎨 Modern, gradient-based design
- 📱 Fully responsive layout
- ⚡ Smooth animations and transitions
- ⌨️ Keyboard shortcuts
- 🔄 Real-time task counter
- 📋 Empty state handling

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

### Alternative Setup
You can also serve the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

### Basic Operations
- **Add Task**: Type your task in the input field and press Enter or click "Add Task"
- **Complete Task**: Click the circle checkbox next to any task
- **Delete Task**: Hover over a task and click the red × button
- **Filter Tasks**: Use the filter buttons to view All, Pending, or Completed tasks
- **Clear Completed**: Click "Clear Completed" to remove all finished tasks

### Keyboard Shortcuts
- `Enter` - Add new task (when input is focused)
- `Ctrl/Cmd + /` - Focus the input field
- `Escape` - Clear input field and remove focus

## Technical Details

### Architecture
The application follows a class-based architecture with:
- `TodoApp` class managing all functionality
- Event delegation for efficient DOM manipulation
- Separation of concerns between data, presentation, and user interaction

### Data Storage
- Tasks are stored in the browser's localStorage
- Data persists between browser sessions
- Automatic saving on every operation

### Browser Support
- Modern browsers with ES6+ support
- Chrome 58+, Firefox 55+, Safari 10.1+, Edge 16+

## File Structure

```
todo-app/
├── index.html          # Main HTML structure
├── style.css           # CSS styling and animations
├── script.js           # JavaScript functionality
├── .github/
│   └── copilot-instructions.md
└── README.md           # This file
```

## Customization

### Styling
The CSS uses CSS custom properties (variables) for easy theming. Main color scheme can be modified by updating the gradient values in `style.css`.

### Functionality
The modular JavaScript structure makes it easy to add new features:
- Extend the `TodoApp` class
- Add new methods for additional functionality
- Update the data structure as needed

## Contributing

Feel free to submit issues and enhancement requests! Some ideas for improvements:
- Due dates for tasks
- Task categories/tags
- Import/export functionality
- Drag and drop reordering
- Dark mode toggle
- Task priority levels

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Modern CSS design inspired by contemporary web applications
- Responsive design principles for mobile-first development
- Accessibility considerations for inclusive user experience
