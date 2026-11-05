with open(r"D:\Dev\AquanaWEB\src\app\page.tsx", "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace('import React, { useState } from "react";', 'import React, { useState, useEffect } from "react";')
with open(r"D:\Dev\AquanaWEB\src\app\page.tsx", "w", encoding="utf-8") as f:
    f.write(c)
print("Updated page.tsx with useEffect!")
