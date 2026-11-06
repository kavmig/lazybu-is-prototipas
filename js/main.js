// Bendras JS: filtravimas lentelėse ir pranešimai po veiksmų (duomenys neišsaugomi – tai maketas)
document.querySelectorAll('.filter, .filter-select').forEach(function (el) {
  el.addEventListener('input', function () {
    var table = document.getElementById(el.dataset.table);
    var q = Array.from(document.querySelectorAll('[data-table="' + el.dataset.table + '"]')).map(function (x) { return x.value.toLowerCase(); });
    table.querySelectorAll('tbody tr').forEach(function (tr) {
      var t = tr.textContent.toLowerCase();
      tr.style.display = q.every(function (v) { return !v || t.indexOf(v) >= 0; }) ? '' : 'none';
    });
  });
});
document.querySelectorAll('form[data-msg]').forEach(function (f) {
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    try { sessionStorage.setItem('msg', f.dataset.msg); } catch (e) {}
    location.href = f.getAttribute('action');
  });
});
document.querySelectorAll('a[data-msg]').forEach(function (a) {
  a.addEventListener('click', function () { try { sessionStorage.setItem('msg', a.dataset.msg); } catch (e) {} });
});
try {
  var m = sessionStorage.getItem('msg');
  if (m) {
    sessionStorage.removeItem('msg');
    var d = document.createElement('div'); d.className = 'toast'; d.textContent = m;
    document.body.appendChild(d); setTimeout(function () { d.remove(); }, 3500);
  }
} catch (e) {}
