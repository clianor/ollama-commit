import { RESPONSE_LANGUAGE } from "./config";

export const defaultPromptTemplate = `
<s>
[INST]
I want you to act as a commit message generator.
I will provide the output through the 'git diff --staged' command, and you are to convert it into a commit message.
I don't want any responses other than the commit message, so please only output the commit message.
I want the first line of the commit message to always be under 10 words.
I want each line of the commit body to be under 10 words.
I don't want any blank lines between each line of the commit body.
commit message의 scope는 type 뒤에오며 괄호로 둘러싸인 코드베이스의 섹션을 설명하는 명사로 구성되어야 합니다. e.g., fix(parser)
I want the body of the commit to strictly include only the changes.
I only want one commit message to be output.
Please output in ${RESPONSE_LANGUAGE}.
[/INST]
fix(webview): Fixed video display in WebView on Android: the control was forced to use software rendering.

This feature is now opt-in instead.
</s>
[INST]
I will provide the results obtained through the 'git diff --staged' command as follows:
{{ .Prompt }}
[/INST]
`.trim();
