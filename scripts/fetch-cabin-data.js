/**
 * Скрипт для загрузки данных о каютах и ценах с сайта Swan Hellenic
 * Использование: node scripts/fetch-cabin-data.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CRUISE_URL = 'https://www.swanhellenic.com/cruise/south-atlantic-cruise-from-south-africa-to-antarctica?id=432&seats=2';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'cabins');
const DATA_FILE = path.join(__dirname, '..', 'data', 'cabin-prices.json');

// Создаем директории если их нет
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

console.log('🚢 Загрузка данных о каютах с сайта Swan Hellenic...');
console.log('URL:', CRUISE_URL);

// Функция для загрузки изображения
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('✅ Загружено:', path.basename(filepath));
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.error('❌ Ошибка загрузки:', url);
      reject(err);
    });
  });
}

// Функция для получения HTML страницы
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

// Основная функция
async function main() {
  try {
    console.log('\n📥 Загружаем страницу...');
    const html = await fetchPage(CRUISE_URL);

    console.log('✅ Страница загружена, размер:', (html.length / 1024).toFixed(2), 'KB');

    // Сохраняем HTML для анализа
    const htmlFile = path.join(__dirname, '..', 'data', 'cruise-page.html');
    fs.writeFileSync(htmlFile, html);
    console.log('💾 HTML сохранен в:', htmlFile);

    // Ищем данные о каютах в HTML
    // Обычно цены и изображения кают находятся в JSON внутри скриптов или data-атрибутах

    // Поиск JSON данных в скриптах
    const jsonMatches = html.match(/<script[^>]*>(.*?cabins?.*?)<\/script>/gis);

    if (jsonMatches) {
      console.log('\n🔍 Найдено скриптов с данными о каютах:', jsonMatches.length);

      // Попытка извлечь JSON
      jsonMatches.forEach((match, index) => {
        const scriptFile = path.join(__dirname, '..', 'data', `script-${index}.txt`);
        fs.writeFileSync(scriptFile, match);
      });
    }

    // Поиск изображений кают
    const imageRegex = /(https?:\/\/[^"']*(?:cabin|suite|room)[^"']*\.(?:jpg|jpeg|png|webp))/gi;
    const images = [...new Set(html.match(imageRegex) || [])];

    console.log('\n🖼️  Найдено изображений кают:', images.length);

    if (images.length > 0) {
      console.log('\n📥 Загружаем изображения...');

      for (let i = 0; i < Math.min(images.length, 20); i++) {
        const imageUrl = images[i];
        const filename = `cabin-${i + 1}${path.extname(new URL(imageUrl).pathname)}`;
        const filepath = path.join(OUTPUT_DIR, filename);

        try {
          await downloadImage(imageUrl, filepath);
        } catch (err) {
          console.error('❌ Не удалось загрузить:', imageUrl);
        }
      }
    }

    // Поиск цен
    const priceRegex = /(?:€|USD|£|₽)\s*[\d,]+(?:\.\d{2})?|\b\d{1,3}(?:,\d{3})*(?:\.\d{2})?\s*(?:€|USD|£|₽)/g;
    const prices = html.match(priceRegex) || [];

    console.log('\n💰 Найдено цен:', [...new Set(prices)].slice(0, 10));

    // Сохраняем структурированные данные
    const cabinData = {
      url: CRUISE_URL,
      fetchedAt: new Date().toISOString(),
      images: images.slice(0, 20),
      prices: [...new Set(prices)],
      note: 'Данные требуют ручной проверки и сопоставления с конкретными каютами'
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(cabinData, null, 2));
    console.log('\n💾 Данные сохранены в:', DATA_FILE);

    console.log('\n✅ Готово! Проверьте файлы:');
    console.log('  - Изображения:', OUTPUT_DIR);
    console.log('  - Данные:', DATA_FILE);
    console.log('  - HTML:', htmlFile);
    console.log('\n⚠️  ВАЖНО: Данные требуют ручной проверки и сопоставления!');

  } catch (error) {
    console.error('\n❌ Ошибка:', error.message);
    process.exit(1);
  }
}

main();
