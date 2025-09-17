import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES 모듈에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, "../src/assets/icon");
const files = fs.readdirSync(iconsDir).filter((f) => f.endsWith(".svg"));

const exports = files
  .map((file) => {
    const name = file.replace(".svg", "");
    return `import ${name} from "./${file}";`;
  })
  .join("\n");

const objectEntries = files
  .map((file) => file.replace(".svg", ""))
  .join(",\n  ");

const content = `
${exports}

export const Icons = {
  ${objectEntries}
};

export type IconKeys = keyof typeof Icons;
`;

fs.writeFileSync(path.join(iconsDir, "index.ts"), content);

console.log(`✅ Generated index.ts with ${files.length} icons`);
console.log(`📁 Icons directory: ${iconsDir}`);
console.log(
  `📝 Generated icons: ${files.map((f) => f.replace(".svg", "")).join(", ")}`
);
