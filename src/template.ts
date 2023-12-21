import { RESPONSE_LANGUAGE } from "./config";

export const defaultPromptTemplate = `
<s>[INST]I want you to act like the git commit author.
I'll type git diff and your job is to convert that into a useful commit message.
The commits you will write will have a commit title and one or more comments.
Be concise, precise, and use complete sentences in the present tense.
commit messages must follow conventional commits.
Don't say anything other than the message format.
Respond in an assertive tone.
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
