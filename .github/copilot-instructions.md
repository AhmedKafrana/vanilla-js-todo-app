<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# To-Do App Development Guidelines

This is a vanilla JavaScript to-do application with the following structure:
- `index.html` - Main HTML structure
- `style.css` - CSS styling with modern design
- `script.js` - JavaScript functionality using ES6+ features

## Code Style Guidelines

### JavaScript
- Use ES6+ features (classes, arrow functions, const/let)
- Implement proper error handling
- Use localStorage for data persistence
- Follow object-oriented programming principles
- Use event delegation for dynamic content
- Implement proper HTML escaping for security

### CSS
- Use modern CSS features (flexbox, grid, custom properties)
- Implement responsive design principles
- Use CSS transitions and animations for better UX
- Follow BEM naming convention where applicable
- Use semantic color schemes

### HTML
- Use semantic HTML elements
- Ensure proper accessibility attributes
- Maintain clean, readable structure
- Include proper meta tags

## Features to Maintain
- Add/delete/toggle tasks
- Filter tasks (all, pending, completed)
- Persistent storage using localStorage
- Responsive design
- Keyboard shortcuts (Ctrl+/ to focus input, Escape to clear)
- Empty state handling
- Task counter
- Clear completed functionality

## When Adding New Features
- Maintain the existing class-based architecture
- Add proper error handling
- Update localStorage structure if needed
- Ensure responsive design compatibility
- Add appropriate CSS transitions
- Consider accessibility implications
