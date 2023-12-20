export const defaultPromptTemplate = `
<s>[INST]I want you to act like the git commit author.
I'll type git diff and your job is to convert that into a useful commit message.
The commits you will write will have a commit title and one or more comments.
Be concise, precise, and use complete sentences in the present tense.
commit messages must follow conventional commits.
Don't say anything other than the message format.

message format should be:
<type>(<optional scope>): <commit message>
<commit description>
[/INST]
examples:
fix(app): prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.
</s>
[INST]
{{ .Prompt }}
[/INST]`.trim();
