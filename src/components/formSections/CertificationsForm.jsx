import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CertificationsForm = ({ data, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <div className="space-y-4">
      {(data || []).map((cert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white/5 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm text-cyan-400 font-medium">Certification #{index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input value={cert.name || ''} onChange={(e) => onItemChange(index, 'name', e.target.value)} placeholder="Nom de la certification" className="bg-white/10 border-white/20 text-white" />
          <Input value={cert.authority || ''} onChange={(e) => onItemChange(index, 'authority', e.target.value)} placeholder="Organisme de certification" className="bg-white/10 border-white/20 text-white" />
          <Input type="date" value={cert.date || ''} onChange={(e) => onItemChange(index, 'date', e.target.value)} className="bg-white/10 border-white/20 text-white" />
        </motion.div>
      ))}
      <Button onClick={onAddItem} variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
        <Plus className="w-4 h-4 mr-2" /> Ajouter une certification
      </Button>
    </div>
  );
};

export default CertificationsForm;