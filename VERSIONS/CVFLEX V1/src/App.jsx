
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Download, FileText, Palette, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import ThemeSelector from '@/components/ThemeSelector';
import TutorialModal from '@/components/TutorialModal';
import ExportModal from '@/components/ExportModal';
import Cookies from 'js-cookie';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [cvData, setCvData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    hobbies: []
  });
  const [selectedTheme, setSelectedTheme] = useState('futuristic');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // Charger les données depuis les cookies
    const savedData = Cookies.get('cvflex-data');
    const savedTheme = Cookies.get('cvflex-theme');
    const savedDarkMode = Cookies.get('cvflex-darkmode');
    const hasSeenTutorial = Cookies.get('cvflex-tutorial-seen');

    if (savedData) {
      try {
        setCvData(JSON.parse(savedData));
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    }

    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }

    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }

    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }

    // Appliquer le mode sombre
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Sauvegarder les données dans les cookies
    Cookies.set('cvflex-data', JSON.stringify(cvData), { expires: 365 });
  }, [cvData]);

  useEffect(() => {
    Cookies.set('cvflex-theme', selectedTheme, { expires: 365 });
  }, [selectedTheme]);

  useEffect(() => {
    Cookies.set('cvflex-darkmode', darkMode.toString(), { expires: 365 });
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDataChange = (newData) => {
    setCvData(newData);
    toast({
      title: "✨ CV sauvegardé !",
      description: "Vos modifications ont été enregistrées automatiquement.",
      duration: 2000,
    });
  };

  const resetData = () => {
    setCvData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      languages: [],
      hobbies: []
    });
    Cookies.remove('cvflex-data');
    toast({
      title: "🗑️ Données effacées",
      description: "Toutes vos données ont été supprimées.",
      duration: 3000,
    });
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    Cookies.set('cvflex-tutorial-seen', 'true', { expires: 365 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pattern-dots">
      <Toaster />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 glass-effect border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">CVFLEX</span>
          </motion.div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTutorial(true)}
              className="text-white hover:bg-white/10"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThemeSelector(true)}
              className="text-white hover:bg-white/10"
            >
              <Palette className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-white hover:bg-white/10"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button
              onClick={() => setShowExportModal(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8 h-[calc(100vh-120px)]">
          {/* Form Section */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 glass-effect rounded-2xl p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-semibold text-white">Créer votre CV</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetData}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                Réinitialiser
              </Button>
            </div>
            
            <div className="h-[calc(100%-80px)] overflow-y-auto scrollbar-hide">
              <CVForm data={cvData} onChange={handleDataChange} />
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-effect rounded-2xl p-6 overflow-hidden"
          >
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-semibold text-white">Aperçu</span>
            </div>
            
            <div className="h-[calc(100%-80px)] overflow-y-auto scrollbar-hide">
              <CVPreview data={cvData} theme={selectedTheme} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showTutorial && (
          <TutorialModal onClose={closeTutorial} />
        )}
        
        {showThemeSelector && (
          <ThemeSelector
            selectedTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
            onClose={() => setShowThemeSelector(false)}
          />
        )}

        {showExportModal && (
          <ExportModal
            cvData={cvData}
            theme={selectedTheme}
            onClose={() => setShowExportModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
