"use client";

import dynamic from "next/dynamic";

export const RobotBackground = dynamic(
  () => import("./RobotScrollSection").then((m) => m.RobotBackground),
  { ssr: false }
);
