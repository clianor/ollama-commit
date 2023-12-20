# **Ollama-Commit: Commit message generator with Ollama**

🚀 Automatic commit generator using Ollama.  
This package uses Ollama to help you understand code changes and generate meaningful commit messages.  
Regardless of personal or team projects, ollama-commit allows you to maintain systematic and uniform commit records.  

## How it Works

To use ollama-commit, ollama must be installed.

1. Install Ollama from <https://ollama.ai/>  
2. Install Ollama-Commit using `npm install -g ollama-commit`
3. Make your code changes and stage them with `git add .`
4. Type `ollama-commit` in your terminal
5. Ollama-Commit will analyze your changes and generate a commit message
6. Approve the commit message and AI-Commit will create the commit for you

## Options

--model: Choose the model you want from ollama’s models. `(default: mistral)`

## Roadmap

- [ ] Support for max diff length
- [ ] Support for force option
- [ ] Check default template
- [ ] Support for template suggestion
- [ ] Support for responses in different languages
- [ ] Support for remote ollama

## License

Ollama-Commit is licensed under the MIT License.
