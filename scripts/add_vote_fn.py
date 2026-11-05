with open("src/lib/submissionsData.ts", "r", encoding="utf-8") as f:
    c = f.read()

target = 'localStorage.setItem("aquana_drawings", JSON.stringify(updated));\n  }\n  return newEntry;\n};'
replacement = '''localStorage.setItem("aquana_drawings", JSON.stringify(updated));
  }
  return newEntry;
};

export const voteKidsDrawing = (id: string): KidsDrawingSubmission[] => {
  if (typeof window === "undefined") return initialKidsDrawings;
  const current = getKidsDrawings();
  const updated = current.map((d) => (d.id === id ? { ...d, votes: d.votes + 1 } : d));
  try {
    localStorage.setItem("aquana_drawings", JSON.stringify(updated));
  } catch {}
  return updated;
};'''

if target in c:
    c = c.replace(target, replacement, 1)
else:
    target_crlf = target.replace('\n', '\r\n')
    c = c.replace(target_crlf, replacement.replace('\n', '\r\n'), 1)

with open("src/lib/submissionsData.ts", "w", encoding="utf-8") as f:
    f.write(c)

print("voteKidsDrawing successfully added!")
