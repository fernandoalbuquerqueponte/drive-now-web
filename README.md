# 🚗 Drive Now - Marketplace de Aluguel de Veículos

> **Plataforma robusta de gerenciamento e catálogo para marketplace de aluguel/venda de veículos com painel administrativo intuitivo e funcionalidades avançadas de upload de mídia.**

---

## 📋 Sobre o Projeto

**Drive Now** é uma aplicação web desenvolvida com as mais modernas tecnologias do ecossistema React, focada em proporcionar uma experiência fluida e profissional no gerenciamento de um catálogo de veículos. O painel administrativo permite que os usuários cadastrem, editem e visualizem carros com especificações detalhadas, garantindo dados limpos e validados através de rigorosos esquemas de validação.

A aplicação é ideal para agências de aluguel, concessionárias e marketplaces de vendas que necessitam de uma solução moderna e escalável para gerenciar seus inventários de veículos.

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)

![React Router](https://img.shields.io/badge/React%20Router-7.14.2-F44250?logo=reactrouter&logoColor=white&style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.74.0-EC5990?logo=reacthookform&logoColor=white&style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.100.5-FF4154?logo=reactquery&logoColor=white&style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-1.15.2-671DDC?logo=axios&logoColor=white&style=for-the-badge)

</div>

### Principais Dependências

| Pacote                  | Versão  | Propósito                                      |
| ----------------------- | ------- | ---------------------------------------------- |
| **Shadcn/UI**           | Latest  | Componentes UI customizáveis baseados em Radix |
| **Lucide React**        | 1.16.0  | Biblioteca de ícones moderna                   |
| **React Number Format** | 5.4.5   | Máscaras inteligentes para valores monetários  |
| **Sonner**              | 2.0.7   | Toasts de notificação elegantes                |
| **React Image Crop**    | 11.0.10 | Ferramenta avançada para corte de imagens      |
| **Zod**                 | Latest  | Validação de schemas TypeScript-first          |

---

## ✨ Funcionalidades Principais

### 🚙 CRUD / Upsert de Veículos

Fluxo dinâmico e intuitivo para criação e edição de carros através de modais interativos (Dialogs), permitindo gerenciamento eficiente do catálogo sem navegação entre páginas.

```
✓ Criar novo veículo
✓ Editar informações existentes
✓ Deletar do catálogo
✓ Visualizar detalhes completos
```

### 📸 Upload Avançado de Mídia

Sistema robusto de upload com suporte completo a:

- **Imagem Principal**: Upload de arquivo único com preview imediato
- **Galeria de Fotos**: Suporte a múltiplos arquivos com Drag & Drop
- **Validações**:
  - Tamanho máximo de 3MB por arquivo
  - Suporte a formatos: JPG, PNG, WebP
  - Limite de quantidade de fotos configurável
  - Validação em tempo real com feedback visual

### ✅ Validação Estrita de Formulários

Gerenciamento de formulários complexos com:

- Integração com **React Hook Form** para performance otimizada
- Schemas robusto com **Zod** garantindo tipagem e validação
- Validação em tempo real e ao submeter
- Mensagens de erro contextualizadas
- Suporte a campos condicionais

### 💰 Máscaras Inteligentes

Formatação automática de inputs monetários:

- Máscara de preço em tempo real (BRL - Real Brasileiro)
- Cursor não é travado durante digitação
- Suporte a números inteiros e decimais
- Integrado com validação de formulário

### 🏷️ Gerenciamento de Tags

Sistema de seleção múltipla para características adicionais do veículo:

- Combobox inteligente com busca
- Seleção e remoção rápida
- Lista dinamicamente carregada
- Suporte a criação de novas tags

---

## 🚀 Como Executar o Projeto

### 📦 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** `>= 16.x` ([Download](https://nodejs.org/))
- **npm** `>= 8.x` ou **pnpm** / **yarn** (gerenciadores de pacotes alternativos)
- **Git** para controle de versão

### ⚙️ Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/fernandoalbuquerqueponte/drive-now.git
cd drive-now/web
```

2. **Instale as dependências**

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

### 🏃 Executar em Desenvolvimento

Inicie o servidor de desenvolvimento com hot module replacement (HMR):

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 📦 Build para Produção

Gere o build otimizado para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### 👁️ Preview do Build

Visualize o build de produção localmente antes de fazer deploy:

```bash
npm run preview
```

### 🔍 Linting

Verifique a qualidade do código e standards de estilo:

```bash
npm run lint
```

---

## 📁 Estrutura do Projeto

```
src/
├── pages/               # Páginas principais da aplicação
│   ├── auth.tsx         # Autenticação (Login/Sign Up)
│   ├── home.tsx         # Página inicial com listagem de carros
│   ├── car-details.tsx  # Detalhes de um veículo específico
│   ├── my-cars.tsx      # Gerenciamento de meus carros
│   ├── my-account.tsx   # Perfil do usuário
│   └── bookings.tsx     # Histórico de reservas
│
├── components/          # Componentes reutilizáveis
│   ├── ui/              # Componentes primitivos (Button, Input, etc)
│   ├── booking-*        # Componentes relacionados a reservas
│   ├── car-*            # Componentes relacionados a carros
│   ├── *-form.tsx       # Componentes de formulário
│   ├── header.tsx       # Cabeçalho da aplicação
│   ├── footer.tsx       # Rodapé
│   └── main-layout.tsx  # Layout principal
│
├── http/                # Camada de requisições HTTP
│   ├── api-client.ts    # Cliente Axios configurado
│   ├── use-*.ts         # Custom hooks para API calls
│   └── types/           # Tipos de resposta da API
│
├── hooks/               # Custom React Hooks
│   ├── use-as-ref.ts
│   ├── use-lazy-ref.ts
│   └── use-isomorphic-layout-effect.ts
│
├── schemas/             # Esquemas de validação (Zod)
│   └── car-form-schema.ts
│
├── constants/           # Constantes da aplicação
├── lib/                 # Utilitários e helpers
└── types/               # Tipos TypeScript globais
```

---

## 🔧 Configuração & Customização

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Drive Now
```

### Tailwind CSS

Configure o Tailwind conforme necessário no arquivo `tailwind.config.ts`. O projeto já vem pré-configurado com a maioria das extensões necessárias.

### Componentes Shadcn/UI

Para adicionar novos componentes do Shadcn/UI:

```bash
npx shadcn-ui@latest add [component-name]
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 📞 Suporte & Contato

Para dúvidas, issues ou sugestões:

- 📧 Email: ffernandoalbuquerqueponte@gmail.com

---

<div align="center">

**Feito com ❤️ usando React, TypeScript e Tailwind CSS**

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!

</div>
