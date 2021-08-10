# Links

## UI

- https://pt-br.reactjs.org/

## Tests

- https://jestjs.io/
- https://github.com/testing-library/jest-dom
- https://testing-library.com/docs/react-testing-library/intro
- https://develop.testing-playground.com/
- https://github.com/testing-library/user-event

## Router

- https://github.com/ReactTraining/react-router/blob/dev/docs/api-reference.md#link

## MaterialUi

- https://material-ui.com/pt/

## Mocks

- https://github.com/nock/nock
- https://github.com/mswjs/msw

---

## Biblioteca de testes

### Jest tem muitos benefícios sobre outros corredores de teste:

- Muito rápido.
- Modo de exibição interativo que executa apenas testes relevantes para suas alterações.
- Mensagens de falha úteis.
- Configuração simples ou mesmo zero.
- Mocks e spy.
- Relatórios de cobertura de test.
- Uma boa API de matches https://github.com/sapegin/jest-cheat-sheet#matchers.

### A Biblioteca de testes do react tem alguns benefícios sobre a enzyme:

- API muito mais simples.
- Consultas convenientes (rótulo do formulário, alt da imagem, função ARIA ).
- Consultas assíncronas e utilitários.
- Melhores mensagens de erro.
- Configuração mais fácil.
- Bibliotecas para outras estruturas com as mesmas consultas.
- Recomendado pela equipe React.

A React Testing Library ajuda a escrever bons testes e dificulta a escrita de testes ruins. Ele permite que você consulte elementos semelhantes à maneira como um usuário faria isso: por exemplo, consulte elementos e botões do formulário por seus rótulos.


## Testando manipuladores de eventos

Quando testamos unitariamente um único componente, os manipuladores de eventos geralmente são definidos no componente pai e não há alterações visíveis como reação a esses eventos. Eles também definem a  API de um componente que queremos testar.

jest.fn() cria uma função spy, que permite verificar quantas vezes ela foi chamada e com quais parâmetros.

## Testes assíncronos
### Mock
### Injeção de dependência 

## Rotas - React-router
### history

## Redux ?
## Context
