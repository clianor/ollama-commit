export const convertMessageToCommitFormat = (message: string): string => {
  const obj = JSON.parse(message);

  let commitMessage = `${obj.type}${obj.scope ? `(${obj.scope})` : ""}: ${
    obj.subject
  }`;

  if (obj.description && obj.description.length > 0) {
    commitMessage += "\n\n" + obj.description.join("\n");
  }

  return commitMessage;
};
