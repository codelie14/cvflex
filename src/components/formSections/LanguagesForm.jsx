import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguagesForm = ({ data, onItemChange, onAddItem, onRemoveItem }) => {
  const levels = ["Débutant", "Intermédiaire", "Avancé", "Courant", "Natif"];
  return (
    <div className="space-y-4">
      {(data || []).map((lang, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white/5 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm text-yellow-400 font-medium">Langue #{index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input value={lang.name || ''} onChange={(e) => onItemChange(index, 'name', e.target.value)} placeholder="Nom de la langue" className="bg-white/10 border-white/20 text-white" />
            <Select value={lang.level || 'Débutant'} onValueChange={(value) => onItemChange(index, 'level', value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {levels.map(level => <SelectItem key={level} value={level} className="hover:bg-purple-500/20 focus:bg-purple-500/30">{level}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      ))}
      <Button onClick={onAddItem} variant="outline" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
        <Plus className="w-4 h-4 mr-2" /> Ajouter une langue
      </Button>
    </div>
  );
};

export default LanguagesForm;