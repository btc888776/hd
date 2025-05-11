

// var myCookie = ''
// myCookie = document.cookie.replace(
//   /(?:(?:^|.*;\s*)cookielog\s*\=\s*([^;]*).*$)|^.*$/,
//   "$1",
// )

function getCookieValue(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookiePair = cookies[i].split('=');
    if (cookiePair[0] === name) {
      return cookiePair[1];
    }
  }
  return '';
}
var myCookie = getCookieValue('cookielog');

if (myCookie == 'true') {
  $('body').removeClass('body-style')

  console.log('999')
  document.getElementById('jumpUrlStyle').style.display = 'none'
  jumpUrl()
} else {
  $('body').addClass('body-style')
  $('html').addClass('html-style')
  $('.sliderValidation').css('display', 'block')

}

document.addEventListener('DOMContentLoaded', function () {
  const sliderThumb = document.querySelector('.slider-thumb');
  const sliderFill = document.querySelector('.slider-fill');
  const sliderText = document.querySelector('.slider-text');
  const sliderContainer = document.querySelector('.slider-container');
  const sliderTrack = document.querySelector('.slider-track');

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  const sliderRect = sliderTrack.getBoundingClientRect();
  const maxSlide = sliderRect.width - sliderThumb.offsetWidth;

  sliderThumb.addEventListener('mousedown', startDrag);
  sliderThumb.addEventListener('touchstart', startDrag);

  function startDrag(event) {
    isDragging = true;
    startX = (event.type === 'touchstart' ? event.touches[0].clientX : event.clientX) - sliderThumb.offsetLeft;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    console.log('startDrag')
  }

  function onDrag(event) {
    if (!isDragging) return;
    currentX = (event.type === 'touchmove' ? event.touches[0].clientX : event.clientX) - startX;
    if (currentX < 0) currentX = 0;
    if (currentX > maxSlide) currentX = maxSlide;
    sliderThumb.style.left = currentX + 'px';
    sliderFill.style.width = currentX + sliderThumb.offsetWidth / 2 + 'px';
    sliderText.style.zIndex = '2';
    sliderText.style.color = '#000';

    if (currentX >= maxSlide) {
      sliderText.textContent = '已验证';
      sliderText.style.color = '#fff';
      sliderText.style.zIndex = '2';
      sliderThumb.style.backgroundColor = '#4caf50';
      sliderFill.style.backgroundColor = '#4caf50';
      sliderThumb.style.pointerEvents = 'none';
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchend', stopDrag);
      console.log('已驗證')
      setCookie('cookielog', 'true', 365);
      //   myCookie = document.cookie.replace(
      //   /(?:(?:^|.*;\s*)cookielog\s*\=\s*([^;]*).*$)|^.*$/,
      //   "$1",
      // );
      setTimeout(function () {
        jumpUrl()
      }, 300)
    }
    console.log('onDrag')
  }

  function stopDrag() {
    isDragging = false;
    if (currentX < maxSlide) {
      sliderThumb.style.transition = 'left 0.2s ease';
      sliderFill.style.transition = 'width 0.2s ease';
      sliderThumb.style.left = '0';
      sliderFill.style.width = '0';
      setTimeout(() => {
        sliderThumb.style.transition = '';
        sliderFill.style.transition = '';
      }, 200);
    }
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
    console.log('stopDrag')
  }

  // 測試start
  // 禁用滑動手勢
  function disableSwipeNavigation() {
    document.addEventListener('touchstart', preventTouchEvent, { passive: false });
    document.addEventListener('touchmove', preventTouchEvent, { passive: false });
  }

  // 恢復滑動手勢
  function enableSwipeNavigation() {
    document.removeEventListener('touchstart', preventTouchEvent, { passive: false });
    document.removeEventListener('touchmove', preventTouchEvent, { passive: false });
  }

  // 阻止默認的觸摸事件
  function preventTouchEvent(event) {
    if (event.target.classList.contains('slider-thumb')) {
      console.log('禁用')
      event.preventDefault(); // 禁用滑塊滑動時的頁面滑動換頁
    }
  }

  // 滑塊驗證邏輯
  document.querySelector('.slider-thumb').addEventListener('touchstart', function (event) {
    console.log('滑滑滑')
    disableSwipeNavigation();  // 開始驗證時禁用滑動
  });

  document.querySelector('.slider-thumb').addEventListener('touchend', function (event) {
    console.log('停止')
    // 假設驗證完成後恢復滑動
    setTimeout(function () {
      enableSwipeNavigation();  // 恢復滑動換頁手勢
    }, 300);  // 延遲一段時間以確保驗證完成
  });
  // 測試end

});

function jumpUrl(){
  var arr = new Array(
    "https://btc888776.github.io/dh/",
  );
 window.location.href = arr[Math.floor(Math.random() * arr.length)];
}


function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
