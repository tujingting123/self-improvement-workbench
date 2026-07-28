// ===== 视图渲染层 =====
const Views = {
  current: 'fitness',

  icons: {
    fitness: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5" fill="#ff8fa3"/><path d="M12 8c-2 0-4 1.5-4 4v4h2v6h4v-6h2v-4c0-2.5-2-4-4-4z" fill="#ffb3c6"/></svg>',
    english: '<svg viewBox="0 0 24 24"><path d="M3 5h14v2H3z" fill="#74b9ff"/><path d="M3 9h14v2H3z" fill="#74b9ff"/><path d="M3 13h10v2H3z" fill="#74b9ff"/><circle cx="18" cy="17" r="4" fill="#ffd93d"/><path d="M16 17l1.5 1.5L20 16" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
    reading: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="#a29bfe"/><rect x="6" y="5" width="12" height="14" rx="1" fill="#fff"/><rect x="8" y="8" width="8" height="1.5" fill="#a29bfe"/><rect x="8" y="11" width="8" height="1.5" fill="#dfe6e9"/><rect x="8" y="14" width="6" height="1.5" fill="#dfe6e9"/><path d="M12 3v18" stroke="#6c5ce7" stroke-width="0.8"/></svg>',
    ai: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="3" fill="#fd79a8"/><circle cx="10" cy="11" r="1.5" fill="#fff"/><circle cx="14" cy="11" r="1.5" fill="#fff"/><path d="M10 15h4" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/><path d="M9 6V4M15 6V4M9 20v-2M15 20v-2M6 9H4M6 15H4M20 9h-2M20 15h-2" stroke="#fd79a8" stroke-width="1.2" stroke-linecap="round"/></svg>',
    finance: '<svg viewBox="0 0 24 24"><rect x="3" y="14" width="4" height="7" rx="1" fill="#ff7675"/><rect x="10" y="9" width="4" height="12" rx="1" fill="#fdcb6e"/><rect x="17" y="4" width="4" height="17" rx="1" fill="#00b894"/><circle cx="5" cy="11" r="1.5" fill="#ff7675"/><circle cx="12" cy="6" r="1.5" fill="#fdcb6e"/></svg>',
    outfit: '<svg viewBox="0 0 24 24"><path d="M8 2L5 5v3l2 1v12h10V9l2-1V5l-3-3-2 2h-4z" fill="#fab1a0"/><path d="M12 4l-2 2M12 4l2 2" stroke="#fff" stroke-width="0.8"/><circle cx="12" cy="3" r="1" fill="#e17055"/></svg>',
    diary: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" fill="#ffeaa7"/><rect x="7" y="5" width="10" height="14" rx="1" fill="#fff"/><line x1="5" y1="8" x2="5" y2="8" stroke="#fdcb6e" stroke-width="3" stroke-linecap="round"/><line x1="5" y1="12" x2="5" y2="12" stroke="#fdcb6e" stroke-width="3" stroke-linecap="round"/><line x1="5" y1="16" x2="5" y2="16" stroke="#fdcb6e" stroke-width="3" stroke-linecap="round"/><path d="M9 9h6M9 12h6M9 15h4" stroke="#fdcb6e" stroke-width="1" stroke-linecap="round"/></svg>',
    memo: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="#55efc4"/><rect x="5" y="6" width="14" height="12" rx="1" fill="#fff"/><path d="M7 9l2 2 4-4" stroke="#00b894" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M7 14h10M7 17h6" stroke="#55efc4" stroke-width="1" stroke-linecap="round"/></svg>',
    copywriting: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="#6c5ce7"/><rect x="6" y="5" width="12" height="14" rx="1" fill="#fff"/><line x1="9" y1="9" x2="15" y2="9" stroke="#6c5ce7" stroke-width="1.5" stroke-linecap="round"/><line x1="9" y1="12" x2="15" y2="12" stroke="#a29bfe" stroke-width="1.2" stroke-linecap="round"/><line x1="9" y1="15" x2="13" y2="15" stroke="#a29bfe" stroke-width="1.2" stroke-linecap="round"/><path d="M16 19l1.5-2.5L19 19" stroke="#6c5ce7" stroke-width="1.5" fill="none"/></svg>',
    editing: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="14" rx="2" fill="#e17055"/><rect x="4" y="6" width="16" height="10" rx="1" fill="#fff"/><polygon points="10,9 16,14 10,19" fill="#e17055" opacity="0.7"/><line x1="10" y1="14" x2="16" y2="14" stroke="#fff" stroke-width="1"/><circle cx="19" cy="6" r="1.5" fill="#ff7675"/></svg>',
    poster: '<svg viewBox="0 0 24 24"><rect x="3" y="2" width="18" height="20" rx="2" fill="#00b894"/><rect x="5" y="4" width="14" height="16" rx="1" fill="#fff"/><circle cx="9" cy="8" r="1.5" fill="#00b894"/><circle cx="12" cy="8" r="1.5" fill="#55efc4"/><circle cx="15" cy="8" r="1.5" fill="#00b894"/><rect x="7" y="12" width="10" height="1.5" fill="#dfe6e9"/><rect x="7" y="15" width="8" height="1.5" fill="#dfe6e9"/></svg>',
    inspiration: '<svg viewBox="0 0 24 24"><path d="M12 2l2 5h5l-4 3 1.5 5L12 12.5 7.5 15 9 10 5 7h5z" fill="#fdcb6e"/><circle cx="12" cy="13" r="8" fill="none" stroke="#ffeaa7" stroke-width="1.5" stroke-dasharray="3,3"/><circle cx="12" cy="13" r="2" fill="#fdcb6e"/></svg>',
    knowledge: '<svg viewBox="0 0 24 24"><rect x="3" y="2" width="18" height="20" rx="2" fill="#a29bfe"/><rect x="5" y="4" width="14" height="16" rx="1" fill="#fff"/><line x1="9" y1="8" x2="15" y2="8" stroke="#6c5ce7" stroke-width="1.5" stroke-linecap="round"/><line x1="9" y1="11" x2="15" y2="11" stroke="#a29bfe" stroke-width="1.2" stroke-linecap="round"/><line x1="9" y1="14" x2="13" y2="14" stroke="#a29bfe" stroke-width="1.2" stroke-linecap="round"/><circle cx="18" cy="18" r="3" fill="#6c5ce7"/><path d="M17 18l1 1 2-2" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round"/></svg>'
  },

  menus: [
    { key: 'fitness', name: '身材管理', icon: 'fitness', section: '核心' },
    { key: 'english', name: '英语', icon: 'english', section: '核心' },
    { key: 'reading', name: '阅读', icon: 'reading', section: '核心' },
    { key: 'ai', name: 'AI学习', icon: 'ai', section: '资讯' },
    { key: 'finance', name: '财经', icon: 'finance', section: '资讯' },
    { key: 'training', name: '培训', icon: 'training', section: '资讯' },
    { key: 'copywriting', name: '文案表达', icon: 'copywriting', section: '技能' },
    { key: 'editing', name: '视频剪辑', icon: 'editing', section: '技能' },
    { key: 'poster', name: '海报制作', icon: 'poster', section: '技能' },
    { key: 'outfit', name: '穿搭灵感', icon: 'outfit', section: '生活' },
    { key: 'diary', name: '日记本', icon: 'diary', section: '生活' },
    { key: 'memo', name: '备忘录', icon: 'memo', section: '生活' },
    { key: 'inspiration', name: '灵感集', icon: 'inspiration', section: '创作' },
    { key: 'knowledge', name: '知识库', icon: 'knowledge', section: '知识库' }
  ],

  render(view) {
    this.current = view;
    const container = document.getElementById('viewContainer');
    container.innerHTML = '';
    const map = {
      dashboard: this.renderDashboard,
      fitness: this.renderFitness,
      english: this.renderEnglish,
      reading: this.renderReading,
      copywriting: this.renderCopywriting,
      editing: this.renderEditing,
      poster: this.renderPoster,
      ai: this.renderAI,
      finance: this.renderFinance,
      training: this.renderTraining,
      outfit: this.renderOutfit,
      diary: this.renderDiary,
      memo: this.renderMemo,
      inspiration: this.renderInspiration,
      knowledge: this.renderKnowledgeBase
    };
    const fn = map[view] || this.renderDashboard;
    fn.call(this, container);
    const menu = this.menus.find(m => m.key === view);
    document.getElementById('pageTitle').textContent = menu ? menu.name : '今日概览';
  },

  // ===== 0. 仪表盘首页 =====
  renderDashboard(container) {
    const stats = Store.getDashboardStats();
    const heatmap = Store.getWeekHeatmap();

    // 问候语
    const hour = new Date().getHours();
    const greeting = hour < 6 ? '夜深了' : hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好';
    const greetDiv = document.createElement('div');
    greetDiv.className = 'dashboard-greeting';
    greetDiv.textContent = `${greeting}，今天也要加油 💪`;
    container.appendChild(greetDiv);

    const subDiv = document.createElement('div');
    subDiv.className = 'dashboard-subtitle';
    subDiv.textContent = Store.todayKey();
    container.appendChild(subDiv);

    // 连续打卡
    const streakCard = document.createElement('div');
    streakCard.className = 'dashboard-streak-card';
    streakCard.innerHTML = `
      <div class="dashboard-streak-num">${stats.streak}</div>
      <div class="dashboard-streak-label">天连续打卡 🔥</div>
    `;
    container.appendChild(streakCard);

    // 今日进度环
    const progRow = document.createElement('div');
    progRow.className = 'dashboard-progress-row';

    // 运动进度环
    const fitnessPct = stats.fitnessTotal > 0 ? Math.round(stats.fitnessDone / stats.fitnessTotal * 100) : 0;
    const circumference = 2 * Math.PI * 26;
    const offset = circumference - (fitnessPct / 100) * circumference;
    const fitnessCard = document.createElement('div');
    fitnessCard.className = 'dashboard-progress-card';
    fitnessCard.innerHTML = `
      <div class="dp-ring-wrap">
        <svg viewBox="0 0 64 64" width="64" height="64">
          <circle class="dp-ring-bg" cx="32" cy="32" r="26"/>
          <circle class="dp-ring-fill" cx="32" cy="32" r="26" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
        </svg>
        <span class="dp-ring-text" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">${fitnessPct}%</span>
      </div>
      <div class="dp-label">运动 ${stats.fitnessDone}/${stats.fitnessTotal}</div>
    `;
    fitnessCard.onclick = () => Views.render('fitness');
    progRow.appendChild(fitnessCard);

    // 英语进度环
    const wordPct = stats.wordTotal > 0 ? Math.round(stats.wordDone / stats.wordTotal * 100) : 0;
    const wOffset = circumference - (wordPct / 100) * circumference;
    const englishCard = document.createElement('div');
    englishCard.className = 'dashboard-progress-card';
    englishCard.innerHTML = `
      <div class="dp-ring-wrap">
        <svg viewBox="0 0 64 64" width="64" height="64">
          <circle class="dp-ring-bg" cx="32" cy="32" r="26"/>
          <circle class="dp-ring-fill" cx="32" cy="32" r="26" stroke-dasharray="${circumference}" stroke-dashoffset="${wOffset}" style="stroke:#74b9ff;"/>
        </svg>
        <span class="dp-ring-text" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;fill:#0984e3;">${wordPct}%</span>
      </div>
      <div class="dp-label">单词 ${stats.wordDone}/${stats.wordTotal}</div>
    `;
    englishCard.onclick = () => Views.render('english');
    progRow.appendChild(englishCard);
    container.appendChild(progRow);

    // 快捷入口
    const shortcuts = document.createElement('div');
    shortcuts.className = 'dashboard-shortcuts';
    const scData = [
      { icon: '📖', title: '最近在读', sub: stats.readingBook ? stats.readingBook.title : '暂无', view: 'reading' },
      { icon: '📝', title: '今日英语', sub: `${stats.wordDone}/${stats.wordTotal} 单词已掌握`, view: 'english' },
      { icon: '💡', title: '最新灵感', sub: `${stats.recentInspirations.length} 条灵感待查看`, view: 'inspiration' },
      { icon: '🎯', title: '技能提升', sub: `本周新增 ${stats.weekSkills} 条知识`, view: 'copywriting' }
    ];
    scData.forEach(sc => {
      const card = document.createElement('div');
      card.className = 'dashboard-shortcut';
      card.innerHTML = `<span class="ds-icon">${sc.icon}</span><div class="ds-info"><div class="ds-title">${sc.title}</div><div class="ds-sub">${sc.sub}</div></div>`;
      card.onclick = () => Views.render(sc.view);
      shortcuts.appendChild(card);
    });
    container.appendChild(shortcuts);

    // 热力图
    const hmCard = document.createElement('div');
    hmCard.className = 'dashboard-heatmap';
    hmCard.innerHTML = `<div class="dashboard-heatmap-title">📊 本周打卡热力图</div>`;
    const hmRow = document.createElement('div');
    hmRow.className = 'heatmap-row';
    heatmap.forEach(h => {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      let level = '';
      if (h.count >= 6) level = 'l4';
      else if (h.count >= 4) level = 'l3';
      else if (h.count >= 2) level = 'l2';
      else if (h.count >= 1) level = 'l1';
      cell.innerHTML = `
        <div class="heatmap-block ${level} ${h.isToday ? 'today' : ''}"></div>
        <span class="heatmap-label">${h.weekday}</span>
      `;
      hmRow.appendChild(cell);
    });
    hmCard.appendChild(hmRow);
    container.appendChild(hmCard);

    // 统计摘要
    const statsDiv = document.createElement('div');
    statsDiv.className = 'dashboard-stats';
    statsDiv.innerHTML = `<div class="dashboard-stats-title">📈 本周与本月</div>`;
    const statsGrid = document.createElement('div');
    statsGrid.className = 'dashboard-stats-grid';
    const statItems = [
      { num: stats.weekCheckinDays, label: '本周打卡天数' },
      { num: stats.monthCheckinDays, label: `本月打卡/${stats.daysInMonth}天` },
      { num: stats.weekSkills, label: '本周技能知识' },
      { num: stats.weekInspirations, label: '本周灵感收藏' }
    ];
    statItems.forEach(si => {
      const item = document.createElement('div');
      item.className = 'dashboard-stat-item';
      item.innerHTML = `<div class="dashboard-stat-num">${si.num}</div><div class="dashboard-stat-label">${si.label}</div>`;
      statsGrid.appendChild(item);
    });
    statsDiv.appendChild(statsGrid);
    container.appendChild(statsDiv);

    // 最近内容
    if (stats.recentInspirations.length > 0 || stats.recentSkills.length > 0) {
      const recentDiv = document.createElement('div');
      recentDiv.className = 'dashboard-recent';

      if (stats.recentInspirations.length > 0) {
        const rTitle = document.createElement('div');
        rTitle.className = 'dashboard-recent-title';
        rTitle.textContent = '💡 最新灵感';
        recentDiv.appendChild(rTitle);
        stats.recentInspirations.forEach(item => {
          const ri = document.createElement('div');
          ri.className = 'dashboard-recent-item';
          ri.innerHTML = `<div class="dr-title">${this.escape(item.title)}</div><div class="dr-meta">${this.escape(item.category || '')} · ${this.escape(item.addDate || '')}</div>`;
          ri.onclick = () => { Views.render('inspiration'); setTimeout(() => UI.openInspirationDetailModal(item), 100); };
          recentDiv.appendChild(ri);
        });
      }

      if (stats.recentSkills.length > 0) {
        const sTitle = document.createElement('div');
        sTitle.className = 'dashboard-recent-title';
        sTitle.textContent = '🎯 最新技能知识';
        recentDiv.appendChild(sTitle);
        stats.recentSkills.forEach(item => {
          const modMap = { copywriting: '文案', editing: '剪辑', poster: '海报' };
          const viewMap = { copywriting: 'copywriting', editing: 'editing', poster: 'poster' };
          const ri = document.createElement('div');
          ri.className = 'dashboard-recent-item';
          ri.innerHTML = `<div class="dr-title">${this.escape(item.title)}</div><div class="dr-meta">${modMap[item._module] || ''} · ${this.escape(item.addDate || '')}</div>`;
          ri.onclick = () => { Views.render(viewMap[item._module] || 'copywriting'); setTimeout(() => UI.openKnowledgeDetailModal(item._module + 'Items', item), 100); };
          recentDiv.appendChild(ri);
        });
      }

      container.appendChild(recentDiv);
    }
  },

  // ===== 1. 身材管理 =====
  renderFitness(container) {
    this.renderTodayCard(container, 'fitness', '运动');

    // 打卡日历
    this.renderFitnessCalendar(container);

    const section = document.createElement('div');
    section.className = 'section-title';
    section.textContent = '运动清单';
    container.appendChild(section);

    const listWrap = document.createElement('div');
    const tasks = Store.get('fitnessTasks');
    if (tasks.length === 0) {
      listWrap.innerHTML = `<div class="empty"><div class="empty-text">暂无运动任务，点击下方添加</div></div>`;
    } else {
      tasks.forEach(task => {
        const done = Store.getCheckin('fitness', task.id);
        const item = document.createElement('div');
        item.className = 'task-item' + (done ? ' done' : '');
        item.innerHTML = `
          <div class="checkbox ${done ? 'checked' : ''}" data-action="toggle" data-id="${task.id}"></div>
          <div class="task-content">
            <div class="task-name">${this.escape(task.name)}</div>
            <div class="task-meta"><span class="tag tag-primary">${this.escape(task.duration)}</span></div>
          </div>
          <div class="task-actions">
            <button class="icon-btn" data-action="edit" data-id="${task.id}">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </button>
            <button class="icon-btn" data-action="delete" data-id="${task.id}">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          </div>
        `;
        listWrap.appendChild(item);
      });
    }
    container.appendChild(listWrap);

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ 新增运动任务';
    addBtn.onclick = () => UI.openFitnessModal();
    container.appendChild(addBtn);

    listWrap.onclick = (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      const action = target.dataset.action;
      const id = target.dataset.id;
      if (action === 'toggle') {
        Store.toggleCheckin('fitness', id);
        this.render('fitness');
      } else if (action === 'edit') {
        const task = Store.get('fitnessTasks').find(t => t.id === id);
        UI.openFitnessModal(task);
      } else if (action === 'delete') {
        UI.confirm('删除该运动任务？', () => {
          Store.removeFromArray('fitnessTasks', id);
          this.render('fitness');
          UI.toast('已删除');
        });
      }
    };

    // 体重记录
    this.renderWeightSection(container);
  },

  // 打卡日历（身材管理）
  renderFitnessCalendar(container) {
    const now = new Date();
    // 用内部状态管理当前显示月份
    if (!this._calendarMonth) {
      this._calendarMonth = { year: now.getFullYear(), month: now.getMonth() + 1 };
    }
    const { year, month } = this._calendarMonth;

    const calWrap = document.createElement('div');
    calWrap.className = 'fitness-calendar';

    // 标题栏
    const header = document.createElement('div');
    header.className = 'fitness-cal-header';
    header.innerHTML = `
      <button class="fitness-cal-nav" data-cal-action="prev"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
      <span class="fitness-cal-title">${year}年 ${month}月</span>
      <button class="fitness-cal-nav" data-cal-action="next"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg></button>
    `;
    calWrap.appendChild(header);

    // 星期头
    const weekHeader = document.createElement('div');
    weekHeader.className = 'fitness-cal-weekdays';
    ['日', '一', '二', '三', '四', '五', '六'].forEach(d => {
      const cell = document.createElement('div');
      cell.className = 'fitness-cal-weekday';
      cell.textContent = d;
      weekHeader.appendChild(cell);
    });
    calWrap.appendChild(weekHeader);

    // 日期网格
    const grid = document.createElement('div');
    grid.className = 'fitness-cal-grid';

    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const todayStr = Store.todayKey();

    // 填充空白格
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'fitness-cal-day empty';
      grid.appendChild(empty);
    }

    // 填充日期格
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cell = document.createElement('div');
      cell.className = 'fitness-cal-day';
      cell.textContent = d;

      const hasCheckin = Store.hasFitnessCheckin(dateStr);
      if (hasCheckin) cell.classList.add('checked');
      if (dateStr === todayStr) cell.classList.add('today');

      grid.appendChild(cell);
    }
    calWrap.appendChild(grid);

    // 图例
    const legend = document.createElement('div');
    legend.className = 'fitness-cal-legend';
    legend.innerHTML = `
      <span class="fitness-cal-legend-item"><span class="fitness-cal-legend-dot checked"></span>已打卡</span>
      <span class="fitness-cal-legend-item"><span class="fitness-cal-legend-dot today"></span>今天</span>
    `;
    calWrap.appendChild(legend);

    container.appendChild(calWrap);

    // 月份切换事件
    calWrap.querySelectorAll('.fitness-cal-nav').forEach(btn => {
      btn.onclick = () => {
        const action = btn.dataset.calAction;
        if (action === 'prev') {
          this._calendarMonth.month--;
          if (this._calendarMonth.month < 1) {
            this._calendarMonth.month = 12;
            this._calendarMonth.year--;
          }
        } else {
          this._calendarMonth.month++;
          if (this._calendarMonth.month > 12) {
            this._calendarMonth.month = 1;
            this._calendarMonth.year++;
          }
        }
        this.render('fitness');
      };
    });
  },

  renderWeightSection(container) {
    const records = Store.get('weightRecords');
    const weightCard = document.createElement('div');
    weightCard.className = 'weight-card';

    const header = document.createElement('div');
    header.className = 'weight-header';
    header.innerHTML = `
      <span class="weight-title">体重记录</span>
      <button class="weight-add-btn" id="addWeight">+ 记录体重</button>
    `;
    weightCard.appendChild(header);

    // 折线图
    const chartDiv = document.createElement('div');
    chartDiv.className = 'weight-chart';
    if (records.length >= 2) {
      chartDiv.appendChild(this.renderWeightChart(records));
    } else {
      chartDiv.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:13px;">记录2次以上即可生成折线图</div>`;
    }
    weightCard.appendChild(chartDiv);

    // 最近记录列表
    if (records.length > 0) {
      const listDiv = document.createElement('div');
      listDiv.className = 'weight-list';
      const recent = [...records].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
      recent.forEach(r => {
        const item = document.createElement('div');
        item.className = 'weight-item';
        item.innerHTML = `<span class="weight-date">${r.date}</span><span class="weight-value">${r.weight} kg</span>`;
        listDiv.appendChild(item);
      });
      weightCard.appendChild(listDiv);
    }

    container.appendChild(weightCard);

    document.getElementById('addWeight').onclick = () => UI.openWeightModal();
  },

  renderWeightChart(records) {
    const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));
    const w = 360, h = 160, pad = { t: 20, r: 20, b: 30, l: 40 };
    const cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
    const weights = sorted.map(r => r.weight);
    const minW = Math.min(...weights) - 1;
    const maxW = Math.max(...weights) + 1;
    const range = maxW - minW || 1;

    const x = i => pad.l + (i / (sorted.length - 1)) * cw;
    const y = v => pad.t + ch - ((v - minW) / range) * ch;

    let pathD = '';
    sorted.forEach((r, i) => {
      const px = x(i), py = y(r.weight);
      pathD += (i === 0 ? `M${px},${py}` : ` L${px},${py}`);
    });

    // 生成平滑曲线
    let smoothD = '';
    if (sorted.length > 0) {
      smoothD = `M${x(0)},${y(sorted[0].weight)}`;
      for (let i = 0; i < sorted.length - 1; i++) {
        const x0 = x(i), y0 = y(sorted[i].weight);
        const x1 = x(i + 1), y1 = y(sorted[i + 1].weight);
        const cpx = (x0 + x1) / 2;
        smoothD += ` C${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
      }
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('preserveAspectRatio', 'none');

    // 网格线
    for (let i = 0; i <= 4; i++) {
      const gy = pad.t + (ch / 4) * i;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pad.l);
      line.setAttribute('y1', gy);
      line.setAttribute('x2', w - pad.r);
      line.setAttribute('y2', gy);
      line.setAttribute('stroke', '#ffe0e6');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', pad.l - 6);
      text.setAttribute('y', gy + 4);
      text.setAttribute('text-anchor', 'end');
      text.setAttribute('fill', '#bbbbbb');
      text.setAttribute('font-size', '10');
      text.textContent = (maxW - (range / 4) * i).toFixed(1);
      svg.appendChild(text);
    }

    // 折线
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', smoothD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#ff8fa3');
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);

    // 数据点
    sorted.forEach((r, i) => {
      const px = x(i), py = y(r.weight);
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', px);
      circle.setAttribute('cy', py);
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#fff');
      circle.setAttribute('stroke', '#ff8fa3');
      circle.setAttribute('stroke-width', '2');
      svg.appendChild(circle);

      // 日期标签
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', px);
      label.setAttribute('y', h - 6);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('fill', '#bbbbbb');
      label.setAttribute('font-size', '9');
      label.textContent = r.date.slice(5);
      svg.appendChild(label);
    });

    return svg;
  },

  // ===== 2. 英语（重构：新概念+EnglishPod+雅思） =====
  renderEnglish(container) {
    // 1. 每日出题（最重要）
    this.renderDailyQuiz(container);

    // 2. 今日进度卡片（打卡状态）
    this.renderTodayCard(container, 'english', '学习');

    // 3. 打卡区域 — 新概念和 EnglishPod 默认折叠
    const tasks = Store.get('englishTasks');
    tasks.forEach(task => {
      container.appendChild(this.renderEnglishTaskCard(task));
    });

    // 4. 日历 + 统计合并
    this.renderEnglishCalendar(container);
    this.renderEnglishStats(container);

    // 5. 单词短语复习（底部）
    this.renderEnglishReview(container);
  },

  // 英语打卡日历（可点击查看当日内容）
  renderEnglishCalendar(container) {
    const now = new Date();
    if (!this._engCalendarMonth) {
      this._engCalendarMonth = { year: now.getFullYear(), month: now.getMonth() + 1 };
    }
    const { year, month } = this._engCalendarMonth;

    const calWrap = document.createElement('div');
    calWrap.className = 'fitness-calendar eng-calendar';

    // 标题栏
    const header = document.createElement('div');
    header.className = 'fitness-cal-header';
    header.innerHTML = `
      <button class="fitness-cal-nav" data-eng-cal="prev"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
      <span class="fitness-cal-title">${year}年 ${month}月 · 英语学习</span>
      <button class="fitness-cal-nav" data-eng-cal="next"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg></button>
    `;
    calWrap.appendChild(header);

    // 星期头
    const weekHeader = document.createElement('div');
    weekHeader.className = 'fitness-cal-weekdays';
    ['日', '一', '二', '三', '四', '五', '六'].forEach(d => {
      const cell = document.createElement('div');
      cell.className = 'fitness-cal-weekday';
      cell.textContent = d;
      weekHeader.appendChild(cell);
    });
    calWrap.appendChild(weekHeader);

    // 日期网格
    const grid = document.createElement('div');
    grid.className = 'fitness-cal-grid';

    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const todayStr = Store.todayKey();

    // 填充空白格
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'fitness-cal-day empty';
      grid.appendChild(empty);
    }

    // 填充日期格
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cell = document.createElement('div');
      cell.className = 'fitness-cal-day eng-cal-day';
      cell.textContent = d;

      const hasCheckin = Store.hasEnglishCheckin(dateStr);
      if (hasCheckin) cell.classList.add('checked');
      if (dateStr === todayStr) cell.classList.add('today');

      // 点击查看当日学习内容
      if (hasCheckin) {
        cell.style.cursor = 'pointer';
        cell.onclick = () => {
          const summary = Store.getEnglishDaySummary(dateStr);
          this.showEnglishDaySummary(summary);
        };
      }

      grid.appendChild(cell);
    }
    calWrap.appendChild(grid);

    // 图例
    const legend = document.createElement('div');
    legend.className = 'fitness-cal-legend';
    legend.innerHTML = `
      <span class="fitness-cal-legend-item"><span class="fitness-cal-legend-dot checked"></span>已打卡</span>
      <span class="fitness-cal-legend-item"><span class="fitness-cal-legend-dot today"></span>今天</span>
      <span class="fitness-cal-legend-item" style="font-size:10px;color:var(--text-muted);">💡 点击粉色日期查看详情</span>
    `;
    calWrap.appendChild(legend);

    container.appendChild(calWrap);

    // 月份切换事件
    calWrap.querySelectorAll('.fitness-cal-nav').forEach(btn => {
      btn.onclick = () => {
        const action = btn.dataset.engCal;
        if (action === 'prev') {
          this._engCalendarMonth.month--;
          if (this._engCalendarMonth.month < 1) {
            this._engCalendarMonth.month = 12;
            this._engCalendarMonth.year--;
          }
        } else {
          this._engCalendarMonth.month++;
          if (this._engCalendarMonth.month > 12) {
            this._engCalendarMonth.month = 1;
            this._engCalendarMonth.year++;
          }
        }
        this.render('english');
      };
    });
  },

  // 显示英语某日学习详情弹窗
  showEnglishDaySummary(summary) {
    let body = `<div style="font-size:13px;color:var(--text-sub);margin-bottom:12px;">📅 ${summary.date}</div>`;

    if (!summary.hasContent) {
      body += '<div style="text-align:center;padding:20px;color:var(--text-muted);">该日暂无学习记录</div>';
    } else {
      // 打卡任务
      if (summary.checkedTasks.length > 0) {
        body += `<div style="margin-bottom:10px;"><strong>✅ 已完成任务</strong><br>${summary.checkedTasks.map(t => `· ${Views.escape(t)}`).join('<br>')}</div>`;
      }
      // 学习内容
      if (summary.topics.length > 0) {
        body += `<div style="margin-bottom:10px;"><strong>📝 学习内容</strong>`;
        summary.topics.forEach(tp => {
          body += `<div style="margin-top:4px;padding:8px;background:var(--bg-soft);border-radius:8px;font-size:13px;white-space:pre-wrap;">${Views.escape(tp.topic)}</div>`;
        });
        body += `</div>`;
      }
      // 新概念进度
      if (summary.lessonHistory.length > 0) {
        body += `<div style="margin-bottom:10px;"><strong>📖 新概念进度</strong><br>${summary.lessonHistory.map(h => `· 学完第 ${h.lesson} 课`).join('<br>')}</div>`;
      }
      // EnglishPod
      if (summary.episodes.length > 0) {
        body += `<div style="margin-bottom:10px;"><strong>🎧 EnglishPod</strong><br>${summary.episodes.map(ep => `· [${Views.escape(ep.type)}] ${Views.escape(ep.title || '未命名')}`).join('<br>')}</div>`;
      }
      // 当日生词
      if (summary.newWords.length > 0) {
        body += `<div style="margin-bottom:10px;"><strong>🔤 生词 (${summary.newWords.length})</strong><br>`;
        summary.newWords.forEach(w => {
          body += `· <strong>${Views.escape(w.text)}</strong>`;
          if (w.phonetic) body += ` /${Views.escape(w.phonetic)}/`;
          if (w.meaning) body += ` — ${Views.escape(w.meaning)}`;
          body += `<br>`;
        });
        body += `</div>`;
      }
      // 当日短语
      if (summary.newPhrases && summary.newPhrases.length > 0) {
        body += `<div style="margin-bottom:10px;"><strong>💬 短语 (${summary.newPhrases.length})</strong><br>`;
        summary.newPhrases.forEach(p => {
          body += `· <strong>${Views.escape(p.en)}</strong> — ${Views.escape(p.cn || '')}`;
          if (p.example) body += `<br>&nbsp;&nbsp;<em style="color:var(--text-muted);font-size:12px;">${Views.escape(p.example)}</em>`;
          body += `<br>`;
        });
        body += `</div>`;
      }
    }

    UI.openModal({
      title: '英语学习详情',
      body,
      footer: '<button class="btn btn-primary btn-block" data-close>关闭</button>',
      onMount: (modal) => {
        modal.querySelector('[data-close]').onclick = () => UI.closeModal();
      }
    });
  },

  // ===== 每日英语出题（每天必出造句题） =====
  renderDailyQuiz(container) {
    const quiz = Store.generateDailyQuiz();
    if (!quiz.question) {
      if (quiz.type === 'none') {
        const hint = document.createElement('div');
        hint.className = 'eng-quiz-card eng-quiz-empty';
        hint.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:13px;">📝 添加生词或短语后，每天自动出题练习</div>';
        container.appendChild(hint);
      }
      return;
    }

    const quizCard = document.createElement('div');
    quizCard.className = 'eng-quiz-card';
    quizCard.id = 'dailyQuizCard';

    const typeLabels = { choice: '📋 选择题', fill: '✏️ 填空题', sentence: '💬 造句题' };
    const isAnswered = quiz.userAnswer !== '';

    let body = '';
    if (isAnswered) {
      const correctIcon = quiz.correct ? '✅ 回答正确！' : '❌ 回答错误';
      body = `
        <div class="eng-quiz-type">${typeLabels[quiz.type] || '每日一题'}</div>
        <div class="eng-quiz-question">${Views.escape(quiz.question)}</div>
        <div class="eng-quiz-result ${quiz.correct ? 'correct' : 'wrong'}">
          ${correctIcon}
          ${!quiz.correct ? `<div style="margin-top:4px;font-size:13px;">正确答案：<strong>${Views.escape(quiz.answer)}</strong></div>` : ''}
          ${quiz.type === 'sentence' ? `<div style="margin-top:4px;font-size:12px;color:var(--text-sub);">你的答案：${Views.escape(quiz.userAnswer)}</div>` : ''}
        </div>
        ${quiz.type === 'sentence' && quiz.phraseExample ? `<div class="eng-quiz-example">💡 参考例句：${Views.escape(quiz.phraseExample)}</div>` : ''}
      `;
    } else {
      body = `<div class="eng-quiz-type">💬 造句题</div>`;
      body += `<div class="eng-quiz-question">${Views.escape(quiz.question)}</div>`;
      body += `<textarea class="eng-quiz-textarea" id="quizInput" placeholder="在这里写下你的英文句子..." rows="3"></textarea>`;
      body += `<button class="eng-quiz-submit" id="quizSubmit">✍️ 提交答案</button>`;
    }

    quizCard.innerHTML = body;
    container.appendChild(quizCard);

    // 绑定事件
    if (!isAnswered) {
      const submitBtn = document.getElementById('quizSubmit');
      const inputEl = document.getElementById('quizInput');

      const doSubmit = (answer) => {
        const isCorrect = Store.submitQuizAnswer(answer);
        const oldCard = document.getElementById('dailyQuizCard');
        if (oldCard) {
          const newQuiz = Store.data.dailyQuiz;
          const correctIcon = isCorrect ? '✅ 回答正确！' : '❌ 回答错误';
          oldCard.innerHTML = `
            <div class="eng-quiz-type">${typeLabels[newQuiz.type] || '每日一题'}</div>
            <div class="eng-quiz-question">${Views.escape(newQuiz.question)}</div>
            <div class="eng-quiz-result ${isCorrect ? 'correct' : 'wrong'}">
              ${correctIcon}
              ${!isCorrect ? `<div style="margin-top:4px;font-size:13px;">正确答案：<strong>${Views.escape(newQuiz.answer)}</strong></div>` : ''}
              ${newQuiz.type === 'sentence' ? `<div style="margin-top:4px;font-size:12px;color:var(--text-sub);">你的答案：${Views.escape(newQuiz.userAnswer)}</div>` : ''}
            </div>
            ${newQuiz.type === 'sentence' && newQuiz.phraseExample ? `<div class="eng-quiz-example">💡 参考例句：${Views.escape(newQuiz.phraseExample)}</div>` : ''}
          `;
        }
        UI.toast(isCorrect ? '太棒了！🎉' : '再想想，下次一定对！');
      };

      if (submitBtn && inputEl) {
        submitBtn.onclick = () => {
          const val = inputEl.value.trim();
          if (!val) { UI.toast('请输入答案'); return; }
          doSubmit(val);
        };
        inputEl.onkeydown = (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const val = inputEl.value.trim();
            if (!val) { UI.toast('请输入答案'); return; }
            doSubmit(val);
          }
        };
      }
    }
  },

  // 英语学习统计卡片
  renderEnglishStats(container) {
    const tasks = Store.get('englishTasks');
    let totalWords = 0, masteredWords = 0;
    tasks.forEach(t => {
      if (t.words) { totalWords += t.words.length; masteredWords += t.words.filter(w => w.done).length; }
    });

    const today = Store.todayKey();
    const weekDays = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const day = Store.data.checkins[ds] || {};
      weekDays.push(!!(day.english && Object.values(day.english).some(Boolean)));
    }
    const weekStudyDays = weekDays.filter(Boolean).length;

    const statsCard = document.createElement('div');
    statsCard.className = 'eng-stats-card';
    statsCard.innerHTML = `
      <div class="eng-stats-grid">
        <div class="eng-stat-item">
          <div class="eng-stat-num">${totalWords}</div>
          <div class="eng-stat-label">累计生词</div>
        </div>
        <div class="eng-stat-item">
          <div class="eng-stat-num">${masteredWords}</div>
          <div class="eng-stat-label">已掌握</div>
        </div>
        <div class="eng-stat-item">
          <div class="eng-stat-num">${weekStudyDays}</div>
          <div class="eng-stat-label">本周学习天数</div>
        </div>
        <div class="eng-stat-item">
          <div class="eng-stat-num">${(masteredWords / Math.max(1, totalWords) * 100).toFixed(0)}%</div>
          <div class="eng-stat-label">掌握率</div>
        </div>
      </div>
    `;
    container.appendChild(statsCard);
  },

  // 单词和短语整合复习区（默认折叠，只展示前5条）
  renderEnglishReview(container) {
    const tasks = Store.get('englishTasks');
    let allWords = [];
    let allPhrases = [];
    tasks.forEach(t => {
      // 当日
      if (t.words) allWords = allWords.concat(t.words.map(w => ({...w, taskName: t.name})));
      if (t.phrases) allPhrases = allPhrases.concat(t.phrases.map(p => ({...p, taskName: t.name})));
      // 历史
      if (t.wordHistory) t.wordHistory.forEach(h => {
        allWords = allWords.concat(h.words.map(w => ({...w, taskName: t.name, addDate: h.date})));
      });
      if (t.phraseHistory) t.phraseHistory.forEach(h => {
        allPhrases = allPhrases.concat(h.phrases.map(p => ({...p, taskName: t.name, addDate: h.date})));
      });
    });

    if (allWords.length === 0 && allPhrases.length === 0) return;

    const reviewCard = document.createElement('div');
    reviewCard.className = 'eng-review-card';

    // 标题
    const header = document.createElement('div');
    header.className = 'eng-review-header';
    const masteredCount = allWords.filter(w => w.done).length;
    header.innerHTML = `
      <span class="eng-review-title">单词短语复习</span>
      <span class="eng-review-stat">${masteredCount}/${allWords.length} 已掌握</span>
    `;
    reviewCard.appendChild(header);

    // Tab切换：单词 / 短语
    const tabBar = document.createElement('div');
    tabBar.className = 'eng-review-tabs';
    tabBar.innerHTML = `
      <button class="eng-review-tab active" data-tab="words">生词 (${allWords.length})</button>
      <button class="eng-review-tab" data-tab="phrases">短语 (${allPhrases.length})</button>
    `;
    reviewCard.appendChild(tabBar);

    // 内容区
    const content = document.createElement('div');
    content.className = 'eng-review-content';
    reviewCard.appendChild(content);

    // 查看更多按钮区域
    const moreWrap = document.createElement('div');
    moreWrap.style.textAlign = 'center';
    moreWrap.style.padding = '8px 0';
    reviewCard.appendChild(moreWrap);

    const SHOW_LIMIT = 5;
    let expandedWords = false;
    let expandedPhrases = false;
    let currentTab = 'words';

    const renderWords = () => {
      content.innerHTML = '';
      if (allWords.length === 0) {
        content.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px;">暂无生词</div>';
        moreWrap.innerHTML = '';
        return;
      }
      const showAll = expandedWords;
      const display = showAll ? allWords : allWords.slice(0, SHOW_LIMIT);
      display.forEach(w => {
        const item = document.createElement('div');
        item.className = 'eng-review-word';
        const hasDetails = w.phonetic || w.meaning || w.pos;
        item.innerHTML = `
          <div class="checkbox ${w.done ? 'checked' : ''}" data-wid="${w.id}" data-task="${w.taskName}"></div>
          <div class="eng-review-word-body">
            <span class="eng-review-word-text">${Views.escape(w.text)}</span>
            ${hasDetails ? `<div class="eng-review-word-details">
              ${w.phonetic ? `<span class="eng-word-phonetic">/${Views.escape(w.phonetic)}/</span>` : ''}
              ${w.pos ? `<span class="eng-word-pos">${Views.escape(w.pos)}</span>` : ''}
              ${w.meaning ? `<span class="eng-word-meaning">${Views.escape(w.meaning)}</span>` : ''}
            </div>` : ''}
          </div>
          <span class="eng-review-word-tag">${Views.escape(w.taskName)}</span>
        `;
        content.appendChild(item);
      });

      // 查看更多按钮
      if (allWords.length > SHOW_LIMIT) {
        moreWrap.innerHTML = `<button class="eng-more-btn">${showAll ? '收起' : `查看更多 (${allWords.length - SHOW_LIMIT}+)`}</button>`;
        moreWrap.querySelector('.eng-more-btn').onclick = () => {
          expandedWords = !expandedWords;
          renderWords();
        };
      } else {
        moreWrap.innerHTML = '';
      }

      // 绑定打勾事件
      content.querySelectorAll('.checkbox').forEach(cb => {
        cb.onclick = () => {
          const wid = cb.dataset.wid;
          const taskName = cb.dataset.task;
          const task = Store.get('englishTasks').find(t => t.name === taskName);
          if (task && task.words) {
            const word = task.words.find(x => x.id === wid);
            if (word) {
              word.done = !word.done;
              Store.save();
              this.render('english');
            }
          }
        };
      });
    };

    const renderPhrases = () => {
      content.innerHTML = '';
      if (allPhrases.length === 0) {
        content.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px;">暂无短语</div>';
        moreWrap.innerHTML = '';
        return;
      }
      const showAll = expandedPhrases;
      const display = showAll ? allPhrases : allPhrases.slice(0, SHOW_LIMIT);
      display.forEach(p => {
        const item = document.createElement('div');
        item.className = 'eng-review-phrase';
        item.innerHTML = `
          <div class="eng-review-phrase-en">${Views.escape(p.en)}</div>
          <div class="eng-review-phrase-cn">${Views.escape(p.cn)}</div>
          ${p.example ? `<div class="eng-review-phrase-ex">${Views.escape(p.example)}</div>` : ''}
          <span class="eng-review-word-tag">${Views.escape(p.taskName)}</span>
        `;
        content.appendChild(item);
      });

      if (allPhrases.length > SHOW_LIMIT) {
        moreWrap.innerHTML = `<button class="eng-more-btn">${showAll ? '收起' : `查看更多 (${allPhrases.length - SHOW_LIMIT}+)`}</button>`;
        moreWrap.querySelector('.eng-more-btn').onclick = () => {
          expandedPhrases = !expandedPhrases;
          renderPhrases();
        };
      } else {
        moreWrap.innerHTML = '';
      }
    };

    // Tab切换逻辑
    renderWords();
    tabBar.querySelectorAll('.eng-review-tab').forEach(tab => {
      tab.onclick = () => {
        currentTab = tab.dataset.tab;
        tabBar.querySelectorAll('.eng-review-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (currentTab === 'words') { expandedWords = false; renderWords(); }
        else { expandedPhrases = false; renderPhrases(); }
      };
    });

    container.appendChild(reviewCard);
  },

  renderEnglishTaskCard(task) {
    const done = Store.getCheckin('english', task.id);
    const card = document.createElement('div');
    card.className = 'eng-task-card';
    card.dataset.id = task.id;

    // 标题栏（可点击折叠）
    const header = document.createElement('div');
    header.className = 'eng-task-header eng-task-collapsible';
    const hasWords = (task.words || []).length > 0 || (task.phrases || []).length > 0;
    header.innerHTML = `
      <div class="checkbox ${done ? 'checked' : ''}" data-action="toggle" data-id="${task.id}"></div>
      <div class="eng-task-name ${done ? 'done' : ''}" style="flex:1;font-size:15px;font-weight:600;">${this.escape(task.name)}</div>
      <span class="eng-task-summary">
        ${hasWords ? `${(task.words||[]).length}词·${(task.phrases||[]).length}短语` : '点击展开'}
      </span>
      <span class="eng-task-arrow collapsed">▾</span>
    `;

    const body = document.createElement('div');
    body.className = 'eng-task-body collapsed';
    card.appendChild(header);
    card.appendChild(body);

    // 点击标题折叠/展开
    header.onclick = (e) => {
      if (e.target.closest('[data-action="toggle"]')) return; // 不拦截checkbox
      body.classList.toggle('collapsed');
      header.querySelector('.eng-task-arrow').classList.toggle('collapsed');
    };

    // ===== 新概念英语：课程进度 + PDF导入 =====
    if (task.id === 'e1') {
      const prog = task.lessonProgress || 1;
      const total = task.lessonTotal || 144;
      const pct = Math.round(prog / total * 100);
      const pdfs = task.pdfs || [];
      const progDiv = document.createElement('div');
      progDiv.className = 'eng-lesson-progress';
      progDiv.innerHTML = `
        <div class="eng-lesson-info">
          <span>📖 当前进度：第 <strong>${prog}</strong> 课 / 共 ${total} 课</span>
          <span class="eng-lesson-pct">${pct}%</span>
        </div>
        <div class="eng-lesson-bar"><div class="eng-lesson-fill" style="width:${pct}%"></div></div>
        <div class="eng-lesson-actions">
          <button class="eng-lesson-btn" data-action="lesson-done">✅ 学完一课 (+1)</button>
          <button class="eng-lesson-btn" data-action="lesson-set">🔢 设置进度</button>
        </div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <span style="font-size:12px;font-weight:600;color:var(--text-sub);">📎 配套PDF资料 (${pdfs.length})</span>
            <button class="eng-lesson-btn" data-action="pdf-add" style="font-size:11px;padding:4px 10px;">📥 导入PDF</button>
          </div>
          ${pdfs.length > 0 ? `
          <div class="eng-pdf-list">
            ${pdfs.map(p => `
              <div class="eng-pdf-item" data-action="pdf-view" data-pdf-id="${p.id}">
                <span style="font-size:16px;">📄</span>
                <span style="flex:1;font-size:12px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Views.escape(p.name)}</span>
                <span style="font-size:10px;color:var(--text-muted);">${Views.escape(p.size)}</span>
                <button class="icon-btn" data-action="pdf-del" data-pdf-id="${p.id}" style="width:22px;height:22px;color:var(--danger);" title="删除">
                  <svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
          ` : '<div style="font-size:11px;color:var(--text-muted);text-align:center;padding:8px 0;">暂无PDF资料，点击"导入PDF"添加</div>'}
        </div>
      `;
      body.appendChild(progDiv);
    }

    // ===== EnglishPod：听力打卡 =====
    if (task.id === 'e2') {
      const epCount = task.episodeCount || 0;
      const epDiv = document.createElement('div');
      epDiv.className = 'eng-episode-card';
      epDiv.innerHTML = `
        <div class="eng-episode-info">
          <span>🎧 已听 <strong>${epCount}</strong> 期</span>
        </div>
        <div class="eng-lesson-actions">
          <button class="eng-lesson-btn" data-action="ep-add">➕ 新增一期</button>
        </div>
        ${(task.episodes || []).length > 0 ? `
        <div class="eng-episode-list">
          ${task.episodes.slice(-5).reverse().map(ep => `
            <div class="eng-episode-item">
              <span class="eng-episode-type ${ep.type === '精听' ? 'intensive' : 'extensive'}">${ep.type}</span>
              <span>${this.escape(ep.title || '未命名')}</span>
              <span style="font-size:11px;color:var(--text-muted);">${this.escape(ep.date || '')}</span>
            </div>
          `).join('')}
        </div>` : ''}
      `;
      body.appendChild(epDiv);
    }

    // 学习主题（textarea 支持换行）
    const topicDiv = document.createElement('div');
    topicDiv.style.marginTop = '10px';
    topicDiv.innerHTML = `
      <div class="label">今日学习内容</div>
      <textarea class="textarea eng-topic-textarea" data-action="topic" data-id="${task.id}" placeholder="记录今天学了什么...支持换行">${this.escape(task.topic || '')}</textarea>
    `;
    body.appendChild(topicDiv);

    // 生词板块
    const wordsSection = document.createElement('div');
    wordsSection.className = 'eng-section';
    wordsSection.innerHTML = `<div class="eng-section-title">生词 <span style="font-weight:400;font-size:11px;color:var(--text-muted);">${(task.words||[]).filter(w=>w.done).length}/${(task.words||[]).length} 已掌握</span></div>`;
    const wordsList = document.createElement('div');
    if (task.words && task.words.length > 0) {
      task.words.forEach(w => {
        const wi = document.createElement('div');
        wi.className = 'eng-word-item';
        const hasDetails = w.phonetic || w.meaning || w.pos;
        wi.innerHTML = `
          <div class="checkbox ${w.done ? 'checked' : ''}" data-action="word-toggle" data-task="${task.id}" data-wid="${w.id}"></div>
          <div class="eng-word-body">
            <span class="eng-word-text">${this.escape(w.text)}</span>
            ${hasDetails ? `<div class="eng-word-details">
              ${w.phonetic ? `<span class="eng-word-phonetic">/${this.escape(w.phonetic)}/</span>` : ''}
              ${w.pos ? `<span class="eng-word-pos">${this.escape(w.pos)}</span>` : ''}
              ${w.meaning ? `<span class="eng-word-meaning">${this.escape(w.meaning)}</span>` : ''}
            </div>` : ''}
          </div>
          <button class="icon-btn" data-action="word-edit" data-task="${task.id}" data-wid="${w.id}" style="width:24px;height:24px;">
            <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="icon-btn" data-action="word-del" data-task="${task.id}" data-wid="${w.id}" style="width:24px;height:24px;">
            <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"/></svg>
          </button>
        `;
        wordsList.appendChild(wi);
      });
    }
    wordsSection.appendChild(wordsList);
    const addWordBtn = document.createElement('button');
    addWordBtn.className = 'eng-add-small';
    addWordBtn.innerHTML = '+ 添加生词';
    addWordBtn.onclick = () => UI.openWordModal(task.id);
    wordsSection.appendChild(addWordBtn);
    body.appendChild(wordsSection);

    // 短语板块（带删除）
    const phraseSection = document.createElement('div');
    phraseSection.className = 'eng-section';
    phraseSection.innerHTML = `<div class="eng-section-title">短语</div>`;
    if (task.phrases && task.phrases.length > 0) {
      task.phrases.forEach(p => {
        const pi = document.createElement('div');
        pi.className = 'eng-phrase-item';
        pi.style.position = 'relative';
        pi.innerHTML = `
          <div class="eng-phrase-en">${this.escape(p.en)}</div>
          <div class="eng-phrase-cn">${this.escape(p.cn)}</div>
          ${p.example ? `<div class="eng-phrase-ex">${this.escape(p.example)}</div>` : ''}
          <button class="icon-btn" data-action="phrase-edit" data-task="${task.id}" data-pid="${p.id}" style="position:absolute;top:4px;right:28px;width:24px;height:24px;">
            <svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="icon-btn" data-action="phrase-del" data-task="${task.id}" data-pid="${p.id}" style="position:absolute;top:4px;right:4px;width:24px;height:24px;">
            <svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"/></svg>
          </button>
        `;
        phraseSection.appendChild(pi);
      });
    }
    const addPhraseBtn = document.createElement('button');
    addPhraseBtn.className = 'eng-add-small';
    addPhraseBtn.innerHTML = '+ 添加短语';
    addPhraseBtn.onclick = () => UI.openPhraseModal(task.id);
    phraseSection.appendChild(addPhraseBtn);
    body.appendChild(phraseSection);

    // 事件委托
    card.onclick = (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      e.stopPropagation();
      const action = target.dataset.action;
      const id = target.dataset.id;
      const taskId = target.dataset.task;
      const wid = target.dataset.wid;
      const pid = target.dataset.pid;

      if (action === 'toggle') {
        Store.toggleCheckin('english', id);
        this.render('english');
      } else if (action === 'word-toggle') {
        const t = Store.get('englishTasks').find(x => x.id === taskId);
        const w = t.words.find(x => x.id === wid);
        if (w) { w.done = !w.done; Store.save(); this.render('english'); }
      } else if (action === 'word-del') {
        const t = Store.get('englishTasks').find(x => x.id === taskId);
        t.words = t.words.filter(x => x.id !== wid);
        Store.save(); this.render('english');
      } else if (action === 'word-edit') {
        const t = Store.get('englishTasks').find(x => x.id === taskId);
        const w = t.words.find(x => x.id === wid);
        if (w) UI.openWordEditModal(taskId, w);
      } else if (action === 'phrase-del') {
        const t = Store.get('englishTasks').find(x => x.id === taskId);
        t.phrases = t.phrases.filter(x => x.id !== pid);
        Store.save(); this.render('english');
      } else if (action === 'phrase-edit') {
        const t = Store.get('englishTasks').find(x => x.id === taskId);
        const p = t.phrases.find(x => x.id === pid);
        if (p) UI.openPhraseEditModal(taskId, p);
      } else if (action === 'lesson-done') {
        UI.advanceLesson(task);
      } else if (action === 'lesson-set') {
        UI.setLessonProgress(task);
      } else if (action === 'ep-add') {
        UI.addEpisode(task);
      } else if (action === 'pdf-add') {
        UI.importPdf(task);
      } else if (action === 'pdf-view') {
        const pdfId = target.dataset.pdfId;
        UI.viewPdf(task, pdfId);
      } else if (action === 'pdf-del') {
        const pdfId = target.dataset.pdfId;
        UI.confirm('删除该PDF文件？', () => {
          task.pdfs = (task.pdfs || []).filter(p => p.id !== pdfId);
          Store.save();
          Views.render('english');
          UI.toast('已删除');
        });
      }
    };

    // 主题输入防抖保存
    let topicTimer = null;
    card.oninput = (e) => {
      const target = e.target.closest('[data-action="topic"]');
      if (!target) return;
      clearTimeout(topicTimer);
      topicTimer = setTimeout(() => {
        Store.updateInArray('englishTasks', task.id, { topic: target.value });
      }, 600);
    };

    return card;
  },

  // ===== 3. 阅读（按分类分组 + 封面卡片 + 一句话摘要 + 折叠） =====
  renderReading(container) {
    const books = Store.get('books');
    const finished = books.filter(b => b.status === 'finished');
    const reading = books.filter(b => b.status === 'reading');

    // 顶部统计卡片
    const totalCard = document.createElement('div');
    totalCard.className = 'book-total-card';
    const catCount = new Set(books.map(b => b.category || '未分类')).size;
    totalCard.innerHTML = `
      <div class="book-total-num">${finished.length}<span style="font-size:14px;font-weight:400;color:var(--text-sub);">/ ${books.length}</span></div>
      <div class="book-total-label">已读完 · ${reading.length} 本在读 · ${catCount} 个分类</div>
    `;
    container.appendChild(totalCard);

    if (books.length === 0) {
      container.appendChild(this.emptyState('📚', '还没有书籍，去添加第一本吧'));
    } else {
      // 按 category 分类分组，微信读书的分类格式为 "大类-小类"
      const categories = {};
      books.forEach(b => {
        const rawCat = b.category || '未分类';
        const mainCat = rawCat.includes('-') ? rawCat.split('-')[0] : rawCat;
        if (!categories[mainCat]) categories[mainCat] = [];
        categories[mainCat].push(b);
      });

      // 按书籍数量排序
      const sortedCats = Object.entries(categories).sort((a, b) => b[1].length - a[1].length);

      sortedCats.forEach(([cat, catBooks]) => {
        const group = document.createElement('div');
        group.className = 'book-category-section';

        // 统计该分类的阅读进度
        const catFinished = catBooks.filter(b => b.status === 'finished').length;

        // 分类标题栏（可折叠）
        const header = document.createElement('div');
        header.className = 'book-cat-header';
        header.innerHTML = `
          <div class="book-cat-title">
            <span class="book-cat-icon">${this.getCategoryIcon(cat)}</span>
            <span>${this.escape(cat)}</span>
            <span class="book-cat-count">${catFinished}/${catBooks.length}</span>
          </div>
        `;
        // 点击折叠
        header.onclick = () => {
          header.classList.toggle('collapsed');
          const grid = header.nextElementSibling;
          if (grid) grid.classList.toggle('collapsed');
        };
        group.appendChild(header);

        // 书籍网格
        const grid = document.createElement('div');
        grid.className = 'book-grid';
        catBooks.forEach(book => {
          const card = document.createElement('div');
          card.className = 'book-card';
          card.dataset.id = book.id;

          // 生成一句话摘要预览
          const oneLiner = this.getBookOneLiner(book);

          // 状态文案
          const statusMap = { finished: '已读完', reading: '在读', pending: '待读' };
          const statusClass = book.status || 'pending';
          const statusText = statusMap[book.status] || '待读';

          card.innerHTML = `
            <div class="book-card-cover">
              ${book.cover 
                ? `<img src="${this.escape(book.cover)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">`
                : ''}
              <div class="book-card-cover-fallback" style="${book.cover ? 'display:none' : ''}">📖</div>
              <span class="book-card-status ${statusClass}">${statusText}</span>
            </div>
            <div class="book-card-info">
              <div class="book-card-title">${this.escape(book.title)}</div>
              ${book.author ? `<div class="book-card-author">${this.escape(book.author)}</div>` : ''}
              ${oneLiner ? `<div class="book-card-summary">💡 ${this.escape(oneLiner)}</div>` : ''}
            </div>
          `;
          grid.appendChild(card);
        });
        group.appendChild(grid);
        container.appendChild(group);
      });
    }

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.style.marginTop = '8px';
    addBtn.innerHTML = '+ 添加书籍';
    addBtn.onclick = () => UI.openBookModal();
    container.appendChild(addBtn);

    const importBtn = document.createElement('button');
    importBtn.className = 'add-btn';
    importBtn.style.marginTop = '8px';
    importBtn.style.borderColor = 'var(--success)';
    importBtn.style.color = 'var(--success)';
    importBtn.innerHTML = '📱 从微信读书导入';
    importBtn.onclick = () => UI.openWechatReadingImport();
    container.appendChild(importBtn);

    // 点击书籍查看详情
    container.onclick = (e) => {
      const card = e.target.closest('.book-card');
      if (!card) return;
      const book = Store.get('books').find(b => b.id === card.dataset.id);
      if (book) UI.openBookDetailModal(book);
    };
  },

  // 获取一句话摘要（用于卡片预览）
  getBookOneLiner(book) {
    const title = (book.title || '').toLowerCase();
    const oneLiners = {
      '纳瓦尔宝典': '财富靠股权而非时间，把自己产品化',
      '富爸爸穷爸爸': '让钱为你工作，不断买入资产减少负债',
      '富爸爸女人一定要有钱': '财务自由是女性最好的铠甲',
      '认知觉醒': '人与人差距的本质是认知能力，消除模糊才能行动',
      '人性的弱点': '真诚赞美他人，不批评不抱怨',
      '爆款文案': '好文案是策划出来的，不是写出来的',
      '置身事内': '理解中国经济，不能脱离政府这个关键角色',
      '法治的细节': '法律是最低限度的道德，程序正义重于结果正义',
      '长安的荔枝': '小人物在不可能完成的任务中寻找出路',
      '明朝那些事儿': '历史由人创造，读史使人明智',
      '你当像鸟飞往你的山': '教育给你选择的自由，即使要与过去告别',
      '定投十年财务自由': '普通人最靠谱的财务自由之路：定投指数基金',
      '百年孤独': '布恩迪亚家族七代人的兴衰，隐喻拉美历史',
      '杀死一只知更鸟': '勇气是明知会输依然坚持做对的事',
      '穷查理宝典': '用多元思维模型做决策，避免认知偏差',
      '底层逻辑': '看清事物根本规律，才能做出正确决策',
      '舍不得看完的中国史': '通过经典战役看中国历史的关键转折',
      '爆款小红书': '封面决定点击，内容决定点赞和收藏',
      '思考的技术': '思考像肌肉，越练越强，追问5个Why找根本原因',
      '我在100天内自学英文翻转人生': '100LS法则：同一部电影看100遍，打通听说',
      '汴京之围': '靖康之变全景还原，繁荣帝国的崩溃逻辑',
      '小王子': '真正重要的东西，眼睛是看不见的',
      '三体': '宇宙社会学：黑暗森林法则',
      '活着': '人是为了活着本身而活着',
      '围城': '婚姻是一座围城，外面的人想进去',
      '平凡的世界': '普通人在大时代中的挣扎与奋斗',
      '红楼梦': '大厦将倾前的繁华一梦，中国古典文学巅峰',
      '西游记': '取经路上的修行，每个人心中都有一个孙悟空',
      '水浒传': '官逼民反的草莽史诗',
      '三国演义': '天下大势分久必合合久必分',
    };

    for (const [key, value] of Object.entries(oneLiners)) {
      if (title.includes(key) || key.includes(title)) return value;
    }

    // 基于分类生成通用摘要
    const cat = (book.category || '').toLowerCase();
    if (cat.includes('理财') || cat.includes('经济')) return '建立正确的金钱观，让钱为你工作';
    if (cat.includes('成长') || cat.includes('励志')) return '突破思维局限，小习惯带来大改变';
    if (cat.includes('历史')) return '以史为鉴，在时代洪流中看人性与选择';
    if (cat.includes('文学') || cat.includes('小说')) return '用文学的形式探讨人性与命运的永恒主题';
    if (cat.includes('教育') || cat.includes('外语')) return '用科学方法代替低效努力，高效学习';
    if (cat.includes('心理')) return '认识自己，理解他人，突破心智局限';
    if (cat.includes('哲学')) return '追问根本问题，建立自己的思维框架';
    if (cat.includes('科学')) return '探索世界运行的规律与奥秘';
    if (cat.includes('计算机')) return '掌握数字时代最核心的生产力工具';

    return '';
  },

  // 分类图标
  getCategoryIcon(cat) {
    const map = {
      '经济理财': '💰', '个人成长': '🌱', '文学': '📝', '历史': '🏛️',
      '心理': '🧠', '教育学习': '📚', '社会文化': '🏙️', '精品小说': '📖',
      '计算机': '💻', '哲学': '💭', '科学': '🔬', '艺术': '🎨',
      '政治军事': '⚔️', '宗教': '🙏', '生活': '🏠', '医学': '💊',
      '未分类': '📚'
    };
    return map[cat] || '📚';
  },

  // ===== 4. AI学习（重构：AI工具 + AI新闻） =====
  renderAI(container) {
    const items = Store.get('aiItems');
    const tools = Store.get('aiTools');
    const lastFetch = Store.get('aiLastFetch');

    // ===== 顶部：AI行业每日新闻 =====
    const info = document.createElement('div');
    info.className = 'card';
    info.style.background = 'linear-gradient(135deg, #7bc67e, #a8d8a8)';
    info.style.color = '#fff';
    info.style.marginTop = '4px';
    info.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:20px;">🤖</span>
        <div style="font-size:15px;font-weight:600;">AI行业每日新闻</div>
      </div>
      <div style="font-size:12px;opacity:0.9;">自动采集各平台AI最新动态，涵盖产品发布、行业趋势、技术突破</div>
      ${lastFetch ? `<div style="font-size:11px;opacity:0.8;margin-top:8px;">上次采集：${lastFetch}</div>` : '<div style="font-size:11px;opacity:0.8;margin-top:8px;">尚未采集</div>'}
      <button class="btn" style="background:rgba(255,255,255,0.3);color:#fff;margin-top:12px;" id="fetchAIBtn">
        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
        立即采集最新新闻
      </button>
    `;
    container.appendChild(info);

    const newsTitle = document.createElement('div');
    newsTitle.className = 'section-title';
    const todayItems = items.filter(e => e.fetchDate === Store.todayKey());
    const historyItems = items.filter(e => e.fetchDate !== Store.todayKey());
    newsTitle.innerHTML = `最新AI资讯 <span style="font-size:11px;font-weight:400;color:var(--text-muted);">今日 ${todayItems.length} 条${historyItems.length > 0 ? ' · 历史 ' + historyItems.length + ' 条' : ''}</span>`;
    container.appendChild(newsTitle);

    if (todayItems.length === 0 && historyItems.length === 0) {
      container.appendChild(this.emptyState('', '暂无内容，点击上方"立即采集"获取AI最新资讯'));
    } else {
      const list = document.createElement('div');
      // 显示今天的新闻
      todayItems.forEach(item => {
        const el = document.createElement('div');
        el.className = 'ai-news-item';
        el.style.cursor = 'pointer';
        el.innerHTML = `
          <div class="ai-news-header">
            <span class="ai-source">${this.escape(item.source)}</span>
            <span class="ai-news-date">今日</span>
          </div>
          <div class="ai-news-title">${this.escape(item.title)}</div>
          <div class="ai-news-desc">${this.escape(item.desc || '')}</div>
          <div class="ai-news-footer">
            ${item.tags && item.tags.length ? `<div class="ai-news-tags">${item.tags.map(t => `<span class="ai-news-tag">${this.escape(t)}</span>`).join('')}</div>` : ''}
            <span style="color:var(--primary-dark);font-size:12px;">点击查看详情 →</span>
          </div>
        `;
        el.onclick = () => UI.openAIDetailModal(item);
        list.appendChild(el);
      });

      // 历史新闻按日期分组，默认折叠
      if (historyItems.length > 0) {
        const historyGroups = {};
        historyItems.forEach(item => {
          const date = item.fetchDate || '未知日期';
          if (!historyGroups[date]) historyGroups[date] = [];
          historyGroups[date].push(item);
        });

        const historyToggle = document.createElement('div');
        historyToggle.style.cssText = 'text-align:center;padding:12px;margin-top:8px;color:var(--text-muted);font-size:13px;cursor:pointer;background:var(--bg-soft);border-radius:10px;';
        historyToggle.innerHTML = `📅 查看历史新闻 (${historyItems.length} 条) ▼`;
        
        const historyList = document.createElement('div');
        historyList.style.display = 'none';
        historyList.style.marginTop = '8px';

        Object.keys(historyGroups).sort().reverse().forEach(date => {
          const groupTitle = document.createElement('div');
          groupTitle.style.cssText = 'font-size:12px;color:var(--text-muted);margin:12px 0 6px;padding-left:4px;';
          groupTitle.textContent = `📅 ${date}（${historyGroups[date].length}条）`;
          historyList.appendChild(groupTitle);

          historyGroups[date].forEach(item => {
            const el = document.createElement('div');
            el.className = 'ai-news-item';
            el.style.cssText = 'opacity:0.7;cursor:pointer;';
            el.innerHTML = `
              <div class="ai-news-header">
                <span class="ai-source">${this.escape(item.source)}</span>
                <span class="ai-news-date">${this.escape(item.fetchDate || '')}</span>
              </div>
              <div class="ai-news-title">${this.escape(item.title)}</div>
              <div class="ai-news-desc">${this.escape(item.desc || '')}</div>
              <div class="ai-news-footer">
                ${item.tags && item.tags.length ? `<div class="ai-news-tags">${item.tags.map(t => `<span class="ai-news-tag">${this.escape(t)}</span>`).join('')}</div>` : ''}
                <span style="color:var(--primary-dark);font-size:12px;">点击查看详情 →</span>
              </div>
            `;
            el.onclick = () => UI.openAIDetailModal(item);
            historyList.appendChild(el);
          });
        });

        historyToggle.onclick = () => {
          const isHidden = historyList.style.display === 'none';
          historyList.style.display = isHidden ? 'block' : 'none';
          historyToggle.innerHTML = isHidden 
            ? `📅 收起历史新闻 (${historyItems.length} 条) ▲` 
            : `📅 查看历史新闻 (${historyItems.length} 条) ▼`;
        };

        list.appendChild(historyToggle);
        list.appendChild(historyList);
      }

      container.appendChild(list);
    }

    // ===== 下半部分：AI软件工具 & 应用 =====
    const toolsHeader = document.createElement('div');
    toolsHeader.className = 'section-title';
    toolsHeader.style.marginTop = '16px';
    toolsHeader.textContent = `AI软件工具 & 应用（${tools.length}个）`;
    container.appendChild(toolsHeader);

    if (tools.length === 0) {
      // 默认展示工具列表
      const defaultTools = AIFetcher.getTools();
      const toolsGrid = document.createElement('div');
      toolsGrid.className = 'ai-tools-grid';
      defaultTools.forEach(tool => {
        toolsGrid.appendChild(this.renderAIToolCard(tool));
      });
      container.appendChild(toolsGrid);
    } else {
      const toolsGrid = document.createElement('div');
      toolsGrid.className = 'ai-tools-grid';
      tools.forEach(tool => {
        toolsGrid.appendChild(this.renderAIToolCard(tool));
      });
      container.appendChild(toolsGrid);
    }

    // 绑定采集按钮
    setTimeout(() => {
      const btn = document.getElementById('fetchAIBtn');
      if (btn) {
        btn.onclick = async () => {
          btn.textContent = '采集中...';
          btn.disabled = true;
          await AIFetcher.fetch();
          this.render('ai');
        };
      }
    }, 0);
  },

  // AI工具卡片
  renderAIToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'ai-tool-card';
    card.innerHTML = `
      <div class="ai-tool-icon">${this.escape(tool.icon || '🤖')}</div>
      <div class="ai-tool-name">${this.escape(tool.name)}</div>
      <div class="ai-tool-desc">${this.escape(tool.desc || '')}</div>
      <div class="ai-tool-tags">
        ${(tool.tags || []).map(t => `<span class="ai-tool-tag">${this.escape(t)}</span>`).join('')}
        ${tool.free ? '<span class="ai-tool-tag free">免费</span>' : ''}
        ${tool.cn ? '<span class="ai-tool-tag cn">国产</span>' : ''}
      </div>
    `;
    card.onclick = () => UI.openAIToolDetailModal(tool);
    return card;
  },

  // ===== 5. 财经内容 =====
  // 理财知识学习（智能轮换，不重复推荐）
  renderFinanceKnowledge(container) {
    const knowledgeDB = [
      // ===== 股票基础 =====
      { id: 'f0', title: '什么是股票？一分钟搞懂', desc: '股票就是公司的所有权凭证。买股票等于成为公司股东，公司赚钱了你分钱（分红），公司增值了你卖出赚差价。', detail: '股票的本质是"所有权"。比如茅台总股本约12.6亿股，你买100股，你就是茅台12.6亿分之一的股东。\n\n【交易规则】A股一手=100股，最少买一手。交易时间：工作日9:30-11:30、13:00-15:00。\n\n【赚钱方式】①分红：公司把利润分给股东（如茅台2023年每股分红约30元）；②差价：低价买高价卖。\n\n【股票代码】沪市60开头（如贵州茅台600519），深市00/30开头（如宁德时代300750）。\n\n💡小贴士：新手建议从自己熟悉的行业入手，比如你每天用的产品是哪家公司做的，就去研究它。', tags: ['股票', '基础概念'] },
      { id: 'f1', title: 'A股、港股、美股，傻傻分不清？', desc: 'A股=人民币交易、T+1、有涨跌停；港股=港币、T+0、无涨跌停；美股=美元、T+0、无涨跌停。新手从A股开始最稳妥。', detail: '三大市场核心区别：\n\n【A股（沪深）】\n• 货币：人民币\n• 交易规则：T+1（今天买，明天才能卖）\n• 涨跌停：主板±10%，创业板/科创板±20%\n• 交易费：佣金约万2.5，印花税0.05%（卖出时收）\n• 代表公司：茅台、宁德时代、比亚迪\n\n【港股】\n• 货币：港币\n• 交易规则：T+0（当天买卖），无涨跌停\n• 代表公司：腾讯、美团、阿里巴巴\n• 注意：有"仙股"风险（股价<1港元的垃圾股）\n\n【美股】\n• 货币：美元\n• 交易规则：T+0，无涨跌停\n• 代表公司：苹果、特斯拉、英伟达\n• 注意：时差问题（北京时间晚上9:30开盘）\n\n💡小贴士：新手建议A股起步，熟悉后再考虑港股和美股。', tags: ['股票', '市场区别'] },
      { id: 'f2', title: 'PE（市盈率）—— 估值最常用的指标', desc: 'PE = 股价 ÷ 每股收益。PE=10代表10年回本。但PE低≠便宜，PE高≠贵，要和同行业比。', detail: '市盈率（Price to Earnings）= 你愿意为每1元利润付多少钱。\n\n【三种PE】\n• 静态PE = 股价 ÷ 去年每股收益（看过去）\n• 滚动PE（TTM）= 股价 ÷ 最近4个季度收益（看现在）★最常用\n• 动态PE = 股价 ÷ 预测未来收益（看未来）\n\n【怎么判断？】\n• PE<10：可能被低估（也可能是夕阳行业，如银行）\n• PE 10-20：合理区间（大多数成熟公司）\n• PE 20-50：成长型公司（如科技、医药）\n• PE>50或负数：高风险（亏损公司PE为负）\n\n【关键原则】PE只能同行业比较！银行PE=5很正常，科技PE=30也很正常，跨行业比没有意义。\n\n💡举例：茅台PE约30倍，工商银行PE约5倍，不是说工行更"便宜"，而是两个行业估值逻辑完全不同。', tags: ['股票', '估值', 'PE'] },
      { id: 'f3', title: 'PB（市净率）—— 看资产值多少钱', desc: 'PB = 股价 ÷ 每股净资产。PB<1叫"破净"，意味着股价比公司净资产还低。银行股PB常低于1。', detail: '市净率（Price to Book）= 市场给公司净资产的"溢价倍数"。\n\n【计算公式】PB = 每股股价 ÷ 每股净资产\n\n【怎么判断？】\n• PB<1（破净）：股价比净资产还低，常见于银行、钢铁等重资产行业\n• PB 1-3：正常范围\n• PB>5：市场给了很高的溢价（通常是有品牌、技术等"无形资产"）\n\n【适用于哪些行业？】\n✅ 适用：银行、保险、地产、钢铁（资产主要是"硬货"）\n❌ 不适用：互联网、软件、医药（资产主要是人、技术、品牌，不在账面上）\n\n【经典案例】巴菲特投资富国银行时，PB仅0.8倍，后来涨到2倍以上。\n\n💡小贴士：PB和PE结合使用更准确。低PE+低PB=可能真的被低估了。', tags: ['股票', '估值', 'PB'] },
      { id: 'f4', title: 'ROE（净资产收益率）—— 巴菲特最爱的指标', desc: 'ROE = 净利润 ÷ 净资产，代表公司用股东的钱赚了多少。ROE>15%算优秀，>20%算卓越。', detail: 'ROE是巴菲特选股的第一筛选标准。它回答了一个问题：公司每用股东100块钱，一年能赚多少钱？\n\n【杜邦分析法拆解ROE】\nROE = 净利率 × 资产周转率 × 杠杆倍数\n①净利率 = 净利润÷营收（赚钱效率）\n②周转率 = 营收÷总资产（运营效率）\n③杠杆 = 总资产÷净资产（借了多少钱）\n\n【怎么判断？】\n• ROE>20%：卓越（茅台约30%，苹果约150%）\n• ROE 15-20%：优秀\n• ROE 10-15%：一般\n• ROE<10%：较差\n\n【警惕"假高ROE"】\n如果ROE高是靠大量借钱（杠杆倍数高），风险很大！比如某些房地产公司ROE很高，但负债率90%+。\n\n💡筛选技巧：找连续5年以上ROE>15%的公司，大概率是好公司。A股约3700家公司中，符合这个条件的不到200家。', tags: ['股票', 'ROE', '财务指标'] },
      { id: 'f5', title: '股息率—— 你买的股票每年"发多少红包"', desc: '股息率 = 每股分红 ÷ 股价。比如10元的股票分红0.5元，股息率=5%，超过银行理财。', detail: '股息率是衡量"现金回报"的指标，对于追求稳定现金流的投资者特别重要。\n\n【计算公式】股息率 = 年度每股分红 ÷ 当前股价 × 100%\n\n【怎么判断？】\n• >5%：高股息（如部分银行股、煤炭股）\n• 3-5%：中等股息（如电力、高速公路）\n• 1-3%：低股息（如成长型公司）\n• 不分红：很多科技公司利润再投资，不分红\n\n【分红的重要日期】\n• 股权登记日：这天收盘时持有股票的股东才有分红资格\n• 除权除息日：股价会下调（扣除分红金额），这天之后买的不参与本次分红\n• 派息日：现金到账的日子\n\n【注意】分红后股价会除权，短期看总资产不变。但长期看，持续高分红说明公司真的在赚钱。\n\n💡案例：中国神华2023年每股分红约2.5元，按当时股价25元算，股息率高达10%！', tags: ['股票', '股息', '分红'] },
      { id: 'f6', title: 'K线图入门—— 一根蜡烛看懂股价', desc: 'K线=开盘价、收盘价、最高价、最低价四合一。红色=涨（阳线），绿色=跌（阴线）。实体越长，多空力量越悬殊。', detail: 'K线图是技术分析的"语言"，每个投资者都应该看得懂。\n\n【一根K线的四个价格】\n• 开盘价：这根K线开始时的价格\n• 收盘价：这根K线结束时的价格\n• 最高价：期间到过的最高价\n• 最低价：期间到过的最低价\n\n【阳线 vs 阴线】\n阳线（红）：收盘价>开盘价，买方力量强\n阴线（绿）：收盘价<开盘价，卖方力量强\n\n【常见K线形态】\n• 大阳线：实体很长，买方碾压\n• 十字星：开盘≈收盘，多空平衡，变盘信号\n• 锤子线：下影线长，探底回升信号\n• 倒锤子：上影线长，冲高回落信号\n\n【时间周期】\n日K：每根代表一天；周K：一周；月K：一月。\n短线看日K，中线看周K，长线看月K。\n\n💡建议先学会识别大阳线、大阴线、十字星这三种最基本的形态。', tags: ['股票', 'K线', '技术分析'] },
      { id: 'f7', title: '均线系统—— 最基础的趋势指标', desc: '均线=一段时间内的平均价格连成的线。5日线=短线，20日线=中线，60日线=长线。均线向上=上升趋势。', detail: '移动平均线（MA）是技术分析中最基础也最实用的指标。\n\n【常用均线及含义】\n• MA5（5日均线）：一周趋势，超短线参考\n• MA10（10日均线）：短线趋势\n• MA20（20日均线）：月线，中线生命线\n• MA60（60日均线）：季线，中期趋势\n• MA120（半年线）：牛熊分界线之一\n• MA250（年线）：最重要的牛熊分界线\n\n【金叉和死叉】\n• 金叉：短线上穿长线（如MA5上穿MA20）→买入信号\n• 死叉：短线下穿长线（如MA5下穿MA20）→卖出信号\n\n【多头排列 vs 空头排列】\n• 多头排列：短期线>中期线>长期线，全部向上→强势上涨\n• 空头排列：短期线<中期线<长期线，全部向下→持续下跌\n\n💡均线在趋势行情中有效，在横盘震荡时会产生假信号。', tags: ['股票', '均线', '技术分析'] },
      { id: 'f8', title: 'MACD指标—— 判断买卖时机', desc: 'MACD由DIF线、DEA线、红绿柱组成。金叉买入、死叉卖出。背离（股价新高但MACD没新高）是强烈反转信号。', detail: 'MACD（指数平滑异同移动平均线）是最常用的趋势指标，由三部分组成。\n\n【MACD的组成】\n• DIF线（快线）：12日EMA - 26日EMA\n• DEA线（慢线）：DIF的9日EMA\n• MACD柱：DIF - DEA（红柱=多头，绿柱=空头）\n\n【基本用法】\n• 金叉：DIF上穿DEA，MACD柱由绿转红→买入\n• 死叉：DIF下穿DEA，MACD柱由红转绿→卖出\n\n【顶背离和底背离（最重要！）】\n• 顶背离：股价创新高，但MACD的DIF没创新高→见顶信号，该卖\n• 底背离：股价创新低，但MACD的DIF没创新低→见底信号，该买\n背离是MACD最有效的信号！\n\n【零轴的意义】\n• MACD在零轴上方：多头市场\n• MACD在零轴下方：空头市场\n\n💡MACD是滞后指标，不能用来抄底逃顶，但判断趋势方向很准。', tags: ['股票', 'MACD', '技术分析'] },
      { id: 'f9', title: '成交量—— 市场情绪的温度计', desc: '量价配合：涨放量=健康，涨缩量=虚涨；跌放量=恐慌，跌缩量=惜售。天量见天价，地量见地价。', detail: '成交量反映了市场参与者的情绪和资金动向，是技术分析中唯一不能作假的指标。\n\n【量价关系八法则】\n①价涨量增：健康上涨，继续看多\n②价涨量缩：上涨乏力，警惕回调\n③价跌量增：恐慌抛售，下跌未结束\n④价跌量缩：惜售情绪，可能见底\n⑤价平量增：多空分歧加大，即将变盘\n⑥价平量缩：观望气氛浓厚\n⑦天量天价：放巨量+股价高位→大概率见顶\n⑧地量地价：成交量极度萎缩+股价低位→大概率见底\n\n【换手率】\n• <1%：无人关注，冷门股\n• 1-3%：正常交易\n• 3-7%：相对活跃\n• >7%：非常活跃，可能是主力在进出\n\n💡量在价先——成交量的变化往往领先于价格的变化。', tags: ['股票', '成交量', '技术分析'] },
      { id: 'f10', title: '财报怎么看—— 三张表快速入门', desc: '利润表看赚钱能力，资产负债表看家底，现金流量表看真金白银。三张表都好看才是好公司。', detail: '财报是了解公司最直接的窗口，但很多人一看就晕。其实核心就看三张表。\n\n【利润表—— 公司赚了多少钱？】\n关键指标：营业收入、净利润、毛利率\n• 营收持续增长→公司在扩大\n• 净利润持续增长→赚钱能力在变强\n• 毛利率稳定或提升→有定价权（好信号！）\n\n【资产负债表—— 公司有多少家底？】\n关键指标：资产负债率、应收账款、商誉\n• 资产负债率>70%：负债偏高，风险较大\n• 应收账款暴增：可能是"虚增收入"\n• 商誉过高：警惕减值风险\n\n【现金流量表—— 公司真金白银有多少？】\n关键指标：经营活动现金流净额\n• 净利很多但经营现金流很少→利润"虚"\n• 经营现金流持续为正→公司真的在赚钱\n\n【快速筛查法】\n连续3年：营收↑、净利润↑、经营现金流↑、ROE>15%\n满足这4条的公司大概率不差。\n\n💡财报下载：巨潮资讯网（cninfo.com.cn）免费下载所有A股公司财报。', tags: ['股票', '财报', '基本面'] },
      // ===== 基金基础 =====
      { id: 'f11', title: '基金到底是什么？一篇文章讲明白', desc: '基金=把大家的钱集中起来，交给专业基金经理去投资。100元起投，比买股票门槛低得多。', detail: '基金就像一个"投资团购"——你出一点钱，我出一点钱，凑成一大笔钱交给专业的人去投资。\n\n【基金的三方角色】\n• 投资者（你）：出钱，享受收益（也承担亏损）\n• 基金公司：管理基金，收管理费（每年约0.5%-1.5%）\n• 托管银行：保管资金，防止基金公司挪用\n\n【基金的分类】\n按投资对象分：股票基金、债券基金、混合基金、货币基金\n按管理方式：主动基金（经理选股）、指数基金（跟踪指数）\n按交易方式：普通基金（按净值申赎）、ETF（交易所实时交易）\n\n【怎么看一只基金？】\n①基金代码（如510300=沪深300ETF）\n②单位净值（每份值多少钱）\n③成立以来收益（长期业绩）\n④基金经理（谁在管钱）\n⑤基金规模（太大太小都不好）\n\n💡小贴士：新手从指数基金开始，费用低、简单透明。', tags: ['基金', '基础概念'] },
      { id: 'f12', title: '指数基金 vs 主动基金，到底选哪个？', desc: '指数基金=跟踪指数，被动复制，费率低。主动基金=经理选股，费率较高，依赖经理能力。巴菲特推荐指数基金。', detail: '这是投资界最有名的争论。我们用数据说话。\n\n【指数基金】\n✅ 优点：费率低（0.15%-0.5%/年）、完全透明、不受经理离职影响\n❌ 缺点：只能获得市场平均收益，不会"跑赢大盘"\n📊 代表：沪深300ETF（510300）、标普500ETF（SPY）\n\n【主动基金】\n✅ 优点：有机会跑赢市场，优秀经理能创造超额收益\n❌ 缺点：费率高（1%-1.5%/年）、经理可能离职、风格可能漂移\n📊 代表：富国天惠（朱少醒）、易方达蓝筹（张坤）\n\n【数据说话】\n美国标普公司统计：10年间85%的主动基金跑输了指数。\nA股因为散户多，主动基金跑赢指数的比例更高（约40-50%）。\n\n【巴菲特的赌约】\n2007年巴菲特公开打赌：10年内指数基金收益将超过任何对冲基金组合。2017年结果：指数基金年化7.1%，对冲基金仅2.2%。\n\n💡建议：核心仓位配指数基金（稳），卫星仓位配主动基金（博超额收益）。', tags: ['基金', '指数基金', '主动基金'] },
      { id: 'f13', title: '沪深300、中证500、创业板指—— 三大指数全解析', desc: '沪深300=大盘蓝筹，中证500=中盘成长，创业板指=科技成长。三个指数搭配，覆盖不同风格。', detail: '这三个指数是A股最重要的"尺子"，理解它们就理解了A股的结构。\n\n【沪深300】\n• 成分：A股市值最大、流动性最好的300家公司\n• 行业：金融（20%）、食品饮料（12%）、电子（10%）\n• 特点：大盘蓝筹，波动较小，股息较高\n• 代表基金：510300（华泰柏瑞沪深300ETF）\n• 近10年年化收益：约6-8%\n\n【中证500】\n• 成分：排沪深300之后、市值301-800名的公司\n• 行业：医药（12%）、电子（10%）、电力设备（9%）\n• 特点：中盘成长，弹性更大\n• 代表基金：510500（南方中证500ETF）\n\n【创业板指】\n• 成分：创业板市值最大的100家公司\n• 行业：电力设备（30%+）、医药（20%+）、电子（10%+）\n• 特点：科技成长，波动大，涨跌猛\n• 代表基金：159915（易方达创业板ETF）\n\n💡建议：沪深300+中证500=覆盖A股前800名，是非常经典的组合。', tags: ['基金', '指数', '沪深300'] },
      { id: 'f14', title: '基金定投—— 普通人最靠谱的投资方式', desc: '定投=每月固定日期投固定金额。市场跌时多买、涨时少买，长期成本被平均。定投沪深300超5年，盈利概率>90%。', detail: '基金定投是"懒人投资法"，但效果出奇的好。\n\n【定投为什么有效？】\n假设每月定投1000元：\n• 第一个月净值1.0→买1000份\n• 第二个月跌到0.8→买1250份（买得更多！）\n• 第三个月涨到1.2→买833份（买得更少）\n平均成本=3000÷3083=0.973元，比算术平均价1.0还低！\n\n【定投实操】\n①选标的：沪深300指数基金（推荐）\n②定频率：每月10号（发工资后）\n③定金额：月收入的10-20%\n④坚持：至少3-5年，不要中途停止\n\n【定投什么时候卖？】\n设一个止盈目标（如盈利20%或30%），达到后分批卖出。\n然后重新开始下一轮定投。\n\n【最大忌讳】❌市场大跌时因为害怕而停止定投——这时候恰恰是捡便宜的好时机！\n\n💡数据：从2004年至今，任意时间开始定投沪深300并坚持5年以上，盈利概率超过90%。', tags: ['基金', '定投'] },
      { id: 'f15', title: 'A类和C类基金—— 选错了多花不少钱', desc: 'A类=买入收申购费，长期持有划算。C类=不收申购费，按天收服务费，短期持有划算。持有超1年选A类。', detail: '同一只基金经常有A类和C类两个版本，投资标的完全相同，区别只在收费方式。\n\n【A类份额】\n• 申购费：0.1%-0.15%（平台打折后，原价1%-1.5%）\n• 赎回费：持有<7天=1.5%（惩罚性），7天-1年=0.5%，1-2年=0.25%，>2年=0%\n• 无销售服务费\n\n【C类份额】\n• 无申购费\n• 赎回费：持有<7天=1.5%，>7天=0%\n• 销售服务费：0.4%-0.8%/年（按天扣）\n\n【怎么选？】\n• 持有<1年 → 选C类（省申购费）\n• 持有>1年 → 选A类（省服务费）\n• 定投 → 选A类（长期持有，A类更划算）\n\n【举例】投资1万元，持有1年：\n• A类：申购费15元+赎回费0元=15元\n• C类：服务费40元（0.4%×1年）=40元\nA类比C类省25元。如果持有不到3个月，C类更划算。\n\n💡小贴士：定投选A类，短期操作选C类。', tags: ['基金', '费率'] },
      { id: 'f16', title: 'ETF基金—— 像股票一样买卖的基金', desc: 'ETF=交易所交易基金，可以实时买卖，费率极低（0.15%）。代表：沪深300ETF(510300)、创业板ETF(159915)。', detail: 'ETF（Exchange Traded Fund）是近年来最火的投资品种，兼具基金和股票的优势。\n\n【ETF vs 普通基金】\n• 交易方式：ETF盘中实时买卖，普通基金按收盘净值申购\n• 费率：ETF管理费0.15%-0.5%，普通基金1%-1.5%\n• 门槛：ETF一手（100份）起，约几百元\n• 透明度：ETF每天公布持仓，普通基金每季度公布\n\n【热门ETF推荐】\n• 宽基：沪深300ETF(510300)、科创50ETF(588000)\n• 行业：芯片ETF(159995)、医药ETF(512010)\n• 跨境：恒生ETF(159920)、纳指ETF(513100)\n\n【ETF套利原理】\n当ETF市价与净值偏差>0.5%时，机构会进行套利，从而让价格回归。普通投资者不需要操心这个。\n\n💡ETF是巴菲特推荐的"普通人最佳投资工具"，费用极低，长期持有复利效果最好。', tags: ['基金', 'ETF'] },
      { id: 'f17', title: '债券基金—— 稳健投资的压舱石', desc: '债券基金=投资国债、企业债等固收产品。年化3-6%，波动小。适合保守投资者或作为资产配置的"防守端"。', detail: '债券基金是资产配置中不可或缺的"稳定器"，尤其是年龄越大，债券占比应该越高。\n\n【债券基金分类】\n• 纯债基金：只投债券，最稳健，年化3-5%\n• 一级债基：债券+打新股（现已受限），年化4-6%\n• 二级债基：债券+少量股票（<20%），年化5-8%\n• 可转债基金：主投可转债，波动较大\n\n【利率和债券价格的关系】\n利率上升→新发债券利率高→旧债券吸引力下降→价格跌\n利率下降→旧债券利率显得高→价格上涨\n→ 降息周期是配置债券的好时机\n\n【怎么选债券基金？】\n①看基金规模：>10亿比较稳妥\n②看最大回撤：越小越好（<2%算优秀）\n③看机构持有比例：高说明专业机构认可\n\n💡推荐：招商产业债、易方达稳健收益，都是长期表现优秀的债基。', tags: ['基金', '债券基金'] },
      { id: 'f18', title: '货币基金—— 零钱理财的首选', desc: '货币基金=余额宝的本质。年化1.5-3%，随存随取，几乎零风险。适合放3-6个月的生活费和应急金。', detail: '货币基金是流动性最强的理财工具，每个人都在用，但很多人不了解它的本质。\n\n【货币基金投什么？】\n• 银行存单、短期国债、央行票据等超短期固收产品\n• 期限通常<1年，所以几乎不受利率波动影响\n• 因为分散投资，单只债券违约影响极小\n\n【怎么选货币基金？】\n①看七日年化：越高越好（但波动大，不要太在意短期变化）\n②看万份收益：每1万元每天的收益，更直观\n③看规模：>100亿比较稳定\n④看赎回限额：有的每日限额1万，急用钱不方便\n\n【什么时候收益高？】\n月末、季末、年末资金紧张时，货币基金收益会短期飙升。\n\n【进阶用法】\n货币基金+基金定投组合：平时钱放货币基金，定投日自动扣款。\n\n💡建议：放3-6个月生活费在货币基金作为应急金，其余资金按比例投资。', tags: ['基金', '货币基金'] },
      { id: 'f19', title: 'QDII基金—— 一键投资全球', desc: 'QDII基金=用人民币买海外资产。可投美股、港股、德国、日本等。是普通人配置全球资产最简单的工具。', detail: 'QDII（合格境内机构投资者）基金让你不出国门就能投资全球。\n\n【热门QDII基金】\n• 纳指ETF(513100)：跟踪纳斯达克100，科技巨头集合\n• 标普500ETF(513500)：美国大盘蓝筹\n• 恒生ETF(159920)：港股大盘\n• 德国ETF(513030)：德国DAX指数\n• 日经ETF(513520)：日本股市\n\n【QDII的注意事项】\n• 到账慢：赎回后5-10个工作日才到账\n• 额度限制：基金公司外汇额度用完会暂停申购\n• 汇率影响：人民币升值会吃掉部分海外收益\n• 费率较高：管理费1.5%左右，比A股基金贵\n\n【配置建议】\n• 海外配置不超过总资产的20%\n• 优先选美股（全球最强市场）\n• 港股和A股相关性高，配置意义不如美股\n\n💡定投纳指ETF(513100)是普通人参与美股最简单的方式。', tags: ['基金', 'QDII'] },
      // ===== 复利与投资理念 =====
      { id: 'f20', title: '复利—— 世界第八大奇迹', desc: '复利=利滚利。10万年化10%：10年→25.9万，20年→67.3万，30年→174.5万。时间越长，威力越大！', detail: '爱因斯坦说："复利是世界第八大奇迹。懂的人赚取它，不懂的人支付它。"\n\n【复利 vs 单利】\n单利：只在本金上计算利息\n复利：利息也产生利息（利滚利）\n\n【震撼的数字对比】本金10万，年化收益10%：\n• 第5年：单利=15万，复利=16.1万（差距不大）\n• 第10年：单利=20万，复利=25.9万（差5.9万）\n• 第20年：单利=30万，复利=67.3万（差37万！）\n• 第30年：单利=40万，复利=174.5万（差134万！！）\n\n【复利三要素】\n①本金：越多越好（努力攒钱）\n②收益率：越高越好（学习投资）\n③时间：越长越好（尽早开始！）\n\n【举个真实的例子】\n如果25岁开始每月定投2000元，年化10%：\n• 到35岁：约41万\n• 到45岁：约131万\n• 到55岁：约363万\n• 到65岁：约946万\n\n💡复利的秘诀不是"高收益"，而是"早开始+坚持"。', tags: ['复利', '长期投资'] },
      { id: 'f21', title: '"72法则"—— 心算本金翻倍时间的秘诀', desc: '72 ÷ 年化收益率 = 本金翻倍所需年数。年化6%→12年翻倍，10%→7.2年翻倍，15%→4.8年翻倍。', detail: '72法则是投资中最实用的心算工具，不用计算器就能估算复利效果。\n\n【公式】翻倍年数 ≈ 72 ÷ 年化收益率（%）\n\n【速查表】\n• 年化4%（银行理财）→ 18年翻倍\n• 年化6%（债券基金）→ 12年翻倍\n• 年化8%（沪深300历史均值）→ 9年翻倍\n• 年化10%（优秀基金经理）→ 7.2年翻倍\n• 年化15%（巴菲特级别）→ 4.8年翻倍\n• 年化20%（顶尖投资者）→ 3.6年翻倍\n\n【延伸应用】\n同样适用于计算通胀：\n如果通胀率3%，72÷3=24年后你的钱购买力减半。\n\n同样适用于计算GDP翻倍：\n如果GDP增速5%，72÷5=14.4年经济总量翻倍。\n\n【反过来用】\n如果你想10年翻倍，需要多少年化收益？\n72÷10=7.2%的年化收益。\n\n💡这个公式说明：收益率提高一点点，长期效果天差地别。多学一点投资知识，提升哪怕1-2%的年化收益，几十年后就是百万级的差距。', tags: ['复利', '72法则'] },
      { id: 'f22', title: '为什么90%的散户都亏钱？', desc: '频繁交易+追涨杀跌=散户亏损公式。沪深300长期年化8-10%，但散户平均年化-2%。秘诀：少看盘、少交易、长期持有。', detail: '这不是危言耸听，而是真实数据。\n\n【清华五道口研究数据】\n2016-2019年，A股散户平均年化收益：-2.03%\n同期沪深300年化收益：+8.2%\n\n【散户亏钱的五大原因】\n①频繁交易：平均持股不到40天，手续费吃掉大半利润\n②追涨杀跌：看到涨了冲进去，看到跌了恐慌卖出\n③听消息炒股：群里推荐的、大V说的、朋友介绍的...\n④不看估值：PE100倍也敢买，觉得"还会涨"\n⑤不止损：亏了不卖，越套越深，最后割在最低点\n\n【赚钱的散户怎么做？】\n• 持股时间>1年\n• 只买自己研究过的公司\n• 市场大跌时加仓\n• 不盯盘，不频繁操作\n\n【行为金融学解释】\n亏损1万元的痛苦 ≈ 赚2万元的快乐。\n这种"损失厌恶"让散户在下跌时恐慌卖出，错过反弹。\n\n💡巴菲特说："股市是把钱从没耐心的人转移到有耐心的人身上的机器。"', tags: ['投资心理', '散户'] },
      { id: 'f23', title: '定投的微笑曲线—— 越跌越开心的秘密', desc: '市场先跌后涨形成"微笑曲线"。定投在下跌段积累便宜份额，反弹后整体盈利。定投最喜欢的就是先跌后涨。', detail: '微笑曲线是定投盈利的核心原理，理解了它，你就会在市场下跌时感到开心而不是恐惧。\n\n【什么是微笑曲线？】\n市场走势：高点→下跌→底部→反弹→新高\n就像一个人微笑的嘴型：从左边嘴角向下弯到最低点，再向上弯到右边嘴角。\n\n【为什么定投喜欢下跌？】\n• 净值1.0时，1000元买1000份\n• 净值0.8时，1000元买1250份（多买25%！）\n• 净值0.6时，1000元买1667份（多买67%！）\n• 净值回到1.0时，你持有3917份，价值3917元\n• 你投了3000元，盈利917元（+30.6%）\n→ 价格没涨但你已经赚钱了！\n\n【对比一次性投资】\n同样3000元在净值1.0时一把买入→3000份\n价格回到1.0→还是3000元，一分没赚。\n定投比一次性投资多了917元。\n\n💡下次市场大跌时不要恐慌，想想"微笑曲线"，这是在给你送便宜份额！', tags: ['定投', '微笑曲线'] },
      { id: 'f24', title: '长期持有的力量—— 数据不会骗人', desc: '持有沪深300 1年：盈利概率55%，5年：>90%，10年：接近100%。时间是好公司的朋友，是烂公司的敌人。', detail: '投资中最难的事不是选股，而是"拿住"。但数据告诉我们，拿住是值得的。\n\n【沪深300持有时间 vs 盈利概率】\n• 任意时点买入，持有1年：盈利概率约55%\n• 持有3年：盈利概率约75%\n• 持有5年：盈利概率>90%\n• 持有10年：盈利概率接近100%\n\n【为什么长期持有有效？】\n①经济长期向上：GDP一直在增长，企业利润随之增长\n②复利需要时间：前10年看不出效果，后20年爆炸增长\n③避开短期噪音：每天的涨跌大多是随机波动，没有意义\n\n【巴菲特的持仓时间】\n• 可口可乐：持有35年+\n• 美国运通：持有30年+\n• 穆迪：持有20年+\n他的秘诀不是"选得准"，而是"拿得住"。\n\n💡如果你的投资期限不到3年，不要买股票基金。短期资金应该放货币基金或银行存款。', tags: ['长期投资', '复利'] },
      { id: 'f25', title: '投资中的数学思维—— 跌50%要涨100%才能回本', desc: '亏50%后需要赚100%才能回本。这就是为什么要控制回撤、不要重仓追高。保住本金比追求高收益更重要。', detail: '投资中有一个残酷的数学事实，很多人忽略了。\n\n【回撤与回本的关系】\n• 亏10%→需要赚11%回本（差不多）\n• 亏20%→需要赚25%回本（开始有差距）\n• 亏30%→需要赚43%回本（差距拉大）\n• 亏50%→需要赚100%回本（翻倍才行！）\n• 亏70%→需要赚233%回本（几乎不可能）\n\n【这意味着什么？】\n①不要追高：高位重仓一旦大跌，回本极其困难\n②要止损：亏20%之前一定要认真考虑是否该卖\n③分散投资：不要把所有钱押在一只股票上\n\n【巴菲特的投资铁律】\n第一条：永远不要亏钱。\n第二条：永远不要忘记第一条。\n\n这不是说从不亏损，而是说要把"控制风险"放在"追求收益"之前。\n\n💡每次买入前问自己：如果这只股票跌50%，我能承受吗？如果答案是不能，就别买。', tags: ['投资理念', '风险控制', '数学'] },
      // ===== 宏观经济 =====
      { id: 'f26', title: 'GDP、CPI、PMI —— 三个最关键的宏观指标', desc: 'GDP=经济总量，CPI=物价指数(通胀)，PMI=制造业景气度(>50扩张)。这三个数据决定央行的政策方向。', detail: '这三个指标是判断经济"冷热"的体温计，投资者必须了解。\n\n【GDP（国内生产总值）】\n• 含义：一个国家一年内生产的所有最终产品和服务的总价值\n• 中国2025年GDP约130万亿，增速目标5%左右\n• >5%：经济过热，可能加息\n• <5%：经济偏冷，可能降息刺激\n• 每季度公布一次\n\n【CPI（居民消费价格指数）】\n• 含义：衡量一篮子商品和服务的价格变化\n• >3%：通胀偏高，央行可能加息\n• <0%：通缩，经济需求不足\n• 理想区间：1-3%\n• 每月公布一次\n\n【PMI（采购经理指数）】\n• 含义：通过对企业采购经理的问卷调查编制\n• >50：制造业在扩张（经济好）\n• <50：制造业在收缩（经济差）\n• 是经济的"先行指标"，比其他数据早1-2个月\n• 每月最后一天公布\n\n💡小贴士：关注每月PMI数据，它是最快的经济晴雨表。', tags: ['宏观经济', 'GDP', 'CPI'] },
      { id: 'f27', title: '加息和降息—— 央行的"油门和刹车"', desc: '加息=收紧钱袋子，股市偏利空；降息=放松钱袋子，股市偏利好。但市场会提前反应，降息当天不一定会涨。', detail: '利率是央行调控经济最重要的工具。理解利率变化，就能理解资产价格的涨跌。\n\n【加息的影响】\n• 企业：借钱成本变高→减少投资→利润下降→股价跌\n• 个人：房贷利率涨→月供增加→消费减少\n• 债券：新债券利率更高→旧债券价格下跌\n• 汇率：人民币升值→外资流入→部分对冲股市下跌\n\n【降息的影响】\n• 企业：借钱成本降低→增加投资→利润增厚→股价涨\n• 个人：房贷利率降→月供减少→消费增加\n• 债券：旧债券利率更高→价格上涨\n• 汇率：人民币贬值→利好出口企业\n\n【"预期"比"行动"更重要】\n市场会提前3-6个月消化加息/降息预期。\n等央行真正宣布时，股价往往已经涨完或跌完了。\n所以要看"市场预期什么"，而不是"央行做了什么"。\n\n💡关注央行每个季度的《货币政策执行报告》，里面有未来政策方向的重要信号。', tags: ['宏观经济', '利率'] },
      { id: 'f28', title: '人民币汇率和A股的关系', desc: '人民币升值→外资流入→A股利好。贬值→外资流出→利空（但利好出口企业）。汇率看美元指数和贸易顺差。', detail: '汇率和股市的关系，是很多新手忽略的重要变量。\n\n【传导机制】\n①人民币升值（如从7.3→6.8）\n→外资持有A股换回美元更值钱→外资流入→股市涨\n②人民币贬值（如从6.8→7.3）\n→外资持有A股换回美元贬值→外资流出→股市跌\n\n【北向资金】\n外资通过沪港通/深港通买卖A股的资金叫"北向资金"。\n北向资金每天流入/流出数据是重要的市场情绪指标。\n\n【哪些股票受影响最大？】\n• 外资重仓股（茅台、宁德时代等）→汇率影响大\n• 出口型企业（纺织、家电）→贬值反而利好\n• 内需型企业（酱油、白酒）→汇率影响小\n\n【怎么看汇率走势？】\n①美元指数：美元强→人民币弱\n②中美利差：中国利率高→人民币强\n③贸易顺差：出口多→人民币强\n\n💡每天关注"北向资金净流入/流出"，这是外资对A股态度的直接体现。', tags: ['宏观经济', '汇率'] },
      { id: 'f29', title: 'M2货币供应量—— 市场上的钱多了还是少了？', desc: 'M2=流通中的现金+活期存款+定期存款。M2增速>GDP增速→钱变多了→资产价格可能上涨。中国M2已超300万亿。', detail: 'M2是衡量市场上有多少钱的核心指标，它直接关系到资产价格的长期走势。\n\n【M0、M1、M2的区别】\n• M0：流通中的现金（纸币+硬币）\n• M1：M0 + 企业活期存款（随时可以花的钱）\n• M2：M1 + 定期存款 + 居民储蓄（所有"准货币"）\n→ M2是最广义的货币供应量\n\n【M2和房价、股价的关系】\n• M2增速 > GDP增速：钱比商品多→通胀→资产涨价\n• 过去20年M2年化增速约12%，GDP增速约8%\n→ 多出来的4%推动了房价和部分股价上涨\n\n【M2怎么看？】\n• M2增速>12%：货币宽松，利好资产价格\n• M2增速 8-12%：中性\n• M2增速<8%：货币收紧，利空资产价格\n\n💡央行每月公布M2数据，关注"M2增速 - GDP增速"这个差值。', tags: ['宏观经济', 'M2'] },
      { id: 'f30', title: 'LPR改革—— 你的房贷利率怎么定？', desc: 'LPR=贷款市场报价利率，每月20号公布。1年期LPR=企业贷款基准，5年期LPR=房贷基准。LPR降→房贷月供减少。', detail: 'LPR（Loan Prime Rate）是2019年利率市场化改革的核心成果，你的房贷利率直接跟它挂钩。\n\n【LPR怎么来的？】\n18家银行每月报价（去掉最高最低后取平均）→央行公布\n→ 比之前的"基准利率"更能反映市场真实资金成本\n\n【两个LPR品种】\n• 1年期LPR：影响企业短期贷款、消费贷\n• 5年期以上LPR：影响房贷（这个和你关系最大！）\n\n【LPR和房贷】\n你的房贷利率 = 5年期LPR + 银行加点\n• 如果5年期LPR从4.2%降到3.95%\n• 贷款100万30年期，月供减少约150元\n• 总利息减少约5.4万元\n\n【LPR走向判断】\n• 经济下行→央行降息→LPR下降（利好房奴）\n• 经济过热→央行加息→LPR上升\n• 长期看，中国利率处于下行通道\n\n💡如果你的房贷利率还高于4%，可以考虑转为LPR浮动利率。', tags: ['宏观经济', 'LPR', '房贷'] },
      { id: 'f31', title: '社融数据—— 经济的"发动机转速表"', desc: '社融=全社会借了多少钱。社融增速上升→经济扩张，利好股市；下降→经济收缩，利空。每月10-15号公布。', detail: '社会融资规模（社融）是比GDP更领先的经济指标，因为借钱→投资→生产→GDP，借钱是第一步。\n\n【社融包含什么？】\n• 银行贷款（最大头）\n• 企业债券\n• 股票融资\n• 政府债券\n• 信托贷款等\n\n【社融怎么看？】\n• 社融增速上升：企业借钱扩张→经济向好→股市涨\n• 社融增速下降：企业收缩→经济转冷→股市承压\n• 社融"总量大但结构差"：主要是政府借钱，企业没借→经济质量差\n\n【和M2的关系】\n• 社融=借钱的需求端\n• M2=货币的供给端\n• 社融增速 > M2增速：资金需求旺，经济活跃\n• 社融增速 < M2增速：钱多但没人借，经济低迷\n\n💡每月10-15号关注央行公布的社融数据，比GDP早1-2个月反映经济变化。', tags: ['宏观经济', '社融'] },
      // ===== 实操策略 =====
      { id: 'f32', title: '"核心+卫星"策略—— 最经典的资产配置方案', desc: '核心仓位70%配置沪深300+中证500指数基金，卫星仓位30%配置行业基金。每半年再平衡一次。', detail: '这个策略适合90%的普通投资者，简单但有效。\n\n【核心仓位（70%）】\n• 沪深300指数基金（40%）：大盘蓝筹，稳健底仓\n• 中证500指数基金（30%）：中盘成长，弹性收益\n→ 这部分追求市场平均收益，不折腾\n\n【卫星仓位（30%）】\n• 行业基金（科技/消费/医药）（20%）\n• 债券基金或现金（10%）：作为"弹药库"\n→ 这部分追求超额收益，可以灵活调整\n\n【再平衡—— 最被低估的操作】\n每半年检查一次：\n• 如果核心涨到了80%→卖掉一部分，补到卫星\n• 如果卫星跌到了20%→卖掉核心，补到卫星\n→ 这相当于"自动高抛低吸"！\n\n【不同年龄的配置建议】\n• 25-35岁：股票80%+债券20%（承受力强，追求增长）\n• 35-50岁：股票60%+债券40%（平衡增长与稳健）\n• 50岁以上：股票40%+债券60%（稳健为主，保本优先）\n\n💡这个策略的精髓在于"纪律"——不要因为市场涨跌改变配置比例。', tags: ['资产配置', '策略'] },
      { id: 'f33', title: '什么时候该卖股票？三个卖出信号', desc: '①买入逻辑不再成立 ②找到更好的标的 ③配置比例严重偏离。市场跌了不是卖出的理由！', detail: '"会买的是徒弟，会卖的是师傅。"很多散户亏钱不是因为买错了，而是卖错了。\n\n【信号一：买入逻辑不再成立】\n例：你买入某公司是因为ROE>20%，现在ROE降到8%了→该卖\n例：你买入是因为行业高增长，现在行业见顶了→该卖\n→ 不是因为股价跌了就卖！\n\n【信号二：找到更好的投资机会】\n例：你持有A公司年化收益预期8%，发现B公司预期12%→换仓\n→ 但注意不要频繁换仓，至少持有半年以上再评估\n\n【信号三：配置比例严重偏离】\n例：某股票从占你仓位的10%涨到30%了→卖出一部分\n→ 这是"再平衡"，不是不看好，而是控制风险\n\n【什么不是卖出信号？】\n❌ 市场大跌了（应该考虑加仓）\n❌ 朋友说这只股票不行了（你买的时候研究过吗？）\n❌ 已经赚了20%了（好公司可以一直持有）\n❌ 已经亏了15%了（亏损不是卖出的理由，逻辑变了才是）\n\n💡巴菲特持有可口可乐35年+，期间经历过多次50%以上的回撤，但从未卖出。', tags: ['卖出策略', '止盈止损'] },
      { id: 'f34', title: '仓位管理—— 永远不要满仓', desc: '满仓=没有子弹补仓。至少留20%现金。市场大跌时有钱加仓，心态更好。100-年龄=股票仓位%。', detail: '仓位管理是投资中最被低估的技能。控制好仓位，就控制住了风险。\n\n【为什么不能满仓？】\n①大跌时没钱补仓→错失捡便宜的机会\n②满仓心态差→一跌就慌，容易割在地板上\n③生活急用钱→被迫在不合适的时候卖出\n\n【仓位管理的"年龄法则"】\n股票仓位% = 100 - 你的年龄\n• 30岁：股票70%+债券/现金30%\n• 40岁：股票60%+债券/现金40%\n• 50岁：股票50%+债券/现金50%\n→ 年龄越大，越经不起大跌，股票占比应该越低\n\n【金字塔加仓法】\n不要在股价高点重仓！\n• 估值合理时：建仓30%\n• 跌10%：加仓20%\n• 跌20%：加仓30%\n• 跌30%：加仓最后的20%\n→ 成本越来越低，反弹后盈利空间更大\n\n💡永远给自己留"子弹"。巴菲特账上常年趴着1000亿美元以上的现金，等待机会。', tags: ['仓位管理', '风险控制'] },
      { id: 'f35', title: '可转债—— "下有保底，上不封顶"的投资品种', desc: '可转债=债券+股票期权。股价涨了转股赚钱，跌了至少拿回本金+利息。打新债1000元起，中签率比新股高。', detail: '可转债是A股特有的"进可攻退可守"的投资工具，非常适合风险偏好中等的投资者。\n\n【可转债的"双重身份"】\n①债券属性：面值100元，到期还本付息（保底）\n②股票属性：可以按约定价格转换成股票（进攻）\n\n【怎么赚钱？】\n方式一：打新债→上市首日卖出\n• 门槛：有证券账户即可，不需要持有股票市值\n• 中一签=1000元\n• 上市首日通常有10-30%的涨幅\n• 中签率比新股高很多\n\n方式二：低价买入→等待转股或强赎\n• 在可转债价格<110元时买入\n• 等待股价上涨触发"强制赎回"（通常130元以上）\n• 年化收益10-30%是常态\n\n【风险提示】\n• 可转债也可能违约（公司破产还不起钱）\n• 但历史上A股可转债违约极少\n\n💡打新债是新手参与可转债最简单的方式，每天关注"可转债申购日历"。', tags: ['可转债', '打新债'] },
      { id: 'f36', title: '国债逆回购—— 闲置资金的"余额宝升级版"', desc: '把钱借给别人，对方用国债抵押。几乎零风险，年化1.5-4%。节假日前收益率飙升。1天期最灵活。', detail: '如果你账户里有暂时不用的闲钱（比如等待买入时机），国债逆回购是最佳去处。\n\n【是什么？】\n你通过交易所把钱借给需要资金的机构（如券商），对方用国债作为抵押品。因为抵押品是国债（国家信用），所以几乎零风险。\n\n【操作方式】\n在股票账户里找到"国债逆回购"→选择期限（1天/7天/14天等）→输入金额→确认。到期本金+利息自动回到账户。\n\n【代码速查】\n沪市：GC001（1天期）、GC007（7天期）\n深市：R-001（1天期）、R-007（7天期）\n门槛：深市1000元起，沪市10万元起\n\n【什么时候收益高？】\n• 月末、季末、年末（银行冲存款，资金紧张）\n• 春节、国庆长假前（大家都要用钱）\n• 周四做1天期=享受周五+周六+周日三天利息\n\n💡每周四下午做1天期逆回购，可以拿3天利息，周五资金还能用！', tags: ['债券', '逆回购', '现金管理'] },
      { id: 'f37', title: '网格交易法—— 震荡市的赚钱利器', desc: '设定一个价格区间，跌了就买，涨了就卖，赚每次波动的差价。适合震荡市，不适合单边大涨大跌。', detail: '网格交易是一种机械化的低买高卖策略，不用预测方向，靠波动赚钱。\n\n【网格交易怎么操作？】\n①选标的：适合波动大但长期不死的品种（如沪深300ETF）\n②定区间：比如3.5元-4.5元\n③定网格：比如每0.1元一个格子\n④分配资金：10个格子，每格1000元\n\n【具体执行】\n• 价格跌到4.0→买入1000元\n• 继续跌到3.9→再买1000元\n• 反弹到4.0→卖出刚才3.9买的（赚0.1差价）\n• 涨到4.1→卖出4.0买的\n\n【网格交易的优缺点】\n✅ 优点：不用判断方向，震荡市持续赚钱\n✅ 优点：机械化操作，克服人性弱点\n❌ 缺点：单边大涨时早早卖光，踏空\n❌ 缺点：单边大跌时不断买入，越套越多\n\n💡建议用闲置资金做网格，占总仓位不超过20%。', tags: ['策略', '网格交易'] },
      { id: 'f38', title: '行业轮动策略—— 跟着经济周期换赛道', desc: '经济复苏买周期股（有色/化工），繁荣买消费/科技，过热买资源/能源，衰退买防御（医药/公用事业）。', detail: '不同行业在不同经济阶段表现差异巨大，踩准节奏可以大幅跑赢市场。\n\n【美林时钟四大阶段】\n①衰退期（低增长+低通胀）\n→ 央行降息→债券牛市→买债券基金\n→ 防御性行业：医药、公用事业、必选消费\n\n②复苏期（增长回升+低通胀）\n→ 企业利润改善→股市牛市→买股票\n→ 周期性行业：有色、化工、券商\n\n③过热期（高增长+高通胀）\n→ 央行加息→债券熊市→远离债券\n→ 资源类：煤炭、石油、钢铁\n\n④滞胀期（低增长+高通胀）\n→ 现金为王，少投多等\n→ 防御性行业+黄金\n\n【当前判断方法】\n• GDP增速+PMI：判断增长\n• CPI+PPI：判断通胀\n• 结合两者定位当前阶段\n\n💡这个策略需要宏观经济判断能力，新手建议先从"核心+卫星"开始。', tags: ['策略', '行业轮动'] },
      { id: 'f39', title: '趋势跟踪—— 顺势而为，不与市场对抗', desc: '上升趋势：持有不动；下降趋势：空仓或轻仓。用MA20/MA60判断趋势，线上做多线下空。不要试图抄底逃顶。', detail: '趋势跟踪是最古老也最有效的交易策略，核心思想就一句话：跟着大资金走。\n\n【怎么判断趋势？】\n• 均线法：股价>MA20>MA60>MA120 → 上升趋势\n• 道氏理论：高点越来越高+低点越来越高 → 上升趋势\n• 趋势线：连接两个低点画上升趋势线\n\n【趋势跟踪的操作】\n①上升趋势确立后买入（不要抄底）\n②趋势持续中持有（不要恐高）\n③趋势跌破后卖出（不要幻想）\n\n【最大挑战：心理】\n• 买在"高位"：趋势确立时已经涨了不少，不敢买\n• 卖在"低位"：跌破趋势时已经跌了不少，舍不得卖\n→ 趋势跟踪就是"截断亏损，让利润奔跑"\n\n【海龟交易实验】\n1983年，传奇交易员Richard Dennis打赌：交易可以教会。\n他招了13个普通人，教他们趋势跟踪。\n4年后，这群人年均复合收益80%！\n\n💡趋势跟踪不需要预测，只需要纪律。但90%的人做不到纪律。', tags: ['策略', '趋势跟踪'] },
      // ===== 保险理财 =====
      { id: 'f40', title: '保险配置的正确顺序', desc: '先保障后理财：①百万医疗→②意外险→③重疾险→④定期寿险→⑤年金险。先大人后小孩，先经济支柱。', detail: '很多人买保险的顺序完全反了——先给孩子买了一堆，自己的保障却空空如也。\n\n【正确的保险配置顺序】\n第一层：百万医疗险（最优先！）\n• 年保费几百元，保额200-400万\n• 解决"看病贵"的问题\n• 人人必备，性价比最高\n\n第二层：意外险\n• 年保费100-300元，保额50-100万\n• 解决意外身故/伤残/医疗\n\n第三层：重疾险\n• 确诊即赔付一笔钱（30-50万起）\n• 解决"生病期间没收入"的问题\n\n第四层：定期寿险\n• 家庭经济支柱必备\n• 万一离世，给家人留一笔钱\n\n第五层：年金险/增额寿\n• 理财性质，前四层配齐再考虑\n\n【谁先买？】\n先给赚钱的人买！大人>小孩，经济支柱>全职主妇。\n\n💡年保费预算不超过家庭年收入的10%。', tags: ['保险', '配置顺序'] },
      { id: 'f41', title: '百万医疗险怎么选？', desc: '年保费几百元，保额200-400万，解决大病医疗费。选"保证续保20年"的产品。重点关注免赔额和报销范围。', detail: '百万医疗险是性价比最高的保险，每个人第一份保险就该买它。\n\n【百万医疗险保什么？】\n• 住院医疗费：床位、手术、药品、检查等\n• 特殊门诊：放化疗、肾透析等\n• 门诊手术\n• 住院前后门急诊\n\n【选购四要素】\n①保证续保：一定要选"保证续保20年"的！\n→ 非保证续保的，今年理赔了明年可能不让你续\n②免赔额：通常1万（社保报销后自付超过1万才赔）\n③报销比例：100%报销（社保报销后）\n④外购药报销：癌症靶向药很多需要外购，必须包含\n\n【推荐产品】\n• 好医保长期医疗（人保健康，支付宝）\n• 蓝医保（太平洋保险）\n• 长相安（平安健康）\n→ 这三款都是保证续保20年的\n\n💡30岁左右买，年保费约300-500元，一天不到2块钱。', tags: ['保险', '医疗险'] },
      { id: 'f42', title: '重疾险—— 确诊即赔，弥补收入损失', desc: '确诊癌症等大病，一次性赔几十万。不是用来看病的（医疗险管），而是弥补生病期间没收入的损失。保额至少30万。', detail: '重疾险是最容易被误解的保险——它不是报销医疗费的，而是补偿收入损失的。\n\n【重疾险 vs 医疗险】\n• 医疗险：实报实销，花多少报多少\n• 重疾险：确诊即赔付一笔钱，随便你怎么用\n→ 两者互补，不是替代关系\n\n【保额买多少？】\n• 至少30万起步，建议50万\n• 覆盖3-5年的生活开支（治病+康复期没收入）\n• 如果有房贷，保额≥房贷余额\n\n【选购要点】\n①保额第一：30万>20万（保额不够等于没买）\n②保障期限：预算够选终身，不够选保到70岁\n③轻症/中症：必须包含，轻症赔30%保额\n④多次赔付：预算够就选，不够单次也行\n⑤身故责任：不需要！重疾险是为了活着用\n\n💡重疾险越早买越便宜，30岁买比40岁买便宜一半。', tags: ['保险', '重疾险'] },
      { id: 'f43', title: '定期寿险—— 给家人的最后一份责任', desc: '人不在了，保险公司赔一笔钱给家人。保到60岁即可（孩子长大、房贷还完）。100万保额年保费几百到一千。', detail: '定期寿险是"最无私"的保险——你自己用不到，是留给家人的。但恰恰是家庭支柱最需要的。\n\n【谁需要定期寿险？】\n• 有房贷的家庭经济支柱\n• 有小孩要抚养的父母\n• 有老人要赡养的子女\n→ 简单说：如果你不在了，家人的生活会受到严重影响，就需要\n\n【保额买多少？】\n• 覆盖房贷余额 + 5-10年家庭开支 + 子女教育费\n• 一般建议100-300万\n\n【保到多少岁？】\n• 保到60岁即可（孩子已工作，房贷已还完）\n• 保到退休年龄也可以\n\n【选购要点】\n①健康告知：越宽松越好\n②免责条款：越少越好（通常3条：故意杀害、故意犯罪、2年内自杀）\n③价格：100万保额，30岁男性约1000元/年，女性约500元/年\n\n💡定期寿险是最纯粹的保障型保险，没有套路，没有坑。', tags: ['保险', '寿险'] },
      { id: 'f44', title: '年金险和增额终身寿—— 理财型保险值得买吗？', desc: '年金险=现在存钱，以后每年领钱。增额寿=钱在保单里复利增长。年化约2.5-3%，适合保守型长期储蓄。', detail: '理财型保险是争议最大的险种——有人说它骗人，有人说它稳健。真相在中间。\n\n【年金险】\n• 缴费期：3/5/10年\n• 领取期：55/60/65岁开始\n• 收益：年化约2.5-3%（IRR计算）\n• 优点：锁定长期利率，强制储蓄\n• 缺点：流动性差，中途退保损失大\n\n【增额终身寿险】\n• 保额和现金价值按约定利率（约2.5-3%）复利增长\n• 可以通过"减保"取钱\n• 优点：灵活度比年金险高\n• 缺点：前期现金价值低，5年内退保会亏\n\n【该不该买？】\n✅ 适合：\n• 已经有足额保障型保险（医疗+重疾+寿险）\n• 有一笔长期不用的钱\n• 追求稳健，不接受本金波动\n\n❌ 不适合：\n• 还没配齐保障型保险\n• 追求高收益\n• 短期可能用钱\n\n💡理财险的年化收益约2.5-3%，和银行定存差不多。它的核心价值是"强制储蓄+锁定利率"，不是"高收益"。', tags: ['保险', '年金险', '理财险'] },
      // ===== 个人财务 =====
      { id: 'f45', title: '记账的正确姿势—— 不是为了记而记', desc: '记账的目的是"看清钱去哪了"，不是"记流水账"。分类记录、每月复盘、发现问题、调整消费。推荐"50-30-20法则"。', detail: '很多人记账坚持不了三个月，因为把记账变成了苦差事。正确的方法应该很简单。\n\n【记账三步法】\n①分类（不是逐笔记！）\n• 不用每笔都记，按大类归总：\n  - 住房（房贷/房租+水电）\n  - 餐饮（买菜+外卖+聚餐）\n  - 交通（加油/公交/打车）\n  - 购物（衣服/数码/日用品）\n  - 娱乐（旅游/电影/游戏）\n\n②月度复盘（5分钟）\n• 哪个分类超支了？\n• 哪些钱可以省？\n• 下个月预算调整？\n\n③设定预算\n• 用"50-30-20法则"：\n  - 50%：必要开支（房租、吃饭、交通）\n  - 30%：想要的开支（购物、娱乐）\n  - 20%：储蓄和投资\n\n【工具推荐】\n• 鲨鱼记账（简单）\n• 随手记（功能全）\n• 钱迹（极简）\n\n💡记账的目的是"发现问题+调整行为"，不是为了记而记。', tags: ['记账', '预算管理'] },
      { id: 'f46', title: '应急金规划—— 你的财务安全垫', desc: '应急金=3-6个月的生活费，放在随时能取的地方（货币基金）。这是财务安全的第一道防线，比投资更重要。', detail: '应急金是个人财务的"安全气囊"——平时用不到，出事时救命的。\n\n【应急金应该有多少？】\n• 单身：3-6个月生活费\n• 有家庭：6-12个月生活费\n• 工作不稳定（自由职业/销售）：12个月以上\n\n【放哪里？】\n①货币基金（余额宝/零钱通）：随时可取\n②银行活期：最安全\n③短期定存：不推荐，应急时要取不出来\n→ 核心要求：安全、随时可取、不追求收益\n\n【为什么应急金比投资更重要？】\n没有应急金→突然需要用钱→被迫割肉卖股票→亏损\n没有应急金→失业→还不起房贷→房子被拍卖\n→ 应急金是你"不在错误的时间被迫做错误决定"的保障\n\n【建立应急金三步】\n①算：3-6个月生活费是多少\n②存：每月工资到账先存10%到应急金账户\n③满：存够目标后，多余的钱再投资\n\n💡应急金是第一优先级。在开始投资之前，先确保应急金到位。', tags: ['财务规划', '应急金'] },
      { id: 'f47', title: '储蓄率—— 决定你何时财务自由的核心指标', desc: '储蓄率=每月存的钱÷月收入。储蓄率10%→财务自由需50年，50%→17年，70%→8年。提高储蓄率比提高收益率更有效。', detail: '很多人拼命研究怎么提高投资收益率，却忽略了更重要的变量：储蓄率。\n\n【储蓄率 vs 财务自由时间】\n假设年化收益5%，计算需要多少年才能存够25倍年支出：\n• 储蓄率10%：约51年\n• 储蓄率20%：约37年\n• 储蓄率30%：约28年\n• 储蓄率50%：约17年\n• 储蓄率70%：约8.5年\n\n【提高储蓄率的三个层次】\n①初级：减少不必要的消费\n→ 取消不用订阅、少点外卖、减少冲动购物\n②中级：优化大额支出\n→ 换租金更低但通勤可接受的房子\n→ 买车选经济型而非豪华型\n③高级：提高收入\n→ 副业、升职加薪、技能提升\n→ 收入翻倍但保持原有消费水平，储蓄率自然暴涨\n\n【现实目标】\n储蓄率20%：及格\n储蓄率30%：良好\n储蓄率50%+：优秀（但需要较高收入或较低消费）\n\n💡增加1%的储蓄率比提高1%的投资收益率容易得多，效果也更好。', tags: ['储蓄', '财务自由'] },
      { id: 'f48', title: '四个账户法—— 把你的钱分成四份', desc: '①要花的钱（10%）②保命的钱（20%）③生钱的钱（30%）④保本的钱（40%）。根据年龄和风险偏好调整比例。', detail: '标准普尔家庭资产配置四账户，是全球公认的最经典的家庭资产配置模型。\n\n【账户一：要花的钱（10%）】\n• 3-6个月生活费\n• 放在货币基金/活期\n• 随时可取\n\n【账户二：保命的钱（20%）】\n• 保险：医疗险+重疾险+意外险+寿险\n• 专款专用，以小博大\n• 年保费不超过年收入10%\n\n【账户三：生钱的钱（30%）】\n• 股票、基金、房产等投资\n• 追求高收益，承受高风险\n• 即使亏完也不影响生活\n\n【账户四：保本的钱（40%）】\n• 债券、年金、银行定存\n• 追求稳健增值\n• 养老、教育等长期目标\n\n【年轻人的调整版】\n• 要花的钱 10%\n• 保命的钱 10%（保险）\n• 生钱的钱 50%（年轻扛得住风险）\n• 保本的钱 30%\n\n💡这个模型的核心是"专款专用"——每笔钱有每笔钱的用途，不要混用。', tags: ['资产配置', '四个账户'] },
      { id: 'f49', title: '你的"拿铁因子"—— 每天一杯咖啡=一套房？', desc: '拿铁因子=每天不起眼的小额消费，累积起来惊人。每天一杯咖啡30元×365天×30年=32.8万（年化5%的话是76万）。', detail: '"拿铁因子"是美国理财作家David Bach提出的概念——那些我们习惯性花掉但完全可以省下的小钱。\n\n【算算你的拿铁因子】\n每天一杯咖啡30元 → 月900元 → 年10800元\n每天打车代替公交多花15元 → 月450元 → 年5400元\n每月自动续费但没用过的App 3个 → 月60元 → 年720元\n→ 仅这三项一年就16920元！\n\n【如果把这笔钱投资】\n每月定投1410元（16920÷12），年化8%：\n• 10年：约26万\n• 20年：约83万\n• 30年：约208万\n\n【怎么办？】\n①找出你的拿铁因子（翻翻支付宝/微信账单）\n②区分"真需要"和"习惯了"\n③省下来的钱自动转入投资账户\n\n【注意】\n不是让你过苦日子。如果那杯咖啡真的给你幸福感，留着。\n关键是识别那些"花了也没感觉"的消费。\n\n💡小钱不省，大钱不来。找到并消灭3个拿铁因子，每月轻松多存1000元。', tags: ['省钱', '拿铁因子'] },
      // ===== 房产与理财 =====
      { id: 'f50', title: '房贷怎么选？等额本息 vs 等额本金', desc: '等额本息=每月还款相同，前期还利息多；等额本金=每月递减，总利息少但前期压力大。打算提前还款选等额本金。', detail: '选错还款方式，30年多还几十万利息，这笔账一定要算清楚。\n\n【等额本息】\n• 每月还款金额固定\n• 前期还的主要是利息，后期才是本金\n• 优点：月供稳定，前期压力小\n• 缺点：总利息多\n\n【等额本金】\n• 每月还款金额递减\n• 前期还款压力大（比等额本息多20-30%）\n• 优点：总利息少（比等额本息省10-20%）\n• 缺点：前期月供高\n\n【举例】贷款100万，30年，利率4.2%：\n• 等额本息：月供4890元，总利息76.1万\n• 等额本金：首月6278元→末月2790元，总利息63.2万\n→ 等额本金省12.9万利息！\n\n【怎么选？】\n• 收入稳定但不高→等额本息\n• 收入较高且有积蓄→等额本金\n• 打算5-10年内提前还款→等额本金（省更多利息）\n\n💡如果打算提前还款，前5年还的利息占整个贷款期利息的40%+，所以越早还越划算。', tags: ['房贷', '等额本息', '等额本金'] },
      { id: 'f51', title: '租房vs买房—— 算清这笔账', desc: '买房=锁定居住成本+强制储蓄；租房=灵活+省下首付可投资。关键是房价租金比：房价÷年租金<20可考虑买，>30不如租。', detail: '买房还是租房，是每个年轻人都会面临的灵魂拷问。用数据说话。\n\n【房价租金比判断法】\n房价租金比 = 房价 ÷ 年租金\n• <15：强烈建议买（租金回报率>6.7%）\n• 15-20：可以考虑买\n• 20-30：买和租差别不大\n• >30：租房更划算（租金回报率<3.3%）\n\n【举例】\n一套房售价300万，月租金4000元（年4.8万）\n房价租金比 = 300÷4.8 = 62.5\n→ 租比买划算！300万拿去投资年化5%=15万，远超4.8万租金\n\n【买房的隐性好处】\n• 强制储蓄（月供一部分是还本金）\n• 锁定居住成本（房租每年涨）\n• 归属感和安定感\n• 学区等附加价值\n\n【租房的隐性好处】\n• 灵活换城市/换工作\n• 省下的首付可以投资\n• 不用承担维修、物业等成本\n\n💡纯经济角度：房价租金比>30时租房更划算。但房子不只是经济账，还有生活账。', tags: ['房产', '租房', '买房'] },
      { id: 'f52', title: '公积金使用技巧—— 这笔钱别闲着', desc: '公积金账户躺着只有1.5%活期利息。用来还房贷最划算（利率3.1% vs 商贷4.2%），或者提取交房租。别让它沉睡！', detail: '全国公积金账户里躺着超过8万亿，大部分在吃1.5%的低息。让你的公积金"活"起来。\n\n【公积金的三大用途】\n①还房贷（最划算！）\n• 公积金贷款利率：首套3.1%，二套3.575%\n• 商贷利率：约4.2%\n→ 100万贷款30年，用公积金比商贷省约18万利息\n\n②提取交房租\n• 无房职工可提取公积金交房租\n• 每季度或每年提取一次\n• 各地额度不同（如北京每月最高2000元）\n\n③大额提取\n• 买房、建房、翻修可一次性提取\n• 退休可一次性全部提取\n\n【组合贷技巧】\n公积金贷款有上限（各地不同，约50-120万）\n超过部分用商贷→"公积金+商贷"组合\n→ 最大限度利用低息公积金\n\n💡登录当地公积金App/小程序，查查你的余额。几万块躺着吃活期利息太浪费了！', tags: ['公积金', '房贷'] },
    ];

    // 智能轮换：每日推荐1条，不重复
    const result = Store.getDailyKnowledge('finance', knowledgeDB, 1);
    let currentItem = result.items[0] || knowledgeDB[0];

    const section = document.createElement('div');
    section.className = 'section-title';
    section.style.marginTop = '4px';
    section.innerHTML = `💰 今日理财推荐 <span style="font-size:11px;font-weight:400;color:var(--text-muted);">每日自动更新 · 点击卡片展开全文</span>`;
    container.appendChild(section);

    // ===== 大卡片容器 =====
    const cardWrap = document.createElement('div');
    cardWrap.style.marginBottom = '16px';
    container.appendChild(cardWrap);

    // 渲染单条知识卡片
    const renderCard = (item) => {
      const isFav = Store.isFinanceFavorite(item.id);
      cardWrap.innerHTML = '';

      const card = document.createElement('div');
      card.className = 'finance-knowledge-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="fk-header">
          <span class="fk-day">📖 ${this.escape(item.tags[0] || '理财知识')}</span>
          <span class="fk-source">点击展开/收起全文</span>
        </div>
        <div class="fk-title">${this.escape(item.title)}</div>
        <div class="fk-desc fk-desc-collapsed">${this.escape(item.desc)}</div>
        <div class="fk-detail" style="display:none;white-space:pre-line;font-size:13px;line-height:1.8;color:var(--text-sub);margin-top:10px;padding-top:10px;border-top:1px dashed rgba(245,166,35,0.2);">${this.escape(item.detail || item.desc)}</div>
        <div class="fk-tags">
          ${item.tags.map(t => `<span class="fk-tag">${this.escape(t)}</span>`).join('')}
        </div>
      `;

      // 点击卡片展开/收起
      let expanded = false;
      card.onclick = (e) => {
        if (e.target.closest('.fk-action-btn')) return;
        expanded = !expanded;
        const desc = card.querySelector('.fk-desc');
        const detail = card.querySelector('.fk-detail');
        const source = card.querySelector('.fk-source');
        if (expanded) {
          desc.style.display = 'none';
          detail.style.display = 'block';
          source.textContent = '点击收起 ↑';
        } else {
          desc.style.display = 'block';
          detail.style.display = 'none';
          source.textContent = '点击展开/收起全文';
        }
      };

      // 按钮区域
      const btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;gap:8px;margin-top:12px;padding-top:10px;border-top:1px dashed rgba(245,166,35,0.2);';

      // 换一条看看
      const skipBtn = document.createElement('button');
      skipBtn.className = 'fk-action-btn';
      skipBtn.style.cssText = 'flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-soft);color:var(--text-sub);font-size:13px;font-weight:500;cursor:pointer;';
      skipBtn.textContent = '🔄 换一条看看';
      skipBtn.onclick = (e) => {
        e.stopPropagation();
        const newItem = Store.skipFinanceKnowledge(item.id, knowledgeDB);
        currentItem = newItem;
        renderCard(newItem);
      };

      // 收藏这条
      const favBtn = document.createElement('button');
      favBtn.className = 'fk-action-btn';
      favBtn.style.cssText = `flex:1;padding:8px 12px;border:none;border-radius:8px;background:${isFav ? 'var(--bg-soft)' : 'var(--primary)'};color:${isFav ? 'var(--text-muted)' : '#fff'};font-size:13px;font-weight:500;cursor:${isFav ? 'default' : 'pointer'};`;
      favBtn.textContent = isFav ? '⭐ 已收藏' : '⭐ 收藏这条';
      if (!isFav) {
        favBtn.onclick = (e) => {
          e.stopPropagation();
          const added = Store.addFinanceFavorite(item);
          if (added) {
            UI.toast('已收藏 ⭐');
            renderCard(item);
            renderFavorites();
          } else {
            UI.toast('已经收藏过了');
          }
        };
      }

      btnRow.appendChild(skipBtn);
      btnRow.appendChild(favBtn);
      card.appendChild(btnRow);

      cardWrap.appendChild(card);
    };

    renderCard(currentItem);

    // ===== 我的财经收藏 =====
    const favSection = document.createElement('div');
    favSection.style.cssText = 'margin-top:20px;';
    container.appendChild(favSection);

    const renderFavorites = () => {
      favSection.innerHTML = '';
      const favTitle = document.createElement('div');
      favTitle.className = 'section-title';
      favTitle.innerHTML = `⭐ 我的财经收藏 <span style="font-size:11px;font-weight:400;color:var(--text-muted);">${Store.getFinanceFavorites().length > 0 ? `(${Store.getFinanceFavorites().length})` : ''}</span>`;
      favSection.appendChild(favTitle);

      const favorites = Store.getFinanceFavorites();
      if (favorites.length === 0) {
        const empty = document.createElement('div');
        empty.style.cssText = 'text-align:center;padding:20px;color:var(--text-muted);font-size:13px;background:var(--bg-soft);border-radius:12px;';
        empty.textContent = '还没有收藏，看到喜欢的内容点 ⭐ 收藏';
        favSection.appendChild(empty);
        return;
      }

      const favList = document.createElement('div');
      favList.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
      favorites.forEach(fav => {
        const favCard = document.createElement('div');
        favCard.style.cssText = 'background:var(--bg-soft);border-radius:10px;padding:12px;';
        favCard.innerHTML = `
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:600;margin-bottom:4px;">${this.escape(fav.title)}</div>
              <div style="display:flex;gap:4px;flex-wrap:wrap;">
                ${fav.tags.map(t => `<span class="fk-tag">${this.escape(t)}</span>`).join('')}
              </div>
            </div>
            <button class="fk-del-btn" data-favid="${fav.id}" style="flex-shrink:0;width:28px;height:28px;border:none;border-radius:50%;background:rgba(255,71,87,0.1);color:#ff4757;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
          </div>
        `;
        favCard.querySelector('.fk-del-btn').onclick = () => {
          Store.removeFinanceFavorite(fav.id);
          renderFavorites();
          renderCard(currentItem);
        };
        favList.appendChild(favCard);
      });
      favSection.appendChild(favList);
    };

    renderFavorites();
  },

  // ===== 培训 =====
  renderTraining(container) {
    const trainingDB = [
      // ===== 组织发展 =====
      { id: 't0', cat: '组织发展', title: '敏捷组织转型：从"管控"到"赋能"', desc: '敏捷组织=小团队+大平台。把大金字塔拆成多个自驱动小团队，总部从"管控者"变为"赋能者"，决策从周级缩短到天级。', detail: '传统组织像金字塔，决策层层上报，市场反应慢。敏捷组织像特种部队，小团队端到端负责，总部提供弹药支援。\n\n【敏捷组织的三个特征】\n①小团队：5-9人跨职能团队，端到端负责一个产品/项目\n②大平台：共享技术、数据、HR、财务等中台能力\n③快迭代：以2周为一个Sprint，快速试错、快速调整\n\n【转型关键步骤】\n1.战略共识：高管对齐"为什么要变"\n2.选择试点：选1-2个业务线先试，不要全面铺开\n3.重构架构：拆部门→建团队→搭平台\n4.改变机制：OKR替代KPI、持续反馈替代年度考核\n5.文化塑造：从"不犯错"到"快试快改"\n\n【常见误区】\n❌ 只改架构不改机制（换了皮没换骨）\n❌ 全面铺开不试点（风险太大）\n❌ 只学形不学神（站会开了但决策还是层层上报）\n\n💡案例：字节跳动8万人只有10个层级，3-5人小团队快速决策，这就是敏捷组织的典范。', tags: ['敏捷组织', '转型', '架构'] },
      { id: 't1', cat: '组织发展', title: '平台型组织：让前端跑得快，让后端稳得住', desc: '平台型组织=前台（作战）+中台（赋能）+后台（保障）。前端小团队敏捷作战，中台提供标准化能力支撑。', detail: '平台型组织是阿里巴巴提出的组织模式，核心思想是"大中台、小前台"。\n\n【三层架构】\n前台：贴近市场的敏捷团队，负责快速响应客户需求\n中台：沉淀共性能力（技术、数据、供应链、HR），避免重复造轮子\n后台：财务、法务、行政等基础保障\n\n【为什么有效？】\n• 前台不用从零搭建系统，调中台能力即可\n• 中台积累越久，能力越强，前台跑得越快\n• 避免10个团队各搞一套支付系统、用户系统\n\n【建设中台的关键】\n1.识别共性：哪些能力被多个业务线重复使用？\n2.标准化：把能力封装成"服务"，统一接口\n3.治理机制：谁用谁付费，谁建谁维护\n4.持续迭代：中台不是一次性建好，而是随业务演进\n\n【适合谁？】\n✅ 多业务线的大型企业（阿里、美团、字节）\n❌ 单一业务线的中小企业（不需要中台，直接干就行）\n\n💡中台不是目的，让前台跑得快才是目的。如果中台变成了瓶颈，不如不要。', tags: ['平台组织', '中台', '架构'] },
      { id: 't2', cat: '组织发展', title: '组织能力建设：杨三角模型的实战应用', desc: '组织能力=员工能力×员工思维×员工治理。三个维度缺一不可，任何一块短板都会限制整体战斗力。', detail: '杨国安教授的"杨三角"模型是组织能力诊断最实用的框架。\n\n【三个维度】\n①员工能力（会不会做？）\n• 人才画像是否清晰？\n• 招聘标准是否对齐业务需求？\n• 培训体系是否补齐能力差距？\n\n②员工思维（愿不愿做？）\n• 考核指标是否导向正确行为？\n• 激励机制是否让人有动力？\n• 企业文化是否深入人心？\n\n③员工治理（容不容许做？）\n• 组织架构是否支持跨部门协作？\n• 流程是否高效还是拖后腿？\n• 权责是否清晰、授权是否充分？\n\n【诊断方法】\n对每个维度打分（1-5分），找到最短的那块板。\n• 3分以下=急需改善\n• 3-4分=有提升空间\n• 4-5分=保持优势\n\n【常见问题】\n• 能力强但没动力→考核和激励出了问题\n• 有动力但没能力→招聘或培训出了问题\n• 有能力有动力但做不成→流程或授权出了问题\n\n💡案例：某销售团队业绩差，诊断发现是"思维"问题——考核只看过程不看结果，改了考核指标后业绩翻倍。', tags: ['杨三角', '组织能力', '诊断'] },
      { id: 't3', cat: '组织发展', title: '组织文化落地：从墙上的标语到行为的改变', desc: '文化不是贴在墙上的口号，而是"没人监督时人们怎么做"。落地关键是：考核、仪式、故事、选人。', detail: '90%的企业文化停留在口号阶段，真正落地需要系统设计。\n\n【文化落地的四个抓手】\n\n①考核导向（最重要！）\n• 你考核什么，员工就重视什么\n• 如果说"客户第一"但考核只看业绩，员工不会真正重视客户\n• 把文化行为纳入考核：如NPS客户满意度占20%权重\n\n②仪式设计\n• 阿里"五年陈"戒指仪式→强化归属感\n• 字节"CEO面对面"→强化透明文化\n• 仪式不需要花钱，但需要用心设计\n\n③故事传播\n• 不要讲抽象价值观，讲具体故事\n• "某员工为了帮客户解决问题加班到凌晨"比"客户第一"有力量100倍\n• 建立文化故事库，定期在全员会上分享\n\n④选人淘汰\n• 文化是选出来的，不是教出来的\n• 招聘时评估文化匹配度\n• 对于严重违反价值观的高绩效者，敢于淘汰\n（阿里"卫哲事件"就是价值观优先的典型案例）\n\n【文化落地的三个阶段】\n阶段1（0-1年）：创始人以身作则\n阶段2（1-3年）：制度保障，考核牵引\n阶段3（3年+）：自驱动，新人自然融入\n\n💡检验文化是否落地的标准：随机问5个员工"公司最看重什么"，如果答案一致，说明文化落地了。', tags: ['组织文化', '落地', '价值观'] },
      { id: 't4', cat: '组织发展', title: 'OKR vs KPI：选错了适得其反', desc: 'KPI=自上而下分目标，关注结果考核；OKR=自下而上定目标，关注方向对齐。创新业务用OKR，成熟业务用KPI。', detail: 'OKR和KPI不是替代关系，而是适用于不同场景的工具。\n\n【核心区别】\n        KPI              OKR\n目标来源  自上而下分配      自下而上提出+自上而下对齐\n关注点    结果考核          方向对齐+成长\n与绩效   直接挂钩           不直接挂钩（或部分挂钩）\n目标难度  跳一跳够得着      要有挑战性（完成70%算好）\n透明度    通常不公开        全员可见\n\n【什么时候用OKR？】\n✅ 创新业务、探索型项目\n✅ 快速变化的行业（互联网、科技）\n✅ 需要跨部门协作的目标\n✅ 员工成熟度高、自驱力强\n\n【什么时候用KPI？】\n✅ 成熟业务、标准化运营\n✅ 销售、生产等可量化岗位\n✅ 传统行业、流程清晰的岗位\n✅ 员工需要明确指引\n\n【OKR实施的三个坑】\n❌ OKR直接挂钩绩效奖金→员工不敢定挑战性目标\n❌ OKR太多太细→变成KPI的翻版\n❌ 只定不回顾→OKR流于形式\n\n【OKR回顾节奏】\n• 每周Check-in：15分钟快速同步进度\n• 每月Review：深入讨论卡点\n• 每季度复盘：打分+调整下季度方向\n\n💡最佳实践：OKR管方向，KPI管执行，两者配合使用。', tags: ['OKR', 'KPI', '绩效'] },
      // ===== 人才培养 =====
      { id: 't5', cat: '人才培养', title: '高潜人才识别：不是"表现好"就等于"潜力大"', desc: '高潜≠高绩效。识别高潜看四个维度：学习敏捷性、同理心、变革领导力、结果导向。绩效只看过去，潜力看未来。', detail: '很多企业把"绩效A"等同于"高潜人才"，这是最大的误区。\n\n【高绩效 vs 高潜力】\n高绩效：在当前岗位上做得好（过去时）\n高潜力：能胜任更大职责（将来时）\n→ 高绩效者中只有约30%是高潜人才\n\n【识别高潜的四个维度】\n\n①学习敏捷性（最核心！）\n• 在陌生环境中快速学习并找到解决方案\n• 不是"学得快"，而是"从经验中提取规律的能力"\n• 测试方法：给一个超出舒适区的任务，看反应\n\n②同理心\n• 能理解不同层级、不同部门人的想法\n• 升职后需要管理"和自己不同的人"\n• 没有同理心的高潜升上去后会"众叛亲离"\n\n③变革领导力\n• 不仅能执行，还能推动改变\n• 在困境中能团结他人共同解决\n• 看他/她在项目遇到阻力时怎么做\n\n④结果导向\n• 不是"很忙很努力"，而是"拿到了结果"\n• 在资源受限时仍能交付\n\n【九宫格人才盘点】\n横轴：绩效（低/中/高）\n纵轴：潜力（低/中/高）\n• 高绩效+高潜力=超级明星（重点培养）\n• 高绩效+低潜力=中坚力量（保持）\n• 低绩效+高潜力=待开发（给机会）\n• 低绩效+低潜力=考虑调整\n\n💡高潜培养最忌讳"太快"——每次晋升间隔不少于18个月，让能力真正沉淀。', tags: ['高潜人才', '人才盘点', '识别'] },
      { id: 't6', cat: '人才培养', title: '继任者计划：关键岗位不能"青黄不接"', desc: '继任者计划=为关键岗位准备"替补队员"。识别关键岗位→选高潜接班人→制定培养计划→定期评估就绪度。', detail: '如果某个关键岗位的人突然离职，你的公司能撑多久？继任者计划就是解决这个问题的。\n\n【第一步：识别关键岗位】\n不是所有岗位都需要继任者。关键岗位的标准：\n• 对业务影响大（如核心产品负责人）\n• 替代难度高（如掌握核心技术的专家）\n• 战略关键节点（如区域总经理）\n→ 通常关键岗位占总岗位数的10-15%\n\n【第二步：选继任候选人】\n每个关键岗位选2-3个候选人，分为三档：\n• Ready Now（立即就绪）：1年内可以接任\n• Ready 1-2 years（1-2年就绪）：需要针对性培养\n• Ready 3+ years（3年以上）：长期培养对象\n\n【第三步：制定培养计划】\n针对每个候选人的能力差距，设计培养方案：\n• 70%：在岗实践（给挑战性项目、轮岗）\n• 20%：辅导反馈（导师制、高管辅导）\n• 10%：培训学习（课程、外部项目）\n\n【第四步：定期评估】\n• 每半年更新一次继任者就绪度\n• 候选人离职要及时补充新人选\n• 继任者计划要保密，避免引发组织动荡\n\n【常见误区】\n❌ 只选"听话的人"而不是"最合适的人"\n❌ 继任者计划只放在HR抽屉里，业务负责人不知道\n❌ 培养计划只培训不给实践机会\n\n💡GE（通用电气）的继任者计划被誉为标杆——CEO接班人会提前5-7年开始培养。', tags: ['继任者计划', '人才梯队', '关键岗位'] },
      { id: 't7', cat: '人才培养', title: 'IDP个人发展计划：让员工为自己的成长负责', desc: 'IDP=个人发展计划。员工自定目标、自选行动、自评进度。管理者的角色从"安排培训"变为"辅导成长"。', desc2: '', detail: 'IDP（Individual Development Plan）是让员工为自己的职业发展负责的工具。\n\n【IDP vs 传统培训】\n传统培训：HR安排→员工参加→回去忘了\nIDP：员工自己定目标→自己选行动→定期回顾\n→ 核心区别：从"要我学"到"我要学"\n\n【IDP三步法】\n\n第一步：自我认知\n• 我的优势是什么？（能力盘点）\n• 我想要什么？（职业目标）\n• 差距在哪里？（能力对比）\n工具：SWOT分析、360度反馈、性格测评\n\n第二步：制定计划\n• 1年目标：具体、可衡量（如"独立带领一个项目"）\n• 行动方案：70-20-10法则\n  - 70%在岗实践：承担新项目、轮岗\n  - 20%人际学习：找导师、参加社群\n  - 10%正式学习：课程、认证、读书\n\n第三步：定期回顾\n• 每季度和直属上级做1次IDP对话（30分钟）\n• 讨论进度、调整方向、获取支持\n• 年底做年度复盘\n\n【管理者的角色】\n• 不是"替员工定计划"，而是"辅导员工自己定"\n• 提供资源和支持（轮岗机会、培训预算）\n• 及时反馈和认可\n\n【常见问题】\n❌ IDP变成"应付HR的作业"→因为上级不重视\n❌ 目标太宏大不落地→拆成季度小目标\n❌ 只写不回顾→变成废纸\n\n💡好的IDP对话应该占管理者1对1时间的20%以上。', tags: ['IDP', '个人发展', '成长'] },
      { id: 't8', cat: '人才培养', title: '70-20-10法则：能力提升的黄金比例', desc: '70%来自工作实践，20%来自他人反馈，10%来自正式培训。只靠上课是学不会的，真正的成长在"打仗"中。', detail: '70-20-10法则是人才培养最经典也最被验证的理论模型。\n\n【为什么是这个比例？】\n\n70%——在岗实践\n• 人的能力70%是在实际工作中"干"出来的\n• 上100节领导力课不如带一个真实项目\n• 关键：给员工"跳一跳够得着"的挑战性任务\n\n20%——人际学习\n• 从导师、同事、上级的反馈中学习\n• 观察优秀的人怎么做事\n• 关键：建立导师制、营造反馈文化\n\n10%——正式培训\n• 课程、读书、认证\n• 提供"知识框架"和"方法论"\n• 关键：培训内容要和实际工作场景结合\n\n【实战应用：设计一个培养项目】\n\n目标：培养一个中层管理者\n\n70%在岗实践：\n• 负责一个跨部门项目\n• 临时替代上级参加管理会\n• 带一个新人或实习生\n\n20%人际学习：\n• 配置一位高管导师（每月1次1对1）\n• 参加360度反馈并讨论\n• 加入管理者社群定期交流\n\n10%正式培训：\n• 参加管理基础课程（2-3天）\n• 读3本管理经典并写读书笔记\n• 完成一个在线领导力测评\n\n【常见误区】\n❌ 只做10%的培训，忽略70%和20%\n❌ 给了挑战性任务但不给反馈和辅导\n❌ 导师制流于形式（一年见一次面）\n\n💡检验培养效果的标准：学员的能力行为是否真正改变，而不是上了多少课。', tags: ['70-20-10', '人才培养', '学习方法'] },
      { id: 't9', cat: '人才培养', title: '导师制落地：不是"安排了"就行', desc: '好的导师制=匹配+结构化+持续。导师不是"老师"，而是"镜子+桥梁"。关键在定期、有主题、有行动。', desc2: '', detail: '导师制是人才培养性价比最高的方式，但90%的企业都做错了。\n\n【导师制的三个价值】\n①镜子：帮 mentee 看到自己的盲区\n②桥梁：帮 mentee 连接资源和人脉\n③顾问：在关键决策时提供经验和建议\n\n【导师不是什么？】\n❌ 不是老师：不教具体技能（那是培训的事）\n❌ 不是上级：不考核、不分配任务\n❌ 不是心理咨询师：不解决情绪问题\n\n【如何匹配导师？】\n• 经验差2-3个层级最佳（太近没高度，太远没共鸣）\n• 跨部门比同部门好（避免利益冲突）\n• 性格互补比相似好（内向配外向）\n• 让双方都有选择权，不要强制配对\n\n【结构化对话框架】\n每次导师对话建议按这个结构：\n1.近况同步（5分钟）：最近在忙什么？遇到什么挑战？\n2.主题深入（20分钟）：围绕一个具体问题深入讨论\n3.经验分享（10分钟）：导师分享相关经历和教训\n4.行动约定（5分钟）：下次之前 mentee 要做什么？\n\n【频率和节奏】\n• 每月1次，每次40-60分钟\n• 至少持续6个月才能看到效果\n• 每次要有记录（简单几句话即可）\n\n【导师制失败的五个原因】\n①强制配对→双方都没动力\n②没有主题→变成闲聊\n③频率太低→半年见一次面\n④导师太忙→经常取消\n⑤没有闭环→聊完没有行动\n\n💡好的导师制中，导师自己也获益——"教学相长"，导师在分享中也重新梳理了自己的经验。', tags: ['导师制', '人才培养', '辅导'] },
      // ===== 培训设计 =====
      { id: 't10', cat: '培训设计', title: 'ADDIE模型：培训设计的经典五步法', desc: 'Analysis分析→Design设计→Develop开发→Implement实施→Evaluate评估。五步缺一不可，最常被忽略的是第一步和最后一步。', detail: 'ADDIE是培训设计领域应用最广的模型，几乎所有培训项目都基于这个框架。\n\n【五步详解】\n\nA - Analysis（需求分析）\n• 业务问题是什么？（如业绩下滑、客诉上升）\n• 是不是培训能解决的？（有些问题是流程/激励的问题）\n• 目标学员是谁？现状和目标的差距在哪？\n→ 最常被忽略的一步！不做需求分析的培训=盲开药方\n\nD - Design（方案设计）\n• 学习目标：学完之后能做什么？（用行为描述，不是"了解"）\n• 内容结构：知识点→案例→练习→测评\n• 教学策略：讲授、案例、角色扮演、模拟\n• 时间安排：每15-20分钟一个互动节点\n\nD - Develop（内容开发）\n• 课件PPT、学员手册、案例材料\n• 练习题、角色扮演脚本\n• 测评问卷、评估表\n• 先做MVP版本，找几个人试讲，收集反馈再优化\n\nI - Implement（实施交付）\n• 课前通知+预习材料\n• 课堂互动（每组4-6人最佳）\n• 课后行动作业\n• 讲师控场技巧：时间管理、氛围调动、突发处理\n\nE - Evaluate（效果评估）\n• 用柯氏四级评估（详见另一篇）\n• 至少做到二级评估（学到了什么）\n• 关键业务项目做到三级（行为改变）和四级（业务结果）\n\n【ADDIE的变体】\n• SAM（连续迭代模型）：适合需要快速迭代的项目\n• 敏捷设计：2周一个版本，边用边改\n\n💡最贵的培训不是开发成本高的，而是"做了没效果"的。需求分析做好了，成功率提升50%。', tags: ['ADDIE', '培训设计', '模型'] },
      { id: 't11', cat: '培训设计', title: '柯氏四级评估：培训效果怎么量化？', desc: '一级反应（满意吗）→二级学习（学到了吗）→三级行为（用上了吗）→四级结果（业绩变好了吗）。90%的培训只做到一级。', detail: '柯氏四级评估是培训效果评估最权威的模型，但也是最难做到的。\n\n【四级详解】\n\n一级：反应（Reaction）\n• 评估内容：学员对培训的满意度\n• 方法：课后问卷（5-10题）\n• 问题示例：内容实用吗？讲师讲得好吗？\n• 成本：极低\n• 价值：有限（满意≠有效）\n→ 90%的企业止步于此\n\n二级：学习（Learning）\n• 评估内容：学员学到了什么知识/技能\n• 方法：课前测试+课后测试对比\n• 方法2：实操考核（如角色扮演评分）\n• 成本：低\n• 价值：中等（学到了≠会用）\n→ 约60%的企业做到这一级\n\n三级：行为（Behavior）\n• 评估内容：学员回到工作中行为是否改变\n• 方法：培训后1-3个月，上级观察+360反馈\n• 关键：培训前测一次行为基线，培训后对比\n• 成本：中等\n• 价值：高（行为改变才有意义）\n→ 约20%的企业做到这一级\n\n四级：结果（Results）\n• 评估内容：培训对业务结果的影响\n• 方法：对比培训组vs未培训组的业务指标\n• 指标：业绩、客诉率、良品率、离职率等\n• 成本：高\n• 价值：最高（证明培训的投资回报）\n→ 不到5%的企业做到这一级\n\n【如何提升到三级和四级？】\n1.培训前明确业务指标基线\n2.课后设计"行动学习"作业（必须用上）\n3.上级参与：让直属上级知道培训内容，辅导落地\n4.1-3个月后回顾行为改变\n5.用数据对比培训前后的业务指标\n\n💡三级评估的关键不是"培训部门"的事，而是"业务部门上级"的事。没有上级参与，行为改变几乎不可能发生。', tags: ['柯氏评估', '培训评估', 'ROI'] },
      { id: 't12', cat: '培训设计', title: '混合式学习设计：线上+线下+在岗的黄金组合', desc: '线上学理论（省时间）+线下练技能（重实操）+在岗用所学（出结果）。三者结合才是完整的培训项目。', detail: '单纯的课堂培训正在被淘汰，混合式学习是培训设计的标配。\n\n【为什么需要混合式？】\n• 纯课堂：时间成本高、知识留存率低（一周后只记得20%）\n• 纯线上：缺乏练习和互动、完课率低（通常<30%）\n• 混合式：取两者之长+在岗实践，知识留存率可达70%\n\n【混合式学习的三层设计】\n\n第一层：线上学理论（课前）\n• 形式：微课视频（5-10分钟/个）、阅读材料、自测题\n• 目的：让学员带着基础知识来线下，课堂时间不浪费在讲授上\n• 完成率保障：设置截止日期+群内提醒\n\n第二层：线下练技能（课中）\n• 形式：工作坊、角色扮演、案例讨论、模拟演练\n• 目的：把"知道"变成"做到"\n• 关键：少讲授多练习，讲师是引导者不是讲授者\n\n第三层：在岗用所学（课后）\n• 形式：行动学习项目、课后作业、实践打卡\n• 目的：把"做到"变成"习惯"\n• 关键：直属上级参与，提供反馈和辅导\n\n【时间分配参考】\n一个完整的混合式项目（如新经理训练营）：\n• 线上学习：4-6小时（分散在2周）\n• 线下工作坊：2-3天（集中进行）\n• 在岗实践：4-8周（真实项目+定期辅导）\n• 结业答辩：半天（汇报实践成果）\n\n【混合式学习的关键成功因素】\n①每层之间要有衔接（线上学完→线下要用到）\n②设置阶段里程碑（不要一松到底）\n③社群运营（学习群每天分享+互相激励）\n④业务上级参与（至少参加开营和结业）\n\n💡混合式学习的ROI是纯课堂培训的3-5倍，但设计成本也是3-5倍。', tags: ['混合式学习', '培训设计', '线上线下'] },
      { id: 't13', cat: '培训设计', title: '案例教学法：让学员从"听"变成"想"', desc: '案例教学=给真实场景→分组讨论→方案呈现→讲师点评。关键不是"标准答案"，而是"思维过程"。', desc2: '', detail: '案例教学法是商学院最核心的教学方法，也是企业培训中效果最好的方法之一。\n\n【案例教学 vs 传统讲授】\n传统讲授：讲师讲→学员听→记住\n案例教学：学员讨论→讲师引导→理解\n→ 核心区别：从"给答案"到"找答案"\n\n【案例教学的五步流程】\n\n第一步：案例阅读（10-15分钟）\n• 学员独立阅读案例材料\n• 案例要基于真实场景，有数据有冲突\n• 材料不要超过3页，太长学员读不完\n\n第二步：小组讨论（20-30分钟）\n• 4-6人一组，每组一个讨论方向\n• 讨论问题要开放（不是"对不对"，而是"怎么做"）\n• 讲师巡场，必要时给提示但不给答案\n\n第三步：方案呈现（每组5-10分钟）\n• 每组派代表汇报方案\n• 其他组可以提问质疑\n• 鼓励不同观点碰撞\n\n第四步：讲师点评（15-20分钟）\n• 不是"公布标准答案"——很多案例没有标准答案\n• 点评各组的亮点和盲区\n• 补充行业最佳实践和理论框架\n• 帮学员提炼"方法论"而不是"结论"\n\n第五步：反思迁移（10分钟）\n• "这个案例对你工作有什么启发？"\n• "你会怎么把今天讨论的方法用到实际工作中？"\n\n【好案例的四个特征】\n①真实：基于真实企业/真实事件\n②冲突：有明确的决策两难\n③数据：有足够信息支撑分析\n④开放：没有唯一正确答案\n\n【常见误区】\n❌ 案例太虚构→学员没有代入感\n❌ 讨论时间太短→还没深入就收了\n❌ 讲师急着给答案→扼杀了思考\n❌ 没有迁移环节→学完就忘\n\n💡案例教学的关键是"讲师闭嘴"——讲师说得越少，学员学得越多。', tags: ['案例教学', '培训方法', '讨论'] },
      { id: 't14', cat: '培训设计', title: '行动学习：在解决真实问题中学习', desc: '行动学习=一群人解决一个真实的业务问题，在过程中学习。学以致用，用以致学，最难但效果最好。', detail: '行动学习（Action Learning）是培训界的"终极武器"——直接解决业务问题同时培养人才。\n\n【什么是行动学习？】\n• 一组人（5-8人）\n• 解决一个真实的、没有标准答案的业务问题\n• 在过程中学习领导力、协作、问题解决\n• 最终产出：解决方案+能力提升\n\n【行动学习的六要素】\n1.问题：真实、紧迫、跨部门（如"如何提升某产品复购率20%"）\n2.小组：跨部门、跨层级（5-8人）\n3.提问：通过提问而非直接给答案来分析问题\n4.行动：必须产出可落地的行动方案\n5.学习：在过程中反思"学到了什么"\n6.教练：有一位行动学习教练引导过程\n\n【行动学习的流程】\n\n启动阶段（1天工作坊）\n• 确认问题和目标\n• 组建团队、分工\n• 学习问题分析工具（5Why、鱼骨图等）\n\n实施阶段（4-8周）\n• 每周1次小组会（2小时）\n• 通过提问深入分析问题根因\n• 设计解决方案并小规模测试\n• 教练引导反思和学习\n\n结业阶段（半天答辩）\n• 向高管汇报解决方案\n• 分享个人学习收获\n• 高管评估方案可行性\n\n【行动学习的关键】\n• 问题必须是"真实的"——不能是假设性问题\n• 高管必须"真的会听"——不能只是走过场\n• 教练的作用是"引导提问"而非"给答案"\n• 重视"学习"部分——不只是解决问题，更要提炼方法论\n\n【成本和收益】\n• 成本：高（时间投入大，需要教练）\n• 收益：极高（解决真实问题+培养能力+建立跨部门信任）\n• ROI通常是传统培训的5-10倍\n\n💡GE的"群策群力"（Work-Out）就是经典的行动学习，帮助GE节省了数十亿美元。', tags: ['行动学习', '培训方法', '问题解决'] },
      // ===== 领导力 =====
      { id: 't15', cat: '领导力', title: '情境领导：没有最好的风格，只有最合适的', desc: '根据下属成熟度（能力+意愿）选择领导风格：指令→辅导→支持→授权。对新人指令，对老手授权。', detail: '情境领导力是保罗·赫塞提出的经典理论，核心思想是"因人因时调整领导风格"。\n\n【四个下属成熟度级别】\n\nR1：低能力+低意愿（新手/新人）\n• 特征：不会做也不想做\n• 适合风格：指令型（S1）\n• 做法：明确告诉他做什么、怎么做、什么时候做完\n\nR2：低能力+高意愿（学习中的人）\n• 特征：不会做但很想做\n• 适合风格：辅导型（S2）\n• 做法：给方向+给方法+解释为什么+鼓励\n\nR3：高能力+低意愿/不自信（有经验但没动力）\n• 特征：会做但不想做或不自信\n• 适合风格：支持型（S3）\n• 做法：倾听、鼓励、参与决策、消除障碍\n\nR4：高能力+高意愿（成熟员工）\n• 特征：会做也想做\n• 适合风格：授权型（S4）\n• 做法：给目标+给资源+放手+看结果\n\n【常见误区】\n❌ 对R1授权→新人无所适从，产出差\n❌ 对R4指令→老手觉得不被信任，没动力\n❌ 风格不随人变→用一种风格管理所有人\n❌ 风格不随任务变→同一人在不同任务上成熟度不同\n\n【诊断下属成熟度的方法】\n• 能力：看过去在这个任务上的表现\n• 意愿：看主动性和信心\n• 注意：同一个人在A任务上可能是R4，在B任务上可能是R2\n\n【实操建议】\n1.每周花5分钟给每个直接下属打一个R级别\n2.根据R级别选择对应的沟通和管理方式\n3.当下属成长了（R2→R3），及时调整风格，否则会"卡"住对方\n4.新任务/新挑战时，成熟度会暂时下降，需要降级管理\n\n💡情境领导最大的价值是提醒管理者：不要用"自己喜欢的方式"管理，而要用"对方需要的方式"管理。', tags: ['情境领导', '领导力', '管理风格'] },
      { id: 't16', cat: '领导力', title: '教练式领导：从"给答案"到"问问题"', desc: '教练式领导=通过提问引导下属自己找到答案。GROW模型：Goal目标→Reality现状→Options选项→Will行动。', detail: '教练式领导力是现代管理者最重要的技能——不再是"告诉下属怎么做"，而是"引导下属自己想出来"。\n\n【为什么要教练式领导？】\n• 直接给答案→下属依赖你，你永远忙不完\n• 引导自己想→下属独立成长，你越来越轻松\n• 自己想出来的方案，执行力远高于被安排的\n\n【GROW模型】\n\nG - Goal（目标）\n• "你想要达成什么结果？"\n• "这个目标对你和团队意味着什么？"\n• "什么时候算成功了？"\n\nR - Reality（现状）\n• "现在的情况怎么样？"\n• "你已经做了哪些尝试？效果如何？"\n• "有什么障碍阻碍了你？"\n\nO - Options（选项）\n• "你有哪些可能的方案？"\n• "如果资源不是问题，你会怎么做？"\n• "还有其他可能性吗？"\n• "每个方案的利弊是什么？"\n\nW - Will（行动意愿）\n• "你决定怎么做？"\n• "第一步是什么？什么时候开始？"\n• "你需要什么支持？"\n• "我们什么时候回顾进度？"\n\n【教练式对话的关键技巧】\n\n①多问少说\n• 80%时间在听和问，20%时间在说\n• 一次只问一个问题\n• 不要急着给建议\n\n②开放式提问\n❌ "你觉得方案A好吗？"（封闭式，只能回答好/不好）\n✅ "你对方案A怎么看？"（开放式，引导深入思考）\n\n③沉默是金\n• 问完问题后安静等待\n• 不要怕冷场，下属在思考\n• 沉默5-10秒是正常的\n\n④不评判\n• 即使下属的方案不完美，也不要直接否定\n• "这个方案如果执行，可能会遇到什么问题？"\n• 让他自己发现风险\n\n【什么时候用教练式？什么时候直接给答案？】\n✅ 用教练式：下属有能力但缺经验、问题是开放性的\n✅ 直接给答案：紧急情况、下属完全没经验、安全问题\n\n💡教练式领导力需要刻意练习。建议每周至少做1次完整的GROW对话，3个月后你会看到明显变化。', tags: ['教练式领导', 'GROW', '领导力'] },
      { id: 't17', cat: '领导力', title: '变革领导力：科特八步法', desc: '变革失败率70%。科特八步：建立紧迫感→组建联盟→制定愿景→沟通愿景→授权行动→创造短期胜利→巩固成果→融入文化。', detail: '约翰·科特的变革八步法是组织变革领域最经典的框架，用好了可以把变革成功率从30%提升到70%。\n\n【为什么变革会失败？】\n• 70%的组织变革项目没有达到预期目标\n• 失败原因通常不是方案不好，而是"人"的问题\n• 变革的核心是"改变人的行为"，这比改变流程难10倍\n\n【科特八步法】\n\n第一步：建立紧迫感\n• "我们为什么必须变？不变会怎样？"\n• 用数据说话：市场份额下降、利润下滑、客户流失\n• 让足够多的人感受到"不变不行了"\n→ 跳过这步是最常见的错误\n\n第二步：组建变革联盟\n• 找到有影响力的人组成核心团队\n• 不是只有高管，要包括意见领袖、技术骨干\n• 联盟成员要有足够的权力和信任\n\n第三步：制定愿景和战略\n• 愿景要简洁、清晰、有画面感\n• "成为行业数字化转型的标杆"比"提升效率20%"更有感召力\n• 战略是"怎么到达愿景"的路径\n\n第四步：沟通愿景\n• 不是发一封邮件就完了\n• 用一切渠道反复讲：全员会、部门会、1对1、海报\n• 高管以身作则：言行一致\n• 预计要沟通7遍以上才能深入人心\n\n第五步：授权行动\n• 去除阻碍变革的障碍（流程、结构、人）\n• 鼓励冒险和非传统的想法\n• 给一线足够的决策权\n\n第六步：创造短期胜利\n• 在3-6个月内制造可见的成果\n• 短期胜利证明变革方向正确\n• 给参与变革的人信心和动力\n• 给观望的人一个加入的理由\n\n第七步：巩固成果，推动更多变革\n• 不要在第一个胜利后宣布"变革完成"\n• 用短期胜利的信任推动更深的变革\n• 改变不符合新愿景的系统、结构、政策\n\n第八步：将新方式融入文化\n• 变革成果必须成为"我们做事的方式"\n• 否则旧习惯会回归\n• 确保选拔和晋升标准支持新文化\n\n💡最关键的教训：跳过第一步（紧迫感）直接进入行动，是变革失败的首要原因。', tags: ['变革领导', '科特八步', '组织变革'] },
      { id: 't18', cat: '领导力', title: '非职权领导力：没有头衔也能影响他人', desc: '影响力=专业力×信任力×互惠力。不是靠"我是领导"让人听话，而是靠专业、信任和互利让人愿意配合。', desc2: '', detail: '在矩阵式组织中，越来越多工作需要跨部门协作，但你没有对其他部门同事的"考核权"。如何让他们配合你？这就是非职权领导力。\n\n【三种影响力来源】\n\n①专业力\n• 你在这个领域比对方懂得多\n• 对方愿意听你的因为"你说的有道理"\n• 建立：持续学习、输出专业内容、解决过难题\n\n②信任力\n• 对方相信你是靠谱的、不会坑他\n• 你过去的承诺都兑现了\n• 建立：言出必行、主动分享信息、承认错误\n\n③互惠力\n• "我帮过你，你也帮我"\n• 不是功利交换，而是长期的关系投资\n• 建立：主动帮别人解决问题、先给予再索取\n\n【非职权领导力的实操技巧】\n\n1.先理解对方再被理解\n• "我知道你们部门最近在忙XX项目"\n• "这个请求对你们有什么影响？"\n• 理解了对方，对方才愿意理解你\n\n2.找到共同利益\n• 不要只说"我需要什么"\n• 要说"这件事对你/你们部门有什么好处"\n• 共同利益是对齐的前提\n\n3.用数据说话\n• "我建议这样做，因为数据显示……"\n• 数据比"我觉得"更有说服力\n• 但不要用数据压人，而是用数据邀请讨论\n\n4.让对方有参与感\n• 不要直接给方案让对方执行\n• "我有个初步想法，你觉得怎么样？"\n• 参与感=认同感\n\n5.及时感谢和认可\n• 别人帮了你，公开感谢\n• 在对方领导面前认可他的贡献\n• 下次他会更愿意配合\n\n【非职权领导力的禁忌】\n❌ "这件事老板让我协调的"→用权力压人，适得其反\n❌ "这不是我的问题"→推卸责任，失去信任\n❌ 只在需要帮忙时才出现→关系是投资不是提款\n\n💡非职权领导力的本质是"先给予价值，再获取支持"。', tags: ['非职权领导', '影响力', '跨部门协作'] },
      { id: 't19', cat: '领导力', title: '新经理转身：从"自己干"到"通过别人干"', desc: '新经理最大的挑战不是"管别人"，而是"放手自己不干"。第一次当经理的人，90%会犯这些错误。', detail: '从优秀员工晋升为管理者，是职业生涯中最难的转身。这个转身不成功，不仅个人痛苦，团队也遭殃。\n\n【新经理的五大常见错误】\n\n错误1：事必躬亲\n• "我自己做更快更好，教他们太慢了"\n• 结果：自己累死，下属没成长，团队产出受限\n• 正确做法：接受短期效率下降，投资下属能力\n\n错误2：微观管理\n• "你这个PPT字体不对，改成微软雅黑"\n• 事无巨细都要管，下属变成执行机器\n• 正确做法：管目标不管过程，管标准不管细节\n\n错误3：想当"老好人"\n• 不敢给负面反馈，怕"得罪人"\n• 绩效差不处理，优秀的人觉得不公平\n• 正确做法：及时坦诚反馈，区分"对人好"和"对事严"\n\n错误4：和下属"做朋友"\n• 以前是同事，现在变上级，关系没转换\n• 评价绩效时拉不下脸\n• 正确做法：可以友好但要有边界，保持专业距离\n\n错误5：只会向上不会向下\n• 所有精力都在向上汇报\n• 下属不知道目标、不知道进度、不知道评价\n• 正确做法：每周至少1次团队同步，每月1次1对1\n\n【新经理转身的三个阶段】\n\n第一阶段（0-3个月）：建立信任\n• 和每个下属做深度1对1（了解优势、期望、顾虑）\n• 不急于改变，先观察和理解\n• 和上级对齐期望和目标\n\n第二阶段（3-6个月）：建立规则\n• 明确团队目标和分工\n• 建立例会机制（周会+1对1）\n• 处理明显的绩效问题\n\n第三阶段（6-12个月）：建立团队\n• 培养核心骨干\n• 优化流程和机制\n• 开始追求团队整体效能提升\n\n💡新经理最大的突破是：从"我的产出"到"团队的产出"。当你不再用"我做了多少"来衡量自己，而是用"团队做了多少"来衡量，你就真正成为管理者了。', tags: ['新经理', '管理转身', '领导力'] },
      // ===== 数字化学习 =====
      { id: 't20', cat: '数字化学习', title: 'AI+培训：用AI重塑学习体验', desc: 'AI可以做三件事：个性化推荐（学什么）、智能辅导（怎么学）、自动评估（学得怎样）。关键是"增强人"而非"替代人"。', detail: 'AI正在深刻改变企业培训的方式。不是"AI取代培训管理者"，而是"AI让培训更精准、更高效"。\n\n【AI在培训中的三大应用】\n\n应用1：个性化学习路径\n• 传统：所有人学一样的内容\n• AI：根据岗位、能力差距、学习偏好，推荐不同内容\n• 技术：大模型+能力模型+学习数据\n• 效果：学习效率提升40%，完课率提升60%\n\n应用2：智能辅导/陪练\n• 传统：讲师1对N，无法照顾每个人\n• AI：AI教练1对1，随时问答、角色扮演、即时反馈\n• 场景：销售话术练习、面试模拟、管理对话\n• 效果：练习频次提升5倍，技能掌握速度提升3倍\n\n应用3：自动评估和反馈\n• 传统：人工批改作业、人工评估角色扮演\n• AI：自动评估答案质量、语音语调、沟通技巧\n• 效果：评估效率提升10倍，反馈更客观及时\n\n【实操案例：AI销售教练】\n• 场景：销售人员练习客户沟通\n• AI扮演客户，模拟真实对话场景\n• 销售练习后，AI给出评分和改进建议\n• 可以反复练习，不受时间和地点限制\n• 某企业使用后，新人上岗时间从3个月缩短到1.5个月\n\n【AI培训工具推荐】\n• 内容生成：ChatGPT/Claude生成课程大纲、案例、测试题\n• 视频制作：AI生成培训微课视频（HeyGen/Synthesia）\n• 智能问答：基于知识库的AI学习助手\n• 学习分析：AI分析学习数据，预测谁需要什么培训\n\n【实施建议】\n1.从"痛点"切入，不要为AI而AI\n2.先做MVP试点，验证效果再推广\n3.培训管理者要学习"和AI协作"的技能\n4.数据质量是关键——垃圾数据进，垃圾结果出\n\n💡AI不会取代培训人，但会用AI的培训人会取代不会用的。', tags: ['AI培训', '数字化学习', '智能化'] },
      { id: 't21', cat: '数字化学习', title: '在线学习平台选型：不要被功能列表忽悠', desc: '选平台看四点：内容管理、学习体验、数据分析、集成能力。最贵的不是最好的，最适合的才是。', detail: '企业选在线学习平台，最容易犯的错误就是"比功能列表"——哪家功能多选哪家。但功能多≠适合你。\n\n【选型四维度框架】\n\n维度1：内容管理（30%权重）\n• 支持哪些格式？（视频、文档、SCORM、H5P）\n• 内容上传和管理是否方便？\n• 是否支持UGC（用户生成内容）？\n• 知识库/素材库功能\n\n维度2：学习体验（30%权重）\n• 移动端体验（重要！90%的员工在手机上学习）\n• 界面是否简洁易用？\n• 学习路径和打卡功能\n• 社群互动功能\n• 游戏化元素（积分、徽章、排行榜）\n\n维度3：数据分析（20%权重）\n• 学习数据看板（完课率、活跃度）\n• 能力评估和差距分析\n• 培训ROI追踪\n• 自定义报表\n\n维度4：集成能力（20%权重）\n• 能否对接现有HR系统/SSO？\n• 能否对接企业微信/钉钉/飞书？\n• API开放程度\n• 数据导出能力\n\n【选型流程建议】\n\n第一步：明确需求\n• 你的核心用户是谁？（全员/特定岗位/管理层）\n• 你的核心场景是什么？（合规培训/技能提升/知识管理）\n• 你的预算范围？\n\n第二步：列出候选\n• 找3-5家供应商\n• 参考同行案例\n• 不要只看官网，要实际试用\n\n第三步：试用测试\n• 找10-20人试用2周\n• 收集真实反馈\n• 测试关键场景（上传内容、学习、考试、报表）\n\n第四步：决策\n• 用四维度打分\n• 考虑总拥有成本（年费+实施+维护）\n• 考虑供应商的服务能力和行业经验\n\n【常见误区】\n❌ 选了大而全的平台，但80%功能用不上\n❌ 只看价格选了最便宜的，结果体验差没人用\n❌ 没考虑集成，结果变成了信息孤岛\n❌ 只IT参与选型，业务部门和使用者没参与\n\n💡最好的平台不是功能最多的，而是"员工愿意用"的。完课率是检验平台的唯一标准。', tags: ['在线学习', '平台选型', 'LMS'] },
      { id: 't22', cat: '数字化学习', title: '微课设计：5分钟讲透一个知识点', desc: '微课=5-10分钟，只讲一个知识点。结构：痛点引入→核心内容→案例/演示→小结/行动。短小精悍、即学即用。', detail: '微课是数字化学习时代最重要的内容形态——员工的注意力越来越短，没人有耐心看1小时的课程视频了。\n\n【微课的四个特征】\n①短：5-10分钟（不超过15分钟）\n②精：只讲一个知识点或一个技能\n③用：学完马上能用\n④活：随时随地可学（手机/碎片时间）\n\n【微课的五步结构】\n\n第一步：痛点引入（30秒-1分钟）\n• 用一个场景/问题/数据抓住注意力\n• "你是不是经常遇到这种情况……"\n• 让学员觉得"这跟我有关"\n\n第二步：核心内容（3-5分钟）\n• 只讲一个知识点，不要贪多\n• 用框架/口诀/模型帮助记忆\n• 一图胜千言——多用手绘图/流程图\n\n第三步：案例/演示（1-2分钟）\n• 用真实案例说明怎么用\n• 如果是操作类，做屏幕录制演示\n• 案例越贴近工作场景越好\n\n第四步：小结（30秒）\n• 一句话总结今天讲的核心\n• "记住这三点就够了：……"\n\n第五步：行动/互动（30秒）\n• "现在试试用这个方法处理你手头的XX任务"\n• 或者出一道小测试题\n\n【微课制作的三个层次】\n\n初级：PPT录屏+配音\n• 成本最低，1天可以做一个\n• 工具：PPT自带录屏、OBS\n• 适合：知识类内容\n\n中级：真人出镜+后期\n• 效果好但成本中等\n• 工具：手机+剪映\n• 适合：技能演示、理念传达\n\n高级：AI生成+动画\n• 成本较高但可以批量\n• 工具：HeyGen/Synthesia（AI数字人）+动画软件\n• 适合：需要统一品质的标准化内容\n\n【微课质量自检清单】\n□ 时长在5-15分钟内？\n□ 只讲了一个核心知识点？\n□ 有真实案例或演示？\n□ 手机上看体验好？\n□ 有行动号召或测试？\n\n💡做100个5分钟的微课，比做1个500分钟的大课有价值得多——员工真的会看完。', tags: ['微课', '内容设计', '数字化学习'] },
      { id: 't23', cat: '数字化学习', title: '学习社群运营：让学习不再是一个人的事', desc: '社群让完课率从30%提升到80%。关键要素：仪式感、同伴压力、输出驱动、及时反馈。', detail: '在线学习最大的敌人是"孤独感"——一个人看视频很容易放弃。学习社群就是解决这个问题的。\n\n【为什么社群能提升学习效果？】\n• 单独学习完课率：20-30%\n• 有社群的学习完课率：60-80%\n• 社群的核心价值：同伴压力+互相激励+知识碰撞\n\n【学习社群运营的四个要素】\n\n要素1：仪式感\n• 开营仪式：自我介绍+学习承诺+小组PK\n• 每日打卡：固定格式+固定时间\n• 结营仪式：成果展示+颁奖+复盘\n→ 仪式感让学习"有头有尾"，增加心理投入\n\n要素2：同伴压力（正向）\n• 小组积分制：个人不打卡影响小组\n• 排行榜：每日更新学习进度\n• 打卡接龙：看到别人都在学，自己也不好意思不学\n→ 关键是"适度压力"，不要变成焦虑\n\n要素3：输出驱动\n• 每天不只是"看视频"，还要"输出"\n• 输出形式：读书笔记、案例分析、心得分享\n• "教是最好的学"——输出倒逼输入\n• 每周选优秀输出展示\n\n要素4：及时反馈\n• 班主任/助教每天回复学员问题\n• 每周1次线上答疑/直播\n• 讲师参与社群互动（每周至少1次）\n• 让学员感觉到"有人在关注我"\n\n【社群运营的节奏设计】\n\n第一周：破冰期\n• 重点：建立关系、明确规则\n• 动作：开营仪式+自我介绍+分组+学习指南\n\n第二周-第三周：高潮期\n• 重点：保持节奏、深度参与\n• 动作：每日打卡+案例讨论+每周直播\n\n第四周：收尾期\n• 重点：成果固化、经验沉淀\n• 动作：结业作业+结营仪式+优秀表彰\n\n【社群运营人员配置】\n• 班主任1名：日常运营、提醒、答疑\n• 助教1-2名：批改作业、组织讨论\n• 讲师：每周1次直播+社群互动\n• 组长（学员担任）：小组日常管理\n\n💡社群运营的核心是"让人觉得不孤单"——当看到50个人都在学习打卡时，放弃的成本就变高了。', tags: ['学习社群', '运营', '完课率'] },
      { id: 't24', cat: '数字化学习', title: '知识管理：让组织经验不再随人流失', desc: '知识管理=把个人经验变成组织资产。SECI模型：社会化→外化→组合→内化。关键是从"人走知识走"到"人走知识留"。', detail: '员工离职带走的不只是工牌，还有多年积累的经验和知识。知识管理就是解决这个问题。\n\n【知识管理的痛点】\n• 老员工离职→经验跟着走了\n• 新员工入职→踩过的坑重新踩一遍\n• 同样的问题→不同的人反复问\n• 好的做法→只在小范围流传\n\n【SECI知识转化模型】\n\nS - Socialization（社会化：隐性→隐性）\n• 徒弟跟师傅学，通过观察和模仿获得"手感"\n• 形式：师徒制、轮岗、实地观摩\n• 挑战：难以加速，依赖长时间接触\n\nE - Externalization（外化：隐性→显性）\n• 把"说不清的直觉"变成"能写出来的方法"\n• 形式：案例提取、经验复盘、SOP编写\n• 挑战：需要引导和结构化工具\n\nC - Combination（组合：显性→显性）\n• 把分散的知识整合成体系\n• 形式：知识库、课程开发、手册编写\n• 挑战：需要有人维护和更新\n\nI - Internalization（内化：显性→隐性）\n• 把"知识库里的文档"变成"个人的能力"\n• 形式：培训、实践、模拟\n• 挑战：需要反复练习\n\n【企业知识管理实操】\n\n第一步：识别关键知识\n• 哪些岗位的知识流失影响最大？\n• 哪些经验是"只可意会"的隐性知识？\n• 哪些错误是反复发生的？\n\n第二步：提取和沉淀\n• 经验复盘：项目结束后做"复盘工作坊"\n• 案例库：收集成功/失败案例，结构化整理\n• 师徒制：通过"带教"传递隐性知识\n• 知识图谱：用工具建立知识关联（如Notion/飞书）\n\n第三步：分享和传播\n• 知识分享会：每周1次，15分钟分享一个知识点\n• 内部wiki：可搜索的知识库\n• 微课：把经验录成5分钟视频\n\n第四步：更新和维护\n• 知识有"保鲜期"，需要定期更新\n• 设立"知识管理员"角色\n• 鼓励UGC（员工贡献内容），给予积分激励\n\n💡知识管理最大的敌人不是"没有工具"，而是"没有人愿意分享"。建立分享文化比建系统更重要。', tags: ['知识管理', 'SECI', '组织经验'] },
      // ===== 内训师培养 =====
      { id: 't25', cat: '内训师培养', title: '内训师选拔：不是"业务好"就等于"能讲课"', desc: '内训师选拔看三方面：专业能力（有料）、表达能力（能讲）、分享意愿（肯讲）。三者缺一不可。', detail: '很多企业选内训师的标准是"谁业务好就让谁讲"，结果发现：业务好的人不一定能讲好，能讲好的人不一定愿意讲。\n\n【内训师的三个必备条件】\n\n条件1：专业能力（有料）\n• 在某个领域有3年以上实战经验\n• 有成功案例和失败教训\n• 不是"理论派"，而是"实战派"\n• 检验方法：看过去的业绩和项目经历\n\n条件2：表达能力（能讲）\n• 能把复杂的东西讲简单\n• 逻辑清晰、语言流畅\n• 有一定的感染力和互动能力\n• 检验方法：让候选人做5分钟试讲\n\n条件3：分享意愿（肯讲）\n• 愿意花时间准备课程\n• 不觉得"教徒弟饿死师傅"\n• 有成就感和使命感\n• 检验方法：直接问+观察日常分享行为\n\n【选拔流程】\n\n第一步：提名\n• 部门负责人提名+自荐\n• 设定基本门槛（工龄、绩效等级）\n\n第二步：试讲评估\n• 准备10分钟试讲（自选主题）\n• 评委：培训部+业务负责人+资深讲师\n• 评估维度：内容逻辑、表达力、互动力、PPT质量\n\n第三步：意愿确认\n• 和候选人1对1谈话\n• 说明内训师的投入和回报\n• 确认时间 commitment（每月至少8小时）\n\n第四步：公示聘任\n• 全员公布内训师名单\n• 举行聘任仪式（增加荣誉感）\n• 颁发聘书/徽章\n\n【内训师的激励体系】\n• 物质激励：课酬（100-500元/小时，按级别）\n• 荣誉激励：年度优秀内训师评选、颁奖\n• 发展激励：优先参加外部培训、晋升加分\n• 时间激励：给予一定的备课时间（不算加班）\n\n【常见误区】\n❌ 强制当内训师→没意愿的人讲不好\n❌ 只选管理层→管理者不一定是最擅长实操的人\n❌ 没有激励体系→"用爱发电"不可持续\n❌ 选了不培养→业务好不代表会讲课\n\n💡最好的内训师往往不是职级最高的人，而是在一线"踩过坑"的中层骨干——他们的经验最接地气。', tags: ['内训师', '选拔', 'TTT'] },
      { id: 't26', cat: '内训师培养', title: '课程开发：从"经验"到"课程"的四步法', desc: '经验提取→结构设计→内容开发→试讲优化。最关键是第一步——把"说不清的经验"变成"能教的方法"。', detail: '内训师最头疼的不是"讲"，而是"开发课程"。脑子里有很多经验，但不知道怎么变成一门课。\n\n【课程开发四步法】\n\n第一步：经验提取（最难的一步）\n\n问题：经验是"隐性"的，你自己做的时候很自然，但说不出来为什么这么做。\n\n方法1：任务分解法\n• 把你的工作分解成10-20个具体任务\n• 每个任务列出：做什么、怎么做、常见错误\n• 举例：销售岗位→ prospecting→ 需求挖掘→ 方案呈现→ 异议处理→ 成交\n\n方法2：关键事件法\n• 回忆3-5个成功案例和失败案例\n• 分析：当时做了什么？为什么这么做？关键转折点是什么？\n• 从案例中提取"可复制的方法论"\n\n方法3：专家访谈法\n• 找同事采访你，问"为什么"\n• 别人提问会帮你发现自己都没意识到的经验\n\n第二步：结构设计\n\n把提取的内容组织成逻辑结构：\n• 模块1：概述（这是什么？为什么重要？）\n• 模块2：方法论（怎么做？核心步骤/框架）\n• 模块3：案例演示（真实案例说明）\n• 模块4：练习（让学员试一试）\n• 模块5：小结和行动（记住什么？做什么？）\n\n第三步：内容开发\n\n• PPT：每页一个观点，多图表少文字\n• 讲师手册：每页PPT配讲解词、时间、互动提示\n• 学员手册：核心知识点+练习+案例材料\n• 测试题：5-10道题检验学习效果\n\n第四步：试讲优化\n\n• 找5-10人试讲（30分钟版本）\n• 收集反馈：哪里听不懂？哪里太啰嗦？哪里最有用？\n• 根据反馈修改内容和设计\n• 试讲至少2轮再正式上线\n\n【好课程的三个标准】\n1.有用：学完能在工作中用上\n2.好懂：复杂的概念用简单的语言讲清楚\n3.有趣：不是枯燥的讲授，有案例有互动\n\n💡课程开发的黄金法则：一门课只解决一个问题。不要试图在2小时内教20个知识点——学员一个也记不住。', tags: ['课程开发', '内训师', '经验提取'] },
      { id: 't27', cat: '内训师培养', title: 'TTT培训：让内训师从"会做"到"会教"', desc: 'TTT=Train the Trainer。核心内容：成人学习理论、课程设计、讲授技巧、互动设计、控场能力。', detail: 'TTT（Train the Trainer）是企业内训师必修的"教学能力"培训——你业务再好，如果不懂"怎么教"，也传递不出去。\n\n【TTT的五大核心模块】\n\n模块1：成人学习理论\n• 成人学习的特点：\n  - 目的导向（学了这个有什么用？）\n  - 经验驱动（需要和自己过去的经验关联）\n  - 自主学习（不喜欢被"教"，喜欢被"引导"）\n  - 时间敏感（碎片化、注意力短）\n• 启示：少讲授多互动，多案例少理论\n\n模块2：课程设计能力\n• ADDIE模型的应用（需求分析→设计→开发→实施→评估）\n• 一节课的结构：引入（10%）→核心（60%）→练习（20%）→总结（10%）\n• 每15分钟一个互动节点\n\n模块3：讲授技巧\n• 开场：30秒抓住注意力（问题/故事/数据）\n• 讲解：一观点+一案例+一总结\n• 过渡：自然衔接，不生硬\n• 结尾：金句总结+行动号召\n• 声音：语速适中（180-220字/分钟）、重点放慢\n• 肢体：眼神交流、手势配合、走动\n\n模块4：互动设计\n• 提问技巧：开放式>封闭式\n• 小组讨论：每组4-6人，讨论5-10分钟\n• 角色扮演：给脚本+给角色+给时间\n• 案例分析：真实>虚构\n• 投票/调查：快速了解全班观点\n\n模块5：控场能力\n• 时间管理：每个模块设定时间，超时果断收\n• 冷场处理：准备2-3个"救场"互动\n• 挑战者处理：先肯定→再引导→私下沟通\n• 技术故障：准备Plan B（打印材料）\n\n【TTT培训的设计】\n• 时长：2-3天集中培训+4周在岗实践\n• 形式：讲授30%+练习50%+反馈20%\n• 产出：每人开发一门10分钟微课并试讲\n• 评估：试讲评分（内容+表达+互动+控场）\n\n【TTT之后的关键】\n• 持续辅导：第一次正式讲课后安排观察+反馈\n• 讲师社群：定期交流经验、互相听课\n• 晋升体系：初级→中级→高级→金牌讲师\n• 课酬差异：不同级别课酬不同，激励提升\n\n💡TTT不是"上完课就行"，而是"持续练习+反馈+辅导"的过程。最好的提升方式是：多讲、多录、多复盘。', tags: ['TTT', '内训师', '授课技巧'] },
      { id: 't28', cat: '内训师培养', title: '内训师激励体系：让分享可持续', desc: '内训师激励=物质+荣誉+发展+时间。没有激励的"用爱发电"不可持续。课酬、荣誉、晋升、减负四管齐下。', detail: '内训师培养最大的挑战不是"培养"，而是"留不住"——辛辛苦苦培养了半年，结果人家太忙不讲了。\n\n【为什么内训师会"流失"？】\n• 排课占用工作时间，影响本职绩效\n• 备课投入大（1小时课要备4-6小时），没有补偿\n• 讲完没人反馈，不知道讲得好不好\n• 没有荣誉感，觉得"白讲"\n• 升职加薪和内训师贡献无关\n\n【四维激励体系】\n\n维度1：物质激励（基础保障）\n• 课酬体系：\n  - 初级讲师：100-200元/小时\n  - 中级讲师：200-400元/小时\n  - 高级讲师：400-800元/小时\n  - 金牌讲师：800-1500元/小时\n• 课程开发费：开发一门新课奖励2000-5000元\n• 年度奖金：根据授课时数和评分发年终奖\n\n维度2：荣誉激励（精神动力）\n• 聘任仪式：正式颁发聘书/徽章\n• 年度评选：优秀讲师、最佳课程、最受欢迎讲师\n• 颁奖典礼：全员大会颁奖，高管出席\n• 宣传报道：内刊/公众号专访\n\n维度3：发展激励（长期留人）\n• 晋升加分：内训师贡献纳入晋升评估\n• 外部培训：优先参加行业大会/外部课程\n• 职业通道：内训师→培训经理→人才发展专家\n• 高管可见度：优秀内训师有机会给高管做分享\n\n维度4：时间激励（实际减负）\n• 备课时间：每月给予8-16小时备课时间（不算加班）\n• 工作调整：授课任务重的内训师适当减少其他工作\n• 管理者支持：将"培养内训师"纳入管理者的考核\n\n【激励体系设计的注意事项】\n\n1.物质和精神结合\n• 只有物质→讲完拿钱走人，没有归属感\n• 只有荣誉→"用爱发电"撑不过3个月\n• 两者结合才可持续\n\n2.差异化激励\n• 不同级别的内训师需求不同\n• 年轻人更看重发展机会和曝光\n• 资深员工更看重荣誉和认可\n\n3.及时性\n• 课酬当月发放，不要拖到年底\n• 反馈课后1周内给\n• 认可及时公开\n\n4.公平透明\n• 课酬标准公开\n• 评分标准公开\n• 晋级标准公开\n\n💡内训师激励的核心逻辑：让"分享知识"比"只做业务"更有获得感和成就感。', tags: ['内训师', '激励体系', '可持续'] },
      { id: 't29', cat: '内训师培养', title: '经验萃取：把"高手的手感"变成"可教的方法"', desc: '经验萃取=把隐性经验变成显性方法。四步法：选场景→讲故事→提炼方法→验证检验。让"只可意会"变成"可复制"。', detail: '高手做事有一种"手感"——他自己做得很好，但说不清楚为什么这么做。经验萃取就是把这个"手感"提取出来。\n\n【什么是经验萃取？】\n• 不是"写SOP"（SOP只写了"做什么"，没写"为什么"）\n• 不是"录视频"（看视频学不到背后的思考逻辑）\n• 是"把高手脑中的决策逻辑提取出来，变成别人也能学会的方法"\n\n【经验萃取四步法】\n\n第一步：选场景\n• 选一个具体的、可复用的工作场景\n• 好场景的标准：高频+重要+有难度\n• 举例：\n  ✅ "如何处理客户的价格异议"（高频重要有难度）\n  ❌ "如何接电话"（太简单，不需要萃取）\n\n第二步：讲故事（关键事件法）\n• 让高手回忆一个最近的真实案例\n• 引导性问题：\n  - 当时的情况是什么？\n  - 你做了什么？为什么这么做？\n  - 对方的反应是什么？\n  - 结果怎样？\n  - 如果重来一次你会怎么做？\n• 关键：追问"为什么"，直到挖出底层逻辑\n\n第三步：提炼方法\n• 从案例中提取"可复用的模式"\n• 工具1：流程化（第一步做什么→第二步做什么）\n• 工具2：框架化（如"三看一问"口诀）\n• 工具3：清单化（检查清单/判断标准）\n• 举例：\n  原始经验："客户说太贵了，我会先认同再解释价值"\n  萃取后："价格异议处理三步法：\n  ①共情回应（'理解您的顾虑'）\n  ②价值锚定（对比竞品/量化收益）\n  ③替代方案（提供分期/减配选项）"\n\n第四步：验证检验\n• 让另一个非高手用提取的方法试一遍\n• 看效果是否有明显提升\n• 根据反馈调整方法\n• 如果别人用了也有效，说明萃取成功\n\n【经验萃取的常见陷阱】\n❌ 高手说的太抽象（"看感觉"）→用案例追问具体行为\n❌ 萃取的东西太复杂（30步流程）→简化到3-5步\n❌ 只萃取了"做什么"没萃取"为什么"→每个动作都要有原因\n❌ 萃取完不验证→可能只是"个人偏好"而非"通用方法"\n\n【经验萃取的产出形式】\n• 方法论卡片（1页纸）\n• 微课视频（5分钟）\n• 案例库条目\n• 检查清单\n• 角色扮演脚本\n\n💡经验萃取最核心的能力是"追问为什么"——连续问5个为什么，你就能挖到高手自己都没意识到的经验。', tags: ['经验萃取', '知识提取', '方法论'] },
    ];

    // 智能轮换：每日推荐1条，不重复
    const result = Store.getDailyKnowledge('training', trainingDB, 1);
    let currentItem = result.items[0] || trainingDB[0];

    const section = document.createElement('div');
    section.className = 'section-title';
    section.style.marginTop = '4px';
    section.style.display = 'flex';
    section.style.alignItems = 'center';
    section.style.justifyContent = 'space-between';
    section.innerHTML = `
      <span>📚 今日培训推荐 <span style="font-size:11px;font-weight:400;color:var(--text-muted);">点击卡片展开全文</span></span>
      <button class="btn btn-sm" id="fetchTrainingBtn" style="background:var(--primary);color:#fff;border:none;font-size:11px;padding:4px 10px;">📡 采集</button>
    `;
    container.appendChild(section);

    // 获取 RSS 抓取的文章，如果有则优先使用
    const rssItems = Store.get('trainingRSSItems') || [];
    const useRSS = rssItems.length > 0;
    
    // 如果用 RSS 数据，转换为统一格式
    const displayDB = useRSS ? rssItems.map((item, idx) => ({
      id: item.id || ('rss_' + idx),
      cat: item.tags && item.tags[0] ? item.tags[0] : 'RSS推荐',
      title: item.title,
      desc: item.desc,
      detail: item.detail || item.desc,
      tags: item.tags || ['RSS'],
      link: item.link
    })) : trainingDB;

    // 智能轮换：每日推荐1条，不重复
    const result = useRSS 
      ? { items: [displayDB[0]], cycle: 1 } 
      : Store.getDailyKnowledge('training', trainingDB, 1);
    let currentItem = result.items[0] || trainingDB[0];

    // ===== 大卡片容器 =====
    const cardWrap = document.createElement('div');
    cardWrap.style.marginBottom = '16px';
    container.appendChild(cardWrap);

    // 渲染单条知识卡片
    const renderCard = (item) => {
      const isFav = Store.isTrainingFavorite(item.id);
      cardWrap.innerHTML = '';
      const card = document.createElement('div');
      card.className = 'finance-knowledge-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="fk-header">
          <span class="fk-day">📖 ${this.escape(item.cat || '培训知识')}</span>
          <span class="fk-source">点击展开/收起全文</span>
        </div>
        <div class="fk-title">${this.escape(item.title)}</div>
        <div class="fk-desc fk-desc-collapsed">${this.escape(item.desc)}</div>
        <div class="fk-detail" style="display:none;white-space:pre-line;font-size:13px;line-height:1.8;color:var(--text-sub);margin-top:10px;padding-top:10px;border-top:1px dashed rgba(245,166,35,0.2);">${this.escape(item.detail || item.desc)}</div>
        <div class="fk-tags">
          ${item.tags.map(t => `<span class="fk-tag">${this.escape(t)}</span>`).join('')}
        </div>
      `;

      // 点击卡片展开/收起
      let expanded = false;
      card.onclick = (e) => {
        if (e.target.closest('.fk-action-btn')) return;
        expanded = !expanded;
        const desc = card.querySelector('.fk-desc');
        const detail = card.querySelector('.fk-detail');
        const source = card.querySelector('.fk-source');
        if (expanded) {
          desc.style.display = 'none';
          detail.style.display = 'block';
          source.textContent = '点击收起 ↑';
        } else {
          desc.style.display = 'block';
          detail.style.display = 'none';
          source.textContent = '点击展开/收起全文';
        }
      };

      // 按钮区域
      const btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;gap:8px;margin-top:12px;padding-top:10px;border-top:1px dashed rgba(245,166,35,0.2);';

      // 换一条看看
      const skipBtn = document.createElement('button');
      skipBtn.className = 'fk-action-btn';
      skipBtn.style.cssText = 'flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-soft);color:var(--text-sub);font-size:13px;font-weight:500;cursor:pointer;';
      skipBtn.textContent = '🔄 换一条看看';
      skipBtn.onclick = (e) => {
        e.stopPropagation();
        let newItem;
        if (useRSS && displayDB.length > 1) {
          // RSS 模式：从 displayDB 中随机换一条
          const others = displayDB.filter(d => d.id !== item.id);
          newItem = others[Math.floor(Math.random() * others.length)];
        } else {
          // 本地模式：智能轮换
          newItem = Store.skipTrainingKnowledge(item.id, trainingDB);
        }
        currentItem = newItem;
        renderCard(newItem);
      };

      // 收藏这条
      const favBtn = document.createElement('button');
      favBtn.className = 'fk-action-btn';
      favBtn.style.cssText = `flex:1;padding:8px 12px;border:none;border-radius:8px;background:${isFav ? 'var(--bg-soft)' : 'var(--primary)'};color:${isFav ? 'var(--text-muted)' : '#fff'};font-size:13px;font-weight:500;cursor:${isFav ? 'default' : 'pointer'};`;
      favBtn.textContent = isFav ? '⭐ 已收藏' : '⭐ 收藏这条';
      if (!isFav) {
        favBtn.onclick = (e) => {
          e.stopPropagation();
          const added = Store.addTrainingFavorite(item);
          if (added) {
            UI.toast('已收藏 ⭐');
            renderCard(item);
            renderFavorites();
          } else {
            UI.toast('已经收藏过了');
          }
        };
      }

      btnRow.appendChild(skipBtn);
      btnRow.appendChild(favBtn);
      card.appendChild(btnRow);

      cardWrap.appendChild(card);
    };

    renderCard(currentItem);

    // ===== 我的培训收藏 =====
    const favSection = document.createElement('div');
    favSection.style.cssText = 'margin-top:20px;';
    container.appendChild(favSection);

    const renderFavorites = () => {
      favSection.innerHTML = '';
      const favTitle = document.createElement('div');
      favTitle.className = 'section-title';
      favTitle.innerHTML = `⭐ 我的培训收藏 <span style="font-size:11px;font-weight:400;color:var(--text-muted);">${Store.getTrainingFavorites().length > 0 ? `(${Store.getTrainingFavorites().length})` : ''}</span>`;
      favSection.appendChild(favTitle);

      const favorites = Store.getTrainingFavorites();
      if (favorites.length === 0) {
        const empty = document.createElement('div');
        empty.style.cssText = 'text-align:center;padding:20px;color:var(--text-muted);font-size:13px;background:var(--bg-soft);border-radius:12px;';
        empty.textContent = '还没有收藏，看到喜欢的内容点 ⭐ 收藏';
        favSection.appendChild(empty);
        return;
      }

      const favList = document.createElement('div');
      favList.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
      favorites.forEach(fav => {
        const favCard = document.createElement('div');
        favCard.style.cssText = 'background:var(--bg-soft);border-radius:10px;padding:12px;';
        favCard.innerHTML = `
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:600;margin-bottom:4px;">${this.escape(fav.title)}</div>
              <div style="display:flex;gap:4px;flex-wrap:wrap;">
                ${fav.tags.map(t => `<span class="fk-tag">${this.escape(t)}</span>`).join('')}
              </div>
            </div>
            <button class="tk-del-btn" data-favid="${fav.id}" style="flex-shrink:0;width:28px;height:28px;border:none;border-radius:50%;background:rgba(255,71,87,0.1);color:#ff4757;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
          </div>
        `;
        favCard.querySelector('.tk-del-btn').onclick = () => {
          Store.removeTrainingFavorite(fav.id);
          renderFavorites();
          renderCard(currentItem);
        };
        favList.appendChild(favCard);
      });
      favSection.appendChild(favList);
    };

    renderFavorites();

    // 绑定采集按钮
    setTimeout(() => {
      const btn = document.getElementById('fetchTrainingBtn');
      if (btn) {
        btn.onclick = async () => {
          btn.textContent = '采集中...';
          btn.disabled = true;
          await TrainingFetcher.fetch();
          this.render('training');
        };
      }
    }, 0);
  },

  // ===== 财经 =====
  renderFinance(container) {
    const news = Store.get('financeNews');
    const recommendations = Store.get('financeRecommendations');
    const lastFetch = Store.get('financeLastFetch');

    // ===== 理财知识学习（每日推荐） =====
    this.renderFinanceKnowledge(container);

    // 采集说明卡片
    const info = document.createElement('div');
    info.className = 'card';
    info.style.background = 'linear-gradient(135deg, #f5a623, #ff8a3d)';
    info.style.color = '#fff';
    info.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:20px;">📈</span>
        <div style="font-size:15px;font-weight:600;">每日9点自动采集</div>
      </div>
      <div style="font-size:12px;opacity:0.9;">自动采集各平台最新财经新闻，整理推荐股票/基金关注板块</div>
      ${lastFetch ? `<div style="font-size:11px;opacity:0.8;margin-top:8px;">上次采集：${lastFetch}</div>` : '<div style="font-size:11px;opacity:0.8;margin-top:8px;">尚未采集</div>'}
      <button class="btn" style="background:rgba(255,255,255,0.3);color:#fff;margin-top:12px;" id="fetchFinanceBtn">
        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
        立即采集
      </button>
    `;
    container.appendChild(info);

    // 推荐板块卡片
    if (recommendations && recommendations.length > 0) {
      const recTitle = document.createElement('div');
      recTitle.className = 'section-title';
      recTitle.textContent = '值得关注板块';
      container.appendChild(recTitle);

      const recGrid = document.createElement('div');
      recGrid.className = 'finance-rec-grid';
      recommendations.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'finance-rec-card';
        const typeColor = rec.type === '股票' ? '#ff6b6b' : (rec.type === '基金' ? '#4dabf7' : '#7bc67e');
        card.innerHTML = `
          <div class="finance-rec-header">
            <span class="finance-rec-type" style="background:${typeColor}20;color:${typeColor};">${this.escape(rec.type)}</span>
            <span class="finance-rec-trend ${rec.trend === '↑' ? 'up' : 'down'}">${rec.trend || ''}</span>
          </div>
          <div class="finance-rec-name">${this.escape(rec.name)}</div>
          <div class="finance-rec-reason">${this.escape(rec.reason || '')}</div>
          ${rec.tags && rec.tags.length ? `<div class="finance-rec-tags">${rec.tags.map(t => `<span class="finance-tag">${this.escape(t)}</span>`).join('')}</div>` : ''}
        `;
        recGrid.appendChild(card);
      });
      container.appendChild(recGrid);
    }

    // 财经新闻列表
    const newsTitle = document.createElement('div');
    newsTitle.className = 'section-title';
    newsTitle.textContent = `财经资讯（${news.length}条）`;
    container.appendChild(newsTitle);

    if (news.length === 0) {
      container.appendChild(this.emptyState('', '暂无内容，点击上方"立即采集"获取财经资讯'));
    } else {
      const list = document.createElement('div');
      news.forEach(item => {
        const el = document.createElement('div');
        el.className = 'finance-news-item';
        el.style.cursor = 'pointer';
        el.innerHTML = `
          <div class="finance-news-source-row">
            <span class="finance-news-source">${this.escape(item.source)}</span>
            ${item.hot ? '<span class="finance-hot-badge">热</span>' : ''}
          </div>
          <div class="finance-news-title">${this.escape(item.title)}</div>
          <div class="finance-news-summary">${this.escape(item.summary || '')}</div>
          <div class="finance-news-meta">
            <span>${this.escape(item.fetchDate || '')}</span>
            <span style="color:var(--primary-dark);">点击查看详情 →</span>
          </div>
        `;
        el.onclick = () => UI.openFinanceNewsDetailModal(item);
        list.appendChild(el);
      });
      container.appendChild(list);
    }

    // 采集按钮事件
    setTimeout(() => {
      const btn = document.getElementById('fetchFinanceBtn');
      if (btn) {
        btn.onclick = async () => {
          btn.textContent = '采集中...';
          btn.disabled = true;
          await FinanceFetcher.fetch();
          this.render('finance');
        };
      }
    }, 0);
  },

  // ===== 6. 穿搭 =====
  renderOutfit(container) {
    const outfits = Store.get('outfits');

    const s = document.createElement('div');
    s.className = 'section-title';
    s.textContent = `我的穿搭灵感（${outfits.length}套）`;
    container.appendChild(s);

    if (outfits.length === 0) {
      container.appendChild(this.emptyState('', '还没有穿搭灵感，点击下方添加'));
    } else {
      const grid = document.createElement('div');
      grid.className = 'outfit-grid';
      outfits.forEach(outfit => {
        const card = document.createElement('div');
        card.className = 'outfit-card';
        card.dataset.id = outfit.id;
        const firstImg = outfit.images && outfit.images[0] ? outfit.images[0] : '';
        card.innerHTML = `
          <div class="outfit-img-wrap" data-id="${outfit.id}">
            ${firstImg ? `<img class="outfit-img" src="${firstImg}" alt="">` : '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:32px;">👗</div>'}
            ${outfit.images && outfit.images.length > 1 ? `<div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.5);color:#fff;font-size:10px;padding:2px 6px;border-radius:8px;">+${outfit.images.length}</div>` : ''}
          </div>
          <div class="outfit-info">
            <div class="outfit-theme">${this.escape(outfit.theme || '未命名')}</div>
            <div class="outfit-tags">
              ${outfit.season ? `<span class="season-tag season-${outfit.season}">${outfit.season}季</span>` : ''}
              ${outfit.platform ? `<span class="tag">${this.escape(outfit.platform)}</span>` : ''}
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
      container.appendChild(grid);

      grid.onclick = (e) => {
        const card = e.target.closest('.outfit-card');
        if (!card) return;
        const id = card.dataset.id;
        const outfit = Store.get('outfits').find(o => o.id === id);
        if (outfit) UI.openOutfitDetailModal(outfit);
      };
    }

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.style.marginTop = '12px';
    addBtn.innerHTML = '+ 添加穿搭灵感';
    addBtn.onclick = () => UI.openOutfitModal();
    container.appendChild(addBtn);
  },

  // ===== 7. 日记本（重新设计） =====
  renderDiary(container) {
    this.renderDiaryModule(container);
  },

  // ===== 8. 备忘录 =====
  renderMemo(container) {
    this.renderNoteModule(container, 'memos', 'memo');
  },

  // 日记本专属渲染
  renderDiaryModule(container) {
    const notes = Store.get('diaries');

    // 分类筛选
    const categories = ['全部'];
    const moods = [...new Set(notes.map(n => n.mood).filter(Boolean))];
    notes.forEach(n => {
      if (n.category && !categories.includes(n.category)) categories.push(n.category);
    });

    const filterBar = document.createElement('div');
    filterBar.className = 'filter-bar';
    let activeFilter = '全部';
    categories.forEach((cat, i) => {
      const chip = document.createElement('button');
      chip.className = 'filter-chip' + (i === 0 ? ' active' : '');
      chip.textContent = cat;
      chip.onclick = () => {
        activeFilter = cat;
        filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderList();
      };
      filterBar.appendChild(chip);
    });
    container.appendChild(filterBar);

    // 统计卡片
    if (notes.length > 0) {
      const statsCard = document.createElement('div');
      statsCard.className = 'diary-stats-card';
      const thisMonth = new Date().getMonth() + 1;
      const thisMonthNotes = notes.filter(n => {
        const m = parseInt(n.date?.split('-')[1]);
        return m === thisMonth;
      });
      const moodCounts = {};
      notes.forEach(n => { if (n.mood) moodCounts[n.mood] = (moodCounts[n.mood] || 0) + 1; });
      const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
      statsCard.innerHTML = `
        <div class="diary-stat-item">
          <div class="diary-stat-num">${notes.length}</div>
          <div class="diary-stat-label">全部日记</div>
        </div>
        <div class="diary-stat-item">
          <div class="diary-stat-num">${thisMonthNotes.length}</div>
          <div class="diary-stat-label">本月记录</div>
        </div>
        <div class="diary-stat-item">
          <div class="diary-stat-num">${topMood ? this.getMoodEmoji(topMood[0]) : '📝'}</div>
          <div class="diary-stat-label">${topMood ? '最多心情' : '开始记录'}</div>
        </div>
      `;
      container.appendChild(statsCard);
    }

    const listWrap = document.createElement('div');
    listWrap.className = 'diary-list';
    container.appendChild(listWrap);

    const renderList = () => {
      listWrap.innerHTML = '';
      const filtered = activeFilter === '全部' ? notes : notes.filter(n => n.category === activeFilter);
      if (filtered.length === 0) {
        listWrap.innerHTML = `<div class="empty"><div class="empty-icon">📔</div><div class="empty-text">还没有日记<br>点击右下角 + 开始记录</div></div>`;
        return;
      }
      filtered.forEach(note => {
        listWrap.appendChild(this.renderDiaryCard(note));
      });
    };
    renderList();

    listWrap.onclick = (e) => {
      const card = e.target.closest('.diary-card');
      if (!card) return;
      const id = card.dataset.id;
      const note = Store.get('diaries').find(n => n.id === id);
      if (note) UI.openDiaryDetailModal(note);
    };

    const fab = document.createElement('button');
    fab.className = 'fab';
    fab.innerHTML = '＋';
    fab.onclick = () => UI.openDiaryModal();
    container.appendChild(fab);
  },

  // 日记卡片
  renderDiaryCard(note) {
    const card = document.createElement('div');
    card.className = 'diary-card';
    card.dataset.id = note.id;

    // 解析日期
    const dateStr = note.date || '';
    const dateParts = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
    let day = '', month = '', weekDay = '', time = '';
    if (dateParts) {
      day = dateParts[3];
      month = dateParts[1] + '/' + dateParts[2];
      const d = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]);
      weekDay = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
      time = dateStr.includes(' ') ? dateStr.split(' ')[1]?.slice(0, 5) : '';
    }

    card.innerHTML = `
      <div class="diary-card-left">
        <div class="diary-card-day">${day}</div>
        <div class="diary-card-month">${month} 周${weekDay}</div>
        ${time ? `<div class="diary-card-time">${this.escape(time)}</div>` : ''}
      </div>
      <div class="diary-card-right">
        <div class="diary-card-header">
          <div class="diary-card-title">${this.escape(note.title)}</div>
          <div class="diary-card-badges">
            ${note.mood ? `<span class="diary-mood-badge" title="${this.escape(note.mood)}">${this.getMoodEmoji(note.mood)}</span>` : ''}
            ${note.weather ? `<span class="diary-weather-badge" title="${this.escape(note.weather)}">${this.getWeatherEmoji(note.weather)}</span>` : ''}
          </div>
        </div>
        <div class="diary-card-preview">${this.escape((note.content || '').slice(0, 80))}</div>
        ${note.category ? `<span class="tag tag-primary" style="margin-top:6px;">${this.escape(note.category)}</span>` : ''}
      </div>
    `;
    return card;
  },

  getMoodEmoji(mood) {
    const map = { '开心': '😊', '快乐': '😄', '兴奋': '🤩', '平静': '😌', '感恩': '🙏', '焦虑': '😰', '难过': '😢', '生气': '😠', '疲惫': '😫', '期待': '🤗' };
    return map[mood] || '📝';
  },

  getWeatherEmoji(weather) {
    const map = { '晴': '☀️', '多云': '⛅', '阴': '☁️', '小雨': '🌧️', '大雨': '⛈️', '雪': '❄️', '风': '💨' };
    return map[weather] || weather;
  },

  renderNoteModule(container, storeKey, viewKey) {
    const notes = Store.get(storeKey);
    const emoji = viewKey === 'diary' ? '' : '';
    const placeholder = viewKey === 'diary' ? '今天发生了什么...' : '记下重要的事情...';

    const categories = ['全部'];
    notes.forEach(n => {
      if (n.category && !categories.includes(n.category)) categories.push(n.category);
    });

    const filterBar = document.createElement('div');
    filterBar.className = 'filter-bar';
    let activeFilter = '全部';
    categories.forEach((cat, i) => {
      const chip = document.createElement('button');
      chip.className = 'filter-chip' + (i === 0 ? ' active' : '');
      chip.textContent = cat;
      chip.onclick = () => {
        activeFilter = cat;
        filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderList();
      };
      filterBar.appendChild(chip);
    });
    container.appendChild(filterBar);

    const listWrap = document.createElement('div');
    container.appendChild(listWrap);

    const renderList = () => {
      listWrap.innerHTML = '';
      const filtered = activeFilter === '全部' ? notes : notes.filter(n => n.category === activeFilter);
      if (filtered.length === 0) {
        listWrap.innerHTML = `<div class="empty"><div class="empty-text">暂无内容，点击右下角 + 添加</div></div>`;
        return;
      }
      filtered.forEach(note => {
        const item = document.createElement('div');
        item.className = 'note-item';
        item.dataset.id = note.id;
        item.innerHTML = `
          <div class="note-title">
            <span>${this.escape(note.title)}</span>
            ${note.category ? `<span class="tag tag-primary">${this.escape(note.category)}</span>` : ''}
          </div>
          <div class="note-preview">${this.escape(note.content || '').slice(0, 100)}</div>
          <div class="note-meta">
            <span>${note.date || ''}</span>
            <span>点击查看 →</span>
          </div>
        `;
        listWrap.appendChild(item);
      });
    };
    renderList();

    listWrap.onclick = (e) => {
      const item = e.target.closest('.note-item');
      if (!item) return;
      const id = item.dataset.id;
      const note = Store.get(storeKey).find(n => n.id === id);
      if (note) UI.openNoteDetailModal(note, storeKey);
    };

    const fab = document.createElement('button');
    fab.className = 'fab';
    fab.innerHTML = '＋';
    fab.onclick = () => UI.openNoteModal(storeKey, placeholder, () => this.render(viewKey));
    container.appendChild(fab);
  },

  // ===== 今日进度卡片 =====
  renderTodayCard(container, module, totalLabel) {
    const tasks = module === 'fitness' ? Store.get('fitnessTasks') : Store.get('englishTasks');
    const done = Store.getDayProgress(module);
    const total = tasks.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const today = new Date();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const dateStr = `${today.getMonth() + 1}月${today.getDate()}日 · 星期${weekdays[today.getDay()]}`;

    const card = document.createElement('div');
    card.className = 'today-card';
    card.innerHTML = `
      <div class="today-date">${dateStr}</div>
      <div class="today-progress-text">今日${totalLabel}进度 ${done}/${total}</div>
      <div class="today-progress-bar"><div class="today-progress-fill" style="width:${pct}%"></div></div>
    `;
    container.appendChild(card);
  },

  // ===== 工具 =====
  emptyState(icon, text) {
    const div = document.createElement('div');
    div.className = 'empty';
    div.innerHTML = `${icon ? `<div class="empty-icon">${icon}</div>` : ''}<div class="empty-text">${text}</div>`;
    return div;
  },

  // ===== 技能提升工厂函数 =====
  renderKnowledgeModule(storeKey, catKey, moduleName) {
    const self = this;
    return function(container) {
      const items = Store.get(storeKey);
      const categories = Store.get(catKey);
      let activeCat = 'all';

      // 分类筛选栏
      const filterBar = document.createElement('div');
      filterBar.className = 'filter-bar';
      filterBar.innerHTML = `<button class="filter-chip active" data-cat="all">全部</button>`;
      categories.forEach(cat => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip';
        chip.dataset.cat = cat;
        chip.textContent = cat;
        filterBar.appendChild(chip);
      });
      const manageBtn = document.createElement('button');
      manageBtn.className = 'filter-chip';
      manageBtn.style.borderStyle = 'dashed';
      manageBtn.textContent = '⚙ 管理分类';
      filterBar.appendChild(manageBtn);
      container.appendChild(filterBar);

      // 周目标进度条
      const goalKeyMap = { copywritingItems: 'copywriting', editingItems: 'editing', posterItems: 'poster' };
      const goalKey = goalKeyMap[storeKey];
      if (goalKey) {
        Store.ensureWeekGoal();
        const goals = Store.get('weeklyGoals');
        const target = goals[goalKey] || 5;
        const ws = Store.get('goalWeekStart');
        const weekNew = Store.getWeekNewCount(storeKey);
        const pct = target > 0 ? Math.min(100, Math.round(weekNew / target * 100)) : 0;

        const goalBar = document.createElement('div');
        goalBar.className = 'weekly-goal-bar';
        goalBar.innerHTML = `
          <span class="weekly-goal-text">🎯 本周目标</span>
          <div class="weekly-goal-track"><div class="weekly-goal-fill" style="width:${pct}%"></div></div>
          <span class="weekly-goal-pct">${weekNew}/${target}</span>
        `;
        goalBar.querySelector('.weekly-goal-text').onclick = () => {
          UI.openGoalModal(goalKey, moduleName, () => self.render(self.current));
        };
        container.appendChild(goalBar);
      }

      // 分类切换
      filterBar.onclick = (e) => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        if (chip === manageBtn) {
          UI.openCategoryManager(`${moduleName}分类`, catKey, () => self.render(self.current));
          return;
        }
        activeCat = chip.dataset.cat || 'all';
        filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c === chip));
        renderList();
      };

      // 内容列表容器
      const listWrap = document.createElement('div');
      listWrap.className = 'knowledge-list';
      container.appendChild(listWrap);

      const renderList = () => {
        listWrap.innerHTML = '';
        const filtered = activeCat === 'all' ? items : items.filter(i => i.category === activeCat);
        if (filtered.length === 0) {
          listWrap.appendChild(self.emptyState('📋', '暂无内容，点击下方添加'));
          return;
        }
        filtered.forEach(item => {
          const card = document.createElement('div');
          card.className = 'knowledge-card';
          card.innerHTML = `
            <div class="knowledge-card-header">
              <span class="knowledge-card-cat">${self.escape(item.category || '未分类')}</span>
              ${item.source ? `<span class="knowledge-card-source">${self.escape(item.source)}</span>` : ''}
            </div>
            <div class="knowledge-card-title">${self.escape(item.title)}</div>
            ${item.desc ? `<div class="knowledge-card-desc">${self.escape(item.desc)}</div>` : ''}
            <div class="knowledge-card-footer">
              <div class="knowledge-card-tags">
                ${(item.tags || []).map(t => `<span class="knowledge-card-tag">${self.escape(t)}</span>`).join('')}
              </div>
              <span class="knowledge-card-date">${self.escape(item.addDate || '')}</span>
            </div>
          `;
          card.onclick = () => UI.openKnowledgeDetailModal(storeKey, item);
          listWrap.appendChild(card);
        });
      };
      renderList();

      // 添加按钮
      const addBtn = document.createElement('button');
      addBtn.className = 'add-btn';
      addBtn.style.marginTop = '12px';
      addBtn.innerHTML = `+ 添加${moduleName}内容`;
      addBtn.onclick = () => UI.openKnowledgeModal(storeKey, catKey);
      container.appendChild(addBtn);
    };
  },

  renderCopywriting: null,  // 在 init 时赋值
  renderEditing: null,
  renderPoster: null,

  // ===== 灵感集 =====
  renderInspiration(container) {
    const items = Store.get('inspirations');
    const categories = Store.get('inspirationCategories');
    let activeCat = 'all';

    // 分类筛选栏
    const filterBar = document.createElement('div');
    filterBar.className = 'filter-bar';
    filterBar.innerHTML = `<button class="filter-chip active" data-cat="all">全部</button>`;
    categories.forEach(cat => {
      const chip = document.createElement('button');
      chip.className = 'filter-chip';
      chip.dataset.cat = cat;
      chip.textContent = cat;
      filterBar.appendChild(chip);
    });
    const manageBtn = document.createElement('button');
    manageBtn.className = 'filter-chip';
    manageBtn.style.borderStyle = 'dashed';
    manageBtn.textContent = '⚙ 管理分类';
    filterBar.appendChild(manageBtn);
    container.appendChild(filterBar);

    filterBar.onclick = (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      if (chip === manageBtn) {
        UI.openCategoryManager('灵感集分类', 'inspirationCategories', () => Views.render('inspiration'));
        return;
      }
      activeCat = chip.dataset.cat || 'all';
      filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c === chip));
      renderList();
    };

    // 灵感列表
    const listWrap = document.createElement('div');
    listWrap.className = 'inspiration-list';
    container.appendChild(listWrap);

    const renderList = () => {
      listWrap.innerHTML = '';
      const filtered = activeCat === 'all' ? items : items.filter(i => i.category === activeCat);
      if (filtered.length === 0) {
        listWrap.appendChild(this.emptyState('💡', '还没有灵感，去收藏第一个吧'));
        return;
      }
      filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'inspiration-card';
        card.innerHTML = `
          <div class="inspiration-card-main">
            ${item.image ? `<div class="inspiration-card-img"><img src="${this.escape(item.image)}" alt="" onerror="this.style.display='none'"></div>` : ''}
            <div class="inspiration-card-body">
              <div class="inspiration-card-title">${this.escape(item.title)}</div>
              ${item.desc ? `<div class="inspiration-card-desc">${this.escape(item.desc)}</div>` : ''}
              <div class="inspiration-card-meta">
                <span class="inspiration-card-cat">${this.escape(item.category || '未分类')}</span>
                ${item.source ? `<span class="inspiration-card-source">来源：${this.escape(item.source)}</span>` : ''}
                <span class="inspiration-card-date">${this.escape(item.addDate || '')}</span>
              </div>
            </div>
          </div>
        `;
        card.onclick = () => UI.openInspirationDetailModal(item);
        listWrap.appendChild(card);
      });
    };
    renderList();

    // 添加按钮
    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.style.marginTop = '12px';
    addBtn.innerHTML = '+ 收藏灵感';
    addBtn.onclick = () => UI.openInspirationModal();
    container.appendChild(addBtn);
  },

  // ===== 知识库 =====
  renderKnowledgeBase(container) {
    const addedIds = Store.get('addedKnowledgeIds') || [];

    const knowledgeDB = [
      // ===== 文案写作 =====
      { id: 'kw1', cat: '文案写作', title: '爆款标题的4个公式', desc: '①数字法"5个让你..." ②悬念法"为什么..." ③对比法"从月薪3千到3万" ④痛点法"你还在..."，掌握这4个公式，标题点击率翻倍。', tags: ['标题', '公式', '入门'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw2', cat: '文案写作', title: 'AIDA写作框架', desc: 'Attention（吸引注意）→ Interest（激发兴趣）→ Desire（唤起欲望）→ Action（促使行动）。从广告到小红书文案，这个百年框架永不过时。', tags: ['写作框架', '经典'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw3', cat: '文案写作', title: '金句收集与创作法', desc: '每天收集3条金句，分类保存。创作时：模仿句式+替换内容=新金句。如"生活不止眼前的苟且"→"成长不止眼前的努力，还有远方的复利"。', tags: ['金句', '创作'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw4', cat: '文案写作', title: '小红书爆款笔记结构', desc: '封面（吸引点击）→ 标题（制造好奇）→ 开头（痛点共鸣）→ 正文（干货分点）→ 结尾（引导互动）。每篇笔记都按这个结构写。', tags: ['小红书', '结构'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw5', cat: '文案写作', title: '讲故事的3幕结构', desc: '第一幕：设定（人物+背景）；第二幕：冲突（遇到的困难）；第三幕：解决（如何克服+收获）。品牌故事、个人介绍、营销文案通用。', tags: ['故事', '结构'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw6', cat: '文案写作', title: '文案修改清单', desc: '写完自查：①能删掉20%吗？②每句话读者能得到什么？③有没有具体数字和案例？④读起来像人话吗？⑤最后一句有没有号召行动？', tags: ['修改', '清单'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw7', cat: '文案写作', title: '文案的"滑梯效应"', desc: '好的文案像滑梯——读者读完第一句就想读第二句，直到读完。开头用短句、用问句、用悬念，让读者停不下来。', tags: ['滑梯效应', '开头'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw8', cat: '文案写作', title: '产品卖点提炼法：FAB法则', desc: 'F(特点)→A(优势)→B(利益)。不要说"这个杯子500ml"，要说"500ml大容量(F)→不用频繁加水(A)→开会2小时不打断思路(B)"。', tags: ['FAB', '卖点'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw9', cat: '文案写作', title: '朋友圈文案的3秒法则', desc: '朋友圈折叠后只显示前3行。前3行=吸引点击的"广告位"。用emoji、问句、反常识开头，让人忍不住点"全文"。', tags: ['朋友圈', '3秒法则'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw58', cat: '文案写作', title: '文案的情绪价值—— 让读者"有感"', desc: '好文案不只在传递信息，更在唤起情绪。方法：①用具体场景（"加班到凌晨的你"）②用感官描写（"咬一口酥到掉渣"）③用身份认同（"每个努力搞钱的女生"）。', tags: ['情绪', '共鸣'], target: 'copywritingItems', targetName: '文案表达' },
      // ===== 视频剪辑 =====
      { id: 'kw10', cat: '视频剪辑', title: '剪映关键帧入门', desc: '关键帧=记录某个时间点的画面状态。设置起始关键帧→移动时间轴→改变画面参数→自动生成动画。缩放、位移、旋转、透明度都能做动画。', tags: ['剪映', '关键帧', '入门'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw11', cat: '视频剪辑', title: '5种常用转场技巧', desc: '①硬切（最常用）②淡入淡出（抒情）③缩放转场（快节奏）④旋转转场（炫酷）⑤遮罩转场（高级）。新手先练硬切和淡入淡出。', tags: ['转场', '技巧'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw12', cat: '视频剪辑', title: '视频调色三板斧', desc: '①亮度/对比度：先调明暗 ②饱和度：控制色彩浓度 ③色温：冷色调=高级感，暖色调=温馨感。新手用剪映"调节"功能就够了。', tags: ['调色', '入门'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw13', cat: '视频剪辑', title: 'BGM选曲黄金法则', desc: '①音量不超过人声的30% ②节奏匹配剪辑节奏 ③高潮卡在视频最精彩处 ④热门BGM自带流量。推荐网站：Epidemic Sound、抖音热门音乐。', tags: ['BGM', '音乐'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw14', cat: '视频剪辑', title: '字幕制作规范', desc: '字体：黑体/思源黑体；大小：屏幕宽度的5%；位置：底部居中偏上；时长：每行2-6字/秒；颜色：白字黑边最清晰。剪映自动识别+手动修正。', tags: ['字幕', '规范'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw15', cat: '视频剪辑', title: '短视频节奏控制', desc: '前3秒决定留存率，必须放最吸引人的画面/问题。每5-10秒一个信息点或画面变化。总时长新手建议30-60秒，熟练后15-30秒。', tags: ['节奏', '短视频'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw16', cat: '视频剪辑', title: '拍摄前必做的3件事', desc: '①清理镜头（指纹毁所有）②锁定曝光/对焦（避免忽明忽暗）③检查收音（外接麦克风>手机自带）。前期做好的1分钟=后期省10分钟。', tags: ['拍摄', '准备'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw17', cat: '视频剪辑', title: '分镜脚本—— 告别拍摄时的"不知道拍什么"', desc: '每个镜头写三要素：画面内容+运镜方式+时长。一个30秒短视频约5-8个镜头。提前写好分镜，拍摄效率提升3倍。', tags: ['分镜', '脚本'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw18', cat: '视频剪辑', title: '手机拍摄稳定技巧', desc: '①双手持机+手肘贴身体 ②走路时膝盖微弯 ③利用栏杆/桌面做支撑 ④后期用剪映"防抖"功能。手机稳定器是性价比最高的投资。', tags: ['拍摄', '稳定'], target: 'editingItems', targetName: '视频剪辑' },
      { id: 'kw59', cat: '视频剪辑', title: '绿幕抠像入门', desc: '①背景用纯色绿布（不要有褶皱）②光线均匀打在绿布上 ③人物离绿布至少1米（减少绿色反光）④剪映"色度抠图"一键抠像。低成本出大片效果。', tags: ['绿幕', '抠像'], target: 'editingItems', targetName: '视频剪辑' },
      // ===== 海报设计 =====
      { id: 'kw19', cat: '海报设计', title: '排版四原则：CRAP', desc: 'Contrast（对比）：重要元素要突出；Repetition（重复）：统一字体/颜色；Alignment（对齐）：元素间有视觉联系；Proximity（亲密性）：相关内容放一起。', tags: ['排版', '设计原则'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw20', cat: '海报设计', title: '配色速成：60-30-10法则', desc: '60%主色（背景/大面积）、30%辅助色（重点区域）、10%强调色（按钮/关键文字）。推荐工具：Coolors.co 一键生成配色方案。', tags: ['配色', '法则'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw21', cat: '海报设计', title: '字体搭配黄金组合', desc: '标题用无衬线粗体（思源黑体/站酷快乐体），正文用衬线或细体（思源宋体）。一张海报不超过2种字体，通过大小/粗细/颜色区分层次。', tags: ['字体', '搭配'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw22', cat: '海报设计', title: '海报尺寸速查表', desc: '小红书：1080×1440(3:4)；朋友圈：1080×1260(6:7)；公众号封面：900×383(2.35:1)；手机海报：1080×1920(9:16)；横版海报：1920×1080(16:9)。', tags: ['尺寸', '规范'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw23', cat: '海报设计', title: '留白的艺术', desc: '留白≠空白，是设计呼吸感的关键。文字与边缘至少留10%边距；元素之间留白>元素本身大小；信息密度每张海报不超过3个重点。', tags: ['留白', '排版'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw24', cat: '海报设计', title: 'Canva快速出图流程', desc: '①搜索模板关键词 ②替换文字和图片 ③调整配色为你的品牌色 ④导出PNG。全程10分钟。适合非设计师快速出图。', tags: ['Canva', '工具'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw25', cat: '海报设计', title: '设计中的"视觉层次"', desc: '让读者3秒内知道先看什么后看什么。方法：①最大=最重要 ②最亮=最重要 ③对比最强=最重要。一张海报只设1个视觉焦点。', tags: ['视觉层次', '设计'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw26', cat: '海报设计', title: '品牌色的力量', desc: '选1个品牌主色，在所有海报中重复使用→形成视觉记忆。如Tiffany蓝、爱马仕橙。你的品牌色是什么？建议选一个，坚持用。', tags: ['品牌', '配色'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw27', cat: '海报设计', title: '一张好海报的5秒测试', desc: '给朋友看5秒后拿走→问他记得什么。如果说不出来，说明信息不聚焦。好海报=5秒内传达1个核心信息。', tags: ['测试', '聚焦'], target: 'posterItems', targetName: '海报制作' },
      { id: 'kw60', cat: '海报设计', title: 'PS/AI常用快捷键速记', desc: 'Ctrl+T(自由变换)、Ctrl+J(复制图层)、Ctrl+Shift+N(新建图层)、Ctrl+E(合并图层)、[ ]调整笔刷大小。记住这10个快捷键，效率翻倍。', tags: ['PS', '快捷键'], target: 'posterItems', targetName: '海报制作' },
      // ===== 英语学习 =====
      { id: 'kw28', cat: '英语学习', title: '影子跟读法（Shadowing）', desc: '播放英语音频→延迟0.5秒跟读→模仿语音语调语速。每天15分钟，一个月口语流利度明显提升。推荐材料：EnglishPod、BBC 6 Minute English。', tags: ['口语', '跟读', '方法'], target: 'english', targetName: '英语' },
      { id: 'kw29', cat: '英语学习', title: '雅思口语Part2万能模板', desc: '开头：I\'d like to talk about...；描述：who/what/when/where；感受：how I felt / why it\'s important；结尾：That\'s pretty much what I wanted to say.', tags: ['雅思', '口语', '模板'], target: 'english', targetName: '英语' },
      { id: 'kw30', cat: '英语学习', title: '单词记忆：间隔复习法', desc: '新词→1小时后复习→1天后→3天后→7天后→30天后。用Anki或自制卡片。每天新词不超过20个，复习旧词比学新词更重要。', tags: ['单词', '记忆法'], target: 'english', targetName: '英语' },
      { id: 'kw31', cat: '英语学习', title: '英语听力提升路线图', desc: '第1月：精听EnglishPod（每天1期，听3遍）；第2-3月：泛听BBC/CNN（每天30分钟）；第4-6月：真题听力（剑桥雅思）。循序渐进，不要跳级。', tags: ['听力', '路线图'], target: 'english', targetName: '英语' },
      { id: 'kw32', cat: '英语学习', title: '英语写作：从模仿到独立', desc: '①精读一篇范文→分析结构→②用中文写提纲→③自己写英文→④对照原文修改→⑤总结好词好句。每周2篇，半年写作脱胎换骨。', tags: ['写作', '方法'], target: 'english', targetName: '英语' },
      { id: 'kw33', cat: '英语学习', title: '看美剧学英语的正确姿势', desc: '不是开着中文字幕刷剧！正确方法：①第一遍纯英文无字幕→②第二遍开英文字幕查生词→③第三遍跟读模仿。推荐《老友记》入门。', tags: ['美剧', '口语'], target: 'english', targetName: '英语' },
      { id: 'kw34', cat: '英语学习', title: '英语思维—— 别再"中译英"了', desc: '说英语时不要先在脑子里想中文再翻译。练习方法：①用英语描述你正在做的事（自言自语）②用英语写日记③看到物品直接想英文名。', tags: ['英语思维', '口语'], target: 'english', targetName: '英语' },
      { id: 'kw35', cat: '英语学习', title: '发音突破：连读和弱读', desc: '英语流畅的秘密：连读（an apple→anapple）和弱读（to读成tə）。推荐YouTube频道"Rachel\'s English"，专门讲美式发音。', tags: ['发音', '连读'], target: 'english', targetName: '英语' },
      { id: 'kw61', cat: '英语学习', title: '商务英语邮件万能模板', desc: '开头：Hope this email finds you well. 正文：I\'m writing to.../Just checking in on... 结尾：Looking forward to hearing from you. 附常用：FYI(供参考)、ASAP(尽快)。', tags: ['商务', '邮件'], target: 'english', targetName: '英语' },
      { id: 'kw62', cat: '英语学习', title: '用AI练口语—— 随时随地对话', desc: 'ChatGPT语音模式、豆包AI、Pi.ai都可免费练口语。设定角色（如"你是一家咖啡店的店员"），沉浸式对话。比找真人语伴更方便。', tags: ['AI', '口语'], target: 'english', targetName: '英语' },
      // ===== 理财投资 =====
      { id: 'kw36', cat: '理财投资', title: '基金定投实操指南', desc: '①开户：支付宝/天天基金 ②选基：沪深300ETF联接（费率低）③设置：每月10号自动扣款 ④金额：月收入10-20% ⑤纪律：坚持3年以上，不要中途停止。', tags: ['定投', '实操'], target: 'finance', targetName: '财经' },
      { id: 'kw37', cat: '理财投资', title: '可转债打新全流程', desc: '①开通证券账户 ②每日查看"可转债申购日历" ③点击申购（顶格申购）④T+2公布中签 ⑤缴款1000元 ⑥上市首日卖出（通常盈利100-300元）。', tags: ['打新债', '实操'], target: 'finance', targetName: '财经' },
      { id: 'kw38', cat: '理财投资', title: '个人财务体检清单', desc: '每月1号检查：①应急金≥3个月支出？②负债/月收入<30%？③储蓄率≥20%？④投资组合是否需要再平衡？⑤保险是否齐全？', tags: ['财务体检', '清单'], target: 'finance', targetName: '财经' },
      { id: 'kw39', cat: '理财投资', title: '省钱不降生活品质的5个技巧', desc: '①取消不用的订阅会员 ②大额消费等24小时再决定 ③买品质好耐用的而非便宜的 ④自己做饭代替外卖 ⑤用信用卡积分换购。每月可省1000-3000元。', tags: ['省钱', '技巧'], target: 'finance', targetName: '财经' },
      { id: 'kw40', cat: '理财投资', title: '银行卡的正确使用姿势', desc: '①工资卡只进不出→自动转入理财 ②消费卡每月转入预算 ③储蓄卡只存不取。三卡分离，花钱有数。', tags: ['银行卡', '管理'], target: 'finance', targetName: '财经' },
      { id: 'kw41', cat: '理财投资', title: '消费降级 vs 消费升级', desc: '降级：减少频次（外卖→做饭）。升级：买贵但耐用的（快时尚→经典款）。聪明的消费=在"高频使用"上花钱，在"低频冲动"上省钱。', tags: ['消费观', '降级'], target: 'finance', targetName: '财经' },
      { id: 'kw63', cat: '理财投资', title: '指数估值怎么看—— 低估才是买入时机', desc: '看PE/PB历史分位：<30%分位=低估（可加仓），30-70%=合理（持有），>70%=高估（减仓）。支付宝"指数红绿灯"和蛋卷基金"估值排行"都有免费数据。', tags: ['估值', '指数'], target: 'finance', targetName: '财经' },
      { id: 'kw64', cat: '理财投资', title: '股债平衡策略—— 最简单的资产配置', desc: '50%股票基金+50%债券基金，每半年调整一次。股票涨了卖掉补债券，债券涨了卖掉补股票。长期年化6-8%，最大回撤仅10-15%。', tags: ['股债平衡', '配置'], target: 'finance', targetName: '财经' },
      { id: 'kw65', cat: '理财投资', title: '打新股—— A股最稳的"抽奖"', desc: '持有一定市值的股票→获得打新额度→申购新股→中签缴款→上市卖出。虽然中签率极低（万分之几），但中了就是赚。需要开通科创板/创业板权限。', tags: ['打新', '股票'], target: 'finance', targetName: '财经' },
      { id: 'kw66', cat: '理财投资', title: '黄金的3种投资方式', desc: '①实物黄金（金条/金币）：最传统，有保管成本 ②黄金ETF（如518880）：股票账户直接买，最方便 ③积存金（支付宝/银行）：定投模式，积少成多。', tags: ['黄金', '投资'], target: 'finance', targetName: '财经' },
      // ===== 效率工具 =====
      { id: 'kw42', cat: '效率工具', title: '番茄工作法实操', desc: '①设25分钟倒计时→专注一件事 ②铃响休息5分钟 ③每4个番茄钟休息15-30分钟。工具：Forest App（种树）、番茄ToDo。每天8个番茄钟=高效4小时。', tags: ['番茄钟', '专注'], target: 'memos', targetName: '备忘录' },
      { id: 'kw43', cat: '效率工具', title: 'Notion搭建个人知识库', desc: '①创建Database ②设置属性：分类、标签、日期、状态 ③用不同视图：表格/看板/日历 ④模板化重复内容。推荐从PARA笔记法开始。', tags: ['Notion', '知识管理'], target: 'memos', targetName: '备忘录' },
      { id: 'kw44', cat: '效率工具', title: '每日复盘模板', desc: '①今天完成了什么？（3件事）②遇到了什么问题？③学到了什么？④明天最重要的1件事是什么？每天花5分钟，一年后你会感谢自己。', tags: ['复盘', '模板'], target: 'memos', targetName: '备忘录' },
      { id: 'kw45', cat: '效率工具', title: 'GTD任务管理法', desc: 'Getting Things Done五步：①收集→②整理→③组织→④回顾→⑤执行。核心：大脑是用来思考的，不是用来记事的。把所有待办清出大脑。', tags: ['GTD', '任务管理'], target: 'memos', targetName: '备忘录' },
      { id: 'kw46', cat: '效率工具', title: '两分钟法则—— 告别拖延症', desc: '如果一件事2分钟内能做完→立刻做。不要放进待办清单。回复消息、整理桌面、倒垃圾……立刻搞定，不给拖延留机会。', tags: ['两分钟', '拖延'], target: 'memos', targetName: '备忘录' },
      { id: 'kw47', cat: '效率工具', title: '深度工作的4个条件', desc: '①固定时间段（如每天9-12点）②关闭所有通知③单任务（不做多线程）④设定明确产出目标。每天3小时深度工作>8小时浅层工作。', tags: ['深度工作', '专注'], target: 'memos', targetName: '备忘录' },
      { id: 'kw48', cat: '效率工具', title: '周计划的"3-3-3法则"', desc: '每周设定：3件最重要的事（必须完成）+3件次要的事（尽量完成）+3件维护的事（习惯打卡）。聚焦，不要贪多。', tags: ['周计划', '聚焦'], target: 'memos', targetName: '备忘录' },
      { id: 'kw67', cat: '效率工具', title: '浏览器插件效率包', desc: '必装插件：①OneTab（标签页管理，省内存）②uBlock Origin（去广告）③Grammarly（英语写作纠错）④Dark Reader（夜间模式）。装完生产力翻倍。', tags: ['插件', '浏览器'], target: 'memos', targetName: '备忘录' },
      { id: 'kw68', cat: '效率工具', title: 'AI工具提效指南（2025版）', desc: '写作→Claude/ChatGPT；做PPT→Gamma.ai；画图→Midjourney/DALL·E；会议纪要→飞书妙记/通义听悟；代码→GitHub Copilot。用对工具，一天省2小时。', tags: ['AI', '工具'], target: 'memos', targetName: '备忘录' },
      { id: 'kw69', cat: '效率工具', title: '文件命名规范—— 告别"新建文件夹"', desc: '格式：[日期]_[项目]_[版本]。如"20260728_知识库改造_v2"。好处：①按名称排序=按时间排序 ②一眼知道是什么 ③找文件快10倍。', tags: ['文件管理', '命名'], target: 'memos', targetName: '备忘录' },
      // ===== 个人成长 =====
      { id: 'kw49', cat: '个人成长', title: '费曼学习法—— 最好的学习方式是"教"', desc: '①选一个概念→②用最简单的语言讲给一个外行听→③讲不清楚的地方就是没真懂→④回去重新学→⑤简化类比直到能讲明白。', tags: ['费曼', '学习方法'], target: 'memos', targetName: '备忘录' },
      { id: 'kw50', cat: '个人成长', title: '微习惯—— 小到不可能失败', desc: '想健身→"每天1个俯卧撑"；想读书→"每天读1页"；想写作→"每天写50字"。关键是"开始"，一旦开始通常会超额完成。', tags: ['微习惯', '自律'], target: 'memos', targetName: '备忘录' },
      { id: 'kw51', cat: '个人成长', title: '刻意练习的4个要素', desc: '①明确目标（不是"练琴"而是"练好这首曲子的第3小节"）②极度专注③即时反馈④走出舒适区。1万小时不是关键，刻意练习才是。', tags: ['刻意练习', '技能'], target: 'memos', targetName: '备忘录' },
      { id: 'kw52', cat: '个人成长', title: '打造你的"第二大脑"', desc: '用笔记工具（Notion/飞书/Obsidian）建立外脑系统：①遇到好内容→剪藏②定期整理→分类+标签③关联→把孤立的笔记连成网④输出→变成你的知识。', tags: ['第二大脑', '笔记'], target: 'memos', targetName: '备忘录' },
      { id: 'kw53', cat: '个人成长', title: '晨间惯例（Morning Routine）', desc: '成功人士的共性：有固定的早晨流程。模板：①起床不碰手机→②喝一杯水→③10分钟冥想/拉伸→④写下今天最重要的1件事→⑤开始深度工作。', tags: ['晨间', '习惯'], target: 'memos', targetName: '备忘录' },
      { id: 'kw70', cat: '个人成长', title: '21天习惯养成法—— 科学版', desc: '21天是"适应期"不是"定型期"。真正确立习惯需要66天（伦敦大学研究）。方法：①前21天每天打卡 ②22-66天降低频率但保持 ③66天后检查是否内化。', tags: ['习惯', '21天'], target: 'memos', targetName: '备忘录' },
      { id: 'kw71', cat: '个人成长', title: '目标设定的SMART原则', desc: 'Specific(具体的)、Measurable(可衡量的)、Achievable(可达成的)、Relevant(相关的)、Time-bound(有时限的)。"我要变强"→"3个月内每周健身3次，深蹲达到50kg"。', tags: ['SMART', '目标'], target: 'memos', targetName: '备忘录' },
      { id: 'kw72', cat: '个人成长', title: '艾森豪威尔矩阵—— 时间管理的终极工具', desc: '四象限：①重要+紧急→马上做 ②重要+不紧急→安排时间做 ③不重要+紧急→委托别人 ④不重要+不紧急→删掉。每天80%时间应在②象限。', tags: ['时间管理', '四象限'], target: 'memos', targetName: '备忘录' },
      { id: 'kw73', cat: '个人成长', title: '精力管理 > 时间管理', desc: '时间是公平的，精力不是。高效能人士的秘密：①把最难的事放在精力巅峰做 ②每90分钟休息15分钟 ③运动+睡眠=精力基石 ④少做决策（扎克伯格天天穿灰T恤）。', tags: ['精力管理', '高效'], target: 'memos', targetName: '备忘录' },
      { id: 'kw74', cat: '个人成长', title: '冥想入门—— 5分钟改变一天', desc: '①找个安静地方坐下 ②闭眼，专注呼吸 ③走神了没关系，轻轻拉回来 ④从5分钟开始。研究证明：每天冥想8周，焦虑降低30%，专注力提升20%。App推荐：潮汐、Headspace。', tags: ['冥想', '减压'], target: 'memos', targetName: '备忘录' },
      // ===== 沟通表达 =====
      { id: 'kw54', cat: '沟通表达', title: 'PREP沟通法—— 把话说清楚', desc: 'Point(观点)→Reason(理由)→Example(例子)→Point(重申观点)。如："我觉得这个方案可行(P)，因为成本低效果好(R)，比如上次...(E)，所以建议采用(P)。"', tags: ['PREP', '表达'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw55', cat: '沟通表达', title: '非暴力沟通四步法', desc: '①观察（说事实不说评价）②感受（说感受不说想法）③需要（说需要不说指责）④请求（说请求不说命令）。"你总是迟到"→"你这周迟到了3次，我有些担心..."', tags: ['非暴力沟通', '人际关系'], target: 'memos', targetName: '备忘录' },
      { id: 'kw56', cat: '沟通表达', title: '电梯演讲—— 30秒说清你是谁', desc: '格式：我是[名字]，我帮[谁]解决[什么问题]，方法是[怎么做的]，跟别人不一样的是[独特优势]。30秒内让人记住你。', tags: ['电梯演讲', '自我介绍'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw57', cat: '沟通表达', title: '即兴发言的3点法', desc: '突然被点名发言？用3点法：①先说"我有三点想法"②想到什么说什么（人们只记得你有三点）③最后总结"所以我认为..."。3这个数字有魔力。', tags: ['即兴发言', '表达'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw75', cat: '沟通表达', title: '倾听的5个层次—— 最高级的沟通是"听"', desc: '①忽视（根本没在听）②假装听（嗯嗯哦哦）③选择性听（只听想听的）④专注听（理解对方）⑤同理心听（感受对方的情绪）。大多数人在①-③，高手在⑤。', tags: ['倾听', '同理心'], target: 'memos', targetName: '备忘录' },
      { id: 'kw76', cat: '沟通表达', title: '说服力三要素：Ethos/Pathos/Logos', desc: '亚里士多德的说服三要素：①Ethos(人格魅力)：你靠谱吗？②Pathos(情感)：你打动我了吗？③Logos(逻辑)：你有道理吗？好说服=三者结合。', tags: ['说服力', '沟通'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw77', cat: '沟通表达', title: '会议发言的STAR法则', desc: 'Situation(背景)→Task(任务)→Action(行动)→Result(结果)。"上季度用户流失(S)，我负责挽回(T)，通过定向优惠(A)，留存率提升了15%(R)"。', tags: ['会议', '发言'], target: 'copywritingItems', targetName: '文案表达' },
      { id: 'kw78', cat: '沟通表达', title: '批评的艺术：三明治法则', desc: '①先肯定（"你这篇文案选题很好"）②提出建议（"结构可以再紧凑一些"）③再鼓励（"以你的能力，改完一定会更好"）。让人舒服地接受意见。', tags: ['反馈', '批评'], target: 'copywritingItems', targetName: '文案表达' },
    ];

    // 合并用户自定义知识
    const userKnowledge = Store.getUserKnowledge();
    const allKnowledge = [...knowledgeDB, ...userKnowledge];

    // ===== 智能每日推荐 =====
    const dailyResult = Store.getDailyKnowledge('general', allKnowledge, 5);
    const progress = Store.getKnowledgeProgress('general', allKnowledge);

    // 进度条
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:11px;color:var(--text-muted);padding:0 4px;';
    progressBar.innerHTML = `
      <span>📖 学习进度</span>
      <div style="flex:1;height:6px;background:var(--bg-soft);border-radius:3px;overflow:hidden;">
        <div style="height:100%;width:${progress.percent}%;background:var(--primary);border-radius:3px;transition:width 0.3s;"></div>
      </div>
      <span>${progress.read}/${progress.total} (${progress.percent}%)</span>
    `;
    container.appendChild(progressBar);

    // 全部读完提示
    if (progress.read >= progress.total && progress.total > 0) {
      const doneTip = document.createElement('div');
      doneTip.style.cssText = 'text-align:center;padding:8px 12px;margin-bottom:10px;color:var(--text-muted);font-size:13px;background:var(--bg-soft);border-radius:8px;';
      doneTip.innerHTML = '🎉 全部学完！<button class="btn btn-sm" style="margin-left:8px;">重新开始</button>';
      doneTip.querySelector('button').onclick = () => {
        Store.resetKnowledgeProgress('general');
        Views.render('knowledge');
      };
      container.appendChild(doneTip);
    }

    // 今日推荐标题
    const dailyTitle = document.createElement('div');
    dailyTitle.className = 'section-title';
    dailyTitle.style.marginTop = '4px';
    dailyTitle.innerHTML = `📌 今日推荐 <span style="font-size:11px;font-weight:400;color:var(--text-muted);">— 不重复推荐 · 第${dailyResult.cycle+1}轮</span>`;
    container.appendChild(dailyTitle);

    // 今日推荐卡片
    if (dailyResult.items.length > 0) {
      const dailyWrap = document.createElement('div');
      dailyWrap.className = 'knowledge-list';
      dailyWrap.style.marginBottom = '16px';
      dailyResult.items.forEach(item => {
        const isUser = item.id && item.id.startsWith('uk');
        const card = document.createElement('div');
        card.className = 'knowledge-card';
        card.style.cssText = 'border-left:3px solid var(--primary);';
        card.innerHTML = `
          <div class="knowledge-card-header">
            <span class="knowledge-card-cat">${this.escape(item.cat)}</span>
            <span style="font-size:10px;color:var(--primary);font-weight:600;">⭐ 今日推荐</span>
            ${isUser ? '<span style="font-size:10px;color:var(--primary);margin-left:auto;">我的</span>' : ''}
          </div>
          <div class="knowledge-card-title">${this.escape(item.title)}</div>
          <div class="knowledge-card-desc">${this.escape(item.desc)}</div>
          <div class="knowledge-card-footer">
            <div class="knowledge-card-tags">
              ${(item.tags || []).map(t => `<span class="knowledge-card-tag">${this.escape(t)}</span>`).join('')}
            </div>
            <button class="knowledge-add-btn" data-memo="${item.id}">📝 加到备忘录</button>
          </div>
        `;
        card.querySelector('[data-memo]').onclick = (e) => {
          e.stopPropagation();
          Store.addToArray('memos', {
            id: Store.genId(),
            title: item.title,
            content: item.desc,
            category: item.cat || '知识库',
            date: Store.todayKey()
          });
          UI.toast('已添加到备忘录 ✅');
        };
        dailyWrap.appendChild(card);
      });
      container.appendChild(dailyWrap);
    }

    // 分隔
    const divider = document.createElement('div');
    divider.style.cssText = 'font-size:13px;font-weight:600;color:var(--text-muted);margin:8px 0 4px 0;';
    divider.textContent = '📚 全部知识库';
    container.appendChild(divider);

    // 分类筛选
    const cats = [...new Set(allKnowledge.map(k => k.cat))];
    let activeCat = 'all';

    // 工具栏：筛选 + 添加按钮
    const toolbar = document.createElement('div');
    toolbar.className = 'filter-bar';
    toolbar.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;';
    toolbar.innerHTML = '<button class="filter-chip active" data-cat="all">全部</button>';
    cats.forEach(c => {
      const chip = document.createElement('button');
      chip.className = 'filter-chip';
      chip.dataset.cat = c;
      chip.textContent = c;
      toolbar.appendChild(chip);
    });
    // 添加按钮
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-sm';
    addBtn.style.cssText = 'margin-left:auto;background:var(--primary);color:#fff;border:none;';
    addBtn.textContent = '+ 添加知识';
    addBtn.onclick = () => this.showAddKnowledgeForm(container);
    toolbar.appendChild(addBtn);
    container.appendChild(toolbar);

    // 添加知识表单（默认隐藏）
    const formWrap = document.createElement('div');
    formWrap.id = 'knowledge-add-form';
    formWrap.style.display = 'none';
    container.appendChild(formWrap);

    const listWrap = document.createElement('div');
    listWrap.className = 'knowledge-list';
    container.appendChild(listWrap);

    const renderList = () => {
      listWrap.innerHTML = '';
      const filtered = activeCat === 'all' ? allKnowledge : allKnowledge.filter(k => k.cat === activeCat);
      if (filtered.length === 0) {
        listWrap.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted);">暂无内容，点击上方"+ 添加知识"来补充吧</div>';
        return;
      }
      filtered.forEach(item => {
        const isUser = item.id && item.id.startsWith('uk');
        const added = addedIds.includes(item.id);
        const card = document.createElement('div');
        card.className = 'knowledge-card';
        card.innerHTML = `
          <div class="knowledge-card-header">
            <span class="knowledge-card-cat">${this.escape(item.cat)}</span>
            <span class="knowledge-card-target">→ ${this.escape(item.targetName)}</span>
            ${isUser ? '<span style="font-size:10px;color:var(--primary);margin-left:auto;">我的</span>' : ''}
          </div>
          <div class="knowledge-card-title">${this.escape(item.title)}</div>
          <div class="knowledge-card-desc">${this.escape(item.desc)}</div>
          <div class="knowledge-card-footer">
            <div class="knowledge-card-tags">
              ${item.tags.map(t => `<span class="knowledge-card-tag">${this.escape(t)}</span>`).join('')}
            </div>
            <div style="display:flex;gap:6px;">
              ${isUser ? `<button class="knowledge-add-btn" data-del="${item.id}" style="background:#ff4757;color:#fff;">🗑 删除</button>` : ''}
              <button class="knowledge-add-btn ${added ? 'added' : ''}" data-kid="${item.id}" ${added ? 'disabled' : ''}>
                ${added ? '✅ 已添加' : '+ 添加到我的工作台'}
              </button>
            </div>
          </div>
        `;
        // 添加到工作台
        const addBtnEl = card.querySelector('[data-kid]');
        if (addBtnEl) {
          addBtnEl.onclick = (e) => {
            e.stopPropagation();
            UI.openAddKnowledgeModal(item);
          };
        }
        // 删除用户知识
        const delBtn = card.querySelector('[data-del]');
        if (delBtn) {
          delBtn.onclick = (e) => {
            e.stopPropagation();
            if (confirm('确定删除这条知识吗？')) {
              Store.deleteUserKnowledge(item.id);
              Views.render('knowledge');
            }
          };
        }
        listWrap.appendChild(card);
      });
    };
    renderList();

    toolbar.onclick = (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      activeCat = chip.dataset.cat || 'all';
      toolbar.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c === chip));
      renderList();
    };
  },

  // 显示添加知识表单
  showAddKnowledgeForm(container) {
    const formWrap = document.getElementById('knowledge-add-form');
    if (!formWrap) return;
    
    const isVisible = formWrap.style.display !== 'none';
    if (isVisible) {
      formWrap.style.display = 'none';
      return;
    }

    formWrap.style.display = 'block';
    formWrap.innerHTML = `
      <div class="card" style="margin-bottom:12px;border:2px dashed var(--primary);">
        <div style="font-size:14px;font-weight:600;margin-bottom:10px;">✏️ 添加新知识</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <input id="uk_cat" placeholder="分类（如：编程、摄影、心理学）" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          <input id="uk_title" placeholder="标题（如：Python入门指南）" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          <textarea id="uk_desc" placeholder="描述内容（支持详细说明）" rows="3" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:13px;resize:vertical;"></textarea>
          <input id="uk_tags" placeholder="标签（用逗号分隔，如：Python,编程,入门）" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          <select id="uk_target" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
            <option value="memos">→ 备忘录</option>
            <option value="copywritingItems">→ 文案表达</option>
            <option value="editingItems">→ 视频剪辑</option>
            <option value="posterItems">→ 海报制作</option>
            <option value="english">→ 英语</option>
            <option value="finance">→ 财经</option>
          </select>
          <div style="display:flex;gap:8px;justify-content:flex-end;">
            <button id="uk_cancel" class="btn btn-sm" style="background:var(--bg-soft);">取消</button>
            <button id="uk_save" class="btn btn-sm" style="background:var(--primary);color:#fff;">保存</button>
          </div>
        </div>
      </div>
    `;

    const targetMap = {
      memos: '备忘录',
      copywritingItems: '文案表达',
      editingItems: '视频剪辑',
      posterItems: '海报制作',
      english: '英语',
      finance: '财经'
    };

    formWrap.querySelector('#uk_cancel').onclick = () => {
      formWrap.style.display = 'none';
    };

    formWrap.querySelector('#uk_save').onclick = () => {
      const cat = formWrap.querySelector('#uk_cat').value.trim();
      const title = formWrap.querySelector('#uk_title').value.trim();
      const desc = formWrap.querySelector('#uk_desc').value.trim();
      const tagsRaw = formWrap.querySelector('#uk_tags').value.trim();
      const target = formWrap.querySelector('#uk_target').value;

      if (!cat || !title || !desc) {
        alert('请填写分类、标题和描述');
        return;
      }

      const tags = tagsRaw ? tagsRaw.split(/[,，]/).map(t => t.trim()).filter(Boolean) : [];
      const newItem = {
        id: 'uk' + Date.now(),
        cat,
        title,
        desc,
        tags,
        target,
        targetName: targetMap[target] || '备忘录',
        addDate: new Date().toISOString().slice(0, 10)
      };

      Store.addUserKnowledge(newItem);
      formWrap.style.display = 'none';
      Views.render('knowledge');
    };
  },

  escape(str) {
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
};
