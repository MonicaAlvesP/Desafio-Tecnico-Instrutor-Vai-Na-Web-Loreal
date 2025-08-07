![StreamFlix Logo](./src/assets/Logo.png)

# Plataforma de Streaming de Filmes do Studio Ghibli

StreamFlix é uma plataforma de streaming que oferece uma interface intuitiva para explorar o catálogo de filmes do [Studio Ghibli](https://studioghibli.com.br/?srsltid=AfmBOop3F9tmLv74W8YnVl3O5tjbVqUfXKPLoPTQj4ChAeAjMbCSJcnk). O projeto foi desenvolvido como parte do desafio técnico para a posição de instrutor no programa Vai Na Web da L'Oréal.

![Screenshot da Interface](./src//assets/screenshot.png)

## Guia de Navegação
Este guia tem como objetivo ajudar os usuários a navegar pela plataforma e utilizar suas funcionalidades de forma eficiente.

### Navegação Principal

- **Barra de Navegação Superior**: Acesse as principais seções da plataforma (Início, Séries, Filmes, Minha Lista)
- **Menu Hambúrguer**: Em dispositivos móveis, o menu se transforma em um ícone de hambúrguer que expande as opções de navegação

### Interações Disponíveis

1. **Explorar Conteúdo**:

  - Na página inicial, role para baixo para ver os filmes em destaque
  - Clique sobre as imagens dos filmes para ver uma prévia sobre ele no banner principal
  - Clique no botão "Ver Detalhes" para acessar a página de detalhes do filme

2. **Adicionar à Minha Lista**:

  - Clicando sobre a imagem do filme, a prévia dele será exibida e um botão "Adicionar à lista" aparece
  - Clique nesse botão para adicionar o filme à sua lista pessoal
  - A lista é acessível através do menu "Minha Lista" na barra de navegação
  - **Observação**:
    - A lista é salva no armazenamento local do navegador
    - Você pode acessar sua lista a qualquer momento
    - A lista permanece mesmo após fechar o navegador
    - **Importante**: A lista é salva localmente, portanto, não será compartilhada entre diferentes dispositivos ou navegadores

3. **Pesquisar Conteúdo**:

  - Clique no ícone de lupa no cabeçalho
  - Digite o título do filme desejado
  - Os resultados aparecem automaticamente enquanto você digita
  - **Observação**:
    - A pesquisa é sensível a maiúsculas e minúsculas
    - Se nenhum resultado for encontrado, uma mensagem de erro será exibida
    - Na página de pesquisa já existe uma lista de filmes mais populares para facilitar a navegação

4. **Ver Detalhes**:

  - Na página de detalhes, você encontrará:
    - Imagem de capa
    - Título
    - Diretor
    - Produtor
    - Ano de lançamento
    - Duração
    - Sinopse

5. **Navegação Responsiva**:
  - Em telas menores, o layout se adapta automaticamente
  - O menu se transforma em um painel lateral que pode ser aberto e fechado

### Dicas de Uso

- Utilize a rolagem horizontal nas listas de filmes
- Experimente a função de busca para encontrar rapidamente um título específico
- Verifique sua "Minha Lista" para acessar rapidamente os conteúdos salvos

## Telas Funcionais

A aplicação conta com as seguintes telas implementadas e funcionais:

- **Página Inicial**: Exibe os destaques e filmes em alta com banner principal
- **Página de Detalhes**: Mostra informações completas sobre o filme selecionado
- **Minha Lista**: Exibe os filmes salvos pelo usuário
- **Pesquisa**: Permite buscar filmes por título
- **Página de Erro**: Exibida quando uma rota não existe

As telas de Configurações, Filmes e Séries são demonstrativas e representam a estrutura de navegação completa.

## Tecnologias Utilizadas

- **React 19**: Biblioteca JavaScript para construção de interfaces
- **React Router v6**: Navegação entre páginas
- **Context API**: Gerenciamento de estado global
- **Axios**: Cliente HTTP para requisições à API
- **SASS/SCSS**: Pré-processador CSS para estilização avançada
- **React Icons**: Biblioteca de ícones
- **Vite**: Ferramenta de build rápida para desenvolvimento

## API Utilizada

O projeto consome a API do Studio Ghibli para obter informações detalhadas sobre os filmes:

- **Endpoint principal**: `https://ghibliapi.vercel.app/films`
- **Dados utilizados**: títulos, descrições, diretores, imagens, ano de lançamento e mais
- **Implementação**: Os dados são buscados através do Axios e gerenciados pelo Context API para disponibilização global na aplicação

## Instalação e Uso

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

### Passos para instalação

1. Clone o repositório:

```bash
git clone https://github.com/MonicaAlvesP/Desafio-Tecnico-Instrutor-Vai-Na-Web-Loreal.git
cd Desafio-Tecnico-Instrutor-Vai-Na-Web-Loreal
```
2. Instale as dependências:

```bash
npm install
# ou
yarn install
```
3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```
4. Acesse a aplicação em seu navegador:

http://localhost:5173

Feito com dedicação por [M.A](https://github.com/MonicaAlvesP).