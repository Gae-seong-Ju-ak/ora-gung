// ===== 전역 변수 설정 =====

// 스크롤 감지를 위한 플래그 변수
let didScroll = false;

// 이전 스크롤 위치를 저장하는 변수 (스크롤 방향 판단에 사용)
let lastScrollTop = 0;

// 스크롤 감지를 위한 최소 이동 거리 (픽셀 단위)
// - 너무 작은 스크롤에는 반응하지 않도록 하는 값
const delta = 3;

// DOM 요소 선택
const header = document.querySelector('.header');

// 헤더의 실제 높이를 픽셀 단위로 저장
const navbarHeight = header.offsetHeight;

// ===== 스크롤 이벤트 리스너 설정 =====
// 스크롤이 발생할 때마다 didScroll 플래그를 true로 설정
window.addEventListener('scroll', () => {
    didScroll = true;
});

// ===== 스크롤 상태 확인 함수 =====
// requestAnimationFrame을 사용하여 부드러운 애니메이션 효과 구현
function checkScroll() {
    // 스크롤이 발생했을 경우에만 hasScrolled 함수 실행
    if (didScroll) {
        hasScrolled();
        didScroll = false; // 처리 완료 후 플래그 초기화
    }

    // 다음 애니메이션 프레임에서 다시 확인
    requestAnimationFrame(checkScroll);
}

// 초기 실행
requestAnimationFrame(checkScroll);

// ===== 스크롤 방향에 따른 헤더 표시/숨김 처리 함수 =====
function hasScrolled() {
    // 현재 스크롤 위치 가져오기 (크로스 브라우저 지원)
    const st = window.scrollY || window.pageYOffset;

    // 설정된 delta값 이하의 스크롤은 무시
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // 스크롤 방향이 아래쪽이고, 헤더 높이보다 많이 스크롤된 경우
    if (st > lastScrollTop && st > navbarHeight) {
        // 헤더 숨기기
        header.classList.add('header--hidden');
    } else {
        // 스크롤 방향이 위쪽이고, 페이지 하단이 아닌 경우
        if (st + window.innerHeight < document.documentElement.scrollHeight) {
            // 헤더 다시 보이기
            header.classList.remove('header--hidden');
        }
    }

    // 현재 스크롤 위치를 저장하여 다음 스크롤과 비교
    lastScrollTop = st;
}