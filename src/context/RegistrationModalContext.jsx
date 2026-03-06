import { createContext, useContext, useState } from "react";

const RegistrationModalContext = createContext();

export const useRegistrationModal = () => {
  const context = useContext(RegistrationModalContext);
  if (!context) {
    throw new Error(
      "useRegistrationModal must be used within RegistrationModalProvider",
    );
  }
  return context;
};

export const RegistrationModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <RegistrationModalContext.Provider
      value={{ isOpen, openModal, closeModal }}
    >
      {children}
    </RegistrationModalContext.Provider>
  );
};
