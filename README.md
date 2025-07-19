# Pidima AI Chat Sidebar

A modern, responsive chat interface for AI interactions.

## Design Decisions
- **Collapsible Sidebar:** Chosen for easy integration and unobtrusive UX. Can be toggled open/closed.
- **Pure HTML/CSS/JS:** No frameworks or libraries used, ensuring compatibility and maintainability.
- **Responsive Design:** Sidebar adapts to mobile and desktop. Toggle button is always accessible.
- **Message Animations:** Fade-in for new messages for a modern feel.
- **Typing Indicator:** Shows when user is typing, disappears after sending or inactivity.
- **Accessibility:** Buttons have `aria-label` attributes for screen readers.
- **Sound Notifications:** Subtle bubble sound for new messages.

## Features
- Message input and display with character limit
- Message history with smooth scrolling
- Timestamp display and read receipts
- Message deletion with confirmation
- Sound notifications for new messages
- Typing indicators with timeout
- Responsive design for all devices
- Accessibility features for screen readers

## Technical Details
- Built with vanilla JavaScript
- CSS Grid and Flexbox for layouts
- CSS animations for smooth transitions
- LocalStorage for message persistence
- Responsive breakpoints at 600px

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pidima-chat.git
   ```
2. Open `index.html` in a modern browser
3. Click the chat button (💬) to open sidebar
4. Start chatting!

## Browser Support
- Chrome 60+
- Firefox 54+
- Safari 10.1+
- Edge 79+

## Known Limitations
- Messages are stored in-memory only
- Single user session only
- No file attachment support
- No emoji picker (basic emoji support only)

## Future Improvements
- Add persistent storage
- Implement multi-user support
- Add file attachments
- Add emoji picker
- Add theme customization
- Integrate with backend API

---

**Version:** 1.0.0
**Last Updated:** July 18, 2025
**Author:** Mohamed Nashaat
