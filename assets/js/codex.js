/* Mobile nav toggle */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
})();

/* Search */
function handleSearch() {
  var input = document.getElementById('search-input');
  if (!input) return;
  var q = input.value.trim().toLowerCase();
  if (!q) return;
  var systems = {
    '55 cancri':  '/systems/55-cancri/',
    'copernicus': '/systems/55-cancri/',
    'hd 75732':   '/systems/55-cancri/',
    'janssen':    '/systems/55-cancri/',
    '55 cnc':     '/systems/55-cancri/',
    'sol':        '/systems/sol/',
    'sun':        '/systems/sol/',
    'solar':      '/systems/sol/',
    'terra':      '/systems/sol/',
    'earth':      '/systems/sol/',
    'hd 89307':   '/systems/hd-89307/',
    'gliese 581': '/systems/gliese-581/',
    'gl 581':     '/systems/gliese-581/',
  };
  for (var key in systems) {
    if (q.indexOf(key) !== -1 || key.indexOf(q) !== -1) {
      window.location.href = systems[key];
      return;
    }
  }
  var hint = document.querySelector('.search-hint');
  if (hint) {
    var orig = hint.innerHTML;
    hint.innerHTML = '<span style="color:var(--accent-warm)">No entry found for “' + q + '” yet — check back as new systems are added.</span>';
    setTimeout(function () { hint.innerHTML = orig; }, 3000);
  }
}

/* Notify */
function handleNotify() {
  var input = document.getElementById('notify-email');
  if (!input) return;
  if (input.value && input.value.indexOf('@') !== -1) {
    var section = document.querySelector('.notify-section');
    if (section) {
      section.innerHTML = '<p style="font-family:var(--mono);font-size:0.85rem;color:var(--accent);letter-spacing:0.1em;text-align:center;padding:1rem 0;">✓ &nbsp; Logged. We’ll reach out when the first entry publishes.</p>';
    }
  } else {
    input.style.borderColor = 'var(--danger)';
    setTimeout(function () { input.style.borderColor = ''; }, 1500);
  }
}

/* Enter key for search */
document.addEventListener('DOMContentLoaded', function () {
  var s = document.getElementById('search-input');
  if (s) s.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleSearch(); });
});
