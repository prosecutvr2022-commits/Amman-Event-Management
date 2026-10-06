import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({});

async function run() {
  try {
    const prompt = `A South Indian wedding event circular badge logo for Amman Event Management.
Top half: A majestic golden temple mandapam pavilion with an ornate carved gopuram dome topped by a golden kalasam pinnacle, blooming red rose and fragrant white jasmine floral garlands draped across the gold pillars. Inside the mandapam sits a handsome South Indian groom in white silk shirt and gold-bordered veshti dhoti, beside a radiant South Indian bride in a crimson red Kanchipuram silk saree with gold zari and temple gold jewelry.
Left side has dressed banquet tables with white tablecloths and gold chair ties. Right side has concert aluminum lighting truss and dual black speaker stacks. Foreground has tall brass traditional Kuthu Vilakku oil lamps with lit flames and brass flower urns.
Bottom half: An upward curved royal purple crescent banner with a thick gold circular border and 5 gold circular medallions with icons and text:
1. "Complete Traditional & Contemporary South Indian Wedding Planning"
2. "Custom Mandapam Decor"
3. "Lighting & Sound Rig"
4. "Bride & Groom Stage"
5. "Guest Hospitality"
Bottom center has a gold lotus flower motif. Isolated on white background, ultra-sharp vector presentation emblem.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: prompt,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync('./public/web_wedding_img_1.png', buffer);
        console.log('SUCCESS: Saved inlineData image to ./public/web_wedding_img_1.png');
        return;
      }
    }
    console.log('No inlineData found in parts:', response.candidates?.[0]?.content?.parts);
  } catch (err) {
    console.error('Error with responseModalities IMAGE:', err);
  }
}

run();
