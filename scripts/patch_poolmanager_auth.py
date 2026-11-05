import os

auth_path = r"X:\PoolManager\src\lib\auth.ts"
if os.path.exists(auth_path):
    with open(auth_path, "r", encoding="utf-8") as f:
        auth_code = f.read()

    old_auth_block = """    let defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          email: "admin@entersys.ba",
          name: "Siniša Zelić (Administrator)",
          role: "SUPERADMIN",
          passwordHash: hashPassword("admin123"),
        },
      });
    }
    return defaultUser;
  } catch (error) {
    console.error("getCurrentUser fallback error:", error);
    return {
      id: "admin-fallback",
      email: "admin@entersys.ba",
      name: "Siniša Zelić (Administrator)",
      role: "SUPERADMIN",
      clubId: null,
    };
  }"""

    new_auth_block = """    return null;
  } catch (error) {
    console.error("getCurrentUser auth check error:", error);
    return null;
  }"""

    if old_auth_block in auth_code:
        auth_code = auth_code.replace(old_auth_block, new_auth_block)
        with open(auth_path, "w", encoding="utf-8") as f:
            f.write(auth_code)
        print("X:\\PoolManager\\src\\lib\\auth.ts patched: Superadmin fallback REMOVED!")
    else:
        print("Notice: old_auth_block not found in auth.ts (already patched?)")

# Patch page.tsx
page_path = r"X:\PoolManager\src\app\page.tsx"
if os.path.exists(page_path):
    with open(page_path, "r", encoding="utf-8") as f:
        page_code = f.read()

    old_page_block = """  const currentUser = await getCurrentUser();

  const currentUserFormatted = currentUser ? {"""

    new_page_block = """  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  const currentUserFormatted = currentUser ? {"""

    if old_page_block in page_code:
        page_code = page_code.replace(old_page_block, new_page_block)
        with open(page_path, "w", encoding="utf-8") as f:
            f.write(page_code)
        print("X:\\PoolManager\\src\\app\\page.tsx patched: Redirect to /login enabled!")
    else:
        print("Notice: old_page_block not found in page.tsx (already patched?)")
