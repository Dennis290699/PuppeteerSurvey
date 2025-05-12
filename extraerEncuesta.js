const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // true para oculto
  const page = await browser.newPage();

  await page.goto('https://www.allcounted.com/s?did=s14brola4pmuz&lang=es_MX', {
    waitUntil: 'networkidle2'
  });

  await new Promise(resolve => setTimeout(resolve, 5000));


  const data = await page.evaluate(() => {
    const preguntas = [];

    const questionNodes = document.querySelectorAll('.question-content');

    questionNodes.forEach((qNode) => {
      const textoPregunta = qNode.querySelector('.question-text-inner')?.innerText?.trim() || 'Pregunta sin texto';

      const opciones = [];
      const opcionesNodes = qNode.querySelectorAll('.radio.choice-hidable');

      opcionesNodes.forEach((opt) => {
        const textoOpcion = opt.querySelector('.radio-checkbox-text')?.innerText?.trim() || 'Opción sin texto';
        const input = opt.querySelector('input');
        opciones.push({
          valor: input?.value || '',
          texto: textoOpcion
        });
      });

      preguntas.push({
        pregunta: textoPregunta,
        opciones: opciones
      });
    });

    return preguntas;
  });

  fs.writeFileSync('estructura_encuesta.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Estructura guardada en estructura_encuesta.json');

  await browser.close();
})();
