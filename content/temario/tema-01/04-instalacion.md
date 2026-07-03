# Instalación de Linux

## Distribuciones de Linux

Linux no se distribuye como un único producto. El kernel Linux, combinado con diferentes conjuntos de software, configuraciones y gestores de paquetes, da lugar a lo que se conoce como **distribuciones** (o "distros"). Cada distribución empaqueta el kernel junto con las herramientas del sistema, un gestor de paquetes, un entorno de escritorio (opcional) y software preinstalado, creando un sistema operativo completo listo para usar.

Existen cientos de distribuciones, pero la mayoría se derivan de tres familias principales:

### Familia Debian

Utiliza el formato de paquetes `.deb` y el gestor de paquetes `apt`. Es conocida por su estabilidad y la amplitud de su repositorio de software.

- **Debian:** La distribución madre, extremadamente estable, preferida para servidores.
- **Ubuntu:** Basada en Debian, orientada a la facilidad de uso. Es la distribución más popular para escritorio y servidores.
- **Linux Mint:** Basada en Ubuntu, con un enfoque en la experiencia de escritorio tradicional.

### Familia Red Hat

Utiliza el formato de paquetes `.rpm` y los gestores de paquetes `yum` o `dnf`. Es la familia dominante en el ámbito empresarial.

- **Red Hat Enterprise Linux (RHEL):** Distribución comercial con soporte empresarial.
- **Fedora:** Distribución comunitaria que sirve como base de pruebas para RHEL. Incorpora tecnologías recientes.
- **CentOS Stream / AlmaLinux / Rocky Linux:** Alternativas gratuitas compatibles con RHEL.

### Familia Arch

Utiliza el gestor de paquetes `pacman` y sigue una filosofía de "rolling release" (actualizaciones continuas sin versiones fijas).

- **Arch Linux:** Distribución minimalista que el usuario construye desde cero. Ideal para aprender cómo funciona Linux internamente.
- **Manjaro:** Basada en Arch, pero con una instalación más accesible.

## Métodos de instalación

### Instalación en disco (bare metal)

La forma tradicional: descargar la imagen ISO de la distribución, grabarla en una memoria USB y arrancar el computador desde ella. El instalador guía el proceso de particionado del disco, configuración de usuarios y selección de software. Este método ofrece el mejor rendimiento posible pero modifica el disco del equipo.

### Máquina virtual

Utilizando software como VirtualBox, VMware o QEMU/KVM, se puede ejecutar Linux dentro de una ventana del sistema operativo actual sin modificar el disco. La máquina virtual simula un computador completo donde se instala Linux como si fuera hardware real. Es ideal para experimentar sin riesgos, aunque el rendimiento es menor al de una instalación nativa.

### Dual boot

Consiste en instalar Linux junto al sistema operativo existente (generalmente Windows) en el mismo disco, creando particiones separadas para cada uno. Al encender el computador, un menú permite elegir qué sistema operativo iniciar. Ofrece rendimiento nativo para ambos sistemas pero requiere gestionar el espacio del disco.

### WSL (Windows Subsystem for Linux)

Una capa de compatibilidad de Microsoft que permite ejecutar distribuciones Linux directamente dentro de Windows sin necesidad de una máquina virtual. Es práctico para desarrollo, aunque tiene limitaciones en el acceso al hardware y en ciertos aspectos del kernel.

### Contenedores y entornos en la nube

Servicios como Docker permiten ejecutar entornos Linux aislados sin instalar una distribución completa. Las plataformas en la nube (AWS, Google Cloud, Azure) ofrecen instancias Linux que se pueden crear y destruir en segundos. Este es el modelo que emplea el laboratorio LinuxLab para proporcionarte una terminal funcional sin que debas instalar nada.

## El proceso de instalación típico

Independientemente de la distribución elegida, la instalación generalmente incluye los siguientes pasos:

1. **Selección del idioma y teclado:** Configuración regional del sistema.
2. **Particionado del disco:** Definir cómo se divide el espacio de almacenamiento. Las particiones básicas son:
   - `/` (raíz): Donde se instala el sistema operativo.
   - `/home`: Donde se almacenan los archivos de los usuarios.
   - `swap`: Espacio de intercambio para extender la memoria RAM.
3. **Creación del usuario:** Definir el nombre de usuario y contraseña del administrador.
4. **Selección de software:** Elegir qué paquetes y entorno de escritorio instalar.
5. **Configuración del arranque:** Instalar el gestor de arranque (GRUB) que permite iniciar el sistema.

```bash
# Después de instalar, puedes verificar la distribución instalada
cat /etc/os-release

# Ver información del sistema
uname -a

# Ver el espacio en disco y las particiones
lsblk
df -h
```

## ¿Qué distribución usar?

Para el curso de Sistemas Operativos, la distribución específica es secundaria: los conceptos fundamentales (procesos, archivos, permisos, shell) son comunes a todas. El laboratorio LinuxLab utiliza un entorno basado en Debian/Ubuntu, que es la familia con mayor documentación disponible y la más utilizada en entornos educativos y servidores.

Si deseas instalar Linux en tu equipo personal para practicar fuera del laboratorio, Ubuntu o Linux Mint son las opciones más accesibles para comenzar.
