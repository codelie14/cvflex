import React from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Share2, Facebook, Twitter, Linkedin, FileText as FileTextIcon } from 'lucide-react'; // Renamed to avoid conflict
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ShareModal = ({ cvTitle, onClose }) => {
  const appUrl = window.location.href;
  const shareText = `Découvrez CVFLEX, le générateur de CV moderne et animé ! Créez le vôtre ici : ${appUrl}`;
  const cvShareText = `J'ai créé mon CV "${cvTitle || 'professionnel'}" avec CVFLEX ! Jetez un œil : ${appUrl}`; // Potentially link to a shared CV if that feature is built

  const copyToClipboard = (textToCopy, message) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({ title: "✅ Copié !", description: message, duration: 2000 });
    }).catch(err => {
      toast({ title: "❌ Erreur", description: "Impossible de copier le lien.", variant: "destructive", duration: 2000 });
      console.error('Erreur de copie:', err);
    });
  };
  
  const shareActions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank')
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-sky-500',
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700',
      action: () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(appUrl)}&title=CVFLEX%20-%20Générateur%20de%20CV&summary=${encodeURIComponent(shareText)}`, '_blank')
    },
    {
      name: 'Copier Lien App',
      icon: Copy,
      color: 'text-gray-400',
      action: () => copyToClipboard(appUrl, "Lien de l'application copié !")
    },
    // If a direct CV link feature existed, it would be here. For now, we copy a generic message.
    // {
    //   name: 'Copier Lien CV',
    //   icon: FileTextIcon,
    //   color: 'text-purple-400',
    //   action: () => copyToClipboard(cvShareText, "Message de partage du CV copié !")
    // }
  ];


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-effect rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center"><Share2 className="w-6 h-6 mr-2 text-purple-400" />Partager CVFLEX</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10"><X className="w-5 h-5" /></Button>
        </div>
        <p className="text-gray-300 mb-6 text-sm">Partagez cet outil ou votre CV (fonctionnalité à venir pour le partage direct du CV) avec vos amis et collègues !</p>
        <div className="grid grid-cols-2 gap-4">
          {shareActions.map(action => (
            <Button key={action.name} variant="outline" onClick={action.action} className={`w-full flex items-center justify-start space-x-3 py-6 border-white/20 text-white hover:bg-white/10 ${action.color}`}>
              <action.icon className={`w-6 h-6`} />
              <span className="text-sm">{action.name}</span>
            </Button>
          ))}
        </div>
         <div className="mt-6 text-center">
            <Button onClick={() => {
                 toast({
                    title: "🚧 Partage de CV direct à venir !",
                    description: "La possibilité de partager un lien direct vers votre CV sera bientôt disponible. Pour l'instant, vous pouvez exporter et partager le fichier.",
                    duration: 5000,
                });
            }} variant="link" className="text-purple-400 hover:text-purple-300">
                Partager mon CV directement (Bientôt)
            </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;