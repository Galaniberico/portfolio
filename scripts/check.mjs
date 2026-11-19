import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';

const root = new URL('../src/', import.meta.url);
const sections = ['sobre-mi', 'experiencia', 'proyectos', 'catan', 'accesos', 'moduledroid'];
const languages = { en: ['index', 'catan', 'moduledroid', 'accesos', 'experiencia'], es: ['es', 'catan-es', 'moduledroid-es', 'accesos-es', 'experiencia-es'] };
const pages = new Map();
for (const [language, filenames] of Object.entries(languages)) {
  for (const [index, filename] of filenames.entries()) {
    const html = await readFile(new URL(filename + '.html', root), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `IDs duplicados en ${filename}`);
    assert(html.includes(`<html lang="${language}">`));
    assert(html.includes(`data-language="${language}" aria-current="page"`));
    const otherLanguage = language === 'en' ? 'es' : 'en';
    assert(html.includes(`href="./${languages[otherLanguage][index]}.html" lang="${otherLanguage}"`));

    if (index === 0) {
      const cv = language.toUpperCase();
      assert(html.includes(`download="CV_Alejandro_Galan_${cv}.pdf"`));
      assert(html.includes(`href="./assets/CV_Alejandro_Galan_${cv}.pdf" target="_blank"`));
      const order = sections.map(id => ids.indexOf(id));
      assert(order.every((position, i) => position >= 0 && (!i || position > order[i - 1])));
      for (const project of filenames.slice(1)) assert(html.includes(`href="./${project}.html"`));
    }
    pages.set(filename + '.html', { html, ids });
  }
}

for (const [filename, { html, ids }] of pages) {
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(https?:|mailto:)/.test(reference)) continue;
    if (reference.startsWith('#')) {
      assert(ids.includes(reference.slice(1)), 'Ancla rota: ' + reference);
    } else {
      const [target, fragment] = reference.replace(/^\.\//, '').split('#');
      if (fragment) {
        assert(pages.get(target)?.ids.includes(fragment), `Enlace roto en ${filename}: ${reference}`);
      }
      await access(new URL(target, root));
    }
  }
}

for (const state of ['base', 'ampliado', 'terrenos', 'tablero-oscuro']) {
  await access(new URL(`assets/catan-${state}.png`, root));
}

console.log('EN/ES: diez páginas, enlaces y anclas, imágenes, CV y orden de secciones correctos.');

