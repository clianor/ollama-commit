import options from "../options";

export async function convertMessageToCommitFormat(message: string) {
  const translate = (await import("translate")).default;

  const { type, scope, subject, body = [] } = JSON.parse(message);

  const translatedContent = await Promise.all(
    [subject, ...(typeof body === "string" ? [body] : body)]
      .map((str: string) => str.replaceAll("'", "`"))
      .map((str) => translate(str, { engine: "google", to: options.language }))
  );

  const commitSubject = `${type}${
    scope ? `(${scope})` : ""
  }: ${translatedContent.at(0)}`;
  const commitBody = translatedContent.slice(1).join("\n");
  const commitMessage = [commitSubject, commitBody]
    .filter(Boolean)
    .join("\n\n");
  return commitMessage;
}
