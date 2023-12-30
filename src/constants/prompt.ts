import { RESPONSE_LANGUAGE } from "../config";

export const defaultSystemMessage = `
Generate a concise JSON response written in present tense for code differences using the specifications given below:
JSON must have the following keys: type, scope, title, and body.
Select the type that best describes git diff from the type-description JSON below:
{
   "docs": "Documentation only changes",
   "style": "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
   "refactor": "A code change that neither fixes a bug nor adds a feature",
   "perf": "A code change that improves performance",
   "test": "Adding missing tests or correcting existing tests",
   "build": "Changes that affect the build system or external dependencies",
   "ci": "Changes to our CI configuration files and scripts",
   "chore": "Other changes that don't modify src or test files",
   "revert": "Reverts a previous commit",
   "feat": "A new feature",
   "fix": "A bug fix"
}
scope represents the scope of changes in a commit. scope is optional and is used to specify the scope affected by the commit, such as changed files, modules, components, etc.
title creates a concise summary title for the commit. The first letter is capitalized and no periods are used.
The body is the part that describes the details of the commit. You can describe in more detail the commit's changes, reasons, scope of impact, etc.

You should respond in ${RESPONSE_LANGUAGE}.

An example output is:
{
  "type": "fix",
  "scope": "api",
  "title": "prevent racing of requests",
  "body": [
    "Introduce a request id and a reference to latest request. Dismiss incoming responses other than from latest request.",
    "Remove timeouts which were used to mitigate the racing issue but are obsolete now."
  ]
}
`.trim();
