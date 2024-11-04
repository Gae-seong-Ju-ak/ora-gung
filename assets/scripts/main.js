// ========== TOP 버튼 스크립트 ==========
// 스크롤 이벤트로 버튼 표시/숨김 처리
window.addEventListener('scroll', () => {
    const topButton = document.querySelector('.top-button');
    if (window.scrollY > 500) { // 스크롤이 500px 이상 내려갔을 때 버튼 표시
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }
});

// 버튼 클릭 시 최상단으로 스크롤
document.querySelector('.top-button').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드럽게 스크롤
    });
});


// ========== 헤더 스크립트 ==========
//  전역 변수 설정 

// 스크롤 감지를 위한 플래그 변수
let didScroll = false;

// 이전 스크롤 위치를 저장하는 변수 (스크롤 방향 판단에 사용)
let lastScrollTop = 0;

// 스크롤 감지를 위한 최소 이동 거리 (픽셀 단위)
// - 너무 작은 스크롤에는 반응하지 않도록 하는 값
const delta = 3;

// DOM 요소 선택
const header = document.querySelector('header');

// 헤더의 실제 높이를 픽셀 단위로 저장
const navbarHeight = header.offsetHeight;

//  스크롤 이벤트 리스너 설정 
// 스크롤이 발생할 때마다 didScroll 플래그를 true로 설정
window.addEventListener('scroll', () => {
    didScroll = true;
});

// 
// 스크롤 상태 확인 함수 
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

// 스크롤 방향에 따른 헤더 표시/숨김 처리 함수 
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

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav__link");
    const OFFSET = 100; // 원하는 상단 여백 높이 (px)

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 링크 동작을 막음
            const targetId = this.getAttribute("href").substring(1); // 링크된 섹션 ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - OFFSET, // OFFSET만큼 더 위로 스크롤
                    behavior: "smooth"
                });
            }
        });
    });
});


// ========== 푸터 스크립트 ==========
document.addEventListener("DOMContentLoaded", () => {
    const footerText = document.querySelector(".footer__brand-subtext");

    // footerText 업데이트 함수 정의
    const updateFooterText = () => {
        // 화면 너비가 500px 미만일 때 줄바꿈 추가
        if (window.innerWidth < 500) {
            footerText.innerHTML =
                "Department of Digital Media Design,<br>Kaywon University of Art and Design";
        } else {
            // 화면 너비가 500px 이상일 때 원래 형태로 되돌림
            footerText.innerHTML =
                "Department of Digital Media Design, Kaywon University of Art and Design";
        }
    };

    // 페이지 로드 시 한 번 실행하여 초기 상태 설정
    updateFooterText();

    // 창 크기가 변경될 때마다 updateFooterText 함수 실행
    window.addEventListener("resize", updateFooterText);
});