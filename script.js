const intro = document.getElementById("intro");
const target = document.getElementById("target");
const arrow = document.getElementById("arrow");
const letterScene = document.getElementById("letterScene");
const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.querySelector(".envelope");
const music = document.getElementById("music");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let arrowX = window.innerWidth * 0.20;
let arrowY = window.innerHeight * 0.65;

let hasShot = false;


/* =========================
   MOUSE MOVEMENT
========================= */

document.addEventListener("mousemove", (event) => {

    if (hasShot) return;

    mouseX = event.clientX;
    mouseY = event.clientY;

    updateArrow();
    updateParallax();

});


/* =========================
   ARROW AIM
========================= */

function updateArrow() {

    const rect =
        arrow.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;

    const dx =
        mouseX - centerX;

    const dy =
        mouseY - centerY;

    const angle =
        Math.atan2(dy, dx) * 180 / Math.PI;

    arrow.style.transform =
        `rotate(${angle}deg)`;

}


/* =========================
   PARALLAX EFFECT
========================= */

function updateParallax() {

    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight / 2;

    const offsetX =
        (mouseX - centerX) / 35;

    const offsetY =
        (mouseY - centerY) / 35;


    document.documentElement.style.setProperty(
        "--mouse-x",
        `${offsetX}px`
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        `${offsetY}px`
    );


    const glow1 =
        document.querySelector(".glow-1");

    const glow2 =
        document.querySelector(".glow-2");

    const glow3 =
        document.querySelector(".glow-3");


    if (glow1) {

        glow1.style.transform =
            `translate(
                ${offsetX * -1.5}px,
                ${offsetY * -1.5}px
            )`;

    }


    if (glow2) {

        glow2.style.transform =
            `translate(
                ${offsetX * 1.2}px,
                ${offsetY * 1.2}px
            )`;

    }


    if (glow3) {

        glow3.style.transform =
            `translate(
                ${offsetX * .6}px,
                ${offsetY * .6}px
            )`;

    }

}


/* =========================
   CLICK NEAR TARGET
========================= */

document.addEventListener("click", (event) => {

    if (hasShot) return;

    const rect =
        target.getBoundingClientRect();

    const targetCenterX =
        rect.left + rect.width / 2;

    const targetCenterY =
        rect.top + rect.height / 2;

    const distance =
        Math.hypot(
            event.clientX - targetCenterX,
            event.clientY - targetCenterY
        );


    if (distance < 180) {

        shootArrow();

    }

});


/* =========================
   SHOOT ARROW
========================= */

function shootArrow() {

    hasShot = true;


    const arrowRect =
        arrow.getBoundingClientRect();

    const targetRect =
        target.getBoundingClientRect();


    const targetX =
        targetRect.left -
        arrowRect.width / 2;

    const targetY =
        targetRect.top +
        targetRect.height / 2 -
        arrowRect.height / 2;


    const dx =
        targetRect.left +
        targetRect.width / 2 -
        (
            arrowRect.left +
            arrowRect.width / 2
        );


    const dy =
        targetRect.top +
        targetRect.height / 2 -
        (
            arrowRect.top +
            arrowRect.height / 2
        );


    const angle =
        Math.atan2(dy, dx) *
        180 / Math.PI;


    arrow.style.setProperty(
        "--target-x",
        `${targetX}px`
    );

    arrow.style.setProperty(
        "--target-y",
        `${targetY}px`
    );

    arrow.style.setProperty(
        "--angle",
        `${angle}deg`
    );


    arrow.classList.add("shooting");


    setTimeout(() => {

        intro.style.opacity = "0";

        intro.style.visibility = "hidden";

        intro.style.transform =
            "scale(1.08)";

        letterScene.classList.add("active");

    }, 700);

}


/* =========================
   ENVELOPE OPEN + MUSIC
========================= */

envelopeContainer.addEventListener(
    "click",
    () => {

        envelope.classList.add("open");


        /* تشغيل الأغنية */

        music.volume = 0.4;

        music.play().catch(() => {

            console.log(
                "Music could not start."
            );

        });


        /* تشغيل القلوب والكلام */

        startFloatingLove();

    }
);


/* =========================
   FLOATING LOVE
========================= */

function startFloatingLove() {

    const container =
        document.getElementById(
            "floatingLove"
        );


    if (!container) return;


    container.classList.add("active");


    /* إنشاء القلوب */

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {

            createHeart(container);

        }, i * 180);

    }


    /* إنشاء كلمة بحبك */

    for (let i = 0; i < 9; i++) {

        setTimeout(() => {

            createLoveBalloon(container);

        }, i * 700);

    }

}


/* =========================
   CREATE HEART
========================= */

function createHeart(container) {

    const heart =
        document.createElement("div");


    heart.className =
        "floating-heart";


    const hearts = [
        "❤️",
        "💗",
        "💕",
        "💖",
        "💘",
        "💓"
    ];


    heart.textContent =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.setProperty(
        "--size",
        (18 + Math.random() * 28) + "px"
    );


    heart.style.setProperty(
        "--duration",
        (6 + Math.random() * 5) + "s"
    );


    heart.style.setProperty(
        "--delay",
        (Math.random() * 1.5) + "s"
    );


    heart.style.setProperty(
        "--drift",
        (-100 + Math.random() * 200) + "px"
    );


    container.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 12000);

}


/* =========================
   CREATE "بحبك" BALLOON
========================= */

function createLoveBalloon(container) {

    const balloon =
        document.createElement("div");


    balloon.className =
        "love-balloon";


    balloon.textContent =
        "بحبك ❤️";


    balloon.style.left =
        (10 + Math.random() * 80) + "%";


    balloon.style.setProperty(
        "--text-size",
        (22 + Math.random() * 18) + "px"
    );


    balloon.style.setProperty(
        "--duration",
        (8 + Math.random() * 4) + "s"
    );


    balloon.style.setProperty(
        "--delay",
        "0s"
    );


    balloon.style.setProperty(
        "--drift",
        (-80 + Math.random() * 160) + "px"
    );


    container.appendChild(balloon);


    setTimeout(() => {

        balloon.remove();

    }, 13000);

}


/* =========================
   TOUCH SUPPORT
========================= */

let touchX = 0;
let touchY = 0;


document.addEventListener(
    "touchmove",
    (event) => {

        if (hasShot) return;


        const touch =
            event.touches[0];


        touchX =
            touch.clientX;

        touchY =
            touch.clientY;


        mouseX =
            touchX;

        mouseY =
            touchY;


        updateArrow();
        updateParallax();

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    () => {

        if (hasShot) return;


        const rect =
            target.getBoundingClientRect();


        const targetCenterX =
            rect.left +
            rect.width / 2;


        const targetCenterY =
            rect.top +
            rect.height / 2;


        const distance =
            Math.hypot(
                touchX - targetCenterX,
                touchY - targetCenterY
            );


        if (distance < 200) {

            shootArrow();

        }

    }
);