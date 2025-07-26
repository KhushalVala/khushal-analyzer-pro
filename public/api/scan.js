import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const KEYWORDS = [
  "wss://", "aviator", "multiplier", "prediction", "hostname",
  "ssl", "verify", "crash_point", "CrashManager", "WebSocketClient",
  "onMessage", "aviator_signal", "bluebox", "spribe", "seed", "hash"
];

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err || !files.file) return res.status(500).json({ error: "Upload failed." });

    const filePath = files.file[0].filepath;
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [];

    const lines = content.split('\n');
    lines.forEach((line, i) => {
      KEYWORDS.forEach(keyword => {
        if (line.includes(keyword)) {
          matches.push(`Line ${i + 1}: ${line.trim()}`);
        }
      });
    });

    res.status(200).json({ matches });
  });
}
