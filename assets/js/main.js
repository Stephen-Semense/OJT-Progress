const OJT_START = new Date("2025-03-19T00:00:00");
const OJT_END = new Date("2026-06-30T23:59:59");

function formatDate(date) {
  const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getDaysDifference(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1 - date2) / oneDay));
}

function updateAll() {
  const now = new Date();
  const totalDuration = OJT_END - OJT_START;
  const elapsed = now - OJT_START;
  const remaining = OJT_END - now;
  
  // Update dates
  document.getElementById('startDate').textContent = formatDate(OJT_START);
  document.getElementById('endDate').textContent = formatDate(OJT_END);
  
  // Update timeline line progress
  const timelineLine = document.getElementById('timelineLine');
  const endDot = document.getElementById('endDot');
  const endLabel = document.getElementById('endLabel');
  
  // Calculate progress percentage for timeline
  let progressPercent = 0;
  if (now >= OJT_START) {
    progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  }
  timelineLine.style.setProperty('--progress', `${progressPercent}%`);
  
  // Update end status
  const hasEnded = now >= OJT_END;
  const notStarted = now < OJT_START;
  
  if (hasEnded) {
    endLabel.textContent = 'Ended';
    endDot.classList.add('completed');
  } else {
    endLabel.textContent = 'Ends';
    endDot.classList.remove('completed');
  }
  
  // Update status badge
  const statusBadge = document.getElementById('statusBadge');
  const statusText = statusBadge.querySelector('.status-text');
  
  statusBadge.classList.remove('completed', 'not-started');
  
  if (hasEnded) {
    statusBadge.classList.add('completed');
    statusText.textContent = 'Completed';
  } else if (notStarted) {
    statusBadge.classList.add('not-started');
    statusText.textContent = 'Not Started';
  } else {
    statusText.textContent = 'In Progress';
  }
  
  // Update datetime
  const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
  document.getElementById('todayDate').textContent = 
    `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  hours = String(hours).padStart(2, '0');
  document.getElementById('currentTime').textContent = 
    `${hours}:${minutes}:${seconds} ${ampm}`;
  
  // Calculate and update progress
  const progressBar = document.getElementById('progressBar');
  const progressPercentEl = document.getElementById('progressPercent');
  const remainingTimeEl = document.getElementById('remainingTime');
  const daysElapsedEl = document.getElementById('daysElapsed');
  const totalDaysEl = document.getElementById('totalDays');
  
  const totalDays = Math.round(totalDuration / (1000 * 60 * 60 * 24));
  totalDaysEl.textContent = totalDays.toLocaleString();
  
  if (notStarted) {
    progressBar.style.width = '0%';
    progressPercentEl.textContent = '0%';
    remainingTimeEl.textContent = 'Not started';
    daysElapsedEl.textContent = '0';
    return;
  }
  
  if (hasEnded) {
    progressBar.style.width = '100%';
    progressPercentEl.textContent = '100%';
    remainingTimeEl.textContent = 'Completed!';
    daysElapsedEl.textContent = totalDays.toLocaleString();
    return;
  }
  
  // Active progress
  const percent = (elapsed / totalDuration) * 100;
  progressBar.style.width = `${percent}%`;
  progressPercentEl.textContent = `${percent.toFixed(2)}%`;
  
  // Days elapsed
  const daysElapsed = getDaysDifference(now, OJT_START);
  daysElapsedEl.textContent = daysElapsed.toLocaleString();
  
  // Remaining time
  const daysRemaining = Math.ceil(remaining / (1000 * 60 * 60 * 24));
  const monthsRemaining = Math.floor(daysRemaining / 30);
  const extraDays = daysRemaining % 30;
  
  if (monthsRemaining > 0) {
    remainingTimeEl.textContent = `${monthsRemaining}mo ${extraDays}d`;
  } else {
    remainingTimeEl.textContent = `${daysRemaining} days`;
  }
}

// Initialize
updateAll();
setInterval(updateAll, 1000);

// Add smooth entrance animations
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.stat-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * (index + 1));
  });
});