import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ReferencesForm = ({ data, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <div className="space-y-4">
      {(data || []).map((ref, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white/5 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm text-indigo-400 font-medium">Référence #{index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input value={ref.name || ''} onChange={(e) => onItemChange(index, 'name', e.target.value)} placeholder="Nom du référent" className="bg-white/10 border-white/20 text-white" />
            <Input value={ref.company || ''} onChange={(e) => onItemChange(index, 'company', e.target.value)} placeholder="Entreprise" className="bg-white/10 border-white/20 text-white" />
            <Input value={ref.position || ''} onChange={(e) => onItemChange(index, 'position', e.target.value)} placeholder="Poste du référent" className="bg-white/10 border-white/20 text-white" />
            <Input type="email" value={ref.email || ''} onChange={(e) => onItemChange(index, 'email', e.target.value)} placeholder="Email du référent" className="bg-white/10 border-white/20 text-white" />
            <Input value={ref.phone || ''} onChange={(e) => onItemChange(index, 'phone', e.target.value)} placeholder="Téléphone du référent" className="bg-white/10 border-white/20 text-white" />
          </div>
        </motion.div>
      ))}
      <Button onClick={onAddItem} variant="outline" className="w-full border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10">
        <Plus className="w-4 h-4 mr-2" /> Ajouter une référence
      </Button>
    </div>
  );
};

export default ReferencesForm;