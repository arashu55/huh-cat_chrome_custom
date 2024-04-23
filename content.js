document.addEventListener('click', function(e) {
  if (!chrome.runtime.getURL) return;

  const animation = document.createElement('img');
  animation.src = chrome.runtime.getURL('huh_cat.gif');

  if (chrome.runtime.lastError || !animation.src) {
    console.error('拡張機能のコンテキストが失われました。');
    return;
  }  
  const gifWidth = 200;

  const posX = e.pageX - gifWidth / 2;
  const posY = e.pageY - gifWidth / 2;
  
  animation.style.position = 'absolute';
  animation.style.left = `${posX}px`;
  animation.style.top = `${posY}px`;
  animation.style.width = `${gifWidth}px`;
  animation.style.zIndex = '1000';
  animation.style.transition = 'opacity 0.5s';
  animation.style.opacity = '0';
  animation.style.pointerEvents = 'none';

  document.body.appendChild(animation);

  setTimeout(() => {
    animation.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    animation.remove();
  }, 5000);
});

