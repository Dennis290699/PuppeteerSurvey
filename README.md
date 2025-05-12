# Automatización de Encuesta con Puppeteer

Este proyecto permite automatizar el llenado de una encuesta en línea en el sitio **AllCounted** utilizando **Puppeteer**. El proyecto está compuesto por dos scripts que permiten extraer la estructura de la encuesta y luego enviar respuestas aleatorias a las preguntas.

## Requisitos

* **Node.js** (v16 o superior)
* **Puppeteer** (se instala automáticamente con `npm install`)

## Instalación

1. **Clona el repositorio** o **descarga los archivos**:

   Si tienes **Git**, clona el repositorio en tu máquina:

   ```bash
   git clone <URL-del-repositorio>
   cd <PuppeteerSurvey>
   ```

2. **Instala las dependencias** del proyecto ejecutando el siguiente comando en tu terminal:

   ```bash
   npm install
   ```

3. **Asegúrate de tener una versión de Node.js compatible**:
   Puedes verificar tu versión de Node.js con:

   ```bash
   node -v
   ```

---

## Scripts

### 1. `extraerEncuesta.js`

Este script obtiene la estructura de la encuesta, incluyendo todas las preguntas y opciones de respuesta, y las guarda en un archivo `estructura_encuesta.json`.

#### ¿Cómo usarlo?

1. Asegúrate de haber instalado las dependencias con `npm install`.

2. Ejecuta el script con:

   ```bash
   node extraerEncuesta.js
   ```

3. El script extraerá la estructura de la encuesta desde el siguiente enlace:

   ```
   https://www.allcounted.com/s?did=s14brola4pmuz&lang=es_MX
   ```

4. El resultado se guardará en un archivo llamado `estructura_encuesta.json` dentro de tu directorio actual.

#### ¿Qué hace este script?

* **Navega** al sitio web de la encuesta.
* **Extrae** las preguntas y sus opciones de respuesta.
* **Guarda** la estructura en un archivo JSON llamado `estructura_encuesta.json` para su posterior uso.

---

### 2. `automatarEncuesta.js`

Este script automatiza el llenado de la encuesta generando respuestas aleatorias para cada pregunta.

#### ¿Cómo usarlo?

1. Asegúrate de haber instalado las dependencias con `npm install`.

2. Ejecuta el script con:

   ```bash
   node automatarEncuesta.js
   ```

3. El script navegará a la encuesta, seleccionará respuestas aleatorias para cada pregunta y enviará la encuesta.

#### ¿Qué hace este script?

* **Navega** al sitio web de la encuesta.
* **Espera** un tiempo para asegurarse de que el contenido de la encuesta se haya cargado completamente.
* **Selecciona aleatoriamente** una opción de respuesta para cada pregunta.
* **Envía** las respuestas al hacer clic en el botón de "Siguiente" o "Enviar".
* **Permite** ver el progreso mientras se llena la encuesta en el navegador.

---

## Consideraciones

* El **script de automatización** interactúa con la página, por lo que abrirá un navegador visible (puedes modificarlo para que sea en modo headless cambiando el parámetro en el código).
* **La encuesta debe estar activa y accesible** en el enlace para que el script funcione.
* **Pausa entre clics**: Se agrega una pequeña pausa de 300 ms entre clics para simular la interacción humana y evitar ser bloqueado por la página.

---

## Contribuciones

Si deseas contribuir al proyecto:

1. **Haz un fork** del repositorio.
2. **Realiza los cambios** que desees en tu fork.
3. **Envía un pull request** con tus cambios.

---

## Licencia

Este proyecto está bajo la Licencia MIT.

---

### Ejemplo de estructura del archivo JSON (`estructura_encuesta.json`):

```json
[
  {
    "pregunta": "1. Edad",
    "opciones": [
      {
        "valor": "3797645",
        "texto": "a) Entre 13 y 20"
      },
      {
        "valor": "3797646",
        "texto": "b) Entre 20 y 30"
      }
    ]
  }
]
```
