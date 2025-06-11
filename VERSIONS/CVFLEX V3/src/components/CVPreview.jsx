import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Link as LinkIcon, Linkedin, Github, FolderKanban, Award, Users, Heart, Briefcase, GraduationCap, Globe as GlobeIcon, Code } from 'lucide-react';

const CVPreview = ({ data, theme, font, customColors }) => {
  const defaultFuturisticColors = { accent: '#8B5CF6', background: '#111827', card: '#1F2937', text: '#FFFFFF', subtext: '#D1D5DB', border: '#4B5563', skillBarGradientFrom: '#8B5CF6', skillBarGradientTo: '#3B82F6' };
  const defaultModernColors = { accent: '#60A5FA', background: '#1E3A8A', card: '#1E40AF', text: '#FFFFFF', subtext: '#D1D5DB', border: '#3B82F6', skillBarGradientFrom: '#60A5FA', skillBarGradientTo: '#3B82F6' };
  const defaultMinimalColors = { accent: '#9CA3AF', background: '#1F2937', card: '#374151', text: '#FFFFFF', subtext: '#D1D5DB', border: '#6B7280', skillBarGradientFrom: '#9CA3AF', skillBarGradientTo: '#6B7280' };

  let currentStyles = {};

  if (theme === 'custom') {
    currentStyles = {
      bgStyle: { backgroundColor: customColors.background || defaultFuturisticColors.background },
      textStyle: { color: customColors.text || defaultFuturisticColors.text },
      accentTextStyle: { color: customColors.accent || defaultFuturisticColors.accent },
      subtextStyle: { color: customColors.text ? `${customColors.text}B3` : defaultFuturisticColors.subtext }, // B3 for 70% opacity
      cardStyle: { backgroundColor: customColors.card || defaultFuturisticColors.card, borderColor: customColors.accent ? `${customColors.accent}4D` : defaultFuturisticColors.border }, // 4D for 30% opacity
      borderStyle: { borderColor: customColors.accent ? `${customColors.accent}4D` : defaultFuturisticColors.border },
      tagStyle: { backgroundColor: customColors.card || defaultFuturisticColors.card, color: customColors.text ? `${customColors.text}CC` : defaultFuturisticColors.text }, // CC for 80%
      skillBarBaseStyle: { backgroundColor: customColors.accent ? `${customColors.accent}1A` : defaultFuturisticColors.border }, // 1A for 10%
      skillBarProgressStyle: { backgroundImage: `linear-gradient(to right, ${customColors.accent || defaultFuturisticColors.skillBarGradientFrom}, ${customColors.accent ? `${customColors.accent}B3` : defaultFuturisticColors.skillBarGradientTo})` },
      linkHoverStyle: { color: customColors.accent || defaultFuturisticColors.accent }
    };
  } else {
    const themeDefaults = theme === 'modern' ? defaultModernColors : (theme === 'minimal' ? defaultMinimalColors : defaultFuturisticColors);
    currentStyles = {
      bgClass: theme === 'futuristic' ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : (theme === 'modern' ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'),
      textClass: 'text-white', // Assuming default text is white for predefined themes
      accentTextClass: theme === 'futuristic' ? 'text-purple-400' : (theme === 'modern' ? 'text-blue-400' : 'text-gray-300'),
      subtextClass: theme === 'futuristic' ? 'text-gray-300' : (theme === 'modern' ? 'text-gray-300' : 'text-gray-400'),
      cardClass: 'bg-white/5 backdrop-blur-sm border border-white/10',
      borderClass: theme === 'futuristic' ? 'border-purple-500/30' : (theme === 'modern' ? 'border-blue-500/30' : 'border-gray-500/30'),
      tagClass: 'bg-white/10 text-gray-300',
      skillBarBaseClass: 'bg-white/10',
      skillBarProgressClass: theme === 'futuristic' ? 'from-purple-500 to-blue-500' : (theme === 'modern' ? 'from-blue-500 to-indigo-500' : 'from-gray-500 to-gray-400'),
      linkHoverClass: theme === 'futuristic' ? 'hover:text-purple-400' : (theme === 'modern' ? 'hover:text-blue-400' : 'hover:text-gray-200'),
      // inline styles for defaults to ensure consistency where classes might not be enough
      bgStyle: {}, textStyle: {}, accentTextStyle: {}, subtextStyle: {}, cardStyle: {}, borderStyle: {}, tagStyle: {}, skillBarBaseStyle: {}, skillBarProgressStyle: {}, linkHoverStyle: {}
    };
  }


  const fontClass = `font-${font.toLowerCase()}`;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  const renderSkillLevel = (level) => (
    <div className="flex items-center space-x-2">
      <div className={`flex-1 rounded-full h-2 ${theme !== 'custom' ? currentStyles.skillBarBaseClass : ''}`} style={currentStyles.skillBarBaseStyle}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full rounded-full ${theme !== 'custom' ? `bg-gradient-to-r ${currentStyles.skillBarProgressClass}` : ''}`}
          style={currentStyles.skillBarProgressStyle}
        />
      </div>
      <span className={`text-xs ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}>{level}%</span>
    </div>
  );

  const Section = ({ title, icon: IconComponent, children, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-lg p-6 ${theme !== 'custom' ? currentStyles.cardClass : ''}`}
      style={currentStyles.cardStyle}
    >
      <h2 className={`text-xl font-semibold mb-4 ${theme !== 'custom' ? currentStyles.accentTextClass : ''}`} style={currentStyles.accentTextStyle}>
        <div className="flex items-center">
          {IconComponent && <IconComponent className={`w-5 h-5 mr-2 ${theme !== 'custom' ? currentStyles.accentTextClass : ''}`} style={currentStyles.accentTextStyle} />}
          {title}
        </div>
      </h2>
      {children}
    </motion.div>
  );

  const Item = ({ title, subtitle, date, description, children }) => (
    <div className={`border-l-2 pl-4 mb-4 ${theme !== 'custom' ? currentStyles.borderClass : ''}`} style={currentStyles.borderStyle}>
      {title && <h3 className={`font-semibold ${theme !== 'custom' ? currentStyles.textClass : ''}`} style={currentStyles.textStyle}>{title}</h3>}
      {subtitle && <p className={`font-medium ${theme !== 'custom' ? currentStyles.accentTextClass : ''}`} style={currentStyles.accentTextStyle}>{subtitle}</p>}
      {date && (
        <div className={`flex items-center space-x-1 text-sm mb-2 ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}>
          <Calendar className="w-3 h-3" />
          <span>{date}</span>
        </div>
      )}
      {description && <p className={`text-sm leading-relaxed ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}>{description}</p>}
      {children}
    </div>
  );

  return (
    <div id="cv-preview" className={`cv-preview ${fontClass} p-8 rounded-lg min-h-[297mm] w-[210mm] ${theme !== 'custom' ? `${currentStyles.bgClass} ${currentStyles.textClass}` : ''}`} style={{...currentStyles.bgStyle, ...currentStyles.textStyle}}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 flex items-center">
        {data.personalInfo.profilePicture && (
          <div className="mr-6">
            <img src={data.personalInfo.profilePicture} alt="Photo de profil" className={`w-24 h-24 rounded-full object-cover border-2 ${theme !== 'custom' ? currentStyles.borderClass : ''}`} style={currentStyles.borderStyle}/>
          </div>
        )}
        <div className="text-left flex-1">
          <h1 className="text-4xl font-bold mb-1" style={currentStyles.textStyle}>{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
          {data.personalInfo.title && <p className={`text-xl mb-3 ${theme !== 'custom' ? currentStyles.accentTextClass : ''}`} style={currentStyles.accentTextStyle}>{data.personalInfo.title}</p>}
          <div className={`flex flex-wrap gap-x-4 gap-y-1 text-sm ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}>
            {data.personalInfo.email && <div className="flex items-center space-x-1"><Mail className="w-4 h-4" /><span>{data.personalInfo.email}</span></div>}
            {data.personalInfo.phone && <div className="flex items-center space-x-1"><Phone className="w-4 h-4" /><span>{data.personalInfo.phone}</span></div>}
            {data.personalInfo.address && <div className="flex items-center space-x-1"><MapPin className="w-4 h-4" /><span>{data.personalInfo.address}</span></div>}
          </div>
          <div className={`flex flex-wrap gap-x-4 gap-y-1 text-sm mt-2 ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}>
            {data.personalInfo.portfolio && <a href={data.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-1 ${theme !== 'custom' ? currentStyles.linkHoverClass : ''}`} style={theme === 'custom' ? {color: currentStyles.linkHoverStyle.color} : {}}><LinkIcon className="w-4 h-4" /><span>Portfolio</span></a>}
            {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-1 ${theme !== 'custom' ? currentStyles.linkHoverClass : ''}`} style={theme === 'custom' ? {color: currentStyles.linkHoverStyle.color} : {}}><Linkedin className="w-4 h-4" /><span>LinkedIn</span></a>}
            {data.personalInfo.github && <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-1 ${theme !== 'custom' ? currentStyles.linkHoverClass : ''}`} style={theme === 'custom' ? {color: currentStyles.linkHoverStyle.color} : {}}><Github className="w-4 h-4" /><span>GitHub</span></a>}
          </div>
        </div>
      </motion.div>

      {data.personalInfo.summary && (
        <Section title="Profil Professionnel" delay={0.1}>
          <p className={`text-sm leading-relaxed ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}>{data.personalInfo.summary}</p>
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
                    {proj.technologies && <p className={`text-sm italic ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}>Technologies: {proj.technologies}</p>}
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-1 hover:underline text-sm ${theme !== 'custom' ? currentStyles.accentTextClass : ''}`} style={currentStyles.accentTextStyle}><LinkIcon className="w-3 h-3" /><span>Voir le projet</span></a>}
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
                      <span className={`text-sm font-medium ${theme !== 'custom' ? currentStyles.textClass : ''}`} style={currentStyles.textStyle}>{skill.name}</span>
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
                    <span className={`${theme !== 'custom' ? currentStyles.textClass : ''}`} style={currentStyles.textStyle}>{lang.name}</span>
                    <span className={`text-sm ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}>{lang.level}</span>
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
                    {ref.email && <p className={`text-sm flex items-center ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}><Mail className="w-3 h-3 mr-1"/> {ref.email}</p>}
                    {ref.phone && <p className={`text-sm flex items-center ${theme !== 'custom' ? currentStyles.subtextClass : ''}`} style={currentStyles.subtextStyle}><Phone className="w-3 h-3 mr-1"/> {ref.phone}</p>}
                  </Item>
                ))}
              </div>
            </Section>
          )}
          {data.hobbies.length > 0 && (
            <Section title="Centres d'intérêt" icon={Heart} delay={0.9}>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.map((hobby, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-sm ${theme !== 'custom' ? currentStyles.tagClass : ''}`} style={currentStyles.tagStyle}>{hobby.name}</span>
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