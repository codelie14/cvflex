
import React from 'react';
import { motion } from 'framer-motion';
import { X, Type, Droplet, Palette as PaletteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from 'react-colorful';

const SettingsModal = ({ selectedFont, onFontChange, customColors, onCustomColorsChange, onClose }) => {
  const fonts = [
    { id: 'Poppins', name: 'Poppins' }, { id: 'Roboto', name: 'Roboto' },
    { id: 'OpenSans', name: 'Open Sans' }, { id: 'Lato', name: 'Lato' },
    { id: 'Montserrat', name: 'Montserrat' },
  ];

  const colorOptions = [
    { name: 'Accent', key: 'accent', defaultDark: '#8B5CF6', defaultLight: '#7C3AED' },
    { name: 'Arrière-plan', key: 'background', defaultDark: '#111827', defaultLight: '#FFFFFF' },
    { name: 'Cartes', key: 'card', defaultDark: '#1F2937', defaultLight: '#F9FAFB' },
    { name: 'Texte', key: 'text', defaultDark: '#FFFFFF', defaultLight: '#111827' },
  ];

  const handleColorChange = (key, color) => {
    onCustomColorsChange(prev => ({ ...prev, [key]: color }));
  };
  
  const resetColor = (key, defaultValue) => {
     onCustomColorsChange(prev => ({ ...prev, [key]: defaultValue }));
  };

  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-effect rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide bg-card text-card-foreground" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Paramètres d'affichage</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-card-foreground hover:bg-accent"><X className="w-5 h-5" /></Button>
        </div>
        <div className="space-y-6">
          <div>
            <Label htmlFor="font-selector" className="flex items-center mb-2"><Type className="w-4 h-4 mr-2 text-primary" />Police du CV</Label>
            <Select value={selectedFont} onValueChange={onFontChange}>
              <SelectTrigger id="font-selector" className="w-full bg-input border-border text-foreground"><SelectValue placeholder="Choisir une police" /></SelectTrigger>
              <SelectContent className="bg-popover border-border text-popover-foreground">
                {fonts.map((font) => <SelectItem key={font.id} value={font.id} className={`font-${font.id.toLowerCase()} hover:!bg-primary/20 focus:!bg-primary/30`}>{font.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="flex items-center mb-2"><PaletteIcon className="w-4 h-4 mr-2 text-primary" />Couleurs Personnalisées (Thème Custom)</Label>
            <p className="text-xs text-muted-foreground mb-3">Ces couleurs s'appliquent lorsque le thème "Custom" est sélectionné.</p>
            <div className="grid grid-cols-2 gap-4">
              {colorOptions.map(opt => {
                const currentColor = customColors[opt.key] || (isDarkMode ? opt.defaultDark : opt.defaultLight);
                return (
                  <div key={opt.key}>
                    <Label className="text-sm mb-1 block">{opt.name}</Label>
                    <div className="flex items-center space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal bg-input border-border text-foreground hover:bg-accent">
                            <div className="w-5 h-5 rounded-sm border border-border mr-2" style={{ backgroundColor: currentColor }} />
                            {currentColor}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-border bg-popover" align="start">
                          <HexColorPicker color={currentColor} onChange={(color) => handleColorChange(opt.key, color)} />
                        </PopoverContent>
                      </Popover>
                      <Button variant="ghost" size="icon" onClick={() => resetColor(opt.key, (isDarkMode ? opt.defaultDark : opt.defaultLight))} className="text-muted-foreground hover:text-foreground">
                          <Droplet className="w-4 h-4"/>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button onClick={onClose} className="bg-primary text-primary-foreground hover:bg-primary/90">Fermer</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;
