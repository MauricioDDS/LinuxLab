# LinuxLab UFPS

Laboratorio virtual de Linux para la asignatura de Sistemas Operativos de la
Universidad Francisco de Paula Santander. La plataforma reúne en un mismo lugar el
material teórico del temario, una terminal Linux accesible desde el navegador y
actividades prácticas con evaluación automática. Maneja dos roles: el docente, que
crea cursos, arma actividades y hace seguimiento; y el estudiante, que estudia los
temas, practica en la terminal y resuelve las actividades de su curso.

## Requisitos

- [Bun](https://bun.sh) (recomendado) o Node.js 20+
- Git

## Ejecución

```bash
git clone https://github.com/MauricioDDS/LinuxLab.git
cd LinuxLab
bun install
bun run dev
```

La aplicación queda en http://localhost:3000.

El inicio de sesión todavía no está implementado. Para entrar directo a la aplicación:

- Vista de estudiante: http://localhost:3000/inicio
- Vista de docente: http://localhost:3000/docente

(Las barras laterales tienen un enlace para cambiar entre ambas vistas.)

## Scripts

```bash
bun run dev        # entorno de desarrollo
bun run build      # compilación de producción
bun run start      # sirve la compilación de producción
bun run typecheck  # revisa los tipos con tsc
```

## Estructura

```
app/                    Rutas (App Router de Next.js)
components/             Componentes de UI (components/ui son de shadcn)
content/temario/       Contenido de las lecciones en Markdown
lib/
  domain/              Modelos y tipos del dominio
  content/             Temario (14 temas) y lector de contenido
  data/                Capa de acceso a datos (pendiente de backend)
  auth/                Sesión y autenticación (correo + contraseña)
  config/              Variables de entorno
```

## Temario y contenido

El temario son 14 temas fijos definidos en `lib/content/temario.ts`. El contenido
de cada tema (texto, ejemplos, enlaces) vive como archivos Markdown dentro de
`content/temario/tema-NN/`, descritos por un `meta.json` con los subtemas y los
recursos. Para publicar un tema basta con agregar su carpeta; no hay que tocar
código. El Tema 1 (Introducción a Linux) ya está completo y sirve de referencia.

## Tecnologías

Next.js 16, React 19, TypeScript, Tailwind CSS 4 y shadcn/ui.

## Pendientes

- Backend y base de datos (persistencia de cursos, estudiantes y calificaciones)
- Autenticación real con correo y contraseña
- Terminal Linux funcional (Xterm.js + WebSocket contra el servidor del laboratorio)
- Evaluación automática de las actividades
- Resto del contenido del temario
