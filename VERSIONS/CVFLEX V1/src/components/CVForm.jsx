
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Trash2, User, Briefcase, GraduationCap, Code, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const CVForm = ({ data, onChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    experience: false,
    education: false,
    skills: false,
    languages: false,
    hobbies: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updatePersonalInfo = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const addItem = (section) => {
    const newItem = section === 'experience' 
      ? { company: '', position: '', startDate: '', endDate: '', description: '' }
      : section === 'education'
      ? { institution: '', degree: '', startDate: '', endDate: '', description: '' }
      : section === 'skills'
      ? { name: '', level: 50 }
      : section === 'languages'
      ? { name: '', level: 'Débutant' }
      : { name: '' };

    onChange({
      ...data,
      [section]: [...data[section], newItem]
    });
  };

  const removeItem = (section, index) => {
    onChange({
      ...data,
      [section]: data[section].filter((_, i) => i !== index)
    });
  };

  const updateItem = (section, index, field, value) => {
    const updatedItems = data[section].map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange({
      ...data,
      [section]: updatedItems
    });
  };

  const sectionIcons = {
    personal: User,
    experience: Briefcase,
    education: GraduationCap,
    skills: Code,
    languages: Globe,
    hobbies: Heart
  };

  const renderSection = (sectionKey, title, content) => {
    const Icon = sectionIcons[sectionKey];
    const isExpanded = expandedSections[sectionKey];

    return (
      <motion.div
        key={sectionKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <motion.button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-white">{title}</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </motion.button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-4 space-y-4">
            {content}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Informations Personnelles */}
      {renderSection('personal', 'Informations Personnelles', (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-white">Prénom</Label>
            <Input
              id="firstName"
              value={data.personalInfo.firstName}
              onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Votre prénom"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-white">Nom</Label>
            <Input
              id="lastName"
              value={data.personalInfo.lastName}
              onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white">Téléphone</Label>
            <Input
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="+33 6 12 34 56 78"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address" className="text-white">Adresse</Label>
            <Input
              id="address"
              value={data.personalInfo.address}
              onChange={(e) => updatePersonalInfo('address', e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Votre adresse complète"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="title" className="text-white">Titre professionnel</Label>
            <Input
              id="title"
              value={data.personalInfo.title}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Ex: Développeur Full Stack"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="summary" className="text-white">Résumé professionnel</Label>
            <Textarea
              id="summary"
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              className="bg-white/10 border-white/20 text-white min-h-[100px]"
              placeholder="Décrivez brièvement votre profil professionnel..."
            />
          </div>
        </div>
      ))}

      {/* Expérience Professionnelle */}
      {renderSection('experience', 'Expérience Professionnelle', (
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-white/5 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm text-purple-400 font-medium">Expérience #{index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem('experience', index)}
                  className="text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={exp.company}
                  onChange={(e) => updateItem('experience', index, 'company', e.target.value)}
                  placeholder="Nom de l'entreprise"
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  value={exp.position}
                  onChange={(e) => updateItem('experience', index, 'position', e.target.value)}
                  placeholder="Poste occupé"
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => updateItem('experience', index, 'startDate', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => updateItem('experience', index, 'endDate', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <Textarea
                value={exp.description}
                onChange={(e) => updateItem('experience', index, 'description', e.target.value)}
                placeholder="Description des missions et réalisations..."
                className="bg-white/10 border-white/20 text-white"
              />
            </motion.div>
          ))}
          
          <Button
            onClick={() => addItem('experience')}
            variant="outline"
            className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une expérience
          </Button>
        </div>
      ))}

      {/* Formation */}
      {renderSection('education', 'Formation', (
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-white/5 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm text-blue-400 font-medium">Formation #{index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem('education', index)}
                  className="text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={edu.institution}
                  onChange={(e) => updateItem('education', index, 'institution', e.target.value)}
                  placeholder="Nom de l'établissement"
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  value={edu.degree}
                  onChange={(e) => updateItem('education', index, 'degree', e.target.value)}
                  placeholder="Diplôme obtenu"
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => updateItem('education', index, 'startDate', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => updateItem('education', index, 'endDate', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <Textarea
                value={edu.description}
                onChange={(e) => updateItem('education', index, 'description', e.target.value)}
                placeholder="Description de la formation..."
                className="bg-white/10 border-white/20 text-white"
              />
            </motion.div>
          ))}
          
          <Button
            onClick={() => addItem('education')}
            variant="outline"
            className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une formation
          </Button>
        </div>
      ))}

      {/* Compétences */}
      {renderSection('skills', 'Compétences', (
        <div className="space-y-4">
          {data.skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-white/5 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm text-green-400 font-medium">Compétence #{index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem('skills', index)}
                  className="text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <Input
                  value={skill.name}
                  onChange={(e) => updateItem('skills', index, 'name', e.target.value)}
                  placeholder="Nom de la compétence"
                  className="bg-white/10 border-white/20 text-white"
                />
                <div>
                  <Label className="text-white text-sm">Niveau: {skill.level}%</Label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => updateItem('skills', index, 'level', parseInt(e.target.value))}
                    className="w-full mt-2 accent-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
          
          <Button
            onClick={() => addItem('skills')}
            variant="outline"
            className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une compétence
          </Button>
        </div>
      ))}

      {/* Langues */}
      {renderSection('languages', 'Langues', (
        <div className="space-y-4">
          {data.languages.map((lang, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-white/5 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm text-yellow-400 font-medium">Langue #{index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem('languages', index)}
                  className="text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={lang.name}
                  onChange={(e) => updateItem('languages', index, 'name', e.target.value)}
                  placeholder="Nom de la langue"
                  className="bg-white/10 border-white/20 text-white"
                />
                <select
                  value={lang.level}
                  onChange={(e) => updateItem('languages', index, 'level', e.target.value)}
                  className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Courant">Courant</option>
                  <option value="Natif">Natif</option>
                </select>
              </div>
            </motion.div>
          ))}
          
          <Button
            onClick={() => addItem('languages')}
            variant="outline"
            className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une langue
          </Button>
        </div>
      ))}

      {/* Centres d'intérêt */}
      {renderSection('hobbies', 'Centres d\'intérêt', (
        <div className="space-y-4">
          {data.hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-white/5 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm text-pink-400 font-medium">Centre d'intérêt #{index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem('hobbies', index)}
                  className="text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <Input
                value={hobby.name}
                onChange={(e) => updateItem('hobbies', index, 'name', e.target.value)}
                placeholder="Centre d'intérêt"
                className="bg-white/10 border-white/20 text-white"
              />
            </motion.div>
          ))}
          
          <Button
            onClick={() => addItem('hobbies')}
            variant="outline"
            className="w-full border-pink-500/50 text-pink-400 hover:bg-pink-500/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un centre d'intérêt
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CVForm;
