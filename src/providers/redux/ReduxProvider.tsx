"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store";
import { rehydrateAuth } from "@/store/slices/authSlice";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  return <>{children}</>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
