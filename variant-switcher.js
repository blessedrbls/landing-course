/* ==========================================================
   TEMP — floating bar for comparing design variants.
   Remove this file and variants.css once a variant is chosen.
   Direct link: index.html?variant=glass
   ========================================================== */
(function () {
  'use strict';

  var KEY = 'pystart-variant';
  var VARIANTS = [
    { id: 'aurora', short: '1', name: 'Аврора' },
    { id: 'glass', short: '2', name: 'Стекло и бенто' },
    { id: 'bold', short: '3', name: 'Крупная типографика' }
  ];
  var root = document.documentElement;

  function current() { return root.dataset.variant || 'aurora'; }

  function apply(id) {
    if (id === 'aurora') delete root.dataset.variant;
    else root.dataset.variant = id;
    try { localStorage.setItem(KEY, id); } catch (e) { /* storage unavailable */ }
    try {
      var url = new URL(location.href);
      if (id === 'aurora') url.searchParams.delete('variant');
      else url.searchParams.set('variant', id);
      history.replaceState(null, '', url);
    } catch (e) { /* file:// or old browser */ }
    update();
    window.dispatchEvent(new Event('resize'));
  }

  var bar = document.createElement('div');
  bar.className = 'variant-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Вариант дизайна');
  bar.innerHTML = '<span class="variant-bar__label">Вариант:</span>' + VARIANTS.map(function (v) {
    return '<button type="button" data-variant-id="' + v.id + '" title="' + v.name + '">' +
      v.short + '<span> · ' + v.name + '</span></button>';
  }).join('');

  function update() {
    var active = current();
    Array.prototype.forEach.call(bar.querySelectorAll('button'), function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.variantId === active));
    });
  }

  bar.addEventListener('click', function (event) {
    var btn = event.target.closest('button');
    if (btn) apply(btn.dataset.variantId);
  });

  document.body.appendChild(bar);
  update();
})();
