
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Download, FileText, Palette, HelpCircle, Sparkles, Upload, Settings, Share2, LayoutDashboard, BookOpen, Linkedin as LinkedinIcon, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import ThemeSelector from '@/components/ThemeSelector';
import TutorialModal from '@/components/TutorialModal';
import ExportModal from '@/components/ExportModal';
import SettingsModal from '@/components/SettingsModal';
import ShareModal from '@/components/ShareModal';
import GalleryPage from '@/components/GalleryPage';
import CoverLetterPage from '@/components/CoverLetterPage';
import Cookies from 'js-cookie';

const initialCvData = {
  personalInfo: {
    firstName: '', lastName: '', email: '', phone: '', address: '', title: '', summary: '',
    portfolio: '', linkedin: '', github: '', profilePicture: ''
  },
  experience: [], education: [], skills: [], languages: [], hobbies: [],
  projects: [], certifications: [], references: []
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [cvData, setCvData] = useState(initialCvData);
  const [selectedTheme, setSelectedTheme] = useState('futuristic');
  const [selectedFont, setSelectedFont] = useState('Poppins');
  const [customColors, setCustomColors] = useState({ accent: '#8B5CF6', background: '#111827', card: '#1F2937', text: '#FFFFFF' });
  const [showTutorial, setShowTutorial] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const savedData = Cookies.get('cvflex-data');
    const savedTheme = Cookies.get('cvflex-theme');
    let initialDarkMode = true;
    const savedDarkModeCookie = Cookies.get('cvflex-darkmode');
    if (savedDarkModeCookie !== undefined) {
      initialDarkMode = savedDarkModeCookie === 'true';
    }
    
    const savedFont = Cookies.get('cvflex-font');
    const savedCustomColors = Cookies.get('cvflex-custom-colors');
    const hasSeenTutorial = Cookies.get('cvflex-tutorial-seen');

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const mergedData = {
          ...initialCvData, ...parsedData,
          personalInfo: { ...initialCvData.personalInfo, ...(parsedData.personalInfo || {}) },
          experience: parsedData.experience || [], education: parsedData.education || [],
          skills: parsedData.skills || [], languages: parsedData.languages || [],
          hobbies: parsedData.hobbies || [], projects: parsedData.projects || [],
          certifications: parsedData.certifications || [], references: parsedData.references || [],
        };
        setCvData(mergedData);
      } catch (error) { console.error('Erreur chargement données:', error); setCvData(initialCvData); }
    } else { setCvData(initialCvData); }

    if (savedTheme) setSelectedTheme(savedTheme);
    if (savedFont) setSelectedFont(savedFont);
    if (savedCustomColors) {
      try { setCustomColors(JSON.parse(savedCustomColors)); }
      catch(e) { console.error("Erreur chargement couleurs perso:", e)}
    }
    setDarkMode(initialDarkMode);
    if (!hasSeenTutorial) setShowTutorial(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    Cookies.set('cvflex-darkmode', darkMode.toString(), { expires: 365 });
  }, [darkMode]);


  useEffect(() => { Cookies.set('cvflex-data', JSON.stringify(cvData), { expires: 365 }); }, [cvData]);
  useEffect(() => { Cookies.set('cvflex-theme', selectedTheme, { expires: 365 }); }, [selectedTheme]);
  useEffect(() => { Cookies.set('cvflex-font', selectedFont, { expires: 365 }); }, [selectedFont]);
  useEffect(() => { Cookies.set('cvflex-custom-colors', JSON.stringify(customColors), { expires: 365}); }, [customColors]);

  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  const handleDataChange = (newData) => {
    setCvData(newData);
    toast({ title: "✨ CV sauvegardé !", description: "Modifications enregistrées.", duration: 2000 });
  };

  const resetData = () => {
    setCvData(initialCvData);
    Cookies.remove('cvflex-data');
    toast({ title: "🗑️ Données effacées", description: "Toutes vos données ont été supprimées.", duration: 3000 });
  };

  const closeTutorial = () => { setShowTutorial(false); Cookies.set('cvflex-tutorial-seen', 'true', { expires: 365 }); };

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          const mergedData = {
            ...initialCvData, ...importedData,
            personalInfo: { ...initialCvData.personalInfo, ...(importedData.personalInfo || {}) },
            experience: importedData.experience || [], education: importedData.education || [],
            skills: importedData.skills || [], languages: importedData.languages || [],
            hobbies: importedData.hobbies || [], projects: importedData.projects || [],
            certifications: importedData.certifications || [], references: importedData.references || [],
          };
          setCvData(mergedData);
          toast({ title: "✅ Données importées !", description: "Données CV chargées.", duration: 3000 });
        } catch (error) {
          console.error("Erreur import JSON:", error);
          toast({ title: "❌ Erreur d'import", description: "Fichier JSON invalide.", variant: "destructive", duration: 3000 });
        }
      };
      reader.readAsText(file);
    }
    event.target.value = null; 
  };
  
  const handleFeatureNotImplemented = (featureName) => {
    toast({
      title: `🚧 ${featureName} à venir !`,
      description: "Cette fonctionnalité n'est pas encore implémentée. Revenez bientôt ! 🚀",
      duration: 4000,
    });
  };

  const MainContent = () => (
    <main className="container mx-auto px-4 py-8 mb-20 md:mb-0">
      <div className="grid lg:grid-cols-5 gap-8 h-[calc(100vh-180px)] md:h-[calc(100vh-120px)]">
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-3 glass-effect rounded-2xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3"><Sparkles className="w-6 h-6 text-purple-400" /><span className="text-xl font-semibold text-foreground">Créer votre CV</span></div>
            <Button variant="outline" size="sm" onClick={resetData} className="border-red-500/50 text-red-400 hover:bg-red-500/10">Réinitialiser</Button>
          </div>
          <div className="h-[calc(100%-80px)] overflow-y-auto scrollbar-hide"><CVForm data={cvData} onChange={handleDataChange} /></div>
        </motion.div>
        <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass-effect rounded-2xl p-6 overflow-hidden">
          <div className="flex items-center space-x-3 mb-6"><FileText className="w-6 h-6 text-blue-400" /><span className="text-xl font-semibold text-foreground">Aperçu</span></div>
          <div className="h-[calc(100%-80px)] overflow-y-auto scrollbar-hide"><CVPreview data={cvData} theme={selectedTheme} font={selectedFont} customColors={customColors} /></div>
        </motion.div>
      </div>
    </main>
  );

  return (
    <div className={`min-h-screen bg-background text-foreground pattern-dots font-${selectedFont.toLowerCase()}`}>
      <Toaster />
      <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-gradient">CVFLEX</span>
            </motion.div>
          </Link>
          <div className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" size="icon" onClick={() => handleFeatureNotImplemented("Récupération LinkedIn")} className="text-foreground hover:bg-accent" title="Récupérer de LinkedIn (Bientôt disponible)"><LinkedinIcon className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" onClick={() => document.getElementById('import-json-input').click()} className="text-foreground hover:bg-accent" title="Importer JSON"><Upload className="w-5 h-5" /></Button>
            <input type="file" id="import-json-input" accept=".json" onChange={handleImportJSON} className="hidden" />
            <Button variant="ghost" size="icon" onClick={() => setShowSettingsModal(true)} className="text-foreground hover:bg-accent" title="Paramètres"><Settings className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" onClick={() => setShowTutorial(true)} className="text-foreground hover:bg-accent" title="Tutoriel"><HelpCircle className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" onClick={() => setShowThemeSelector(true)} className="text-foreground hover:bg-accent" title="Thèmes & Couleurs"><Palette className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-foreground hover:bg-accent" title={darkMode ? "Mode clair" : "Mode sombre"}>{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</Button>
            <Button variant="ghost" size="icon" onClick={() => setShowShareModal(true)} className="text-foreground hover:bg-accent" title="Partager"><Share2 className="w-5 h-5" /></Button>
            <Button onClick={() => setShowExportModal(true)} className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-primary-foreground px-3 py-1.5 md:px-4 md:py-2"><Download className="w-4 h-4 mr-0 md:mr-2" /><span className="hidden md:inline">Exporter</span></Button>
          </div>
        </div>
      </motion.header>

      {location.pathname === '/' && (
         <div className="container mx-auto px-4 py-2 md:py-4 fixed bottom-0 left-0 right-0 z-40 md:static">
            <div className="glass-effect rounded-full md:rounded-xl p-2 md:p-3 flex justify-around items-center shadow-xl">
                <Button variant="ghost" onClick={() => navigate('/gallery')} className="flex flex-col items-center text-foreground hover:bg-accent px-2 py-1 h-auto text-xs md:text-sm">
                    <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5 mb-0.5 md:mb-1" /> Galerie
                </Button>
                <Button variant="ghost" onClick={() => navigate('/cover-letter')} className="flex flex-col items-center text-foreground hover:bg-accent px-2 py-1 h-auto text-xs md:text-sm">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 mb-0.5 md:mb-1" /> Lettre Motiv.
                </Button>
            </div>
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/cover-letter" element={<CoverLetterPage cvData={cvData}/>} />
      </Routes>


      <AnimatePresence>
        {showTutorial && <TutorialModal onClose={closeTutorial} />}
        {showThemeSelector && <ThemeSelector selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} customColors={customColors} onCustomColorsChange={setCustomColors} onClose={() => setShowThemeSelector(false)} />}
        {showExportModal && <ExportModal cvData={cvData} theme={selectedTheme} font={selectedFont} customColors={customColors} onClose={() => setShowExportModal(false)} onImportJSON={() => document.getElementById('import-json-input').click()} />}
        {showSettingsModal && <SettingsModal selectedFont={selectedFont} onFontChange={setSelectedFont} customColors={customColors} onCustomColorsChange={setCustomColors} onClose={() => setShowSettingsModal(false)} />}
        {showShareModal && <ShareModal cvTitle={`${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`} onClose={() => setShowShareModal(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
