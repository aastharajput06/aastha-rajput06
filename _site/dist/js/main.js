$(function () {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const toggle = document.getElementById('toggle');
  const input = document.getElementById('switch');

  console.log("🌙 Default night mode forced + toggle direction fixed");

  // 🌙 Always start in night mode
  html.classList.add('night');
  body.classList.add('night');
  html.classList.remove('light');
  body.classList.remove('light');
  input.checked = true;

  // 🌗 Toggle between modes (fixed direction)
  toggle.addEventListener('click', function () {
    // When user toggles the switch (moon/sun)
    if (input.checked) {
      // If toggle is ON → light mode
      html.classList.remove('night');
      body.classList.remove('night');
      html.classList.add('light');
      body.classList.add('light');
      console.log("☀️ Switched to light mode");
    } else {
      // If toggle is OFF → night mode
      html.classList.add('night');
      body.classList.add('night');
      html.classList.remove('light');
      body.classList.remove('light');
      console.log("🌙 Switched to night mode");
    }
  });

  const introHeight = document.querySelector('.intro').offsetHeight;
  const topButton = document.getElementById('top-button');
  const $topButton = $('#top-button');

  window.addEventListener(
    'scroll',
    function() {
      if (window.scrollY > introHeight) {
        $topButton.fadeIn();
      } else {
        $topButton.fadeOut();
      }
    },
    false
  );

  topButton.addEventListener('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  const hand = document.querySelector('.emoji.wave-hand');

  function waveOnLoad() {
    hand.classList.add('wave');
    setTimeout(function() {
      hand.classList.remove('wave');
    }, 2000);
  }

  setTimeout(function() {
    waveOnLoad();
  }, 1000);

  hand.addEventListener('mouseover', function() {
    hand.classList.add('wave');
  });

  hand.addEventListener('mouseout', function() {
    hand.classList.remove('wave');
  });

  window.sr = ScrollReveal({
    reset: false,
    duration: 600,
    easing: 'cubic-bezier(.694,0,.335,1)',
    scale: 1,
    viewFactor: 0.3,
  });

  sr.reveal('.background');
  sr.reveal('.skills');
  sr.reveal('.experience', { viewFactor: 0.2 });
  sr.reveal('.featured-projects', { viewFactor: 0.1 });
  sr.reveal('.other-projects', { viewFactor: 0.05 });
});
