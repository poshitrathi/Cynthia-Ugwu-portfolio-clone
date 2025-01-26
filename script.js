var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageanimation() {
    var tl = gsap.timeline();

    tl.from('#nav' , {  duration: 1.5, y: -10, opacity: 0, ease: Expo.easeInOut })

    .to(".boundingelem" , {  duration: 2, y: 0, ease: Expo.easeInOut ,delay: -1,stagger:0.3})

    .from("#herofooter" , {  duration: 1.5, y: -10, opacity: 0, ease: Expo.easeInOut ,delay: -1})
}

function circleChaptaKaro() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;
  
    var xprev = 0;
    var yprev = 0;
  
    window.addEventListener("mousemove", function (dets) {
      clearTimeout(timeout);
  
      xscale = gsap.utils.clamp(0.7, 1.5, dets.clientX - xprev);
      yscale = gsap.utils.clamp(0.7, 1.5, dets.clientY - yprev);
  
      xprev = dets.clientX;
      yprev = dets.clientY;
  
      circleMouseFollower(xscale, yscale);
  
      timeout = setTimeout(function () {
        document.querySelector(
          "#minicircle"
        ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
      }, 100);
    });
  }

function circleMouseFollower() {
    const minicircle = document.querySelector("#minicircle");

    let xscale = 1; // Initial horizontal scale
    let yscale = 1; // Initial vertical scale

    // Mouse movement listener
    window.addEventListener("mousemove", function (e) {
        minicircle.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale}, ${yscale})`;
    });

    // Mouse over and out listeners for scaling effects
    minicircle.addEventListener("mouseover", function () {
        xscale = 10; // Increase scale on hover
        yscale = 10;
    });

    minicircle.addEventListener("mouseout", function () {
        xscale = 1; // Reset scale when not hovered
        yscale = 1;
    });
}
circleChaptaKaro();
circleMouseFollower();
firstPageanimation();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });
