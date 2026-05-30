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
    hint.innerHTML = '<span style="color:var(--accent-warm)">No entry found for "' + q + '" yet — check back as new systems are added.</span>';
    setTimeout(function () { hint.innerHTML = orig; }, 3000);
  }
}

/* Notify — Buttondown API */
async function handleNotify() {
  const input = document.getElementById('notify-email');
  const email = (input.value || '').trim();

  if (!email || !email.includes('@')) {
    input.style.borderColor = 'var(--danger)';
    setTimeout(() => { input.style.borderColor = ''; }, 1500);
    return;
  }

  const btn = document.querySelector('.notify-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': 'Token b5dbb32c-5c7c-4ae3-9cc0-01180f2d0a5c',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (response.ok || response.status === 201) {
      document.querySelector('.notify-section').innerHTML =
        '<p style="font-family:var(--mono);font-size:0.9rem;color:var(--accent);' +
        'letter-spacing:0.1em;text-align:center;padding:1.5rem 0;">' +
        '&#10003; &nbsp; You’re on the list. We’ll reach out when the first entry publishes.</p>';
    } else if (response.status === 409) {
      document.querySelector('.notify-section').innerHTML =
        '<p style="font-family:var(--mono);font-size:0.9rem;color:var(--accent-warm);' +
        'letter-spacing:0.1em;text-align:center;padding:1.5rem 0;">' +
        '&#10003; &nbsp; You’re already on the list — we’ll be in touch!</p>';
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    btn.textContent = 'Notify me';
    btn.disabled = false;
    input.style.borderColor = 'var(--danger)';
    input.placeholder = 'Something went wrong — try again';
    setTimeout(() => {
      input.style.borderColor = '';
      input.placeholder = 'your@email.com';
    }, 3000);
  }
}

/* Enter key for search and notify */
document.addEventListener('DOMContentLoaded', function () {
  var s = document.getElementById('search-input');
  if (s) s.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleSearch(); });
  var n = document.getElementById('notify-email');
  if (n) n.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleNotify(); });
});
