import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ExperienceForm = ({ data, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <div className="space-y-4">
      {(data || []).map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white/5 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm text-purple-400 font-medium">Expérience #{index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input value={exp.company || ''} onChange={(e) => onItemChange(index, 'company', e.target.value)} placeholder="Nom de l'entreprise" className="bg-white/10 border-white/20 text-white" />
            <Input value={exp.position || ''} onChange={(e) => onItemChange(index, 'position', e.target.value)} placeholder="Poste occupé" className="bg-white/10 border-white/20 text-white" />
            <Input type="date" value={exp.startDate || ''} onChange={(e) => onItemChange(index, 'startDate', e.target.value)} className="bg-white/10 border-white/20 text-white" />
            <Input type="date" value={exp.endDate || ''} onChange={(e) => onItemChange(index, 'endDate', e.target.value)} className="bg-white/10 border-white/20 text-white" />
          </div>
          <Textarea value={exp.description || ''} onChange={(e) => onItemChange(index, 'description', e.target.value)} placeholder="Description des missions..." className="bg-white/10 border-white/20 text-white" />
        </motion.div>
      ))}
      <Button onClick={onAddItem} variant="outline" className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
        <Plus className="w-4 h-4 mr-2" /> Ajouter une expérience
      </Button>
    </div>
  );
};

export default ExperienceForm;