// ========== 디자인 가이드 스크립트 ==========
// 롤링 배너 복제본 생성
let roller = document.querySelector('.icon__rolling-list');
roller.id = 'roller1'; // 아이디 부여

let clone = roller.cloneNode(true);
// cloneNode : 노드 복제. 기본값은 false. 자식 노드까지 복제를 원하면 true 사용
clone.id = 'roller2';
document.querySelector('.icon__rolling-wrap').appendChild(clone); // wrap 하위 자식으로 부착

document.querySelector('#roller1').style.left = '0px';
document.querySelector('#roller2').style.left = document.querySelector('.icon__rolling-list').offsetWidth + 'px';
// offsetWidth : 요소의 크기 확인(margin을 제외한 padding값, border값까지 계산한 값)

roller.classList.add('original');
clone.classList.add('clone');

// ========== 온보딩 스크립트 ==========
const phones = [
    { id: 1, name: "Phone 1", frontImage: "./assets/images/mockup/on-boarding_1.webp" },
    { id: 2, name: "Phone 2", frontImage: "./assets/images/mockup/on-boarding_2.webp" },
    { id: 3, name: "Phone 3", frontImage: "./assets/images/mockup/on-boarding_3.webp" },
    { id: 4, name: "Phone 4", frontImage: "./assets/images/mockup/on-boarding_4.webp" },
    { id: 5, name: "Phone 5", frontImage: "./assets/images/mockup/on-boarding_5.webp" }
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
window.addEventListener('touchmove', handleDragMove, { passive: false });
window.addEventListener('touchend', handleDragEnd);

// 초기 위치 설정
updateCarousel();