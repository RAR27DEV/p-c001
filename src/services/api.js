import axios from 'axios';

// Backend Production URL (Railway)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://burnoutsensecapstone-production.up.railway.app',
});

// Pasang JWT di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// === AUTH ===
export const AuthAPI = {
  // POST /auth/register
  register: async (username, password, age, gender, job_role, years_experience) => {
    const res = await api.post('/auth/register', { username, password, age, gender, job_role, years_experience });
    return res;
  },

  // POST /auth/login
  login: async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    const token = res.data.accessToken;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('bs_username', username);
    }
    return res;
  },

  // GET /user
  getProfile: async () => {
    const res = await api.get('/user');
    return res;
  },

  // PUT /user
  updateProfile: async (data) => {
    const res = await api.put('/user', data);
    return res;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bs_username');
    localStorage.removeItem('bs_years_experience');
  }
};

// === QUIZ ===
export const QuizAPI = {
  // Pertanyaan quiz hardcoded — backend gak punya endpoint GET /quiz
  getQuestions: async () => {
    return {
      data: {
        questions: [
          {
            id: 'q5', field: 'work_hours_per_week', type: 'choice',
            text_id: "Rata-rata, berapa jam kamu bekerja dalam seminggu?",
            options: [
              { value: 25, label_id: "Kurang dari 30 jam" },
              { value: 35, label_id: "30-40 jam" },
              { value: 45, label_id: "41-50 jam" },
              { value: 55, label_id: "51-60 jam" },
              { value: 65, label_id: "Lebih dari 60 jam" }
            ]
          },
          {
            id: 'q6', field: 'remote_ratio', type: 'choice',
            text_id: "Seberapa sering kamu bekerja secara remote?",
            options: [
              { value: 0, label_id: "Tidak pernah (full onsite)" },
              { value: 1, label_id: "Jarang (1-2 hari/minggu)" },
              { value: 2, label_id: "Setengah-setengah (hybrid)" },
              { value: 3, label_id: "Sering (3-4 hari/minggu)" },
              { value: 4, label_id: "Selalu (full remote)" }
            ]
          },
          {
            id: 'q7', field: 'satisfaction_score', type: 'choice',
            text_id: "Seberapa puas kamu dengan pekerjaanmu saat ini?",
            options: [
              { value: 1, label_id: "Sangat tidak puas (1)" },
              { value: 2, label_id: "Tidak puas (2)" },
              { value: 3, label_id: "Netral (3)" },
              { value: 4, label_id: "Puas (4)" },
              { value: 5, label_id: "Sangat puas (5)" }
            ]
          },
          {
            id: 'q8', field: 'stress_score', type: 'choice',
            text_id: "Seberapa sering kamu merasa stres karena pekerjaan dalam 1 minggu terakhir?",
            options: [
              { value: 1, label_id: "Tidak pernah (1-2)" },
              { value: 3, label_id: "Jarang (3-4)" },
              { value: 5, label_id: "Kadang-kadang (5-6)" },
              { value: 7, label_id: "Sering (7-8)" },
              { value: 9, label_id: "Sangat sering (9-10)" }
            ]
          },
          {
            id: 'q9', field: 'work_life_balance', type: 'choice',
            text_id: "Bagaimana kamu menilai keseimbangan kerja & kehidupan pribadi?",
            options: [
              { value: 1, label_id: "Sangat buruk (1-2)" },
              { value: 3, label_id: "Buruk (3-4)" },
              { value: 5, label_id: "Cukup (5-6)" },
              { value: 7, label_id: "Baik (7-8)" },
              { value: 9, label_id: "Sangat baik (9-10)" }
            ]
          },
          {
            id: 'q10', field: 'sleep_hours', type: 'choice',
            text_id: "Berapa rata-rata jam tidur per hari dalam 1 minggu terakhir?",
            options: [
              { value: 4, label_id: "4 jam" },
              { value: 5, label_id: "5 jam" },
              { value: 6, label_id: "6 jam" },
              { value: 7, label_id: "7 jam" },
              { value: 8, label_id: "8 jam" },
              { value: 9, label_id: "9 jam" }
            ],
            allowCustom: true,
            customPlaceholder: "Masukkan jam tidur (contoh: 6.5)"
          },
          {
            id: 'q11', field: 'physical_activity_hrs', type: 'choice',
            text_id: "Berapa rata-rata waktu aktivitas fisik per minggu?",
            options: [
              { value: 0, label_id: "Tidak ada (0 jam)" },
              { value: 1, label_id: "1 jam" },
              { value: 2, label_id: "2 jam" },
              { value: 3, label_id: "3 jam" },
              { value: 5, label_id: "5 jam" },
              { value: 7, label_id: "7 jam atau lebih" }
            ],
            allowCustom: true,
            customPlaceholder: "Masukkan jam aktivitas (contoh: 1.5)"
          },
          {
            id: 'q12', field: 'manager_support', type: 'choice',
            text_id: "Seberapa besar dukungan dari atasan/manajer kamu?",
            options: [
              { value: 1, label_id: "Tidak ada (1)" },
              { value: 2, label_id: "Rendah (2)" },
              { value: 3, label_id: "Cukup (3)" },
              { value: 4, label_id: "Baik (4)" },
              { value: 5, label_id: "Sangat baik (5)" }
            ]
          },
          {
            id: 'q13', field: 'has_mental_health_support', type: 'choice',
            text_id: "Apakah tempat kerja kamu menyediakan dukungan kesehatan mental?",
            options: [
              { value: "Yes", label_id: "Ada" },
              { value: "No", label_id: "Tidak ada" }
            ]
          },
        ]
      }
    };
  },

  // POST /quiz/submit
  submitResult: async (answers) => {
    const res = await api.post('/quiz/submit', answers);
    return res;
  },

  // GET /quiz/history
  getHistory: async () => {
    const res = await api.get('/quiz/history');
    return res;
  },

  // GET /quiz/history/:id
  getHistoryDetail: async (id) => {
    const res = await api.get(`/quiz/history/${id}`);
    return res;
  },

  // DELETE /quiz/history/:id
  deleteHistory: async (id) => {
    const res = await api.delete(`/quiz/history/${id}`);
    return res;
  },
};

// === SCAN WAJAH ===
export const ScanAPI = {
  // POST /scan/submit — multipart/form-data dengan field "photo"
  analyze: async (imageFile) => {
    const formData = new FormData();
    formData.append('photo', imageFile);
    const res = await api.post('/scan/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  },

  // GET /scan/history
  getHistory: async () => {
    const res = await api.get('/scan/history');
    return res;
  },
};

// === HISTORI (gabungan quiz + scan) ===
export const HistoryAPI = {
  getHistory: async () => {
    try {
      const [quizRes, scanRes] = await Promise.allSettled([
        QuizAPI.getHistory(),
        ScanAPI.getHistory(),
      ]);

      const quizData = quizRes.status === 'fulfilled'
        ? (quizRes.value.data.data || []).map(item => ({ ...item, type: 'quiz' }))
        : [];
      const scanData = scanRes.status === 'fulfilled'
        ? (scanRes.value.data.data || []).map(item => ({ ...item, type: 'scan' }))
        : [];

      const combined = [...quizData, ...scanData]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      return { data: combined };
    } catch (err) {
      return { data: [] };
    }
  }
};

// === CHAT (Sensa AI) ===
export const ChatAPI = {
  // POST /chat/submit
  send: async (userMessage) => {
    const res = await api.post('/chat/submit', { userMessage });
    return res;
  },
};

// === SUMMARY ===
export const SummaryAPI = {
  // GET /summary
  get: async () => {
    const res = await api.get('/summary');
    return res;
  },
};

export default api;
