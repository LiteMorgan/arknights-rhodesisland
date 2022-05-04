import fs, { existsSync } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { createRequire } from "module";
import fg from "fast-glob";

const require = createRequire(import.meta.url);

const skinTable = require("./ArknightsGameData/zh_CN/gamedata/excel/skin_table.json");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ACESHIP_DIR = path.join(__dirname, "./AN-EN-Tags");
const EXPORT_DIR = path.join(__dirname, "../public/images");
fs.mkdirSync(EXPORT_DIR, { recursive: true });

const imageDirectories = [
  {
    src: "./img/avatars",
    dest: "./avatars",
    useSkinList: Object.values(skinTable.charSkins).map((i) => i.avatarId),
  },
  {
    src: "./img/equip/icon",
    dest: "./modules",
  },
  {
    src: "./img/portraits",
    dest: "./portraits",
    useSkinList: Object.values(skinTable.charSkins).map((i) => i.portraitId),
  },
  {
    src: "./img/skills",
    dest: "./skills",
  },
];

void (async () => {
  console.log(`Starting image copy`);

  if (!existsSync(ACESHIP_DIR))
    throw new Error(
      `Failed to copy images: Aceship Directory was not found at path "${ACESHIP_DIR}"`
    );

  await Promise.all(
    imageDirectories.map(async ({ src, dest, useSkinList }) => {
      const SOURCE_DIR = path.join(ACESHIP_DIR, src);
      const DEST_DIR = path.join(EXPORT_DIR, dest);

      // Check both Source and Destination paths exist
      if (!existsSync(SOURCE_DIR))
        throw new Error(
          `Failed to copy images: Couldn't find source directory at path "${SOURCE_DIR}"`
        );

      if (!existsSync(DEST_DIR)) await fs.mkdir(DEST_DIR);
      let files;

      // Check number of files to copy
      if (useSkinList) {
        files = await fg(useSkinList.map((i) => `${SOURCE_DIR}/${i}.png`));
      } else {
        files = await fg([`${SOURCE_DIR}/*.png`]);
      }

      console.log(`Found ${files.length} PNGs in ${SOURCE_DIR}`);

      let newFileCount = 0;
      let updatedFileCount = 0;
      await Promise.all(
        files.map(async (sourcePath) => {
          const fileName = path.basename(sourcePath);
          const outPath = path.join(DEST_DIR, fileName);

          let copyFile = false;

          if (!existsSync(outPath)) {
            newFileCount++;
            copyFile = true;
          }

          if (copyFile) return fs.copyFile(sourcePath, outPath);
        })
      );

      if (newFileCount > 0 || updatedFileCount > 0) {
        console.log(
          `Copied ${newFileCount} new files, and updated ${updatedFileCount} files to ${DEST_DIR}`
        );
      } else {
        console.log(`No files were needed to be moved to ${DEST_DIR}`);
      }
    })
  );

  console.log(`Image copy completed`);
})();
