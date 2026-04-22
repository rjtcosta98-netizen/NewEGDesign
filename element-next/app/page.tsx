import fs from "node:fs";
import path from "node:path";
import LandingPage from "@/components/LandingPage";

export const dynamic = "force-static";

const HTML = fs.readFileSync(
  path.join(process.cwd(), "app", "_body.html"),
  "utf8"
);
const SCRIPTS = fs.readFileSync(
  path.join(process.cwd(), "app", "_scripts.js"),
  "utf8"
);

export default function Page() {
  return <LandingPage html={HTML} scripts={SCRIPTS} />;
}
