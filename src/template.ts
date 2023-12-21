import { RESPONSE_LANGUAGE } from "./config";

export const defaultPromptTemplate = `
<s>[INST]I hope you find it useful to write Git commit messages based on the git diff input.
A commit consists of a title and one or more comments, and should be written in concise, clear sentences.
Commit messages are written in the present tense and must follow convention.
Please make sure not to repeat the message format and not mention anything else.
I hope you respond with a firm attitude.
Please respond with message and description in ${RESPONSE_LANGUAGE}.

message format should be:
<type>(<optional scope>): <commit message>
- <optional commit description>
- <optional commit description>
[/INST]
examples:
fix(app): prevent racing of requests

</s>
[INST]
{{ .Prompt }}
[/INST]`.trim();
