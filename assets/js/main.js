const Lenis = require("@studio-freight/lenis");
const anime = require('animejs');

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

let render = ( time ) => {
    lenis.raf(time);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

anime({
    targets: '.disclaimer',
    right: 0,
    duration: 1000
});

let logoAnim = anime({
    targets: '.logo',
    width: 300,
    height: 150,
    top: 50,
    easing: 'easeInOutExpo',
    duration: 1000,
    autoplay: false
});

let scrollFadeAnim = anime({
    targets: '.scrolldwn',
    opacity: 0,
    easing: 'easeInOutExpo',
    duration: 1000,
    autoplay: false
});

let navDisplayAnim = anime({
    targets: '.nav',
    height: 100,
    background: 'rgb(15, 15, 15)',
    easing: 'easeInOutExpo',
    duration: 500,
    delay: 500,
    autoplay: false
})

let navButtonsVisible = false;
let navButtonsInAnim = anime({
    targets: '.navbtn',
    opacity: 1,
    marginTop: 0,
    duration: 500,
    delay: anime.stagger(100),
    autoplay: false,
})

let navButtonsOutAnim = anime({
    targets: '.navbtn',
    opacity: 1,
    marginTop: 0,
    duration: 500,
    delay: anime.stagger(100),
    autoplay: false,
    direction: 'reverse'
})

let image1RotateAnim = anime({
    targets: '.image1',
    perspective: 0,
    rotateY: 0.025,
    duration: 1000,
    delay: 500,
    easing: 'easeInOutExpo',
    autoplay: false
})

let image2RotateAnim = anime({
    targets: '.image2',
    perspective: 0,
    rotateY: -0.025,
    duration: 1000,
    delay: 1000,
    easing: 'easeInOutExpo',
    autoplay: false
})

let profileInAnim = anime({
    targets: '.profile-card',
    translateY: -150,
    duration: 500,
    delay: anime.stagger(50, { start: 1500 }),
    easing: 'easeInOutExpo',
    autoplay: false
})

let filmInAnim = anime({
    targets: '.film',
    translateY: -150,
    duration: 1000,
    delay: anime.stagger(50, { start: 1500, grid: [ 4, 2 ], from: 'center' }),
    easing: 'easeInOutExpo',
    autoplay: false
})

lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    logoAnim.seek(scroll);
    scrollFadeAnim.seek(scroll);
    navDisplayAnim.seek(scroll);
    image1RotateAnim.seek(scroll);
    image2RotateAnim.seek(scroll);
    profileInAnim.seek(scroll);
    filmInAnim.seek(scroll);

    console.log(scroll);

    if(scroll > 864 && navButtonsVisible == false){
        navButtonsVisible = true;
        navButtonsInAnim.play();
    } else if(scroll < 864 && navButtonsVisible == true){
        navButtonsVisible = false;
        navButtonsOutAnim.play();
    }
});

window.onload = () => {
    document.body.style.height = document.body.scrollHeight + 100;
}

document.querySelectorAll('.navbtn').forEach(navbtn => navbtn.style.opacity = 0);