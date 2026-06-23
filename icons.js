import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, 
  BookOpen, 
  Compass, 
  FileText, 
  Feather, 
  Award, 
  ChevronRight, 
  Download, 
  Sparkles, 
  Layers, 
  User, 
  Send, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle, 
  Menu, 
  X, 
  TrendingUp, 
  Clock, 
  Plus, 
  Settings, 
  LogOut, 
  Trash2, 
  FileDown, 
  MessageSquare,
  Wand2,
  AlertCircle,
  Video,
  FileSpreadsheet,
  Share2
} from 'lucide-react';


// Fallback / Initial mock projects to give users something to interact with immediately
const INITIAL_PROJECTS = [
  {
    id: 'p1',
    title: 'Misteri Lentera Merah',
    type: 'Cerpen',
    genre: 'Misteri',
    wordCount: 1250,
    updatedAt: '2 jam yang lalu',
    content: 'Malam itu, kabut tebal menyelimuti kota kecil di kaki bukit. Angin berhembus kencang, menggoyahkan daun-daun pinus tua yang berjejer di sepanjang jalan utama. Di ujung jalan, tepat di depan gerbang tua yang tak terpakai, sebuah lentera merah bergoyang pelan. Tak ada yang tahu siapa yang menyalakannya, namun setiap kali lentera itu bersinar, seseorang di kota tersebut akan mendengar bisikan mistis...'
  },
  {
    id: 'p2',
    title: 'Langkah Dakwah Digital Abad 21',
    type: 'Naskah Dakwah',
    genre: 'Keagamaan',
    wordCount: 850,
    updatedAt: '1 hari yang lalu',
    content: 'Assalamu’alaikum Warahmatullahi Wabarakatuh. Hadirin sekalian yang dirahmati Allah, dunia hari ini bergerak di dalam genggaman layar gawai kita. Dakwah tak lagi sekadar berdiri di atas mimbar kayu, melainkan juga menelusuri serat-serat optik algoritma media sosial. Bagaimana kita mengemas pesan damai Islam menjadi sebuah konten yang menyejukkan hati di tengah derasnya arus informasi?'
  },
  {
    id: 'p3',
    title: 'Panduan Sukses Investasi Crypto untuk Pemula',
    type: 'E-book',
    genre: 'Bisnis',
    wordCount: 3400,
    updatedAt: '3 hari yang lalu',
    content: 'Bab 1: Mengenal Teknologi Blockchain. Sebelum melangkah jauh ke dalam dinamika perdagangan cryptocurrency, sangat penting bagi kita untuk memahami fondasi utamanya: Blockchain. Bayangkan sebuah buku besar digital terdistribusi yang mencatat setiap transaksi secara permanen, aman, dan tanpa perantara pihak ketiga...'
  }
];

const TEMPLATES = [
  { id: 't1', title: 'Buku Dakwah Kontemporer', type: 'Buku', icon: BookOpen, desc: 'Outline & struktur buku dakwah mendalam.', prompt: 'Buat buku dakwah kontemporer tentang keseimbangan dunia-akhirat di era modern.' },
  { id: 't2', title: 'Novel Islami Romantis', type: 'Novel', icon: HeartIcon, desc: 'Alur romantis bertema spiritual & hijrah.', prompt: 'Buat sinopsis, outline, dan bab 1 novel islami romantis tentang jodoh yang dipertemukan di jalan dakwah.' },
  { id: 't3', title: 'Cerpen Islami Edukatif', type: 'Cerpen', icon: Feather, desc: 'Cerita pendek inspiratif penuh hikmah.', prompt: 'Buat cerpen islami inspiratif tentang kejujuran seorang anak yatim.' },
  { id: 't4', title: 'Buku Motivasi Sukses', type: 'Buku', icon: TrendingUp, desc: 'Mengembangkan mindset mandiri & produktif.', prompt: 'Buat outline buku motivasi untuk membangkitkan produktivitas pemuda desa.' },
  { id: 't5', title: 'Biografi Tokoh Berpengaruh', type: 'Cerita Nonfiksi', icon: User, desc: 'Struktur biografi tokoh nasional / lokal.', prompt: 'Buat biografi inspiratif singkat tentang perjuangan guru honorer di pedalaman Papua.' },
  { id: 't6', title: 'Buku Pendidikan Interaktif', type: 'Buku', icon: Book, desc: 'Konsep pengajaran modern untuk anak SD.', prompt: 'Buat silabus & materi edukasi sains dasar interaktif untuk anak usia 10 tahun.' },
  { id: 't7', title: 'E-book Bisnis & Digital Marketing', type: 'E-book', icon: FileSpreadsheet, desc: 'Strategi scale-up UMKM lewat digital.', prompt: 'Buat e-book bisnis panduan lengkap beriklan di media sosial untuk pemula.' },
  { id: 't8', title: 'Naskah YouTube Viral', type: 'Naskah YouTube', icon: Video, desc: 'Struktur retorika penahan retensi penonton.', prompt: 'Buat naskah YouTube durasi 10 menit bertema 5 misteri teknologi kuno yang belum terpecahkan.' },
];

function HeartIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={props.className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'dashboard' | 'editor' | 'pricing' | 'login'
  const [dashboardTab, setDashboardTab] = useState('dashboard'); // 'dashboard' | 'projects' | 'templates' | 'history' | 'profile'
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // App Logic States
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // AI Generator Form States
  const [genType, setGenType] = useState('Buku'); // Buku, E-book, Novel, Cerpen, Fiksi, Nonfiksi, Artikel, Makalah, Esai, Dakwah, YouTube, Sosmed
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    targetReader: '',
    chaptersCount: '5',
    genre: 'Misteri', // For Cerpen / Novel
    characters: '', // For Novel
    plot: '', // For Novel / Fiksi
    fiksiType: 'Fantasy', // Fantasy, Sci-Fi, Sejarah Alternatif, Superhero
    nonfiksiType: 'Biografi', // Biografi, Motivasi, Pendidikan, Sejarah, Dakwah
  });

  // Editor states
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorType, setEditorType] = useState('Artikel');
  const [wordCount, setWordCount] = useState(0);

  // Chatbox sidebar inside editor
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Halo! Saya asisten AI Ideologiszon. Saya siap membantu Anda mengembangkan outline, menulis bab, atau memperbaiki tata bahasa naskah Anda. Apa yang ingin kita tulis hari ini?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // General Loading & AI States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAIOperating, setIsAIOperating] = useState(false); // for quick editor actions

  // Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Word counter update
  useEffect(() => {
    const words = editorContent ? editorContent.trim().split(/\s+/).filter(Boolean).length : 0;
    setWordCount(words);
  }, [editorContent]);

  // Show notification utility
  const triggerNotification = (message, type = 'success') => {
    setNotification({ text: message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const generateWithGemini = async (promptText) => {
    const apiKey = ""; // Canvas dynamically populates blank API keys
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      systemInstruction: {
        parts: [{ text: "Anda adalah Ideologiszon AI, asisten penulis profesional paling cerdas di Indonesia. Selalu berikan naskah tulisan dalam Bahasa Indonesia yang indah, kaya kosakata, dan terstruktur rapi. Format output Anda menggunakan heading (Markdown) untuk bab, outline, atau poin penting agar mudah dibaca." }]
      }
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
      throw new Error("Struktur respons tidak sesuai.");
    } catch (error) {
      console.error("Gemini API Error, falling back to local simulator:", error);
      // Fallback local intelligent generator in case of networking/API key blockages
      return mockLocalGenerator(promptText);
    }
  };

  const mockLocalGenerator = (prompt) => {
    return `### HASIL GENERATOR AI IDEOLOGISZON\n\n*(Catatan: Mode Simulasi Offline Aktif)*\n\n**Judul Naskah:** ${formData.title || "Karya Hebat Tanpa Nama"}\n\n#### PENDAHULUAN\nDi era globalisasi modern ini, penting bagi kita untuk menyikapi setiap ide kreatif secara responsif. Tulisan ini dibuat untuk menjawab tantangan bertema *"${formData.theme || prompt.substring(0, 50)}"*. Setiap baris dirancang agar menyentuh nurani target pembaca: ${formData.targetReader || "Umum"}.\n\n#### OUTLINE DAN STRUKTUR UTAMA\n1. **Bab 1: Pondasi Idealisme** - Memahami akar permasalahan dan merumuskan visi awal.\n2. **Bab 2: Menggali Potensi Kreatif** - Menjelajahi ragam imajinasi dan realitas tulisan.\n3. **Bab 3: Implementasi Solutif** - Bagaimana mentransformasi konsep abstrak menjadi tulisan yang memikat.\n4. **Kesimpulan** - Langkah konkret dalam berkarya secara konsisten.\n\n#### DRAFT ISI KARYA\nKarya ini menyajikan gagasan autentik yang menggugah emosi pembaca. Dengan gaya bahasa yang mengalir, pembaca akan dituntun langkah demi langkah memahami esensi tulisan. Melalui proses ini, Ideologiszon AI berkomitmen menjadi jembatan antara pikiran brilian Anda dan mahakarya dunia yang legendaris. Selamat berkarya dan teruslah menulis!`;
  };

  const handleCreateProject = () => {
    setFormData({
      title: '',
      theme: '',
      targetReader: '',
      chaptersCount: '5',
      genre: 'Misteri',
      characters: '',
      plot: '',
      fiksiType: 'Fantasy',
      nonfiksiType: 'Biografi'
    });
    setGenType('Buku');
    setDashboardTab('templates');
    setCurrentPage('dashboard');
    triggerNotification("Pilih kategori atau template di bawah untuk mulai menulis!", "info");
  };

  const handleOpenProjectInEditor = (project) => {
    setCurrentProject(project);
    setEditorTitle(project.title);
    setEditorContent(project.content || '');
    setEditorType(project.type || 'Buku');
    setCurrentPage('editor');
  };

  const handleSaveProject = () => {
    if (!editorTitle) {
      triggerNotification("Judul proyek tidak boleh kosong!", "error");
      return;
    }

    if (currentProject) {
      // Update existing
      setProjects(prev => prev.map(p => p.id === currentProject.id ? {
        ...p,
        title: editorTitle,
        content: editorContent,
        wordCount: wordCount,
        updatedAt: 'Baru saja'
      } : p));
      triggerNotification("Proyek berhasil diperbarui & disimpan!");
    } else {
      // Create new
      const newProj = {
        id: 'p-' + Date.now(),
        title: editorTitle,
        type: editorType,
        genre: 'AI Generated',
        wordCount: wordCount,
        updatedAt: 'Baru saja',
        content: editorContent
      };
      setProjects(prev => [newProj, ...prev]);
      setCurrentProject(newProj);
      triggerNotification("Proyek baru berhasil disimpan!");
    }
  };

  const handleDeleteProject = (id, e) => {
    e.stopPropagation();
    setProjects(prev => prev.filter(p => p.id !== id));
    triggerNotification("Proyek berhasil dihapus.");
  };

  const triggerAIGenerator = async () => {
    if (!formData.title) {
      triggerNotification("Tolong isi Judul terlebih dahulu!", "error");
      return;
    }
    
    setIsGenerating(true);
    let prompt = "";

    switch (genType) {
      case 'Buku':
        prompt = `Buat buku lengkap bertema "${formData.theme}" dengan judul "${formData.title}". Target pembaca: ${formData.targetReader}. Buat outline daftar isi yang terdiri dari ${formData.chaptersCount} bab beserta detail ringkasan isi tiap bab dan kesimpulan penutup.`;
        break;
      case 'E-book':
        prompt = `Buat struktur E-book profesional lengkap dengan desain rekomendasi cover, daftar isi terstruktur, bab pembuka, isi inti, dan bab penutup bertema "${formData.theme}" dengan judul "${formData.title}" khusus untuk pembaca: ${formData.targetReader}.`;
        break;
      case 'Cerpen':
        prompt = `Tulis sebuah Cerita Pendek (Cerpen) utuh bergenre ${formData.genre} dengan judul "${formData.title}". Tema cerita tentang: "${formData.theme}". Sampaikan dengan alur dramatis, deskripsi latar yang hidup, dialog yang menyentuh, dan pesan moral di akhir cerita.`;
        break;
      case 'Novel':
        prompt = `Buat draf perancangan Novel bergenre ${formData.genre} dengan judul "${formData.title}". Nama tokoh utama: ${formData.characters}. Alur cerita: ${formData.plot || 'Menarik dan berliku'}. Hasil harus mencakup Sinopsis Lengkap, Outline Bab demi Bab, dan isi draf Bab 1 yang mendalam.`;
        break;
      case 'Cerita Fiksi':
        prompt = `Buat cerita fiksi bertema "${formData.fiksiType}" dengan judul "${formData.title}". Tema alur: ${formData.theme || 'Petualangan fantasi luar biasa'}. Buat draf dunia (world-building) fiksi ini dan sajikan prolog cerita yang sangat futuristik dan epik.`;
        break;
      case 'Cerita Nonfiksi':
        prompt = `Tulis naskah karya Nonfiksi kategori ${formData.nonfiksiType} bertema "${formData.theme}" dengan judul "${formData.title}". Target audiens: ${formData.targetReader}. Tulisan harus menyajikan fakta edukatif, data logis, kisah inspirasi nyata, serta kesimpulan yang bijaksana.`;
        break;
      default:
        prompt = `Buat karya tulis kategori ${genType} bertema "${formData.theme}" dengan judul "${formData.title}".`;
    }

    try {
      const generatedText = await generateWithGemini(prompt);
      setEditorTitle(formData.title);
      setEditorContent(generatedText);
      setEditorType(genType);
      setCurrentProject(null); // Create new flow
      setCurrentPage('editor');
      triggerNotification("AI Berhasil menghasilkan draf naskah!", "success");
    } catch (error) {
      triggerNotification("Gagal menghasilkan naskah. Silakan coba lagi.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const useTemplate = (template) => {
    setGenType(template.type);
    setFormData({
      ...formData,
      title: `Draf ${template.title}`,
      theme: template.prompt,
      targetReader: 'Umum / Pembaca Terkait',
    });
    // Scroll to form generator
    const formElement = document.getElementById('generator-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // open template generator directly if not on dashboard
      setDashboardTab('templates');
    }
  };

  const handleAIQuickAction = async (action) => {
    if (!editorContent) {
      triggerNotification("Tolong isi atau tulis naskah di editor terlebih dahulu!", "error");
      return;
    }
    
    setIsAIOperating(true);
    let prompt = "";
    
    if (action === 'rewrite') {
      prompt = `Tulis ulang paragraf berikut agar terdengar lebih elegan, profesional, sastrawi, dan kaya kosakata tanpa mengubah makna intinya:\n\n${editorContent}`;
    } else if (action === 'expand') {
      prompt = `Kembangkan teks berikut menjadi lebih detail, berikan analogi yang indah, tambahkan penjelasan mendalam, namun tetap relevan dan mengalir lancar:\n\n${editorContent}`;
    } else if (action === 'summarize') {
      prompt = `Ringkas teks berikut menjadi rangkuman poin-poin penting yang padat, jelas, dan informatif:\n\n${editorContent}`;
    } else if (action === 'grammar') {
      prompt = `Perbaiki tata bahasa, ejaan (sesuai EYD), dan tanda baca pada teks berikut agar menjadi naskah yang baku namun enak dibaca. Berikan juga penjelasan singkat perubahannya di bagian bawah naskah:\n\n${editorContent}`;
    }

    try {
      const resultText = await generateWithGemini(prompt);
      setEditorContent(resultText);
      triggerNotification("AI sukses memproses naskah Anda!", "success");
    } catch (e) {
      triggerNotification("Gagal memproses tindakan AI.", "error");
    } finally {
      setIsAIOperating(false);
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    
    setIsAIOperating(true);
    
    const contextPrompt = `Konteks tulisan yang sedang kita garap di editor saat ini:\nJudul: "${editorTitle}"\nTipe: ${editorType}\nIsi Naskah Sementara:\n${editorContent.substring(0, 1000)}...\n\nPertanyaan/Permintaan Penulis: "${userMsg.text}"\n\nBerikan tanggapan solutif, ide baru, atau draf paragraf baru sesuai permintaan di atas dalam Bahasa Indonesia yang ramah, kreatif, dan inspiratif.`;

    try {
      const aiReplyText = await generateWithGemini(contextPrompt);
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReplyText }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: "Maaf, koneksi saya sedang terganggu. Ada yang bisa saya bantu dengan draf tulisan lokal Anda?" }]);
    } finally {
      setIsAIOperating(false);
    }
  };

  const triggerExport = (format) => {
    if (!editorContent) {
      triggerNotification("Naskah kosong! Tulis sesuatu sebelum diekspor.", "error");
      return;
    }
    
    const element = document.createElement("a");
    const fileContent = `=========================================\n` +
                        `  ${editorTitle.toUpperCase()}  \n` +
                        `  Kategori: ${editorType} | Ideologiszon AI\n` +
                        `=========================================\n\n` +
                        `${editorContent}\n\n` +
                        `-----------------------------------------\n` +
                        `Dicetak melalui Ideologiszon AI Platform\n` +
                        `Tanggal: ${new Date().toLocaleDateString('id-ID')}`;
                        
    const file = new Blob([fileContent], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${editorTitle.replace(/\s+/g, '_')}_ideologiszon.${format === 'doc' ? 'docx' : format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    triggerNotification(`Berhasil mengekspor karya ke format ${format.toUpperCase()}!`, "success");
  };

  // Mock Authentication
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) {
      triggerNotification("Silakan masukkan email yang valid.", "error");
      return;
    }
    setIsLoggedIn(true);
    triggerNotification(`Selamat datang di Ideologiszon, ${userEmail}!`, "success");
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentPage('home');
    triggerNotification("Anda telah keluar dari akun.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-900">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900 border-l-4 border-amber-400 text-white px-5 py-4 rounded-r-lg shadow-2xl animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <p className="text-sm font-medium">{notification.text}</p>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="relative p-1.5 bg-gradient-to-br from-blue-950/80 to-slate-900/80 rounded-xl border border-amber-400/30 hover:border-amber-400/80 transition duration-300 shadow-[0_0_15px_rgba(30,58,138,0.3)]">
              <img 
                src="ChatGPT Image 23 Jun 2026, 18.28.35.png" 
                alt="Ideologiszon Logo" 
                className="h-12 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(251,191,36,0.2)]" 
              />
              <div className="absolute inset-0 bg-amber-400/5 blur-sm rounded-xl -z-10"></div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => setCurrentPage('home')} className={`hover:text-amber-400 transition ${currentPage === 'home' ? 'text-amber-400 font-bold' : ''}`}>Beranda</button>
            <button onClick={() => { handleCreateProject() }} className={`hover:text-amber-400 transition`}>AI Generator</button>
            <button onClick={() => { isLoggedIn ? (setCurrentPage('dashboard'), setDashboardTab('dashboard')) : setCurrentPage('login') }} className={`hover:text-amber-400 transition`}>Dashboard</button>
            <button onClick={() => setCurrentPage('pricing')} className={`hover:text-amber-400 transition ${currentPage === 'pricing' ? 'text-amber-400 font-bold' : ''}`}>Paket Harga</button>
          </nav>

          {/* Auth Button Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm bg-blue-950 border border-blue-800/40 px-3 py-1.5 rounded-full text-slate-300">
                  👑 {userEmail || "Penulis Pro"}
                </span>
                <button 
                  onClick={() => { setCurrentPage('dashboard'); setDashboardTab('dashboard'); }}
                  className="bg-gradient-to-r from-blue-800 to-indigo-950 border border-blue-600 hover:border-amber-400 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
                >
                  Dashboard Saya
                </button>
                <button onClick={handleLogout} className="p-2 hover:text-red-400 transition" title="Log Out">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => { setAuthMode('login'); setCurrentPage('login'); }} className="text-slate-300 hover:text-white transition text-sm font-semibold">Masuk</button>
                <button 
                  onClick={() => { setAuthMode('register'); setCurrentPage('login'); }}
                  className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-amber-400 hover:to-amber-500 hover:text-slate-950 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_20px_rgba(30,58,138,0.4)] transition duration-300"
                >
                  Mulai Menulis Gratis
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2 text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-blue-900/50 p-6 flex flex-col gap-4 animate-fadeIn">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="text-left text-lg py-2 border-b border-slate-800 hover:text-amber-400">Beranda</button>
            <button onClick={() => { handleCreateProject(); setMobileMenuOpen(false); }} className="text-left text-lg py-2 border-b border-slate-800 hover:text-amber-400">AI Generator</button>
            <button onClick={() => { setMobileMenuOpen(false); if(isLoggedIn) { setCurrentPage('dashboard'); setDashboardTab('dashboard'); } else { setCurrentPage('login'); } }} className="text-left text-lg py-2 border-b border-slate-800 hover:text-amber-400">Dashboard</button>
            <button onClick={() => { setCurrentPage('pricing'); setMobileMenuOpen(false); }} className="text-left text-lg py-2 border-b border-slate-800 hover:text-amber-400">Paket Harga</button>
            
            <div className="pt-4 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <p className="text-sm text-slate-400">Logged in as: {userEmail}</p>
                  <button onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }} className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold">Ke Dashboard</button>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full bg-red-950/40 text-red-400 py-3 rounded-xl font-semibold border border-red-900/30">Keluar</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setAuthMode('login'); setCurrentPage('login'); setMobileMenuOpen(false); }} className="w-full border border-slate-700 text-white py-3 rounded-xl font-bold">Masuk</button>
                  <button onClick={() => { setAuthMode('register'); setCurrentPage('login'); setMobileMenuOpen(false); }} className="w-full bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 rounded-xl font-bold">Mulai Gratis</button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {}
      <main className="flex-grow">
        
        {/* ========================================================= */}
        {/* VIEW: HOME PAGE                                           */}
        {/* ========================================================= */}
        {currentPage === 'home' && (
          <div className="relative overflow-hidden">
            
            {/* Glow Orbs Backdrop */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900/30 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 flex flex-col gap-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/60 px-4 py-2 rounded-full w-fit mx-auto md:mx-0 shadow-lg">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span className="text-xs font-bold text-slate-200 tracking-wide">Platform AI Penulis No. #1 di Indonesia</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                  Ubah Ide Menjadi Karya Luar Biasa Bersama <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-sm">Ideologiszon</span>
                </h1>
                
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Buat buku, e-book, novel, cerpen, cerita fiksi dan nonfiksi hanya dalam hitungan menit dengan bantuan AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                  <button 
                    onClick={() => handleCreateProject()} 
                    className="group bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(251,191,36,0.3)] hover:scale-[1.03] transition duration-300"
                  >
                    Mulai Menulis Sekarang
                    <ChevronRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition" />
                  </button>
                  <button 
                    onClick={() => { setCurrentPage('pricing') }} 
                    className="border border-blue-800 hover:border-amber-400 bg-blue-950/30 hover:bg-blue-950/60 text-white font-bold px-8 py-4 rounded-2xl transition duration-300"
                  >
                    Coba Gratis
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-950 max-w-lg mx-auto md:mx-0">
                  <div>
                    <p className="text-3xl font-black text-white">100k+</p>
                    <p className="text-xs text-slate-400">Kata Terbuat</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-amber-400">12+</p>
                    <p className="text-xs text-slate-400">Tipe Karya Sastra</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">99%</p>
                    <p className="text-xs text-slate-400">Kepuasan Penulis</p>
                  </div>
                </div>
              </div>

              {/* Custom Image/Logo Hero Illustration Panel */}
              <div className="md:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-blue-950 to-slate-900 border border-blue-800/40 rounded-3xl p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(30,58,138,0.3)] overflow-hidden group">
                  
                  {/* Neon laser line effects */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"></div>
                  
                  {/* Mock AI Writing Interface inside Illustration */}
                  <div className="flex items-center justify-between border-b border-blue-900/50 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs font-mono text-amber-400">Ideologiszon AI Platform</span>
                  </div>

                  {/* Verbatim Logo embedded in the hero card */}
                  <div className="my-auto py-4 flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:scale-110 transition duration-500"></div>
                      <img 
                        src="ChatGPT Image 23 Jun 2026, 18.28.35.png" 
                        alt="Ideologiszon Brand Mark" 
                        className="w-48 h-48 object-contain relative z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    
                    <div className="w-full bg-slate-900/90 border border-blue-900/60 rounded-xl p-3.5 shadow-lg">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Generating Live Novel Draft...</span>
                      </div>
                      <p className="text-[11px] font-serif text-slate-300 italic text-left line-clamp-2">
                        "Pena emas itu mulai menggoreskan takdir di atas lembaran kitab biru, merajut untaian kata yang mengubah ide sederhana menjadi karya luar biasa..."
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>STATUS: ACTIVE</span>
                    <span>ENGINE: ONLINE</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTIONS: CATEGORIES (BUKU, NOVEL, CERPEN, DLL) */}
            <section className="bg-slate-900/40 border-y border-blue-900/20 py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Ragam Solusi Penulisan</h2>
                  <p className="text-3xl sm:text-4xl font-black text-white">Semua Jenis Karya Tulis Bisa Anda Hasilkan dengan Instan</p>
                  <p className="text-slate-400 mt-4 text-base">Ideologiszon bukan sekadar penulis otomatis biasa. Kami merancang mesin asisten literasi untuk berbagai jenis kebutuhan tulisan formal, fiksi, hingga komersial.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { title: "AI Penulis Buku", desc: "Outline terstruktur, daftar isi, bab lengkap & kesimpulan.", icon: Book, color: "from-blue-600/20 to-blue-900/20" },
                    { title: "AI Pembuat E-book", desc: "Dilengkapi saran cover, penulisan bab, ekspor PDF praktis.", icon: BookOpen, color: "from-amber-600/10 to-amber-900/20" },
                    { title: "AI Cerpen Kreatif", desc: "Ciptakan cerpen horor, islami, romantis, petualangan.", icon: Feather, color: "from-purple-600/20 to-purple-900/20" },
                    { title: "AI Novelis Fantastis", desc: "Rancang penokohan, sinopsis, draf bab per bab mendalam.", icon: Award, color: "from-indigo-600/20 to-indigo-900/20" },
                    { title: "Cerita Fiksi & Fantasi", desc: "Membangun semesta fiksi ilmiah hingga sejarah alternatif.", icon: Compass, color: "from-green-600/20 to-green-900/20" },
                    { title: "Cerita Nonfiksi", desc: "Biografi mengesankan, buku motivasi, sejarah & sains.", icon: Layers, color: "from-pink-600/20 to-pink-900/20" },
                    { title: "Artikel, Makalah & Esai", desc: "Format akademis, rapi sesuai pedoman EYD & karya tulis.", icon: FileText, color: "from-teal-600/20 to-teal-900/20" },
                    { title: "Naskah Dakwah & Konten", desc: "Membuat teks ceramah, naskah YouTube, & postingan sosmed.", icon: Video, color: "from-red-600/20 to-red-900/20" },
                  ].map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div key={idx} className="bg-slate-950 border border-blue-900/30 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-400 transition-all hover:-translate-y-1 shadow-lg">
                        <div>
                          <div className="p-3 bg-blue-950 rounded-xl w-fit mb-4 text-amber-400">
                            <IconComp className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setGenType(item.title.replace('AI ', '').split(' ')[0]);
                            handleCreateProject();
                          }} 
                          className="mt-6 flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-white transition"
                        >
                          Coba Tipe Ini <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* PLATFORM FEATURES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Teknologi Modern Penulis</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">Gunakan Fitur Editor Berkelas dengan Asisten AI Terbaik</h2>
                  <p className="text-slate-300 leading-relaxed">
                    Sistem kami memadukan kekuatan generator AI berbasis model LLM termutakhir dengan editor penulisan rich-text yang canggih. Segala ide, naskah, dan outline Anda didampingi oleh chatbot interaktif yang siap memberikan koreksi tata bahasa, perluasan paragraf, maupun ringkasan instan.
                  </p>
                  
                  <ul className="flex flex-col gap-4">
                    {[
                      { title: "Editor Teks Responsif", desc: "Simpan otomatis, penghitung kata realtime, bebas lag." },
                      { title: "AI Assistant Multitasking", desc: "Kembangkan draf langsung di samping lembar kerja utama." },
                      { title: "Ekspor Multi-Format Berkas", desc: "Unduh file Anda ke format PDF, Word (DOCX), atau EPUB sekali klik." },
                      { title: "Pedoman EYD & Tata Bahasa", desc: "Otomatisasi pengoreksi kalimat kaku dan penyesuai diksi." }
                    ].map((feat, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <div className="bg-amber-400/10 p-1.5 rounded-lg text-amber-400 mt-1">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{feat.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleCreateProject()} 
                    className="w-fit bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 mt-4 transition"
                  >
                    Buka Editor Sekarang <Sparkles className="w-4 h-4 text-amber-400" />
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-blue-900/10 rounded-3xl blur-2xl transform rotate-3"></div>
                  <div className="relative bg-slate-900 border border-blue-900/60 rounded-3xl p-6 shadow-2xl">
                    <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl mb-4 border border-blue-950">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs text-slate-400 font-mono">Draf_Ebook_Digital_Marketer.pdf</span>
                      </div>
                      <span className="text-xs bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded font-mono">E-BOOK</span>
                    </div>

                    <div className="space-y-4 font-serif text-slate-300 text-sm italic">
                      <div className="border-b border-blue-900/40 pb-4">
                        <h4 className="text-lg font-black text-white not-italic font-sans mb-1">Bab 1: Menembus Pasar dengan Personal Branding</h4>
                        <p className="text-xs text-slate-500 not-italic">Penulis: Ideologiszon AI Partner</p>
                      </div>
                      <p>“Di tengah hiruk pikuk ekosistem digital, wajah adalah representasi paling kuat dari kepercayaan bisnis Anda. Membangun personal branding bukanlah soal memamerkan kemewahan, melainkan tentang secara konsisten membagikan nilai-nilai murni...”</p>
                      <p className="hidden sm:block">“Setiap interaksi di media sosial, setiap konten YouTube, hingga tulisan dakwah santun di web merupakan kepingan teka-teki yang menyusun reputasi Anda...”</p>
                    </div>

                    <div className="mt-8 flex gap-3 justify-end">
                      <button className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition">
                        <Wand2 className="w-3.5 h-3.5 text-amber-400" /> AI Perluas Paragraf
                      </button>
                      <button className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition">
                        <Download className="w-3.5 h-3.5" /> Unduh Dokumen (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: DASHBOARD & WORKPLACE                               */}
        {/* ========================================================= */}
        {currentPage === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid md:grid-cols-12 gap-8">
              
              {/* Dashboard Sidebar Navigation */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <div className="bg-slate-900 border border-blue-900/30 rounded-2xl p-5 mb-4 flex flex-col items-center text-center gap-3">
                  <div className="relative p-1 bg-slate-950 rounded-xl border border-blue-900/40 w-full flex justify-center">
                    <img 
                      src="ChatGPT Image 23 Jun 2026, 18.28.35.png" 
                      alt="Ideologiszon Dashboard Logo" 
                      className="h-20 w-auto object-contain filter drop-shadow-[0_4px_10px_rgba(251,191,36,0.15)]"
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-white text-sm leading-tight line-clamp-1">{userEmail || "Penulis Ideologiszon"}</h3>
                    <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2.5 py-0.5 rounded-full font-bold mt-1.5 inline-block uppercase tracking-wider">PRO MEMBER</span>
                  </div>
                </div>

                <div className="bg-slate-900 border border-blue-900/30 rounded-2xl p-2 flex flex-col gap-1">
                  {[
                    { id: 'dashboard', label: 'Ringkasan & Stats', icon: TrendingUp },
                    { id: 'templates', label: 'Generator & Template', icon: Sparkles },
                    { id: 'projects', label: 'Proyek Naskah Saya', icon: FileText },
                    { id: 'profile', label: 'Pengaturan Profil', icon: User },
                  ].map(tab => {
                    const IconComp = tab.icon;
                    return (
                      <button 
                        key={tab.id}
                        onClick={() => setDashboardTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${dashboardTab === tab.id ? 'bg-blue-900 text-white' : 'text-slate-400 hover:bg-slate-950 hover:text-white'}`}
                      >
                        <IconComp className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {}
              {/* Main Dashboard Panel Content Area */}
              <div className="md:col-span-9 flex flex-col gap-8">
                
                {/* 1. SUMMARY TAB */}
                {dashboardTab === 'dashboard' && (
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-950 to-slate-900 border border-blue-900/30 p-8 rounded-3xl">
                      <div>
                        <h2 className="text-2xl font-black text-white">Selamat Datang Kembali di Workspace Anda!</h2>
                        <p className="text-slate-300 text-sm mt-1">Ideologiszon siap melayani dan mentransformasi tulisan Anda ke level mahakarya literasi.</p>
                      </div>
                      <button 
                        onClick={() => setDashboardTab('templates')} 
                        className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition"
                      >
                        <Plus className="w-4 h-4" /> Buat Karya Baru
                      </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-slate-900 border border-blue-900/20 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                        <div className="p-3 bg-blue-950 text-blue-400 rounded-xl">
                          <FileText className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Jumlah Karya</p>
                          <p className="text-3xl font-black text-white">{projects.length}</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-900 border border-blue-900/20 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                        <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl">
                          <Feather className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider font-sans">Total Kata Ditulis</p>
                          <p className="text-3xl font-black text-amber-400">
                            {projects.reduce((acc, curr) => acc + curr.wordCount, 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-900 border border-blue-900/20 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                        <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl">
                          <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">E-book Diterbitkan</p>
                          <p className="text-3xl font-black text-white">4</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Access Recent Projects */}
                    <div className="bg-slate-900 border border-blue-900/20 p-6 rounded-2xl">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Clock className="w-5 h-5 text-amber-400" /> Proyek Terakhir Ditulis
                        </h3>
                        <button onClick={() => setDashboardTab('projects')} className="text-xs text-amber-400 hover:underline">Lihat Semua</button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {projects.slice(0, 3).map((proj) => (
                          <div 
                            key={proj.id} 
                            onClick={() => handleOpenProjectInEditor(proj)}
                            className="bg-slate-950 border border-blue-950 hover:border-amber-400/40 p-4 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-blue-950 text-amber-400 rounded-lg">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                                <p className="text-xs text-slate-400 mt-1">Kategori: {proj.type} • {proj.wordCount} Kata • {proj.updatedAt}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleOpenProjectInEditor(proj); }}
                                className="bg-blue-900 hover:bg-blue-800 text-white text-xs px-3 py-1.5 rounded-lg transition"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={(e) => handleDeleteProject(proj.id, e)}
                                className="p-2 text-slate-500 hover:text-red-400 transition"
                                title="Hapus Proyek"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. GENERATOR & TEMPLATE TAB */}
                {dashboardTab === 'templates' && (
                  <div className="flex flex-col gap-8">
                    
                    {/* Active Interactive AI Form */}
                    <div id="generator-section" className="bg-slate-900 border border-blue-900/40 p-8 rounded-3xl relative">
                      <div className="absolute top-4 right-4 bg-amber-400/10 text-amber-400 border border-amber-400/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" /> Ideologiszon Engine v2
                      </div>

                      <h3 className="text-xl font-black text-white mb-6">Pilih Formulator Generator AI</h3>
                      
                      {/* Sub Category selectors for Formulator */}
                      <div className="flex flex-wrap gap-2 mb-8 bg-slate-950 p-1.5 rounded-2xl border border-blue-950">
                        {['Buku', 'E-book', 'Cerpen', 'Novel', 'Cerita Fiksi', 'Cerita Nonfiksi', 'Artikel', 'Makalah', 'Esai', 'Dakwah', 'YouTube', 'Sosmed'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setGenType(type)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${genType === type ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Judul Karya Tulis</label>
                          <input 
                            type="text" 
                            value={formData.title} 
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="Contoh: Petualangan Menembus Batas Cakrawala" 
                            className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 placeholder-slate-600"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tema Utama / Konsep Ide</label>
                          <input 
                            type="text" 
                            value={formData.theme} 
                            onChange={(e) => setFormData({...formData, theme: e.target.value})}
                            placeholder="Contoh: Perjuangan pantang menyerah anak pulau terpencil" 
                            className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 placeholder-slate-600"
                          />
                        </div>

                        {/* Conditional Inputs Based on GenType */}
                        {genType === 'Buku' && (
                          <>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Target Pembaca</label>
                              <input 
                                type="text" 
                                value={formData.targetReader} 
                                onChange={(e) => setFormData({...formData, targetReader: e.target.value})}
                                placeholder="Contoh: Remaja, Mahasiswa, Pengusaha Muda" 
                                className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Jumlah Bab Buku</label>
                              <select 
                                value={formData.chaptersCount} 
                                onChange={(e) => setFormData({...formData, chaptersCount: e.target.value})}
                                className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                              >
                                <option value="3">3 Bab Terstruktur</option>
                                <option value="5">5 Bab Standar</option>
                                <option value="8">8 Bab Komprehensif</option>
                                <option value="12">12 Bab Lengkap</option>
                              </select>
                            </div>
                          </>
                        )}

                        {genType === 'E-book' && (
                          <div className="sm:col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Target Pembaca Utama</label>
                            <input 
                              type="text" 
                              value={formData.targetReader} 
                              onChange={(e) => setFormData({...formData, targetReader: e.target.value})}
                              placeholder="Contoh: Pembaca Bisnis, Profesional Pemasaran Digital, Pelajar Pemula" 
                              className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        )}

                        {(genType === 'Cerpen' || genType === 'Novel') && (
                          <>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Genre Cerita</label>
                              <select 
                                value={formData.genre} 
                                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                                className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                              >
                                <option value="Horor">Horor & Mistis</option>
                                <option value="Romantis">Romantis & Drama</option>
                                <option value="Islami">Islami & Spiritual</option>
                                <option value="Petualangan">Petualangan & Fantasi</option>
                                <option value="Motivasi">Motivasi Hidup</option>
                                <option value="Misteri">Misteri & Teka-Teki</option>
                              </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nama Tokoh Utama</label>
                              <input 
                                type="text" 
                                value={formData.characters} 
                                onChange={(e) => setFormData({...formData, characters: e.target.value})}
                                placeholder="Contoh: Yusuf, Sarah, Kapten Danu" 
                                className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                              />
                            </div>
                          </>
                        )}

                        {genType === 'Cerita Fiksi' && (
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Sub-Genre Fiksi</label>
                            <select 
                              value={formData.fiksiType} 
                              onChange={(e) => setFormData({...formData, fiksiType: e.target.value})}
                              className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                            >
                              <option value="Fantasy">Sihir & Kerajaan Fantasi</option>
                              <option value="Sci-Fi">Fiksi Ilmiah & Cyberpunk</option>
                              <option value="Sejarah Alternatif">Sejarah Alternatif Indonesia</option>
                              <option value="Superhero">Pahlawan Super Lokal</option>
                            </select>
                          </div>
                        )}

                        {genType === 'Cerita Nonfiksi' && (
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Jenis Karya Nonfiksi</label>
                            <select 
                              value={formData.nonfiksiType} 
                              onChange={(e) => setFormData({...formData, nonfiksiType: e.target.value})}
                              className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                            >
                              <option value="Biografi">Biografi Inspiratif</option>
                              <option value="Motivasi">Buku Motivasi & Self Improvement</option>
                              <option value="Pendidikan">Buku Pendidikan Akademik</option>
                              <option value="Sejarah">Ulasan Sejarah Dunia / Nusantara</option>
                              <option value="Dakwah">Buku Dakwah & Tafsir Hikmah</option>
                            </select>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={triggerAIGenerator}
                        disabled={isGenerating}
                        className="mt-8 w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" /> Menulis Naskah Kreatif bersama AI...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" /> Tulis dan Buat Karya dengan AI Sekarang
                          </>
                        )}
                      </button>
                    </div>

                    {/* Templates Grid Section */}
                    <div>
                      <h4 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-amber-400" /> Template Siap Pakai & Cepat
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {TEMPLATES.map((tmpl) => {
                          const IconComp = tmpl.icon;
                          return (
                            <div 
                              key={tmpl.id} 
                              onClick={() => useTemplate(tmpl)}
                              className="bg-slate-900 border border-blue-900/20 hover:border-amber-400 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                            >
                              <div>
                                <div className="p-2.5 bg-blue-950 rounded-xl text-amber-400 w-fit mb-3">
                                  <IconComp className="w-5 h-5" />
                                </div>
                                <h5 className="font-bold text-white text-sm line-clamp-1">{tmpl.title}</h5>
                                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{tmpl.desc}</p>
                              </div>
                              <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/5 px-2.5 py-1 rounded-full w-fit mt-4">
                                {tmpl.type}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}

                {/* 3. PROJECTS LIST TAB */}
                {dashboardTab === 'projects' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h2 className="text-xl font-black text-white">Semua Proyek Karya Saya</h2>
                        <p className="text-xs text-slate-400">Seluruh dokumen naskah digital yang Anda simpan tersimpan di browser secara lokal.</p>
                      </div>
                      <button 
                        onClick={() => { handleCreateProject() }} 
                        className="bg-amber-400 text-slate-950 hover:bg-amber-500 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition"
                      >
                        <Plus className="w-4 h-4" /> Proyek Baru
                      </button>
                    </div>

                    {projects.length === 0 ? (
                      <div className="text-center py-20 bg-slate-900 border border-blue-900/20 rounded-3xl">
                        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-white">Belum Ada Proyek Tersimpan</h3>
                        <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">Anda dapat memulai penulisan dengan AI menggunakan formulir generator di menu Template.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {projects.map((proj) => (
                          <div 
                            key={proj.id}
                            onClick={() => handleOpenProjectInEditor(proj)}
                            className="bg-slate-900 border border-blue-900/20 hover:border-amber-400/40 p-5 rounded-2xl cursor-pointer flex flex-col justify-between hover:scale-[1.01] transition"
                          >
                            <div>
                              <div className="flex justify-between items-start gap-2 mb-3">
                                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full">
                                  {proj.type}
                                </span>
                                <p className="text-[10px] text-slate-400">{proj.updatedAt}</p>
                              </div>
                              <h3 className="font-extrabold text-white text-base mb-2 group-hover:text-amber-400 transition line-clamp-1">{proj.title}</h3>
                              <p className="text-xs text-slate-400 line-clamp-3 mb-4 font-serif">{proj.content || "Belum ada konten tulisan..."}</p>
                            </div>

                            <div className="flex justify-between items-center border-t border-blue-950 pt-4 mt-auto">
                              <span className="text-xs text-slate-400 font-medium">✏️ {proj.wordCount} kata</span>
                              <div className="flex gap-2">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleOpenProjectInEditor(proj); }}
                                  className="p-1.5 hover:text-amber-400 text-slate-400 transition" 
                                  title="Edit"
                                >
                                  <Feather className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={(e) => handleDeleteProject(proj.id, e)}
                                  className="p-1.5 hover:text-red-400 text-slate-400 transition" 
                                  title="Hapus"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. USER PROFILE TAB */}
                {dashboardTab === 'profile' && (
                  <div className="bg-slate-900 border border-blue-900/20 p-8 rounded-3xl max-w-2xl">
                    <h3 className="text-xl font-black text-white mb-2">Profil & Akun</h3>
                    <p className="text-sm text-slate-400 mb-6">Kelola akun Ideologiszon Anda dan lihat hak istimewa paket saat ini.</p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-blue-950">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-900 to-amber-400 p-0.5 flex items-center justify-center font-bold text-white text-xl">
                          P
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base">{userEmail || "Penulis Ideologiszon"}</h4>
                          <p className="text-xs text-slate-400">Terdaftar sejak Juni 2026</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-950 p-4 rounded-xl border border-blue-950">
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Level Keanggotaan</p>
                          <p className="text-lg font-black text-amber-400 mt-1">PRO MEMBER</p>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-blue-950">
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Batas Kata Bulanan</p>
                          <p className="text-lg font-black text-white mt-1">Tak Terbatas (PRO)</p>
                        </div>
                      </div>

                      <div className="border-t border-blue-950 pt-6">
                        <h4 className="text-sm font-bold text-white mb-3">Simulasi Hubungkan Integrasi Media</h4>
                        <div className="flex gap-4">
                          <button className="flex items-center gap-2 bg-blue-950 border border-blue-900 text-slate-200 text-xs px-4 py-2.5 rounded-lg">
                            <Video className="w-4 h-4 text-red-500" /> Sambungkan YouTube
                          </button>
                          <button className="flex items-center gap-2 bg-blue-950 border border-blue-900 text-slate-200 text-xs px-4 py-2.5 rounded-lg">
                            <Share2 className="w-4 h-4 text-blue-400" /> Sambungkan Medium
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: WRITING EDITOR & AI CHAT SIDEBAR                    */}
        {/* ========================================================= */}
        {currentPage === 'editor' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
            
            {/* Action Bar Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-blue-900/30 px-6 py-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setCurrentPage('dashboard'); setDashboardTab('projects'); }}
                  className="text-slate-400 hover:text-white text-xs font-semibold"
                >
                  ← Kembali ke Dashboard
                </button>
                <span className="text-slate-600">|</span>
                <span className="text-xs text-amber-400 uppercase tracking-widest font-black bg-amber-400/10 px-3 py-1 rounded-full">
                  {editorType}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{wordCount} Kata Ditulis</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button 
                  onClick={handleSaveProject} 
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  Simpan Karya (Autosave Aktif)
                </button>
                
                {/* Export Dropdown simulated */}
                <div className="relative group">
                  <button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 transition">
                    <Download className="w-3.5 h-3.5" /> Ekspor Hasil <ChevronRight className="w-3 h-3 rotate-90" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-44 bg-slate-900 border border-blue-900 rounded-xl shadow-2xl hidden group-hover:flex flex-col z-50 p-1.5">
                    <button onClick={() => triggerExport('pdf')} className="w-full text-left text-xs text-slate-300 hover:text-white hover:bg-blue-950/80 px-3 py-2 rounded-lg flex items-center gap-2">
                      <FileDown className="w-3.5 h-3.5 text-red-400" /> Dokumen PDF
                    </button>
                    <button onClick={() => triggerExport('doc')} className="w-full text-left text-xs text-slate-300 hover:text-white hover:bg-blue-950/80 px-3 py-2 rounded-lg flex items-center gap-2">
                      <FileDown className="w-3.5 h-3.5 text-blue-400" /> Microsoft Word (DOCX)
                    </button>
                    <button onClick={() => triggerExport('epub')} className="w-full text-left text-xs text-slate-300 hover:text-white hover:bg-blue-950/80 px-3 py-2 rounded-lg flex items-center gap-2">
                      <FileDown className="w-3.5 h-3.5 text-amber-400" /> Berkas E-book (EPUB)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Screen Editor & Chat Assistant */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              
              {/* Rich-Text Editor Box */}
              <div className="lg:col-span-8 flex flex-col bg-slate-900 border border-blue-900/30 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[600px]">
                <div className="flex flex-col gap-2 mb-6">
                  <input 
                    type="text" 
                    value={editorTitle}
                    onChange={(e) => setEditorTitle(e.target.value)}
                    placeholder="Judul Karya atau Judul Bab Utama..."
                    className="bg-transparent text-2xl sm:text-3xl font-black text-white focus:outline-none border-b border-transparent focus:border-blue-900/60 pb-2"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Workspace Terkoneksi ke Ideologiszon AI</span>
                  </div>
                </div>

                {/* AI Assistant Quick Actions Panel bar */}
                <div className="flex flex-wrap items-center gap-2 mb-4 bg-slate-950 p-2 rounded-2xl border border-blue-950">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Quick AI:
                  </span>
                  <button 
                    onClick={() => handleAIQuickAction('rewrite')}
                    disabled={isAIOperating}
                    className="text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-blue-900/30 px-3 py-1.5 rounded-xl transition disabled:opacity-50"
                  >
                    ✨ Tulis Ulang Elegan
                  </button>
                  <button 
                    onClick={() => handleAIQuickAction('expand')}
                    disabled={isAIOperating}
                    className="text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-blue-900/30 px-3 py-1.5 rounded-xl transition disabled:opacity-50"
                  >
                    ➕ Perluas Kalimat
                  </button>
                  <button 
                    onClick={() => handleAIQuickAction('summarize')}
                    disabled={isAIOperating}
                    className="text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-blue-900/30 px-3 py-1.5 rounded-xl transition disabled:opacity-50"
                  >
                    📋 Ringkas Naskah
                  </button>
                  <button 
                    onClick={() => handleAIQuickAction('grammar')}
                    disabled={isAIOperating}
                    className="text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-blue-900/30 px-3 py-1.5 rounded-xl transition disabled:opacity-50"
                  >
                    ✔️ Koreksi EYD & Tata Bahasa
                  </button>
                </div>

                {/* Main Text Area */}
                <div className="flex-grow flex flex-col relative">
                  {isAIOperating && (
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px] flex items-center justify-center z-20 rounded-2xl">
                      <div className="bg-slate-900 border border-blue-900 p-5 rounded-2xl flex items-center gap-3 shadow-2xl animate-pulse">
                        <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
                        <span className="text-xs font-bold text-white">Ideologiszon AI Sedang Merestrukturisasi Naskah...</span>
                      </div>
                    </div>
                  )}

                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder="Mulai tulis karya legendaris Anda di sini atau biarkan asisten AI di kanan membantu Anda mengembangkan bagian demi bagian secara mengalir..."
                    className="w-full flex-grow bg-slate-950/40 border border-blue-950 focus:border-blue-900/80 rounded-2xl p-6 sm:p-8 text-sm sm:text-base text-slate-300 leading-relaxed font-serif focus:outline-none resize-none min-h-[400px]"
                  />
                </div>
              </div>

              {}
              {/* Sidebar AI Chatbot */}
              <div className="lg:col-span-4 bg-slate-900 border border-blue-900/30 rounded-3xl p-5 flex flex-col h-[600px] shadow-2xl justify-between">
                
                {/* Chatbox Header */}
                <div className="flex items-center justify-between border-b border-blue-950 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">AI Assistant Chatbot</h4>
                      <p className="text-[10px] text-green-400">Siap Mengembangkan Ide</p>
                    </div>
                  </div>
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                </div>

                {/* Messages Panel Container */}
                <div className="flex-grow overflow-y-auto my-4 space-y-3 pr-1 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] text-slate-500 mb-0.5 capitalize">{msg.sender === 'user' ? 'Penulis' : 'Ideologiszon AI'}</span>
                      <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${msg.sender === 'user' ? 'bg-blue-900 text-white' : 'bg-slate-950 border border-blue-950 text-slate-300'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input panel block */}
                <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-blue-950">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleSendChatMessage(); }}
                    placeholder="Ketik ide, mintalah saran plot / outline..."
                    className="flex-grow bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none px-3 py-2"
                  />
                  <button 
                    onClick={handleSendChatMessage}
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 p-2.5 rounded-lg transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: PRICING PLANS                                       */}
        {/* ========================================================= */}
        {currentPage === 'pricing' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Paket Penulisan Fleksibel</h2>
              <p className="text-3xl sm:text-4xl font-black text-white">Investasi Terbaik untuk Produktivitas Kreativitas Sastra Anda</p>
              <p className="text-slate-400 mt-4 text-sm sm:text-base">Mulai dengan gratis dan tingkatkan ke paket Pro untuk menghasilkan ribuan karya literasi tanpa batasan kata maupun waktu ekspor.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
              
              {/* Plan 1: Gratis */}
              <div className="bg-slate-900 border border-blue-900/20 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Paket Gratis</h3>
                  <p className="text-xs text-slate-400 mb-6">Cocok untuk pemula yang ingin mengeksplorasi kemampuan AI literasi kami.</p>
                  <p className="text-4xl font-black text-white mb-6">Rp 0 <span className="text-xs text-slate-500 font-normal">/selamanya</span></p>
                  
                  <ul className="text-left space-y-4 mb-8 text-xs text-slate-300">
                    <li className="flex items-center gap-2">✔ Maksimal 5 proyek aktif</li>
                    <li className="flex items-center gap-2">✔ 10.000 kata generatif per bulan</li>
                    <li className="flex items-center gap-2">✔ Akses asisten chatbot editor standar</li>
                    <li className="text-slate-500 flex items-center gap-2">✖ Tanpa Ekspor PDF / EPUB pro</li>
                    <li className="text-slate-500 flex items-center gap-2">✖ Tanpa Prioritas Server AI</li>
                  </ul>
                </div>
                <button onClick={() => setCurrentPage('login')} className="w-full bg-slate-950 border border-blue-900 hover:border-amber-400 text-white font-bold py-3.5 rounded-xl text-xs transition">
                  Mulai Gratis Sekarang
                </button>
              </div>

              {/* Plan 2: Pro (Featured) */}
              <div className="bg-gradient-to-b from-blue-950 to-slate-900 border-2 border-amber-400 p-8 rounded-3xl flex flex-col justify-between relative shadow-[0_15px_40px_rgba(30,58,138,0.4)]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  PALING DIREKOMENDASIKAN
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Paket Pro Writer</h3>
                  <p className="text-xs text-slate-300 mb-6">Sangat pas bagi novelis, kontributor media, mahasiswa tingkat akhir, dan penulis profesional.</p>
                  <p className="text-4xl font-black text-amber-400 mb-6">Rp 149.000 <span className="text-xs text-slate-400 font-normal">/bulan</span></p>
                  
                  <ul className="text-left space-y-4 mb-8 text-xs text-slate-200 font-medium">
                    <li className="flex items-center gap-2">✔ Proyek naskah tanpa batas</li>
                    <li className="flex items-center gap-2">✔ Generator tulisan tanpa batas kata</li>
                    <li className="flex items-center gap-2">✔ AI Premium Engine (EYD & Gaya Bahasa Khusus)</li>
                    <li className="flex items-center gap-2">✔ Ekspor file instan (PDF, DOCX, EPUB)</li>
                    <li className="flex items-center gap-2">✔ Integrasi Google Drive / One Drive</li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    setIsLoggedIn(true);
                    setUserEmail("pro_writer@ideologiszon.com");
                    setCurrentPage('dashboard');
                    triggerNotification("Pembayaran simulasi berhasil! Anda masuk sebagai Pro Writer.");
                  }} 
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-4 rounded-xl text-xs shadow-lg hover:scale-[1.02] transition"
                >
                  Langganan Paket Pro (Simulasi)
                </button>
              </div>

              {/* Plan 3: Enterprise */}
              <div className="bg-slate-900 border border-blue-900/20 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Paket Enterprise</h3>
                  <p className="text-xs text-slate-400 mb-6">Pilihan mutakhir bagi tim jurnalis, penerbit buku besar, dan instansi pendidikan.</p>
                  <p className="text-4xl font-black text-white mb-6">Custom <span className="text-xs text-slate-500 font-normal">/hubungi tim</span></p>
                  
                  <ul className="text-left space-y-4 mb-8 text-xs text-slate-300">
                    <li className="flex items-center gap-2">✔ Seluruh fitur Pro Writer</li>
                    <li className="flex items-center gap-2">✔ Kolaborasi naskah real-time multi-user</li>
                    <li className="flex items-center gap-2">✔ Hak akses API Penulisan Ideologiszon</li>
                    <li className="flex items-center gap-2">✔ Pendampingan manajer akun literasi personal</li>
                    <li className="flex items-center gap-2">✔ Keamanan data terenkripsi end-to-end</li>
                  </ul>
                </div>
                <button onClick={() => triggerNotification("Terima kasih! Tim Enterprise kami akan segera menghubungi Anda.", "info")} className="w-full bg-slate-950 border border-blue-900 hover:border-amber-400 text-white font-bold py-3.5 rounded-xl text-xs transition">
                  Kontak Tim Marketing
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: AUTHENTICATION LOGIN / SIGNUP                       */}
        {/* ========================================================= */}
        {currentPage === 'login' && (
          <div className="max-w-md mx-auto px-4 py-24">
            <div className="bg-slate-900 border border-blue-900/30 p-8 rounded-3xl shadow-2xl">
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <img 
                    src="ChatGPT Image 23 Jun 2026, 18.28.35.png" 
                    alt="Ideologiszon Official Brand Mark" 
                    className="h-28 w-auto object-contain filter drop-shadow-[0_10px_15px_rgba(30,58,138,0.3)]"
                  />
                </div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">Secure Gateway</span>
                <h2 className="text-2xl font-black text-white mt-3">
                  {authMode === 'login' ? 'Masuk ke Ideologiszon' : 'Daftar Akun Baru'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">Gabung bersama komunitas penulis modern AI terbesar di Indonesia</p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Alamat Email</label>
                  <input 
                    type="email" 
                    required 
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Contoh: penulis@ideologiszon.com" 
                    className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Kata Sandi (Password)</label>
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••••••" 
                    className="bg-slate-950 border border-blue-900/40 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs shadow-lg transition">
                  {authMode === 'login' ? 'Masuk Sekarang' : 'Daftar & Hubungkan AI'}
                </button>
              </form>

              {/* Social Logins block mock */}
              <div className="mt-8 border-t border-blue-950 pt-6">
                <p className="text-center text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-4">Atau Masuk Lebih Cepat</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      setIsLoggedIn(true);
                      setUserEmail("google.member@gmail.com");
                      setCurrentPage('dashboard');
                      triggerNotification("Berhasil masuk melalui Google authentication!");
                    }} 
                    className="flex items-center justify-center gap-2 bg-slate-950 border border-blue-950 hover:border-amber-400/40 text-slate-300 text-xs py-2.5 rounded-xl transition"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#EA4335" d="M12.2 11.5v3h6.8c-.3 1.6-1.9 4.7-6.8 4.7-4.2 0-7.7-3.5-7.7-7.8s3.5-7.8 7.7-7.8c2.4 0 4 .9 4.9 1.8l2.4-2.3C17.9 1.6 15.3 1 12.2 1 6 1 1 6 1 12.2s5 11.2 11.2 11.2c6.5 0 10.8-4.6 10.8-11 0-.7-.1-1.3-.2-1.9H12.2z"/></svg>
                    Google
                  </button>
                  <button 
                    onClick={() => {
                      setIsLoggedIn(true);
                      setUserEmail("facebook.member@outlook.com");
                      setCurrentPage('dashboard');
                      triggerNotification("Berhasil masuk melalui Facebook authentication!");
                    }} 
                    className="flex items-center justify-center gap-2 bg-slate-950 border border-blue-950 hover:border-amber-400/40 text-slate-300 text-xs py-2.5 rounded-xl transition"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-xs">
                {authMode === 'login' ? (
                  <p className="text-slate-400">Belum punya akun? <span className="text-amber-400 hover:underline cursor-pointer font-bold" onClick={() => setAuthMode('register')}>Daftar Gratis</span></p>
                ) : (
                  <p className="text-slate-400">Sudah punya akun? <span className="text-amber-400 hover:underline cursor-pointer font-bold" onClick={() => setAuthMode('login')}>Masuk</span></p>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {}
      {/* FOOTER & SEO */}
      <footer className="bg-slate-950 border-t border-blue-900/40 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 text-slate-400">
          
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-slate-900 border border-blue-900/30 rounded-lg">
                <img 
                  src="ChatGPT Image 23 Jun 2026, 18.28.35.png" 
                  alt="Ideologiszon Footer Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Ideologiszon adalah platform asisten penulis buku cerdas pertama dan terlengkap di Indonesia yang mengandalkan optimalisasi teknologi generative AI untuk membantu Anda menulis karya sastra secara luar biasa.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">Optimasi SEO & Keyword</h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="bg-slate-900/60 border border-blue-950 px-2.5 py-1 rounded-md">#AI Penulis Buku</span>
              <span className="bg-slate-900/60 border border-blue-950 px-2.5 py-1 rounded-md">#AI Pembuat Ebook</span>
              <span className="bg-slate-900/60 border border-blue-950 px-2.5 py-1 rounded-md">#AI Cerpen</span>
              <span className="bg-slate-900/60 border border-blue-950 px-2.5 py-1 rounded-md">#AI Novel</span>
              <span className="bg-slate-900/60 border border-blue-950 px-2.5 py-1 rounded-md">#AI Writer Indonesia</span>
              <span className="bg-slate-900/60 border border-blue-950 px-2.5 py-1 rounded-md">#Pembuat Buku Otomatis</span>
              <span className="bg-slate-900/60 border border-blue-950 px-2.5 py-1 rounded-md">#Menulis Buku Cepat</span>
              <span className="bg-slate-900/60 border border-blue-950 px-2.5 py-1 rounded-md">#Naskah Dakwah Digital</span>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 gap-4 text-xs">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white uppercase tracking-wider mb-2">Navigasi</span>
              <button onClick={() => setCurrentPage('home')} className="text-left hover:text-white transition">Tentang Kami</button>
              <button onClick={() => triggerNotification("Blog Edukatif sedang dikurasi tim redaksi.", "info")} className="text-left hover:text-white transition">Blog Sastra</button>
              <button onClick={() => setCurrentPage('pricing')} className="text-left hover:text-white transition">Paket Harga</button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white uppercase tracking-wider mb-2">Bantuan</span>
              <button onClick={() => triggerNotification("Layanan Dukungan Pelanggan aktif 24 jam.", "info")} className="text-left hover:text-white transition">Kontak CS</button>
              <button onClick={() => triggerNotification("Kebijakan privasi data Anda terjamin 100%.", "info")} className="text-left hover:text-white transition">Privasi & Legal</button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-blue-950 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Ideologiszon. All Rights Reserved. Platform AI Penulis Buku dan Cerita Terlengkap di Indonesia.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-400">Syarat Ketentuan</a>
            <a href="#" className="hover:text-amber-400">Kebijakan Cookie</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
