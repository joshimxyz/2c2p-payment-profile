"use client";

import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import Cookies from "js-cookie";

import { Card, User } from "../types";


export type CardInput = Omit<Card, "id" | "userId">;

interface AuthContextType {
  user: User | null;
  cards: Card[];
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (phone: string) => void;
  logout: () => void;
  saveCard: (card: CardInput) => Promise<void>;
  deleteCards: (ids: number[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Helper: Fetch Cards for specific user ---
  const fetchCards = useCallback((phone: string) => {
    try {
      const localData = localStorage.getItem("db_cards");
      const db: Card[] = localData ? JSON.parse(localData) : [];
      const filtered = db.filter((c) => c.userId === phone);
      setCards(filtered);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      setCards([]);
    }
  }, []);

  // --- Initialize Session ---
  useEffect(() => {
    const session = Cookies.get("user_session");
    if (session) {
      try {
        const userData: User = JSON.parse(session);
        setUser(userData);
        fetchCards(userData.phone);
      } catch (e) {
        console.error("Session sync error", e);
        Cookies.remove("user_session");
      }
    }
    setIsLoading(false);
  }, [fetchCards]);

  // --- Auth Actions ---
  const login = (phone: string) => {
    const newUser: User = { phone, name: "Joshim Uddin" };
    Cookies.set("user_session", JSON.stringify(newUser), { expires: 1 });

    // Seed mock data if new user
    const localData = localStorage.getItem("db_cards");
    const db: Card[] = localData ? JSON.parse(localData) : [];
    const userHasCards = db.some((c) => c.userId === phone);

    if (!userHasCards) {
      const mockCards: Card[] = [
        {
          id: 1,
          userId: phone,
          name: "Joshim Uddin",
          number: "4134 01XX XXXX 9860",
          bank: "Eastern Bank Plc",
          expires: "12/26",
        },
        {
          id: 2,
          userId: phone,
          name: "Joshim Uddin",
          number: "4134 01XX XXXX 4463",
          bank: "Eastern Bank Plc",
          expires: "08/25",
        },
      ];
      const newDb = [...db, ...mockCards];
      localStorage.setItem("db_cards", JSON.stringify(newDb));
    }

    setUser(newUser);
    fetchCards(phone);
  };

  const logout = () => {
    Cookies.remove("user_session");
    setUser(null);
    setCards([]);
  };

  // --- Card Management ---
  const saveCard = async (cardData: CardInput) => {
    if (!user) return;

    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newCard: Card = {
      ...cardData, // This spreads name, number, expires, and bank
      id: Date.now(),
      userId: user.phone,
    };

    try {
      const localData = localStorage.getItem("db_cards");
      const db: Card[] = localData ? JSON.parse(localData) : [];
      const updatedDb = [...db, newCard];
      
      localStorage.setItem("db_cards", JSON.stringify(updatedDb));
      
      // Update UI state immediately
      setCards((prev) => [...prev, newCard]);
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const deleteCards = async (ids: number[]) => {
    if (!user) return;

    try {
      const localData = localStorage.getItem("db_cards");
      const db: Card[] = localData ? JSON.parse(localData) : [];
      
      // Filter out deleted cards from the global database
      const updatedDb = db.filter((card) => !ids.includes(card.id));
      localStorage.setItem("db_cards", JSON.stringify(updatedDb));

      // Filter the UI state so the specific user's view refreshes
      setCards((prev) => prev.filter((card) => !ids.includes(card.id)));
    } catch (error) {
      console.error("Error deleting cards:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cards,
        login,
        logout,
        saveCard,
        deleteCards,
        isLoading,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};