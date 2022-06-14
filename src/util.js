import anime from 'animejs/lib/anime.es.js';

export function fadeIn(target, duration, { beginFunc = undefined, completeFunc = undefined }) {
  let opacity = getComputedStyle(target).opacity;
  if (opacity === undefined) {
    opacity = 1;
  } else {
    opacity = parseFloat(opacity);
  }
  target.style.opacity = 0;

  anime({
    targets: target,
    opacity: opacity,
    duration: duration,
    easing: 'linear',
    begin: function(a) {
      target.style.display = '';
      if (beginFunc !== undefined) {
        beginFunc();
      }
    },
    complete: function(a) {
      target.style.opacity = null;
      if (completeFunc !== undefined) {
        completeFunc();
      }
    }
  });
}

export function fadeOut(target, duration, { beginFunc = undefined, completeFunc = undefined }) {
  anime({
    targets: target,
    opacity: 0,
    duration: duration,
    easing: 'linear',
    begin: function(a) {
      if (beginFunc !== undefined) {
        beginFunc();
      }
    },
    complete: function(a) {
      target.style.opacity = null;
      target.style.display = 'none';
      if (completeFunc !== undefined) {
        completeFunc();
      }
    }
  });
}
