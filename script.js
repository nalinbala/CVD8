const frameCount = 7; // Match the number of images you actually have

// OR add a 7th text string to textArray so it matches 7 frames.

const currentFrame = (index) =>
  `frames/frame_${index.toString().padStart(4, "0")}.jpg`;

const images = [];
const canvas = document.getElementById("seq-canvas");
const context = canvas.getContext("2d");
const weightText = document.getElementById("weight-text");

canvas.width = 1702;
canvas.height = 1550;

// 👇 Array of texts to show on the right side
const textArray = [
  "Sugath Nuwan, 34, is a father of three and a retired Navy sailor. He is a novelist who has won the hearts of readers by writing more than 1000 novels on Facebook for over 10 years. He died at a young age on August 30 due to a heart attack while on his way to the hospital due to chest pain.",
  "Not only him, We now hear about young deaths from similar heart attacks every day.",
  "Among them are famous musicians, politicians, and athletes, and their loss leaves a huge void that society cannot fill.",
  "More and more individuals between the ages of 20 and 40 are suffering heart attacks. This number is increasing by the day. Out of ten patients presenting for treatment, at least four or five are under the age of 40.",
  "Data indicates that deaths from ischaemic heart disease in young people have more than doubled over the past decade.",
  "Reported deaths from ischaemic heart disease in 25-44 year olds rose sharply from 228 in 2010 to 620 in 2020.",
  ".",
];

const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }
};

function render(index) {
  const img = images[index];
  if (!img || !img.complete) return;

  const canvasAspect = canvas.width / canvas.height;
  const imgAspect = img.width / img.height;

  let drawWidth, drawHeight;

  if (imgAspect > canvasAspect) {
    drawWidth = canvas.width;
    drawHeight = canvas.width / imgAspect;
  } else {
    drawHeight = canvas.height;
    drawWidth = canvas.height * imgAspect;
  }

  const x = (canvas.width - drawWidth) / 2;
  const y = (canvas.height - drawHeight) / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, drawWidth, drawHeight);
}

window.addEventListener("load", () => {
  preloadImages();

  images[0].onload = () => render(0);

  const scrollObj = { frame: 0 };

  gsap.to(scrollObj, {
    frame: frameCount - 1,
    snap: { snapTo: 1, duration: 0.1 },
    ease: "none",
    scrollTrigger: {
      trigger: ".pin-sequence",
      start: "top top",
      end: "+=" + frameCount * 500, // gives smoother scroll length

      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
    onUpdate: () => {
      const current = Math.round(scrollObj.frame);
      render(current);

      // 👇 Update text from array
      if (textArray[current]) {
        weightText.textContent = textArray[current];
      }
    },
  });
});
