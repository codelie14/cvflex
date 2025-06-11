
import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeSelector = ({ selectedTheme, onThemeChange, customColors, onClose }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const themes = [
    { id: 'futuristic', name: 'Futuriste', description: 'Dégradés violets et bleus', previewClass: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900', 
      previewStyle: {},
      accentStyle: { backgroundColor: isDarkMode ? '#8B5CF666' : '#A78BFA66' }, // purple-500/40 or purple-400/40
      textStyle: { backgroundColor: isDarkMode ? '#FFFFFF22' : '#4B556322' } // white/10 or slate-600/10
    },
    { id: 'modern', name: 'Moderne', description: 'Tons bleus épurés', previewClass: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900', 
      previewStyle: {},
      accentStyle: { backgroundColor: isDarkMode ? '#60A5FA66' : '#93C5FD66' }, // blue-400/40
      textStyle: { backgroundColor: isDarkMode ? '#FFFFFF22' : '#4B556322'}
    },
    { id: 'minimal', name: 'Minimaliste', description: 'Nuances de gris sobres', previewClass: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900', 
      previewStyle: {},
      accentStyle: { backgroundColor: isDarkMode ? '#9CA3AF66' : '#D1D5DB66' }, // gray-400/40 or gray-300/40
      textStyle: { backgroundColor: isDarkMode ? '#FFFFFF22' : '#4B556322'}
    },
    { id: 'custom', name: 'Custom', description: 'Vos couleurs perso !', previewClass: '', 
      previewStyle: { backgroundColor: customColors.background || (isDarkMode ? '#111827' : '#FFFFFF') }, 
      accentStyle: { backgroundColor: (customColors.accent || (isDarkMode ? '#8B5CF6' : '#7C3AED')) + '66' },
      textStyle: { backgroundColor: (customColors.text || (isDarkMode ? '#FFFFFF' : '#111827')) + '22'},
      isCustom: true 
    }
  ];


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-effect rounded-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto scrollbar-hide bg-card text-card-foreground" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Choisir un Thème</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-card-foreground hover:bg-accent"><X className="w-5 h-5" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${selectedTheme === theme.id ? (theme.isCustom ? 'border-green-500' : 'border-primary') : 'border-border hover:border-border/70'}`}
              onClick={() => onThemeChange(theme.id)}
            >
              <div className={`${theme.previewClass} h-32 relative`} style={theme.previewStyle}>
                {selectedTheme === theme.id && (
                  <div className={`absolute top-2 right-2 w-6 h-6 ${theme.isCustom ? 'bg-green-500' : 'bg-primary'} rounded-full flex items-center justify-center`}>
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div className="absolute inset-4 bg-black/20 dark:bg-black/30 backdrop-blur-sm rounded p-2">
                  <div className="h-2 rounded mb-1" style={theme.accentStyle}></div>
                  <div className="h-1 rounded mb-2 w-3/4" style={{...theme.accentStyle, opacity: 0.7}}></div>
                  <div className="space-y-1">
                    <div className="h-1 rounded w-full" style={theme.textStyle}></div>
                    <div className="h-1 rounded w-2/3" style={theme.textStyle}></div>
                  </div>
                </div>
                {theme.isCustom && <Palette className={`absolute bottom-2 right-2 w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}/>}
              </div>
              <div className="p-4 bg-accent/30">
                <h3 className="font-semibold mb-1">{theme.name}</h3>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="bg-primary text-primary-foreground hover:bg-primary/90">Fermer</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeSelector;
