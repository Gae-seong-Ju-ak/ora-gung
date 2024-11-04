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


// ========== 이미지 변경 스크립트 (섹션 3 적용) ==========

const sec5Slideshow = new ImageSlideshow({
    images: [
        './assets/images/mockup/sec-05-mockup-1.webp',
        './assets/images/mockup/sec-05-mockup-2.webp',
        './assets/images/mockup/sec-05-mockup-3.webp',
    ],
    interval: 2000,
    img1Selector: '.sec-05__image.img1',
    img2Selector: '.sec-05__image.img2'
});

// 슬라이드쇼 시작
sec5Slideshow.start();

// 페이지 가시성 변경 감지
document.addEventListener('visibilitychange', () => {
    sec5Slideshow.handleVisibilityChange();
});


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

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const totalPanels = document.querySelectorAll(".sec-14__wrapper").length;
    const overflowElement = document.querySelector('.sec-14__overflow-x');

    const horizontalScroll = gsap.timeline({
        scrollTrigger: {
            trigger: "#sec-14",
            start: "top top",
            end: () => `+=${overflowElement.offsetWidth - window.innerWidth}`,
            scrub: 3,
            pin: true,
            anticipatePin: 1,
            snap: {
                snapTo: 1 / (totalPanels - 1),
                duration: { min: 0.4, max: 0.6 },
                ease: "power2.inOut"
            },
            // invalidateOnRefresh를 false로 설정
            invalidateOnRefresh: false
        }
    });

    horizontalScroll.to(".sec-14__overflow-x", {
        x: () => -(overflowElement.offsetWidth - window.innerWidth),
        ease: "none"
    });
});






document.addEventListener("DOMContentLoaded", function() {
    // Intersection Observer 설정
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            } else {
                entry.target.classList.remove("fade-in");
            }
        });
    }, observerOptions);

    // sec-18__headline 및 sec-18__description 요소 관찰 시작
    const elementsToObserve = document.querySelectorAll(
    ".sec-18__headline, .sec-18__description, .sec-18__image-secondary img, .sec-11__main-mockup-1a, .sec-11__main-mockup-1c, .sec-11__main-mockup-2b, .sec-11__main-mockup-1, .sec-11__main-mockup-2"
);
    elementsToObserve.forEach(element => observer.observe(element));
});


// 두 번째 Swiper 인스턴스
var swiper2 = new Swiper('.swiper-container2', {
    slidesPerView: 2, // 한 번에 보이는 슬라이드 수
    spaceBetween: 1, // 슬라이드 간 간격 (원하는 간격으로 조정)
    centeredSlides: true,
});

document.addEventListener("DOMContentLoaded", function() {
    // 모든 카드 요소를 선택
    const cards = document.querySelectorAll(".sec-13__card");
    let activeCard = null; // 현재 활성화된 카드 추적

    cards.forEach(card => {
        // 각 카드를 클릭했을 때의 동작
        card.addEventListener("click", function(event) {
            event.stopPropagation(); // 클릭 이벤트가 부모로 전파되는 것을 막음

            // 현재 카드가 이미 활성화된 상태라면 비활성화
            if (activeCard === card) {
                card.classList.remove("active");
                activeCard = null;
            } else {
                // 다른 카드가 활성화되어 있는 경우 해당 카드를 비활성화
                if (activeCard) {
                    activeCard.classList.remove("active");
                }
                // 현재 클릭한 카드 활성화
                card.classList.add("active");
                activeCard = card;
            }
        });
    });

    // 카드 범위 밖을 클릭하면 활성화된 카드 비활성화
    document.addEventListener("click", function() {
        if (activeCard) {
            activeCard.classList.remove("active");
            activeCard = null;
        }
    });
});


// 첫 번째 슬라이드쇼 인스턴스
const slideshow1 = new ImageSlideshow({
    images: [
        './assets/images/mockup/hanbok-a.webp',
        './assets/images/mockup/hanbok-1.webp',
        './assets/images/mockup/hanbok-2.webp',
        './assets/images/mockup/hanbok-3.webp'
    ],
    interval: 2000,
    img1Selector: '#slideshow1 .img1',
    img2Selector: '#slideshow1 .img2'
});

// 두 번째 슬라이드쇼 인스턴스
const slideshow2 = new ImageSlideshow({
    images: [
        './assets/images/mockup/hanbok-a.webp',
        './assets/images/mockup/hanbok-b.webp'
    ],
    interval: 2000,
    img1Selector: '#slideshow2 .img1',
    img2Selector: '#slideshow2 .img2'
});

// 슬라이드쇼 시작
slideshow1.start();
slideshow2.start();

// 페이지 가시성 변경 감지
document.addEventListener('visibilitychange', () => {
    slideshow1.handleVisibilityChange();
    slideshow2.handleVisibilityChange();
});