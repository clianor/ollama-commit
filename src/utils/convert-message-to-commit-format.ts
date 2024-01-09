export function convertMessageToCommitFormat(message: string) {
  const { type, scope, subject, body } = JSON.parse(message);

  const commitSubject = `${type}${scope ? `(${scope})` : ""}: ${subject}`;
  let commitBody = "";
  if (typeof body === "string") {
    commitBody += body;
  } else if (body && body.length > 0) {
    commitBody += body.join("\n");
  }

  const commitMessage = [commitSubject, commitBody].filter(Boolean).join("\n");
  return commitMessage;
}
