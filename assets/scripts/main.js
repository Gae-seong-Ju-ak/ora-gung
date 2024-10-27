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

