# Entorno de ventanas

## La interfaz gráfica en Linux

A diferencia de Windows o macOS, donde la interfaz gráfica está integrada directamente en el sistema operativo, en Linux la interfaz gráfica es un componente separado y opcional. Un servidor Linux puede funcionar perfectamente sin interfaz gráfica, operando exclusivamente desde la línea de comandos. Esta separación es una decisión de diseño: el sistema operativo gestiona recursos, la interfaz gráfica es solo una forma de interactuar con él.

## Componentes del sistema gráfico

La interfaz gráfica de Linux se compone de varias capas independientes que trabajan juntas:

### Servidor de pantalla

Es el software que se comunica con el hardware gráfico (tarjeta de video, monitor) y proporciona la base sobre la cual se dibujan las ventanas. Existen dos tecnologías principales:

**X11 (X Window System):** El sistema tradicional, desarrollado desde 1984. Utiliza una arquitectura cliente-servidor donde las aplicaciones (clientes) solicitan al servidor X que dibuje ventanas en la pantalla. Aunque funcional, su diseño tiene décadas de antigüedad.

**Wayland:** El reemplazo moderno de X11. Simplifica la arquitectura eliminando la capa intermedia del servidor X, lo que resulta en mejor rendimiento, menor latencia y mayor seguridad. Las distribuciones modernas como Fedora y Ubuntu ya usan Wayland por defecto.

### Entorno de escritorio

Es el conjunto de aplicaciones y herramientas que conforman la experiencia visual completa: el panel de tareas, el escritorio, el gestor de archivos, el menú de aplicaciones, las notificaciones, la configuración del sistema. Linux ofrece varios entornos de escritorio, cada uno con su propia filosofía de diseño:

**GNOME:** El entorno por defecto de Ubuntu, Fedora y muchas otras distribuciones. Tiene un diseño minimalista y moderno centrado en la productividad, con un flujo de trabajo basado en actividades y espacios de trabajo virtuales.

**KDE Plasma:** Altamente personalizable, con una estética similar a Windows. Ofrece una cantidad enorme de opciones de configuración y efectos visuales. Es el entorno por defecto de KDE Neon y Kubuntu.

**XFCE:** Ligero y eficiente, diseñado para funcionar bien en hardware con recursos limitados sin sacrificar funcionalidad. Consume significativamente menos memoria que GNOME o KDE.

**MATE:** Continuación del antiguo GNOME 2, ofrece una interfaz tradicional con barra de menú, panel de tareas y escritorio clásico. Ideal para quienes prefieren una experiencia convencional.

**Cinnamon:** Desarrollado por el equipo de Linux Mint, combina la modernidad de GNOME 3 con una disposición de escritorio tradicional.

### Gestor de ventanas

Es el componente que controla cómo se posicionan, redimensionan y organizan las ventanas en la pantalla. Cada entorno de escritorio incluye su propio gestor de ventanas, pero también existen gestores independientes para usuarios avanzados:

**Gestores de ventanas de mosaico (tiling):** Como i3, Sway, Hyprland o dwm. Organizan las ventanas automáticamente sin superponerlas, maximizando el uso del espacio en pantalla. Son controlados principalmente por teclado y son populares entre desarrolladores y administradores de sistemas.

**Gestores de ventanas flotantes (floating):** Como Openbox o Fluxbox. Las ventanas flotan libremente y pueden superponerse, similar a Windows o macOS.

## ¿Por qué importa esto para Sistemas Operativos?

En el contexto de este curso, la mayor parte del trabajo se realiza desde la **terminal de línea de comandos**, no desde la interfaz gráfica. La terminal permite una interacción directa con el sistema operativo: gestionar archivos, administrar procesos, configurar permisos y automatizar tareas mediante scripts.

La interfaz gráfica abstrae y oculta la complejidad del sistema, lo cual es útil para el uso cotidiano pero insuficiente para comprender cómo funciona internamente un sistema operativo. La línea de comandos expone esa complejidad y permite manipularla directamente.

```bash
# Verificar si tienes un entorno gráfico activo
echo $XDG_CURRENT_DESKTOP

# Ver el servidor de pantalla en uso
echo $XDG_SESSION_TYPE

# Estos comandos pueden no mostrar nada si estás en un servidor sin interfaz gráfica
# Eso es perfectamente normal — el sistema funciona sin ella
```

En el laboratorio virtual de LinuxLab, trabajarás directamente con la terminal. No hay interfaz gráfica, y eso es intencional: el objetivo es que aprendas a interactuar con el sistema operativo tal como lo harías administrando un servidor real.
