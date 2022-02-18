const html = document.documentElement;
const canvas = document.getElementById("scrollAnimation");
const context = canvas.getContext("2d");
const copy = document.getElementById("copyExample");

const frameCount = 148;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1158;
canvas.height=770;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  // how far has the user scrolled 
  const scrollTop = html.scrollTop;
  // maximum that the user can scroll inside the current window
  const maxScrollTop = html.scrollHeight - window.innerHeight
  const scrollFraction = scrollTop / maxScrollTop;
  // when hits half way then opacity is 1 otherwise opacity moves towards 0
  copy.style.opacity = scrollFraction > 0.5 ? (1 - scrollFraction) : scrollFraction * 2;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});


preloadImages()
