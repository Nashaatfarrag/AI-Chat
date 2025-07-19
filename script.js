// Pidima Chat Sidebar JS
const chatToggle = document.getElementById("chat-toggle");
const chatSidebar = document.getElementById("chat-sidebar");
const closeChat = document.getElementById("close-chat");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatHistory = document.getElementById("chat-history");
const typingIndicator = document.getElementById("typing-indicator");

let typingTimeout;

// Add sound for message sent/received
const messageSound = new Audio(
  "data:audio/wav;base64,UklGRh4BAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfoBAAB/gICAgICAgH9/gYF/gYF/gICAgH+AgX+BgICAgH+AgICAgIB/gIB/gIGAgICAgH+AgICAgICAgICAgIB/gIB/gICAgIB/f4CAf4CAf4B/gH+Af4B/gH+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgICAgICAgICAgICAgICAgICAgICAgICAgH+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA=="
);

// Function to scroll chat to bottom
function scrollToBottom() {
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Sidebar open/close
chatToggle.addEventListener("click", () => {
  chatSidebar.classList.add("open");
  chatSidebar.classList.remove("collapsed");
  chatToggle.style.display = "none";
  chatInput.focus();
});
closeChat.addEventListener("click", () => {
  chatSidebar.classList.remove("open");
  chatSidebar.classList.add("collapsed");
  chatToggle.style.display = "block";
});

// Typing indicator logic
chatInput.addEventListener("input", () => {
  if (chatInput.value.trim()) {
    typingIndicator.classList.remove("hidden");
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      typingIndicator.classList.add("hidden");
    }, 1200);
    scrollToBottom();
  } else {
    typingIndicator.classList.add("hidden");
  }
  const maxLength = chatInput.getAttribute("maxlength");
  const remainingChars = maxLength - chatInput.value.length;

  if (remainingChars <= 50) {
    chatInput.style.borderColor = "#ff4444";
  } else {
    chatInput.style.borderColor = "#ccc";
  }
});

// Message sending
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text);
  chatInput.value = "";
  typingIndicator.classList.add("hidden");
  scrollToBottom();
  // Show typing indicator for 2 seconds, then reply after 4 seconds
  setTimeout(() => {
    showOtherUserTyping();
    scrollToBottom();
    setTimeout(() => {
      hideOtherUserTyping();
      scrollToBottom();
      addReplyMessage("Thanks for your message! How can I assist you further?");
      // Mark last user message as read
      if (chatHistory.lastUserMessage) {
        const statusSpan = chatHistory.lastUserMessage.querySelector(".status");
        if (statusSpan) {
          statusSpan.textContent = "Read";
          statusSpan.style.color = "#0078d4";
        }
      }
    }, 2000);
  }, 4000);
});

// Simulate other user typing indicator
function showOtherUserTyping() {
  typingIndicator.textContent = "Other user is typing...";
  typingIndicator.classList.remove("hidden");
}

function hideOtherUserTyping() {
  typingIndicator.classList.add("hidden");
  typingIndicator.textContent = "User is typing...";
}

// Fetch reply from public chatai.cc API
function addMessage(text) {
  try {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message sender";
    msgDiv.innerHTML = `
      <button class="delete-message" aria-label="Delete message">×</button>
      <span class="message-text">${escapeHTML(text)}</span>
      <div class="message-meta">
        <span class="timestamp">${formatTimestamp(new Date())}</span>
        <span class="status">Sent</span>
      </div>
    `;

    // Add delete functionality
    const deleteBtn = msgDiv.querySelector('.delete-message');
    deleteBtn.addEventListener('click', () => {
      if (confirm('Delete this message?')) {
        msgDiv.classList.add('fade-out');
        setTimeout(() => {
          msgDiv.remove();
        }, 300);
      }
    });

    chatHistory.appendChild(msgDiv);
    if (chatHistory.scrollTop === undefined) {
      console.error('ScrollTop not available');
      return;
    }
    chatHistory.scrollTop = chatHistory.scrollHeight;
    chatHistory.lastUserMessage = msgDiv;
  } catch (err) {
    console.error('Error sending message:', err);
    alert('Failed to send message. Please try again.');
  }
}

function addReplyMessage(text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message reply";
  msgDiv.innerHTML = `
    <button class="delete-message" aria-label="Delete message">×</button>
    <span class="message-text">${escapeHTML(text)}</span>
    <span class="timestamp">${formatTimestamp(new Date())}</span>
  `;

  // Add delete functionality
  const deleteBtn = msgDiv.querySelector('.delete-message');
  deleteBtn.addEventListener('click', () => {
    if (confirm('Delete this message?')) {
      msgDiv.classList.add('fade-out');
      setTimeout(() => {
        msgDiv.remove();
      }, 300);
    }
  });

  chatHistory.appendChild(msgDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
  messageSound.play();
}

function formatTimestamp(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (tag) {
    const chars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return chars[tag] || tag;
  });
}

// Add these event listeners after your existing code
if ('virtualKeyboard' in navigator) {
  navigator.virtualKeyboard.overlaysContent = true;
}

// Prevent bounce scrolling on iOS
document.body.addEventListener('touchmove', function(e) {
  if (e.target.closest('#chat-history')) return;
  e.preventDefault();
}, { passive: false });

// Handle input focus
chatInput.addEventListener('focus', () => {
  // Small delay to let keyboard appear
  setTimeout(() => {
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, 300);
});

// Update the window resize handler
window.addEventListener("resize", () => {
  // Wait for keyboard animation
  setTimeout(() => {
    if (chatHistory.scrollHeight > 0) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, 100);
});

// Update viewport height on mobile
function updateMobileHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', updateMobileHeight);
updateMobileHeight();
