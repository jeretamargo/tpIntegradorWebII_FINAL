import { createContext, useState, type ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  picture: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  setUser: (u: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const saveUser = (u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser: saveUser }}>
      {children}
    </AuthContext.Provider>
  );
}
