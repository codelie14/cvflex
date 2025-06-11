import React from 'react';
import { motion } from 'framer-motion';
import { X, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsModal = ({ selectedFont, onFontChange, onClose }) => {
  const fonts = [
    { id: 'Poppins', name: 'Poppins' },
    { id: 'Roboto', name: 'Roboto' },
    { id: 'OpenSans', name: 'Open Sans' },
    { id: 'Lato', name: 'Lato' },
    { id: 'Montserrat', name: 'Montserrat' },
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
        className="glass-effect rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Paramètres d'affichage</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="font-selector" className="text-white flex items-center mb-2">
              <Type className="w-4 h-4 mr-2 text-purple-400" />
              Police du CV
            </Label>
            <Select value={selectedFont} onValueChange={onFontChange}>
              <SelectTrigger id="font-selector" className="w-full bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Choisir une police" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {fonts.map((font) => (
                  <SelectItem key={font.id} value={font.id} className={`font-${font.id.toLowerCase()} hover:bg-purple-500/20 focus:bg-purple-500/30`}>
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
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

export default SettingsModal;