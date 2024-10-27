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
