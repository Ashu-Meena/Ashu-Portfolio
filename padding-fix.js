const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Reduce massive vertical padding now that they are in an OS window
  content = content.replace(/py-24/g, 'py-4');
  content = content.replace(/py-32/g, 'py-4');
  content = content.replace(/mb-16/g, 'mb-8');
  content = content.replace(/mb-24/g, 'mb-8');

  fs.writeFileSync(filePath, content);
}
console.log("Padding adjusted for OS window.");
