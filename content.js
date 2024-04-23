document.addEventListener('click', function(e) {
  // コンテキストのチェックを追加
  if (!chrome.runtime.getURL) return;

  const animation = document.createElement('img');
  animation.src = chrome.runtime.getURL('huh_cat.gif');

  // エラーになる可能性のある行の直前にコンテキストチェックを追加
  if (chrome.runtime.lastError || !animation.src) {
    console.error('拡張機能のコンテキストが失われました。');
    return;
  }  
  // GIFのサイズを変更します。ここでは元の画像の約2倍にしています。
  const gifWidth = 200; // お好みで調整できます。

  // クリック位置を基準に配置します。
  const posX = e.pageX - gifWidth / 2; // GIFの中心がクリックされた点に来るようにします。
  const posY = e.pageY - gifWidth / 2; // 同上
  
  animation.style.position = 'absolute';
  animation.style.left = `${posX}px`;
  animation.style.top = `${posY}px`;
  animation.style.width = `${gifWidth}px`;
  animation.style.zIndex = '1000';
  animation.style.transition = 'opacity 0.5s';
  animation.style.opacity = '0';
  animation.style.pointerEvents = 'none'; // GIFがクリックイベントを遮らないようにします。

  document.body.appendChild(animation);

  setTimeout(() => {
    animation.style.opacity = '1';
  }, 10); // すぐに透明度を変更

  setTimeout(() => {
    animation.remove();
  }, 5000); // 5秒後に画像を削除
});

