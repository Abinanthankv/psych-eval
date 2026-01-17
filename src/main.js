import './style.css';
import { scales } from './scales.js';

const app = document.getElementById('app');
let currentScale = null;
let answers = [];
let activeCategory = 'All';

const categories = [
  { label: 'All', filter: () => true },
  { label: 'Depression', filter: s => s.tags?.includes('Depression') },
  { label: 'Anxiety', filter: s => s.tags?.includes('Anxiety') },
  { label: 'Substance Use', filter: s => s.tags?.includes('Substance Use') },
  { label: 'Cognitive', filter: s => s.tags?.includes('Cognitive') || s.tags?.includes('ADHD') },
  { label: 'OCD', filter: s => s.tags?.includes('OCD') },
  { label: 'Clinician', filter: s => s.tags?.includes('Clinician') }
];

function renderMenu() {
  // Filter scales based on activeCategory
  const categoryObj = categories.find(c => c.label === activeCategory);
  const activeFilter = categoryObj ? categoryObj.filter : () => true;
  let filteredScales = scales.filter(activeFilter);

  // Apply search filter if input exists and has value
  const searchInput = document.getElementById('scale-search');
  if (searchInput && searchInput.value) {
    const term = searchInput.value.toLowerCase();
    filteredScales = filteredScales.filter(scale =>
      scale.name.toLowerCase().includes(term) ||
      scale.description.toLowerCase().includes(term) ||
      (scale.tags && scale.tags.some(t => t.toLowerCase().includes(term)))
    );
  }

  app.innerHTML = `
    <div class="container fade-in">
      <header class="header">
        <h1>Psych Eval</h1>
        <p>Professional Psychiatric Assessment Tools</p>
      </header>
      
      <div class="category-filter">
        ${categories.map(cat => `
            <button class="filter-btn ${activeCategory === cat.label ? 'active' : ''}" 
                    data-category="${cat.label}">
                ${cat.label}
            </button>
        `).join('')}
      </div>

      <div class="search-bar-container">
          <input type="text" id="scale-search" placeholder="Search scales..." class="search-input" value="${searchInput ? searchInput.value : ''}" />
      </div>

      <div class="grid" id="scales-grid">
        ${filteredScales.map(scale => `
          <div class="card" onclick="selectScale('${scale.id}')">
            <h2>${scale.name}</h2>
            <p>${scale.description}</p>
            ${scale.tags ? `<div class="tags">${scale.tags.slice(0, 3).map(t => `<span class="tag tag-${t.toLowerCase().replace(/\s+/g, '-')}">${t}</span>`).join('')}</div>` : ''}
          </div>
        `).join('')}
      </div>
      
      ${filteredScales.length === 0 ? '<p class="no-results">No scales found.</p>' : ''}
      
      <footer class="footer">
        <p>Private & Secure. Client-side only.</p>
      </footer>
    </div>
  `;

  // Restore focus if search was active (simple hack)
  const newSearchInput = document.getElementById('scale-search');
  if (searchInput && newSearchInput) {
    newSearchInput.focus();
    // move cursor to end
    const val = newSearchInput.value;
    newSearchInput.value = '';
    newSearchInput.value = val;
  }

  // Add event listeners
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeCategory = e.target.dataset.category;
      renderMenu();
    });
  });

  if (newSearchInput) {
    newSearchInput.addEventListener('input', () => {
      // debounce could be added here but regular re-render is fine for small list
      renderMenu();
    });
  }
}

window.selectScale = (id) => {
  currentScale = scales.find(s => s.id === id);
  if (!currentScale) return;
  answers = new Array(currentScale.questions.length).fill(null);
  renderQuestion(0);
};

function renderQuestion(index) {
  if (index >= currentScale.questions.length) {
    renderResults();
    return;
  }

  const question = currentScale.questions[index];
  const progress = ((index) / currentScale.questions.length) * 100;

  app.innerHTML = `
    <div class="container fade-in">
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progress}%"></div>
      </div>
      
      <div class="question-card">
        <div class="question-header">
            <span class="question-number">Question ${index + 1} of ${currentScale.questions.length}</span>
            <button class="close-btn" onclick="renderMenu()">×</button>
        </div>
        
        <h2>${question.text}</h2>
        
        <div class="options-grid">
          ${question.options.map((opt, i) => `
            <button class="option-btn" onclick="handleAnswer(${index}, ${i})">
              ${opt}
            </button>
          `).join('')}
        </div>
        
        <div class="navigation-buttons">
             ${index > 0 ? `<button class="nav-btn" onclick="renderQuestion(${index - 1})">Back</button>` : '<div></div>'}
        </div>
      </div>
    </div>
  `;
}

window.renderQuestion = renderQuestion; // Expose for back button

window.handleAnswer = (qIndex, aIndex) => {
  answers[qIndex] = aIndex;
  renderQuestion(qIndex + 1);
};

window.renderMenu = renderMenu; // Expose globally

function renderResults() {
  const result = currentScale.scoring(answers, currentScale.questions);

  app.innerHTML = `
    <div class="container fade-in">
      <div class="results-card">
        <h1>Assessment Complete</h1>
        <div class="score-display">
            <span class="score-label">${currentScale.name}</span>
            <div class="score-value">${result.score !== undefined ? result.score : ''}</div>
            <p class="severity-text">${result.severity}</p>
            ${result.detail ? `<p class="result-detail">${result.detail}</p>` : ''}
        </div>
        
        <div class="actions">
          <button class="primary-btn" onclick="renderMenu()">Return to Menu</button>
          <button class="secondary-btn" onclick="window.print()">Print Results</button>
        </div>
        
        <p class="disclaimer">
          <strong>Disclaimer:</strong> This tool is for educational and clinical tracking purposes only. 
          It does not provide a medical diagnosis. Results should be interpreted by a qualified healthcare professional.
          No data is stored or transmitted.
        </p>
      </div>
    </div>
  `;
}

// Initialize
renderMenu();
