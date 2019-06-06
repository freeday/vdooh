import { fabric } from "fabric";

let run = function() {
  let canvas = new fabric.Canvas("canvas");
  canvas.setHeight(400);
  canvas.setWidth(600);

  function addText() {
    canvas.add(
      new fabric.IText("Для редактирования \nнажмите 2 раза на текст", {
        left: 50,
        top: 100,
        fontFamily: "arial black",
        fill: "#333",
        fontSize: 30,
        textAlign: "center"
      })
    );
  }

  function addImg(e) {
    let objects = canvas.getObjects();
    for (let i in objects) {
      objects[i].remove();
    }
    let reader = new FileReader();
    reader.onload = function(event) {
      let img = new Image();
      img.onload = function() {
        let imgInstance = new fabric.Image(img, {
          selectable: 1
        });
        canvas.add(imgInstance);
        canvas.discardActiveObject().renderAll();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function simulateClick(elem) {
    let evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });
    const canceled = !elem.dispatchEvent(evt);
  }

  function saveCanvas(e) {
    let elem = document.createElement("a");

    const download = "canvas.png";
    const href = canvas.toDataURL({
      format: "png",
      quality: 0.8,
      selectable: 1
    });

    elem.href = href;
    elem.download = download;
    simulateClick(elem);
  }

  let btnAddText = document.getElementById("addText");
  btnAddText.addEventListener("click", addText);

  let fieldAddImg = document.getElementById("addImg");
  fieldAddImg.addEventListener("change", addImg);

  let btnSaveCanvas = document.getElementById("saveCanvas");
  btnSaveCanvas.addEventListener("click", saveCanvas);
};

document.addEventListener("DOMContentLoaded", run);
