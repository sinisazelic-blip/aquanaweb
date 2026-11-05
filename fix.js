const fs = require('fs');

const files = [
  'src/components/KidsContestBanner.tsx',
  'src/components/VisitorCommentsSection.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/^import\s+\{\s*Lang,\s*tr\s*\}\s+from\s+["']@\/lib\/translations["'];\s*[\r\n]+"use client";/m, '"use client";\nimport { Lang, tr } from "@/lib/translations";');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed:', file);
});
