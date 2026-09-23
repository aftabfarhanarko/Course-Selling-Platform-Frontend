"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function SignupLotti(): React.JSX.Element {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/signup.json")
      .then((res) => res.json())
      .then((data) => {
        if (active) setAnimationData(data as Record<string, unknown>);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="w-full h-auto max-h-[580px] object-contain"
        />
      ) : (
        <div className="h-[400px] w-full bg-slate-100/50 rounded-2xl animate-pulse" />
      )}
    </div>
  );
}

