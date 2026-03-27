const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('src');

const colorMap = {
  // Replace emeralds with brand orange
  'emerald-300': 'orange-400',
  'emerald-400': 'orange-500',
  'emerald-500': 'orange-600',
  
  // Replace various blues/purples/pinks with warm shades for backgrounds/glows
  'blue-600': 'orange-600',
  'purple-600': 'red-600',
  'pink-600': 'orange-500',
  'cyan-500': 'yellow-500',
  'indigo-600': 'red-700',
  'violet-600': 'orange-700',
  'amber-500': 'orange-500',
  'rose-500': 'red-500',
  
  // Specific solid color fixes
  'bg-[#080808]': 'bg-[#050505]',
  'from-[#080808]': 'from-[#050505]',
  
  // Fix specifically the availability badge
  'bg-emerald-400': 'bg-orange-500',
  'text-emerald-400': 'text-orange-500',
  'border-emerald-500': 'border-orange-500',
  'hover:bg-emerald-500': 'hover:bg-orange-500',
  'hover:text-emerald-300': 'hover:text-orange-400',
  'hover:border-emerald-400': 'hover:border-orange-500'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  Object.entries(colorMap).forEach(([oldColor, newColor]) => {
    // Escape brackets for regex if needed
    const safeOldColor = oldColor.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`\\b${safeOldColor}\\b`, 'g');
    
    // Fallback simple replace for exact matches if regex fails due to prefix
    content = content.replace(regex, newColor);
    content = content.replace(new RegExp(safeOldColor, 'g'), newColor);
  });

  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated theme colors in ${file}`);
  }
});
