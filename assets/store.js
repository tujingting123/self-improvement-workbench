// ===== 数据存储层 =====
const Store = {
  KEY: 'self_improvement_data_v2',

  data: null,

  defaults() {
    return {
      checkins: {},
      fitnessTasks: [
        { id: 'f1', name: '普拉提', duration: '半小时', custom: false },
        { id: 'f2', name: '肚子按摩', duration: '半小时', custom: false },
        { id: 'f3', name: '盆底肌练习', duration: '半小时', custom: false }
      ],
      // 体重记录: [{ date: '2026-07-26', weight: 55.5 }]
      weightRecords: [],
      // 英语任务 — 新概念 + EnglishPod
      englishTasks: [
        { 
          id: 'e1', 
          name: '新概念英语', 
          topic: '', 
          words: [],
          phrases: [],
          topicHistory: [],
          wordHistory: [],
          phraseHistory: [],
          custom: false,
          lessonProgress: 31,
          lessonTotal: 144,
          lessonHistory: [],
          pdfs: []  // { id, name, size, data(base64), addDate }
        },
        { 
          id: 'e2', 
          name: 'EnglishPod', 
          topic: '', 
          words: [],
          phrases: [],
          topicHistory: [],
          wordHistory: [],
          phraseHistory: [],
          custom: false,
          episodeCount: 0,
          episodes: []
        }
      ],
      // 每日英语出题
      dailyQuiz: { date: '', type: '', question: '', options: [], answer: '', userAnswer: '', correct: null, aiFeedback: null },
      // 阅读
      books: [],
      // AI学习
      aiItems: [],
      aiTools: [],       // AI软件工具列表
      aiLastFetch: null,
      // 财经内容
      financeNews: [],
      financeRecommendations: [],
      financeLastFetch: null,
      // 穿搭
      outfits: [],
      // 日记本
      diaries: [],
      // 备忘录
      memos: [],
      // 灵感集
      inspirations: [],
      inspirationCategories: ['PPT设计', '海报设计', '配色方案', '文案灵感', '排版参考'],
      // 知识库已添加记录
      addedKnowledgeIds: [],
      // 技能提升 - 文案表达
      copywritingItems: [],
      copywritingCategories: ['标题技巧', '金句收集', '故事结构', '营销文案', '演讲稿'],
      // 技能提升 - 视频剪辑
      editingItems: [],
      editingCategories: ['转场技巧', '调色教程', '特效模板', '配乐素材', '剪辑思路'],
      // 技能提升 - 海报制作
      posterItems: [],
      posterCategories: ['排版设计', '字体搭配', '色彩理论', '构图技巧', '品牌设计'],
      // 周目标
      weeklyGoals: { copywriting: 5, editing: 5, poster: 5 },
      goalWeekStart: '',  // 本周起始日期 YYYY-MM-DD
      settings: {
        theme: 'light',
        lastActiveDate: null,
        lastEnglishDate: null,
        streak: 0,
        geminiApiKey: ''
      }
    };
  },

  init() {
    const saved = localStorage.getItem(this.KEY);
    if (saved) {
      try {
        this.data = { ...this.defaults(), ...JSON.parse(saved) };
      } catch (e) {
        this.data = this.defaults();
      }
    } else {
      this.data = this.defaults();
    }
    this.updateStreak();
    // 清理已废弃的雅思备考任务
    this.cleanupLegacyData();
    // 英语每日归档（0点清空，历史保留）
    this.archiveDailyEnglish();
    return this.data;
  },

  // 英语每日归档：将前一天的内容归档到历史，清空当日
  archiveDailyEnglish() {
    const today = this.todayKey();
    const lastDate = this.data.settings.lastEnglishDate;
    
    // 首次使用或已是今天，不归档
    if (!lastDate || lastDate === today) {
      this.data.settings.lastEnglishDate = today;
      return;
    }

    // 跨天了，归档前一天的内容
    const tasks = this.data.englishTasks || [];
    tasks.forEach(t => {
      // 归档 topic
      if (t.topic && t.topic.trim()) {
        if (!t.topicHistory) t.topicHistory = [];
        t.topicHistory.push({ date: lastDate, text: t.topic });
      }
      // 归档 words
      if (t.words && t.words.length > 0) {
        if (!t.wordHistory) t.wordHistory = [];
        t.wordHistory.push({ date: lastDate, words: t.words });
      }
      // 归档 phrases
      if (t.phrases && t.phrases.length > 0) {
        if (!t.phraseHistory) t.phraseHistory = [];
        t.phraseHistory.push({ date: lastDate, phrases: t.phrases });
      }
      // 清空当日
      t.topic = '';
      t.words = [];
      t.phrases = [];
    });

    this.data.settings.lastEnglishDate = today;
    this.save();
  },

  // 清理旧版遗留数据
  cleanupLegacyData() {
    // 移除雅思备考任务 e3
    if (this.data.englishTasks) {
      this.data.englishTasks = this.data.englishTasks.filter(t => t.id !== 'e3');
    }
    // 移除 checkins 中 e3 的打卡记录
    if (this.data.checkins) {
      Object.keys(this.data.checkins).forEach(date => {
        if (this.data.checkins[date].english) {
          delete this.data.checkins[date].english.e3;
        }
      });
    }
    this.save();
  },

  save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.data));
  },

  get(key) {
    return this.data[key];
  },

  set(key, value) {
    this.data[key] = value;
    this.save();
  },

  todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  getCheckin(module, taskId) {
    const today = this.todayKey();
    const day = this.data.checkins[today] || {};
    const mod = day[module] || {};
    return !!mod[taskId];
  },

  toggleCheckin(module, taskId) {
    const today = this.todayKey();
    if (!this.data.checkins[today]) this.data.checkins[today] = {};
    if (!this.data.checkins[today][module]) this.data.checkins[today][module] = {};
    this.data.checkins[today][module][taskId] = !this.data.checkins[today][module][taskId];
    this.save();
    return this.data.checkins[today][module][taskId];
  },

  getDayProgress(module) {
    const today = this.todayKey();
    const day = this.data.checkins[today] || {};
    const mod = day[module] || {};
    return Object.values(mod).filter(Boolean).length;
  },

  updateStreak() {
    const today = this.todayKey();
    const yesterday = this.addDays(today, -1);
    const todayHasCheckin = this.data.checkins[today] && 
      Object.values(this.data.checkins[today]).some(m => Object.values(m).some(Boolean));
    
    if (this.data.settings.lastActiveDate === today) return;
    
    if (todayHasCheckin) {
      if (this.data.settings.lastActiveDate === yesterday) {
        this.data.settings.streak += 1;
      } else if (this.data.settings.lastActiveDate !== today) {
        this.data.settings.streak = 1;
      }
      this.data.settings.lastActiveDate = today;
      this.save();
    }
  },

  addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  genId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  },

  addToArray(key, item) {
    this.data[key].unshift(item);
    this.save();
  },

  updateInArray(key, id, updates) {
    const idx = this.data[key].findIndex(x => x.id === id);
    if (idx >= 0) {
      this.data[key][idx] = { ...this.data[key][idx], ...updates };
      this.save();
    }
  },

  removeFromArray(key, id) {
    this.data[key] = this.data[key].filter(x => x.id !== id);
    this.save();
  },

  // 检查某天是否有身材管理打卡
  hasFitnessCheckin(dateStr) {
    const day = this.data.checkins[dateStr] || {};
    const fitness = day.fitness || {};
    return Object.values(fitness).some(Boolean);
  },

  // 检查某天是否有英语打卡
  hasEnglishCheckin(dateStr) {
    const day = this.data.checkins[dateStr] || {};
    const english = day.english || {};
    return Object.values(english).some(Boolean);
  },

  // 获取某天英语学习内容摘要
  getEnglishDaySummary(dateStr) {
    const tasks = this.data.englishTasks || [];
    const day = this.data.checkins[dateStr] || {};
    const englishCheckins = day.english || {};
    const checkedTaskIds = Object.entries(englishCheckins).filter(([, v]) => v).map(([k]) => k);
    const today = this.todayKey();

    const result = {
      date: dateStr,
      checkedTasks: [],
      topics: [],
      newWords: [],
      newPhrases: [],
      lessonHistory: [],
      episodes: []
    };

    tasks.forEach(t => {
      if (checkedTaskIds.includes(t.id)) {
        result.checkedTasks.push(t.name);
      }

      // 查历史 topic
      if (t.topicHistory) {
        t.topicHistory.forEach(h => {
          if (h.date === dateStr) result.topics.push({ task: t.name, topic: h.text });
        });
      }
      // 如果是今天，也查当前 topic
      if (dateStr === today && t.topic) {
        result.topics.push({ task: t.name, topic: t.topic });
      }

      // 查历史 words
      if (t.wordHistory) {
        t.wordHistory.forEach(h => {
          if (h.date === dateStr) h.words.forEach(w => result.newWords.push({ ...w, task: t.name }));
        });
      }
      // 如果是今天，也查当前 words
      if (dateStr === today && t.words) {
        t.words.forEach(w => result.newWords.push({ ...w, task: t.name }));
      }

      // 查历史 phrases
      if (t.phraseHistory) {
        t.phraseHistory.forEach(h => {
          if (h.date === dateStr) h.phrases.forEach(p => result.newPhrases.push({ ...p, task: t.name }));
        });
      }
      // 如果是今天，也查当前 phrases
      if (dateStr === today && t.phrases) {
        t.phrases.forEach(p => result.newPhrases.push({ ...p, task: t.name }));
      }
    });

    const e1 = tasks.find(t => t.id === 'e1');
    if (e1 && e1.lessonHistory) {
      e1.lessonHistory.forEach(h => {
        if (h.date === dateStr) result.lessonHistory.push(h);
      });
    }

    const e2 = tasks.find(t => t.id === 'e2');
    if (e2 && e2.episodes) {
      e2.episodes.forEach(ep => {
        if (ep.date === dateStr) result.episodes.push(ep);
      });
    }

    const hasContent = result.checkedTasks.length > 0 || result.lessonHistory.length > 0 ||
      result.episodes.length > 0 || result.topics.length > 0 ||
      result.newWords.length > 0 || result.newPhrases.length > 0;
    result.hasContent = hasContent;

    return result;
  },

  // ===== 每日出题 =====
  // 收集所有生词和短语（含历史）
  getAllVocab() {
    const tasks = this.data.englishTasks || [];
    const words = [];
    const phrases = [];
    tasks.forEach(t => {
      if (t.words) words.push(...t.words.map(w => ({ ...w, taskName: t.name })));
      if (t.phrases) phrases.push(...t.phrases.map(p => ({ ...p, taskName: t.name })));
      // 合并历史
      if (t.wordHistory) t.wordHistory.forEach(h => words.push(...h.words.map(w => ({ ...w, taskName: t.name }))));
      if (t.phraseHistory) t.phraseHistory.forEach(h => phrases.push(...h.phrases.map(p => ({ ...p, taskName: t.name }))));
    });
    return { words, phrases };
  },

  // 生成每日题目（每天必出造句题）
  generateDailyQuiz() {
    const today = this.todayKey();
    const quiz = this.data.dailyQuiz || {};
    
    // 如果今天已经出过题且用户还没答，直接返回
    if (quiz.date === today && quiz.question) return quiz;

    const { words, phrases } = this.getAllVocab();
    
    // 如果没有生词短语，无法出题
    if (words.length === 0 && phrases.length === 0) {
      this.data.dailyQuiz = { date: today, type: 'none', question: '', options: [], answer: '', userAnswer: '', correct: null, aiFeedback: null };
      this.save();
      return this.data.dailyQuiz;
    }

    let quizData = { date: today, userAnswer: '', correct: null, aiFeedback: null };

    // 每天必出造句题
    if (phrases.length >= 1) {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      quizData.type = 'sentence';
      quizData.question = `请用短语 "${phrase.en}" 造一个英文句子`;
      quizData.answer = '';
      quizData.phraseId = phrase.id;
      quizData.phraseText = phrase.en;
      quizData.phraseExample = phrase.example || '';
    } else {
      const word = words[Math.floor(Math.random() * words.length)];
      quizData.type = 'sentence';
      quizData.question = `请用 "${word.text}" 造一个英文句子`;
      quizData.answer = '';
      quizData.wordId = word.id;
      quizData.wordText = word.text;
    }

    this.data.dailyQuiz = quizData;
    this.save();
    return quizData;
  },

  // 提交答题（造句题返回 null 等待 AI 评判）
  submitQuizAnswer(userAnswer) {
    const quiz = this.data.dailyQuiz || {};
    if (!quiz.question || quiz.date !== this.todayKey()) return false;
    
    quiz.userAnswer = userAnswer;
    
    if (quiz.type === 'choice') {
      quiz.correct = (userAnswer === quiz.answer);
      this.save();
      return quiz.correct;
    } else if (quiz.type === 'fill') {
      quiz.correct = (userAnswer.toLowerCase().trim() === quiz.answer.toLowerCase().trim());
      this.save();
      return quiz.correct;
    } else {
      // 造句题：保存答案但不本地判分，返回 null 表示需要 AI 评判
      quiz.correct = null;
      this.save();
      return null;
    }
  },

  // 设置造句 AI 反馈
  setQuizFeedback(feedback) {
    const quiz = this.data.dailyQuiz || {};
    quiz.aiFeedback = feedback;
    quiz.correct = feedback.correct;
    this.save();
  },

  // Gemini API Key 管理
  getGeminiKey() {
    return this.data.settings.geminiApiKey || '';
  },

  setGeminiKey(key) {
    this.data.settings.geminiApiKey = key.trim();
    this.save();
  },

  // 通用分类管理
  addCategory(catKey, name) {
    if (!this.data[catKey].includes(name)) {
      this.data[catKey].push(name);
      this.save();
    }
  },

  removeCategory(catKey, name) {
    this.data[catKey] = this.data[catKey].filter(c => c !== name);
    this.save();
  },

  // 获取本周起始日期（周一）
  getWeekStart() {
    const d = new Date();
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - day + 1);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  // 检查并更新周目标起始日期
  ensureWeekGoal() {
    const ws = this.getWeekStart();
    if (this.data.goalWeekStart !== ws) {
      this.data.goalWeekStart = ws;
      this.data.weeklyGoals = { copywriting: 5, editing: 5, poster: 5 };
      this.save();
    }
    return ws;
  },

  // 获取本周新增数（按 addDate 过滤）
  getWeekNewCount(storeKey) {
    const ws = this.getWeekStart();
    const items = this.data[storeKey] || [];
    return items.filter(i => i.addDate && i.addDate >= ws).length;
  },

  // 获取仪表盘统计数据
  getDashboardStats() {
    const today = this.todayKey();
    const ws = this.getWeekStart();

    // 本周打卡天数
    let weekCheckinDays = 0;
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const day = this.data.checkins[ds] || {};
      const hasAny = Object.values(day).some(m => Object.values(m).some(Boolean));
      if (hasAny) weekCheckinDays++;
    }

    // 今日各模块进度
    const fitnessTasks = this.data.fitnessTasks || [];
    const fitnessTotal = fitnessTasks.length;
    const fitnessDone = fitnessTasks.filter(t => this.getCheckin('fitness', t.id)).length;

    const englishTasks = this.data.englishTasks || [];
    let allWords = [];
    englishTasks.forEach(t => { if (t.words) allWords = allWords.concat(t.words); });
    const wordTotal = allWords.length;
    const wordDone = allWords.filter(w => w.done).length;

    // 本周新增统计
    const weekInspirations = this.getWeekNewCount('inspirations');
    const weekCopywriting = this.getWeekNewCount('copywritingItems');
    const weekEditing = this.getWeekNewCount('editingItems');
    const weekPoster = this.getWeekNewCount('posterItems');
    const weekSkills = weekCopywriting + weekEditing + weekPoster;
    const weekBooks = (this.data.books || []).filter(b => b.addDate && b.addDate >= ws).length;
    const weekDiaries = (this.data.diaries || []).filter(d => d.date && d.date >= ws).length;

    // 本月打卡天数
    const m = now.getMonth() + 1;
    const y = now.getFullYear();
    let monthCheckinDays = 0;
    const daysInMonth = new Date(y, m, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const day = this.data.checkins[ds] || {};
      if (Object.values(day).some(mod => Object.values(mod).some(Boolean))) monthCheckinDays++;
    }

    // 最近内容
    const recentInspirations = (this.data.inspirations || []).slice(0, 3);
    const recentSkills = [
      ...(this.data.copywritingItems || []).map(i => ({ ...i, _module: 'copywriting' })),
      ...(this.data.editingItems || []).map(i => ({ ...i, _module: 'editing' })),
      ...(this.data.posterItems || []).map(i => ({ ...i, _module: 'poster' }))
    ].sort((a, b) => (b.addDate || '').localeCompare(a.addDate || '')).slice(0, 3);

    // 最近在读
    const readingBook = (this.data.books || []).find(b => b.status === 'reading');

    return {
      streak: this.data.settings.streak || 0,
      fitnessDone, fitnessTotal,
      wordDone, wordTotal,
      weekCheckinDays,
      weekInspirations, weekSkills, weekBooks, weekDiaries,
      monthCheckinDays, daysInMonth,
      recentInspirations, recentSkills,
      readingBook
    };
  },

  // 本周打卡热力图数据（7天）
  getWeekHeatmap() {
    const result = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const day = this.data.checkins[ds] || {};
      let count = 0;
      Object.values(day).forEach(mod => {
        count += Object.values(mod).filter(Boolean).length;
      });
      result.push({
        date: ds,
        day: d.getDate(),
        weekday: ['日','一','二','三','四','五','六'][d.getDay()],
        count,
        isToday: ds === this.todayKey()
      });
    }
    return result;
  },

  // 数据导出
  exportData() {
    return JSON.stringify(this.data, null, 2);
  },

  // 数据导入
  importData(jsonStr) {
    try {
      const imported = JSON.parse(jsonStr);
      if (!imported || typeof imported !== 'object') throw new Error('格式无效');
      // 合并数据（保留导入的数据，补充默认值中的新字段）
      this.data = { ...this.defaults(), ...imported };
      this.save();
      return true;
    } catch (e) {
      return false;
    }
  }
};
