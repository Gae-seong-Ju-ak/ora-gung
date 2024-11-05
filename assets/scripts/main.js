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


// ========== 디자인 가이드 스크립트 ==========
// 롤링 배너 복제본 생성
let roller = document.querySelector('.icon__rolling-list');
roller.id = 'roller1';

let clone = roller.cloneNode(true);
clone.id = 'roller2';
document.querySelector('.icon__rolling-wrap').appendChild(clone);

document.querySelector('#roller1').style.left = '0px';
document.querySelector('#roller2').style.left = document.querySelector('.icon__rolling-list > div').offsetWidth + 'px';

roller.classList.add('original');
clone.classList.add('clone');



// ========== 온보딩 스크립트 ==========
const phones = [{
        id: 1,
        name: "Phone 1",
        frontImage: "./assets/images/mockup/on-boarding_1.webp"
    },
    {
        id: 2,
        name: "Phone 2",
        frontImage: "./assets/images/mockup/on-boarding_2.webp"
    },
    {
        id: 3,
        name: "Phone 3",
        frontImage: "./assets/images/mockup/on-boarding_3.webp"
    },
    {
        id: 4,
        name: "Phone 4",
        frontImage: "./assets/images/mockup/on-boarding_4.webp"
    },
    {
        id: 5,
        name: "Phone 5",
        frontImage: "./assets/images/mockup/on-boarding_5.webp"
    }
];

const carousel = document.querySelector('.carousel');
const carouselContainer = document.querySelector('.carousel-container');
let currentAngle = 0;
let startX = 0;
let isDragging = false;
let lastAngle = 0;
const anglePerItem = 360 / phones.length; // 각 아이템 간의 각도
let hasMoved = false; // 드래그 동안 이동했는지 확인하는 플래그

// 폰 요소 생성
phones.forEach((phone) => {
    const phoneElement = document.createElement('div');
    phoneElement.className = 'phone';

    const frontImg = document.createElement('img');
    frontImg.src = phone.frontImage;
    frontImg.alt = phone.name;
    phoneElement.appendChild(frontImg);

    carousel.appendChild(phoneElement);
});

// 3D 변환 계산
function getTransform(index) {
    const baseAngle = (360 / phones.length) * index + currentAngle;
    const radius = 20;
    const z = `${radius * Math.cos((baseAngle * Math.PI) / 180)}rem`;
    const x = `${radius * Math.sin((baseAngle * Math.PI) / 180)}rem`;
    return `translateX(${x}) translateZ(${z}) rotateY(0deg)`;
}

// 캐러셀 업데이트
function updateCarousel() {
    const phoneElements = document.querySelectorAll('.phone');
    phoneElements.forEach((phone, index) => {
        phone.style.transform = getTransform(index);
    });
}

// 드래그 시작
function handleDragStart(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    carousel.style.transition = 'none';
    hasMoved = false; // 드래그 시작할 때 이동 플래그 초기화
}

// 드래그 중
function handleDragMove(e) {
    if (!isDragging || hasMoved) return;

    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX - startX;

    // 일정 거리 이상 드래그되면 한 칸만 이동
    if (Math.abs(deltaX) > 10) { // 최소 드래그 거리 설정
        if (deltaX > 0) {
            currentAngle += anglePerItem; // 오른쪽으로 한 칸 이동
        } else {
            currentAngle -= anglePerItem; // 왼쪽으로 한 칸 이동
        }

        hasMoved = true; // 이동 완료 표시
        updateCarousel();
        lastAngle = currentAngle;
    }
}

// 드래그 끝
function handleDragEnd() {
    if (!isDragging) return;

    isDragging = false;
    startX = 0;
    carousel.style.transition = 'transform 0.2s ease-out';
    lastAngle = currentAngle;
}

// 이벤트 리스너
carouselContainer.addEventListener('mousedown', handleDragStart);
window.addEventListener('mousemove', handleDragMove);
window.addEventListener('mouseup', handleDragEnd);

carouselContainer.addEventListener('touchstart', handleDragStart);
window.addEventListener('touchmove', handleDragMove, {
    passive: false
});
window.addEventListener('touchend', handleDragEnd);

// === 초기 위치 설정 및 페이드인 효과 ===
document.addEventListener("DOMContentLoaded", function () {
    // 캐러셀 초기 위치 설정
    updateCarousel();

    // 페이드인 페이드 아웃 효과
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                } else {
                    entry.target.classList.remove("fade-in");
                }
            });
        }, {
            threshold: 0.1
        }
    );

    // 여러 클래스를 한번에 선택
    const targetElements = document.querySelectorAll(".fade-wrap, .fade-wrap2");
    targetElements.forEach((element) => observer.observe(element));
});





//==== 지도 스크롤 티거 ====

const details = gsap.utils.toArray(".sec__03-content-box:not(:first-child)")
const photos = gsap.utils.toArray(".sec__03-desktopPhoto:not(:first-child)")


gsap.set(photos, {
    yPercent: 101
})

const allPhotos = gsap.utils.toArray(".sec__03-desktopPhoto")



let mm = gsap.matchMedia();


mm.add("(min-width: 600px)", () => {


    console.log("desktop")

    ScrollTrigger.create({
        trigger: ".sec__03-map",
        start: "top top",
        end: "bottom bottom",
        pin: ".sec__03-right"
    })


    details.forEach((detail, index) => {

        let headline = detail.querySelector(".sec__03-content-box h3")
        let animation = gsap.timeline()
            .to(photos[index], {
                yPercent: 0
            })
            .set(allPhotos[index], {
                autoAlpha: 0
            })
        ScrollTrigger.create({
            trigger: headline,
            start: "top 80%",
            end: "top 50%",
            animation: animation,
            scrub: true,
            markers: false
        })
    })



    return () => {
        console.log("mobile")
    };
});



// ===유저 데스크 원 스크롤 티거 ===

gsap.fromTo(".moving-circle", {
    strokeDasharray: 600,
    strokeDashoffset: 600
}, {
    strokeDashoffset: 0,
    scrollTrigger: {
        trigger: ".moving-circle",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
    }
});






var swiper1 = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 1000,
    loop: true,
});





// 기존 클래스 이름을 다른 이름으로 교체
const detailsNew = gsap.utils.toArray(".sec__10-content-box:not(:first-child)")
const photosNew = gsap.utils.toArray(".sec__10-desktopPhoto:not(:first-child)")

gsap.set(photosNew, {
    yPercent: 101
})

const allPhotosNew = gsap.utils.toArray(".sec__10-desktopPhoto")

mm.add("(min-width: 600px)", () => {

    ScrollTrigger.create({
        trigger: ".sec__10-phone", // 새로운 트리거 섹션
        start: "top top",
        end: "bottom bottom",
        pin: ".sec__10-right" // 새로 고정할 요소
    })

    detailsNew.forEach((detail, index) => {

        let headline = detail.querySelector(".sec__10-content-box h3")
        let animation = gsap.timeline()
            .to(photosNew[index], {
                yPercent: 0
            })
            .set(allPhotosNew[index], {
                autoAlpha: 0
            })
        ScrollTrigger.create({
            trigger: headline,
            start: "top 80%",
            end: "top 50%",
            animation: animation,
            scrub: true,
            markers: false
        })
    })
})

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
    // p 태그 동적 생성 및 스타일링
    let pElement = document.createElement('p');
    pElement.textContent = `Step 1`; // 초기 텍스트 설정
    pElement.classList.add('dynamic-text'); // 고유 클래스 추가
    pElement.style.position = 'absolute';
    pElement.style.top = '3rem';
    pElement.style.color = '#00A695';
    pElement.style.textAlign = 'center';
    pElement.style.fontSize = '1.5rem';
    pElement.style.fontWeight = '500';
    pElement.style.width = '100%';
    item.appendChild(pElement);

    // 이미지 요소 생성
    let imgElement = document.createElement('img');
    imgElement.src = images[index][0];
    imgElement.alt = `Image ${index + 1}-1`;
    item.appendChild(imgElement);

    // 관찰 시작
    observer.observe(item);
});

function startImageTransition() {
    let currentImageIndex = 1;
    intervalId = setInterval(() => {
        stampItems.forEach((item, index) => {
            const imgElement = item.querySelector('img');
            const pElement = item.querySelector('.dynamic-text'); // 동적으로 생성된 p 태그만 선택

            // 이미지 변경
            imgElement.src = images[index][currentImageIndex];
            imgElement.alt = `Image ${index + 1}-${currentImageIndex + 1}`;

            // 동적 p 태그의 내용 업데이트
            pElement.textContent = `Step ${currentImageIndex + 1}`;

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