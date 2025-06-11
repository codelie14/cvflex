import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Star, Link as LinkIcon, Linkedin, Github, FolderKanban, Award, Users, Heart, Image as ImageIcon, Briefcase, GraduationCap, Globe as GlobeIcon, Code } from 'lucide-react';

const CVPreview = ({ data, theme, font }) => {
  const themes = {
    futuristic: {
      bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
      accent: 'text-purple-400',
      border: 'border-purple-500/30',
      card: 'bg-white/5 backdrop-blur-sm border border-white/10',
      text: 'text-white',
      subtext: 'text-gray-300',
      sectionTitle: 'text-xl font-semibold text-purple-400 mb-4',
      itemTitle: 'font-semibold text-white',
      itemSubtitle: 'text-purple-400 font-medium',
      itemDate: 'text-sm text-gray-400 mb-2',
      itemDescription: 'text-gray-300 text-sm leading-relaxed',
      tag: 'bg-white/10 text-gray-300',
    },
    modern: {
      bg: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900',
      accent: 'text-blue-400',
      border: 'border-blue-500/30',
      card: 'bg-white/5 backdrop-blur-sm border border-white/10',
      text: 'text-white',
      subtext: 'text-gray-300',
      sectionTitle: 'text-xl font-semibold text-blue-400 mb-4',
      itemTitle: 'font-semibold text-white',
      itemSubtitle: 'text-blue-400 font-medium',
      itemDate: 'text-sm text-gray-400 mb-2',
      itemDescription: 'text-gray-300 text-sm leading-relaxed',
      tag: 'bg-white/10 text-gray-300',
    },
    minimal: {
      bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      accent: 'text-gray-300',
      border: 'border-gray-500/30',
      card: 'bg-white/5 backdrop-blur-sm border border-white/10',
      text: 'text-white',
      subtext: 'text-gray-400',
      sectionTitle: 'text-xl font-semibold text-gray-300 mb-4',
      itemTitle: 'font-semibold text-white',
      itemSubtitle: 'text-gray-300 font-medium',
      itemDate: 'text-sm text-gray-500 mb-2',
      itemDescription: 'text-gray-400 text-sm leading-relaxed',
      tag: 'bg-white/10 text-gray-400',
    }
  };

  const currentTheme = themes[theme] || themes.futuristic;
  const fontClass = `font-${font.toLowerCase()}`;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  const renderSkillLevel = (level) => (
    <div className="flex items-center space-x-2">
      <div className="flex-1 bg-white/10 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full bg-gradient-to-r ${theme === 'modern' ? 'from-blue-500 to-indigo-500' : 'from-purple-500 to-blue-500'} rounded-full`}
        />
      </div>
      <span className={`text-xs ${currentTheme.subtext}`}>{level}%</span>
    </div>
  );

  const Section = ({ title, icon: IconComponent, children, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`${currentTheme.card} rounded-lg p-6`}
    >
      <h2 className={currentTheme.sectionTitle}>
        <div className="flex items-center">
          {IconComponent && <IconComponent className={`w-5 h-5 mr-2 ${currentTheme.accent}`} />}
          {title}
        </div>
      </h2>
      {children}
    </motion.div>
  );

  const Item = ({ title, subtitle, date, description, children }) => (
    <div className={`border-l-2 ${currentTheme.border} pl-4 mb-4`}>
      {title && <h3 className={currentTheme.itemTitle}>{title}</h3>}
      {subtitle && <p className={currentTheme.itemSubtitle}>{subtitle}</p>}
      {date && (
        <div className={`flex items-center space-x-1 ${currentTheme.itemDate}`}>
          <Calendar className="w-3 h-3" />
          <span>{date}</span>
        </div>
      )}
      {description && <p className={currentTheme.itemDescription}>{description}</p>}
      {children}
    </div>
  );

  return (
    <div id="cv-preview" className={`cv-preview ${currentTheme.bg} ${currentTheme.text} ${fontClass} p-8 rounded-lg min-h-[297mm] w-[210mm]`}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 flex items-center">
        {data.personalInfo.profilePicture && (
          <div className="mr-6">
            <img src={data.personalInfo.profilePicture} alt="Photo de profil" className="w-24 h-24 rounded-full object-cover border-2 border-purple-500/50" />
          </div>
        )}
        <div className="text-left flex-1">
          <h1 className="text-4xl font-bold mb-1">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
          {data.personalInfo.title && <p className={`text-xl ${currentTheme.accent} mb-3`}>{data.personalInfo.title}</p>}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-300">
            {data.personalInfo.email && <div className="flex items-center space-x-1"><Mail className="w-4 h-4" /><span>{data.personalInfo.email}</span></div>}
            {data.personalInfo.phone && <div className="flex items-center space-x-1"><Phone className="w-4 h-4" /><span>{data.personalInfo.phone}</span></div>}
            {data.personalInfo.address && <div className="flex items-center space-x-1"><MapPin className="w-4 h-4" /><span>{data.personalInfo.address}</span></div>}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-300 mt-2">
            {data.personalInfo.portfolio && <a href={data.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-purple-400"><LinkIcon className="w-4 h-4" /><span>Portfolio</span></a>}
            {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-purple-400"><Linkedin className="w-4 h-4" /><span>LinkedIn</span></a>}
            {data.personalInfo.github && <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-purple-400"><Github className="w-4 h-4" /><span>GitHub</span></a>}
          </div>
        </div>
      </motion.div>

      {data.personalInfo.summary && (
        <Section title="Profil Professionnel" delay={0.1}>
          <p className={currentTheme.itemDescription}>{data.personalInfo.summary}</p>
        </Section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {data.experience.length > 0 && (
            <Section title="Expérience Professionnelle" icon={Briefcase} delay={0.2}>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <Item key={index} title={exp.position} subtitle={exp.company} date={`${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Présent'}`} description={exp.description} />
                ))}
              </div>
            </Section>
          )}
          {data.projects.length > 0 && (
            <Section title="Projets" icon={FolderKanban} delay={0.3}>
              <div className="space-y-4">
                {data.projects.map((proj, index) => (
                  <Item key={index} title={proj.name} description={proj.description}>
                    {proj.technologies && <p className={`${currentTheme.itemDate} italic`}>Technologies: {proj.technologies}</p>}
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-1 ${currentTheme.accent} hover:underline text-sm`}><LinkIcon className="w-3 h-3" /><span>Voir le projet</span></a>}
                  </Item>
                ))}
              </div>
            </Section>
          )}
          {data.education.length > 0 && (
            <Section title="Formation" icon={GraduationCap} delay={0.4}>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <Item key={index} title={edu.degree} subtitle={edu.institution} date={`${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : 'Présent'}`} description={edu.description} />
                ))}
              </div>
            </Section>
          )}
        </div>

        <div className="space-y-6">
          {data.skills.length > 0 && (
            <Section title="Compétences" icon={Code} delay={0.5}>
              <div className="space-y-3">
                {data.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`${currentTheme.text} text-sm font-medium`}>{skill.name}</span>
                    </div>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </Section>
          )}
          {data.certifications.length > 0 && (
            <Section title="Certifications" icon={Award} delay={0.6}>
              <div className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <Item key={index} title={cert.name} subtitle={cert.authority} date={formatDate(cert.date)} />
                ))}
              </div>
            </Section>
          )}
          {data.languages.length > 0 && (
            <Section title="Langues" icon={GlobeIcon} delay={0.7}>
              <div className="space-y-2">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className={currentTheme.text}>{lang.name}</span>
                    <span className={`${currentTheme.subtext} text-sm`}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {data.references.length > 0 && (
            <Section title="Références" icon={Users} delay={0.8}>
              <div className="space-y-3">
                {data.references.map((ref, index) => (
                  <Item key={index} title={ref.name} subtitle={`${ref.position} chez ${ref.company}`}>
                    {ref.email && <p className={`${currentTheme.itemDate} flex items-center`}><Mail className="w-3 h-3 mr-1"/> {ref.email}</p>}
                    {ref.phone && <p className={`${currentTheme.itemDate} flex items-center`}><Phone className="w-3 h-3 mr-1"/> {ref.phone}</p>}
                  </Item>
                ))}
              </div>
            </Section>
          )}
          {data.hobbies.length > 0 && (
            <Section title="Centres d'intérêt" icon={Heart} delay={0.9}>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.map((hobby, index) => (
                  <span key={index} className={`px-3 py-1 ${currentTheme.tag} rounded-full text-sm`}>{hobby.name}</span>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVPreview;