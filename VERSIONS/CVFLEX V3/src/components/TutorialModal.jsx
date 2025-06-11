
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, FileText, Download, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TutorialModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Sparkles,
      title: 'Bienvenue sur CVFLEX !',
      content: 'Créez des CV modernes et animés en quelques clics. Ce guide vous accompagnera dans vos premiers pas.',
      image: '🚀'
    },
    {
      icon: FileText,
      title: 'Remplissez vos informations',
      content: 'Utilisez le formulaire à gauche pour saisir vos informations personnelles, expériences, formations et compétences. Chaque section est repliable pour une navigation facile.',
      image: '📝'
    },
    {
      icon: FileText,
      title: 'Aperçu en temps réel',
      content: 'Votre CV se met à jour automatiquement dans l\'aperçu à droite. Voyez immédiatement le résultat de vos modifications !',
      image: '👀'
    },
    {
      icon: Palette,
      title: 'Personnalisez le style',
      content: 'Cliquez sur l\'icône palette pour choisir parmi différents thèmes : Futuriste, Moderne ou Minimaliste.',
      image: '🎨'
    },
    {
      icon: Download,
      title: 'Exportez votre CV',
      content: 'Une fois satisfait, cliquez sur "Exporter" pour télécharger votre CV en PDF ou PNG. Vos données sont sauvegardées automatiquement !',
      image: '💾'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-effect rounded-2xl p-8 max-w-lg w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-purple-400">
              Étape {currentStep + 1} sur {steps.length}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">{currentStepData.image}</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {currentStepData.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {currentStepData.content}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              Commencer !
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TutorialModal;
