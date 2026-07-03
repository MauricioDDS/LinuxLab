# Software libre y licenciamiento

## ¿Qué es el software libre?

El software libre no se refiere al precio sino a la libertad. El proyecto GNU define cuatro libertades esenciales que un software debe garantizar para considerarse libre:

- **Libertad 0:** Ejecutar el programa para cualquier propósito.
- **Libertad 1:** Estudiar cómo funciona el programa y adaptarlo a tus necesidades. El acceso al código fuente es una condición previa para esto.
- **Libertad 2:** Redistribuir copias para ayudar a otros.
- **Libertad 3:** Mejorar el programa y publicar las mejoras para que toda la comunidad se beneficie.

Un software que cumple estas cuatro libertades es software libre. Linux, las herramientas GNU, Firefox, LibreOffice, GIMP y miles de otros programas se distribuyen bajo estas condiciones.

## Software libre vs. software de código abierto

Aunque frecuentemente se usan como sinónimos, "software libre" (free software) y "código abierto" (open source) tienen matices diferentes:

**Software libre** (Free Software Foundation): Enfatiza la libertad del usuario como un imperativo ético. El acceso al código fuente es un derecho fundamental.

**Código abierto** (Open Source Initiative): Enfatiza las ventajas prácticas del modelo de desarrollo colaborativo: mejor calidad, seguridad por auditoría pública, innovación más rápida.

En la práctica, la gran mayoría del software que cumple una definición también cumple la otra. El término **FOSS** (Free and Open Source Software) o **FLOSS** (Free/Libre and Open Source Software) se usa para abarcar ambas perspectivas sin entrar en el debate filosófico.

## Licencias de software libre

Una licencia es el documento legal que define los términos bajo los cuales se puede usar, modificar y distribuir un software. Las principales licencias de software libre se dividen en dos categorías:

### Licencias copyleft

Exigen que cualquier trabajo derivado se distribuya bajo la misma licencia. Si modificas un programa con licencia copyleft y lo redistribuyes, debes publicar tu versión modificada bajo la misma licencia libre.

**GPL (General Public License):** La licencia más representativa del movimiento del software libre, creada por Richard Stallman. El kernel Linux está licenciado bajo GPLv2. Las herramientas GNU usan GPLv3. Si tomas código GPL, lo modificas y distribuyes el resultado, estás obligado a liberar tu código modificado bajo GPL también.

**LGPL (Lesser GPL):** Una versión más permisiva de la GPL que permite enlazar bibliotecas LGPL con software propietario sin que este deba ser liberado. Se usa comúnmente en bibliotecas de software.

**AGPL (Affero GPL):** Extiende la GPL para cubrir software que se ejecuta en servidores web. Si modificas un programa AGPL y lo ofreces como servicio en internet, debes publicar tus modificaciones.

### Licencias permisivas

Permiten que el código sea incorporado en software propietario sin obligación de liberar las modificaciones.

**MIT:** Una de las licencias más simples y permisivas. Permite hacer prácticamente cualquier cosa con el código siempre que se incluya el aviso de copyright original.

**BSD:** Similar a la MIT, con variantes de 2 y 3 cláusulas. FreeBSD y macOS (derivado de BSD) son ejemplos de su uso.

**Apache 2.0:** Permisiva como la MIT pero incluye una cláusula explícita sobre patentes. Utilizada por Android, Kubernetes y muchos proyectos de la Apache Foundation.

## ¿Por qué importa el licenciamiento?

Como ingeniero de sistemas, entender las licencias no es un ejercicio teórico. Tiene implicaciones directas en el trabajo profesional:

- Si tu empresa incorpora una biblioteca GPL en un producto, puede estar obligada a liberar todo el código fuente del producto.
- Si usas una herramienta MIT o Apache en un proyecto comercial, tienes libertad de hacerlo sin restricciones significativas.
- Si contribuyes a un proyecto de código abierto, tu contribución queda sujeta a la licencia del proyecto.

```bash
# En muchos sistemas Linux puedes ver la licencia de los paquetes instalados
# En distribuciones basadas en Debian:
dpkg --info nombre_paquete | grep License

# La licencia del kernel Linux
head -20 /usr/share/doc/linux-base/copyright 2>/dev/null || echo "Archivo no disponible en este entorno"

# Muchos proyectos incluyen un archivo LICENSE en su directorio raíz
cat /usr/share/doc/bash/copyright 2>/dev/null | head -30
```

## El ecosistema de Linux como ejemplo

Linux es posiblemente el mejor ejemplo del éxito del modelo de software libre. Un sistema operativo que comenzó como el proyecto personal de un estudiante universitario hoy es la base de la infraestructura tecnológica global: servidores, nube, smartphones, supercomputadores, dispositivos embebidos, automóviles y satélites.

Este éxito no ocurrió a pesar de ser software libre, sino precisamente porque lo es. La libertad de estudiar, modificar y redistribuir el código permitió que miles de desarrolladores y empresas contribuyeran al proyecto, creando un ciclo de mejora continua que ningún equipo cerrado podría igualar.
