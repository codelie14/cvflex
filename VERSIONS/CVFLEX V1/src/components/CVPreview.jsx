
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';

const CVPreview = ({ data, theme }) => {
  const themes = {
    futuristic: {
      bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
      accent: 'text-purple-400',
      border: 'border-purple-500/30',
      card: 'bg-white/5 backdrop-blur-sm border border-white/10'
    },
    modern: {
      bg: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900',
      accent: 'text-blue-400',
      border: 'border-blue-500/30',
      card: 'bg-white/5 backdrop-blur-sm border border-white/10'
    },
    minimal: {
      bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      accent: 'text-gray-300',
      border: 'border-gray-500/30',
      card: 'bg-white/5 backdrop-blur-sm border border-white/10'
    }
  };

  const currentTheme = themes[theme] || themes.futuristic;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  const renderSkillLevel = (level) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-white/10 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          />
        </div>
        <span className="text-xs text-gray-400">{level}%</span>
      </div>
    );
  };

  return (
    <div id="cv-preview" className={`cv-preview ${currentTheme.bg} text-white p-8 rounded-lg min-h-[297mm] w-[210mm]`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        {data.personalInfo.title && (
          <p className={`text-xl ${currentTheme.accent} mb-4`}>
            {data.personalInfo.title}
          </p>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          {data.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${currentTheme.card} rounded-lg p-6 mb-6`}
        >
          <h2 className={`text-xl font-semibold ${currentTheme.accent} mb-3`}>
            Profil Professionnel
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {data.personalInfo.summary}
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience */}
          {data.experience.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${currentTheme.card} rounded-lg p-6`}
            >
              <h2 className={`text-xl font-semibold ${currentTheme.accent} mb-4`}>
                Expérience Professionnelle
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-purple-500/30 pl-4">
                    <h3 className="font-semibold text-white">{exp.position}</h3>
                    <p className={`${currentTheme.accent} font-medium`}>{exp.company}</p>
                    {(exp.startDate || exp.endDate) && (
                      <div className="flex items-center space-x-1 text-sm text-gray-400 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}
                        </span>
                      </div>
                    )}
                    {exp.description && (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`${currentTheme.card} rounded-lg p-6`}
            >
              <h2 className={`text-xl font-semibold ${currentTheme.accent} mb-4`}>
                Formation
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                    <p className={`${currentTheme.accent} font-medium`}>{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <div className="flex items-center space-x-1 text-sm text-gray-400 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                        </span>
                      </div>
                    )}
                    {edu.description && (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${currentTheme.card} rounded-lg p-6`}
            >
              <h2 className={`text-xl font-semibold ${currentTheme.accent} mb-4`}>
                Compétences
              </h2>
              <div className="space-y-3">
                {data.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white text-sm font-medium">{skill.name}</span>
                    </div>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`${currentTheme.card} rounded-lg p-6`}
            >
              <h2 className={`text-xl font-semibold ${currentTheme.accent} mb-4`}>
                Langues
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white">{lang.name}</span>
                    <span className="text-gray-400 text-sm">{lang.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`${currentTheme.card} rounded-lg p-6`}
            >
              <h2 className={`text-xl font-semibold ${currentTheme.accent} mb-4`}>
                Centres d'intérêt
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                  >
                    {hobby.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
