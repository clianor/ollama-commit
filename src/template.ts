// export const defaultPromptTemplate = [
//   // "suggest commit messages based on the following diff:",
//   "suggest 5 commit message based on the following diff:",
//   "{{diff}}",
//   "",
//   "commit messages should:",
//   " - follow conventional commits",
//   " - don't say anything unnecessary besides the commit",
//   " - message format should be: <type>: <description>",

//   "",
//   "examples:",
//   " - fix: add password regex pattern",
//   " - feat: add new test cases",
// ].join("\n");\

export const defaultPromptTemplate = `
`;

// export const defaultPromptTemplate = [
//   "suggest 1 commit messages based on the following diff:",
//   "{{diff}}",
//   "",
//   "[INST]",
//   "commit messages should:",
//   " - follow conventional commits",
//   " - message format should be: <type>[scope]: <description>",

//   "",
//   "examples:",
//   " - fix(authentication): add password regex pattern",
//   " - feat(storage): add new test cases",
//   "[/INST]",
// ].join("\n");
