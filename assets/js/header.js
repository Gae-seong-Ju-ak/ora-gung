// 아래로 스크롤할 때 헤더 숨기기
var didScroll; // 스크롤이 되었는지 확인
var lastScrollTop = 0; // 스크롤의 위치
var delta = 3; // 시작하는 스크롤의 위치
var navbarHeight = document.querySelector('header').offsetHeight; // 영향을 받을 요소 선택 : 헤더를 선택

// 스크롤시 사용자가 스크롤했다는 것을 알림
window.addEventListener('scroll', function (event) {
    didScroll = true;
});

// hasScrolled()를 실행하고 didScroll 상태를 재설정
setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

// 동작 구현
function hasScrolled() {
    // 현재 스크롤 위치 저장
    var st = window.scrollY || window.pageYOffset; // 현재 스크롤 위치

    // 설정한 delta 값보다 더 스크롤되었는지 확인
    if (Math.abs(lastScrollTop - st) <= delta) {
        return;
    }

    // 헤더의 높이보다 더 스크롤되었는지 확인하고 스크롤의 방향이 위인지 아래인지 확인
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        document.querySelector('header').classList.remove('nav-down');
        document.querySelector('header').classList.add('nav-up');
    } else {
        // Scroll Up
        if (st + window.innerHeight < document.documentElement.scrollHeight) {
            document.querySelector('header').classList.remove('nav-up');
            document.querySelector('header').classList.add('nav-down');
        }
    }

    // lastScrollTop에 현재 스크롤 위치 지정
    lastScrollTop = st;
}

window.addEventListener('scroll', function () {
    if (window.scrollY == document.documentElement.scrollHeight - window.innerHeight) {
        // 실행할 함수
    }
});

// 네비게이션 링크 클릭시 해당 섹션으로 이동
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const headerHeightRem = 4.375; // 헤더 높이를 rem으로 설정
        const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const headerHeightPx = headerHeightRem * htmlFontSize; // rem 값을 픽셀 값으로 변환
        const offsetTop = targetSection.offsetTop - headerHeightPx;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

document.getElementById('logo-link').addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});