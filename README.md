
# geo-range

**geo-range** é uma biblioteca simples que oferece uma função para calcular se um determinado ponto no mapa está dentro de uma lista de "targets" (destinos) baseados em coordenadas geográficas (latitude e longitude).

## Instalação

Você pode instalar a biblioteca usando npm ou yarn:

```bash
npm install geo-range
```

ou

```bash
yarn add geo-range
```

## Uso

### Função `isWithinTargets`

A função `isWithinTargets` verifica se um ponto (lat, lon) está dentro de uma lista de "targets" dentro de um determinado raio em quilômetros.

#### Parâmetros

- **point**: Um array contendo a latitude e longitude do ponto a ser verificado.  
  - Tipo: `[number, number]`
  - Exemplo: `[-14.797094, -39.278274]`

- **targets**: Uma lista de arrays, onde cada array contém a latitude e longitude de um "target" (destino) a ser verificado.
  - Tipo: `[[number, number], [number, number], ...]`
  - Exemplo: `[[-14.797858, -39.273536], [-14.789171, -39.263958]]`

- **rangeInKm** (opcional): O raio em quilômetros em torno dos "targets" em que o ponto deve estar. Se não for fornecido, o valor padrão é `5 km`.
  - Tipo: `number`
  - Exemplo: `10` (para um raio de 10 km)

#### Exemplo de Uso

```ts
import { isWithinTargets } from 'geo-range';

const point = [-23.5505, -46.6333]; // São Paulo, Brasil
const targets = [
  [-22.9068, -43.1729],  // Rio de Janeiro, Brasil
  [-25.4284, -49.2733],  // Curitiba, Brasil
];

const isWithin = isWithinTargets({
  point,
  targets,
  rangeInKm: 500, // 500 km de raio
});

console.log(isWithin); // Retorna true se o ponto estiver dentro do raio de algum target
```

#### Retorno

- **Boolean**: `true` se o ponto estiver dentro do raio de pelo menos um dos "targets", `false` caso contrário.

## Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests. Vamos adorar ver como você pode melhorar a **geo-range**!

## Licença

Este projeto está licenciado sob a licença MIT.
