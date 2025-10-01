'use client';

import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
};
