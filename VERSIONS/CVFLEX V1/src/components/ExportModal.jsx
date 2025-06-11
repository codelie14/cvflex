
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, FileText, Image, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportModal = ({ cvData, theme, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('cv-preview');
      if (!element) {
        throw new Error('Élément CV non trouvé');
      }

      // Créer le canvas avec une meilleure qualité
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      // Créer le PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Ajouter la première page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Ajouter des pages supplémentaires si nécessaire
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Télécharger le PDF
      const fileName = `CV_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.pdf` || 'CV_CVFLEX.pdf';
      pdf.save(fileName);

      toast({
        title: "🎉 Export réussi !",
        description: "Votre CV a été téléchargé en PDF.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      toast({
        title: "❌ Erreur d'export",
        description: "Une erreur est survenue lors de l'export PDF.",
        duration: 3000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPNG = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('cv-preview');
      if (!element) {
        throw new Error('Élément CV non trouvé');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      // Créer le lien de téléchargement
      const link = document.createElement('a');
      link.download = `CV_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.png` || 'CV_CVFLEX.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "🎉 Export réussi !",
        description: "Votre CV a été téléchargé en PNG.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export PNG:', error);
      toast({
        title: "❌ Erreur d'export",
        description: "Une erreur est survenue lors de l'export PNG.",
        duration: 3000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      exportToPDF();
    } else {
      exportToPNG();
    }
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_Data_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.json` || 'CV_Data_CVFLEX.json';
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "💾 Données exportées !",
      description: "Vos données CV ont été sauvegardées en JSON.",
      duration: 3000,
    });
  };

  const importFromJSON = () => {
    toast({
      title: "🚧 Fonctionnalité à venir !",
      description: "L'import JSON sera disponible dans une prochaine version.",
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-effect rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Exporter votre CV</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          {/* Format Selection */}
          <div>
            <span className="text-white font-medium mb-3 block">Format d'export :</span>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setExportFormat('pdf')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  exportFormat === 'pdf'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <span className="text-white font-medium">PDF</span>
                <p className="text-xs text-gray-400 mt-1">Recommandé</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setExportFormat('png')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  exportFormat === 'png'
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <Image className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <span className="text-white font-medium">PNG</span>
                <p className="text-xs text-gray-400 mt-1">Image</p>
              </motion.button>
            </div>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Export en cours...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Exporter en {exportFormat.toUpperCase()}
              </>
            )}
          </Button>

          {/* Data Management */}
          <div className="border-t border-white/20 pt-4">
            <span className="text-white font-medium mb-3 block">Gestion des données :</span>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={exportToJSON}
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
              >
                Sauvegarder
              </Button>
              <Button
                onClick={importFromJSON}
                variant="outline"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
              >
                Charger
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            Vos données sont automatiquement sauvegardées localement
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExportModal;
