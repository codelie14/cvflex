
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction, Edit3, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const CoverLetterPage = ({ cvData }) => {
  const navigate = useNavigate();
  const [letterContent, setLetterContent] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const generateBasicTemplate = () => {
    if (!cvData || !cvData.personalInfo) {
        toast({ title: "Données CV manquantes", description: "Veuillez d'abord remplir vos informations personnelles.", variant: "destructive" });
        return;
    }

    const { firstName, lastName, title, email, phone } = cvData.personalInfo;
    const skillsSummary = cvData.skills && cvData.skills.length > 0 ? cvData.skills.slice(0, 3).map(s => s.name).join(', ') : "mes compétences clés";
    const experienceSummary = cvData.experience && cvData.experience.length > 0 ? `mon expérience en tant que ${cvData.experience[0].position} chez ${cvData.experience[0].company}` : "mon parcours professionnel";

    const template = `
${firstName} ${lastName}
${email ? email + '\n' : ''}${phone ? phone + '\n' : ''}
Date: ${new Date().toLocaleDateString('fr-FR')}

${recipientName || '[Nom du Recruteur / Service Recrutement]'}
${companyName || '[Nom de l\'Entreprise]'}
${companyName ? '[Adresse de l\'Entreprise]\n' : ''}

Objet : Candidature pour le poste de ${jobTitle || '[Intitulé du Poste]'}

Madame, Monsieur ${recipientName ? recipientName.split(' ').pop() : ''},

C'est avec un grand intérêt que je vous soumets ma candidature pour le poste de ${jobTitle || '[Intitulé du Poste]'} au sein de votre entreprise, ${companyName || '[Nom de l\'Entreprise]'}. Fort de ${experienceSummary} et de ${skillsSummary}, je suis convaincu(e) que mon profil correspond aux exigences de ce rôle.

[Paragraphe sur votre motivation spécifique pour ce poste et cette entreprise. Mentionnez comment vos compétences et expériences s'alignent avec les besoins décrits dans l'offre d'emploi, si disponible.]

[Paragraphe détaillant une ou deux réalisations clés de votre CV qui sont pertinentes pour le poste.]

Je suis impatient(e) de discuter plus en détail de la manière dont mes qualifications peuvent bénéficier à ${companyName || 'votre équipe'}. Je vous remercie de l'attention que vous porterez à ma candidature.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

Cordialement,
${firstName} ${lastName}
    `;
    setLetterContent(template.trim());
    toast({ title: "Modèle généré !", description: "N'oubliez pas de personnaliser la lettre.", duration: 3000});
  };

  const handleFeatureNotImplemented = (featureName) => {
    toast({
      title: `🚧 ${featureName} à venir !`,
      description: "Cette fonctionnalité n'est pas encore implémentée. Revenez bientôt ! 🚀",
      duration: 4000,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8 min-h-[calc(100vh-120px)]"
    >
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="absolute top-20 left-4 md:top-24 md:left-8 text-foreground hover:bg-accent"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Retour
      </Button>
      
      <div className="text-center mb-12">
        <Construction className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-gradient mb-2">Générateur de Lettre de Motivation</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Un outil simple pour démarrer votre lettre de motivation. <br />Personnalisez le modèle généré avec vos propres informations !
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6 p-6 glass-effect rounded-xl">
          <div>
            <Label htmlFor="recipientName" className="text-foreground">Nom du Destinataire (Optionnel)</Label>
            <Input id="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Ex: Mme. Dupont" className="bg-input text-foreground border-border focus:ring-primary" />
          </div>
          <div>
            <Label htmlFor="companyName" className="text-foreground">Nom de l'Entreprise</Label>
            <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Ex: Tech Solutions Inc." className="bg-input text-foreground border-border focus:ring-primary" />
          </div>
          <div>
            <Label htmlFor="jobTitle" className="text-foreground">Intitulé du Poste Visé</Label>
            <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Ex: Développeur Web Fullstack" className="bg-input text-foreground border-border focus:ring-primary" />
          </div>
          <Button onClick={generateBasicTemplate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Edit3 className="w-4 h-4 mr-2" /> Générer un Modèle
          </Button>
           <p className="text-xs text-muted-foreground text-center">Cette fonctionnalité est basique. Des améliorations avec IA sont prévues !</p>
        </div>

        <div className="md:col-span-2 p-6 glass-effect rounded-xl">
          <Label htmlFor="letterContent" className="text-foreground text-lg mb-2 block">Votre Lettre de Motivation</Label>
          <Textarea 
            id="letterContent"
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            placeholder="Votre lettre apparaîtra ici... Modifiez-la à votre guise."
            rows={20}
            className="w-full bg-input text-foreground border-border focus:ring-primary scrollbar-hide"
          />
          <Button onClick={() => handleFeatureNotImplemented("Export de la lettre")} className="mt-6 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Download className="w-4 h-4 mr-2" /> Exporter la Lettre (Bientôt)
          </Button>
        </div>
      </div>
      
    </motion.div>
  );
};

export default CoverLetterPage;
