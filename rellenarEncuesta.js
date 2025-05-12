const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // headless: false para ver lo que pasa
  const page = await browser.newPage();
  await page.goto('https://www.allcounted.com/s?did=s14brola4pmuz&lang=es_MX', {
    waitUntil: 'networkidle2'
  });

  await new Promise(resolve => setTimeout(resolve, 5000)); // espera por carga dinámica

  // Espera a que las preguntas estén presentes
  await page.waitForSelector('.question-content');

  // Obtiene todas las preguntas y selecciona una respuesta aleatoria para cada una
  const respuestas = await page.evaluate(() => {
    const preguntas = Array.from(document.querySelectorAll('.question-content'));

    return preguntas.map(pregunta => {
      const opciones = Array.from(pregunta.querySelectorAll('input[type="radio"]'));
      if (opciones.length === 0) return null;

      const opcion = opciones[Math.floor(Math.random() * opciones.length)];
      return opcion.id; // ID del botón radio para hacer click luego
    }).filter(Boolean);
  });

  // Marca cada respuesta aleatoria (dentro del navegador)
  for (const id of respuestas) {
    await page.click(`#${id}`);
    await new Promise(resolve => setTimeout(resolve, 300)); // pequeña pausa entre clics
  }

  // Espera a que el botón "Siguiente" o "Enviar" esté disponible y haz clic
  const siguienteSelector = 'button.btn-next, button[type="submit"]';

  const siguienteExiste = await page.$(siguienteSelector);
  if (siguienteExiste) {
    await page.click(siguienteSelector);
    console.log("Encuesta completada y enviada (si aplica).");
  } else {
    console.log("Encuesta llenada, pero no se encontró botón de envío.");
  }

  // Cierra el navegador (opcional)
  // await browser.close();
})();
