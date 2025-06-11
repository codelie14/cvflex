import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "Image trop lourde",
          description: "Veuillez choisir une image de moins de 2MB.",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('profilePicture', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="firstName" className="text-white">Prénom</Label>
        <Input id="firstName" value={data.firstName || ''} onChange={(e) => handleChange('firstName', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="Votre prénom" />
      </div>
      <div>
        <Label htmlFor="lastName" className="text-white">Nom</Label>
        <Input id="lastName" value={data.lastName || ''} onChange={(e) => handleChange('lastName', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="Votre nom" />
      </div>
      <div>
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input id="email" type="email" value={data.email || ''} onChange={(e) => handleChange('email', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="votre@email.com" />
      </div>
      <div>
        <Label htmlFor="phone" className="text-white">Téléphone</Label>
        <Input id="phone" value={data.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="+33 6 12 34 56 78" />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="address" className="text-white">Adresse</Label>
        <Input id="address" value={data.address || ''} onChange={(e) => handleChange('address', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="Votre adresse complète" />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="title" className="text-white">Titre professionnel</Label>
        <Input id="title" value={data.title || ''} onChange={(e) => handleChange('title', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="Ex: Développeur Full Stack" />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="summary" className="text-white">Résumé professionnel</Label>
        <Textarea id="summary" value={data.summary || ''} onChange={(e) => handleChange('summary', e.target.value)} className="bg-white/10 border-white/20 text-white min-h-[100px]" placeholder="Décrivez brièvement votre profil..." />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="profilePicture" className="text-white">Photo de profil (URL ou téléverser)</Label>
        <Input id="profilePictureUrl" value={typeof data.profilePicture === 'string' && data.profilePicture.startsWith('http') ? data.profilePicture : ''} onChange={(e) => handleChange('profilePicture', e.target.value)} className="bg-white/10 border-white/20 text-white mb-2" placeholder="URL de votre photo de profil" />
        <Input id="profilePictureUpload" type="file" accept="image/*" onChange={handleImageUpload} className="bg-white/10 border-white/20 text-white file:text-white file:bg-purple-500/50 file:border-none file:px-3 file:py-1.5 file:rounded-md file:mr-3" />
        {data.profilePicture && !data.profilePicture.startsWith('http') && (
          <div className="mt-2">
            <img  src={data.profilePicture} alt="Aperçu photo" className="w-20 h-20 rounded-md object-cover" src="https://images.unsplash.com/photo-1565155239796-9b61eff5ce0d" />
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="portfolio" className="text-white">Portfolio (URL)</Label>
        <Input id="portfolio" value={data.portfolio || ''} onChange={(e) => handleChange('portfolio', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="https://monportfolio.com" />
      </div>
      <div>
        <Label htmlFor="linkedin" className="text-white">LinkedIn (URL)</Label>
        <Input id="linkedin" value={data.linkedin || ''} onChange={(e) => handleChange('linkedin', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="https://linkedin.com/in/votrenom" />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="github" className="text-white">GitHub (URL)</Label>
        <Input id="github" value={data.github || ''} onChange={(e) => handleChange('github', e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="https://github.com/votrenom" />
      </div>
    </div>
  );
};

export default PersonalInfoForm;