// ========== 스탬프 섹션 스크립트 ==========
const images = [
    ["./assets/images/source/stamp_1a.webp", "./assets/images/source/stamp_1b.webp", "./assets/images/source/stamp_1c.webp", "./assets/images/source/stamp_1d.webp"],
    ["./assets/images/source/stamp_2a.webp", "./assets/images/source/stamp_2b.webp", "./assets/images/source/stamp_2c.webp", "./assets/images/source/stamp_2d.webp"],
    ["./assets/images/source/stamp_3a.webp", "./assets/images/source/stamp_3b.webp", "./assets/images/source/stamp_3c.webp", "./assets/images/source/stamp_3d.webp"],
    ["./assets/images/source/stamp_4a.webp", "./assets/images/source/stamp_4b.webp", "./assets/images/source/stamp_4c.webp", "./assets/images/source/stamp_4d.webp"]
];

const stampItems = document.querySelectorAll('.section-16__item');
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
    entries.forEach(entry => {
        visibilityMap.set(entry.target, entry.isIntersecting);

        const itemIndex = Array.from(stampItems).indexOf(entry.target);
        console.log(`Stamp ${itemIndex + 1}: ${entry.isIntersecting ? 'visible' : 'not visible'}`);
    });

    const visibilityArray = Array.from(visibilityMap.values());
    const allVisible = visibilityArray.every(isVisible => isVisible);

    if (allVisible && !intervalId) {
        startImageTransition();
    } else if (!allVisible && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

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
    observeElements('.sec-17__feature-image', 0.3, hanbokFadeInCallback);
});


// 캐러셀 아이템 데이터
const carouselData = [
    {
        title: '경복궁',
        subtitle: '큰 복을 누리라!',
        image: './assets/images/source/palace-a.svg',
        description: '경복궁의 입장권을 미리 예매하고 최신 소식을 빠르게 확인하세요.<br>조선의 정궁, 경복궁의 역사 속으로 당신을 초대합니다.'
    },
    {
        title: '덕수궁',
        subtitle: '덕이 물처럼 흐르는 궁',
        image: './assets/images/source/palace-b.svg',
        description: '덕수궁에서 진행되는 다양한 문화행사와 프로그램을 확인하세요.<br>서양식 건물과 전통이 어우러진 아름다움을 경험하세요.'
    },
    {
        title: '창덕궁',
        subtitle: '자연과 조화를 이루는 궁',
        image: './assets/images/source/palace-c.svg',
        description: '비밀스러운 후원과 아름다운 정원이 있는 창덕궁으로 여러분을 초대합니다.<br>세계문화유산의 가치를 직접 체험해보세요.'
    },
    {
        title: '창경궁',
        subtitle: '전통과 현대가 공존하는 궁',
        image: './assets/images/source/palace-d.svg',
        description: '창경궁의 야간 관람 프로그램과 특별한 문화행사를 체험해보세요.<br>밤에 더욱 빛나는 궁궐의 매력에 빠져보세요.'
    }
];

class Carousel {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.init();
    }

    init() {
        // 캐러셀 아이템 생성
        carouselData.forEach((data) => {
            const item = this.createCarouselItem(data);
            this.container.appendChild(item);
        });

        // 첫 번째 아이템이 화면 중앙에 오도록 컨테이너 위치 조정
        this.centerFirstItem();
    }

    createCarouselItem(data) {
        const item = document.createElement('div');
        item.className = 'sec-12__carousel-item';
        item.innerHTML = `
            <p class="sec-12__carousel-text">${data.subtitle}</p>
            <p class="sec-12__carousel-text-big">${data.title}</p>
            <div class="sec-12__carousel-image">
                <img src="${data.image}" alt="${data.title} 이미지">
            </div>
            <p class="sec-12__carousel_description">${data.description}</p>
        `;
        return item;
    }

    centerFirstItem() {
        // 첫 번째 아이템과 gap을 포함하여 중앙에 위치하도록 계산
        const firstItem = this.container.querySelector('.sec-12__carousel-item');
        const containerWidth = this.container.offsetWidth;
        const firstItemWidth = firstItem.offsetWidth;
        const gap = parseFloat(getComputedStyle(this.container).gap) || 0;

        // 첫 번째 아이템의 반 너비와 gap을 추가하여 이동 거리 계산
        const initialOffset = (containerWidth - firstItemWidth + gap * 5);

        // 첫 번째 아이템이 중앙에 오도록 컨테이너 이동
        this.container.style.transform = `translateX(${initialOffset}px)`;
    }
}

// 캐러셀 초기화
document.addEventListener('DOMContentLoaded', () => {
    new Carousel('.sec-12__carousel');
});