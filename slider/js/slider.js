function createSlider(el, imgsUrl, setTimes) {
  const count = imgsUrl.length
  let imgArea = document.createElement('div');
  let navArea = document.createElement('div');
  // let currentIndex = Math.floor(count / 2);
  let currentIndex = 0;
  let timer = null;

  initImgs();
  initNav();
  setStatus();
  autoChange(setTimes);

  function initImgs() {
    imgArea.style.width = "100%";
    imgArea.style.height = "100%";
    imgArea.style.display = "flex";
    imgArea.style.overflow = "hidden";
    for (let i = 0; i < count; i++) {
      const imgObj = imgsUrl[i];
      let img = document.createElement('img');
      img.src = imgObj.imgUrl;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.marginLeft = "0";
      img.style.transition = "margin-left .8s ease-out";
      img.style.cursor = "pointer";

      if (imgObj.link) {
        img.addEventListener('click', function () {
          location.href = imgObj.link;
        })
      }

      imgArea.appendChild(img);
    }
    imgArea.addEventListener('mouseenter', function () {
      clearInterval(timer);
      timer = null;
    })
    imgArea.addEventListener('mouseleave', function () {
      autoChange(setTimes);
    })
    el.appendChild(imgArea)
  }

  function initNav() {
    navArea.style.textAlign = "center";
    navArea.style.marginTop = "-32px";
    for (let i = 0; i < count; i++) {
      let nav = document.createElement('span');
      nav.style.display = "inline-block";
      nav.style.width = "18px";
      nav.style.height = "18px";
      nav.style.backgroundColor = "lightgray";
      nav.style.cursor = "pointer";
      nav.style.margin = "0 8px";
      nav.style.borderRadius = "50%";

      nav.addEventListener('click', function () {
        currentIndex = i;
        setStatus();
      });

      navArea.appendChild(nav);
    }
    el.appendChild(navArea);
  }

  function setStatus() {
    for (let i = 0; i < count; i++) {
      if (i === currentIndex) {
        navArea.children[i].style.backgroundColor = "darkorange";
      } else {
        navArea.children[i].style.backgroundColor = "lightgray";
      }
    }

    let targetMarginLeft = -100 * currentIndex;
    imgArea.children[0].style.marginLeft = targetMarginLeft + "%";
  }

  function autoChange(showTime) {
    timer = setInterval(function () {
      if (currentIndex === count - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      setStatus();
    }, showTime);
  }
}