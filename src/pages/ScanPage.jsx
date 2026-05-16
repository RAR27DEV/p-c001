import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ScanAPI } from '../services/api';
import { PageTransition, FadeInView } from '../components/PageTransition';

export default function ScanPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);

  // Start webcam
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => setCameraReady(true);
      }
    } catch (err) {
      setError("Akses kamera ditolak. Silakan izinkan akses kamera.");
    }
  }, []);

  // Stop webcam
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraReady(false);
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      // Cleanup on unmount
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []); // eslint-disable-line

  // Capture frame → base64
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    // Mirror the image (selfie mode)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const base64 = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(base64);
    stopCamera();
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Submit → POST /scan/analyze
  const handleSubmit = async () => {
    if (!capturedImage) return;
    setAnalyzing(true);
    setError(null);
    try {
      // Convert base64 data URL to File object for multipart upload
      const base64Data = capturedImage.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new File([byteArray], 'scan.jpg', { type: 'image/jpeg' });

      const res = await ScanAPI.analyze(file);
      const resultData = res.data.result || res.data;
      navigate('/result', { state: { result: { ...resultData, type: 'scan' } } });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400) setError("Gambar tidak valid. Silakan ambil ulang.");
      else if (status === 502) setError("Layanan AI tidak tersedia. Coba lagi nanti.");
      else setError("Analisis gagal. Silakan coba lagi.");
      setAnalyzing(false);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-[#faf9f6] flex flex-col" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* Bar Atas */}
      <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between max-w-3xl mx-auto">
        <motion.button onClick={() => navigate('/start')} className="flex items-center gap-2 text-[#727973] hover:text-[#1a1c1a] transition-colors font-medium text-sm" whileHover={{ x: -3 }}>
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>{"Kembali"}
        </motion.button>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#456551] to-[#006a6a] text-white font-bold text-[10px] tracking-widest uppercase">
          <span className="material-symbols-outlined text-[12px]">auto_awesome</span>AI Scan
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="w-full max-w-lg flex flex-col items-center gap-6 sm:gap-8">

          {/* Title */}
          <FadeInView className="text-center">
            <h1 className="text-[24px] sm:text-[32px] leading-[1.3] font-medium text-[#1a1c1a] mb-2" style={{ fontFamily: "'Newsreader', serif" }}>
              {"Analisis Scan Wajah"}
            </h1>
            <p className="text-[15px] text-[#424843] max-w-sm mx-auto leading-relaxed">
              {capturedImage
                ? "Tinjau foto dan kirim untuk analisis AI."
                : "Posisikan wajah dalam bingkai dan ambil foto yang jelas."}
            </p>
          </FadeInView>

          {/* Camera / Preview Area */}
          <motion.div
            className="w-full aspect-[4/3] max-w-md rounded-3xl overflow-hidden relative bg-[#1a1c1a] border-4 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Hidden canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Live Video */}
            {!capturedImage && (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" style={{ transform: 'scaleX(-1)' }} />
                {/* Face guide overlay */}
                {cameraReady && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-48 h-60 rounded-[50%] border-2 border-white/40"
                        animate={{ borderColor: ['rgba(255,255,255,0.4)', 'rgba(124,158,135,0.7)', 'rgba(255,255,255,0.4)'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                    {/* Corner brackets */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line x1="15%" y1="10%" x2="15%" y2="20%" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                      <line x1="15%" y1="10%" x2="25%" y2="10%" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                      <line x1="85%" y1="10%" x2="85%" y2="20%" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                      <line x1="85%" y1="10%" x2="75%" y2="10%" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                      <line x1="15%" y1="90%" x2="15%" y2="80%" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                      <line x1="15%" y1="90%" x2="25%" y2="90%" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                      <line x1="85%" y1="90%" x2="85%" y2="80%" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                      <line x1="85%" y1="90%" x2="75%" y2="90%" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  </div>
                )}
                {/* Loading camera */}
                {!cameraReady && !error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1a1c1a]">
                    <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <motion.div className="w-10 h-10 border-[3px] border-white/20 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                      <p className="text-white/60 text-sm font-medium">{"Memulai kamera..."}</p>
                    </motion.div>
                  </div>
                )}
              </>
            )}

            {/* Captured Image Preview */}
            {capturedImage && (
              <motion.img
                src={capturedImage}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Analyzing Overlay */}
            <AnimatePresence>
              {analyzing && (
                <motion.div
                  className="absolute inset-0 bg-[#1a1c1a]/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div className="w-16 h-16 rounded-full border-[3px] border-white/20 border-t-[#7c9e87] flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>
                    <span className="material-symbols-outlined text-[#7c9e87] text-2xl">auto_awesome</span>
                  </motion.div>
                  <div className="text-center">
                    <p className="text-white font-semibold">{"AI Menganalisis..."}</p>
                    <p className="text-white/50 text-sm mt-1">{"Ini mungkin membutuhkan waktu"}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#ffdad6]/30 border border-[#ba1a1a]/20 text-[#93000a] text-sm font-medium w-full max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="material-symbols-outlined text-[20px]">error</span>
              <span>{error}</span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 w-full max-w-md">
            {!capturedImage ? (
              <motion.button
                onClick={capturePhoto}
                disabled={!cameraReady}
                className="flex-1 py-4 rounded-2xl font-semibold text-sm bg-[#456551] text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={cameraReady ? { scale: 1.02, y: -2 } : {}}
                whileTap={cameraReady ? { scale: 0.98 } : {}}
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                {"Ambil Foto"}
              </motion.button>
            ) : (
              <>
                <motion.button
                  onClick={retakePhoto}
                  disabled={analyzing}
                  className="flex-1 py-4 rounded-2xl font-semibold text-sm border-2 border-[#c2c8c1]/40 text-[#424843] hover:bg-white/50 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  whileHover={!analyzing ? { scale: 1.02 } : {}}
                  whileTap={!analyzing ? { scale: 0.98 } : {}}
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  {"Ambil Ulang"}
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={analyzing}
                  className="flex-1 py-4 rounded-2xl font-semibold text-sm bg-[#456551] text-white shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  whileHover={!analyzing ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!analyzing ? { scale: 0.98 } : {}}
                >
                  {analyzing ? (
                    <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      {"Analisis"}
                    </>
                  )}
                </motion.button>
              </>
            )}
          </div>

          {/* Tips */}
          <FadeInView className="w-full max-w-md">
            <div className="bg-[#c7ebd1]/15 rounded-2xl p-5 border border-[#7c9e87]/10">
              <h4 className="font-semibold text-sm text-[#456551] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                {"Tips untuk Hasil Terbaik"}
              </h4>
              <ul className="space-y-2 text-[13px] text-[#424843] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-[#7c9e87] mt-0.5">check_circle</span>
                  {"Hadapkan wajah langsung ke kamera dengan pencahayaan baik"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-[#7c9e87] mt-0.5">check_circle</span>
                  {"Gunakan ekspresi alami — jangan memaksakan senyum"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-[#7c9e87] mt-0.5">check_circle</span>
                  {"Lepas kacamata atau penutup wajah jika memungkinkan"}
                </li>
              </ul>
            </div>
          </FadeInView>
        </div>
      </div>
    </PageTransition>
  );
}
