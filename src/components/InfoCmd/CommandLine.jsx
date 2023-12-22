import React, { useEffect, useState } from 'react';

import './commandline.css'

const CommandHighlighter = ({ command }) => {
    const [styledParts, setStyledParts] = useState([]);
  
    useEffect(() => {
      const getStyledParts = (cmd) => {
        
        const parts = cmd.split(' ');

        return parts.map((part, index) => {
          let _class = {};
  
          if (part.startsWith('-')) {
            _class = 'color-bash'; // Estilo para las opciones
          } else if (part.includes('\\') || part.includes('/')) {
            _class = 'color-path'; // Estilo para rutas de archivos
          } else if (part.includes('.')) {
            _class = 'color-command'; // Estilo para commando volatility
          } else {
            _class = 'color-other'; // Estilo para el resto
          }
  
          return <span key={index} className={_class}>{part}{' '}{' '}</span>;
        });
      };
  
      setStyledParts(getStyledParts(command));
    }, [command]);
  
    return (
      <div className='variable-container'>
        {styledParts}
      </div>
    );
  };
  
  export default CommandHighlighter;
  