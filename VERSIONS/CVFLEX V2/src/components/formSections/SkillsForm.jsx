import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';


const SkillsForm = ({ data, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <div className="space-y-4">
      {(data || []).map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white/5 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm text-green-400 font-medium">Compétence #{index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <Input value={skill.name || ''} onChange={(e) => onItemChange(index, 'name', e.target.value)} placeholder="Nom de la compétence" className="bg-white/10 border-white/20 text-white" />
            <div>
              <Label className="text-white text-sm">Niveau: {skill.level || 0}%</Label>
              <Slider
                value={[skill.level || 0]}
                onValueChange={(value) => onItemChange(index, 'level', value[0])}
                max={100}
                step={1}
                className="w-full mt-2 accent-purple-500 [&>span:first-child]:h-2 [&>span:first-child]:bg-white/10 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-purple-500 [&>span:first-child>span]:to-blue-500"
              />
            </div>
          </div>
        </motion.div>
      ))}
      <Button onClick={onAddItem} variant="outline" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10">
        <Plus className="w-4 h-4 mr-2" /> Ajouter une compétence
      </Button>
    </div>
  );
};

export default SkillsForm;