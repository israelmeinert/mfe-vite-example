# Como usar o componente PieChart em outro projeto

## 1. Configuração do projeto host

No seu projeto que vai consumir o componente, configure o Vite Federation:

```tsx
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_app',
      remotes: {
        remote_app: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
```

## 2. Uso do componente

```tsx
// App.tsx
import React, { Suspense } from 'react';

// Importação dinâmica do componente
const PieChart = React.lazy(() => import('remote_app/PieChart'));

function App() {
  return (
    <div>
      <h1>Meu App Principal</h1>
      
      <Suspense fallback={<div>Carregando gráfico...</div>}>
        <PieChart 
          gastos={1500} 
          receitas={3000} 
          title="Relatório Financeiro Mensal"
        />
      </Suspense>
    </div>
  );
}

export default App;
```

## 3. Exemplo com dados dinâmicos

```tsx
import React, { Suspense, useState } from 'react';

const PieChart = React.lazy(() => import('remote_app/PieChart'));

function App() {
  const [gastos, setGastos] = useState(2000);
  const [receitas, setReceitas] = useState(5000);

  return (
    <div>
      <h1>Dashboard Financeiro</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Gastos: 
          <input 
            type="number" 
            value={gastos} 
            onChange={(e) => setGastos(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Receitas: 
          <input 
            type="number" 
            value={receitas} 
            onChange={(e) => setReceitas(Number(e.target.value))}
          />
        </label>
      </div>

      <Suspense fallback={<div>Carregando gráfico...</div>}>
        <PieChart 
          gastos={gastos} 
          receitas={receitas} 
          title="Análise Financeira em Tempo Real"
        />
      </Suspense>
    </div>
  );
}

export default App;
```

## 4. Instalação das dependências

No projeto host, instale as dependências necessárias:

```bash
npm install @originjs/vite-plugin-federation
```

## 5. Executando os projetos

1. **Micro-front (servidor remoto):**
   ```bash
   cd micro-front
   npm run dev
   # Servidor rodando em http://localhost:5001
   ```

2. **Projeto host:**
   ```bash
   npm run dev
   # Seu app principal
   ```

## Características do componente

- ✅ Responsivo
- ✅ Formatação em reais brasileiros
- ✅ Cálculo automático de percentuais
- ✅ Exibição do saldo
- ✅ Tooltips informativos
- ✅ Cores diferenciadas para gastos e receitas
- ✅ Exportado via Vite Federation
- ✅ TypeScript com tipagem completa 