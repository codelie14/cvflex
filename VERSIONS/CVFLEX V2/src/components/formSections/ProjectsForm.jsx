import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ProjectsForm = ({ data, onItemChange, onAddItem, onRemoveItem }) => {
  return (
    <div className="space-y-4">
      {(data || []).map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white/5 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm text-teal-400 font-medium">Projet #{index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input value={project.name || ''} onChange={(e) => onItemChange(index, 'name', e.target.value)} placeholder="Nom du projet" className="bg-white/10 border-white/20 text-white" />
          <Textarea value={project.description || ''} onChange={(e) => onItemChange(index, 'description', e.target.value)} placeholder="Description du projet" className="bg-white/10 border-white/20 text-white" />
          <Input value={project.technologies || ''} onChange={(e) => onItemChange(index, 'technologies', e.target.value)} placeholder="Technologies utilisées (ex: React, Node.js)" className="bg-white/10 border-white/20 text-white" />
          <Input value={project.link || ''} onChange={(e) => onItemChange(index, 'link', e.target.value)} placeholder="Lien vers le projet (URL)" className="bg-white/10 border-white/20 text-white" />
        </motion.div>
      ))}
      <Button onClick={onAddItem} variant="outline" className="w-full border-teal-500/50 text-teal-400 hover:bg-teal-500/10">
        <Plus className="w-4 h-4 mr-2" /> Ajouter un projet
      </Button>
    </div>
  );
};

export default ProjectsForm;