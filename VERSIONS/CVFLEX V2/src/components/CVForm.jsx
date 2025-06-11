import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Trash2, User, Briefcase, GraduationCap, Code, Globe, Heart, FolderKanban, Award, Users, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PersonalInfoForm from '@/components/formSections/PersonalInfoForm';
import ExperienceForm from '@/components/formSections/ExperienceForm';
import EducationForm from '@/components/formSections/EducationForm';
import SkillsForm from '@/components/formSections/SkillsForm';
import LanguagesForm from '@/components/formSections/LanguagesForm';
import HobbiesForm from '@/components/formSections/HobbiesForm';
import ProjectsForm from '@/components/formSections/ProjectsForm';
import CertificationsForm from '@/components/formSections/CertificationsForm';
import ReferencesForm from '@/components/formSections/ReferencesForm';

const CVForm = ({ data, onChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    experience: false,
    education: false,
    skills: false,
    languages: false,
    projects: false,
    certifications: false,
    references: false,
    hobbies: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = (section, field, value, index) => {
    if (index === undefined) { // For personalInfo or other non-array sections
      onChange({ ...data, [section]: { ...data[section], [field]: value } });
    } else { // For array sections
      const updatedItems = data[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      onChange({ ...data, [section]: updatedItems });
    }
  };
  
  const addItem = (section) => {
    let newItem = {};
    switch (section) {
      case 'experience': newItem = { company: '', position: '', startDate: '', endDate: '', description: '' }; break;
      case 'education': newItem = { institution: '', degree: '', startDate: '', endDate: '', description: '' }; break;
      case 'skills': newItem = { name: '', level: 50 }; break;
      case 'languages': newItem = { name: '', level: 'Débutant' }; break;
      case 'projects': newItem = { name: '', description: '', technologies: '', link: '' }; break;
      case 'certifications': newItem = { name: '', authority: '', date: '' }; break;
      case 'references': newItem = { name: '', company: '', position: '', email: '', phone: '' }; break;
      case 'hobbies': newItem = { name: '' }; break;
      default: break;
    }
    onChange({ ...data, [section]: [...(data[section] || []), newItem] });
  };

  const removeItem = (section, index) => {
    onChange({ ...data, [section]: data[section].filter((_, i) => i !== index) });
  };

  const sectionComponents = {
    personal: { title: 'Informations Personnelles', icon: User, component: PersonalInfoForm },
    experience: { title: 'Expérience Professionnelle', icon: Briefcase, component: ExperienceForm },
    education: { title: 'Formation', icon: GraduationCap, component: EducationForm },
    skills: { title: 'Compétences', icon: Code, component: SkillsForm },
    languages: { title: 'Langues', icon: Globe, component: LanguagesForm },
    projects: { title: 'Projets', icon: FolderKanban, component: ProjectsForm },
    certifications: { title: 'Certifications', icon: Award, component: CertificationsForm },
    references: { title: 'Références', icon: Users, component: ReferencesForm },
    hobbies: { title: 'Centres d\'intérêt', icon: Heart, component: HobbiesForm },
  };

  const renderSection = (sectionKey) => {
    const { title, icon: Icon, component: FormComponent } = sectionComponents[sectionKey];
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
          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </motion.button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-4 space-y-4">
            <FormComponent
              data={sectionKey === 'personal' ? data.personalInfo : data[sectionKey]}
              onChange={(field, value, index) => updateField(sectionKey === 'personal' ? 'personalInfo' : sectionKey, field, value, index)}
              onItemChange={(index, field, value) => updateField(sectionKey, field, value, index)}
              onAddItem={() => addItem(sectionKey)}
              onRemoveItem={(index) => removeItem(sectionKey, index)}
              sectionKey={sectionKey}
            />
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {Object.keys(sectionComponents).map(sectionKey => renderSection(sectionKey))}
    </div>
  );
};

export default CVForm;