export const convertMessageToCommitFormat = (message: string): string => {
  const obj = JSON.parse(message);

  let commitMessage = `${obj.type}${obj.scope ? `(${obj.scope})` : ""}: ${
    obj.title
  }`;

  if (obj.body && obj.body.length > 0) {
    commitMessage += "\n\n" + obj.body.join("\n");
  }

  return commitMessage;
};
