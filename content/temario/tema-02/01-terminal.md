<!-- IMAGE: terminal-linux.png | Terminal de línea de comandos en Linux -->

## La línea de comandos

La **línea de comandos** es un sistema de entrada de texto donde le dices al computador exactamente qué quieres que haga. Puedes escribir desde un comando simple hasta un script completo de cien líneas. Es directa, sin capas visuales en el medio.

## Cómo acceder a la terminal

En un sistema Linux con entorno gráfico hay dos formas de llegar a la terminal:

**Terminal de escritorio:** Es una aplicación dentro del entorno gráfico que abre una ventana con la línea de comandos. Según la distribución que uses, la encuentras buscando "terminal" en el menú de aplicaciones. En Ubuntu se llama GNOME Terminal, en KDE es Konsole. Todas hacen lo mismo.

**Terminal virtual:** Independiente del entorno gráfico. Se accede con las teclas **Ctrl + Alt + F2** hasta **F6**. Cada una es una sesión completamente separada. Para volver al entorno gráfico usas **Ctrl + Alt + F1** o **F7** dependiendo del sistema. Los servidores suelen arrancar directamente en una de estas, sin escritorio.

En LinuxLab trabajas desde la terminal integrada en la plataforma, que funciona igual que cualquiera de las dos anteriores.

## El shell

Cuando escribes un comando en la terminal y presionas Enter, la terminal no lo ejecuta directamente. Lo pasa al **shell**, que es el programa encargado de interpretar lo que escribiste y decirle al sistema operativo qué tiene que hacer. Si el comando produce una salida, el shell la muestra en pantalla. Si algo sale mal, muestra un error.

El shell es el puente entre tú y el kernel.

Linux permite usar varios shells distintos. El más común en la mayoría de distribuciones es **Bash** (Bourne Again Shell), y es el que usarás en este curso.

## Bash

Bash lleva décadas siendo el shell por defecto en Linux. Más allá de ejecutar comandos, tiene características que lo hacen especialmente útil:

- **Historial de comandos:** Puedes navegar los comandos anteriores con las flechas del teclado sin tener que escribirlos de nuevo.
- **Scripting:** Puedes guardar una secuencia de comandos en un archivo y ejecutarlos todos de una sola vez. Bash incluye estructuras como condicionales y funciones, lo que lo convierte en un lenguaje de programación básico.
- **Alias:** Puedes crear nombres cortos para comandos largos que usas con frecuencia.
- **Variables:** Permiten guardar información que puedes reutilizar dentro de la sesión o en scripts.

Cuando abres una terminal y ves el símbolo `$`, significa que Bash está listo para recibir un comando.

```bash
usuario@linuxlab:~$
```

Ese texto antes del `$` es el **prompt**: te indica tu nombre de usuario, el nombre del equipo y el directorio donde estás. El `~` representa tu directorio de inicio (home).

---

**Fuentes**

- NDG Linux Essentials. Cisco Networking Academy, 2024.
- Shotts, W. *The Linux Command Line*, 2nd Ed. No Starch Press, 2019. linuxcommand.org
