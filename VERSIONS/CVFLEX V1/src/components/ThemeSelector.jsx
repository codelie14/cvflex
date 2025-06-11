
import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeSelector = ({ selectedTheme, onThemeChange, onClose }) => {
  const themes = [
    {
      id: 'futuristic',
      name: 'Futuriste',
      description: 'Design moderne avec des dégradés violets et bleus',
      preview: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
    },
    {
      id: 'modern',
      name: 'Moderne',
      description: 'Style épuré avec des tons bleus',
      preview: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900'
    },
    {
      id: 'minimal',
      name: 'Minimaliste',
      description: 'Design sobre en nuances de gris',
      preview: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-effect rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Choisir un thème</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                selectedTheme === theme.id
                  ? 'border-purple-500'
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => onThemeChange(theme.id)}
            >
              <div className={`${theme.preview} h-32 relative`}>
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                
                {/* Mini CV Preview */}
                <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded p-2">
                  <div className="h-2 bg-white/30 rounded mb-1"></div>
                  <div className="h-1 bg-white/20 rounded mb-2 w-3/4"></div>
                  <div className="space-y-1">
                    <div className="h-1 bg-white/15 rounded w-full"></div>
                    <div className="h-1 bg-white/15 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white/5">
                <h3 className="font-semibold text-white mb-1">{theme.name}</h3>
                <p className="text-sm text-gray-400">{theme.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            Fermer
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeSelector;
