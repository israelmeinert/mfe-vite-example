# Componente PieChart

Este componente cria um gráfico de pizza (pie chart) que compara gastos e receitas.

## Propriedades

- `gastos` (number, obrigatório): Valor total dos gastos
- `receitas` (number, obrigatório): Valor total das receitas  
- `title` (string, opcional): Título do gráfico (padrão: "Gastos vs Receitas")

## Exemplo de Uso

```tsx
import PieChart from './PieChart';

function App() {
  return (
    <PieChart 
      gastos={2500} 
      receitas={4000} 
      title="Meu Gráfico Financeiro"
    />
  );
}
```

## Características

- Gráfico responsivo que se adapta ao tamanho do container
- Cores diferentes para gastos (vermelho) e receitas (verde)
- Tooltip com valores formatados em reais e percentuais
- Exibição do saldo (receitas - gastos)
- Formatação de números em português brasileiro
- Lenda posicionada na parte inferior

## Exportação via Vite Federation

O componente está configurado para ser exportado via Vite Federation e pode ser usado em outros projetos:

```tsx
// Em outro projeto
import PieChart from 'http://localhost:5001/assets/PieChart.js';

// Uso
<PieChart gastos={1000} receitas={3000} />
``` 