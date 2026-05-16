import axios from 'axios';

// Konfigurasi Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Mock storage (hapus saat backend siap)
let mockStorage = { quizHistory: [], scanHistory: [] };

// Pasang JWT di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// === AUTH ===
export const AuthAPI = {
  // POST /auth/register
  register: async (username, password, age, gender, job_role) => {
    // TODO: ganti mock → api.post('/auth/register', { username, password, age, gender, job_role })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || !password || !age || !gender || !job_role) {
          reject({ response: { status: 400, data: { message: 'Semua field wajib diisi' } } });
          return;
        }
        resolve({ data: { message: "Registered successfully" } });
      }, 800);
    });
  },

  // POST /auth/login
  login: async (username, password) => {
    // TODO: ganti mock → api.post('/auth/login', { username, password })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          const fakeToken = "eyMockToken.BurnoutSense." + btoa(username);
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('bs_username', username);
          resolve({ data: { token: fakeToken } });
        } else {
          reject({ response: { status: 401, data: { message: "Invalid credentials" } } });
        }
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bs_username');
  }
};

// === QUIZ (Q4–Q15) ===
export const QuizAPI = {
  // GET /quiz
  getQuestions: async () => {
    // TODO: ganti mock → api.get('/quiz')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
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
                  { value: "Tidak pernah", label_id: "Tidak pernah (full onsite)" },
                  { value: "Jarang", label_id: "Jarang (1-2 hari/minggu)" },
                  { value: "Hybrid", label_id: "Setengah-setengah (hybrid)" },
                  { value: "Sering", label_id: "Sering (3-4 hari/minggu)" },
                  { value: "Selalu", label_id: "Selalu (full remote)" }
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
                  { value: true, label_id: "Ada" },
                  { value: false, label_id: "Tidak ada" }
                ]
              },
              {
                id: 'q14', field: 'burnout_class', type: 'choice',
                text_id: "Bagaimana kondisi kamu terkait burnout dalam 1 minggu terakhir?",
                options: [
                  { value: "Tidak mengalami", label_id: "Tidak mengalami burnout" },
                  { value: "Mulai tanda-tanda", label_id: "Mulai menunjukkan tanda-tanda burnout" },
                  { value: "Sedang mengalami", label_id: "Sedang mengalami burnout" }
                ]
              },
              {
                id: 'q15', field: 'source', type: 'choice',
                text_id: "Siapa yang memberikan penilaian terhadap kondisi burnout ini?",
                options: [
                  { value: "Psikolog/Psikiater", label_id: "Profesional kesehatan mental (psikolog/psikiater)" },
                  { value: "HR", label_id: "Profesional HR (Human Resource)" }
                ]
              }
            ]
          }
        });
      }, 500);
    });
  },

  // POST /result — kirim jawaban Q4–Q15
  submitResult: async (answers) => {
    // TODO: ganti mock → api.post('/result', answers)
    return new Promise((resolve) => {
      setTimeout(() => {
        const stressScore = answers.stress_score || 5;
        const wlb = answers.work_life_balance || 5;
        const sleepHrs = answers.sleep_hours || 7;
        const mockScore = Math.min(25, Math.max(0,
          Math.round(stressScore * 1.5 + (10 - wlb) + Math.max(0, 7 - sleepHrs) * 2)
        ));

        let description = "";
        if (mockScore < 10) description = "Tingkat stres Anda rendah. Terus pertahankan keseimbangan hidup Anda.";
        else if (mockScore < 20) description = "Gejala burnout peringatan awal. Perbanyak istirahat dan jeda berkala.";
        else description = "Risiko burnout tinggi. Sangat disarankan untuk mengambil jeda dan konsultasi profesional.";

        const resultData = {
          id: crypto.randomUUID(), type: 'quiz',
          score: mockScore, description, created_at: new Date().toISOString()
        };
        mockStorage.quizHistory.push(resultData);
        resolve({ data: resultData });
      }, 1200);
    });
  }
};

// === SCAN WAJAH ===
export const ScanAPI = {
  // POST /scan/analyze — kirim foto base64
  analyze: async (image_base64) => {
    // TODO: ganti mock → api.post('/scan/analyze', { image_base64 })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!image_base64) {
          reject({ response: { status: 400, data: { message: "Invalid image data" } } });
          return;
        }
        const emotions = ['neutral', 'tired', 'stressed', 'calm', 'anxious'];
        const emotion = emotions[Math.floor(Math.random() * emotions.length)];
        const mockScore = Math.floor(Math.random() * 20) + 3;

        let description = "";
        if (mockScore < 10) description = "Ekspresi wajah Anda menunjukkan kondisi yang relatif tenang.";
        else if (mockScore < 20) description = "Terdeteksi tanda-tanda kelelahan ringan pada ekspresi wajah.";
        else description = "Ekspresi wajah menunjukkan tingkat stres/kelelahan tinggi.";

        const resultData = {
          id: crypto.randomUUID(), type: 'scan',
          score: mockScore, description, emotion_label: emotion,
          created_at: new Date().toISOString()
        };
        mockStorage.scanHistory.push(resultData);
        resolve({ data: resultData });
      }, 2500);
    });
  }
};

// === HISTORI ===
export const HistoryAPI = {
  // GET /history — ambil semua hasil kuis + scan
  getHistory: async () => {
    // TODO: ganti mock → api.get('/history')
    return new Promise((resolve) => {
      setTimeout(() => {
        const combined = [...mockStorage.quizHistory, ...mockStorage.scanHistory]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        resolve({ data: combined });
      }, 500);
    });
  }
};

export default api;
