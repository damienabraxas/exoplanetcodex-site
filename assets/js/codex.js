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

/* Admin panel — inject on ?admin=true */
(function () {
  if (!window.location.search.includes('admin=true')) return;
  var panel = document.createElement('div');
  panel.id = 'admin-panel';
  panel.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:var(--surface);border:1px solid var(--accent);padding:1.5rem;z-index:999;min-width:300px;box-shadow:0 4px 24px rgba(0,0,0,0.5);';
  panel.innerHTML =
    '<div style="font-family:var(--mono);font-size:0.75rem;color:var(--accent);margin-bottom:1rem;letter-spacing:0.1em;">ADMIN — NEWSLETTER</div>' +
    '<input id="bd-api-key" type="password" placeholder="Buttondown API key" style="width:100%;padding:0.5rem;margin-bottom:1rem;background:var(--deep);border:1px solid var(--rim);color:var(--text-bright);font-family:var(--mono);font-size:0.8rem;box-sizing:border-box;">' +
    '<button onclick="sendAsNewsletter()" style="width:100%;padding:0.75rem;background:var(--accent);color:var(--void);border:none;cursor:pointer;font-family:var(--mono);font-size:0.78rem;letter-spacing:0.1em;">Send as Newsletter Draft</button>' +
    '<div id="admin-msg" style="display:none;font-family:var(--mono);font-size:0.75rem;margin-top:0.9rem;padding:0.6rem;text-align:center;"></div>';
  document.body.appendChild(panel);
})();

function tableToMarkdown(table) {
  var rows = Array.from(table.querySelectorAll('tr'));
  if (!rows.length) return '';
  var lines = [];
  rows.forEach(function (row, i) {
    var cells = Array.from(row.querySelectorAll('th, td'));
    lines.push('| ' + cells.map(function (c) { return c.textContent.trim(); }).join(' | ') + ' |');
    if (i === 0) {
      lines.push('| ' + cells.map(function () { return '---'; }).join(' | ') + ' |');
    }
  });
  return lines.join('\n');
}

function htmlToMarkdown(node) {
  if (node.nodeType === 3) return node.textContent.replace(/\s+/g, ' ');
  if (node.nodeType !== 1) return '';
  var tag = node.tagName.toLowerCase();
  var kids = Array.from(node.childNodes);
  var walk = function (nodes) { return nodes.map(htmlToMarkdown).join(''); };

  var skipClasses = ['coming-soon-box','progress-inline','progress-track','progress-fill','progress-text'];
  if (node.classList && skipClasses.some(function (c) { return node.classList.contains(c); })) return '';

  switch (tag) {
    case 'h1': return '\n\n# '    + node.textContent.trim() + '\n\n';
    case 'h2': return '\n\n## '   + node.textContent.trim() + '\n\n';
    case 'h3': return '\n\n### '  + node.textContent.trim() + '\n\n';
    case 'h4': return '\n\n#### ' + node.textContent.trim() + '\n\n';
    case 'p':  return walk(kids).trim() + '\n\n';
    case 'br': return '\n';
    case 'strong': case 'b': return '**' + node.textContent.trim() + '**';
    case 'em':     case 'i': return '*'  + node.textContent.trim() + '*';
    case 'a': {
      var href = node.getAttribute('href') || '';
      var text = walk(kids).trim();
      return href ? '[' + text + '](' + href + ')' : text;
    }
    case 'sub': case 'sup': return node.textContent;
    case 'table': return tableToMarkdown(node) + '\n\n';
    case 'thead': case 'tbody': case 'tfoot':
    case 'tr': case 'th': case 'td': return '';
    case 'ul': return Array.from(node.querySelectorAll('li')).map(function (li) {
      return '- ' + li.textContent.trim();
    }).join('\n') + '\n\n';
    case 'ol': return Array.from(node.querySelectorAll('li')).map(function (li, i) {
      return (i + 1) + '. ' + li.textContent.trim();
    }).join('\n') + '\n\n';
    case 'blockquote': return walk(kids).trim().split('\n').map(function (l) { return '> ' + l; }).join('\n') + '\n\n';
    case 'script': case 'style': return '';
    default: return walk(kids);
  }
}

async function sendAsNewsletter() {
  var apiKey = document.getElementById('bd-api-key').value.trim();
  var msg = document.getElementById('admin-msg');
  if (!apiKey) {
    msg.style.color = 'var(--danger)';
    msg.style.background = 'rgba(224,92,75,0.08)';
    msg.textContent = '✗ Please enter your Buttondown API key.';
    msg.style.display = 'block';
    return;
  }
  msg.style.color = 'var(--text-dim)';
  msg.style.background = 'none';
  msg.textContent = 'Sending…';
  msg.style.display = 'block';
  try {
    var title = document.querySelector('.page-title').textContent.trim();
    var postBody = document.querySelector('.post-body');
    var body = htmlToMarkdown(postBody).replace(/\n{3,}/g, '\n\n').trim();
    var response = await fetch('https://api.buttondown.email/v1/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject: title, body: body, status: 'draft' }),
    });
    if (response.ok) {
      msg.style.color = 'var(--accent-green)';
      msg.style.background = 'rgba(82,199,138,0.08)';
      msg.textContent = '✓ Draft created — review in Buttondown dashboard.';
    } else {
      msg.style.color = 'var(--danger)';
      msg.style.background = 'rgba(224,92,75,0.08)';
      msg.textContent = '✗ Failed — check API key and try again.';
    }
  } catch (e) {
    msg.style.color = 'var(--danger)';
    msg.style.background = 'rgba(224,92,75,0.08)';
    msg.textContent = '✗ Network error — check your connection.';
  }
}
