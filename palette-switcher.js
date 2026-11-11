/* ==========================================================
   TEMP — floating bar for choosing the accent palette.
   Remove this file and the "TEMP" blocks in style.css / index.html
   once a palette is chosen. Direct link: index.html?palette=lime
   ========================================================== */
(function () {
  'use strict';

  var KEY = 'pystart-palette';
  var PALETTES = [
    { id: 'blue', name: 'Синий', swatch: '#2f5bff' },
    { id: 'violet', name: 'Фиолетовый', swatch: '#7a3cff' },
    { id: 'green', name: 'Зелёный', swatch: '#12c27c' },
    { id: 'lime', name: 'Лайм', swatch: '#c6f135' }
  ];
  var root = document.documentElement;

  function current() { return root.dataset.palette || 'blue'; }

  function apply(id) {
    if (id === 'blue') delete root.dataset.palette;
    else root.dataset.palette = id;
    try { localStorage.setItem(KEY, id); } catch (e) { /* storage unavailable */ }
    try {
      var url = new URL(location.href);
      if (id === 'blue') url.searchParams.delete('palette');
      else url.searchParams.set('palette', id);
      history.replaceState(null, '', url);
    } catch (e) { /* file:// or old browser */ }
    update();
  }

  var bar = document.createElement('div');
  bar.className = 'palette-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Цвет сайта');
  bar.innerHTML = '<span class="palette-bar__label">Цвет:</span>' + PALETTES.map(function (p) {
    return '<button type="button" data-palette-id="' + p.id + '" title="' + p.name +
      '" style="--swatch:' + p.swatch + '"><span>' + p.name + '</span></button>';
  }).join('');

  function update() {
    var active = current();
    Array.prototype.forEach.call(bar.querySelectorAll('button'), function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.paletteId === active));
    });
  }

  bar.addEventListener('click', function (event) {
    var btn = event.target.closest('button');
    if (btn) apply(btn.dataset.paletteId);
  });

  document.body.appendChild(bar);
  update();
})();
