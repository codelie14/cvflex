import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, FileText, Image, Loader2, Upload, Save, FileBarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';

const ExportModal = ({ cvData, theme, font, customColors, onClose, onImportJSON }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const getElementWithStyles = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) throw new Error('Élément CV non trouvé');

    // Temporarily apply custom styles for canvas rendering if 'custom' theme is selected
    let originalStyles = {};
    if (theme === 'custom') {
        originalStyles = {
            backgroundColor: element.style.backgroundColor,
            color: element.style.color,
        };
        element.style.backgroundColor = customColors.background || originalStyles.backgroundColor;
        element.style.color = customColors.text || originalStyles.color;

        // Apply to children if needed, this is a simplified example
        // More complex scenarios might require deeper traversal and style application
    }
    
    const canvas = await html2canvas(element, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: theme === 'custom' ? customColors.background : null, // Ensure bg for custom
        width: element.scrollWidth, height: element.scrollHeight,
        onclone: (document) => {
          const clonedElement = document.getElementById('cv-preview');
          if (clonedElement) {
            clonedElement.style.fontFamily = font;
             if (theme === 'custom') {
                clonedElement.style.backgroundColor = customColors.background;
                clonedElement.style.color = customColors.text;
                // Apply accent to specific elements if needed by querying them
                clonedElement.querySelectorAll('[data-custom-accent="true"]').forEach(el => el.style.color = customColors.accent);
                clonedElement.querySelectorAll('[data-custom-card-bg="true"]').forEach(el => el.style.backgroundColor = customColors.card);
            }
          }
        }
    });

    // Restore original styles if they were changed
    if (theme === 'custom') {
        element.style.backgroundColor = originalStyles.backgroundColor;
        element.style.color = originalStyles.color;
    }
    return canvas;
  };


  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const canvas = await getElementWithStyles();
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210; const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight; let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight; pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      const fileName = `CV_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.pdf` || 'CV_CVFLEX.pdf';
      pdf.save(fileName);
      toast({ title: "🎉 Export PDF réussi !", description: "Votre CV a été téléchargé.", duration: 3000 });
    } catch (error) { console.error('Erreur PDF:', error); toast({ title: "❌ Erreur d'export PDF", description: error.message, duration: 3000 }); }
    finally { setIsExporting(false); }
  };

  const exportToPNG = async () => {
    setIsExporting(true);
    try {
      const canvas = await getElementWithStyles();
      const link = document.createElement('a');
      link.download = `CV_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.png` || 'CV_CVFLEX.png';
      link.href = canvas.toDataURL('image/png'); link.click();
      toast({ title: "🎉 Export PNG réussi !", description: "Votre CV a été téléchargé.", duration: 3000 });
    } catch (error) { console.error('Erreur PNG:', error); toast({ title: "❌ Erreur d'export PNG", description: error.message, duration: 3000 }); }
    finally { setIsExporting(false); }
  };

  const exportToPPTX = async () => {
    setIsExporting(true);
    try {
        const canvas = await getElementWithStyles();
        const imgData = canvas.toDataURL('image/png');

        let pptx = new PptxGenJS();
        let slide = pptx.addSlide();
        
        // A4 dimensions in inches for PPTX: 8.27 x 11.69
        const slideWidthInches = 8.27; 
        const slideHeightInches = 11.69;
        pptx.layout = 'LAYOUT_16X9'; // Or 'LAYOUT_4X3' or 'LAYOUT_USER' for custom. A4 is closer to 4:3 portrait.
                                   // For custom, use pptx.defineLayout({ name:'A4', width: slideWidthInches, height: slideHeightInches}); and pptx.layout = 'A4';

        // Calculate image size to fit the slide while maintaining aspect ratio
        const canvasAspectRatio = canvas.width / canvas.height;
        let imgWidthInches, imgHeightInches;

        if (canvasAspectRatio > (slideWidthInches / slideHeightInches)) { // Image is wider than slide
            imgWidthInches = slideWidthInches;
            imgHeightInches = slideWidthInches / canvasAspectRatio;
        } else { // Image is taller than slide
            imgHeightInches = slideHeightInches;
            imgWidthInches = slideHeightInches * canvasAspectRatio;
        }
        
        // Center the image on the slide
        const xInches = (pptx.presLayout.width / 952500 - imgWidthInches) / 2; // presLayout.width is in EMUs, 952500 EMUs per inch
        const yInches = (pptx.presLayout.height / 952500 - imgHeightInches) / 2;


        slide.addImage({
            data: imgData,
            x: xInches, y: yInches,
            w: imgWidthInches, h: imgHeightInches,
        });

        const fileName = `CV_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.pptx` || 'CV_CVFLEX.pptx';
        pptx.writeFile({ fileName });
        toast({ title: "🎉 Export PPTX réussi !", description: "Votre CV a été téléchargé.", duration: 3000 });
    } catch (error) {
        console.error('Erreur PPTX:', error);
        toast({ title: "❌ Erreur d'export PPTX", description: error.message, duration: 3000 });
    } finally {
        setIsExporting(false);
    }
  };


  const handleExport = () => {
    if (exportFormat === 'pdf') exportToPDF();
    else if (exportFormat === 'png') exportToPNG();
    else if (exportFormat === 'pptx') exportToPPTX();
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_Data_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.json` || 'CV_Data_CVFLEX.json';
    link.click(); URL.revokeObjectURL(url);
    toast({ title: "💾 Données exportées !", description: "Données CV sauvegardées en JSON.", duration: 3000 });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-effect rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Exporter votre CV</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10"><X className="w-5 h-5" /></Button>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <span className="text-white font-medium mb-3 block">Format d'export :</span>
            <div className="grid grid-cols-3 gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setExportFormat('pdf')} className={`p-3 rounded-lg border-2 transition-colors ${exportFormat === 'pdf' ? 'border-purple-500 bg-purple-500/20' : 'border-white/20 bg-white/5 hover:border-white/40'}`}>
                <FileText className="w-7 h-7 mx-auto mb-1 text-purple-400" /><span className="text-white font-medium text-sm">PDF</span><p className="text-xs text-gray-400 mt-0.5">Recommandé</p>
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setExportFormat('png')} className={`p-3 rounded-lg border-2 transition-colors ${exportFormat === 'png' ? 'border-blue-500 bg-blue-500/20' : 'border-white/20 bg-white/5 hover:border-white/40'}`}>
                <Image className="w-7 h-7 mx-auto mb-1 text-blue-400" /><span className="text-white font-medium text-sm">PNG</span><p className="text-xs text-gray-400 mt-0.5">Image</p>
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setExportFormat('pptx')} className={`p-3 rounded-lg border-2 transition-colors ${exportFormat === 'pptx' ? 'border-orange-500 bg-orange-500/20' : 'border-white/20 bg-white/5 hover:border-white/40'}`}>
                <FileBarChart2 className="w-7 h-7 mx-auto mb-1 text-orange-400" /><span className="text-white font-medium text-sm">PPTX</span><p className="text-xs text-gray-400 mt-0.5">PowerPoint</p>
              </motion.button>
            </div>
          </div>
          <Button onClick={handleExport} disabled={isExporting} className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
            {isExporting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Export en cours...</> : <><Download className="w-4 h-4 mr-2" />Exporter en {exportFormat.toUpperCase()}</>}
          </Button>
          <div className="border-t border-white/20 pt-4">
            <span className="text-white font-medium mb-3 block">Gestion des données :</span>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={exportToJSON} variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10"><Save className="w-4 h-4 mr-2" />Sauvegarder</Button>
              <Button onClick={onImportJSON} variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"><Upload className="w-4 h-4 mr-2" />Charger</Button>
            </div>
          </div>
        </div>
        <div className="text-center"><p className="text-xs text-gray-400">Vos données sont automatiquement sauvegardées localement.</p></div>
      </motion.div>
    </motion.div>
  );
};

export default ExportModal;