# **Ollama-Commit: Commit message generator with Ollama**

🚀 Automatic commit generator using Ollama.  
This package uses Ollama to help you understand code changes and generate meaningful commit messages.  
Regardless of personal or team projects, ollama-commit allows you to maintain systematic and uniform commit records.

All commits in this project were generated by ollama-commit.

**Important: Ollama-Commit is only available for models that support LLM Tools!**

## How it Works

To use ollama-commit, ollama must be installed.

1. Install Ollama from <https://ollama.ai/>  
2. Install Ollama-Commit using `npm install -g ollama-commit`
3. Make your code changes and stage them with `git add .`
4. Type `ollama-commit` in your terminal
5. Ollama-Commit will analyze your changes and generate a commit message
6. Approve the commit message and AI-Commit will create the commit for you

## Options

```bash
$ npx ollama-commit --help
Usage: help [options]

Automatic commit generator using Ollama.

Options:
  -V, --version                      output the version number
  -m, --model <model>                ollama model (default: "mistral")
  -a, --api <api>                    api host (default: "http://localhost:11434")
  -l, --language <language>          the string of the language to translate to. It can be in any of the two ISO 639 (1 or 2) or the full name in English like Spanish. (default: "en")
  -s, --signature
  -v, --verbose
  -h, --help                         display help for command
```

## Roadmap

- [x] Support for multiple models
- [x] Support for responses in different languages
- [x] Support for remote ollama
- [ ] Support for model pulling selection
- [ ] Support for force option
- [ ] Support for template suggestion
- [ ] Check default template

## License

Ollama-Commit is licensed under the MIT License.

[![npm version](https://badge.fury.io/js/ollama-commit.svg)](https://badge.fury.io/js/ollama-commit)
[![Codeac](https://static.codeac.io/badges/2-733989087.svg "Codeac")](https://app.codeac.io/github/clianor/ollama-commit)
