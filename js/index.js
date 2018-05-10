window.onload = function () {
  initTyping();
  bindNavEvent();
  bindAHref();
  bindLogoEvent();
  bindPanelCloseEvent();
  bindFiltersEvent();
  checkQueryString();
  /***
   * bg
   * 新project
   */

  function initTyping() {
    let lineIndex = 0;
    let isBacking = false;
    setInterval(() => {
      let textArr = ["Put into practice. ", "Self-development. ", "Positive. "];
      let element = document.querySelector(".typingText");
      let vvv = element.textContent;
      let index = vvv.length;
      let fullText = textArr[lineIndex];
      if (isBacking) {
        index--;
      } else {
        index++;
      }
      if (index === fullText.length) {
        isBacking = !isBacking;
      }
      if (index === -1) {
        isBacking = !isBacking;
        if (lineIndex < textArr.length - 1) {
          lineIndex++;
        } else {
          lineIndex = 0;
        }
      }
      let newText = fullText.substring(0, index);
      element.textContent = newText;
    }, 200);
  }

  function bindNavEvent() {
    let elements;
    if (isPC()) {
      elements = document.querySelectorAll(".nav");
    } else {
      elements = document.querySelectorAll(".mobileNav");
      let menuSW = document.querySelector(".mobileNavsSW");
      menuSW.addEventListener(
        "click",
        function () {
          let target = "top";
          let targetElem = document.querySelector("#navPanel");
          targetElem.classList.add("active");
          targetElem.style.opacity = 0;
          var movePanel = setInterval(function () {
            let offset = 0;
            if (target === "left" || target === "right") {
              offset = targetElem.offsetLeft;
            } else if (target === "top" || target === "bottom") {
              offset = targetElem.offsetTop;
            }

            let o = Number(targetElem.style.opacity);
            let isFinal = Math.abs(offset) < 10;
            if (isFinal) {
              targetElem.style[target] = 0 + "px";
              targetElem.style["opacity"] = 1;
              clearInterval(movePanel);
            } else {
              let subValue = Math.abs(offset) > 200 ? 50 : 10; //快要撞到了就要踩剎車            
              targetElem.style[target] = Math.abs(offset) - subValue + "px";
              if (o < 1) {
                targetElem.style["opacity"] = o + 0.1;
              }
            }
          }, 2);
        },
        false
      );
    }

    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(
        "click",
        function () {
          // if (!isPC()) { //關閉panel時也要把navPanel關掉
          //   let target = "top";
          //   let targetElem = document.querySelector("#navPanel");
          //   if (targetElem.classList.contains('active')) {
          //     targetElem.style[target] = "100%";
          //     targetElem.classList.remove("active");
          //   }
          // }
          const target = this.getAttribute("target");
          const navName = getTargetByNavName(target);
          updateURL(navName);
          fadeInPanel(target);
        },
        false
      );
    }
  }

  function fadeInPanel(target) {
    const navArr = ["top", "right", "bottom", "left"];
    for (let index = 0; index < navArr.length; index++) { //要打開某panel前, 四大panel必須都先關掉
      let tempTarget = navArr[index];
      let targetElem = document.querySelector("#" + tempTarget + "Panel");
      if (targetElem.classList.contains('active')) {
        targetElem.style[tempTarget] = "100%";
        targetElem.classList.remove("active");
      }
    }

    window.scrollTo(0, 0); //每次打開panel都要滾回最上面

    let targetElem = document.querySelector("#" + target + "Panel");
    targetElem.classList.add("active");
    targetElem.style.opacity = 0;
    var movePanel = setInterval(function () {
      let offset;
      if (target === "left" || target === "right") {
        offset = targetElem.offsetLeft;
      } else if (target === "top" || target === "bottom") {
        offset = targetElem.offsetTop;
      }
      let o = Number(targetElem.style.opacity);
      let isFinal = Math.abs(offset) < 10;
      if (isFinal) {
        targetElem.style[target] = 0 + "px";
        targetElem.style["opacity"] = 1;
        clearInterval(movePanel);
      } else {
        let subValue = Math.abs(offset) > 200 ? 50 : 10; //快要撞到了就要踩剎車            
        targetElem.style[target] = Math.abs(offset) - subValue + "px";
        if (o < 1) {
          targetElem.style["opacity"] = o + 0.1;
        }
      }
    }, 2);
  }

  function bindAHref() {
    let elements = document.querySelectorAll("a[panelSW]");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(
        "click",
        function () {
          let target = this.getAttribute("target");
          const navName = getTargetByNavName(target);
          updateURL(navName);
          fadeInPanel(target);
        },
        false
      );
    }
  }

  function bindLogoEvent() {
    let element = document.querySelector("div.logo");
    element.addEventListener(
      "click",
      function () {
        let targetElems = document.querySelectorAll("div.panel");
        for (let i = 0; i < targetElems.length; i++) {
          let targetElem = targetElems[i];
          if (targetElem.classList.contains('active')) {
            const target = targetElem.getAttribute("target");
            targetElem.style[target] = "100%";
            targetElem.classList.remove("active");
          }
        }
        if (!isPC()) {
          let targetElem = document.querySelector("div.mobileNavs");
          if (targetElem.classList.contains('active')) {
            let target = "top";
            targetElem.style[target] = "100%";
            targetElem.classList.remove("active");
          }
        }
        updateURL("");
      },
      false
    );
  }

  function bindPanelCloseEvent() {
    let elements = document.querySelectorAll(".closePanel");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(
        "click",
        function () {
          updateURL("");
          let target = this.parentElement.getAttribute("target");
          let targetElem = document.querySelector("#" + target + "Panel");
          if (targetElem.classList.contains('active')) {
            if (target === "nav") {
              target = "top";
            }
            targetElem.style[target] = "100%";
            targetElem.classList.remove("active");
          }
          document.body.scrollTop = 0; //避免在scrollBar滾到下面時回到bg底部白色一塊
        },
        false
      );
    }
  }

  function bindFiltersEvent() {
    let element = document.querySelector(".filtersEvent");
    element.addEventListener(
      "click",
      function (e) {
        if (e.target.tagName !== "BUTTON") {
          return; //不是點到button就離開
        }

        //remove all button that has .active, then attach to current target.
        let filterButtons = e.currentTarget.children;
        for (let i = 0; i < filterButtons.length; i++) {
          const button = filterButtons[i];
          if (button.classList.contains('active')) {
            button.classList.remove("active");
          }
        }
        e.target.classList.add("active");

        //filter childs that match filter.
        const filter = e.target.getAttribute("filter");
        const isQueryAll = filter === "";
        let projectElems = document.querySelectorAll(".projectContainer>div");
        for (let i = 0; i < projectElems.length; i++) {
          let projectElem = projectElems[i];
          let types = projectElem.children[2].getAttribute("type").split(";");
          if (types.length > 0) {
            if (types.includes(filter) || isQueryAll) {
              projectElem.style.display = "";
            } else {
              projectElem.style.display = "none";
            }
          }
        }
      },
      false
    );
  }

  function checkQueryString() {
    const hashValue = window.location.hash.split("#")[1];
    if (hashValue) {
      setTimeout(function () {
        const target = getNavNameByTarget(hashValue);
        fadeInPanel(target);
      }, 200);
    }
  }

  function getNavNameByTarget(v) { //回上下左右
    const panelArr = ["about", "contact", "skill", "project"]; //name
    const navArr = ["top", "right", "bottom", "left"]; //target
    const index = panelArr.indexOf(v);
    return navArr[index];
  }

  function getTargetByNavName(v) { //回標籤名
    const panelArr = ["about", "contact", "skill", "project"]; //name
    const navArr = ["top", "right", "bottom", "left"]; //target
    const index = navArr.indexOf(v);
    return panelArr[index];
  }

  function updateURL(hashValue) {
    let v = hashValue;
    if (hashValue) {
      v = '#' + hashValue;
    }

    if (history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + v;
      if (window.location.href === newurl) { //一樣就沒必要換了
        return;
      }
      window.history.pushState({
        path: newurl
      }, '', newurl);
    }
  }

  function isPC() {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 575.98;
  }
};