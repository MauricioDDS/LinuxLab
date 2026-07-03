# El Kernel

## ¿Qué es el kernel?

El kernel es el núcleo del sistema operativo. Es el software que se ejecuta directamente sobre el hardware y actúa como intermediario entre las aplicaciones del usuario y los recursos físicos del computador: el procesador, la memoria RAM, los discos de almacenamiento, las interfaces de red y los dispositivos periféricos.

Cuando ejecutas un comando en la terminal, abres un archivo o te conectas a internet, es el kernel quien gestiona cada una de esas operaciones a nivel de hardware. Las aplicaciones nunca interactúan directamente con los componentes físicos; siempre pasan por el kernel.

## Funciones principales del kernel

### Gestión de procesos

El kernel es responsable de crear, planificar y terminar procesos. Un proceso es una instancia de un programa en ejecución. En un sistema Linux típico hay cientos de procesos corriendo simultáneamente, y el kernel decide cuánto tiempo de CPU recibe cada uno, cuándo se ejecuta y cuándo se pausa.

```bash
# Ver los procesos en ejecución
ps aux

# Ver los procesos en tiempo real
top
```

### Gestión de memoria

El kernel administra la memoria RAM del sistema, asignando bloques de memoria a los procesos que lo solicitan y liberándolos cuando ya no se necesitan. También implementa la memoria virtual, que permite que los procesos utilicen más memoria de la que está físicamente disponible mediante el uso del espacio de intercambio (swap) en disco.

### Sistema de archivos

El kernel gestiona cómo se almacenan, organizan y recuperan los datos en los dispositivos de almacenamiento. Linux soporta múltiples sistemas de archivos: ext4 (el más común), XFS, Btrfs, NTFS (para compatibilidad con Windows), entre otros. Para el kernel, todo es un archivo: los documentos, los directorios, los dispositivos de hardware e incluso los procesos en ejecución se representan como archivos dentro de una estructura jerárquica.

### Gestión de dispositivos

El kernel se comunica con el hardware a través de controladores (drivers). Cada dispositivo conectado al computador necesita un controlador que le indique al kernel cómo interactuar con él. Linux incluye controladores para una enorme cantidad de hardware directamente en el kernel, lo que permite que la mayoría de dispositivos funcionen sin instalar software adicional.

### Comunicación de red

El kernel implementa los protocolos de red (TCP/IP, UDP, ICMP) que permiten al sistema comunicarse con otros computadores. Gestiona las interfaces de red, las tablas de enrutamiento, los sockets y las conexiones activas.

## Espacio de kernel vs. espacio de usuario

Linux divide la memoria en dos zonas claramente separadas:

**Espacio de kernel (kernel space):** Donde se ejecuta el kernel con acceso total al hardware. El código que corre aquí tiene privilegios completos sobre el sistema.

**Espacio de usuario (user space):** Donde se ejecutan las aplicaciones del usuario. Los programas en este espacio no pueden acceder al hardware directamente; deben solicitar al kernel que realice las operaciones mediante llamadas al sistema (system calls).

```
+-------------------------------------+
|        Aplicaciones del usuario     |
|     (bash, firefox, ls, grep...)    |
|           ESPACIO DE USUARIO        |
+-------------------------------------+
|          Llamadas al sistema        |
|     (open, read, write, fork...)    |
+-------------------------------------+
|               KERNEL                |
|  Gestión de procesos | Memoria      |
|  Sistema de archivos | Drivers      |
|  Red | Seguridad                    |
|           ESPACIO DE KERNEL         |
+-------------------------------------+
|              HARDWARE               |
|   CPU | RAM | Disco | Red | USB     |
+-------------------------------------+
```

Esta separación es fundamental para la seguridad y estabilidad del sistema: si una aplicación falla, no puede corromper el kernel ni afectar a otros procesos.

## Versión del kernel

Puedes verificar qué versión del kernel está ejecutando tu sistema con el comando:

```bash
uname -r
```

La salida mostrará algo como `6.1.0-18-amd64`, donde:
- `6` es la versión principal (major)
- `1` es la versión secundaria (minor)
- `0` es la revisión (patch)
- `18` es la revisión específica de la distribución
- `amd64` indica la arquitectura del procesador

## Kernel monolítico con módulos

El kernel Linux es **monolítico**, lo que significa que todas sus funciones principales se ejecutan en un solo espacio de memoria con privilegios completos. Sin embargo, soporta **módulos cargables** que permiten agregar o quitar funcionalidades (como controladores de hardware) sin necesidad de reiniciar el sistema.

```bash
# Ver los módulos cargados actualmente
lsmod

# Información sobre un módulo específico
modinfo nombre_del_modulo
```

Esta arquitectura combina el rendimiento de un kernel monolítico con la flexibilidad de poder cargar solo los componentes necesarios.
