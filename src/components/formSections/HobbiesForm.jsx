import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HobbiesForm = ({ data, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <div className="space-y-4">
      {(data || []).map((hobby, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white/5 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm text-pink-400 font-medium">Centre d'intérêt #{index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input value={hobby.name || ''} onChange={(e) => onItemChange(index, 'name', e.target.value)} placeholder="Centre d'intérêt" className="bg-white/10 border-white/20 text-white" />
        </motion.div>
      ))}
      <Button onClick={onAddItem} variant="outline" className="w-full border-pink-500/50 text-pink-400 hover:bg-pink-500/10">
        <Plus className="w-4 h-4 mr-2" /> Ajouter un centre d'intérêt
      </Button>
    </div>
  );
};

export default HobbiesForm;