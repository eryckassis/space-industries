module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nova feature
        "fix", // Bug fix
        "docs", // Documentação
        "style", // Formatação, ponto-e-vírgula, etc
        "refactor", // Refatoração de código
        "perf", // Melhoria de performance
        "test", // Adicionar testes
        "chore", // Tarefas de manutenção
        "revert", // Reverter commit
        "build", // Mudanças no build
        "ci", // Mudanças no CI
      ],
    ],
    "subject-case": [0], // Permite qualquer case no subject
  },
};
