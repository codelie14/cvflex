import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Download, FileText, Palette, HelpCircle, Sparkles, Upload, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import ThemeSelector from '@/components/ThemeSelector';
import TutorialModal from '@/components/TutorialModal';
import ExportModal from '@/components/ExportModal';
import SettingsModal from '@/components/SettingsModal';
import Cookies from 'js-cookie';

const initialCvData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    summary: '',
    portfolio: '',
    linkedin: '',
    github: '',
    profilePicture: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  hobbies: [],
  projects: [],
  certifications: [],
  references: []
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [cvData, setCvData] = useState(initialCvData);
  const [selectedTheme, setSelectedTheme] = useState('futuristic');
  const [selectedFont, setSelectedFont] = useState('Poppins');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    const savedData = Cookies.get('cvflex-data');
    const savedTheme = Cookies.get('cvflex-theme');
    const savedDarkMode = Cookies.get('cvflex-darkmode');
    const savedFont = Cookies.get('cvflex-font');
    const hasSeenTutorial = Cookies.get('cvflex-tutorial-seen');

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Merge saved data with initial structure to ensure all fields are present
        const mergedData = {
          ...initialCvData,
          ...parsedData,
          personalInfo: {
            ...initialCvData.personalInfo,
            ...(parsedData.personalInfo || {}),
          },
          experience: parsedData.experience || [],
          education: parsedData.education || [],
          skills: parsedData.skills || [],
          languages: parsedData.languages || [],
          hobbies: parsedData.hobbies || [],
          projects: parsedData.projects || [],
          certifications: parsedData.certifications || [],
          references: parsedData.references || [],
        };
        setCvData(mergedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setCvData(initialCvData);
      }
    } else {
      setCvData(initialCvData);
    }

    if (savedTheme) setSelectedTheme(savedTheme);
    if (savedFont) setSelectedFont(savedFont);
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
    if (!hasSeenTutorial) setShowTutorial(true);

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    Cookies.set('cvflex-data', JSON.stringify(cvData), { expires: 365 });
  }, [cvData]);

  useEffect(() => {
    Cookies.set('cvflex-theme', selectedTheme, { expires: 365 });
  }, [selectedTheme]);

  useEffect(() => {
    Cookies.set('cvflex-font', selectedFont, { expires: 365 });
  }, [selectedFont]);

  useEffect(() => {
    Cookies.set('cvflex-darkmode', darkMode.toString(), { expires: 365 });
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleDataChange = (newData) => {
    setCvData(newData);
    toast({
      title: "✨ CV sauvegardé !",
      description: "Vos modifications ont été enregistrées automatiquement.",
      duration: 2000,
    });
  };

  const resetData = () => {
    setCvData(initialCvData);
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

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          const mergedData = {
            ...initialCvData,
            ...importedData,
            personalInfo: {
              ...initialCvData.personalInfo,
              ...(importedData.personalInfo || {}),
            },
            experience: importedData.experience || [],
            education: importedData.education || [],
            skills: importedData.skills || [],
            languages: importedData.languages || [],
            hobbies: importedData.hobbies || [],
            projects: importedData.projects || [],
            certifications: importedData.certifications || [],
            references: importedData.references || [],
          };
          setCvData(mergedData);
          toast({
            title: "✅ Données importées !",
            description: "Vos données CV ont été chargées avec succès.",
            duration: 3000,
          });
        } catch (error) {
          console.error("Erreur d'import JSON:", error);
          toast({
            title: "❌ Erreur d'import",
            description: "Le fichier JSON est invalide ou corrompu.",
            variant: "destructive",
            duration: 3000,
          });
        }
      };
      reader.readAsText(file);
    }
    // Reset file input to allow importing the same file again
    event.target.value = null; 
  };


  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pattern-dots font-${selectedFont.toLowerCase()}`}>
      <Toaster />
      
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
              onClick={() => document.getElementById('import-json-input').click()}
              className="text-white hover:bg-white/10"
              title="Importer JSON"
            >
              <Upload className="w-5 h-5" />
            </Button>
            <input type="file" id="import-json-input" accept=".json" onChange={handleImportJSON} className="hidden" />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettingsModal(true)}
              className="text-white hover:bg-white/10"
              title="Paramètres"
            >
              <Settings className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTutorial(true)}
              className="text-white hover:bg-white/10"
              title="Tutoriel"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThemeSelector(true)}
              className="text-white hover:bg-white/10"
              title="Changer de thème"
            >
              <Palette className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-white hover:bg-white/10"
              title={darkMode ? "Mode clair" : "Mode sombre"}
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

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8 h-[calc(100vh-120px)]">
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
              <CVPreview data={cvData} theme={selectedTheme} font={selectedFont} />
            </div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {showTutorial && <TutorialModal onClose={closeTutorial} />}
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
            font={selectedFont}
            onClose={() => setShowExportModal(false)}
            onImportJSON={() => document.getElementById('import-json-input').click()}
          />
        )}
        {showSettingsModal && (
          <SettingsModal
            selectedFont={selectedFont}
            onFontChange={setSelectedFont}
            onClose={() => setShowSettingsModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;