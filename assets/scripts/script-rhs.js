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
const carouselData = [{
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
        if (!this.container) {
            console.error('Carousel container not found');
            return;
        }

        // rem 값을 가져오기 위한 함수
        this.remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

        // vw 값을 가져오기 위한 함수 추가
        this.vwToPx = (vw) => (vw * window.innerWidth) / 100;

        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = null;
        this.items = [];

        // CSS에서 가져온 값들을 설정
        this.itemWidth = 53.448; // rem
        this.itemHeight = 42.813; // rem
        this.itemGap = 3.438; // rem
        this.itemPadding = 3.031; // rem
        this.itemBorderRadius = 3.125; // rem

        this.init();
    }

    init() {
        // 컨테이너 스타일 설정 - CSS 클래스와 일치하도록
        this.container.style.width = '100vw';
        this.container.style.position = 'relative';
        this.container.style.display = 'flex';
        this.container.style.alignItems = 'center';
        this.container.style.justifyContent = 'center';
        this.container.style.overflow = 'hidden';

        // 내부 래퍼 생성 및 스타일 설정
        this.wrapper = document.createElement('div');
        this.wrapper.style.display = 'flex';
        this.wrapper.style.position = 'relative';
        this.wrapper.style.transition = 'transform 0.3s ease';
        this.wrapper.style.gap = `${this.itemGap}rem`;
        this.wrapper.style.alignItems = 'center';

        // 캐러셀 아이템 생성
        carouselData.forEach((data) => {
            const item = this.createCarouselItem(data);
            this.wrapper.appendChild(item);
            this.items.push(item);
        });

        this.container.appendChild(this.wrapper);

        // 초기 위치 설정
        this.setInitialPosition();

        // 이벤트 리스너 추가
        this.addEventListeners();

        // 윈도우 리사이즈 시 위치 재조정
        window.addEventListener('resize', () => {
            this.setInitialPosition();
        });
    }

    setInitialPosition() {
        const viewportWidth = window.innerWidth;
        const itemWidthPx = this.remToPx(this.itemWidth);
        const gapPx = this.remToPx(this.itemGap);

        // viewport의 중앙에서 시작하는 위치 계산
        const offset = (viewportWidth / 2) + (itemWidthPx / 2);

        this.initialOffset = offset;
        this.setTranslate(offset);
    }

    createCarouselItem(data) {
        const item = document.createElement('div');
        item.className = 'sec-12__carousel-item';
        item.style.width = `${this.itemWidth}rem`;
        item.style.height = `${this.itemHeight}rem`;
        item.style.padding = `3.813rem ${this.itemPadding}rem 3.279rem ${this.itemPadding}rem`;
        item.style.borderRadius = `${this.itemBorderRadius}rem`;
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

    addEventListeners() {
        // 마우스 이벤트
        this.wrapper.addEventListener('mousedown', this.dragStart.bind(this));
        window.addEventListener('mousemove', this.dragMove.bind(this));
        window.addEventListener('mouseup', this.dragEnd.bind(this));
        window.addEventListener('mouseleave', this.dragEnd.bind(this));

        // 터치 이벤트
        this.wrapper.addEventListener('touchstart', this.dragStart.bind(this));
        window.addEventListener('touchmove', this.dragMove.bind(this));
        window.addEventListener('touchend', this.dragEnd.bind(this));
    }

    dragStart(e) {
        if (e.type === 'mousedown') {
            e.preventDefault();
        }
        this.isDragging = true;
        this.startX = this.getPositionX(e);
        this.startPosition = this.getCurrentTranslate();

        this.wrapper.style.transition = 'none';
        if (this.animationID) {
            cancelAnimationFrame(this.animationID);
        }
    }

    dragMove(e) {
        if (!this.isDragging) return;

        const currentX = this.getPositionX(e);
        const diff = currentX - this.startX;
        const newTranslate = this.startPosition + diff;

        this.setTranslate(newTranslate);
    }

    dragEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.wrapper.style.transition = 'transform 0.3s ease';

        const currentTranslate = this.getCurrentTranslate();
        const totalWidth = this.remToPx(this.itemWidth + this.itemGap);
        const moveAmount = currentTranslate - this.initialOffset;
        let snapIndex = Math.round(moveAmount / -totalWidth);

        // 범위 제한
        snapIndex = Math.max(0, Math.min(snapIndex, carouselData.length - 1));

        // 새로운 위치 계산
        const newTranslate = this.initialOffset - (snapIndex * totalWidth);
        this.setTranslate(newTranslate);
        this.currentIndex = snapIndex;
    }

    getCurrentTranslate() {
        const style = window.getComputedStyle(this.wrapper);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    }

    setTranslate(x) {
        this.wrapper.style.transform = `translateX(${x}px)`;
    }

    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
}

// 캐러셀 초기화
document.addEventListener('DOMContentLoaded', () => {
    new Carousel('.sec-12__carousel');
});


// ========== 이미지 변경 스크립트 ========== 

class ImageSlideshow {
    constructor(options) {
        this.images = options.images;
        this.interval = options.interval || 2000;
        this.currentIndex = 0;
        this.img1 = document.querySelector(options.img1Selector);
        this.img2 = document.querySelector(options.img2Selector);
        this.isTransitioning = false;
        this.intervalId = null;

        // 초기 상태 설정
        this.img1.src = this.images[0];
        this.img2.src = this.images[1];
        this.currentIndex = 1; // 다음 전환을 위해 1로 설정
    }

    preloadImages() {
        // 이미지 미리 로드
        this.images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    changeImage() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const currentImg = this.img1.classList.contains('active') ? this.img1 : this.img2;
        const nextImg = currentImg === this.img1 ? this.img2 : this.img1;

        // 다음 이미지 설정
        nextImg.src = this.images[this.currentIndex];

        currentImg.classList.remove('active');
        nextImg.classList.add('active');

        // 전환 애니메이션이 완료된 후 상태 초기화
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);

        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    start() {
        this.preloadImages();
        this.intervalId = setInterval(() => this.changeImage(), this.interval);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.stop();
        } else {
            this.start();
        }
    }
}

// ========== 이미지 변경 스크립트 ========== 


// ========== 이미지 변경 스크립트 (AI 일정 적용) ==========

// AI 일정 이미지 슬라이드쇼
const aiSlideshow = new ImageSlideshow({
    images: [
        './assets/images/mockup/ai_planer_mockup_1.webp',
        './assets/images/mockup/ai_planer_mockup_2.webp',
        './assets/images/mockup/ai_planer_mockup_3.webp',
        './assets/images/mockup/ai_planer_mockup_4.webp',
        './assets/images/mockup/ai_planer_mockup_5.webp',
        './assets/images/mockup/ai_planer_mockup_6.webp',
        './assets/images/mockup/ai_planer_mockup_7.webp'
    ],
    interval: 2000,
    img1Selector: '.sec-12__ai-img.img1',
    img2Selector: '.sec-12__ai-img.img2'
});

// 슬라이드쇼 시작
aiSlideshow.start();

// 페이지 가시성 변경 감지
document.addEventListener('visibilitychange', () => {
    aiSlideshow.handleVisibilityChange();
});

// ========== 이미지 변경 스크립트 (AI 일정 적용) ==========


// ========== 이미지 변경 스크립트 (AR 가이드 적용) ==========

const arSlideshow = new ImageSlideshow({
    images: [
        './assets/images/mockup/sec-13-ar-guide-a.webp',
        './assets/images/mockup/sec-13-ar-guide-b.webp',
        './assets/images/mockup/sec-13-ar-guide-c.webp',
        './assets/images/mockup/sec-13-ar-guide-d.webp'
    ],
    interval: 2000,
    img1Selector: '.sec-13__guide-image.img1',
    img2Selector: '.sec-13__guide-image.img2'
});

// 슬라이드쇼 시작
arSlideshow.start();

// 페이지 가시성 변경 감지
document.addEventListener('visibilitychange', () => {
    arSlideshow.handleVisibilityChange();
});

// ========== 이미지 변경 스크립트 (AR 가이드 적용) ==========


// ========== 미션 카드 회전 효과  ==========

// 미션 카드 요소 선택
let missionCards = document.querySelectorAll('.sec-13__mission-card');
const rotationStrength = 0.5;  // 회전 강도
const perspective = 1000;  // 원근 거리

// 회전 강도 계산 함수
function calculateRotation(value) { 
    return Math.pow(Math.abs(value), 1.5) * Math.sign(value);
}

// 마우스 이벤트 핸들러 추가
missionCards.forEach(card => {
    card.style.perspective = `${perspective}px`;
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.1s ease-out';

    // mousemove 이벤트 핸들러 추가
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect(); // 카드 요소의 위치 및 크기 정보
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); 
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        
        // 회전 강도 계산
        const rotateX = calculateRotation(y) * rotationStrength * 45;
        const rotateY = calculateRotation(-x) * rotationStrength * 45;
        
        // 카드 요소에 회전 효과 적용
        card.style.transform = `
            perspective(${perspective}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    });

    // mouseleave 이벤트 핸들러 추가
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// ========== 브라우저 별 비디오 변경  ==========
document.addEventListener("DOMContentLoaded", function () {
    // Safari 또는 iOS 브라우저 감지
    const isSafariOrIOS = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
        (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

    // sec-14의 비디오 파일 배열
    const sec14VideoFiles = [
        "ar-mission-1", "ar-mission-2", "ar-mission-3",
        "ar-mission-4", "ar-mission-5", "ar-mission-6"
    ];

    // sec-15의 비디오 파일 배열
    const sec15VideoFiles = [
        "sec-15-video-1", "sec-15-video-2", "sec-15-video-3",
        "sec-15-video-4"
    ];

    // sec-14__video-element 처리
    function setupSec14Videos() {
        const videoElements = document.querySelectorAll(".sec-14__video-element");

        videoElements.forEach((videoElement, index) => {
            if (index < sec14VideoFiles.length) { // sec14VideoFiles 배열 범위 내에 있는지 확인
                const videoFileName = sec14VideoFiles[index];

                if (isSafariOrIOS) {
                    const gifElement = document.createElement("img");
                    gifElement.src = `./assets/videos/${videoFileName}.gif`;
                    gifElement.alt = `AR Mission GIF ${index + 1}`;
                    gifElement.className = "sec-14__video-element";

                    videoElement.parentNode.replaceChild(gifElement, videoElement);
                    console.log(`Replaced video element in sec-14 with GIF for ${videoFileName}`);
                } else {
                    videoElement.src = `./assets/videos/${videoFileName}.webm`;
                    videoElement.type = "video/webm";
                    videoElement.load();
                }
            }
        });
    }

    // sec-15__video 처리
    function setupSec15Videos() {
        const videoElements = document.querySelectorAll(".sec-15__video");

        videoElements.forEach((videoElement, index) => {
            if (index < sec15VideoFiles.length) { // sec15VideoFiles 배열 범위 내에 있는지 확인
                const videoFileName = sec15VideoFiles[index];

                if (isSafariOrIOS) {
                    const gifElement = document.createElement("img");
                    gifElement.src = `./assets/videos/${videoFileName}.gif`;
                    gifElement.alt = `Section 15 Video GIF ${index + 1}`;
                    gifElement.className = "sec-15__video";

                    videoElement.parentNode.replaceChild(gifElement, videoElement);
                    console.log(`Replaced video element in sec-15 with GIF for ${videoFileName}`);
                } else {
                    videoElement.src = `./assets/videos/${videoFileName}.webm`;
                    videoElement.type = "video/webm";
                    videoElement.load();
                }
            }
        });
    }

    // 각 섹션 비디오 설정 함수 호출
    setupSec14Videos();
    setupSec15Videos();
});

// ========== gsap 애니메이션 효과 ==========

document.addEventListener("DOMContentLoaded", function () {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Get the total number of wrappers
    const totalPanels = document.querySelectorAll(".sec-14__wrapper").length;

    // Create the horizontal scroll effect
    const horizontalScroll = gsap.timeline({
        scrollTrigger: {
            trigger: "#sec-14",
            start: "top top",
            end: () => `+=${document.querySelector('.sec-14__overflow-x').offsetWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true, // 화면 크기 변경 시 재계산
            snap: {
                snapTo: 1 / (totalPanels - 1),
                duration: {
                    min: 0.2,
                    max: 0.3
                },
                ease: "power1.inOut"
            }
        }
    });

    // Animate the horizontal scrolling
    horizontalScroll.to(".sec-14__overflow-x", {
        x: () => -(document.querySelector('.sec-14__overflow-x').offsetWidth - window.innerWidth),
        ease: "none"
    });
});
