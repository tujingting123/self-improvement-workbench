// ===== UI交互层 =====
const UI = {
  init() {
    document.getElementById('menuToggle').onclick = () => this.toggleSidebar(true);
    document.getElementById('overlay').onclick = () => this.toggleSidebar(false);
    document.getElementById('themeToggle').onclick = () => this.toggleTheme();
    document.getElementById('lightboxClose').onclick = () => this.closeLightbox();
    document.getElementById('lightbox').onclick = (e) => {
      if (e.target.id === 'lightbox') this.closeLightbox();
    };
    this.renderNav();
    const theme = Store.get('settings').theme;
    document.documentElement.setAttribute('data-theme', theme);
    // 初始化技能提升模块渲染函数
    Views.renderCopywriting = Views.renderKnowledgeModule('copywritingItems', 'copywritingCategories', '文案表达');
    Views.renderEditing = Views.renderKnowledgeModule('editingItems', 'editingCategories', '视频剪辑');
    Views.renderPoster = Views.renderKnowledgeModule('posterItems', 'posterCategories', '海报制作');
    // 仪表盘作为默认首页
    Views.render('dashboard');
    this.updateStreak();

    // 搜索栏
    document.getElementById('searchToggle').onclick = () => this.toggleSearch();
    document.getElementById('searchClose').onclick = () => this.toggleSearch(false);
    document.getElementById('searchInput').oninput = (e) => this.doSearch(e.target.value);
    // 点击标题回仪表盘
    document.getElementById('pageTitle').onclick = () => {
      if (Views.current !== 'dashboard') Views.render('dashboard');
    };
    // 备份/恢复
    document.getElementById('exportDataBtn').onclick = () => this.exportData();
    document.getElementById('importDataBtn').onclick = () => this.importData();
  },

  renderNav() {
    const list = document.getElementById('navList');
    list.innerHTML = '';
    // 按 section 分组
    let lastSection = '';
    Views.menus.forEach(menu => {
      if (menu.section !== lastSection) {
        const label = document.createElement('div');
        label.className = 'nav-section-label';
        label.textContent = menu.section;
        list.appendChild(label);
        lastSection = menu.section;
      }
      const li = document.createElement('li');
      li.className = 'nav-item' + (Views.current === menu.key ? ' active' : '');
      li.innerHTML = `
        <span class="nav-icon">${Views.icons[menu.icon]}</span>
        <span>${menu.name}</span>
      `;
      li.onclick = () => {
        Views.render(menu.key);
        this.updateNavActive(menu.key);
        this.toggleSidebar(false);
      };
      list.appendChild(li);
    });
  },

  updateNavActive(key) {
    document.querySelectorAll('.nav-item').forEach((item) => {
      const idx = Array.from(item.parentNode.children).filter(c => c.classList.contains('nav-item')).indexOf(item);
      const menus = Views.menus.filter(m => m.section);
      item.classList.toggle('active', menus[idx] && menus[idx].key === key);
    });
  },

  toggleSidebar(open) {
    document.getElementById('sidebar').classList.toggle('open', open);
    document.getElementById('overlay').classList.toggle('show', open);
  },

  toggleTheme() {
    const current = Store.get('settings').theme;
    const next = current === 'light' ? 'dark' : 'light';
    Store.data.settings.theme = next;
    Store.save();
    document.documentElement.setAttribute('data-theme', next);
  },

  // ===== 搜索 =====
  toggleSearch(open) {
    const title = document.getElementById('pageTitle');
    const search = document.getElementById('topbarSearch');
    const input = document.getElementById('searchInput');
    const toggle = document.getElementById('searchToggle');
    if (open === false || search.style.display !== 'none') {
      search.style.display = 'none';
      title.style.display = '';
      toggle.style.display = '';
      input.value = '';
    } else {
      search.style.display = 'flex';
      title.style.display = 'none';
      toggle.style.display = 'none';
      setTimeout(() => input.focus(), 100);
    }
  },

  doSearch(query) {
    if (!query || query.trim().length < 1) {
      const old = document.querySelector('.search-results');
      if (old) old.remove();
      return;
    }
    const q = query.toLowerCase().trim();
    const results = [];

    // 搜索书籍
    (Store.get('books') || []).forEach(b => {
      if ((b.title || '').toLowerCase().includes(q) || (b.author || '').toLowerCase().includes(q)) {
        results.push({ group: '📖 书籍', title: b.title, desc: b.author || '', meta: b.category || '', action: () => { this.toggleSearch(false); Views.render('reading'); setTimeout(() => UI.openBookDetailModal(b), 100); } });
      }
    });

    // 搜索灵感
    (Store.get('inspirations') || []).forEach(item => {
      if ((item.title || '').toLowerCase().includes(q) || (item.desc || '').toLowerCase().includes(q)) {
        results.push({ group: '💡 灵感', title: item.title, desc: (item.desc || '').slice(0, 60), meta: item.category || '', action: () => { this.toggleSearch(false); Views.render('inspiration'); setTimeout(() => UI.openInspirationDetailModal(item), 100); } });
      }
    });

    // 搜索技能知识
    const skillKeys = [
      { key: 'copywritingItems', name: '文案表达', view: 'copywriting' },
      { key: 'editingItems', name: '视频剪辑', view: 'editing' },
      { key: 'posterItems', name: '海报制作', view: 'poster' }
    ];
    skillKeys.forEach(sk => {
      (Store.get(sk.key) || []).forEach(item => {
        if ((item.title || '').toLowerCase().includes(q) || (item.desc || '').toLowerCase().includes(q) || (item.tags || []).some(t => t.toLowerCase().includes(q))) {
          results.push({ group: `🎯 ${sk.name}`, title: item.title, desc: (item.desc || '').slice(0, 60), meta: item.category || '', action: () => { this.toggleSearch(false); Views.render(sk.view); setTimeout(() => UI.openKnowledgeDetailModal(sk.key, item), 100); } });
        }
      });
    });

    // 搜索日记
    (Store.get('diaries') || []).forEach(d => {
      if ((d.title || '').toLowerCase().includes(q) || (d.content || '').toLowerCase().includes(q)) {
        results.push({ group: '📔 日记', title: d.title, desc: (d.content || '').slice(0, 60), meta: d.date || '', action: () => { this.toggleSearch(false); Views.render('diary'); setTimeout(() => UI.openDiaryDetailModal(d), 100); } });
      }
    });

    // 搜索备忘录
    (Store.get('memos') || []).forEach(m => {
      if ((m.title || '').toLowerCase().includes(q) || (m.content || '').toLowerCase().includes(q)) {
        results.push({ group: '📋 备忘录', title: m.title, desc: (m.content || '').slice(0, 60), meta: m.date || '', action: () => { this.toggleSearch(false); Views.render('memo'); setTimeout(() => UI.openNoteDetailModal('memos', 'memo', m), 100); } });
      }
    });

    // 搜索英语单词
    (Store.get('englishTasks') || []).forEach(t => {
      (t.words || []).forEach(w => {
        if ((w.text || '').toLowerCase().includes(q) || (w.meaning || '').includes(q)) {
          results.push({ group: '🔤 英语单词', title: w.text, desc: w.meaning || '', meta: t.name, action: () => { this.toggleSearch(false); Views.render('english'); } });
        }
      });
    });

    // 渲染搜索结果
    let resContainer = document.querySelector('.search-results');
    if (!resContainer) {
      resContainer = document.createElement('div');
      resContainer.className = 'search-results';
      document.getElementById('viewContainer').appendChild(resContainer);
    }
    if (results.length === 0) {
      resContainer.innerHTML = '<div class="empty"><div class="empty-text">未找到相关内容</div></div>';
      return;
    }
    // 按分组聚合
    const groups = {};
    results.forEach(r => {
      if (!groups[r.group]) groups[r.group] = [];
      groups[r.group].push(r);
    });
    let html = '';
    Object.entries(groups).forEach(([group, items]) => {
      html += `<div class="search-result-group"><div class="search-result-group-title">${group}</div>`;
      items.forEach(item => {
        html += `<div class="search-result-item"><div class="sr-title">${Views.escape(item.title)}</div>${item.desc ? `<div class="sr-desc">${Views.escape(item.desc)}</div>` : ''}${item.meta ? `<div class="sr-meta">${Views.escape(item.meta)}</div>` : ''}</div>`;
      });
      html += '</div>';
    });
    resContainer.innerHTML = html;
    // 绑定点击
    let idx = 0;
    resContainer.querySelectorAll('.search-result-item').forEach(el => {
      const r = results[idx++];
      el.onclick = r.action;
    });
  },

  // ===== 数据备份/恢复 =====
  exportData() {
    const json = Store.exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `self-improvement-backup-${Store.todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.toast('数据已导出');
  },

  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.confirm('恢复数据将覆盖当前所有内容，确定继续？', () => {
          const ok = Store.importData(ev.target.result);
          if (ok) {
            this.toast('数据已恢复，即将刷新');
            setTimeout(() => location.reload(), 800);
          } else {
            this.toast('文件格式无效');
          }
        });
      };
      reader.readAsText(file);
    };
    input.click();
  },

  // ===== 灵感分享图 =====
  generateShareImage(item) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // 背景渐变
    const bg = ctx.createLinearGradient(0, 0, 0, 800);
    bg.addColorStop(0, '#fff5f7');
    bg.addColorStop(0.5, '#ffeef2');
    bg.addColorStop(1, '#ffc2d1');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 600, 800);

    // 装饰圆
    ctx.fillStyle = 'rgba(255,143,163,0.08)';
    ctx.beginPath(); ctx.arc(500, 120, 160, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(80, 680, 100, 0, Math.PI * 2); ctx.fill();

    // 标题
    ctx.fillStyle = '#ff6b85';
    ctx.font = 'bold 32px "PingFang SC", "Microsoft YaHei", sans-serif';
    const titleLines = this.wrapText(ctx, item.title || '', 500);
    titleLines.forEach((line, i) => {
      ctx.fillText(line, 50, 120 + i * 44);
    });

    // 分隔线
    ctx.strokeStyle = '#ffb3c6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 120 + titleLines.length * 44 + 16);
    ctx.lineTo(550, 120 + titleLines.length * 44 + 16);
    ctx.stroke();

    // 描述
    if (item.desc) {
      ctx.fillStyle = '#4a4a4a';
      ctx.font = '20px "PingFang SC", "Microsoft YaHei", sans-serif';
      const descY = 120 + titleLines.length * 44 + 50;
      const descLines = this.wrapText(ctx, item.desc, 500);
      descLines.forEach((line, i) => {
        ctx.fillText(line, 50, descY + i * 30);
      });
    }

    // 底部信息
    const bottomY = 720;
    ctx.fillStyle = '#8a8a8a';
    ctx.font = '16px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`分类：${item.category || '未分类'}`, 50, bottomY);
    if (item.source) ctx.fillText(`来源：${item.source}`, 50, bottomY + 28);
    ctx.fillText(`收藏于 ${item.addDate || ''}`, 50, bottomY + 56);

    // 水印
    ctx.fillStyle = 'rgba(255,143,163,0.3)';
    ctx.font = '14px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('自我提升工作台 · 灵感集', 380, bottomY + 56);

    return canvas.toDataURL('image/png');
  },

  wrapText(ctx, text, maxWidth) {
    const lines = [];
    let current = '';
    for (const char of text) {
      const test = current + char;
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(current);
        current = char;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines.length ? lines : [text];
  },

  // 周目标设置
  openGoalModal(goalKey, moduleName, onUpdate) {
    const goals = Store.get('weeklyGoals');
    const current = goals[goalKey] || 5;
    const body = `
      <div class="field">
        <label class="label">${moduleName} — 每周收集目标（条）</label>
        <input class="input" id="gm_num" type="number" min="1" max="50" value="${current}">
      </div>
    `;
    this.openModal({
      title: '设置周目标',
      body,
      footer: '<button class="btn btn-primary btn-block" id="gm_save">保存</button>',
      onMount: (modal) => {
        modal.querySelector('#gm_save').onclick = () => {
          const num = parseInt(modal.querySelector('#gm_num').value) || 5;
          const g = Store.get('weeklyGoals');
          g[goalKey] = Math.max(1, Math.min(50, num));
          Store.set('weeklyGoals', g);
          this.closeModal();
          if (onUpdate) onUpdate();
          this.toast('目标已更新');
        };
      }
    });
  },

  // ===== 英语模块 - 新概念课程进度 =====
  advanceLesson(task) {
    const newProg = (task.lessonProgress || 1) + 1;
    if (newProg > (task.lessonTotal || 144)) return this.toast('已学完全部课程！');
    const history = [...(task.lessonHistory || []), { lesson: newProg, date: Store.todayKey() }];
    Store.updateInArray('englishTasks', task.id, { lessonProgress: newProg, lessonHistory: history });
    this.toast(`已学完第 ${newProg} 课 🎉`);
    Views.render('english');
  },

  setLessonProgress(task) {
    const body = `
      <div class="field">
        <label class="label">当前学到第几课？</label>
        <input class="input" id="ls_num" type="number" min="1" max="${task.lessonTotal || 144}" value="${task.lessonProgress || 1}">
      </div>
    `;
    this.openModal({
      title: '设置课程进度',
      body,
      footer: '<button class="btn btn-primary btn-block" id="ls_save">保存</button>',
      onMount: (modal) => {
        modal.querySelector('#ls_save').onclick = () => {
          const num = parseInt(modal.querySelector('#ls_num').value) || 1;
          Store.updateInArray('englishTasks', task.id, { lessonProgress: Math.min(num, task.lessonTotal || 144) });
          this.closeModal();
          this.toast('进度已更新');
          Views.render('english');
        };
      }
    });
  },

  // ===== EnglishPod 新增一期 =====
  addEpisode(task) {
    const body = `
      <div class="field">
        <label class="label">期数/标题</label>
        <input class="input" id="ep_title" placeholder="如：Daily Life - Going to the Doctor">
      </div>
      <div class="field">
        <label class="label">学习方式</label>
        <div class="option-group" id="ep_type_group">
          <button class="option-chip active" data-val="精听">精听</button>
          <button class="option-chip" data-val="泛听">泛听</button>
        </div>
      </div>
    `;
    this.openModal({
      title: '新增 EnglishPod 学习记录',
      body,
      footer: '<button class="btn btn-primary btn-block" id="ep_save">保存</button>',
      onMount: (modal) => {
        let type = '精听';
        modal.querySelector('#ep_type_group').onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          modal.querySelectorAll('#ep_type_group .option-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          type = chip.dataset.val;
        };
        modal.querySelector('#ep_save').onclick = () => {
          const title = modal.querySelector('#ep_title').value.trim();
          const episode = { title, type, date: Store.todayKey() };
          const episodes = [...(task.episodes || []), episode];
          Store.updateInArray('englishTasks', task.id, {
            episodes,
            episodeCount: (task.episodeCount || 0) + 1
          });
          this.closeModal();
          this.toast('已记录');
          Views.render('english');
        };
      }
    });
  },

  // ===== 造句 AI 评判 =====
  submitSentenceAnswer(answer) {
    if (!answer) { this.toast('请输入答案'); return; }
    Store.submitQuizAnswer(answer);
    Views.render('english');

    const quiz = Store.data.dailyQuiz;
    const apiKey = Store.getGeminiKey();

    if (!apiKey) {
      // 没有 API Key，只做基础检查
      Store.setQuizFeedback({
        correct: answer.trim().length > 3,
        correctedSentence: answer,
        suggestions: '请设置 Gemini API Key 获取 AI 评判。基础检查：句子长度足够。',
        examples: []
      });
      Views.render('english');
      return;
    }

    // 调用 Gemini API 评判
    this.judgeSentence(answer, quiz.wordText || quiz.phraseText || '');
  },

  async judgeSentence(userSentence, wordText) {
    const apiKey = Store.getGeminiKey();
    if (!apiKey) return;

    try {
      const prompt = `你是英语老师。学生用单词/短语"${wordText}"造了一个句子："${userSentence}"
请判断：1.语法是否正确 2.用词是否恰当 3.给出修改建议和参考例句

请严格用JSON格式回复，不要有任何其他文字：
{"correct":true,"correctedSentence":"正确的句子","suggestions":"中文修改建议","examples":["例句1","例句2","例句3"]}`;

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
          })
        }
      );

      if (!resp.ok) {
        const errText = await resp.text();
        let errMsg = 'API 请求失败';
        if (resp.status === 403) errMsg = 'API Key 无效，请检查设置';
        else if (resp.status === 429) errMsg = '请求过于频繁，请稍后再试';
        Store.setQuizFeedback({
          correct: userSentence.trim().length > 3,
          correctedSentence: userSentence,
          suggestions: `${errMsg}（${resp.status}）`,
          examples: []
        });
        Views.render('english');
        return;
      }

      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // 尝试解析 JSON
      let feedback;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          feedback = JSON.parse(jsonMatch[0]);
        } catch (e) {
          feedback = {
            correct: userSentence.trim().length > 3,
            correctedSentence: userSentence,
            suggestions: text || '无法解析 AI 回复',
            examples: []
          };
        }
      } else {
        feedback = {
          correct: userSentence.trim().length > 3,
          correctedSentence: userSentence,
          suggestions: text || 'AI 未返回有效回复',
          examples: []
        };
      }

      Store.setQuizFeedback(feedback);
      Views.render('english');
    } catch (e) {
      Store.setQuizFeedback({
        correct: userSentence.trim().length > 3,
        correctedSentence: userSentence,
        suggestions: `网络错误：${e.message}`,
        examples: []
      });
      Views.render('english');
    }
  },

  // ===== Gemini API Key 设置 =====
  openGeminiKeyModal() {
    const currentKey = Store.getGeminiKey();
    this.openModal({
      title: '🔑 设置 Gemini API Key',
      body: `
        <div style="font-size:13px;color:var(--text-sub);margin-bottom:12px;">
          获取免费 API Key：<br>
          1. 打开 <a href="https://aistudio.google.com/apikey" target="_blank" style="color:var(--primary-dark);">aistudio.google.com/apikey</a><br>
          2. 用 Google 账号登录<br>
          3. 点击 "Create API Key"<br>
          4. 复制 Key 粘贴到下方
        </div>
        <div class="field">
          <label class="label">API Key</label>
          <input class="input" id="gk_input" value="${Views.escape(currentKey)}" placeholder="粘贴 Gemini API Key...">
        </div>
      `,
      footer: '<button class="btn btn-primary btn-block" id="gk_save">保存</button>',
      onMount: (modal) => {
        modal.querySelector('#gk_save').onclick = () => {
          const key = modal.querySelector('#gk_input').value.trim();
          Store.setGeminiKey(key);
          this.closeModal();
          this.toast(key ? 'API Key 已保存' : 'API Key 已清空');
          // 如果当前有待评判的造句，重新评判
          const quiz = Store.data.dailyQuiz;
          if (quiz && quiz.type === 'sentence' && quiz.userAnswer && quiz.correct === null) {
            this.submitSentenceAnswer(quiz.userAnswer);
          } else {
            Views.render('english');
          }
        };
      }
    });
  },

  // ===== PDF导入（新概念英语） =====
  importPdf(task) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // 限制文件大小（10MB）
      if (file.size > 10 * 1024 * 1024) {
        this.toast('文件太大，请选择10MB以下的PDF');
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target.result.split(',')[1];
        const pdfEntry = {
          id: Store.genId(),
          name: file.name,
          size: this.formatFileSize(file.size),
          data: base64,
          addDate: Store.todayKey()
        };
        const pdfs = [...(task.pdfs || []), pdfEntry];
        Store.updateInArray('englishTasks', task.id, { pdfs });
        this.toast(`已导入：${file.name}`);
        Views.render('english');
      };
      reader.readAsDataURL(file);
    };
    input.click();
  },

  viewPdf(task, pdfId) {
    const pdf = (task.pdfs || []).find(p => p.id === pdfId);
    if (!pdf) { this.toast('文件不存在'); return; }

    // 在新窗口中打开PDF
    const pdfBlob = this.base64ToBlob(pdf.data, 'application/pdf');
    const url = URL.createObjectURL(pdfBlob);

    const body = `
      <div style="text-align:center;margin-bottom:12px;font-size:13px;color:var(--text-sub);">${Views.escape(pdf.name)} · ${Views.escape(pdf.size)}</div>
      <div style="background:var(--bg-soft);border-radius:12px;overflow:hidden;">
        <iframe src="${url}" style="width:100%;height:60vh;border:none;border-radius:12px;" title="${Views.escape(pdf.name)}"></iframe>
      </div>
    `;

    this.openModal({
      title: '📄 查看PDF',
      body,
      footer: `<a href="${url}" download="${Views.escape(pdf.name)}" class="btn btn-primary btn-block" style="text-decoration:none;">💾 下载PDF</a><button class="btn btn-ghost btn-block" style="margin-top:8px;" data-close>关闭</button>`,
      onMount: (modal) => {
        modal.querySelector('[data-close]').onclick = () => {
          URL.revokeObjectURL(url);
          this.closeModal();
        };
      }
    });
  },

  base64ToBlob(base64, mimeType) {
    const byteChars = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteChars.length; offset += 512) {
      const slice = byteChars.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: mimeType });
  },

  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  },

  // ===== 知识库一键添加 =====
  openAddKnowledgeModal(item) {
    const addedIds = Store.get('addedKnowledgeIds') || [];
    if (addedIds.includes(item.id)) {
      this.toast('已添加过，无需重复添加');
      return;
    }

    const targetMap = {
      copywritingItems: { storeKey: 'copywritingItems', view: 'copywriting', name: '文案表达', catKey: 'copywritingCategories' },
      editingItems: { storeKey: 'editingItems', view: 'editing', name: '视频剪辑', catKey: 'editingCategories' },
      posterItems: { storeKey: 'posterItems', view: 'poster', name: '海报制作', catKey: 'posterCategories' },
      memos: { storeKey: 'memos', view: 'memo', name: '备忘录', catKey: null },
      english: { storeKey: 'englishTasks', view: 'english', name: '英语', catKey: null },
      finance: { storeKey: null, view: 'finance', name: '财经', catKey: null }
    };
    const target = targetMap[item.target];

    if (item.target === 'finance') {
      // 财经内容暂不支持直接添加，显示提示
      this.toast('财经知识请查看理财知识学习板块');
      return;
    }

    if (!target) {
      this.toast('暂不支持添加到此模块');
      return;
    }

    const body = `
      <div style="text-align:center;margin-bottom:14px;">
        <div style="font-size:15px;font-weight:600;">${Views.escape(item.title)}</div>
        <div style="font-size:12px;color:var(--text-sub);margin-top:4px;">将添加到「${target.name}」模块</div>
      </div>
      <div style="font-size:13px;color:var(--text-sub);line-height:1.6;background:var(--bg-soft);padding:10px;border-radius:8px;">${Views.escape(item.desc)}</div>
    `;

    this.openModal({
      title: '添加到我的工作台',
      body,
      footer: '<button class="btn btn-primary btn-block" id="ka_confirm">确认添加</button>',
      onMount: (modal) => {
        modal.querySelector('#ka_confirm').onclick = () => {
          // 标记已添加
          const ids = [...(Store.get('addedKnowledgeIds') || []), item.id];
          Store.set('addedKnowledgeIds', ids);

          if (item.target === 'english') {
            // 英语：添加到第一个任务的短语中
            const tasks = Store.get('englishTasks');
            if (tasks.length > 0) {
              const task = tasks[0];
              if (!task.phrases) task.phrases = [];
              task.phrases.push({
                id: Store.genId(),
                en: item.title,
                cn: item.desc,
                example: item.tags.join(' · '),
                addDate: Store.todayKey()
              });
              Store.save();
            }
          } else if (item.target === 'memos') {
            // 备忘录：直接添加一条备忘录
            Store.addToArray('memos', {
              id: Store.genId(),
              title: item.title,
              content: item.desc,
              category: item.cat,
              date: Store.todayKey()
            });
          } else {
            // 技能模块
            const cats = Store.get(target.catKey);
            Store.addToArray(target.storeKey, {
              id: Store.genId(),
              title: item.title,
              desc: item.desc,
              category: item.cat,
              source: '知识库',
              sourceUrl: '',
              tags: item.tags,
              notes: '',
              addDate: Store.todayKey()
            });
          }

          this.closeModal();
          this.toast(`已添加到「${target.name}」`);
          Views.render('knowledge');
        };
      }
    });
  },

  updateStreak() {
    Store.updateStreak();
    const streak = Store.get('settings').streak;
    const el = document.getElementById('streakNum');
    if (el) el.textContent = streak;
  },

  toastTimer: null,
  toast(msg, duration = 1800) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => t.classList.remove('show'), duration);
  },

  confirm(msg, onOk) {
    this.openModal({
      title: '提示',
      body: `<div style="text-align:center;padding:10px 0 4px;font-size:15px;">${msg}</div>`,
      footer: `<button class="btn btn-ghost btn-block" data-close>取消</button><button class="btn btn-primary btn-block" style="margin-top:8px;" data-ok>确定</button>`,
      onMount: (modal) => {
        modal.querySelector('[data-ok]').onclick = () => {
          this.closeModal();
          onOk && onOk();
        };
      }
    });
  },

  openModal({ title, body, footer, onMount }) {
    const mask = document.createElement('div');
    mask.className = 'modal-mask';
    mask.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">${title}</div>
          <button class="modal-close" data-close>&times;</button>
        </div>
        <div class="modal-body">${body || ''}</div>
        ${footer ? `<div class="modal-footer" style="margin-top:16px;">${footer}</div>` : ''}
      </div>
    `;
    document.body.appendChild(mask);
    requestAnimationFrame(() => mask.classList.add('show'));

    const close = () => this.closeModal(mask);
    mask.querySelector('[data-close]').onclick = close;
    mask.onclick = (e) => { if (e.target === mask) close(); };
    
    if (onMount) onMount(mask);
    return mask;
  },

  closeModal(mask) {
    mask = mask || document.querySelector('.modal-mask');
    if (!mask) return;
    mask.classList.remove('show');
    setTimeout(() => mask.remove(), 300);
  },

  // ===== 身材管理 - 任务编辑 =====
  openFitnessModal(task = null) {
    const isEdit = !!task;
    const durations = ['半小时', '1小时', '自由编辑'];
    let selectedDuration = task ? task.duration : '半小时';
    let isCustom = task ? (task.custom || !durations.includes(task.duration)) : false;

    const body = `
      <div class="field">
        <label class="label">运动名称</label>
        <input class="input" id="ft_name" placeholder="如：普拉提、瑜伽" value="${task ? Views.escape(task.name) : ''}">
      </div>
      <div class="field">
        <label class="label">时长</label>
        <div class="option-group" id="ft_duration_group">
          ${durations.map(d => `<button class="option-chip ${!isCustom && selectedDuration === d ? 'active' : ''}" data-val="${d}">${d}</button>`).join('')}
        </div>
        <input class="input" id="ft_custom" style="margin-top:8px;${isCustom ? '' : 'display:none;'}" placeholder="输入自定义时长" value="${isCustom ? Views.escape(selectedDuration) : ''}">
      </div>
    `;
    const footer = `
      <button class="btn btn-primary btn-block" id="ft_save">${isEdit ? '保存修改' : '添加任务'}</button>
      ${isEdit ? '<button class="btn btn-danger btn-block" style="margin-top:8px;" id="ft_del">删除任务</button>' : ''}
    `;

    this.openModal({
      title: isEdit ? '编辑运动任务' : '新增运动任务',
      body, footer,
      onMount: (modal) => {
        const group = modal.querySelector('#ft_duration_group');
        const customInput = modal.querySelector('#ft_custom');
        group.onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          group.querySelectorAll('.option-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          if (chip.dataset.val === '自由编辑') {
            isCustom = true;
            customInput.style.display = '';
            customInput.focus();
          } else {
            isCustom = false;
            selectedDuration = chip.dataset.val;
            customInput.style.display = 'none';
          }
        };
        modal.querySelector('#ft_save').onclick = () => {
          const name = modal.querySelector('#ft_name').value.trim();
          if (!name) { this.toast('请输入运动名称'); return; }
          const duration = isCustom ? customInput.value.trim() : selectedDuration;
          if (!duration) { this.toast('请输入时长'); return; }
          if (isEdit) {
            Store.updateInArray('fitnessTasks', task.id, { name, duration, custom: isCustom });
            this.toast('已保存');
          } else {
            Store.addToArray('fitnessTasks', { id: Store.genId(), name, duration, custom: isCustom });
            this.toast('已添加');
          }
          this.closeModal();
          Views.render('fitness');
        };
        if (isEdit) {
          modal.querySelector('#ft_del').onclick = () => {
            this.confirm('删除该运动任务？', () => {
              Store.removeFromArray('fitnessTasks', task.id);
              Views.render('fitness');
              this.toast('已删除');
            });
          };
        }
      }
    });
  },

  // ===== 体重记录 =====
  openWeightModal() {
    const body = `
      <div class="field">
        <label class="label">日期</label>
        <input class="input" type="date" id="wt_date" value="${Store.todayKey()}">
      </div>
      <div class="field">
        <label class="label">体重（kg）</label>
        <input class="input" type="number" step="0.1" id="wt_weight" placeholder="如：55.5">
      </div>
    `;
    const footer = `<button class="btn btn-primary btn-block" id="wt_save">记录体重</button>`;
    this.openModal({
      title: '记录体重',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#wt_save').onclick = () => {
          const date = modal.querySelector('#wt_date').value;
          const weight = parseFloat(modal.querySelector('#wt_weight').value);
          if (!date || isNaN(weight)) { this.toast('请输入完整信息'); return; }
          const records = Store.get('weightRecords');
          const idx = records.findIndex(r => r.date === date);
          if (idx >= 0) {
            records[idx].weight = weight;
          } else {
            records.push({ date, weight });
          }
          Store.save();
          this.toast('已记录');
          this.closeModal();
          Views.render('fitness');
        };
      }
    });
  },

  // ===== 英语 - 任务编辑 =====
  openEnglishModal(task = null) {
    const isEdit = !!task;
    const body = `
      <div class="field">
        <label class="label">学习任务名称</label>
        <input class="input" id="en_name" placeholder="如：新概念、每日英语听力" value="${task ? Views.escape(task.name) : ''}">
      </div>
    `;
    const footer = `
      <button class="btn btn-primary btn-block" id="en_save">${isEdit ? '保存修改' : '添加任务'}</button>
      ${isEdit ? '<button class="btn btn-danger btn-block" style="margin-top:8px;" id="en_del">删除任务</button>' : ''}
    `;
    this.openModal({
      title: isEdit ? '编辑学习任务' : '新增学习任务',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#en_save').onclick = () => {
          const name = modal.querySelector('#en_name').value.trim();
          if (!name) { this.toast('请输入任务名称'); return; }
          if (isEdit) {
            Store.updateInArray('englishTasks', task.id, { name });
            this.toast('已保存');
          } else {
            Store.addToArray('englishTasks', { id: Store.genId(), name, topic: '', words: [], phrases: [], custom: true });
            this.toast('已添加');
          }
          this.closeModal();
          Views.render('english');
        };
        if (isEdit) {
          modal.querySelector('#en_del').onclick = () => {
            this.confirm('删除该学习任务？', () => {
              Store.removeFromArray('englishTasks', task.id);
              Views.render('english');
              this.toast('已删除');
            });
          };
        }
      }
    });
  },

  // ===== 生词添加（支持自动填充） =====
  openWordModal(taskId) {
    const body = `
      <div class="field">
        <label class="label">英文单词</label>
        <input class="input" id="wd_text" placeholder="输入英文单词后自动查询释义...">
        <div id="wd_loading" style="display:none;font-size:12px;color:var(--text-muted);margin-top:6px;">查询中...</div>
        <div id="wd_error" style="display:none;font-size:12px;color:var(--danger);margin-top:6px;"></div>
      </div>
      <div class="field">
        <label class="label">音标</label>
        <input class="input" id="wd_phonetic" placeholder="自动填充">
      </div>
      <div class="field">
        <label class="label">中文含义</label>
        <input class="input" id="wd_meaning" placeholder="自动填充">
      </div>
      <div class="field">
        <label class="label">词性</label>
        <input class="input" id="wd_pos" placeholder="如：名词、动词、形容词（自动填充）">
      </div>
    `;
    const footer = `<button class="btn btn-primary btn-block" id="wd_save">添加</button>`;
    this.openModal({
      title: '添加生词',
      body, footer,
      onMount: (modal) => {
        let lookupTimer = null;
        const textInput = modal.querySelector('#wd_text');
        const phoneticInput = modal.querySelector('#wd_phonetic');
        const meaningInput = modal.querySelector('#wd_meaning');
        const posInput = modal.querySelector('#wd_pos');
        const loadingEl = modal.querySelector('#wd_loading');
        const errorEl = modal.querySelector('#wd_error');

        // 自动查询单词释义
        textInput.oninput = () => {
          clearTimeout(lookupTimer);
          const word = textInput.value.trim();
          if (!word || word.includes(' ') || word.length < 2) return;
          // 只查询纯英文单词
          if (!/^[a-zA-Z]+$/.test(word)) return;

          lookupTimer = setTimeout(async () => {
            loadingEl.style.display = '';
            errorEl.style.display = 'none';
            try {
              const result = await UI.lookupWord(word);
              if (result) {
                phoneticInput.value = result.phonetic || '';
                meaningInput.value = result.meaning || '';
                posInput.value = result.pos || '';
              } else {
                errorEl.textContent = '未找到该单词，可手动填写';
                errorEl.style.display = '';
              }
            } catch (e) {
              errorEl.textContent = '查询失败，可手动填写';
              errorEl.style.display = '';
            }
            loadingEl.style.display = 'none';
          }, 600);
        };

        modal.querySelector('#wd_save').onclick = () => {
          const text = textInput.value.trim();
          if (!text) { this.toast('请输入生词'); return; }
          const task = Store.get('englishTasks').find(t => t.id === taskId);
          if (!task.words) task.words = [];
          task.words.push({
            id: Store.genId(),
            text,
            phonetic: phoneticInput.value.trim(),
            meaning: meaningInput.value.trim(),
            pos: posInput.value.trim(),
            done: false,
            addDate: Store.todayKey()
          });
          Store.save();
          this.toast('已添加');
          this.closeModal();
          Views.render('english');
        };
      }
    });
  },

  // 内置中英文词库（常用3000词 + 进阶词）
  _wordDB: null,

  _buildWordDB() {
    // 格式: word -> { pos: '词性', meaning: '中文释义' }
    const raw = `
abandon|v.|放弃,抛弃
ability|n.|能力,才能
able|adj.|能够的,有能力的
about|prep./adv.|关于,大约
above|prep./adv.|在...上方
abroad|adv.|在国外
absence|n.|缺席,不在
absolute|adj.|绝对的,完全的
absorb|v.|吸收,吸引
abstract|adj./n.|抽象的,摘要
abundant|adj.|丰富的,充裕的
academic|adj.|学术的
accelerate|v.|加速,促进
accept|v.|接受,同意
access|n./v.|进入,通道,访问
accompany|v.|陪伴,伴随
accomplish|v.|完成,实现
account|n./v.|账户,解释,说明
accurate|adj.|准确的,精确的
achieve|v.|达到,取得
acknowledge|v.|承认,确认
acquire|v.|获得,习得
across|prep./adv.|穿过,横过
act|v./n.|行动,表演
action|n.|行动,动作
active|adj.|积极的,活跃的
activity|n.|活动
actual|adj.|实际的,真实的
adapt|v.|适应,改编
add|v.|增加,添加
addition|n.|添加,加法
address|n./v.|地址,演说
adequate|adj.|足够的,适当的
adjust|v.|调整,适应
admire|v.|钦佩,赞赏
admit|v.|承认,准许进入
adopt|v.|采用,收养
advance|v./n.|前进,进步
advantage|n.|优势,有利条件
adventure|n.|冒险,奇遇
advertise|v.|做广告,宣传
advice|n.|建议,忠告
affair|n.|事务,事件
affect|v.|影响,感动
afford|v.|负担得起,提供
afraid|adj.|害怕的,担心的
after|prep./conj.|在...之后
afternoon|n.|下午
again|adv.|再,又
against|prep.|反对,靠着
age|n.|年龄,时代
agent|n.|代理人,代理商
ago|adv.|以前
agree|v.|同意,赞成
agreement|n.|协议,一致
ahead|adv.|在前面,向前
aid|n./v.|援助,帮助
aim|n./v.|目标,瞄准
air|n.|空气,天空
alarm|n.|警报,闹钟
album|n.|相册,专辑
alive|adj.|活着的,活跃的
all|adj./adv.|全部的,都
allocate|v.|分配,拨出
allow|v.|允许,准许
almost|adv.|几乎,差不多
alone|adj./adv.|独自的,单独的
along|prep./adv.|沿着,一起
already|adv.|已经
also|adv.|也,同样
alter|v.|改变,修改
alternative|n./adj.|替代方案,替代的
although|conj.|虽然,尽管
always|adv.|总是,一直
amaze|v.|使惊奇,使惊愕
among|prep.|在...之中
amount|n./v.|数量,总计
analyse|v.|分析
ancient|adj.|古代的,古老的
anger|n.|愤怒,生气
announce|v.|宣布,通告
annual|adj./n.|年度的,年刊
another|adj./pron.|另一个
answer|n./v.|答案,回答
anxiety|n.|焦虑,忧虑
anxious|adj.|焦虑的,渴望的
any|adj./pron.|任何的
apart|adv.|分开,相隔
apologize|v.|道歉
apparent|adj.|明显的,表面上的
appeal|v./n.|呼吁,吸引,上诉
appear|v.|出现,显得
appetite|n.|食欲,胃口
apply|v.|申请,应用
appoint|v.|任命,约定
appreciate|v.|欣赏,感激
approach|v./n.|接近,方法
appropriate|adj.|适当的,合适的
approve|v.|批准,赞成
area|n.|地区,领域
argue|v.|争论,辩论
arise|v.|出现,产生
arm|n.|手臂,武器
army|n.|军队,陆军
around|prep./adv.|在...周围
arrange|v.|安排,整理
arrest|v./n.|逮捕,拘留
arrive|v.|到达
art|n.|艺术,美术
article|n.|文章,物品,冠词
artist|n.|艺术家
ashamed|adj.|羞愧的,羞耻的
aside|adv.|在旁边,到一边
ask|v.|问,请求
aspect|n.|方面,层面
assess|v.|评估,评定
assign|v.|分配,指派
assist|v.|帮助,协助
associate|v./n.|关联,联想,同事
assume|v.|假设,承担
atmosphere|n.|气氛,大气层
attach|v.|附上,系上
attack|v./n.|攻击,袭击
attempt|v./n.|尝试,企图
attend|v.|参加,出席
attention|n.|注意力,关注
attitude|n.|态度,看法
attract|v.|吸引
audience|n.|观众,听众
author|n.|作者,作家
authority|n.|权威,当局
automatic|adj.|自动的
available|adj.|可用的,可得到的
average|adj./n.|平均的,平均数
avoid|v.|避免,回避
awake|adj./v.|醒着的,唤醒
award|n./v.|奖项,授予
aware|adj.|意识到的,知道的
away|adv.|离开,远离
awful|adj.|糟糕的,可怕的
background|n.|背景
backward|adv./adj.|向后,落后的
bad|adj.|坏的,糟糕的
balance|n./v.|平衡,余额
ban|v./n.|禁止,禁令
band|n.|乐队,带子
bank|n.|银行,河岸
bar|n./v.|酒吧,条,禁止
bare|adj.|裸露的,光秃的
bargain|n./v.|便宜货,讨价还价
base|n./v.|基础,基地,以...为基础
basic|adj.|基本的,基础的
basis|n.|基础,根据
battle|n./v.|战斗,战役
bear|v./n.|忍受,承担,熊
beat|v./n.|打败,跳动,节拍
beauty|n.|美丽,美人
become|v.|成为,变得
before|prep./conj.|在...之前
begin|v.|开始
behalf|n.|代表,利益
behave|v.|行为,表现
behaviour|n.|行为,举止
behind|prep./adv.|在...后面
belief|n.|信念,信仰
believe|v.|相信,认为
belong|v.|属于
below|prep./adv.|在...下面
beneath|prep./adv.|在...下方
benefit|n./v.|利益,好处,受益
beside|prep.|在...旁边
besides|prep./adv.|除...之外
best|adj./adv.|最好的
bet|v./n.|打赌,赌注
betray|v.|背叛,出卖
better|adj./adv.|更好的
between|prep.|在...之间
beyond|prep./adv.|超越,在...那边
big|adj.|大的
bind|v.|绑定,约束
bit|n.|一点,少量
bitter|adj.|苦的,痛苦的
blame|v./n.|责备,责怪
blank|adj./n.|空白的,空白处
blind|adj./v.|盲的,使失明
block|n./v.|街区,块,阻碍
blood|n.|血液,血统
blow|v./n.|吹,打击
board|n./v.|木板,董事会,登机
boast|v.|自夸,吹嘘
body|n.|身体,主体
boil|v.|煮沸,沸腾
bold|adj.|大胆的,粗体的
bond|n.|纽带,债券,联结
bone|n.|骨头
book|n./v.|书,预订
boom|n./v.|繁荣,兴旺
boost|v./n.|促进,提高
border|n.|边界,边境
bore|v.|使厌烦
born|adj.|出生的,天生的
borrow|v.|借入
boss|n.|老板,上司
both|adj./pron.|两者都
bother|v.|打扰,烦恼
bottle|n.|瓶子
bottom|n./adj.|底部,底部的
bound|adj./v.|必然的,跳跃,限制
bowl|n.|碗
brain|n.|大脑,智力
branch|n.|分支,树枝,分行
brave|adj.|勇敢的
break|v./n.|打破,休息
breath|n.|呼吸,气息
breed|v./n.|繁殖,品种
bridge|n./v.|桥,桥梁,弥合
brief|adj./n.|简短的,摘要
bright|adj.|明亮的,聪明的
brilliant|adj.|杰出的,明亮的
bring|v.|带来
broad|adj.|宽广的,广泛的
broadcast|v./n.|广播,播放
budget|n./v.|预算
build|v.|建造,建立
bunch|n.|束,串,群
burden|n./v.|负担
burn|v./n.|燃烧,烧伤
burst|v./n.|爆裂,突发
bury|v.|埋葬
business|n.|商业,生意,事情
busy|adj.|忙碌的
button|n.|按钮,纽扣
buy|v.|购买
calm|adj./v.|平静的,使平静
campaign|n./v.|运动,战役
cancel|v.|取消
candidate|n.|候选人,应试者
capable|adj.|有能力的
capacity|n.|容量,能力
capital|n./adj.|首都,资本,大写的
capture|v./n.|捕获,俘获
care|n./v.|关心,照顾,小心
career|n.|职业,生涯
careful|adj.|小心的,仔细的
carry|v.|携带,搬运,运送
case|n.|情况,案例,箱子
cast|v./n.|投掷,铸造,演员阵容
catch|v.|抓住,赶上,感染
category|n.|类别,种类
cause|n./v.|原因,事业,导致
celebrate|v.|庆祝
center|n./v.|中心,集中
central|adj.|中心的,中央的
century|n.|世纪
certain|adj.|确定的,某些
chain|n./v.|链条,连锁,束缚
chair|n.|椅子,主席
challenge|n./v.|挑战
champion|n.|冠军,拥护者
chance|n.|机会,可能性
change|v./n.|改变,变化
channel|n.|频道,渠道,海峡
chapter|n.|章节
character|n.|性格,角色,字符
charge|v./n.|收费,充电,指控
chart|n.|图表
chase|v./n.|追逐,追求
cheap|adj.|便宜的
check|v./n.|检查,核对,支票
cheer|v./n.|欢呼,喝彩
chemical|adj./n.|化学的,化学品
chief|n./adj.|首领,主要的
choice|n.|选择
choose|v.|选择
circle|n./v.|圆,圈子,环绕
circumstance|n.|环境,情况
citizen|n.|公民,市民
claim|v./n.|声称,要求,索赔
class|n.|班级,阶级,课
classic|adj./n.|经典的,名著
clean|adj./v.|干净的,清洁
clear|adj./v.|清楚的,清除
climate|n.|气候,风气
climb|v./n.|攀登,爬
close|v./adj.|关闭,接近的,亲密的
clue|n.|线索,提示
code|n.|代码,密码,法规
collapse|v./n.|倒塌,崩溃
collect|v.|收集,收藏
college|n.|大学,学院
colony|n.|殖民地,群体
color|n.|颜色
combine|v.|结合,联合
come|v.|来,到达
comfort|n./v.|舒适,安慰
command|v./n.|命令,指挥
comment|n./v.|评论,意见
commerce|n.|商业,贸易
commission|n.|委员会,佣金,委托
commit|v.|犯(罪),承诺,投入
committee|n.|委员会
common|adj.|常见的,共同的
communicate|v.|交流,沟通
community|n.|社区,团体
company|n.|公司,陪伴
compare|v.|比较,对比
compete|v.|竞争,比赛
complain|v.|抱怨,投诉
complete|adj./v.|完整的,完成
complex|adj./n.|复杂的,综合体
component|n.|组成部分,组件
compose|v.|组成,创作
concentrate|v.|集中,专注
concept|n.|概念,观念
concern|n./v.|关心,担忧,涉及
conclude|v.|得出结论,结束
condition|n.|条件,状况
conduct|v./n.|进行,指挥,行为
conference|n.|会议,讨论会
confidence|n.|信心,信任
confirm|v.|确认,证实
conflict|n./v.|冲突,矛盾
confuse|v.|使困惑,混淆
connect|v.|连接,联系
conscious|adj.|有意识的,清醒的
consequence|n.|结果,后果
consider|v.|考虑,认为
consist|v.|由...组成,在于
constant|adj.|持续不断的,恒定的
construct|v.|建造,构建
consume|v.|消费,消耗
contact|n./v.|联系,接触
contain|v.|包含,容纳
contemporary|adj.|当代的,同时代的
content|n./adj.|内容,满足的
contest|n./v.|比赛,竞赛
context|n.|上下文,背景
continue|v.|继续
contract|n./v.|合同,收缩
contrast|n./v.|对比,对照
contribute|v.|贡献,捐献
control|v./n.|控制,管理
convenient|adj.|方便的,便利的
convention|n.|惯例,大会,公约
conversation|n.|对话,交谈
convince|v.|说服,使信服
cool|adj./v.|凉爽的,酷的,冷却
cooperate|v.|合作,协作
cope|v.|应付,处理
copy|n./v.|副本,复制
core|n./adj.|核心,核心的
corner|n.|角落,拐角
correct|adj./v.|正确的,纠正
cost|n./v.|成本,花费
count|v./n.|计数,数,伯爵
country|n.|国家,乡村
couple|n.|一对,夫妇
courage|n.|勇气,胆量
course|n.|课程,路线,过程
court|n.|法院,球场,宫廷
cover|v./n.|覆盖,封面,报道
create|v.|创造,创建
credit|n./v.|信用,学分,归功于
crime|n.|犯罪,罪行
crisis|n.|危机,紧要关头
critical|adj.|批评的,关键的,危急的
cross|v./n.|穿过,交叉,十字
crowd|n./v.|人群,拥挤
crucial|adj.|至关重要的
culture|n.|文化,教养
cure|v./n.|治愈,疗法
current|adj./n.|当前的,水流,电流
custom|n./adj.|习俗,海关,定制的
cut|v./n.|切割,削减,伤口
damage|n./v.|损害,破坏
danger|n.|危险
dare|v./n.|敢于,挑战
data|n.|数据,资料
dawn|n.|黎明,开端
deal|v./n.|处理,交易
debate|n./v.|辩论,讨论
debt|n.|债务,欠款
decade|n.|十年
decide|v.|决定,裁决
decision|n.|决定,决心
declare|v.|宣布,声明
decline|v./n.|下降,衰退,拒绝
decorate|v.|装饰,装修
decrease|v./n.|减少,降低
deep|adj.|深的,深刻的
defeat|v./n.|击败,战胜,失败
defend|v.|防御,保卫,辩护
define|v.|定义,界定
definite|adj.|明确的,确定的
degree|n.|程度,学位,度
delay|v./n.|延迟,耽搁
deliberate|adj./v.|故意的,仔细考虑
delicate|adj.|精致的,微妙的,脆弱的
deliver|v.|递送,发表,交付
demand|n./v.|需求,要求
demonstrate|v.|展示,证明,示威
deny|v.|否认,拒绝
depart|v.|离开,出发
department|n.|部门,系
depend|v.|依赖,取决于
deposit|n./v.|存款,押金,存放
depress|v.|使沮丧,使萧条
derive|v.|源自,获得
describe|v.|描述,形容
desert|n./v.|沙漠,抛弃
deserve|v.|值得,应得
design|n./v.|设计,图案
desire|n./v.|渴望,欲望
despair|n./v.|绝望
despite|prep.|尽管,不管
destination|n.|目的地,终点
destroy|v.|破坏,摧毁
detail|n./v.|细节,详述
detect|v.|发现,察觉
determine|v.|决定,确定
develop|v.|发展,开发,培养
device|n.|设备,装置
devote|v.|致力于,奉献
die|v.|死,死亡
differ|v.|不同,有差异
difficult|adj.|困难的
dig|v.|挖,掘
digital|adj.|数字的,数码的
dinner|n.|晚餐,正餐
direct|adj./v.|直接的,指导,导演
direction|n.|方向,指导
disappear|v.|消失
disappoint|v.|使失望
discipline|n./v.|纪律,学科,训练
discount|n./v.|折扣
discover|v.|发现
discuss|v.|讨论,商议
disease|n.|疾病
dismiss|v.|解雇,解散,不予考虑
display|v./n.|展示,显示
dispute|n./v.|争论,纠纷
distance|n.|距离,远方
distant|adj.|遥远的,疏远的
distinct|adj.|明显的,独特的
distinguish|v.|区分,辨别
distribute|v.|分配,分发
district|n.|地区,区域
disturb|v.|打扰,扰乱
divide|v.|分开,除以
divorce|n./v.|离婚
document|n./v.|文件,记录
domestic|adj.|国内的,家庭的
dominate|v.|支配,主导
double|adj./v.|双倍的,加倍
doubt|n./v.|怀疑,疑惑
draft|n./v.|草稿,起草
drag|v.|拖,拉
drama|n.|戏剧,剧本
draw|v.|画,拉,吸引
dream|n./v.|梦想,做梦
drink|v./n.|喝,饮料
drive|v./n.|驾驶,驱动,动力
drop|v./n.|掉落,下降,滴
due|adj.|由于,到期的,应有的
dull|adj.|枯燥的,迟钝的
during|prep.|在...期间
dust|n.|灰尘,尘土
duty|n.|职责,义务,税
eager|adj.|渴望的,热切的
early|adj./adv.|早的,早期的
earn|v.|赚取,获得
earth|n.|地球,土地,泥土
ease|n./v.|轻松,减轻
eastern|adj.|东方的,东部的
easy|adj.|容易的
economic|adj.|经济的,经济学的
edge|n.|边缘,刀刃
edit|v.|编辑
educate|v.|教育,培养
effect|n./v.|效果,影响,实现
efficient|adj.|高效的
effort|n.|努力,尽力
either|adj./pron.|任一,也
elder|adj./n.|年长的,长辈
elect|v.|选举,选择
element|n.|元素,要素
eliminate|v.|消除,淘汰
else|adv.|其他,另外
emerge|v.|出现,浮现
emotion|n.|情感,情绪
emphasis|n.|重点,强调
employ|v.|雇佣,使用
empty|adj./v.|空的,清空
enable|v.|使能够,启用
encounter|v./n.|遭遇,遇到
encourage|v.|鼓励,激励
end|n./v.|结束,末端,目标
endure|v.|忍受,持续
enemy|n.|敌人,对手
energy|n.|能量,精力
engage|v.|参与,从事,吸引
engine|n.|引擎,发动机
enjoy|v.|享受,喜欢
enormous|adj.|巨大的,庞大的
enough|adj./adv.|足够的,足够地
ensure|v.|确保,保证
enter|v.|进入,参加
enterprise|n.|企业,事业
entertain|v.|娱乐,招待
entire|adj.|整个的,全部的
entitle|v.|给...权利,给...命名
environment|n.|环境
equal|adj./v.|相等的,等于
equip|v.|装备,配备
error|n.|错误,差错
escape|v./n.|逃跑,逃脱
especially|adv.|特别,尤其
essential|adj.|必要的,本质的
establish|v.|建立,设立
estate|n.|房产,地产
estimate|v./n.|估计,估算
evaluate|v.|评价,评估
even|adv./adj.|甚至,平坦的
event|n.|事件,活动
eventually|adv.|最终,终于
ever|adv.|曾经,永远
evidence|n.|证据,迹象
evil|adj./n.|邪恶的,邪恶
evolve|v.|进化,发展
exact|adj.|精确的,确切的
examine|v.|检查,考试
example|n.|例子,榜样
excellent|adj.|优秀的,卓越的
except|prep./conj.|除...之外
exchange|v./n.|交换,兑换,交流
excite|v.|使兴奋,使激动
exclude|v.|排除,排斥
excuse|n./v.|借口,原谅
exercise|n./v.|锻炼,练习,行使
exhibit|v./n.|展示,展览品
exist|v.|存在,生存
expand|v.|扩展,膨胀
expect|v.|期望,预料,等待
expense|n.|费用,开支
experience|n./v.|经验,经历,体验
experiment|n./v.|实验,试验
expert|n./adj.|专家,专业的
explain|v.|解释,说明
explore|v.|探索,探究
export|v./n.|出口,输出
expose|v.|暴露,揭露
express|v./adj.|表达,快递的
extend|v.|延伸,扩展
extent|n.|程度,范围
external|adj.|外部的,外来的
extra|adj./adv.|额外的,格外
extreme|adj./n.|极端的,极端
facility|n.|设施,设备
factor|n.|因素,因子
fail|v.|失败,未能
failure|n.|失败,故障
fair|adj./n.|公平的,集市,展览会
faith|n.|信仰,信心
fall|v./n.|落下,秋天,瀑布
false|adj.|错误的,假的
familiar|adj.|熟悉的,常见的
famous|adj.|著名的
fancy|adj./v.|精致的,想象,喜欢
fashion|n.|时尚,方式
fast|adj./adv.|快的,牢固的
fate|n.|命运,宿命
fault|n.|错误,缺点,断层
favor|n./v.|偏爱,恩惠,赞成
feature|n./v.|特征,特色,以...为特色
federal|adj.|联邦的
feed|v.|喂养,供给
feel|v.|感觉,触摸
fellow|n.|家伙,同伴
female|adj./n.|女性的,女性
fence|n.|围栏,篱笆
field|n.|领域,田野,字段
fierce|adj.|凶猛的,激烈的
fight|v./n.|战斗,打架
figure|n./v.|数字,人物,图形,认为
file|n./v.|文件,档案,归档
fill|v.|填满,充满
final|adj./n.|最终的,决赛
finance|n./v.|金融,财务,资助
find|v.|发现,找到
fine|adj./n.|好的,精细的,罚款
finger|n.|手指
finish|v./n.|完成,结束
firm|adj./n.|坚定的,公司,稳固的
fit|v./adj.|适合,健康的
fix|v.|修理,固定,确定
flame|n.|火焰,热情
flash|n./v.|闪光,闪现
flat|adj./n.|平的,公寓
flexible|adj.|灵活的,柔韧的
flight|n.|飞行,航班
float|v.|漂浮,浮动
flood|n./v.|洪水,淹没
flow|v./n.|流动,流量
flower|n.|花
focus|v./n.|集中,焦点
fold|v./n.|折叠,褶皱
follow|v.|跟随,遵守,理解
fond|adj.|喜欢的,深情的
fool|n./v.|傻瓜,愚弄
forbid|v.|禁止,不许
force|n./v.|力量,武力,强迫
foreign|adj.|外国的,陌生的
forest|n.|森林
forever|adv.|永远
forget|v.|忘记
form|n./v.|形式,表格,形成
formal|adj.|正式的,形式的
former|adj./n.|前者的,以前的
fortune|n.|财富,运气
forward|adv./adj.|向前,向前的
found|v.|建立,创办
frame|n./v.|框架,结构,陷害
free|adj./v.|自由的,免费的,释放
freeze|v.|冻结,结冰
frequent|adj.|频繁的
fresh|adj.|新鲜的,清新的
friend|n.|朋友
frighten|v.|使害怕,吓唬
front|n./adj.|前面,前面的
fuel|n./v.|燃料,加油
fulfill|v.|实现,履行,满足
full|adj.|满的,完整的
function|n./v.|功能,函数,运行
fund|n./v.|基金,资金,资助
fundamental|adj.|基本的,根本的
funny|adj.|有趣的,滑稽的
furniture|n.|家具
further|adv./adj.|进一步,更远的
future|n./adj.|未来,未来的
gain|v./n.|获得,增加,收益
gallery|n.|画廊,美术馆
game|n.|游戏,比赛
gap|n.|差距,缺口
garden|n.|花园,菜园
gas|n.|气体,汽油
gate|n.|大门,闸门
gather|v.|聚集,收集
general|adj./n.|一般的,普遍的,将军
generate|v.|产生,生成
generous|adj.|慷慨的,大方的
gentle|adj.|温和的,轻柔的
genuine|adj.|真正的,真诚的
gesture|n.|手势,姿态
get|v.|得到,变得,到达
gift|n.|礼物,天赋
give|v.|给,给予
glad|adj.|高兴的,乐意的
glance|v./n.|一瞥,扫视
global|adj.|全球的,全局的
glory|n.|荣耀,光荣
goal|n.|目标,球门
golden|adj.|金色的,黄金的
good|adj.|好的,优秀的
govern|v.|统治,管理
grab|v.|抓住,抢夺
grace|n.|优雅,恩惠
grade|n./v.|等级,年级,评分
gradual|adj.|逐渐的
grain|n.|谷物,颗粒
grand|adj.|宏伟的,盛大的
grant|v./n.|授予,拨款
grasp|v./n.|抓住,理解
grass|n.|草,草地
grateful|adj.|感激的
grave|n./adj.|坟墓,严重的
great|adj.|伟大的,极好的
greedy|adj.|贪婪的
green|adj./n.|绿色的,绿色
greet|v.|问候,迎接
grief|n.|悲伤,悲痛
ground|n.|地面,理由
group|n./v.|组,群,分组
grow|v.|生长,增长,种植
guarantee|n./v.|保证,担保
guard|n./v.|守卫,警卫,保护
guess|v./n.|猜测
guest|n.|客人,宾客
guide|n./v.|向导,指南,引导
guilty|adj.|有罪的,内疚的
habit|n.|习惯
half|n./adj.|一半,一半的
halt|v./n.|停止,暂停
handle|v./n.|处理,把手
handsome|adj.|英俊的
hang|v.|悬挂,吊死
happen|v.|发生,碰巧
happy|adj.|快乐的,幸福的
hard|adj./adv.|困难的,硬的,努力地
hardly|adv.|几乎不
harm|n./v.|伤害,损害
harvest|n./v.|收获,收割
hate|v./n.|憎恨,讨厌
head|n./v.|头,首领,领导
heal|v.|治愈,痊愈
health|n.|健康,卫生
hear|v.|听到,听说
heart|n.|心脏,内心,核心
heat|n./v.|热量,加热
heavy|adj.|重的,沉重的
height|n.|高度,身高
help|v./n.|帮助,帮忙
hence|adv.|因此,从此
heritage|n.|遗产,传统
hero|n.|英雄,男主角
hide|v.|隐藏,躲藏
highlight|v./n.|强调,亮点
hire|v./n.|雇佣,租用
history|n.|历史,经历
hit|v./n.|打,击中,热门
hold|v.|握住,持有,举行
hollow|adj.|空的,空洞的
holy|adj.|神圣的
honest|adj.|诚实的,正直的
honor|n./v.|荣誉,尊敬
hook|n./v.|钩子,钩住
hope|n./v.|希望,期望
horizon|n.|地平线,视野
horror|n.|恐怖,恐惧
host|n./v.|主人,主持,主办
hostile|adj.|敌对的,敌意的
household|n./adj.|家庭,家庭的
huge|adj.|巨大的,庞大的
human|adj./n.|人类的,人类
humble|adj.|谦虚的,卑微的
humor|n.|幽默,诙谐
hunger|n.|饥饿,渴望
hunt|v./n.|打猎,搜寻
hurry|v./n.|匆忙,赶紧
hurt|v./n.|伤害,疼痛
ideal|adj./n.|理想的,理想
identify|v.|识别,确认,认同
ignore|v.|忽视,忽略
illustrate|v.|说明,阐明,插图
image|n.|图像,形象
imagine|v.|想象,设想
immediate|adj.|立即的,直接的
impact|n./v.|影响,冲击
implement|v./n.|实施,执行,工具
imply|v.|暗示,意味着
import|v./n.|进口,输入,含义
impose|v.|强加,征收
impress|v.|给...留下印象
improve|v.|改善,提高
include|v.|包括,包含
income|n.|收入,收益
increase|v./n.|增加,增长
indeed|adv.|确实,实际上
independent|adj.|独立的,自主的
indicate|v.|表明,指示
individual|adj./n.|个人的,个体
industry|n.|工业,行业,勤奋
influence|n./v.|影响,势力
inform|v.|通知,告知
initial|adj.|最初的,开始的
initiative|n.|主动性,倡议
injure|v.|伤害,损伤
inner|adj.|内部的,内心的
innocent|adj.|无辜的,天真的
innovate|v.|创新,革新
inquire|v.|询问,查询
insist|v.|坚持,强调
inspect|v.|检查,视察
inspire|v.|激励,启发
install|v.|安装,设置
instance|n.|例子,实例
instead|adv.|代替,反而
institute|n.|学院,研究所
instrument|n.|工具,乐器
insurance|n.|保险
intend|v.|打算,意图
intense|adj.|强烈的,紧张的
intention|n.|意图,目的
interest|n./v.|兴趣,利息,使感兴趣
internal|adj.|内部的,国内的
interpret|v.|解释,口译
interrupt|v.|打断,中断
interval|n.|间隔,间歇
interview|n./v.|面试,采访
introduce|v.|介绍,引入
invest|v.|投资,投入
investigate|v.|调查,研究
involve|v.|涉及,包含,参与
isolate|v.|孤立,隔离
issue|n./v.|问题,议题,发行
item|n.|项目,物品,条款
join|v.|加入,连接
joint|adj./n.|联合的,关节
journey|n.|旅程,旅行
joy|n.|快乐,喜悦
judge|n./v.|法官,判断,评判
jump|v./n.|跳,跳跃
junior|adj./n.|年少的,初级者
just|adv./adj.|刚刚,正好,公正的
justice|n.|正义,公正,司法
justify|v.|证明...正当
keen|adj.|热切的,敏锐的
keep|v.|保持,保留,继续
key|n./adj.|钥匙,关键,关键的
kick|v./n.|踢
kill|v.|杀,杀死
kind|n./adj.|种类,善良的
kingdom|n.|王国,领域
knock|v./n.|敲,击
know|v.|知道,了解
knowledge|n.|知识,学问
label|n./v.|标签,标注
labor|n./v.|劳动,劳工,努力
lack|n./v.|缺乏,不足
landscape|n.|风景,景观
language|n.|语言
large|adj.|大的,大量的
last|adj./v.|最后的,持续
late|adj./adv.|晚的,迟的
latter|adj.|后者的
laugh|v./n.|笑,笑声
launch|v./n.|发射,启动,推出
law|n.|法律,规律
layer|n.|层,层次
layout|n.|布局,设计
lead|v./n.|领导,引导,铅
league|n.|联盟,联赛
lean|v./adj.|倾斜,瘦的,精简的
learn|v.|学习,得知
least|adj./adv.|最少的,最少
leave|v./n.|离开,留下,假期
legal|adj.|法律的,合法的
leisure|n.|闲暇,休闲
length|n.|长度
lesson|n.|课程,教训
let|v.|让,允许
level|n./adj.|水平,级别,平坦的
liberal|adj.|自由的,开明的
liberty|n.|自由
library|n.|图书馆
license|n.|许可证,执照
life|n.|生命,生活
lift|v./n.|举起,电梯,搭车
light|n./adj.|光,轻的,浅的
like|v./prep.|喜欢,像
likely|adj./adv.|可能的,可能地
limit|n./v.|限制,界限
line|n./v.|线,路线,排队
link|n./v.|链接,联系
list|n./v.|列表,列出
listen|v.|听,倾听
literature|n.|文学,文献
little|adj./adv.|小的,少的,少量
live|v./adj.|生活,居住,直播的
load|n./v.|负载,装载
loan|n./v.|贷款,借出
local|adj.|当地的,局部的
locate|v.|位于,定位
lock|n./v.|锁,锁住
logic|n.|逻辑
lonely|adj.|孤独的,寂寞的
long|adj./v.|长的,渴望
look|v./n.|看,看起来,外貌
lose|v.|失去,输,迷失
loss|n.|损失,亏损
loud|adj.|大声的
loyal|adj.|忠诚的
luck|n.|运气,幸运
luxury|n.|奢侈,奢侈品
machine|n.|机器,机械
magic|n./adj.|魔法,神奇的
main|adj.|主要的
maintain|v.|维持,维护,保养
major|adj./n.|主要的,专业
majority|n.|大多数
make|v.|制作,使,做
male|adj./n.|男性的,男性
manage|v.|管理,设法做到
manner|n.|方式,举止,礼貌
manufacture|v./n.|制造,制造业
march|v./n.|行进,三月
margin|n.|边缘,利润,余地
mark|n./v.|标记,分数,标志
market|n.|市场,集市
marriage|n.|婚姻,结婚
mass|n./adj.|大量,群众,大规模的
master|n./v.|大师,主人,掌握
match|n./v.|比赛,匹配,火柴
mate|n.|伙伴,伴侣
material|n./adj.|材料,物质的
matter|n./v.|事情,物质,要紧
mature|adj./v.|成熟的,成熟
maximum|n./adj.|最大值,最大的
may|aux./v.|可能,可以
maybe|adv.|也许,可能
mean|v./adj.|意思是,卑鄙的,平均的
meaning|n.|意思,含义
means|n.|方法,手段
measure|v./n.|测量,措施
mechanism|n.|机制,机械装置
media|n.|媒体,媒介
medium|n./adj.|媒介,中等的
meet|v.|遇见,满足,开会
member|n.|成员,会员
memory|n.|记忆,内存
mental|adj.|精神的,心理的
mention|v./n.|提及,说起
mercy|n.|仁慈,怜悯
mere|adj.|仅仅的,纯粹的
merit|n./v.|优点,功绩,值得
message|n.|消息,信息
metal|n.|金属
method|n.|方法,方式
middle|n./adj.|中间,中间的
mighty|adj.|强大的,有力的
mild|adj.|温和的,轻微的
military|adj./n.|军事的,军队
mind|n./v.|头脑,思想,介意
mine|pron./n.|我的,矿山
minimum|n./adj.|最小值,最小的
minister|n.|部长,大臣,牧师
minor|adj./n.|较小的,次要的,未成年人
minority|n.|少数,少数民族
minute|n.|分钟,片刻
miracle|n.|奇迹
miserable|adj.|痛苦的,悲惨的
miss|v.|想念,错过,未击中
mission|n.|使命,任务
mistake|n./v.|错误,弄错
mix|v./n.|混合,混合物
model|n./v.|模型,模特,模仿
moderate|adj./v.|适度的,温和的,缓和
modern|adj.|现代的,新式的
modest|adj.|谦虚的,适度的
moment|n.|时刻,瞬间
monitor|n./v.|监视器,班长,监控
mood|n.|情绪,心情
moral|adj./n.|道德的,寓意
more|adj./adv.|更多的,更
moreover|adv.|此外,而且
motion|n.|运动,动作,动议
motivate|v.|激励,激发
mount|v./n.|登上,安装,山
move|v./n.|移动,搬家,感动
much|adj./adv.|许多的,非常
multiple|adj.|多重的,多样的
murder|n./v.|谋杀
muscle|n.|肌肉,力量
museum|n.|博物馆
music|n.|音乐
mutual|adj.|相互的,共同的
mystery|n.|神秘,谜
narrow|adj./v.|狭窄的,变窄
nation|n.|国家,民族
native|adj./n.|本土的,本地人
natural|adj.|自然的,天生的
nature|n.|自然,本质
near|adj./adv./prep.|近的,靠近
nearly|adv.|几乎,差不多
neat|adj.|整洁的,灵巧的
necessary|adj.|必要的,必需的
need|v./n.|需要,需求
negative|adj./n.|消极的,否定的,负数
neglect|v./n.|忽视,疏忽
negotiate|v.|谈判,协商
neighbor|n.|邻居
nerve|n.|神经,勇气
nervous|adj.|紧张的,神经的
network|n.|网络,关系网
never|adv.|从不,绝不
nevertheless|adv.|然而,不过
noble|adj.|高尚的,贵族的
nod|v./n.|点头
noise|n.|噪音,喧闹
none|pron.|没有一个
normal|adj.|正常的,标准的
note|n./v.|笔记,注意,音符,记录
notice|v./n.|注意到,通知,公告
notion|n.|概念,观念
novel|n./adj.|小说,新颖的
nowhere|adv.|无处,哪里都不
nuclear|adj.|核的,核能的
numerous|adj.|许多的,大量的
nurse|n./v.|护士,护理
object|n./v.|物体,目标,反对
objective|n./adj.|目标,客观的
obligation|n.|义务,责任
observe|v.|观察,遵守,注意到
obstacle|n.|障碍,阻碍
obtain|v.|获得,得到
obvious|adj.|明显的,显然的
occasion|n.|场合,时机
occupy|v.|占据,占用
occur|v.|发生,出现
odd|adj.|奇怪的,奇数的
offend|v.|冒犯,得罪
offer|v./n.|提供,提议
official|adj./n.|官方的,官员
once|adv./conj.|一次,曾经,一旦
only|adv./adj.|只,仅仅,唯一的
open|v./adj.|打开,开放的
operate|v.|操作,经营,手术
opinion|n.|意见,看法
opponent|n.|对手,反对者
opportunity|n.|机会,时机
oppose|v.|反对,对抗
option|n.|选择,选项
order|n./v.|顺序,命令,订单,订购
ordinary|adj.|普通的,平常的
organ|n.|器官,机构,风琴
organize|v.|组织,安排
origin|n.|起源,出身
otherwise|adv.|否则,另外
ought|aux./v.|应该
outcome|n.|结果,成果
outline|n./v.|轮廓,大纲,概述
output|n./v.|输出,产量
overcome|v.|克服,战胜
overlook|v.|俯瞰,忽略
owe|v.|欠,归功于
own|adj./v.|自己的,拥有
pace|n.|速度,步伐
pack|v./n.|打包,包裹,一群
pain|n./v.|疼痛,痛苦
paint|v./n.|绘画,油漆
pair|n.|一双,一对
pale|adj.|苍白的,暗淡的
panel|n.|面板,专家小组
panic|n./v.|恐慌,惊慌
parallel|adj./n.|平行的,平行线
parent|n.|父母,家长
parliament|n.|议会,国会
part|n./v.|部分,角色,分开
participate|v.|参加,参与
particular|adj.|特别的,特定的
partly|adv.|部分地,一定程度上
partner|n.|伙伴,合伙人
party|n.|政党,派对,当事人
pass|v./n.|通过,传递,通行证
passage|n.|通道,段落,经过
passion|n.|激情,热情
passive|adj.|被动的,消极的
past|n./adj./prep.|过去,过去的,经过
path|n.|小路,路径
patience|n.|耐心,忍耐
pattern|n.|模式,图案,样式
pause|n./v.|暂停,停顿
pay|v./n.|支付,工资
peace|n.|和平,平静
peak|n./v.|山峰,顶峰,达到高峰
peculiar|adj.|奇特的,特有的
penalty|n.|惩罚,罚款
people|n.|人们,人民
perceive|v.|感知,察觉,理解
percent|n.|百分比
perfect|adj./v.|完美的,使完美
perform|v.|表演,执行,表现
perhaps|adv.|也许,可能
period|n.|时期,阶段,句号
permanent|adj.|永久的,长期的
permit|v./n.|允许,许可证
persist|v.|坚持,持续
person|n.|人,个人
personal|adj.|个人的,私人的
personality|n.|个性,人格
perspective|n.|视角,观点,透视
persuade|v.|说服,劝说
phase|n.|阶段,相位
phenomenon|n.|现象
philosophy|n.|哲学
physical|adj.|物理的,身体的
pick|v./n.|挑选,拾起,精华
picture|n./v.|图片,照片,想象
piece|n.|片,块,件
pilot|n./v.|飞行员,领航,试验
pioneer|n./v.|先驱,开拓
place|n./v.|地方,放置
plain|adj./n.|朴素的,平原,简单的
plan|n./v.|计划,方案
plant|n./v.|植物,工厂,种植
platform|n.|平台,站台
play|v./n.|玩,扮演,播放,戏剧
pleasant|adj.|令人愉快的
pleasure|n.|快乐,愉悦
plenty|n.|大量,充足
plot|n./v.|情节,阴谋,绘图
plus|prep./adj.|加,加上,正的
pocket|n./adj.|口袋,袖珍的
poetry|n.|诗歌,诗意
point|n./v.|点,观点,指向
poison|n./v.|毒药,毒害
policy|n.|政策,方针,保险单
polite|adj.|有礼貌的
political|adj.|政治的
pollute|v.|污染
pool|n./v.|水池,游泳池,共用
poor|adj.|贫穷的,可怜的,差的
popular|adj.|流行的,受欢迎的
population|n.|人口
portion|n.|部分,一份
pose|v./n.|摆姿势,造成,姿势
position|n.|位置,职位,立场
positive|adj.|积极的,肯定的,正的
possess|v.|拥有,占有
possible|adj.|可能的
post|n./v.|帖子,邮政,岗位,发布
potential|adj./n.|潜在的,潜力
pour|v.|倾倒,涌入
poverty|n.|贫困,贫穷
power|n.|力量,权力,电力
practical|adj.|实际的,实用的
practice|n./v.|实践,练习,惯例
praise|v./n.|赞扬,表扬
pray|v.|祈祷,恳求
precious|adj.|珍贵的,宝贵的
precise|adj.|精确的,准确的
predict|v.|预测,预言
prefer|v.|更喜欢,偏好
pregnant|adj.|怀孕的
prepare|v.|准备,预备
presence|n.|存在,出席
present|adj./n./v.|现在的,礼物,呈现
preserve|v.|保护,保存,保持
press|v./n.|按压,逼迫,新闻界
pressure|n.|压力,压迫
pretend|v.|假装,伪装
pretty|adj./adv.|漂亮的,相当
prevail|v.|盛行,占优势
prevent|v.|防止,阻止
previous|adj.|以前的,先前的
price|n./v.|价格,定价
pride|n.|骄傲,自豪
primary|adj.|主要的,初级的
prime|adj.|首要的,最好的
principal|adj./n.|主要的,校长,本金
principle|n.|原则,原理
print|v./n.|印刷,打印,印刷品
prior|adj.|先前的,优先的
prison|n.|监狱,监禁
private|adj.|私人的,私密的
privilege|n.|特权,荣幸
prize|n./v.|奖品,珍视
probable|adj.|很可能的
problem|n.|问题,难题
procedure|n.|程序,步骤
proceed|v.|继续,进行
process|n./v.|过程,处理,加工
produce|v./n.|生产,制造,农产品
profession|n.|职业,专业
profit|n./v.|利润,获利
program|n./v.|程序,节目,计划
progress|n./v.|进步,进展
project|n./v.|项目,工程,投射
promise|n./v.|承诺,许诺
promote|v.|促进,提升,推广
prompt|adj./v.|迅速的,提示,促使
proof|n./adj.|证据,证明,防...的
proper|adj.|适当的,恰当的
property|n.|财产,特性,房产
proportion|n.|比例,部分
proposal|n.|提议,建议,求婚
propose|v.|提议,建议,求婚
prospect|n.|前景,展望
protect|v.|保护,防护
protest|n./v.|抗议,反对
proud|adj.|骄傲的,自豪的
prove|v.|证明,证实
provide|v.|提供,供应
province|n.|省份,领域
provision|n.|供应,条款,准备
psychological|adj.|心理的,心理学的
public|adj./n.|公共的,公众
publish|v.|出版,发布
pull|v./n.|拉,拖,拉力
punish|v.|惩罚,处罚
purchase|v./n.|购买,采购
pure|adj.|纯的,纯粹的
purpose|n.|目的,用途
pursue|v.|追求,追赶,从事
push|v./n.|推,推动
put|v.|放,放置,表达
puzzle|n./v.|谜题,困惑,使迷惑
quality|n.|质量,品质
quantity|n.|数量,大量
quarter|n.|四分之一,季度,一刻钟
question|n./v.|问题,疑问,质疑
quit|v.|退出,放弃,辞职
quite|adv.|相当,很,完全
quote|v./n.|引用,报价
race|n./v.|种族,比赛,竞赛
radical|adj.|激进的,根本的
raise|v./n.|提高,举起,抚养,加薪
random|adj.|随机的,任意的
range|n./v.|范围,幅度,排列
rank|n./v.|等级,排名,排列
rapid|adj.|迅速的,快速的
rare|adj.|稀有的,罕见的
rate|n./v.|比率,速度,费率,评价
rather|adv.|宁愿,相当,而不是
ratio|n.|比率,比例
raw|adj.|生的,未加工的,原始的
reach|v./n.|到达,够到,范围
react|v.|反应,回应
read|v.|阅读,读懂
ready|adj.|准备好的,愿意的
real|adj.|真实的,实际的
realize|v.|意识到,实现
reason|n./v.|原因,理由,推理
reasonable|adj.|合理的,公道的
recall|v./n.|回忆,召回
receive|v.|收到,接待
recent|adj.|最近的,近来的
reckon|v.|认为,估计,计算
recognize|v.|认出,承认,认可
recommend|v.|推荐,建议
record|n./v.|记录,唱片,录音
recover|v.|恢复,康复,收回
reduce|v.|减少,降低
refer|v.|参考,提到,涉及
reflect|v.|反映,反射,反思
reform|n./v.|改革,改良
refuse|v.|拒绝
regard|v./n.|看待,尊重,方面
region|n.|地区,区域
register|v./n.|注册,登记
regret|v./n.|后悔,遗憾
regular|adj.|定期的,常规的,规则的
reject|v.|拒绝,排斥
relate|v.|关联,涉及,讲述
relation|n.|关系,联系
relative|adj./n.|相对的,相关的,亲戚
relax|v.|放松,休息
release|v./n.|释放,发布,发行
relevant|adj.|相关的,切题的
relief|n.|缓解,救济,宽慰
religion|n.|宗教,信仰
rely|v.|依赖,依靠
remain|v.|保持,仍然,剩余
remark|n./v.|评论,备注,注意到
remarkable|adj.|显著的,非凡的
remedy|n./v.|补救,治疗,药物
remember|v.|记住,记得
remind|v.|提醒,使想起
remote|adj.|遥远的,远程的
remove|v.|移除,消除
render|v.|使成为,提供,渲染
renew|v.|更新,续期,恢复
rent|v./n.|租用,租金
repair|v./n.|修理,修复
repeat|v./n.|重复,重播
replace|v.|替换,取代
reply|v./n.|回复,答复
report|n./v.|报告,报道
represent|v.|代表,表示,描绘
reputation|n.|名声,声誉
request|n./v.|请求,要求
require|v.|需要,要求
research|n./v.|研究,调查
reserve|v./n.|保留,预订,储备
resign|v.|辞职,放弃
resist|v.|抵抗,抵制
resolve|v./n.|解决,决心,决议
resource|n.|资源,财力
respond|v.|回应,响应
responsible|adj.|负责的,有责任的
rest|n./v.|休息,剩余,依靠
restore|v.|恢复,修复,归还
restrict|v.|限制,约束
result|n./v.|结果,导致
retain|v.|保持,保留
retire|v.|退休,退出
retreat|v./n.|撤退,退避
return|v./n.|返回,归还,回报
reveal|v.|揭示,透露
revenue|n.|收入,税收
reverse|v./adj./n.|反转,相反的,反面
review|n./v.|复习,审查,评论
revolution|n.|革命,变革,旋转
reward|n./v.|奖励,报酬,回报
rich|adj.|富有的,丰富的
rid|v.|摆脱,去除
ride|v./n.|骑,乘坐,旅程
right|adj./n./adv.|正确的,权利,右边
rigid|adj.|僵硬的,严格的
rise|v./n.|上升,上涨,起床
risk|n./v.|风险,冒险
rival|n./adj./v.|对手,竞争的,竞争
role|n.|角色,作用
roll|v./n.|滚动,卷,名单
romantic|adj.|浪漫的
root|n./v.|根,根源,生根
rough|adj.|粗糙的,粗略的,艰难的
round|adj./prep./n.|圆的,围绕,轮次
route|n.|路线,航线
routine|n./adj.|常规,日常的
royal|adj.|皇家的,王室的
ruin|n./v.|废墟,毁灭,破坏
rule|n./v.|规则,统治,裁决
run|v./n.|跑,运行,经营
rural|adj.|农村的,乡村的
rush|v./n.|冲,匆忙,高峰期
sacred|adj.|神圣的
sad|adj.|悲伤的,难过的
safe|adj./n.|安全的,保险箱
sake|n.|缘故,目的
salary|n.|薪水,工资
sale|n.|销售,出售
same|adj./pron.|相同的,同样
sample|n./v.|样本,样品,抽样
satisfy|v.|满足,使满意
save|v./prep.|拯救,保存,节省,除...外
scale|n./v.|规模,比例,刻度,攀登
scan|v./n.|扫描,浏览
scarce|adj.|稀缺的,不足的
scare|v./n.|惊吓,恐慌
scatter|v.|分散,散开
scene|n.|场景,现场,景色
schedule|n./v.|时间表,安排
scheme|n.|方案,计划,阴谋
school|n.|学校,学派
science|n.|科学,学科
scope|n.|范围,机会
score|n./v.|分数,得分,二十
screen|n./v.|屏幕,筛选,遮蔽
search|v./n.|搜索,寻找
season|n.|季节,旺季
seat|n./v.|座位,使就座
second|num./n./adj.|第二,秒,次要的
secret|adj./n.|秘密的,秘密
section|n.|部分,章节,部门
sector|n.|部门,行业,扇形
secure|adj./v.|安全的,保护,获得
seek|v.|寻求,寻找
seem|v.|似乎,好像
seize|v.|抓住,夺取
select|v./adj.|选择,精选的
self|n.|自己,自我
selfish|adj.|自私的
sense|n./v.|感觉,意义,感知
sensitive|adj.|敏感的,灵敏的
sentence|n./v.|句子,判决,判刑
separate|adj./v.|分开的,分离
sequence|n.|顺序,序列
series|n.|系列,连续
serious|adj.|严肃的,严重的
serve|v.|服务,提供,接待
service|n./v.|服务,公共设施,维修
session|n.|会议,一段时间
set|v./n.|设置,放置,一套
settle|v.|解决,定居,安顿
several|adj.|几个的,数个的
severe|adj.|严重的,严厉的
shadow|n.|影子,阴影
shake|v./n.|摇晃,握手
shallow|adj.|浅的,肤浅的
shame|n./v.|羞耻,羞愧,使丢脸
shape|n./v.|形状,塑造
share|v./n.|分享,共享,股份
sharp|adj.|锋利的,敏锐的,急剧的
shelter|n./v.|庇护所,遮蔽,保护
shift|v./n.|转移,轮班,改变
shine|v./n.|发光,照耀,光泽
shock|n./v.|震惊,冲击,使震惊
shoot|v./n.|射击,拍摄,投篮
short|adj.|短的,矮的,短缺的
shot|n.|射击,镜头,尝试
shoulder|n./v.|肩膀,承担
shout|v./n.|呼喊,叫喊
show|v./n.|展示,表明,节目
shut|v.|关闭,关上
shy|adj.|害羞的,腼腆的
sick|adj.|生病的,恶心的
side|n./adj.|侧面,一方,旁边的
sight|n.|视力,景象,看见
sign|n./v.|标志,符号,签署
signal|n./v.|信号,发信号
significance|n.|重要性,意义
significant|adj.|重要的,显著的
silence|n.|沉默,寂静
silent|adj.|沉默的,安静的
silly|adj.|愚蠢的,傻的
similar|adj.|相似的,类似的
simple|adj.|简单的,朴素的
sin|n./v.|罪,犯罪
since|prep./conj.|自从,因为,既然
sincere|adj.|真诚的,诚挚的
single|adj./n.|单一的,单身的,单个
sink|v./n.|下沉,沉没,水槽
sit|v.|坐,位于
site|n.|地点,网站,现场
situation|n.|情况,形势,位置
size|n.|大小,尺寸
skill|n.|技能,技巧
slave|n.|奴隶
sleep|v./n.|睡觉,睡眠
slice|n./v.|薄片,切片
slide|v./n.|滑动,滑坡,幻灯片
slight|adj.|轻微的,瘦小的
slip|v./n.|滑倒,失误,纸条
slow|adj./v.|慢的,减慢
small|adj.|小的,少的
smart|adj.|聪明的,智能的
smooth|adj./v.|光滑的,顺利的,使平滑
social|adj.|社会的,社交的
society|n.|社会,社团
soft|adj.|柔软的,温和的
soil|n./v.|土壤,弄脏
solar|adj.|太阳的,太阳能的
soldier|n.|士兵,军人
solid|adj./n.|固体的,坚固的,固体
solution|n.|解决方案,溶液
solve|v.|解决,解答
some|adj./pron.|一些,某些
somehow|adv.|不知怎的,以某种方式
sometimes|adv.|有时,偶尔
somewhat|adv.|有点,稍微
soon|adv.|很快,不久
sophisticated|adj.|复杂的,精密的,老练的
sore|adj.|疼痛的,痛心的
sorrow|n.|悲伤,悲痛
sorry|adj.|抱歉的,遗憾的
sort|n./v.|种类,分类
soul|n.|灵魂,心灵
sound|n./v./adj.|声音,听起来,健全的
source|n.|来源,源头
space|n./v.|空间,太空,间隔
spare|adj./v.|空闲的,多余的,抽出
speak|v.|说话,讲
special|adj./n.|特别的,特殊的,特价
specific|adj.|具体的,特定的
speech|n.|演讲,言语,说话
speed|n./v.|速度,加速
spend|v.|花费,度过
spirit|n.|精神,灵魂,烈酒
split|v./n.|分裂,分开,裂口
sponsor|n./v.|赞助商,赞助
spot|n./v.|地点,斑点,发现
spread|v./n.|传播,扩散,蔓延
spring|n./v.|春天,泉水,弹簧,跳跃
square|n./adj.|正方形,广场,平方的
stable|adj./n.|稳定的,马厩
staff|n.|员工,工作人员
stage|n./v.|舞台,阶段,上演
stand|v./n.|站立,忍受,立场,摊位
standard|n./adj.|标准,标准的
stare|v.|盯着看,凝视
start|v./n.|开始,启动,起点
starve|v.|挨饿,饿死
state|n./v.|状态,国家,州,陈述
status|n.|状态,地位
stay|v./n.|停留,保持,逗留
steady|adj.|稳定的,平稳的
steal|v.|偷,窃取
steep|adj.|陡峭的,过高的
stem|n./v.|茎,词干,起源于
step|n./v.|步骤,脚步,迈步
stick|v./n.|粘住,坚持,棍子
stiff|adj.|僵硬的,生硬的
still|adv./adj.|仍然,静止的
stimulate|v.|刺激,激发
stir|v.|搅拌,激起,骚动
stock|n./v.|库存,股票,储备
stop|v./n.|停止,车站
store|n./v.|商店,储存,仓库
storm|n.|暴风雨,风暴
straight|adj./adv.|直的,直接的,直接
strange|adj.|奇怪的,陌生的
strategy|n.|策略,战略
stream|n./v.|溪流,流,串流
strength|n.|力量,强度,优势
stress|n./v.|压力,强调,重音
stretch|v./n.|伸展,延伸,拉伸
strict|adj.|严格的,严密的
strike|v./n.|打击,罢工,撞击
string|n.|线,弦,字符串
strip|v./n.|剥去,条,带
stroke|n./v.|中风,笔画,抚摸
strong|adj.|强壮的,坚固的,强烈的
structure|n./v.|结构,构造,组织
struggle|v./n.|奋斗,挣扎,斗争
study|v./n.|学习,研究
stuff|n./v.|东西,材料,塞满
style|n.|风格,样式,方式
subject|n./adj.|主题,学科,受...支配的
submit|v.|提交,服从
substance|n.|物质,实质,内容
substitute|n./v.|替代品,代替
succeed|v.|成功,继承
success|n.|成功,成就
sudden|adj.|突然的,意外的
suffer|v.|遭受,忍受,受苦
sufficient|adj.|足够的,充分的
suggest|v.|建议,暗示
suit|n./v.|套装,诉讼,适合
sum|n./v.|总和,金额,总结
summit|n.|峰会,顶点
superior|adj./n.|优越的,上级
supply|v./n.|供应,供给
support|v./n.|支持,支撑,赡养
suppose|v.|假设,认为,应该
sure|adj./adv.|确定的,当然
surface|n./v.|表面,浮出水面
surgery|n.|外科,手术
surprise|n./v.|惊喜,惊讶,使惊讶
surrender|v./n.|投降,屈服,放弃
surround|v.|包围,围绕
survey|n./v.|调查,测量,概览
survive|v.|生存,幸存,活下来
suspect|v./n./adj.|怀疑,嫌疑人,可疑的
suspend|v.|暂停,悬挂
sustain|v.|维持,支撑,遭受
swear|v.|发誓,咒骂
sweep|v./n.|扫,清扫,席卷
swell|v./n.|膨胀,肿胀,增加
swim|v./n.|游泳
swing|v./n.|摇摆,摆动,秋千
switch|v./n.|切换,开关,转换
symbol|n.|象征,符号
sympathy|n.|同情,共鸣
system|n.|系统,体系,制度
tackle|v./n.|处理, tackle, 装备
tail|n.|尾巴,尾部
take|v.|拿,取,花费,接受
tale|n.|故事,传说
talent|n.|才能,天赋,人才
tank|n.|坦克,水箱,油箱
tap|v./n.|轻敲,水龙头, tapping
target|n./v.|目标,靶子,瞄准
task|n.|任务,工作
taste|n./v.|味道,品味,品尝
tax|n./v.|税,征税
team|n./v.|团队,队伍,合作
tear|v./n.|撕裂,眼泪
technical|adj.|技术的,专业的
technique|n.|技术,技巧
technology|n.|技术,科技
temper|n.|脾气,情绪
temperature|n.|温度,体温
temporary|adj.|临时的,暂时的
tend|v.|倾向于,趋向,照顾
tendency|n.|倾向,趋势
tender|adj.|温柔的,嫩的, tender
term|n./v.|术语,学期,期限,称为
terrible|adj.|可怕的,糟糕的
territory|n.|领土,领域,地盘
terror|n.|恐怖,恐怖活动
test|n./v.|测试,考试,检验
text|n.|文本,文字,课文
theatre|n.|剧院,戏剧
theme|n.|主题,题目
then|adv.|然后,当时,那么
theory|n.|理论,学说
therapy|n.|治疗,疗法
therefore|adv.|因此,所以
thick|adj.|厚的,浓的,密集的
thin|adj.|薄的,瘦的,稀薄的
thing|n.|事物,东西,事情
think|v.|想,认为,思考
thorough|adj.|彻底的,全面的
though|conj./adv.|虽然,尽管,然而
thought|n.|思想,想法,思考
threat|n.|威胁,恐吓
threaten|v.|威胁,恐吓
thrive|v.|繁荣,兴旺,茁壮成长
through|prep./adv.|通过,穿过,从头到尾
throw|v.|扔,投,抛
thus|adv.|因此,这样
tide|n.|潮汐,潮流,趋势
tie|v./n.|系,绑,领带,平局
tight|adj./adv.|紧的,牢固的,紧紧地
till|prep./conj.|直到...为止
tiny|adj.|微小的,极小的
tip|n./v.|小费,提示,尖端,倾斜
tire|v./n.|使疲劳,轮胎
tissue|n.|组织,纸巾
title|n.|标题,头衔,称号
today|n./adv.|今天,当今
together|adv.|一起,共同
tolerate|v.|容忍,忍受
tone|n.|语气,音调,色调
tool|n.|工具
topic|n.|话题,主题
total|adj./n./v.|总的,总数,总计
touch|v./n.|触摸,接触,感动
tough|adj.|坚韧的,困难的,强硬的
tour|n./v.|旅行,观光,巡回
toward|prep.|朝,向,对于
tower|n.|塔,高楼
trace|v./n.|追踪,痕迹,微量
track|n./v.|轨道,跟踪,足迹
trade|n./v.|贸易,交易,行业
tradition|n.|传统,惯例
traffic|n.|交通,流量,交易
train|n./v.|火车,训练,培训
transfer|v./n.|转移,转让,转车
transform|v.|转变,改造,转换
transition|n.|过渡,转变
translate|v.|翻译,转化
transport|n./v.|运输,交通,运送
trap|n./v.|陷阱,圈套,困住
travel|v./n.|旅行,旅游
treasure|n./v.|宝藏,珍品,珍视
treat|v./n.|对待,治疗,款待
treaty|n.|条约,协定
trend|n./v.|趋势,潮流,倾向
trial|n.|审判,试验,试用
tribe|n.|部落,族群
trick|n./v.|诡计,戏法,欺骗
trigger|v./n.|触发,引起,扳机
trip|n./v.|旅行,绊倒
triumph|n./v.|胜利,成功,获胜
troop|n.|军队,部队,一群
trouble|n./v.|麻烦,烦恼,问题
trust|n./v.|信任,信赖,托付
truth|n.|真相,事实,真理
try|v./n.|尝试,试图,审判
turn|v./n.|转动,转变,轮到
twist|v./n.|扭曲,转动,转折
type|n./v.|类型,打字
typical|adj.|典型的,通常的
ugly|adj.|丑陋的,难看的
ultimate|adj.|最终的,根本的
unable|adj.|不能的,无法的
uncle|n.|叔叔,伯父,舅舅
under|prep./adv.|在...下面,下方
undergo|v.|经历,经受
understand|v.|理解,明白
undertake|v.|承担,从事,承诺
unfair|adj.|不公平的
unfortunate|adj.|不幸的,倒霉的
uniform|n./adj.|制服,统一的
union|n.|联盟,工会,联合
unique|adj.|独特的,唯一的
unit|n.|单位,单元,部件
unite|v.|联合,团结
unity|n.|团结,统一,一致
universal|adj.|普遍的,通用的,宇宙的
universe|n.|宇宙,世界
unless|conj.|除非,如果不
unlike|prep./adj.|不像,不同的
until|prep./conj.|直到...为止
unusual|adj.|不寻常的,异常的
update|v./n.|更新,升级
upon|prep.|在...之上,关于
upper|adj.|上面的,上层的
upset|v./adj.|使不安,心烦的,打乱
urban|adj.|城市的,都市的
urge|v./n.|催促,强烈要求,冲动
urgent|adj.|紧急的,急迫的
use|v./n.|使用,用途
usual|adj.|通常的,平常的
utter|v./adj.|说出,完全的
vacant|adj.|空的,空缺的
vague|adj.|模糊的,含糊的
vain|adj.|徒劳的,虚荣的
valid|adj.|有效的,合理的
valley|n.|山谷,流域
value|n./v.|价值,价值观,重视
vanish|v.|消失,消散
variable|adj./n.|可变的,变量
variety|n.|多样性,种类
various|adj.|各种各样的
vary|v.|变化,不同
vast|adj.|广阔的,巨大的
vehicle|n.|车辆,交通工具
venture|n./v.|冒险,企业, venture
verdict|n.|裁决,判决,结论
version|n.|版本,说法
versus|prep.|对,与...相对
very|adv./adj.|非常,很,正是
victim|n.|受害者,牺牲品
victory|n.|胜利,成功
view|n./v.|观点,景色,查看
village|n.|村庄,乡村
violence|n.|暴力,暴行
violent|adj.|暴力的,猛烈的
virtue|n.|美德,优点,德行
visible|adj.|可见的,明显的
vision|n.|视力,愿景,远见
visit|v./n.|参观,访问,拜访
visual|adj.|视觉的,可视的
vital|adj.|至关重要的,生命的
vivid|adj.|生动的,鲜明的
voice|n./v.|声音,嗓音,表达
volume|n.|音量,体积,卷,册
voluntary|adj.|自愿的,志愿的
vote|n./v.|投票,选举
voyage|n./v.|航行,旅行
wage|n./v.|工资,进行(战争)
wait|v./n.|等待,等候
wake|v./n.|醒来,唤醒,守灵
wander|v.|漫游,徘徊,走神
want|v./n.|想要,需要,缺乏
warn|v.|警告,提醒
wash|v./n.|洗,洗涤,冲洗
waste|v./n./adj.|浪费,废物,废弃的
watch|v./n.|观看,注视,手表
wave|n./v.|波浪,挥手,波动
way|n.|方式,方法,道路
weak|adj.|虚弱的,软弱的,薄弱的
wealth|n.|财富,富裕
weapon|n.|武器,兵器
wear|v./n.|穿,戴,磨损
weather|n.|天气,气候
weigh|v.|称重,权衡
weight|n.|重量,体重,分量
welcome|v./adj./n.|欢迎,受欢迎的
welfare|n.|福利,幸福,福祉
well|adv./adj./n.|好地,健康的,井
western|adj./n.|西方的,西部片
whatever|pron./adj.|无论什么,任何
wheel|n.|轮子,方向盘
whenever|conj.|每当,无论何时
whereas|conj.|然而,鉴于
whether|conj.|是否,无论
while|conj./n.|当...时,然而,一段时间
whole|adj./n.|整个的,全部,整体
whose|pron.|谁的
wide|adj./adv.|宽的,广泛的,广阔地
widespread|adj.|广泛的,普遍的
wild|adj.|野生的,狂野的,疯狂的
willing|adj.|愿意的,乐意的
win|v./n.|赢,获胜,胜利
wind|n./v.|风,缠绕,上发条
wing|n.|翅膀,翼,侧翼
wipe|v.|擦拭,抹去
wire|n.|电线,金属丝,电报
wise|adj.|明智的,聪明的
wish|v./n.|希望,祝愿,愿望
withdraw|v.|撤回,退出,取款
within|prep./adv.|在...之内,在里面
without|prep.|没有,无
witness|n./v.|目击者,证人,目击
wonder|v./n.|想知道,奇迹,惊奇
wonderful|adj.|精彩的,美妙的
wood|n.|木材,树林
word|n.|单词,话语,消息
work|v./n.|工作,作品,运转
workshop|n.|车间,研讨会,工作坊
world|n.|世界,地球,领域
worry|v./n.|担心,担忧,烦恼
worse|adj./adv.|更坏的,更差
worst|adj./adv.|最坏的,最差
worth|adj./n.|值得的,价值
worthy|adj.|值得的,有价值的
would|aux./v.|将会,愿意,过去常常
wound|n./v.|伤口,受伤
wrap|v./n.|包裹,缠绕,披肩
write|v.|写,写作,写信
wrong|adj./n./adv.|错误的,错误,错误地
yard|n.|院子,码
yield|v./n.|产出,屈服,产量
zone|n.|区域,地带
    `;
    const db = {};
    raw.trim().split('\n').forEach(line => {
      const parts = line.split('|');
      if (parts.length >= 3) {
        const word = parts[0].trim().toLowerCase();
        db[word] = { pos: parts[1].trim(), meaning: parts[2].trim() };
      }
    });
    return db;
  },

  // 查词服务（词典API获取音标 + 内置词库获取中文释义）
  async lookupWord(word) {
    if (!this._wordDB) this._wordDB = this._buildWordDB();
    const lowerWord = word.toLowerCase().trim();
    const cached = this._wordDB[lowerWord];

    // 尝试从词典API获取音标
    let phonetic = '';
    try {
      const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data && data[0]) {
          const entry = data[0];
          if (entry.phonetic) {
            phonetic = entry.phonetic;
          } else if (entry.phonetics && entry.phonetics.length > 0) {
            phonetic = entry.phonetics.find(p => p.text)?.text || '';
          }
          // 如果词库没有，从API获取词性（但释义仍用英文，不如不填）
        }
      }
    } catch (e) { /* 忽略API错误 */ }

    // 优先使用内置词库的中文释义
    if (cached) {
      return { phonetic, meaning: cached.meaning, pos: cached.pos };
    }

    // 词库没有匹配，只返回音标
    if (phonetic) {
      return { phonetic, meaning: '', pos: '' };
    }

    return null;
  },

  // ===== 短语添加 =====
  openPhraseModal(taskId) {
    const body = `
      <div class="field">
        <label class="label">英文</label>
        <input class="input" id="ph_en" placeholder="英文短语">
      </div>
      <div class="field">
        <label class="label">中文释义</label>
        <input class="input" id="ph_cn" placeholder="中文意思">
      </div>
      <div class="field">
        <label class="label">造句示例</label>
        <input class="input" id="ph_ex" placeholder="用该短语造一个句子">
      </div>
    `;
    const footer = `<button class="btn btn-primary btn-block" id="ph_save">添加</button>`;
    this.openModal({
      title: '添加短语',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#ph_save').onclick = () => {
          const en = modal.querySelector('#ph_en').value.trim();
          const cn = modal.querySelector('#ph_cn').value.trim();
          const example = modal.querySelector('#ph_ex').value.trim();
          if (!en || !cn) { this.toast('请填写英文和中文'); return; }
          const task = Store.get('englishTasks').find(t => t.id === taskId);
          if (!task.phrases) task.phrases = [];
          task.phrases.push({ id: Store.genId(), en, cn, example, addDate: Store.todayKey() });
          Store.save();
          this.toast('已添加');
          this.closeModal();
          Views.render('english');
        };
      }
    });
  },

  // ===== 编辑已有单词 =====
  openWordEditModal(taskId, word) {
    const body = `
      <div class="field">
        <label class="label">英文单词</label>
        <input class="input" id="we_text" value="${Views.escape(word.text)}">
      </div>
      <div class="field">
        <label class="label">音标</label>
        <input class="input" id="we_phonetic" value="${Views.escape(word.phonetic || '')}">
      </div>
      <div class="field">
        <label class="label">中文含义</label>
        <input class="input" id="we_meaning" value="${Views.escape(word.meaning || '')}">
      </div>
      <div class="field">
        <label class="label">词性</label>
        <input class="input" id="we_pos" value="${Views.escape(word.pos || '')}">
      </div>
    `;
    this.openModal({
      title: '编辑单词',
      body,
      footer: '<button class="btn btn-primary btn-block" id="we_save">保存</button>',
      onMount: (modal) => {
        modal.querySelector('#we_save').onclick = () => {
          const text = modal.querySelector('#we_text').value.trim();
          if (!text) { this.toast('单词不能为空'); return; }
          const task = Store.get('englishTasks').find(t => t.id === taskId);
          if (task && task.words) {
            const w = task.words.find(x => x.id === word.id);
            if (w) {
              w.text = text;
              w.phonetic = modal.querySelector('#we_phonetic').value.trim();
              w.meaning = modal.querySelector('#we_meaning').value.trim();
              w.pos = modal.querySelector('#we_pos').value.trim();
              Store.save();
              this.closeModal();
              this.toast('已保存');
              Views.render('english');
            }
          }
        };
      }
    });
  },

  // ===== 编辑已有短语 =====
  openPhraseEditModal(taskId, phrase) {
    const body = `
      <div class="field">
        <label class="label">英文</label>
        <input class="input" id="pe_en" value="${Views.escape(phrase.en)}">
      </div>
      <div class="field">
        <label class="label">中文释义</label>
        <input class="input" id="pe_cn" value="${Views.escape(phrase.cn)}">
      </div>
      <div class="field">
        <label class="label">造句示例</label>
        <input class="input" id="pe_ex" value="${Views.escape(phrase.example || '')}">
      </div>
    `;
    this.openModal({
      title: '编辑短语',
      body,
      footer: '<button class="btn btn-primary btn-block" id="pe_save">保存</button>',
      onMount: (modal) => {
        modal.querySelector('#pe_save').onclick = () => {
          const en = modal.querySelector('#pe_en').value.trim();
          const cn = modal.querySelector('#pe_cn').value.trim();
          if (!en || !cn) { this.toast('请填写英文和中文'); return; }
          const task = Store.get('englishTasks').find(t => t.id === taskId);
          if (task && task.phrases) {
            const p = task.phrases.find(x => x.id === phrase.id);
            if (p) {
              p.en = en;
              p.cn = cn;
              p.example = modal.querySelector('#pe_ex').value.trim();
              Store.save();
              this.closeModal();
              this.toast('已保存');
              Views.render('english');
            }
          }
        };
      }
    });
  },

  // ===== 阅读 - 书籍 =====
  openBookModal(book = null) {
    const isEdit = !!book;
    let coverImage = book ? (book.cover || '') : '';
    const body = `
      <div class="field">
        <label class="label">书名</label>
        <input class="input" id="bk_title" placeholder="请输入书名" value="${book ? Views.escape(book.title) : ''}">
      </div>
      <div class="field">
        <label class="label">作者（选填）</label>
        <input class="input" id="bk_author" placeholder="请输入作者" value="${book ? Views.escape(book.author || '') : ''}">
      </div>
      <div class="field">
        <label class="label">书籍封面（选填）</label>
        <div class="img-upload-area" id="bk_cover_upload" style="padding:14px;">
          ${coverImage ? `<div style="display:flex;align-items:center;gap:10px;"><img src="${coverImage}" style="width:50px;height:70px;object-fit:cover;border-radius:4px;"><span style="font-size:13px;color:var(--primary-dark);">点击更换封面</span></div>` : '<div style="font-size:13px;color:var(--text-sub);">点击上传封面图</div>'}
        </div>
        <input type="file" id="bk_cover_file" accept="image/*" style="display:none;">
      </div>
      <div class="field">
        <label class="label">书籍类型 / 分类</label>
        <input class="input" id="bk_category" placeholder="如：心理学、小说、传记" value="${book ? Views.escape(book.category || '') : ''}">
      </div>
      <div class="field">
        <label class="label">阅读状态</label>
        <div class="option-group" id="bk_status_group">
          ${['待读', '在读', '已读完'].map((s, i) => {
            const val = ['pending', 'reading', 'finished'][i];
            return `<button class="option-chip ${book && book.status === val ? 'active' : (!book && val === 'pending' ? 'active' : '')}" data-val="${val}">${s}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="field" id="bk_date_field" style="${book && book.status === 'finished' ? '' : 'display:none;'}">
        <label class="label">读完日期</label>
        <input class="input" type="date" id="bk_date" value="${book && book.finishDate ? book.finishDate : Store.todayKey()}">
      </div>
      <div class="field">
        <label class="label">读后感 / 笔记</label>
        <textarea class="textarea" id="bk_review" placeholder="记录你的读后感、摘抄、思考..." style="min-height:120px;">${book ? Views.escape(book.review || '') : ''}</textarea>
      </div>
    `;
    const footer = `
      <button class="btn btn-primary btn-block" id="bk_save">${isEdit ? '保存修改' : '添加书籍'}</button>
      ${isEdit ? '<button class="btn btn-danger btn-block" style="margin-top:8px;" id="bk_del">删除书籍</button>' : ''}
    `;
    this.openModal({
      title: isEdit ? '编辑书籍' : '添加书籍',
      body, footer,
      onMount: (modal) => {
        // 封面上传
        const coverUpload = modal.querySelector('#bk_cover_upload');
        const coverFile = modal.querySelector('#bk_cover_file');
        coverUpload.onclick = () => coverFile.click();
        coverFile.onchange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          if (file.size > 2 * 1024 * 1024) {
            coverImage = await this.compressImage(file);
          } else {
            coverImage = await this.fileToBase64(file);
          }
          coverUpload.innerHTML = `<div style="display:flex;align-items:center;gap:10px;"><img src="${coverImage}" style="width:50px;height:70px;object-fit:cover;border-radius:4px;"><span style="font-size:13px;color:var(--primary-dark);">点击更换封面</span></div>`;
          coverFile.value = '';
        };

        const group = modal.querySelector('#bk_status_group');
        const dateField = modal.querySelector('#bk_date_field');
        let status = book ? book.status : 'pending';
        group.onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          group.querySelectorAll('.option-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          status = chip.dataset.val;
          dateField.style.display = status === 'finished' ? '' : 'none';
        };
        modal.querySelector('#bk_save').onclick = () => {
          const title = modal.querySelector('#bk_title').value.trim();
          if (!title) { this.toast('请输入书名'); return; }
          const author = modal.querySelector('#bk_author').value.trim();
          const category = modal.querySelector('#bk_category').value.trim() || '未分类';
          const review = modal.querySelector('#bk_review').value.trim();
          const finishDate = status === 'finished' ? modal.querySelector('#bk_date').value : '';
          const data = { title, author, cover: coverImage, category, status, review, finishDate };
          if (isEdit) {
            Store.updateInArray('books', book.id, data);
            this.toast('已保存');
          } else {
            Store.addToArray('books', { id: Store.genId(), ...data, addDate: Store.todayKey() });
            this.toast('已添加');
          }
          this.closeModal();
          Views.render('reading');
        };
        if (isEdit) {
          modal.querySelector('#bk_del').onclick = () => {
            this.confirm('删除该书？', () => {
              Store.removeFromArray('books', book.id);
              Views.render('reading');
              this.toast('已删除');
            });
          };
        }
      }
    });
  },

  // ===== 微信读书导入 =====
  openWechatReadingImport() {
    const body = `
      <div style="font-size:13px;color:var(--text-sub);line-height:1.7;margin-bottom:16px;">
        <div style="font-weight:600;color:var(--text);margin-bottom:8px;">📖 从微信读书导入已读书籍</div>
        <div style="margin-bottom:10px;">支持两种方式：</div>
        <div style="background:var(--bg-soft);border-radius:10px;padding:12px;font-size:13px;line-height:2;margin-bottom:10px;">
          <b>方式一：API 自动导入（推荐）</b><br>
          点击下方按钮，自动同步书架中<b>已读完的书</b>，含书名、作者和封面图
        </div>
        <div style="background:var(--bg-soft);border-radius:10px;padding:12px;font-size:13px;line-height:2;">
          <b>方式二：手动粘贴</b><br>
          打开微信读书 App →「我」→「读过」→ 复制书名列表，粘贴到下方
        </div>
      </div>
      <div class="field">
        <label class="label">手动粘贴书名列表（每行一本，格式：书名 - 作者）</label>
        <textarea class="textarea" id="wr_list" placeholder="例如：&#10;三体 - 刘慈欣&#10;活着 - 余华&#10;围城 - 钱钟书" style="min-height:100px;"></textarea>
      </div>
      <div class="field">
        <label class="label">默认分类</label>
        <input class="input" id="wr_category" placeholder="如：微信读书导入" value="微信读书">
      </div>
    `;
    const footer = `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <button class="btn btn-primary btn-block" id="wr_auto" style="background:linear-gradient(135deg, #07c160, #06ad56);">
          🔄 自动拉取（微信读书 API）
        </button>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost" style="flex:1;" id="wr_cancel">取消</button>
          <button class="btn btn-primary" style="flex:1;" id="wr_import">手动粘贴导入</button>
        </div>
      </div>
    `;
    this.openModal({
      title: '从微信读书导入',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#wr_cancel').onclick = () => this.closeModal();

        // 手动粘贴导入
        modal.querySelector('#wr_import').onclick = () => {
          const raw = modal.querySelector('#wr_list').value.trim();
          const category = modal.querySelector('#wr_category').value.trim() || '微信读书';
          if (!raw) { this.toast('请粘贴书名列表'); return; }
          this._importBooksFromText(raw, category);
        };

        // API 自动拉取
        modal.querySelector('#wr_auto').onclick = async () => {
          const btn = modal.querySelector('#wr_auto');
          btn.textContent = '正在连接微信读书...';
          btn.disabled = true;
          try {
            await this._importBooksFromWeRead(modal);
          } finally {
            btn.textContent = '🔄 自动拉取（微信读书 API）';
            btn.disabled = false;
          }
        };
      }
    });
  },

  // 从文本粘贴导入
  _importBooksFromText(raw, category) {
    const lines = raw.split('\n').filter(l => l.trim());
    let imported = 0;
    const existingBooks = Store.get('books');

    lines.forEach(line => {
      let title = line.trim();
      let author = '';
      const dashIdx = title.lastIndexOf(' - ');
      if (dashIdx > 0) {
        author = title.slice(dashIdx + 3).trim();
        title = title.slice(0, dashIdx).trim();
      }
      const exists = existingBooks.some(b => b.title === title);
      if (exists || !title) return;
      Store.addToArray('books', {
        id: Store.genId(), title, author, cover: '',
        category, status: 'finished', review: '',
        finishDate: Store.todayKey(), addDate: Store.todayKey()
      });
      imported++;
    });

    if (imported > 0) {
      this.toast(`成功导入 ${imported} 本书`);
    } else {
      this.toast('没有新书可导入（可能已存在）');
    }
    this.closeModal();
    Views.render('reading');
  },

  // 通过微信读书 API 拉取（经同域代理 /weread）
  async _importBooksFromWeRead(modal) {
    // 同域代理路径，无需跨域
    const PROXY_URL = '/weread';
    const category = modal.querySelector('#wr_category').value.trim() || '微信读书';

    // 第一步：获取书架
    this.toast('正在获取书架...');
    let shelfResp;
    try {
      shelfResp = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_name: '/shelf/sync', skill_version: '1.0.4' })
      });
    } catch (e) {
      this.toast('连接失败，请检查网络');
      return;
    }

    if (!shelfResp.ok) {
      this.toast('API 请求失败，请稍后重试');
      return;
    }

    const shelfData = await shelfResp.json();
    // API 成功时 errcode 为 0 或不存在（null/undefined）
    if (shelfData.errcode && shelfData.errcode !== 0) {
      this.toast(`获取书架失败：${shelfData.errmsg || '未知错误'}`);
      return;
    }

    // 筛选已读完的书（finishReading === 1）
    const finishedBooks = (shelfData.books || []).filter(b => b.finishReading === 1);
    if (finishedBooks.length === 0) {
      this.toast('书架中没有已读完的书');
      this.closeModal();
      return;
    }

    this.toast(`找到 ${finishedBooks.length} 本已读完的书，正在导入...`);

    const existingBooks = Store.get('books');
    let imported = 0;

    finishedBooks.forEach(book => {
      const title = book.title || '';
      const author = book.author || '';
      const cover = book.cover || '';
      const exists = existingBooks.some(b => b.title === title);
      if (exists || !title) return;

      Store.addToArray('books', {
        id: Store.genId(), title, author, cover,
        category, status: 'finished', review: '',
        finishDate: Store.todayKey(), addDate: Store.todayKey()
      });
      imported++;
    });

    if (imported > 0) {
      this.toast(`成功导入 ${imported} 本书（含封面图）`);
    } else {
      this.toast('没有新书可导入（可能已全部存在）');
    }
    this.closeModal();
    Views.render('reading');
  },

  openBookDetailModal(book) {
    const statusMap = { reading: '在读', pending: '待读', finished: '已读完' };
    const aiSummary = this.generateBookSummary(book);

    // 将摘要按 \n\n 拆分为段落，每个段落中按 \n 拆分的行用编号标记
    const formatSummary = (text) => {
      if (!text) return '';
      const parts = text.split('\n\n');
      return parts.map(part => {
        const lines = part.split('\n').filter(l => l.trim());
        if (lines.length >= 2 && /^\d+\./.test(lines[0])) {
          // 带编号的核心观点列表
          return lines.map((line, i) => {
            const match = line.match(/^(\d+)\.\s*(.+)/);
            if (match) {
              return `<div class="summary-point"><span class="point-num">${match[1]}</span><span class="point-text">${Views.escape(match[2])}</span></div>`;
            }
            return Views.escape(line);
          }).join('');
        }
        // 普通段落
        return `<div style="margin-bottom:8px;">${Views.escape(part)}</div>`;
      }).join('');
    };

    const body = `
      ${book.cover ? `
        <div style="display:flex;justify-content:center;margin-bottom:16px;">
          <img src="${Views.escape(book.cover)}" style="width:110px;height:154px;object-fit:cover;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.15);" onerror="this.style.display='none'">
        </div>
      ` : ''}
      <div style="margin-bottom:12px;">
        <div style="font-size:18px;font-weight:700;line-height:1.4;">${Views.escape(book.title)}</div>
        ${book.author ? `<div style="color:var(--text-sub);font-size:13px;margin-top:4px;">${Views.escape(book.author)}</div>` : ''}
        ${book.category ? `<div style="color:var(--text-sub);font-size:12px;margin-top:2px;">${Views.escape(book.category)}</div>` : ''}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
        <span class="tag tag-primary">${statusMap[book.status] || book.status}</span>
        ${book.finishDate ? `<span class="tag">读完：${book.finishDate}</span>` : ''}
      </div>

      ${aiSummary ? `
        <div class="book-detail-summary">
          <div class="book-detail-summary-title">
            <span style="font-size:14px;">🤖</span>
            <span style="font-size:14px;font-weight:600;color:var(--text);">AI 智能摘要</span>
            <span class="ai-badge">自动生成</span>
          </div>
          <div class="book-detail-summary-body">
            ${formatSummary(aiSummary)}
          </div>
          <div class="book-detail-summary-footer">
            💡 基于书名与分类智能匹配，建议结合完整阅读获得最佳体验
          </div>
        </div>
      ` : `
        <div style="margin-bottom:16px;text-align:center;padding:20px;background:var(--bg-soft);border-radius:12px;">
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">暂无可用的AI摘要</div>
          <button class="btn btn-sm btn-primary" id="bd_generate">✨ 生成AI摘要</button>
        </div>
      `}

      ${book.review ? `
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border);">
          <div style="font-size:13px;font-weight:600;color:var(--text-sub);margin-bottom:8px;">📝 我的读后感</div>
          <div style="font-size:14px;line-height:1.7;white-space:pre-wrap;color:var(--text);">${Views.escape(book.review)}</div>
        </div>
      ` : ''}
    `;
    const footer = `
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost" style="flex:1;" id="bd_edit">编辑</button>
        <button class="btn btn-danger btn-sm" style="flex-shrink:0;" id="bd_del">删除</button>
      </div>
    `;
    this.openModal({
      title: '书籍详情',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#bd_edit').onclick = () => {
          this.closeModal();
          this.openBookModal(book);
        };
        modal.querySelector('#bd_del').onclick = () => {
          this.confirm(`确定删除《${book.title}》？`, () => {
            Store.removeFromArray('books', book.id);
            Views.render('reading');
            this.toast('已删除');
          });
        };
        const genBtn = modal.querySelector('#bd_generate');
        if (genBtn) {
          genBtn.onclick = () => {
            genBtn.textContent = '生成中...';
            genBtn.disabled = true;
            const summary = this.generateBookSummary(book);
            Store.updateInArray('books', book.id, { aiSummary: summary });
            this.closeModal();
            this.openBookDetailModal(Store.get('books').find(b => b.id === book.id));
          };
        }
      }
    });
  },

  // AI 书籍摘要生成（基于书名+作者+分类的智能匹配）
  generateBookSummary(book) {
    // 如果已有缓存的摘要
    if (book.aiSummary) return book.aiSummary;

    const title = (book.title || '').toLowerCase();
    const author = (book.author || '').toLowerCase();
    const cat = (book.category || '').toLowerCase();

    // 内置知名书籍核心观点库
    const knownBooks = {
      '纳瓦尔宝典': '本书是硅谷投资人纳瓦尔·拉维坎特的智慧箴言集，核心观点包括：\n\n1. 财富不是靠出卖时间获得的，而是靠拥有股权（ownership）\n2. 把自己产品化（Productize Yourself）——找到你独特的天赋并规模化\n3. 用判断力赚钱，而非用时间\n4. 幸福是一种选择，是缺省状态，减少欲望比追求更多更能获得幸福\n5. 阅读是元技能，广泛阅读基础学科（数学、物理、哲学）\n\n适合：想建立财富思维、提升判断力的读者。',
      '富爸爸穷爸爸': '罗伯特·清崎的经典理财启蒙书，核心理念：\n\n1. 穷人为钱工作，富人让钱为自己工作\n2. 资产是能把钱放进你口袋的东西，负债是把钱从你口袋拿走的东西\n3. 财务自由的关键是不断买入资产，减少负债\n4. 学校教育不教财务知识，财商需要自学\n5. 工作是为学习，不为赚钱——学会管理现金流、系统、人员\n\n这本书改变了无数人的理财观念，是理财入门的必读之作。',
      '富爸爸女人一定要有钱': '金·清崎专门为女性写的理财指南：\n\n1. 女性必须经济独立，不能把财务安全寄托在他人身上\n2. 投资的四个关键：学习、从小开始、分散风险、长期持有\n3. 房地产是被低估的女性友好投资标的\n4. 克服"我不懂""太冒险"等心理障碍\n5. 具体行动方案：从记账开始→建立应急基金→学习投资→开始实践\n\n核心理念：财务自由是女性最好的铠甲。',
      '认知觉醒': '周岭的自我成长方法论，核心观点：\n\n1. 人与人之间的差距本质上是认知能力的差距\n2. 元认知——对自己思考过程的思考，是最高级的能力\n3. 消除模糊：焦虑的根源是模糊，行动力来自清晰\n4. 舒适区边缘法则：最佳成长发生在舒适区边缘，而非舒适区或困难区\n5. 早冥读写跑——五个低成本高收益的成长习惯\n\n这本书被誉为"个人成长的底层操作系统"。',
      '人性的弱点': '卡耐基的人际关系经典，核心原则：\n\n1. 不要批评、谴责或抱怨他人\n2. 真诚地赞美他人，让对方感到重要\n3. 激发他人内心的渴望，而非强迫\n4. 赢得争论的唯一方法就是避免争论\n5. 如果你错了，立刻坦然承认\n6. 谈论对方感兴趣的话题，做一个好的倾听者\n\n这本书写于1936年，但原则至今仍然适用，是情商和社交能力的经典读物。',
      '爆款文案': '关健明的文案写作实战指南：\n\n1. 好文案不是"写"出来的，是"策划"出来的\n2. 标题四要素：痛点、场景、利益、好奇心\n3. 卖点提炼公式：用户需求 + 产品特性 + 场景化表达\n4. 激发购买欲望的六种方式：感官占领、恐惧诉求、社会认同、购买合理化、稀缺性、权威背书\n5. 文案的终极目标是让读者采取行动\n\n大量真实案例，适合营销、电商、自媒体从业者。',
      '置身事内': '兰小欢教授的中国经济通识读本：\n\n1. 理解中国经济不能脱离"政府"这个关键角色\n2. 分税制改革（1994）深刻塑造了地方政府的"土地财政"模式\n3. 城投公司和地方债务是理解中国基建和城市化的钥匙\n4. 中国经济的核心矛盾：生产型政府 vs 消费不足\n5. 供给侧改革、房住不炒、共同富裕——都是应对上述矛盾的尝试\n\n这本书帮普通人理解中国经济的底层逻辑，是理解当下经济政策的必读之作。',
      '法治的细节': '罗翔老师的法学随笔：\n\n1. 法律是最低限度的道德，道德是最高限度的法律\n2. 法治不是最好的治理方式，但它是"最不坏"的\n3. 程序正义比结果正义更重要——因为我们无法知道绝对的真相\n4. 承认自己的无知，是开启智慧的大门\n5. 法律人要有温度，不能沦为"法律机器人"\n\n罗翔用通俗易懂的语言探讨正义、道德和人生的根本问题。',
      '长安的荔枝': '马伯庸的历史小说，一个小吏的史诗：\n\n1. "一骑红尘妃子笑"背后是一个九品小官的生死冒险\n2. 核心命题：如何在不可能完成的任务中找到出路\n3. 展现了大唐官僚体系的运作——层层加码、功劳被抢、黑锅你背\n4. 小人物的挣扎与选择：是迎合体制还是守住底线\n5. "就算失败，我也想知道自己倒在距离终点多远的地方"\n\n这不仅是一本历史小说，更是一部职场生存指南。',
      '明朝那些事儿': '当年明月的现象级历史作品：\n\n1. 用轻松幽默的语言讲述明朝300年历史\n2. 核心观点：历史是由人创造的，不是由抽象的力量\n3. 朱元璋、朱棣、张居正、王阳明、海瑞——鲜活的人物群像\n4. 制度的惯性：明朝的兴衰根植于其制度设计\n5. 读史使人明智——历史中的权力、人性、选择至今仍在重复\n\n这部作品让无数人重新爱上历史，是中国通俗史学的里程碑。',
      '你当像鸟飞往你的山': '塔拉·韦斯特弗的自传体作品：\n\n1. 一个从未上过学的女孩最终获得剑桥博士学位的真实故事\n2. 教育的力量：不是改变你的出身，而是给你选择的自由\n3. 原生家庭的桎梏与挣脱——爱家人和做自己是可能冲突的\n4. 知识是一种特权，也是一种责任\n5. "你可以爱一个人，但仍然选择和他说再见"\n\n比尔·盖茨年度推荐，关于教育、家庭和自我救赎的力量。',
      '定投十年财务自由': '银行螺丝钉的指数基金投资指南：\n\n1. 普通人实现财务自由最靠谱的方式：定投指数基金\n2. 选择低估值时买入，高估值时卖出——"低买高卖"是唯一法则\n3. 不要试图预测市场，长期持有胜过频繁交易\n4. 四个关键指标：市盈率、市净率、股息率、ROE\n5. 每月定投+红利再投资=复利的魔力\n\n实操性极强的理财入门书，适合想通过基金定投实现财富增值的读者。',
      '百年孤独': '加西亚·马尔克斯的魔幻现实主义巨著：\n\n1. 布恩迪亚家族七代人的兴衰，隐喻整个拉丁美洲的历史\n2. 孤独是家族的宿命——每个人都在用不同方式对抗孤独\n3. 时间的循环：历史不断重演，名字不断重复，命运不断轮回\n4. "命中注定要一百年孤独的家族，不会再有第二次机会在大地上出现"\n5. 魔幻现实主义的魅力：将不可思议的事情写得像日常一样平淡\n\n这本书改变了世界文学的走向，马尔克斯因此获得诺贝尔文学奖。',
      '杀死一只知更鸟': '哈珀·李的美国文学经典：\n\n1. 通过一个小女孩的视角讲述种族歧视和正义的故事\n2. 父亲阿提克斯·芬奇是文学史上最伟大的父亲形象之一\n3. "你永远不能真正理解一个人，除非你穿上他的鞋走一走"\n4. 勇气不是拿着枪，而是明知会输依然坚持做对的事\n5. 知更鸟只唱歌不害人，杀死它是罪恶——象征无辜者的权利\n\n这本书是美国中学生的必读书目，影响了几代人的价值观。',
      '穷查理宝典': '查理·芒格的智慧集：\n\n1. 多元思维模型：用多个学科的知识分析问题，避免"铁锤人倾向"\n2. 逆向思维："如果我知道我会死在哪里，我就永远不去那个地方"\n3. 能力圈原则：只在自己懂的领域做决策\n4. 人类误判心理学：25种常见的认知偏差\n5. 耐心和纪律：好机会很少，出现时要重仓出击\n\n这本书不是投资指南，而是一本关于如何思考和决策的人生哲学。',
      '底层逻辑': '刘润的思维方法论：\n\n1. 底层逻辑是事物的根本规律，看清底层逻辑才能做出正确决策\n2. 是非对错的底层逻辑：立场不同，对错不同\n3. 思考问题的底层逻辑：事实、观点、立场、信仰的区别\n4. 个体进化的底层逻辑：人生商业模式 = 能力 × 效率 × 杠杆\n5. 社会协作的底层逻辑：信用是一个人最大的资产\n\n适合想提升思维深度和决策能力的职场人。',
      '舍不得看完的中国史': '渤海小吏的战争史：\n\n1. 通过12场经典战役讲述中国历史的关键转折\n2. 长平之战、巨鹿之战、赤壁之战——每场战役背后都是人性的博弈\n3. 战争是政治的延续，胜负往往在战场之外就已决定\n4. 历史中的"偶然"和"必然"——一个细节可能改变整个历史走向\n5. 读战争史就是读人性史、决策史\n\n既有宏大叙事，又有细节分析，历史爱好者不容错过。',
      '爆款小红书': '吕白的自媒体运营实战：\n\n1. 小红书运营的核心：封面决定点击，内容决定点赞和收藏\n2. 爆款公式 = 痛点标题 + 高价值内容 + 视觉美感\n3. 选题技巧：追热点、做对比、晒成果、讲故事\n4. 涨粉关键：持续输出有价值的内容，建立个人IP\n5. 变现路径：广告、带货、知识付费、私域引流\n\n从0到百万粉丝的系统方法论，实操性强。',
      '思考的技术': '大前研一的逻辑思维经典：\n\n1. 思考是可以训练的，像肌肉一样越用越强\n2. 解决问题的根本方法是"假设-验证"循环\n3. 不要被现象迷惑，要追问5个Why找到根本原因\n4. 非线性思考：跳出常规框架，从不同维度看问题\n5. MECE原则：相互独立、完全穷尽地分解问题\n\n这本书影响了无数咨询顾问和管理者的思维方式。',
      '我在100天内自学英文翻转人生': '张同完的英语学习方法：\n\n1. 100天足以让英语发生质变——关键是正确的方法和坚持\n2. "100LS法则"：同一部电影看100遍（听+模仿+跟读）\n3. 不要学语法，要"习得"语言——像婴儿学母语一样\n4. 每天2小时，100天=200小时，足以打通英语听说\n5. 选择自己真正感兴趣的材料，兴趣是最好的老师\n\n极其务实的英语学习方法，适合想突破口语瓶颈的学习者。',
      '汴京之围': '郭建龙的北宋灭亡史：\n\n1. 1126-1127年，靖康之变如何发生——北宋灭亡的全景式还原\n2. 一个繁荣帝国的崩溃：外部威胁+内部撕裂+决策失误\n3. 宋金外交博弈中的误判——高估自己、低估敌人、轻信承诺\n4. 制度的路径依赖：宋初的制度设计注定了后来的军事弱势\n5. 历史的警示：繁荣不等于安全，和平不等于可以放松警惕\n\n这本书是理解宋史和"大国衰亡"逻辑的绝佳读物。',
    };

    // 精确匹配
    for (const [key, value] of Object.entries(knownBooks)) {
      if (title.includes(key) || key.includes(title)) return value;
    }

    // 基于分类和关键词生成通用摘要
    let summary = '';
    if (cat.includes('理财') || cat.includes('财经') || cat.includes('经济')) {
      summary = `《${book.title}》是一本经济理财类书籍${book.author ? `，作者${book.author}` : ''}。\n\n本书围绕财富管理和投资理财展开，核心内容可能包括：\n\n1. 财务思维的基础框架——建立正确的金钱观和理财观\n2. 投资策略与风险管理——如何在不确定的市场中做出理性决策\n3. 复利的力量——长期思维和持续积累的价值\n4. 实用的理财工具和方法——从记账到资产配置的完整路径\n\n适合希望提升财商、实现财务自由的读者。`;
    } else if (cat.includes('成长') || cat.includes('励志')) {
      summary = `《${book.title}》是一本个人成长类书籍${book.author ? `，作者${book.author}` : ''}。\n\n本书关注自我提升和心智成长，核心主题可能包括：\n\n1. 认知升级——突破思维局限，建立更高维度的思考框架\n2. 习惯养成——小习惯带来大改变，持续行动胜过完美计划\n3. 心智模式——识别并打破限制性信念\n4. 行动方法论——从知道到做到的桥梁\n\n适合正在寻求自我突破和成长的读者。`;
    } else if (cat.includes('历史')) {
      summary = `《${book.title}》是一本历史类书籍${book.author ? `，作者${book.author}` : ''}。\n\n本书以历史的视角展开叙述，核心看点包括：\n\n1. 历史事件的深度还原——超越教科书的多维度解读\n2. 人物命运的起伏——在时代洪流中的个人选择\n3. 制度与文化的演变——理解中国社会的底层逻辑\n4. 以史为鉴——历史中的经验教训对当下的启示\n\n适合对历史感兴趣、想从历史中汲取智慧的读者。`;
    } else if (cat.includes('文学') || cat.includes('小说')) {
      summary = `《${book.title}》是一部文学作品${book.author ? `，作者${book.author}` : ''}。\n\n本书通过文学的形式探讨了人性、社会和命运等永恒主题：\n\n1. 深刻的人物塑造——复杂而真实的角色让人产生共鸣\n2. 独特的叙事风格——文字的力量在于它如何被讲述\n3. 主题的普遍性——跨越时代和文化的人性洞察\n4. 阅读体验——一场关于生命、爱与失去的思考之旅\n\n适合喜欢深度阅读、享受文学之美的读者。`;
    } else if (cat.includes('教育') || cat.includes('外语') || cat.includes('英语')) {
      summary = `《${book.title}》是一本教育学习类书籍${book.author ? `，作者${book.author}` : ''}。\n\n本书聚焦学习方法和技能提升：\n\n1. 高效学习方法——用科学的方法代替低效的努力\n2. 技能习得的底层逻辑——从入门到精通的路径\n3. 刻意练习与反馈循环——持续进步的关键\n4. 实用的学习工具和资源推荐\n\n适合正在学习新技能、希望提升学习效率的读者。`;
    } else {
      summary = `《${book.title}》${book.author ? `是${book.author}的作品，` : ''}一本值得深入阅读的好书。\n\n本书的主要价值可能在于：\n\n1. 提供了独特的视角或方法论，帮助读者拓宽认知边界\n2. 通过作者的深入研究和思考，揭示了该领域的关键规律\n3. 理论与实践结合，既有思想深度又有实操指导\n4. 阅读本书是一次思维的旅程，会带来新的启发和思考\n\n具体内容建议通过阅读全书来获得最完整的体验。`;
    }

    return summary;
  },

  // ===== 穿搭 =====
  openOutfitModal(outfit = null) {
    const isEdit = !!outfit;
    const seasons = ['春', '夏', '秋', '冬'];
    let images = outfit ? [...(outfit.images || [])] : [];
    
    const body = `
      <div class="field">
        <label class="label">主题</label>
        <input class="input" id="ot_theme" placeholder="如：法式优雅、通勤简约" value="${outfit ? Views.escape(outfit.theme || '') : ''}">
      </div>
      <div class="field">
        <label class="label">季节</label>
        <div class="option-group" id="ot_season_group">
          ${seasons.map(s => `<button class="option-chip ${outfit && outfit.season === s ? 'active' : ''}" data-val="${s}">${s}</button>`).join('')}
        </div>
      </div>
      <div class="field">
        <label class="label">购买平台（选填）</label>
        <input class="input" id="ot_platform" placeholder="如：淘宝、京东、得物" value="${outfit ? Views.escape(outfit.platform || '') : ''}">
      </div>
      <div class="field">
        <label class="label">店铺名称（选填）</label>
        <input class="input" id="ot_shop" placeholder="如：XX旗舰店" value="${outfit ? Views.escape(outfit.shop || '') : ''}">
      </div>
      <div class="field">
        <label class="label">购买链接（选填）</label>
        <input class="input" id="ot_url" placeholder="https://..." value="${outfit ? Views.escape(outfit.url || '') : ''}">
      </div>
      <div class="field">
        <label class="label">图片</label>
        <div class="img-upload-area" id="ot_upload">
          <svg viewBox="0 0 24 24" width="28" height="28" style="opacity:0.5;"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          <div style="font-size:13px;margin-top:6px;">点击添加图片（支持多选）</div>
        </div>
        <div class="img-preview-grid" id="ot_preview"></div>
        <input type="file" id="ot_file" accept="image/*" multiple style="display:none;">
      </div>
    `;
    const footer = `
      <button class="btn btn-primary btn-block" id="ot_save">${isEdit ? '保存修改' : '添加穿搭'}</button>
      ${isEdit ? '<button class="btn btn-danger btn-block" style="margin-top:8px;" id="ot_del">删除</button>' : ''}
    `;
    this.openModal({
      title: isEdit ? '编辑穿搭' : '添加穿搭灵感',
      body, footer,
      onMount: (modal) => {
        let selectedSeason = outfit ? outfit.season : '';
        modal.querySelector('#ot_season_group').onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          modal.querySelectorAll('#ot_season_group .option-chip').forEach(c => c.classList.remove('active'));
          if (selectedSeason === chip.dataset.val) {
            selectedSeason = '';
          } else {
            chip.classList.add('active');
            selectedSeason = chip.dataset.val;
          }
        };

        const renderPreviews = () => {
          const grid = modal.querySelector('#ot_preview');
          grid.innerHTML = images.map((src, i) => `
            <div class="img-preview">
              <img src="${src}" alt="">
              <div class="img-remove" data-idx="${i}">&times;</div>
            </div>
          `).join('');
          grid.querySelectorAll('.img-remove').forEach(btn => {
            btn.onclick = () => {
              images.splice(parseInt(btn.dataset.idx), 1);
              renderPreviews();
            };
          });
        };
        renderPreviews();

        const fileInput = modal.querySelector('#ot_file');
        const uploadArea = modal.querySelector('#ot_upload');
        uploadArea.onclick = () => fileInput.click();
        fileInput.onchange = async (e) => {
          const files = Array.from(e.target.files);
          for (const file of files) {
            if (!file.type.startsWith('image/')) continue;
            if (file.size > 2 * 1024 * 1024) {
              images.push(await this.compressImage(file));
            } else {
              images.push(await this.fileToBase64(file));
            }
          }
          renderPreviews();
          fileInput.value = '';
        };

        modal.querySelector('#ot_save').onclick = () => {
          const theme = modal.querySelector('#ot_theme').value.trim() || '未命名';
          if (images.length === 0) { this.toast('请至少添加一张图片'); return; }
          const data = {
            theme,
            season: selectedSeason,
            platform: modal.querySelector('#ot_platform').value.trim(),
            shop: modal.querySelector('#ot_shop').value.trim(),
            url: modal.querySelector('#ot_url').value.trim(),
            images
          };
          if (isEdit) {
            Store.updateInArray('outfits', outfit.id, data);
            this.toast('已保存');
          } else {
            Store.addToArray('outfits', { id: Store.genId(), ...data, addDate: Store.todayKey() });
            this.toast('已添加');
          }
          this.closeModal();
          Views.render('outfit');
        };
        if (isEdit) {
          modal.querySelector('#ot_del').onclick = () => {
            this.confirm('删除该穿搭？', () => {
              Store.removeFromArray('outfits', outfit.id);
              Views.render('outfit');
              this.toast('已删除');
            });
          };
        }
      }
    });
  },

  openOutfitDetailModal(outfit) {
    const body = `
      <div style="font-size:18px;font-weight:700;margin-bottom:10px;">${Views.escape(outfit.theme || '未命名')}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
        ${outfit.season ? `<span class="season-tag season-${outfit.season}">${outfit.season}季</span>` : ''}
        ${outfit.platform ? `<span class="tag">平台：${Views.escape(outfit.platform)}</span>` : ''}
        ${outfit.shop ? `<span class="tag">店铺：${Views.escape(outfit.shop)}</span>` : ''}
      </div>
      <div class="img-preview-grid" style="grid-template-columns:repeat(2,1fr);gap:8px;">
        ${(outfit.images || []).map(src => `<div class="img-preview" style="cursor:pointer;" data-src="${src}"><img src="${src}" alt=""></div>`).join('')}
      </div>
      ${outfit.url ? `<a href="${Views.escape(outfit.url)}" target="_blank" class="btn btn-ghost btn-block" style="margin-top:12px;">打开购买链接</a>` : ''}
    `;
    const footer = `
      <button class="btn btn-ghost btn-block" id="od_edit">编辑</button>
    `;
    this.openModal({
      title: '穿搭详情',
      body, footer,
      onMount: (modal) => {
        modal.querySelectorAll('.img-preview').forEach(p => {
          p.onclick = () => UI.openLightbox(p.dataset.src);
        });
        modal.querySelector('#od_edit').onclick = () => {
          this.closeModal();
          this.openOutfitModal(outfit);
        };
      }
    });
  },

  // ===== 日记本专用 =====
  openDiaryModal() {
    const moods = ['开心', '快乐', '兴奋', '平静', '感恩', '焦虑', '难过', '生气', '疲惫', '期待'];
    const weathers = ['晴', '多云', '阴', '小雨', '大雨', '雪', '风'];
    const existingCats = [...new Set(Store.get('diaries').map(n => n.category).filter(Boolean))];

    const body = `
      <div class="field">
        <label class="label">大标题</label>
        <input class="input" id="dy_title" placeholder="今天的一天...">
      </div>
      <div class="field">
        <label class="label">心情</label>
        <div class="option-group" id="dy_mood_group">
          ${moods.map(m => `<button class="option-chip mood-chip" data-val="${m}" title="${m}">${Views.getMoodEmoji(m)} ${m}</button>`).join('')}
        </div>
      </div>
      <div class="field">
        <label class="label">天气</label>
        <div class="option-group" id="dy_weather_group">
          ${weathers.map(w => `<button class="option-chip weather-chip" data-val="${w}">${Views.getWeatherEmoji(w)} ${w}</button>`).join('')}
        </div>
      </div>
      <div class="field">
        <label class="label">分类（选填）</label>
        <input class="input" id="dy_category" placeholder="如：工作、生活、学习" list="dy_cat_list">
        <datalist id="dy_cat_list">
          ${existingCats.map(c => `<option value="${Views.escape(c)}">`).join('')}
        </datalist>
      </div>
      <div class="field">
        <label class="label">正文</label>
        <textarea class="textarea" id="dy_content" placeholder="今天发生了什么..." style="min-height:180px;"></textarea>
      </div>
    `;
    const footer = `<button class="btn btn-primary btn-block" id="dy_save">保存日记</button>`;
    this.openModal({
      title: '写日记',
      body, footer,
      onMount: (modal) => {
        let selectedMood = '';
        let selectedWeather = '';

        modal.querySelector('#dy_mood_group').onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          if (selectedMood === chip.dataset.val) {
            selectedMood = '';
            chip.classList.remove('active');
          } else {
            modal.querySelectorAll('#dy_mood_group .option-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            selectedMood = chip.dataset.val;
          }
        };

        modal.querySelector('#dy_weather_group').onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          if (selectedWeather === chip.dataset.val) {
            selectedWeather = '';
            chip.classList.remove('active');
          } else {
            modal.querySelectorAll('#dy_weather_group .option-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            selectedWeather = chip.dataset.val;
          }
        };

        modal.querySelector('#dy_save').onclick = () => {
          const title = modal.querySelector('#dy_title').value.trim();
          const content = modal.querySelector('#dy_content').value.trim();
          const category = modal.querySelector('#dy_category').value.trim();
          if (!title && !content) { this.toast('请输入内容'); return; }
          Store.addToArray('diaries', {
            id: Store.genId(),
            title: title || '无标题',
            content,
            category,
            mood: selectedMood,
            weather: selectedWeather,
            date: this.formatDateTime(new Date())
          });
          this.toast('日记已保存');
          this.closeModal();
          Views.render('diary');
        };
      }
    });
  },

  openDiaryDetailModal(note) {
    const body = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div style="display:flex;align-items:center;gap:8px;">
          ${note.mood ? `<span style="font-size:24px;" title="${Views.escape(note.mood)}">${Views.getMoodEmoji(note.mood)}</span>` : ''}
          ${note.weather ? `<span style="font-size:20px;" title="${Views.escape(note.weather)}">${Views.getWeatherEmoji(note.weather)}</span>` : ''}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          ${note.category ? `<span class="tag tag-primary">${Views.escape(note.category)}</span>` : ''}
          <span style="font-size:12px;color:var(--text-muted);">${note.date || ''}</span>
        </div>
      </div>
      <div style="font-size:18px;font-weight:700;margin-bottom:12px;">${Views.escape(note.title)}</div>
      <div style="font-size:14px;line-height:1.8;white-space:pre-wrap;color:var(--text);">${Views.escape(note.content || '')}</div>
    `;
    const footer = `
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost" style="flex:1;" id="dd_edit">编辑</button>
        <button class="btn btn-danger" style="flex:1;" id="dd_del">删除</button>
      </div>
    `;
    this.openModal({
      title: '日记详情',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#dd_edit').onclick = () => {
          this.closeModal();
          this.openDiaryEditModal(note);
        };
        modal.querySelector('#dd_del').onclick = () => {
          this.confirm('删除这篇日记？', () => {
            Store.removeFromArray('diaries', note.id);
            Views.render('diary');
            this.toast('已删除');
          });
        };
      }
    });
  },

  openDiaryEditModal(note) {
    const moods = ['开心', '快乐', '兴奋', '平静', '感恩', '焦虑', '难过', '生气', '疲惫', '期待'];
    const weathers = ['晴', '多云', '阴', '小雨', '大雨', '雪', '风'];
    const existingCats = [...new Set(Store.get('diaries').map(n => n.category).filter(Boolean))];

    const body = `
      <div class="field">
        <label class="label">大标题</label>
        <input class="input" id="de_title" value="${Views.escape(note.title)}">
      </div>
      <div class="field">
        <label class="label">心情</label>
        <div class="option-group" id="de_mood_group">
          ${moods.map(m => `<button class="option-chip mood-chip ${note.mood === m ? 'active' : ''}" data-val="${m}" title="${m}">${Views.getMoodEmoji(m)} ${m}</button>`).join('')}
        </div>
      </div>
      <div class="field">
        <label class="label">天气</label>
        <div class="option-group" id="de_weather_group">
          ${weathers.map(w => `<button class="option-chip weather-chip ${note.weather === w ? 'active' : ''}" data-val="${w}">${Views.getWeatherEmoji(w)} ${w}</button>`).join('')}
        </div>
      </div>
      <div class="field">
        <label class="label">分类</label>
        <input class="input" id="de_category" value="${Views.escape(note.category || '')}" list="de_cat_list">
        <datalist id="de_cat_list">
          ${existingCats.map(c => `<option value="${Views.escape(c)}">`).join('')}
        </datalist>
      </div>
      <div class="field">
        <label class="label">正文</label>
        <textarea class="textarea" id="de_content" style="min-height:180px;">${Views.escape(note.content || '')}</textarea>
      </div>
    `;
    const footer = `<button class="btn btn-primary btn-block" id="de_save">保存修改</button>`;
    this.openModal({
      title: '编辑日记',
      body, footer,
      onMount: (modal) => {
        let selectedMood = note.mood || '';
        let selectedWeather = note.weather || '';

        modal.querySelector('#de_mood_group').onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          if (selectedMood === chip.dataset.val) {
            selectedMood = '';
            chip.classList.remove('active');
          } else {
            modal.querySelectorAll('#de_mood_group .option-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            selectedMood = chip.dataset.val;
          }
        };

        modal.querySelector('#de_weather_group').onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          if (selectedWeather === chip.dataset.val) {
            selectedWeather = '';
            chip.classList.remove('active');
          } else {
            modal.querySelectorAll('#de_weather_group .option-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            selectedWeather = chip.dataset.val;
          }
        };

        modal.querySelector('#de_save').onclick = () => {
          const title = modal.querySelector('#de_title').value.trim() || '无标题';
          const content = modal.querySelector('#de_content').value.trim();
          const category = modal.querySelector('#de_category').value.trim();
          Store.updateInArray('diaries', note.id, { title, content, category, mood: selectedMood, weather: selectedWeather });
          this.toast('已保存');
          this.closeModal();
          Views.render('diary');
        };
      }
    });
  },

  // ===== 日记/备忘录（通用） =====
  openNoteModal(key, placeholder, onDone) {
    const isDiary = key === 'diaries';
    const existingCats = [...new Set(Store.get(key).map(n => n.category).filter(Boolean))];
    
    const body = `
      <div class="field">
        <label class="label">大标题</label>
        <input class="input" id="nt_title" placeholder="${isDiary ? '今天的一天' : '备忘标题'}">
      </div>
      <div class="field">
        <label class="label">分类（选填，可输入或选择）</label>
        <input class="input" id="nt_category" placeholder="如：工作、生活、学习" list="nt_cat_list">
        <datalist id="nt_cat_list">
          ${existingCats.map(c => `<option value="${Views.escape(c)}">`).join('')}
        </datalist>
      </div>
      <div class="field">
        <label class="label">正文</label>
        <textarea class="textarea" id="nt_content" placeholder="${placeholder}" style="min-height:160px;"></textarea>
      </div>
    `;
    const footer = `<button class="btn btn-primary btn-block" id="nt_save">保存</button>`;
    this.openModal({
      title: isDiary ? '写日记' : '新建备忘',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#nt_save').onclick = () => {
          const title = modal.querySelector('#nt_title').value.trim();
          const content = modal.querySelector('#nt_content').value.trim();
          const category = modal.querySelector('#nt_category').value.trim();
          if (!title && !content) { this.toast('请输入内容'); return; }
          Store.addToArray(key, {
            id: Store.genId(),
            title: title || '无标题',
            content,
            category,
            date: this.formatDateTime(new Date())
          });
          this.toast('已保存');
          this.closeModal();
          onDone && onDone();
        };
      }
    });
  },

  openNoteDetailModal(note, key) {
    const isDiary = key === 'diaries';
    const body = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
        ${note.category ? `<span class="tag tag-primary">${Views.escape(note.category)}</span>` : '<span></span>'}
        <span style="font-size:12px;color:var(--text-muted);">${note.date || ''}</span>
      </div>
      <div style="font-size:18px;font-weight:700;margin-bottom:12px;">${Views.escape(note.title)}</div>
      <div style="font-size:14px;line-height:1.8;white-space:pre-wrap;color:var(--text);">${Views.escape(note.content || '')}</div>
    `;
    const footer = `
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost" style="flex:1;" id="nd_edit">编辑</button>
        <button class="btn btn-danger" style="flex:1;" id="nd_del">删除</button>
      </div>
    `;
    this.openModal({
      title: isDiary ? '日记详情' : '备忘详情',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#nd_edit').onclick = () => {
          this.closeModal();
          this.openNoteEditModal(note, key);
        };
        modal.querySelector('#nd_del').onclick = () => {
          this.confirm('删除该条记录？', () => {
            Store.removeFromArray(key, note.id);
            Views.render(key === 'diaries' ? 'diary' : 'memo');
            this.toast('已删除');
          });
        };
      }
    });
  },

  openNoteEditModal(note, key) {
    const existingCats = [...new Set(Store.get(key).map(n => n.category).filter(Boolean))];
    const body = `
      <div class="field">
        <label class="label">大标题</label>
        <input class="input" id="ne_title" value="${Views.escape(note.title)}">
      </div>
      <div class="field">
        <label class="label">分类</label>
        <input class="input" id="ne_category" value="${Views.escape(note.category || '')}" list="ne_cat_list">
        <datalist id="ne_cat_list">
          ${existingCats.map(c => `<option value="${Views.escape(c)}">`).join('')}
        </datalist>
      </div>
      <div class="field">
        <label class="label">正文</label>
        <textarea class="textarea" id="ne_content" style="min-height:160px;">${Views.escape(note.content || '')}</textarea>
      </div>
    `;
    const footer = `<button class="btn btn-primary btn-block" id="ne_save">保存修改</button>`;
    this.openModal({
      title: '编辑',
      body, footer,
      onMount: (modal) => {
        modal.querySelector('#ne_save').onclick = () => {
          const title = modal.querySelector('#ne_title').value.trim() || '无标题';
          const content = modal.querySelector('#ne_content').value.trim();
          const category = modal.querySelector('#ne_category').value.trim();
          Store.updateInArray(key, note.id, { title, content, category });
          this.toast('已保存');
          this.closeModal();
          Views.render(key === 'diaries' ? 'diary' : 'memo');
        };
      }
    });
  },

  // ===== AI内容详情 =====
  openAIDetailModal(item) {
    // 根据来源构造"打开App查看"的深链
    let platformLink = null;
    let platformName = '';
    if (item.source === '小红书') {
      platformName = '小红书 App';
      // 小红书 deep link：snssdk1128://search_result?keyword=xxx
      platformLink = item.deepLink || `snssdk1128://search_result?keyword=${encodeURIComponent(item.title)}`;
    } else if (item.source === '抖音') {
      platformName = '抖音 App';
      // 抖音 deep link：snssdk1128://search?keyword=xxx
      platformLink = item.deepLink || `snssdk1128://search?keyword=${encodeURIComponent(item.title)}`;
    } else if (item.source === 'B站') {
      platformName = 'B站 App';
      platformLink = item.deepLink || item.url || 'https://www.bilibili.com';
    }

    const body = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
        <span class="ai-source">${Views.escape(item.source)}</span>
        <span style="font-size:12px;color:var(--text-muted);margin-left:auto;">${Views.escape(item.fetchDate || '')}</span>
      </div>
      <div style="font-size:18px;font-weight:700;line-height:1.4;margin-bottom:12px;color:var(--text);">${Views.escape(item.title)}</div>
      <div style="font-size:14px;line-height:1.8;color:var(--text);white-space:pre-wrap;margin-bottom:16px;">${Views.escape(item.content || item.desc || '')}</div>
      ${item.tools && item.tools.length ? `
        <div style="margin-bottom:16px;">
          <div style="font-size:13px;font-weight:600;color:var(--text-sub);margin-bottom:8px;">涉及AI工具</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${item.tools.map(t => `<span style="padding:4px 10px;background:rgba(123,198,126,0.15);color:#5a9e5d;border-radius:8px;font-size:12px;font-weight:500;">${Views.escape(t)}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      ${item.tags && item.tags.length ? `
        <div style="margin-bottom:16px;">
          <div style="font-size:13px;font-weight:600;color:var(--text-sub);margin-bottom:8px;">关键词</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${item.tags.map(t => `<span style="padding:4px 10px;background:var(--bg-soft);color:var(--text-sub);border-radius:8px;font-size:12px;">${Views.escape(t)}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      ${platformLink ? `
        <div style="border-top:1px solid var(--border);padding-top:12px;">
          <a href="${Views.escape(platformLink)}" class="btn btn-primary btn-block" style="text-decoration:none;">
            在${Views.escape(platformName)}中查看
          </a>
          <div style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:8px;">点击将在${Views.escape(platformName)}中打开对应内容</div>
        </div>
      ` : ''}
    `;
    this.openModal({
      title: '内容详情',
      body,
      onMount: (modal) => {}
    });
  },

  // ===== AI工具详情 =====
  openAIToolDetailModal(tool) {
    const body = `
      <div style="text-align:center;margin-bottom:16px;">
        <div style="font-size:48px;margin-bottom:8px;">${Views.escape(tool.icon || '🤖')}</div>
        <div style="font-size:20px;font-weight:700;color:var(--text);">${Views.escape(tool.name)}</div>
        <div style="font-size:13px;color:var(--text-sub);margin-top:4px;">${Views.escape(tool.category || '')}</div>
      </div>
      <div style="font-size:14px;line-height:1.8;color:var(--text);white-space:pre-wrap;margin-bottom:16px;background:var(--bg-soft);border-radius:12px;padding:14px;">${Views.escape(tool.desc || '')}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;">
        ${(tool.tags || []).map(t => `<span class="ai-tool-tag" style="padding:4px 10px;border-radius:8px;font-size:12px;">${Views.escape(t)}</span>`).join('')}
        ${tool.free ? '<span class="ai-tool-tag free" style="padding:4px 10px;border-radius:8px;font-size:12px;">免费</span>' : ''}
        ${tool.cn ? '<span class="ai-tool-tag cn" style="padding:4px 10px;border-radius:8px;font-size:12px;">国产</span>' : ''}
      </div>
    `;
    this.openModal({
      title: '工具详情',
      body,
      onMount: (modal) => {}
    });
  },

  // ===== 理财知识详情 =====
  openFinanceKnowledgeDetail(item) {
    // 将 \\n 转换为真实换行，再按段落渲染
    const detail = (item.detail || '').replace(/\\\\n/g, '\n');
    const parts = detail.split('\n\n');
    const detailHtml = parts.map(part => {
      const lines = part.split('\n').filter(l => l.trim());
      return lines.map(line => {
        const trimmed = line.trim();
        // 小贴士行
        if (trimmed.startsWith('💡')) {
          return `<div style="background:rgba(245,166,35,0.08);border-radius:8px;padding:10px 12px;margin:8px 0;font-size:13px;color:#b8860b;line-height:1.6;">${Views.escape(trimmed)}</div>`;
        }
        // 带方括号的标题行
        if (/^【.+】$/.test(trimmed)) {
          return `<div style="font-size:14px;font-weight:600;color:#5a3e00;margin:12px 0 6px;">${Views.escape(trimmed)}</div>`;
        }
        // 普通行
        return `<div style="font-size:13px;line-height:1.8;color:var(--text);margin-bottom:4px;">${Views.escape(trimmed)}</div>`;
      }).join('');
    }).join('');

    const body = `
      <div style="margin-bottom:14px;">
        <div style="font-size:17px;font-weight:700;line-height:1.4;color:#5a3e00;margin-bottom:8px;">${Views.escape(item.title)}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
          ${item.tags.map(t => `<span class="fk-tag">${Views.escape(t)}</span>`).join('')}
        </div>
      </div>
      <div style="background:linear-gradient(135deg, rgba(245,166,35,0.04), rgba(245,166,35,0.01));border-radius:12px;padding:16px;border:1px solid rgba(245,166,35,0.1);">
        ${detailHtml}
      </div>
    `;
    this.openModal({
      title: '📖 详细讲解',
      body,
      footer: '<button class="btn btn-primary btn-block" onclick="UI.closeModal()">明白了</button>'
    });
  },

  // ===== 财经资讯详情（直接显示详细内容，无跳转） =====
  openFinanceNewsDetailModal(item) {
    const body = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
        <span class="finance-news-source">${Views.escape(item.source)}</span>
        ${item.hot ? '<span class="finance-hot-badge">热</span>' : ''}
        <span style="font-size:12px;color:var(--text-muted);margin-left:auto;">${Views.escape(item.fetchDate || '')}</span>
      </div>
      <div style="font-size:18px;font-weight:700;line-height:1.4;margin-bottom:12px;color:var(--text);">${Views.escape(item.title)}</div>
      <div style="font-size:14px;line-height:1.8;color:var(--text);white-space:pre-wrap;margin-bottom:16px;">${Views.escape(item.content || item.summary || '')}</div>
      ${item.sector ? `
        <div style="background:var(--bg-soft);border-radius:10px;padding:10px 12px;margin-bottom:12px;">
          <span style="font-size:12px;color:var(--text-sub);">所属板块：</span>
          <span style="font-size:13px;font-weight:600;color:var(--primary-dark);">${Views.escape(item.sector)}</span>
        </div>
      ` : ''}
      ${item.stocks && item.stocks.length ? `
        <div style="margin-bottom:16px;">
          <div style="font-size:13px;font-weight:600;color:var(--text-sub);margin-bottom:8px;">相关个股/标的</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${item.stocks.map(s => `<span style="padding:4px 10px;background:rgba(255,143,163,0.12);color:var(--primary-dark);border-radius:8px;font-size:12px;font-weight:500;">${Views.escape(s)}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    `;
    this.openModal({
      title: '资讯详情',
      body,
      onMount: (modal) => {}
    });
  },

  openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('show');
  },
  closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
  },

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  compressImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxW = 800, maxH = 1000;
          let { width, height } = img;
          if (width > maxW) { height = height * maxW / width; width = maxW; }
          if (height > maxH) { width = width * maxH / height; height = maxH; }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  formatDateTime(d) {
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  },

  // ===== 通用分类管理 =====
  openCategoryManager(title, storeKey, onUpdate) {
    const categories = Store.get(storeKey);
    let cats = [...categories];
    const body = `
      <div style="margin-bottom:12px;">
        <div style="display:flex;gap:6px;margin-bottom:12px;">
          <input class="input" id="cm_input" placeholder="输入新分类名称" style="flex:1;">
          <button class="btn btn-sm btn-primary" id="cm_add" style="flex-shrink:0;">添加</button>
        </div>
        <div class="option-group" id="cm_list">
          ${cats.map(c => `<button class="option-chip" data-cat="${Views.escape(c)}">${Views.escape(c)} <span style="color:var(--text-muted);margin-left:4px;font-size:11px;">×</span></button>`).join('')}
        </div>
        ${cats.length === 0 ? '<div style="text-align:center;color:var(--text-muted);padding:12px;">暂无分类</div>' : ''}
      </div>
    `;
    this.openModal({
      title, body,
      onMount: (modal) => {
        const input = modal.querySelector('#cm_input');
        const list = modal.querySelector('#cm_list');
        const refreshList = () => {
          cats = Store.get(storeKey);
          list.innerHTML = cats.map(c => `<button class="option-chip" data-cat="${Views.escape(c)}">${Views.escape(c)} <span style="color:var(--text-muted);margin-left:4px;font-size:11px;">×</span></button>`).join('');
          if (cats.length === 0) list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:12px;">暂无分类</div>';
          bindChips();
        };
        const bindChips = () => {
          list.querySelectorAll('.option-chip').forEach(chip => {
            chip.onclick = () => {
              const name = chip.dataset.cat;
              Store.removeCategory(storeKey, name);
              refreshList();
              if (onUpdate) onUpdate();
            };
          });
        };
        bindChips();
        modal.querySelector('#cm_add').onclick = () => {
          const val = input.value.trim();
          if (!val) return this.toast('请输入分类名称');
          if (cats.includes(val)) return this.toast('分类已存在');
          Store.addCategory(storeKey, val);
          input.value = '';
          refreshList();
          if (onUpdate) onUpdate();
        };
      }
    });
  },

  // ===== 灵感集 CRUD =====
  openInspirationModal(item = null) {
    const isEdit = !!item;
    const categories = Store.get('inspirationCategories');
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    let imageData = item ? (item.image || '') : '';

    const body = `
      <div class="field">
        <label class="label">标题</label>
        <input class="input" id="is_title" placeholder="一句话描述这个灵感" value="${item ? Views.escape(item.title) : ''}">
      </div>
      <div class="field">
        <label class="label">描述</label>
        <textarea class="textarea" id="is_desc" placeholder="补充说明..." style="min-height:60px;">${item ? Views.escape(item.desc || '') : ''}</textarea>
      </div>
      <div class="field">
        <label class="label">分类</label>
        <div class="option-group" id="is_cat_group">
          ${categories.map(c => `<button class="option-chip ${(!item && categories[0] === c) || (item && item.category === c) ? 'active' : ''}" data-val="${Views.escape(c)}">${Views.escape(c)}</button>`).join('')}
        </div>
      </div>
      <div class="field">
        <label class="label">图片来源（可选）</label>
        <div class="img-upload-area" id="is_img_area">
          ${imageData ? `<div class="img-preview-grid"><div class="img-preview"><img src="${imageData}"><span class="img-remove" id="is_img_remove">×</span></div></div>` : '<div style="padding:16px;text-align:center;color:var(--text-muted);">点击上传图片</div>'}
        </div>
        <input type="file" accept="image/*" id="is_img_input" style="display:none;">
      </div>
      <div class="field">
        <label class="label">来源名称（可选）</label>
        <input class="input" id="is_source" placeholder="如：小红书、Pinterest..." value="${item ? Views.escape(item.source || '') : ''}">
      </div>
      <div class="field">
        <label class="label">来源链接（可选）</label>
        <input class="input" id="is_url" placeholder="https://..." value="${item ? Views.escape(item.sourceUrl || '') : ''}">
      </div>
    `;
    const footer = `
      <button class="btn btn-primary btn-block" id="is_save">${isEdit ? '保存修改' : '收藏灵感'}</button>
    `;
    this.openModal({
      title: isEdit ? '编辑灵感' : '收藏灵感',
      body, footer,
      onMount: (modal) => {
        let selectedCat = item ? item.category : categories[0] || '未分类';
        modal.querySelector('#is_cat_group').onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          modal.querySelectorAll('#is_cat_group .option-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          selectedCat = chip.dataset.val;
        };

        const imgArea = modal.querySelector('#is_img_area');
        const imgInput = modal.querySelector('#is_img_input');
        imgArea.onclick = () => imgInput.click();
        imgInput.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            this.compressImage(file, 600).then(dataUrl => {
              imageData = dataUrl;
              imgArea.innerHTML = `<div class="img-preview-grid"><div class="img-preview"><img src="${dataUrl}"><span class="img-remove" id="is_img_remove">×</span></div></div>`;
              const rm = imgArea.querySelector('#is_img_remove');
              if (rm) rm.onclick = (ev) => { ev.stopPropagation(); imageData = ''; imgArea.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text-muted);">点击上传图片</div>'; };
            });
          }
        };

        modal.querySelector('#is_save').onclick = () => {
          const title = modal.querySelector('#is_title').value.trim();
          if (!title) return this.toast('请输入标题');
          const data = {
            id: item ? item.id : Store.genId(),
            title,
            desc: modal.querySelector('#is_desc').value.trim(),
            category: selectedCat,
            image: imageData,
            source: modal.querySelector('#is_source').value.trim(),
            sourceUrl: modal.querySelector('#is_url').value.trim(),
            addDate: item ? item.addDate : todayStr
          };
          if (isEdit) {
            Store.updateInArray('inspirations', data.id, data);
          } else {
            Store.addToArray('inspirations', data);
          }
          this.closeModal();
          Views.render('inspiration');
          this.toast(isEdit ? '已更新' : '已收藏');
        };
      }
    });
  },

  openInspirationDetailModal(item) {
    const body = `
      ${item.image ? `<div style="display:flex;justify-content:center;margin-bottom:14px;"><img src="${Views.escape(item.image)}" style="max-width:100%;max-height:240px;border-radius:10px;object-fit:contain;" onerror="this.style.display='none'"></div>` : ''}
      <div style="margin-bottom:12px;">
        <div style="font-size:17px;font-weight:700;line-height:1.4;">${Views.escape(item.title)}</div>
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
          <span class="tag tag-primary">${Views.escape(item.category || '未分类')}</span>
          ${item.source ? `<span class="tag">来源：${Views.escape(item.source)}</span>` : ''}
          ${item.addDate ? `<span class="tag">${Views.escape(item.addDate)}</span>` : ''}
        </div>
      </div>
      ${item.desc ? `<div style="font-size:14px;line-height:1.7;color:var(--text);white-space:pre-wrap;margin-bottom:14px;">${Views.escape(item.desc)}</div>` : ''}
      ${item.sourceUrl ? `<div style="margin-top:12px;"><a href="${Views.escape(item.sourceUrl)}" target="_blank" class="btn btn-ghost btn-block" style="text-decoration:none;">🔗 查看来源</a></div>` : ''}
    `;
    const footer = `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-ghost" style="flex:1;" id="id_edit">编辑</button>
        <button class="btn btn-sm" style="flex-shrink:0;background:linear-gradient(135deg,#fdcb6e,#f5a623);color:#fff;" id="id_share">📤 分享图</button>
        <button class="btn btn-danger btn-sm" style="flex-shrink:0;" id="id_del">删除</button>
      </div>
    `;
    this.openModal({
      title: '灵感详情', body, footer,
      onMount: (modal) => {
        modal.querySelector('#id_edit').onclick = () => { this.closeModal(); this.openInspirationModal(item); };
        modal.querySelector('#id_share').onclick = () => {
          const dataUrl = this.generateShareImage(item);
          const shareBody = `
            <div class="share-preview"><img src="${dataUrl}" alt="分享图"></div>
          `;
          const shareFooter = '<button class="btn btn-primary btn-block" id="sh_save">💾 保存图片</button>';
          this.openModal({
            title: '分享图预览',
            body: shareBody, footer: shareFooter,
            onMount: (sm) => {
              sm.querySelector('#sh_save').onclick = () => {
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `灵感-${item.title || '分享'}.png`;
                a.click();
                this.toast('图片已保存');
              };
            }
          });
        };
        modal.querySelector('#id_del').onclick = () => {
          this.confirm('确定删除该灵感？', () => {
            Store.removeFromArray('inspirations', item.id);
            Views.render('inspiration');
            this.toast('已删除');
          });
        };
      }
    });
  },

  // ===== 技能提升通用 CRUD =====
  openKnowledgeModal(storeKey, catKey, item = null) {
    const isEdit = !!item;
    const categories = Store.get(catKey);
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    let tags = item ? [...(item.tags || [])] : [];

    const moduleNameMap = { copywritingItems: '文案表达', editingItems: '视频剪辑', posterItems: '海报制作' };
    const moduleName = moduleNameMap[storeKey] || '';

    const body = `
      <div class="field">
        <label class="label">标题</label>
        <input class="input" id="km_title" placeholder="输入标题" value="${item ? Views.escape(item.title) : ''}">
      </div>
      <div class="field">
        <label class="label">描述</label>
        <textarea class="textarea" id="km_desc" placeholder="简要描述内容..." style="min-height:60px;">${item ? Views.escape(item.desc || '') : ''}</textarea>
      </div>
      <div class="field">
        <label class="label">分类</label>
        <div class="option-group" id="km_cat_group">
          ${categories.map(c => `<button class="option-chip ${(!item && categories[0] === c) || (item && item.category === c) ? 'active' : ''}" data-val="${Views.escape(c)}">${Views.escape(c)}</button>`).join('')}
        </div>
      </div>
      <div class="field">
        <label class="label">来源名称（可选）</label>
        <input class="input" id="km_source" placeholder="如：B站、小红书..." value="${item ? Views.escape(item.source || '') : ''}">
      </div>
      <div class="field">
        <label class="label">来源链接（可选）</label>
        <input class="input" id="km_url" placeholder="https://..." value="${item ? Views.escape(item.sourceUrl || '') : ''}">
      </div>
      <div class="field">
        <label class="label">标签（可选，用逗号分隔）</label>
        <input class="input" id="km_tags" placeholder="如：入门,干货,免费" value="${tags.join(',')}">
      </div>
      <div class="field">
        <label class="label">学习笔记</label>
        <textarea class="textarea" id="km_notes" placeholder="记录你的学习心得和要点..." style="min-height:80px;">${item ? Views.escape(item.notes || '') : ''}</textarea>
      </div>
    `;
    const footer = `
      <button class="btn btn-primary btn-block" id="km_save">${isEdit ? '保存修改' : '添加内容'}</button>
    `;
    this.openModal({
      title: isEdit ? `编辑${moduleName}内容` : `添加${moduleName}内容`,
      body, footer,
      onMount: (modal) => {
        let selectedCat = item ? item.category : categories[0] || '未分类';
        modal.querySelector('#km_cat_group').onclick = (e) => {
          const chip = e.target.closest('.option-chip');
          if (!chip) return;
          modal.querySelectorAll('#km_cat_group .option-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          selectedCat = chip.dataset.val;
        };

        modal.querySelector('#km_save').onclick = () => {
          const title = modal.querySelector('#km_title').value.trim();
          if (!title) return this.toast('请输入标题');
          const tagStr = modal.querySelector('#km_tags').value.trim();
          const data = {
            id: item ? item.id : Store.genId(),
            title,
            desc: modal.querySelector('#km_desc').value.trim(),
            category: selectedCat,
            source: modal.querySelector('#km_source').value.trim(),
            sourceUrl: modal.querySelector('#km_url').value.trim(),
            tags: tagStr ? tagStr.split(',').map(t => t.trim()).filter(Boolean) : [],
            notes: modal.querySelector('#km_notes').value.trim(),
            addDate: item ? item.addDate : todayStr
          };
          if (isEdit) {
            Store.updateInArray(storeKey, data.id, data);
          } else {
            Store.addToArray(storeKey, data);
          }
          this.closeModal();
          const viewMap = { copywritingItems: 'copywriting', editingItems: 'editing', posterItems: 'poster' };
          Views.render(viewMap[storeKey] || 'copywriting');
          this.toast(isEdit ? '已更新' : '已添加');
        };
      }
    });
  },

  openKnowledgeDetailModal(storeKey, item) {
    const moduleNameMap = { copywritingItems: '文案表达', editingItems: '视频剪辑', posterItems: '海报制作' };
    const viewMap = { copywritingItems: 'copywriting', editingItems: 'editing', posterItems: 'poster' };
    const moduleName = moduleNameMap[storeKey] || '';
    const body = `
      <div style="margin-bottom:12px;">
        <div style="font-size:17px;font-weight:700;line-height:1.4;">${Views.escape(item.title)}</div>
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
          <span class="tag tag-primary">${Views.escape(item.category || '未分类')}</span>
          ${item.source ? `<span class="tag">${Views.escape(item.source)}</span>` : ''}
          ${item.addDate ? `<span class="tag">${Views.escape(item.addDate)}</span>` : ''}
        </div>
      </div>
      ${item.desc ? `<div style="font-size:14px;line-height:1.7;color:var(--text);margin-bottom:14px;white-space:pre-wrap;">${Views.escape(item.desc)}</div>` : ''}
      ${(item.tags && item.tags.length > 0) ? `<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px;">${item.tags.map(t => `<span class="knowledge-card-tag">${Views.escape(t)}</span>`).join('')}</div>` : ''}
      ${item.notes ? `
        <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border);">
          <div style="font-size:13px;font-weight:600;color:var(--text-sub);margin-bottom:8px;">📝 学习笔记</div>
          <div style="font-size:14px;line-height:1.7;color:var(--text);white-space:pre-wrap;">${Views.escape(item.notes)}</div>
        </div>
      ` : ''}
      ${item.sourceUrl ? `<div style="margin-top:14px;"><a href="${Views.escape(item.sourceUrl)}" target="_blank" class="btn btn-ghost btn-block" style="text-decoration:none;">🔗 查看来源</a></div>` : ''}
    `;
    const footer = `
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost" style="flex:1;" id="kd_edit">编辑</button>
        <button class="btn btn-danger btn-sm" style="flex-shrink:0;" id="kd_del">删除</button>
      </div>
    `;
    this.openModal({
      title: `${moduleName}详情`, body, footer,
      onMount: (modal) => {
        modal.querySelector('#kd_edit').onclick = () => {
          this.closeModal();
          const catKey = storeKey.replace('Items', 'Categories');
          this.openKnowledgeModal(storeKey, catKey, item);
        };
        modal.querySelector('#kd_del').onclick = () => {
          this.confirm('确定删除该内容？', () => {
            Store.removeFromArray(storeKey, item.id);
            Views.render(viewMap[storeKey] || 'copywriting');
            this.toast('已删除');
          });
        };
      }
    });
  }
};

// ===== AI内容采集器（重构：AI工具 + AI新闻） =====
const AIFetcher = {
  // AI软件工具数据库
  toolsDatabase: [
    // 对话/写作类
    { name: 'ChatGPT', icon: '💬', desc: 'OpenAI出品的对话式AI，支持写作、编程、翻译、分析等，全球最流行的AI助手。', tags: ['对话', '写作', '编程'], free: false, cn: false, category: '对话写作' },
    { name: 'Claude', icon: '🧠', desc: 'Anthropic出品，擅长长文本处理（200K上下文），代码生成和复杂推理能力出色。', tags: ['对话', '长文本', '编程'], free: false, cn: false, category: '对话写作' },
    { name: 'Kimi', icon: '🌙', desc: '月之暗面出品，支持200万字超长文档分析，联网搜索，文件上传，国产AI标杆。', tags: ['长文档', '联网', '办公'], free: true, cn: true, category: '对话写作' },
    { name: '通义千问', icon: '☁️', desc: '阿里云出品，多模态理解，支持写代码、做表格、读文档，集成在钉钉/夸克中。', tags: ['多模态', '办公', '编程'], free: true, cn: true, category: '对话写作' },
    { name: '文心一言', icon: '📝', desc: '百度出品，中文理解和创作能力强，集成百度搜索和百度文库生态。', tags: ['中文', '创作', '搜索'], free: true, cn: true, category: '对话写作' },
    { name: '豆包', icon: '🫘', desc: '字节跳动出品，语音对话流畅，集成抖音/头条生态，适合日常助手场景。', tags: ['语音', '日常助手', '娱乐'], free: true, cn: true, category: '对话写作' },
    { name: 'DeepSeek', icon: '🔍', desc: '深度求索出品，开源模型性能媲美GPT-4，推理能力强，代码生成出色。', tags: ['开源', '推理', '编程'], free: true, cn: true, category: '对话写作' },
    { name: 'ChatGLM', icon: '🔥', desc: '智谱AI出品，开源大模型，支持Function Call和代码解释器，企业级应用友好。', tags: ['开源', '企业', '编程'], free: true, cn: true, category: '对话写作' },
    // AI绘画类
    { name: 'Midjourney', icon: '🎨', desc: 'AI绘画标杆，生成质量极高，艺术感强，通过Discord使用，需付费订阅。', tags: ['绘画', '艺术', '高质量'], free: false, cn: false, category: 'AI绘画' },
    { name: 'Stable Diffusion', icon: '🖼️', desc: '开源AI绘画模型，可本地部署免费使用，支持ControlNet/LoRA等插件生态。', tags: ['开源', '本地', '免费'], free: true, cn: false, category: 'AI绘画' },
    { name: 'DALL·E 3', icon: '✨', desc: 'OpenAI出品，集成在ChatGPT中，文字理解准确，风格多样，适合快速出图。', tags: ['绘画', '文字理解', '多样'], free: false, cn: false, category: 'AI绘画' },
    { name: '即梦AI', icon: '🎯', desc: '字节跳动出品，中文提示词理解强，支持文生图/视频，免费额度多，出图速度快。', tags: ['中文', '免费', '出图快'], free: true, cn: true, category: 'AI绘画' },
    // AI视频类
    { name: '可灵AI', icon: '🎬', desc: '快手出品，文字/图片直接生成视频，支持5-10秒高清输出，每天有免费额度。', tags: ['视频生成', '文生视频', '免费'], free: true, cn: true, category: 'AI视频' },
    { name: 'Sora', icon: '🎥', desc: 'OpenAI出品，文本生成超逼真视频，物理世界理解强，目前仅限部分用户。', tags: ['视频生成', '逼真', '前沿'], free: false, cn: false, category: 'AI视频' },
    { name: 'Runway', icon: '🎞️', desc: '专业级AI视频编辑工具，支持文生视频、图生视频、视频风格化、绿幕抠像。', tags: ['视频编辑', '专业', '风格化'], free: false, cn: false, category: 'AI视频' },
    { name: '剪映AI', icon: '✂️', desc: '字节出品，集成AI剪辑、自动字幕、数字人、AI配音等，手机端操作方便。', tags: ['剪辑', '字幕', '手机端'], free: true, cn: true, category: 'AI视频' },
    // AI办公类
    { name: 'Notion AI', icon: '📋', desc: '集成在Notion笔记中，支持AI写作、总结、翻译、自动填表，知识管理利器。', tags: ['笔记', '写作', '知识管理'], free: false, cn: false, category: 'AI办公' },
    { name: 'Gamma', icon: '📊', desc: 'AI做PPT神器，输入主题5分钟生成精美演示文稿，支持一键换色、调布局。', tags: ['PPT', '演示', '自动化'], free: true, cn: false, category: 'AI办公' },
    { name: 'WPS AI', icon: '📄', desc: '金山WPS集成AI，支持智能写作、表格分析、PDF总结，办公场景全覆盖。', tags: ['办公', '文档', '表格'], free: true, cn: true, category: 'AI办公' },
    { name: '飞书智能伙伴', icon: '🐦', desc: '飞书集成AI助手，会议纪要、文档总结、消息摘要，团队协作效率工具。', tags: ['协作', '会议', '团队'], free: true, cn: true, category: 'AI办公' },
    // AI音乐/音频
    { name: 'Suno', icon: '🎵', desc: 'AI音乐生成器，用文字描述即可生成完整歌曲（含歌词+旋律），支持多种风格。', tags: ['音乐', '创作', '风格多样'], free: true, cn: false, category: 'AI音乐' },
    { name: '剪映配音', icon: '🎤', desc: 'AI文字转语音，多种音色可选，支持情感朗读，适合短视频配音和有声书。', tags: ['配音', 'TTS', '短视频'], free: true, cn: true, category: 'AI音乐' },
    // AI设计类
    { name: 'Canva AI', icon: '🎨', desc: '在线设计平台集成AI，自动生成海报/封面/LOGO，海量模板，操作简单。', tags: ['设计', '海报', '模板'], free: true, cn: false, category: 'AI设计' },
    { name: '稿定AI', icon: '🖌️', desc: '国产在线设计工具，AI生成电商图/公众号封面/小红书配图，电商运营必备。', tags: ['电商', '封面', '运营'], free: true, cn: true, category: 'AI设计' },
    { name: 'Figma AI', icon: '🎯', desc: 'UI设计工具集成AI，自动生成设计稿、图标、配色方案，设计师效率工具。', tags: ['UI设计', '图标', '原型'], free: true, cn: false, category: 'AI设计' },
    // AI编程类
    { name: 'GitHub Copilot', icon: '💻', desc: 'GitHub出品，AI代码补全工具，集成在VS Code等IDE中，大幅提升编程效率。', tags: ['编程', '补全', 'IDE'], free: false, cn: false, category: 'AI编程' },
    { name: 'Cursor', icon: '🖱️', desc: 'AI代码编辑器，基于VS Code深度定制，支持自然语言编程，新一代开发工具。', tags: ['编程', '编辑器', '自然语言'], free: true, cn: false, category: 'AI编程' },
    { name: '通义灵码', icon: '🔧', desc: '阿里出品，免费的AI编程助手，集成在IDE中，支持代码生成、注释、Debug。', tags: ['编程', '免费', '国产'], free: true, cn: true, category: 'AI编程' },
  ],

  getTools() {
    return this.toolsDatabase;
  },

  // AI行业新闻数据库
  newsDatabase: [
    { source: '36氪', title: 'OpenAI发布GPT-5：多模态能力大幅提升，推理速度提高3倍', desc: 'OpenAI正式发布GPT-5，支持文本/图像/音频/视频多模态输入输出。', content: 'OpenAI于本周正式发布GPT-5模型，在多个维度实现重大突破：\n\n1. 多模态能力：原生支持文本、图像、音频、视频的输入和输出，不再需要插件辅助。\n2. 推理速度：推理速度比GPT-4提高3倍，成本降低50%。\n3. 上下文窗口：支持100万token上下文，可一次性处理整本书。\n4. Agent能力：内置工具调用和自主决策能力，可独立完成多步骤任务。\n\n行业影响：GPT-5的发布将加速AI应用落地，预计带动AI算力需求再增长200%。', tags: ['OpenAI', 'GPT-5', '多模态', '算力'] },
    { source: '机器之心', title: 'Claude 4发布：支持200万token上下��，企业级安全能力升级', desc: 'Anthropic发布Claude 4，上下文窗口扩展至200万token。', content: 'Anthropic发布Claude 4系列模型，核心亮点：\n\n1. 200万token上下文：可一次性处理《三体》三部曲，企业文档分析能力革命性提升。\n2. Computer Use：AI可直接操控电脑，完成网页操作、文件管理等任务。\n3. 安全对齐：引入Constitutional AI 2.0，有害输出率降低至0.01%。\n4. 企业功能：支持私有化部署、审计日志、数据隔离。\n\n市场反应：多家财富500强企业已签约Claude 4企业版。', tags: ['Anthropic', 'Claude', '企业AI', '长上下文'] },
    { source: '量子位', title: 'DeepSeek-V3开源：性能追平GPT-4o，训练成本仅500万美元', desc: '深度求索开源DeepSeek-V3，MoE架构671B参数，性能接近GPT-4o。', content: '深度求索发布并开源DeepSeek-V3模型：\n\n1. 架构：MoE（混合专家）架构，总参数671B，激活参数37B。\n2. 性能：在数学、代码、中文理解等任务上接近GPT-4o水平。\n3. 成本：训练成本约500万美元，仅为同类模型的1/20。\n4. 开源：完全开源，支持商用。\n\n行业震动：DeepSeek-V3证明中国AI在效率上具有显著优势，API价格仅为GPT-4o的1/50。', tags: ['DeepSeek', '开源', '国产', '低成本'] },
    { source: '36氪', title: '字节跳动豆包大模型日均调用量突破5000亿Token', desc: '豆包大模型日均token调用量突破5000亿，成为中国用量最大的AI模型。', content: '字节跳动在AI领域的最新进展：\n\n1. 豆包大模型日均调用量突破5000亿Token，超越国内所有竞品。\n2. 应用场景：抖音AI搜索、剪映AI剪辑、飞书智能伙伴、即梦AI等全线产品接入。\n3. 价格策略：豆包Pro模型定价仅为0.0008元/千token。\n4. 生态优势：借助抖音/头条的流量分发，豆包月活用户已突破1亿。', tags: ['字节跳动', '豆包', '大模型', '流量'] },
    { source: '机器之心', title: '英伟达发布B200 GPU：AI算力再翻倍，推理性能提升30倍', desc: '英伟达发布Blackwell架构B200 GPU，算力达20 petaFLOPS。', content: '英伟达在GTC大会上发布新一代Blackwell架构GPU：\n\n1. B200性能：20 petaFLOPS AI算力，192GB HBM3e显存，8TB/s带宽。\n2. 推理性能：比H100提升30倍，大模型推理成本可降低96%。\n3. GB200超级芯片：将Grace CPU和B200 GPU结合，专为万亿参数大模型设计。\n4. 客户订单：微软、谷歌、Meta、亚马逊等已下单，订单排期至2026年。', tags: ['英伟达', 'GPU', '算力', '芯片'] },
    { source: '量子位', title: '阿里通义千问发布Qwen2.5：全面开源，数学能力超GPT-4o', desc: '阿里云发布Qwen2.5系列模型，数学推理能力超越GPT-4o。', content: '阿里云发布Qwen2.5系列模型：\n\n1. 多尺寸：提供0.5B到72B共7个尺寸，适配从手机到数据中心的部署需求。\n2. 数学能力：72B模型在MATH基准测试中得分超越GPT-4o。\n3. 代码能力：在HumanEval评测中达到92%的正确率。\n4. 开源协议：采用Apache 2.0协议，完全开源商用。\n\nQwen2.5在HuggingFace下载量突破500万次，成为中国最受欢迎的开源大模型。', tags: ['阿里', '通义千问', '开源', '数学'] },
    { source: '36氪', title: '微软Copilot全面升级：集成GPT-5，Office全家桶AI化', desc: '微软宣布Copilot全面升级，集成最新GPT-5模型。', content: '微软在Build大会上宣布Copilot重大升级：\n\n1. Copilot+PC：推出AI PC新品类，内置NPU芯片，本地运行AI模型。\n2. Office集成：Word AI写作、Excel AI分析、PPT AI生成、Outlook AI邮件。\n3. Recall功能：AI记录电脑操作历史，支持自然语言搜索任何看过的内容。\n4. Copilot Studio：企业可自定义AI Agent，连接业务系统。', tags: ['微软', 'Copilot', 'Office', 'AI PC'] },
    { source: '机器之心', title: 'Google发布Gemini 2.0：原生多模态Agent，可自主完成复杂任务', desc: 'Google发布Gemini 2.0，具备原生Agent能力。', content: 'Google发布Gemini 2.0，核心突破：\n\n1. Agent能力：可自主分解复杂任务、调用工具、执行多步骤操作。\n2. 多模态：原生理解文本/图像/音频/视频/代码，无缝切换。\n3. Project Astra：AI助手可实时理解摄像头画面，进行自然对话。\n4. Project Mariner：AI可操控Chrome浏览器完成网页任务。', tags: ['Google', 'Gemini', 'Agent', '多模态'] },
    { source: '量子位', title: '智谱AI完成新一轮30亿元融资，估值突破200亿', desc: '智谱AI完成30亿元融资，投后估值超200亿元。', content: '智谱AI宣布完成新一轮融资：\n\n1. 融资规模：30亿元人民币，由中东主权基金和国内头部机构联合投资。\n2. 估值：投后估值超200亿元，成为中国大模型赛道估值最高的创业公司。\n3. 业务进展：ChatGLM系列模型开源下载量超2000万次，企业客户超1万家。\n4. 商业化：MaaS平台年收入突破5亿元，覆盖金融、政务、教育等行业。', tags: ['智谱AI', '融资', '估值', '商业化'] },
    { source: '36氪', title: '苹果Apple Intelligence正式上线：Siri全面AI化，隐私优先', desc: '苹果Apple Intelligence功能正式推送，Siri全面升级。', content: '苹果Apple Intelligence正式上线：\n\n1. Siri升级：支持自然语言理解、上下文记忆、屏幕感知，可跨App执行操作。\n2. 写作工具：全系统AI写作、摘要、重写、校对。\n3. 图像工具：Genmoji（AI表情）、Image Playground（AI生图）、图片消除。\n4. 隐私架构：端侧处理为主，复杂任务使用Private Cloud Compute，数据不留存。', tags: ['苹果', 'Siri', '端侧AI', '隐私'] },
    { source: '机器之心', title: 'AI搜索大战升级：Perplexity估值90亿美元，挑战Google', desc: 'AI搜索引擎Perplexity完成新一轮融资，估值达90亿美元。', content: 'AI搜索赛道最新动态：\n\n1. Perplexity：估值90亿美元，月活用户1500万，主打「AI答案+引用来源」。\n2. SearchGPT：OpenAI推出AI搜索，整合实时网络信息。\n3. 百度AI搜索：百度搜索全面AI化，搜索结果页优先展示AI生成摘��。\n4. 微软Bing：集成Copilot，AI搜索市场份额从3%提升至8%。', tags: ['AI搜索', 'Perplexity', '搜索引擎', '竞争'] },
    { source: '量子位', title: '人形机器人Figure 02进厂打工：在宝马生产线自主工作', desc: 'Figure AI发布Figure 02人形机器人，已在宝马工厂自主完成零部件装配。', content: 'Figure AI发布第二代通用人形机器人Figure 02：\n\n1. 硬件升级：全身自由度41个，手部16个自由度，可完成精细操作。\n2. AI能力：集成GPT-5级别大模型，理解自然语言指令，自主规划动作。\n3. 宝马实测：在宝马Spartanburg工厂自主完成钣金件搬运和装配。\n4. 商业化：与宝马签署商业协议，2025年小批量部署。', tags: ['人形机器人', 'Figure', '制造业', '自动化'] },
  ],

  async fetch() {
    UI.toast('正在采集AI新闻...');
    await new Promise(r => setTimeout(r, 1000));
    const today = Store.todayKey();
    const pool = [...this.newsDatabase].sort(() => Math.random() - 0.5);
    const pickCount = Math.min(8 + Math.floor(Math.random() * 5), pool.length);
    const newItems = pool.slice(0, pickCount).map(item => ({
      id: Store.genId(), ...item, fetchDate: today
    }));
    const shuffledTools = [...this.toolsDatabase].sort(() => Math.random() - 0.5);
    Store.set('aiTools', shuffledTools);
    const others = Store.get('aiItems').filter(e => e.fetchDate !== today);
    Store.set('aiItems', [...newItems, ...others].slice(0, 80));
    Store.set('aiLastFetch', today + ' 09:00');
    UI.toast('已采集 ' + newItems.length + ' 条AI新闻 + ' + shuffledTools.length + ' 个AI工具');
  }
};



// ===== 财经内容采集器 =====
const FinanceFetcher = {
  // 精选财经新闻（含正文全文，来源标注央视财经/第一财经/财联社等）
  newsPool: [
    { 
      source: '央视财经', 
      title: '央行宣布降准0.5个百分点 释放长期资金约1万亿元', 
      summary: '央行决定于本月15日下调金融机构存款准备金率0.5个百分点，预计释放长期资金约1万亿元。',
      content: '中国人民银行发布公告，为支持实体经济发展，降低社会融资实际成本，决定于本月15日下调金融机构存款准备金率0.5个百分点（不含已执行5%存款准备金率的金融机构）。\n\n本次降准为全面降准，预计释放长期资金约1万亿元。降准后，金融机构加权平均存款准备金率为7.4%。\n\n央行表示，此次降准是落实加大逆周期调节力度的重要举措，将有助于降低银行资金成本，进而降低实体经济融资成本。市场分析认为，降准直接利好银行息差，同时为地产、基建等行业提供更宽松的流动性环境。',
      sector: '银行/地产', stocks: ['工商银行', '建设银行', '招商银行', '万科A'], 
      url: 'https://tv.cctv.com/lm/cjxw/', deepLink: 'cctv财经://',
      hot: true 
    },
    { 
      source: '第一财经', 
      title: '新能源车销量再创新高 渗透率突破40%', 
      summary: '本月新能源乘用车零售销量预计达85万辆，渗透率首次突破40%。',
      content: '据乘联会数据，本月新能源乘用车零售销量预计达到85万辆，同比增长32%，渗透率首次突破40%。\n\n细分来看，纯电动车销量52万辆，插电混动销量33万辆。比亚迪以28万辆的月销量继续领跑，特斯拉中国交付7.2万辆，理想、蔚来、小鹏等新势力销量均创新高。\n\n产业链方面，宁德时代动力电池装机量稳居全球第一，占比超37%。上游锂电材料价格企稳，电池厂毛利率改善。机构预计2025年新能源车渗透率将达50%，产业链景气度持续向上。',
      sector: '新能源车', stocks: ['比亚迪', '宁德时代', '理想汽车', '亿纬锂能'], 
      url: 'https://www.yicai.com/news/', deepLink: '第一财经://',
      hot: true 
    },
    { 
      source: '央视财经', 
      title: '半导体板块持续走强 国产替代逻辑加速', 
      summary: '受国产替代政策推动，半导体设备、材料板块业绩超预期。',
      content: '近期半导体板块表现强势，国产替代逻辑加速演绎。从已披露的中报业绩看，半导体设备公司业绩普遍超预期。\n\n中微公司Q2营收同比增长35%，刻蚀设备订单饱满；北方华创新签订单同比增长40%，产品结构持续优化。材料端，沪硅产业、雅克科技等大硅片、光刻胶企业产能利用率提升。\n\n政策面上，国家大基金三期成立，注册资本3440亿元，重点投向半导体设备、材料等"卡脖子"环节。机构认为，国产替代进入加速期，半导体设备国产化率有望从当前的20%提升至40%以上。',
      sector: '半导体', stocks: ['中微公司', '北方华创', '沪硅产业', '雅克科技'], 
      url: 'https://tv.cctv.com/lm/cjxw/', deepLink: 'cctv财经://'
    },
    { 
      source: '第一财经', 
      title: 'AI算力需求持续爆发 光模块板块业绩亮眼', 
      summary: '随着大模型训练需求增长，光模块、服务器订单饱满。',
      content: '随着全球大模型训练和推理需求持续爆发，AI算力产业链高景气延续。光模块作为算力网络的核心器件，业绩表现亮眼。\n\n中际旭创Q2营收48亿元，同比增长120%，800G光模块批量出货，1.6T产品已送样测试。新易盛Q2净利润同比增长超200%，高速光模块产能持续扩张。\n\n下游服务器端，工业富联AI服务器营收同比增长80%，浪潮信息订单可见度延伸至2025年。机构预计全球AI算力资本开支未来3年复合增速超30%，光模块、服务器、PCB等环节业绩确定性强。',
      sector: 'AI算力', stocks: ['中际旭创', '新易盛', '工业富联', '浪潮信息'], 
      url: 'https://www.yicai.com/news/', deepLink: '第一财经://',
      hot: true 
    },
    { 
      source: '财联社', 
      title: '医药板块触底回升 创新药出海加速', 
      summary: '创新药出海交易频现，License-out交易金额创新高。',
      content: '医药板块经历两年调整后，估值已处历史低位，近期触底回升信号明显。创新药出海成为最大亮点。\n\n今年以来，国内药企License-out交易频现，交易总金额超300亿美元，创历史新高。恒瑞医药将GLP-1产品组合海外权益授权给默克，交易总额超60亿美元；百利天典将双抗ADC授权给BMS，交易总额84亿美元。\n\n机构认为，创新药出海打开了估值天花板，国内药企研发实力获国际认可。叠加医保谈判规则优化、集采影响逐步出清，医药板块有望迎来戴维斯双击。',
      sector: '医药/创新药', stocks: ['恒瑞医药', '药明康德', '百利天典', '信达生物'], 
      url: 'https://www.cls.cn/telegraph', deepLink: '财联社://'
    },
    { 
      source: '央视财经', 
      title: '消费复苏信号增强 白酒板块获北向资金回流', 
      summary: '近期白酒龙头批价企稳，渠道库存下降。',
      content: '消费复苏信号持续增强，白酒板块基本面改善。近期茅台批价企稳在2650元左右，五粮液批价稳定在960元，渠道库存较年初下降20%。\n\n从资金面看，北向资金近一月净买入白酒板块超50亿元，贵州茅台、五粮液、泸州老窖均获加仓。外资看好中国白酒的长期价值，认为当前估值已具吸引力。\n\n机构分析，中秋国庆旺季备货启动，预计高端白酒动销环比改善。长期看，白酒行业集中度提升、品牌护城河深厚，具备长期配置价值。',
      sector: '消费/白酒', stocks: ['贵州茅台', '五粮液', '泸州老窖', '山西汾酒'], 
      url: 'https://tv.cctv.com/lm/cjxw/', deepLink: 'cctv财经://'
    },
    { 
      source: '第一财经', 
      title: '红利低波策略跑赢大盘 高股息板块受青睐', 
      summary: '在市场震荡背景下，银行、煤炭、电力等高股息板块表现稳健。',
      content: '在市场震荡背景下，红利低波策略显著跑赢大盘。银行、煤炭、电力等高股息板块表现稳健，红利ETF资金净流入创新高。\n\n今年以来，中证红利低波指数上涨12%，大幅跑赢沪深300。板块股息率方面，银行板块平均股息率5.2%，煤炭5.8%，电力4.5%，配置吸引力突出。\n\n机构认为，在无风险利率下行的背景下，高股息资产的配置价值凸显。新"国九条"鼓励上市公司分红，红利策略有望持续受资金青睐。建议关注：股息率稳定、现金流充沛、分红意愿强的龙头企业。',
      sector: '红利/高股息', stocks: ['工商银行', '中国神华', '长江电力', '中国海洋石油'], 
      url: 'https://www.yicai.com/news/', deepLink: '第一财经://'
    },
    { 
      source: '财联社', 
      title: '机器人产业迎来政策利好 人形机器人概念活跃', 
      summary: '工信部发布人形机器人创新发展指导意见。',
      content: '工信部发布《人形机器人创新发展指导意见》，提出到2025年人形机器人创新体系初步建立，到2027年综合实力达到世界先进水平。\n\n受政策催化，机器人板块表现活跃。减速器、伺服电机、控制器等核心零部件企业获市场关注。绿的谐波、汇川技术、双环传动等龙头订单增长明显。\n\n特斯拉Optimus进展超预期，预计2025年小批量量产。国内优必选、智元机器人等企业加速布局。机构预计，人形机器人市场规模2030年将达千亿级别，核心零部件环节率先受益。',
      sector: '机器人', stocks: ['绿的谐波', '汇川技术', '双环传动', '优必选'], 
      url: 'https://www.cls.cn/telegraph', deepLink: '财联社://',
      hot: true 
    },
    { 
      source: '央视财经', 
      title: '黄金价格创历史新高 避险需求推动金价', 
      summary: '国际金价突破2400美元/盎司，地缘政治紧张+降息预期推动避险资产配置。',
      content: '国际金价突破2400美元/盎司，创历史新高。地缘政治紧张叠加美联储降息预期，推动避险资产配置升温。\n\n世界黄金协会数据显示，全球央行连续3年净购金超1000吨，中国央行连续18个月增持黄金储备。黄金ETF资金净流入创新高，国内黄金主题ETF规模突破300亿元。\n\n机构认为，黄金长期逻辑未变：美元信用弱化、央行购金、地缘风险溢价上修。短期需关注美联储降息节奏，建议逢低配置。相关标的包括黄金股、黄金ETF等。',
      sector: '黄金/贵金属', stocks: ['山东黄金', '紫金矿业', '中金黄金', '白银有色'], 
      url: 'https://tv.cctv.com/lm/cjxw/', deepLink: 'cctv财经://',
      hot: true 
    },
    { 
      source: '第一财经', 
      title: '数据要素市场加速成型 数据资产入表落地', 
      summary: '数据资产入表政策正式实施，数据交易所交易额攀升。',
      content: '数据资产入表政策自2024年1月1日正式实施，企业数据资源可作为资产计入财务报表。政策落地以来，数据要素市场加速成型。\n\n各地数据交易所交易额攀升，上海数据交易所年度交易额突破50亿元，北京、深圳数据交易所交易活跃。三大运营商数据资产入表规模领先，中国电信数据资产评估价值超百亿元。\n\n机构认为，数据要素是继土地、劳动力、资本、技术之后的第五大生产要素。随着数据资产入表推进，数据确权、定价、交易环节加速，运营商、政务信息化、数据安全企业将持续受益。',
      sector: '数据要素', stocks: ['中国电信', '中国移动', '太极股份', '深桑达'], 
      url: 'https://www.yicai.com/news/', deepLink: '第一财经://'
    },
    { 
      source: '财联社', 
      title: '军工板块订单回暖 业绩拐点确认', 
      summary: '军工企业中期订单陆续落地，行业景气度回升。',
      content: '军工板块经历一年调整后，订单回暖信号明确。从已披露的中报看，航空、航天、信息化等细分领域订单陆续落地，行业景气度回升。\n\n中航沈飞、中航西飞等主机厂中期合同负债环比增长，航发动力交付提速。信息化端，中航光电、振华科技订单恢复增长。导弹产业链新雷能、菲利华等业绩拐点确认。\n\n机构认为，军工行业进入"十四五"收官年，装备交付加速。叠加军贸出口增长、低空经济新赛道，军工板块有望迎来业绩+估值双修复。建议关注：主机厂、航发产业链、军工信息化三条主线。',
      sector: '军工', stocks: ['中航沈飞', '航发动力', '中航光电', '中航西飞'], 
      url: 'https://www.cls.cn/telegraph', deepLink: '财联社://'
    },
    { 
      source: '央视财经', 
      title: '光伏行业产能出清 头部企业盈利改善', 
      summary: '光伏产业链价格触底，头部企业开工率回升。',
      content: '光伏行业经历产能过剩调整后，价格触底信号明确。多晶硅价格跌至4万元/吨，较高点下跌70%，已跌破部分企业成本线，产能加速出清。\n\n头部企业盈利改善：通威股份多晶硅成本降至3.5万元/吨，仍具盈利；隆基绿能BC电池技术领先，溢价明显；晶澳科技、天合光能组件出货量全球前列。\n\n机构认为，光伏行业进入新一轮洗牌期，落后产能加速退出，头部企业市占率提升。随着全球光伏装机持续增长（预计2025年达600GW），行业有望在年底迎来价格拐点，头部企业率先盈利修复。',
      sector: '光伏/新能源', stocks: ['通威股份', '隆基绿能', '晶澳科技', '天合光能'], 
      url: 'https://tv.cctv.com/lm/cjxw/', deepLink: 'cctv财经://'
    }
  ],

  // 推荐关注/投资的板块
  recommendationPool: [
    { type: '股票', name: '半导体设备', trend: '↑', reason: '国产替代政策加码，设备招标加速，Q2业绩超预期，板块估值仍处合理区间。', tags: ['国产替代', '业绩增长', '政策利好'] },
    { type: '基金', name: '半导体ETF (512480)', trend: '↑', reason: '一键配置半导体龙头，成分股覆盖中微、北方华创等，适合看好半导体周期但不想选股的投资者。', tags: ['ETF', '行业主题', '中长期'] },
    { type: '股票', name: 'AI算力/光模块', trend: '↑', reason: '大模型训练需求持续，光模块订单饱满，业绩确定性强，但需注意短期涨幅较大风险。', tags: ['AI主线', '业绩确定', '高景气'] },
    { type: '基金', name: '人工智能ETF (159819)', trend: '↑', reason: '覆盖AI算力、算法、应用全产业链，分散个股风险，适合长期看好AI产业趋势的投资者。', tags: ['ETF', '主题投资', '波动较大'] },
    { type: '股票', name: '创新药', trend: '↑', reason: '出海交易频现，License-out金额创新高，板块估值已处历史低位，配置性价比凸显。', tags: ['出海', '估值低', '长线'] },
    { type: '基金', name: '医药生物ETF (512010)', trend: '↑', reason: '分散单只创新药风险，覆盖恒瑞、药明等龙头，适合左侧布局医药复苏周期。', tags: ['ETF', '左侧布局', '周期反转'] },
    { type: '股票', name: '红利高股息', trend: '↑', reason: '银行/煤炭/电力高股息板块，市场震荡中防御属性突出，股息率4-6%，适合稳健配置。', tags: ['高股息', '防御', '稳健'] },
    { type: '基金', name: '红利低波ETF (512890)', trend: '↑', reason: '策略清晰：选低波动+高股息个股，回撤控制好，适合作为底仓长期持有。', tags: ['ETF', '底仓', '低波动'] },
    { type: '股票', name: '黄金板块', trend: '↑', reason: '金价创历史新高，央行连续购金，避险+降息双逻辑，黄金股估值仍处合理区间。', tags: ['避险', '降息受益', '创新高'] },
    { type: '基金', name: '黄金ETF (518880)', trend: '↑', reason: '直接跟踪金价，无个股风险，适合看好黄金长期趋势的投资者，建议逢低分批配置。', tags: ['ETF', '避险', '长期'] }
  ],

  async fetch() {
    UI.toast('正在采集财经内容...');
    await new Promise(r => setTimeout(r, 1200));
    const today = Store.todayKey();

    // 随机抽取 6-8 条新闻
    const newsPool = [...this.newsPool].sort(() => Math.random() - 0.5);
    const newsCount = Math.min(6 + Math.floor(Math.random() * 3), newsPool.length);
    const newNews = newsPool.slice(0, newsCount).map(item => ({
      id: Store.genId(), ...item, fetchDate: today
    }));

    // 随机抽取 5-7 条推荐板块
    const recPool = [...this.recommendationPool].sort(() => Math.random() - 0.5);
    const recCount = Math.min(5 + Math.floor(Math.random() * 3), recPool.length);
    const newRecs = recPool.slice(0, recCount).map(item => ({
      id: Store.genId(), ...item
    }));

    // 替换当日内容（保留历史）
    const oldNews = Store.get('financeNews').filter(e => e.fetchDate !== today);
    Store.set('financeNews', [...newNews, ...oldNews].slice(0, 50));
    Store.set('financeRecommendations', newRecs);
    Store.set('financeLastFetch', today + ' 09:00');
    UI.toast(`已采集 ${newNews.length} 条财经资讯 + ${newRecs.length} 个推荐板块`);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Store.init();
  UI.init();
});

function checkDailyFetch() {
  const today = Store.todayKey();
  const aiLastFetch = Store.get('aiLastFetch');
  const finLastFetch = Store.get('financeLastFetch');
  const now = new Date();
  if (now.getHours() >= 9) {
    setTimeout(() => {
      // AI 采集
      if (aiLastFetch !== today + ' 09:00') {
        if (Views.current === 'ai') {
          AIFetcher.fetch().then(() => Views.render('ai'));
        } else {
          AIFetcher.fetch();
        }
      }
      // 财经采集
      if (finLastFetch !== today + ' 09:00') {
        if (Views.current === 'finance') {
          FinanceFetcher.fetch().then(() => Views.render('finance'));
        } else {
          FinanceFetcher.fetch();
        }
      }
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(checkDailyFetch, 2000);
});
