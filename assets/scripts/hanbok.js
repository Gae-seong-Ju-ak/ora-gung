// 이미지 요소 선택
const featureImages = document.querySelectorAll('.sec-21__feature-image');

// 옵저버 옵션
const imgObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // 30% 이상 보일 때 작동
};

// Intersection Observer 콜백 함수
const imgObserverCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in'); // 보이면 fade-in 클래스 추가
        } else {
            entry.target.classList.remove('fade-in'); // 안 보이면 fade-in 클래스 제거
        }
    });
};

// 옵저버 생성 및 이미지 요소 관찰
const imgObserver = new IntersectionObserver(imgObserverCallback, imgObserverOptions);
featureImages.forEach(image => imgObserver.observe(image));