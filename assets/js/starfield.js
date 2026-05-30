(function () {
  var canvas = document.getElementById('starfield');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var stars = [], W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars(n) {
    stars = [];
    for (var i = 0; i < n; i++) {
      var m = Math.random();
      stars.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  m < 0.7 ? 0.4 : m < 0.92 ? 0.8 : 1.4,
        o:  0.12 + Math.random() * 0.65,
        tw: Math.random() * Math.PI * 2,
        sp: 0.004 + Math.random() * 0.012,
        c:  m > 0.97
              ? 'hsl(' + (200 + Math.random() * 40) + ',75%,85%)'
              : m > 0.93
              ? 'hsl(' + (30  + Math.random() * 20) + ',55%,88%)'
              : '#c0d8ef',
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      ctx.globalAlpha = Math.max(0, Math.min(1, s.o + Math.sin(t * s.sp + s.tw) * 0.18));
      ctx.fillStyle = s.c;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  var mx = 0, my = 0, ox = 0, oy = 0;
  document.addEventListener('mousemove', function (e) {
    mx = (e.clientX / W - 0.5) * 0.4;
    my = (e.clientY / H - 0.5) * 0.4;
  });

  function animate(t) {
    ox += (mx - ox) * 0.04;
    oy += (my - oy) * 0.04;
    ctx.save();
    ctx.translate(ox * 10, oy * 10);
    draw(t * 0.001);
    ctx.restore();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', function () { resize(); initStars(320); });
  resize();
  initStars(320);
  requestAnimationFrame(animate);
})();
