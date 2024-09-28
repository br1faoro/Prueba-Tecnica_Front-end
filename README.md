# Test Técnico Frontend

Author(s): Bruno Luciano Faoro Vera

Status: In Review

Ultima actualización: 2024-09-28

## Content
- Environment
- Install
- Tests
- Goals
- Non-Goals
- Background
- Overview
- Detailed Design
  - Solution
    - Frontend
- Considerations
- Metrics

## Objective
El objetivo de este proyecto es crear una aplicación web utilizando React, TypeScript, Vite, React Router, Jest, React Testing Library, TanStack Query y Sass, diseñada para buscar y mostrar información de usuarios en GitHub mediante su API. Además, se implementarán funcionalidades adicionales como filtro de búsqueda, estados de carga y manejo de errores para mejorar la experiencia del usuario.

## Environment
- Node.js v20.16.0

## Install
Para instalar las dependencias del proyecto, ejecutar el siguiente comando:
```bash
npm install --legacy-peer-deps
```

Para iniciar la aplicación en modo de desarrollo, ejecutar el siguiente comando:
```bash
npm run dev
```

## Tests
Para ejecutar las pruebas unitarias, ejecutar el siguiente comando:
```bash
npm run test
```

Para generar el reporte de cobertura de las pruebas unitarias, ejecutar el siguiente comando:
```bash
npm run test:coverage
```

## Goals
- Crear una aplicación web utilizando React y TypeScript.
- Utilizar la API de GitHub para buscar y mostrar información de usuarios.
- Implementar un filtro de búsqueda para mejorar la experiencia del usuario.
- Mostrar estados de carga y manejar errores para mejorar la experiencia del usuario.

## Non-Goals
- No se implementarán funcionalidades adicionales que no estén relacionadas con la búsqueda y visualización de información de usuarios en GitHub.

## Background
Este proyecto surge de la necesidad de crear una aplicación web que permita buscar y mostrar información de usuarios en GitHub. La aplicación debe ser fácil de usar y proporcionar una experiencia agradable al usuario. Todo esto teniendo en cuentas las tecnologías y herramientas que se utilizarán para su desarrollo y las ya mencionadas.

## Overview
Necesitamos una API que busque por un nombre de usuario en GitHub y muestre la información de 10 usuarios.

GitHub ofrece una API que podemos usar para obtener:
- Información de los 10 usuarios si coinciden con el nombre de usuario buscado.
- Información de un usuario específico si se selecciona uno de los 10 usuarios mostrados.

## Solution
### Frontend
El frontend de la aplicación se desarrollará utilizando React, TypeScript, Vite, React Router, Jest, React Testing Library, TanStack Query y Sass.

La arquitectura del proyecto como su organización está basado en "Feature-based architecture". Cada feature tiene su propia carpeta con los archivos necesarios para su implementación. Además, se han creado carpetas para los componentes comunes y de UI, hooks, servicios, tipos, constantes, rutas, proveedores, utilidades y pruebas.

## Considerations
Criterios de evaluación:
- Organización.
- Código bien estructurado y seguir buenas prácticas de desarrollo.
- La calidad del código debe ser: claro, bien documentado y usar los principios de scss.
- Debe tener pruebas unitarias y de integración.
- Se espera un minimo de 80% de cobertura en las pruebas unitarias.
- Utilizar metodología BEM.

## Metrics
Cobertura de pruebas:
- Se debe alcanzar al menos un 80% de cobertura en las pruebas unitarias.
