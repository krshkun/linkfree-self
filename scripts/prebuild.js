import { config as env } from "dotenv";
import { writeFileSync } from "fs";
import { join } from "path";
import { createCanvas, loadImage } from "canvas";
import fetch from "node-fetch";

async function main() {
  const { parsed } = env();
  const username = parsed.LINKFREE_USERNAME;

  const file = Buffer.from(
    await (await fetch(`https://github.com/${username}.png`)).arrayBuffer()
  );

  writeFileSync(join(process.cwd(), "public", "avatar.png"), file);

  const profile = await (
    await fetch(`https://linkfree.eddiehub.io/api/users/${username}`)
  ).json();

  const { name, bio } = profile;

  const font =
    'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Android Emoji, EmojiSymbols, OpenMoji, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';

  const canvas = createCanvas(1200, 630);

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0f172a";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.textDrawingMode = "glyph";

  ctx.font = `bold 80px ${font}`;

  ctx.fillText(
    name,
    canvas.width / 2,
    canvas.height / 1.4 - 80 / 2,
    canvas.width
  );

  ctx.font = `24px ${font}`;

  ctx.fillText(
    bio,
    canvas.width / 2,
    canvas.height / 1.275 - 24 / 2,
    canvas.width
  );

  const image = await loadImage(file);

  ctx.save();
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 3, 300 / 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(
    image,
    canvas.width / 2 - 300 / 2,
    canvas.height / 3 - 300 / 2,
    300,
    300
  );
  ctx.restore();

  const banner = canvas.toBuffer("image/png");

  writeFileSync(join(process.cwd(), "public", "og:banner.png"), banner);
}

main();
