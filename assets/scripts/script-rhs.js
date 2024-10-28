// ========== 스탬프 섹션 스크립트 ==========
const images = [
    ["./assets/images/source/stamp_1a.webp", "./assets/images/source/stamp_1b.webp", "./assets/images/source/stamp_1c.webp", "./assets/images/source/stamp_1d.webp"],
    ["./assets/images/source/stamp_2a.webp", "./assets/images/source/stamp_2b.webp", "./assets/images/source/stamp_2c.webp", "./assets/images/source/stamp_2d.webp"],
    ["./assets/images/source/stamp_3a.webp", "./assets/images/source/stamp_3b.webp", "./assets/images/source/stamp_3c.webp", "./assets/images/source/stamp_3d.webp"],
    ["./assets/images/source/stamp_4a.webp", "./assets/images/source/stamp_4b.webp", "./assets/images/source/stamp_4c.webp", "./assets/images/source/stamp_4d.webp"]
];

const stampItems = document.querySelectorAll('.stamp__item');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

let intervalId = null;
const visibilityMap = new Map();

// 초기 가시성 상태 설정
stampItems.forEach((item, index) => {
    visibilityMap.set(item, false);
});

const observerCallback = (entries) => {
    // 관찰된 항목들의 가시성 상태 업데이트
    entries.forEach(entry => {
        visibilityMap.set(entry.target, entry.isIntersecting);

        // 각 항목의 가시성 상태 출력
        const itemIndex = Array.from(stampItems).indexOf(entry.target);
        console.log(`Stamp ${itemIndex + 1}: ${entry.isIntersecting ? 'visible' : 'not visible'}`);
    });

    // 현재 모든 항목의 가시성 상태를 배열로 변환하여 출력
    const visibilityArray = Array.from(visibilityMap.values());
    console.log('Current visibility status:', visibilityArray);

    // 모든 항목이 보이는지 확인
    const allVisible = visibilityArray.every(isVisible => isVisible);
    console.log('All items visible:', allVisible);

    // 전환 함수 상태 출력
    console.log('Transition function running:', intervalId !== null);

    // 구분선 추가
    console.log('------------------------');

    if (allVisible && !intervalId) {
        console.log('Starting image transition...');
        startImageTransition();
    } else if (!allVisible && intervalId) {
        console.log('Stopping image transition...');
        clearInterval(intervalId);
        intervalId = null;
    }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// 각 .stamp__item에 대해 초기 이미지 설정 후 옵저버 등록
stampItems.forEach((item, index) => {
    let imgElement = document.createElement('img');
    imgElement.src = images[index][0];
    imgElement.alt = `Image ${index + 1}-1`;
    item.appendChild(imgElement);
    observer.observe(item);
});

function startImageTransition() {
    let currentImageIndex = 1;
    intervalId = setInterval(() => {
        stampItems.forEach((item, index) => {
            const imgElement = item.querySelector('img');
            imgElement.src = images[index][currentImageIndex];
            imgElement.alt = `Image ${index + 1}-${currentImageIndex + 1}`;
        });
        currentImageIndex = (currentImageIndex + 1) % images[0].length;
    }, 1200);
}


// ========== 한복 섹션 스크립트 ==========
document.addEventListener("DOMContentLoaded", function () {
    // 공통 옵저버 설정 함수
    function observeElements(className, threshold, callback) {
        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: threshold || 0.3,
        });

        const targetElements = document.querySelectorAll(className);
        targetElements.forEach((element) => observer.observe(element));
    }

    // 한복 섹션 페이드인 효과 콜백 함수
    const hanbokFadeInCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            } else {
                entry.target.classList.remove("fade-in");
            }
        });
    };

    // 한복 섹션 이미지에 대해 옵저버 설정
    observeElements('.sec-21__feature-image', 0.3, hanbokFadeInCallback);
});