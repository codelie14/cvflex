import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const EducationForm = ({ data, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <div className="space-y-4">
      {(data || []).map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white/5 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm text-blue-400 font-medium">Formation #{index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input value={edu.institution || ''} onChange={(e) => onItemChange(index, 'institution', e.target.value)} placeholder="Nom de l'établissement" className="bg-white/10 border-white/20 text-white" />
            <Input value={edu.degree || ''} onChange={(e) => onItemChange(index, 'degree', e.target.value)} placeholder="Diplôme obtenu" className="bg-white/10 border-white/20 text-white" />
            <Input type="date" value={edu.startDate || ''} onChange={(e) => onItemChange(index, 'startDate', e.target.value)} className="bg-white/10 border-white/20 text-white" />
            <Input type="date" value={edu.endDate || ''} onChange={(e) => onItemChange(index, 'endDate', e.target.value)} className="bg-white/10 border-white/20 text-white" />
          </div>
          <Textarea value={edu.description || ''} onChange={(e) => onItemChange(index, 'description', e.target.value)} placeholder="Description de la formation..." className="bg-white/10 border-white/20 text-white" />
        </motion.div>
      ))}
      <Button onClick={onAddItem} variant="outline" className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
        <Plus className="w-4 h-4 mr-2" /> Ajouter une formation
      </Button>
    </div>
  );
};

export default EducationForm;