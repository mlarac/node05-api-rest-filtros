# API de Joyas

Esta es una API RESTful para gestionar un inventario de joyas. Permite obtener información sobre joyas, con opciones de paginación y filtrado.

## Características

- Obtener lista de joyas con paginación
- Filtrar joyas por precio, categoría y metal
- Ordenamiento de resultados
- Implementación de HATEOAS
- Manejo de errores
- Logging de actividad en rutas específicas

## Tecnologías Utilizadas

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- cors

## Instalación

1. Clona este repositorio:
# API de Joyas

Esta es una API RESTful para gestionar un inventario de joyas. Permite obtener información sobre joyas, con opciones de paginación y filtrado.

## Características

- Obtener lista de joyas con paginación
- Filtrar joyas por precio, categoría y metal
- Ordenamiento de resultados
- Implementación de HATEOAS
- Manejo de errores
- Logging de actividad en rutas específicas

## Tecnologías Utilizadas

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- cors

### Endpoints

   GET /api/v1/joyas

   Parámetros de query opcionales:
- `limits`: Número de joyas por página (default: 10)
- `page`: Número de página (default: 1)
- `order_by`: Ordenamiento (ejemplo: "precio_ASC" o "precio_DESC")


   GET /api/v1/joyas/filtros

Parámetros de query opcionales:
- `precio_min`: Precio mínimo
- `precio_max`: Precio máximo
- `categoria`: Categoría de la joya
- `metal`: Tipo de metal
