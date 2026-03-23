import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateHydrationScript } from "solid-js/web";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generate() {
  const templatePath = path.resolve(__dirname, "dist/client/index.html");
  const serverEntryPath = path.resolve(
    __dirname,
    "dist/server/entry-server.js"
  );

  const { render } = await import(`file://${serverEntryPath}`);
  const routes = ["/", "/about", "/contact"];
  const hydrationScript = generateHydrationScript();

  const template = fs.readFileSync(templatePath, "utf-8");
  const withHydration = template.replace(
    "</head>",
    `${hydrationScript}</head>`
  );

  for (const route of routes) {
    const appHtml = render(route);
    const finalHtml = withHydration.replace(
      "<div id=\"app\"></div>",
      `<div id=\"app\">${appHtml}</div>`
    );

    const outputDir = route === "/"
      ? path.resolve(__dirname, "dist/client")
      : path.resolve(__dirname, "dist/client", route.slice(1));
    const outputPath = path.resolve(outputDir, "index.html");

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, finalHtml);
  }
  fs.rmSync(path.resolve(__dirname, "dist/server"), {
    recursive: true,
    force: true,
  });

  console.log("✅ SSG Murni berhasil dibuat di folder dist/client!");
}

generate();
