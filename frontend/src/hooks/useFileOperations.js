import { useCallback } from 'react';
import { toPng } from 'html-to-image';

export const useFileOperations = (elements, setElements) => {
  const saveToFile = useCallback(() => {
    const data = JSON.stringify(elements);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'flow.json';
    link.href = url;
    link.click();
  }, [elements]);

  const loadFromFile = useCallback((event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const loadedElements = JSON.parse(content);
      setElements(loadedElements);
    };
    reader.readAsText(file);
  }, [setElements]);

  const exportImage = useCallback(() => {
    toPng(document.querySelector('.react-flow'), { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'flow.png';
        link.href = dataUrl;
        link.click();
      });
  }, []);

  return { saveToFile, loadFromFile, exportImage };
};