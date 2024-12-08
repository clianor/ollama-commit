import { CommitSchema } from "../constants/schema";
import options from "../options";

export async function translateAndFormatCommitMessage(
  commitData: CommitSchema
) {
  const translate = (await import("translate")).default;
  const { type, scope, subject, body } = commitData;

  try {
    const translateText = async (text: string | string[] | undefined) => {
      if (!text || options.language === "en") return text;
      if (Array.isArray(text)) {
        return (
          await Promise.all(
            text.map((t) =>
              translate(t, {
                engine: "google",
                to: options.language,
              })
            )
          )
        )
          .join("\n")
          .replace(/`/g, "'");
      }
      const translated = await translate(text, {
        engine: "google",
        to: options.language,
      });
      return translated.replace(/`/g, "'");
    };

    const [translatedSubject, translatedBody] = await Promise.all([
      translateText(subject),
      translateText(body),
    ]);

    const formattedSubject = `${type}${
      scope ? `(${scope})` : ""
    }: ${translatedSubject}`;
    return [formattedSubject, translatedBody].filter(Boolean).join("\n\n");
  } catch (error) {
    console.error("Error translating commit message:", error);
    throw error;
  }
}
