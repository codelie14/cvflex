
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const GalleryPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8 min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center"
    >
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="absolute top-20 left-4 md:top-24 md:left-8 text-foreground hover:bg-accent"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Retour
      </Button>
      
      <Construction className="w-24 h-24 text-primary mb-8 animate-bounce" />
      
      <h1 className="text-4xl font-bold text-gradient mb-4">Galerie de CV Inspirants</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        Cette section est en cours de construction ! 🚧 <br />
        Bientôt, vous trouverez ici une collection de superbes CV créés avec CVFLEX pour vous inspirer.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {[1, 2, 3].map((item) => (
          <motion.div 
            key={item}
            className="h-64 bg-card rounded-xl glass-effect flex items-center justify-center p-4 opacity-50"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ delay: item * 0.1, type: "spring", stiffness: 100 }}
          >
            <p className="text-muted-foreground">Exemple de CV à venir...</p>
          </motion.div>
        ))}
      </div>
      
      <Button onClick={() => navigate('/')} className="mt-12 bg-primary text-primary-foreground hover:bg-primary/90">
        Retourner à la création de CV
      </Button>
    </motion.div>
  );
};

export default GalleryPage;
