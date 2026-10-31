// TrustGrid.AI LinkedIn Template Gallery Interactive Controller

document.addEventListener('DOMContentLoaded', () => {
  const templates = window.TEMPLATES_DATA || [];

  // DOM Elements
  const cardsGrid = document.getElementById('cardsGrid');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const formatTabs = document.getElementById('formatTabs');
  const categoryFilter = document.getElementById('categoryFilter');
  const resultsCount = document.getElementById('resultsCount');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const emptyResetBtn = document.getElementById('emptyResetBtn');

  // Modal Elements
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');

  // Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Stats Counters
  const statTotal = document.getElementById('stat-total');
  const statImg = document.getElementById('stat-img');
  const statTxt = document.getElementById('stat-txt');

  if (statTotal) statTotal.textContent = templates.length;
  if (statImg) statImg.textContent = templates.filter(t => t.format === 'IMG').length;
  if (statTxt) statTxt.textContent = templates.filter(t => t.format === 'TXT').length;

  // State
  let currentFormat = 'ALL';
  let currentCategory = 'ALL';
  let currentSearchQuery = '';

  // Initialize
  renderTemplates();

  // Event Listeners: Search
  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim().toLowerCase();
    clearSearchBtn.style.display = currentSearchQuery ? 'block' : 'none';
    renderTemplates();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderTemplates();
  });

  // Event Listeners: Format Tabs
  formatTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    formatTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFormat = btn.dataset.format;
    renderTemplates();
  });

  // Event Listeners: Category Dropdown
  categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    renderTemplates();
  });

  // Reset Filters
  resetFiltersBtn.addEventListener('click', resetAllFilters);
  emptyResetBtn.addEventListener('click', resetAllFilters);

  function resetAllFilters() {
    searchInput.value = '';
    currentSearchQuery = '';
    clearSearchBtn.style.display = 'none';

    currentFormat = 'ALL';
    formatTabs.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.format === 'ALL');
    });

    currentCategory = 'ALL';
    categoryFilter.value = 'ALL';

    renderTemplates();
  }

  // Filter Logic
  function getFilteredTemplates() {
    return templates.filter(t => {
      // 1. Format Filter
      if (currentFormat !== 'ALL' && t.format !== currentFormat) {
        return false;
      }
      // 2. Category Filter
      if (currentCategory !== 'ALL' && t.categoryFolder !== currentCategory) {
        return false;
      }
      // 3. Search Query
      if (currentSearchQuery) {
        const query = currentSearchQuery;
        const padId = String(t.id).padStart(3, '0');
        const hashId = `#${t.id}`;
        const hashPadId = `#${padId}`;

        const matchId = String(t.id) === query || padId === query || hashId === query || hashPadId === query;
        const matchTitle = t.title.toLowerCase().includes(query);
        const matchCategory = t.category.toLowerCase().includes(query);
        const matchAudience = t.targetAudience.toLowerCase().includes(query);
        const matchHook = t.hook ? t.hook.toLowerCase().includes(query) : false;
        const matchHashtags = t.hashtags ? t.hashtags.some(h => h.toLowerCase().includes(query)) : false;

        if (!matchId && !matchTitle && !matchCategory && !matchAudience && !matchHook && !matchHashtags) {
          return false;
        }
      }
      return true;
    });
  }

  // Render Function
  function renderTemplates() {
    const filtered = getFilteredTemplates();

    // Update Status Bar
    resultsCount.textContent = `Showing ${filtered.length} of ${templates.length} templates`;
    const isFiltered = currentFormat !== 'ALL' || currentCategory !== 'ALL' || currentSearchQuery !== '';
    resetFiltersBtn.style.display = isFiltered ? 'inline-block' : 'none';

    // Toggle Empty State
    if (filtered.length === 0) {
      cardsGrid.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    cardsGrid.style.display = 'grid';
    emptyState.style.display = 'none';

    // Render Cards
    cardsGrid.innerHTML = filtered.map(t => createCardHtml(t)).join('');

    // Attach Click Handlers
    cardsGrid.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', () => {
        const topicId = parseInt(card.dataset.id, 10);
        openModal(topicId);
      });
    });
  }

  function createCardHtml(t) {
    const padId = String(t.id).padStart(3, '0');
    const isImg = t.format === 'IMG';

    // Media Thumbnail Area
    let mediaHtml = '';
    if (isImg) {
      mediaHtml = `
        <div class="card-media-wrapper">
          <img src="${t.svgPath}" alt="${escapeHtml(t.title)}" loading="lazy" />
        </div>
      `;
    } else {
      mediaHtml = `
        <div class="text-post-simulation">
          <div>
            <div class="sim-author-row">
              <div class="sim-avatar">TG</div>
              <div class="sim-author-info">
                <span class="sim-name">TrustGrid.AI <span style="color:#0284c7;font-size:11px;">Verified</span></span>
                <span class="sim-title">Enterprise AI Engineering Operating Company</span>
              </div>
            </div>
            <p class="sim-post-hook">${escapeHtml(t.hook || t.title)}</p>
            <p class="sim-post-excerpt">${escapeHtml(t.readerProblem)}</p>
          </div>
          <div style="font-size:11px;color:#94a3b8;font-weight:600;padding-top:8px;">
            📄 TEXT-ONLY PUBLISHING TEMPLATE
          </div>
        </div>
      `;
    }

    return `
      <div class="template-card" data-id="${t.id}">
        <div class="card-meta-bar">
          <span class="topic-number-badge">#${padId}</span>
          <span class="format-badge ${isImg ? 'img-badge' : 'txt-badge'}">
            ${isImg ? 'IMAGE POST' : 'TEXT POST'}
          </span>
        </div>

        ${mediaHtml}

        <div class="card-content">
          <div class="card-category-tag">${escapeHtml(t.category)}</div>
          <h2 class="card-title">${escapeHtml(t.title)}</h2>
          <p class="card-hook-excerpt">${escapeHtml(t.hook || t.readerProblem)}</p>

          <div class="card-footer-action">
            <span class="action-label">
              ${isImg ? 'View full post & visual →' : 'Read full post →'}
            </span>
            <span class="series-tag">${escapeHtml(t.series || '')}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Modal Logic
  function openModal(topicId) {
    const t = templates.find(item => item.id === topicId);
    if (!t) return;

    const padId = String(t.id).padStart(3, '0');
    const isImg = t.format === 'IMG';

    let bodyHtml = '';

    if (isImg) {
      bodyHtml = `
        <div class="modal-split-layout">
          <!-- Visual Side -->
          <div class="modal-visual-side">
            <div class="modal-img-container">
              <img src="${t.svgPath}" alt="${escapeHtml(t.title)}" />
            </div>
            <div class="modal-img-actions">
              <a href="${t.svgPath}" download="${t.slug}.svg" class="download-asset-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download SVG
              </a>
              <a href="${t.svgPath}" target="_blank" class="open-asset-btn">
                Open Full Asset ↗
              </a>
            </div>

            <div class="modal-meta-details">
              <div class="meta-row">
                <span class="meta-label">Format:</span>
                <span>Single-Image Post (1080 × 1350 px, 4:5)</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Target Audience:</span>
                <span>${escapeHtml(t.targetAudience)}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Funnel Stage:</span>
                <span>${escapeHtml(t.funnelStage)}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Series & Day:</span>
                <span>${escapeHtml(t.series)} (${escapeHtml(t.suggestedPublishingDay)})</span>
              </div>
            </div>
          </div>

          <!-- Text Side -->
          <div class="modal-text-side">
            <div class="modal-header-meta">
              <span class="topic-number-badge">#${padId}</span>
              <span class="format-badge img-badge">IMAGE POST</span>
              <span class="card-category-tag" style="margin-bottom:0;">${escapeHtml(t.category)}</span>
            </div>

            <h1 class="modal-title" id="modalTitle">${escapeHtml(t.title)}</h1>

            <div class="modal-post-box">
              <div class="post-content-text">${escapeHtml(t.postMarkdown)}</div>
              
              <button class="copy-post-btn" id="modalCopyBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy Caption to Clipboard
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      // Text Post Modal Layout
      bodyHtml = `
        <div class="modal-text-side" style="max-width:760px;margin:0 auto;">
          <div class="modal-header-meta">
            <span class="topic-number-badge">#${padId}</span>
            <span class="format-badge txt-badge">TEXT POST</span>
            <span class="card-category-tag" style="margin-bottom:0;">${escapeHtml(t.category)}</span>
          </div>

          <h1 class="modal-title" id="modalTitle">${escapeHtml(t.title)}</h1>

          <div class="modal-meta-details" style="margin-bottom:6px;">
            <div class="meta-row">
              <span class="meta-label">Target Audience:</span>
              <span>${escapeHtml(t.targetAudience)}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Funnel Stage:</span>
              <span>${escapeHtml(t.funnelStage)}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Series & Day:</span>
              <span>${escapeHtml(t.series)} (${escapeHtml(t.suggestedPublishingDay)})</span>
            </div>
          </div>

          <div class="modal-post-box">
            <div class="post-content-text">${escapeHtml(t.postMarkdown)}</div>
            
            <button class="copy-post-btn" id="modalCopyBtn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy Full Post to Clipboard
            </button>
          </div>
        </div>
      `;
    }

    modalContent.innerHTML = bodyHtml;

    // Attach Copy Handler
    const copyBtn = document.getElementById('modalCopyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyToClipboard(t.postMarkdown);
      });
    }

    // Open Modal
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Clipboard Helper
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showToast).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast();
    } catch (err) {
      console.error('Copy fallback failed', err);
    }
    document.body.removeChild(textArea);
  }

  let toastTimer;
  function showToast() {
    clearTimeout(toastTimer);
    toastNotification.classList.add('show');
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2400);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});

