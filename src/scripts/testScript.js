window.addEventListener("load", function () {
    console.log("Loaded");
    //alert("i am script")
   // setUsers(users);
    //helloWorld();
    //setStyles(styles);
});

export function generateSearchWidget() {
    var container = document.getElementById("test-container");

    if(container.id ==="test-container") {
        //alert("Hello World!");
    }
    console.log("run")
    container.innerHTML='';
    var btn = document.createElement("button");
    var btnText = document.createTextNode("Click me");
    btn.appendChild(btnText);

    var posbtnition = document.getElementById("test-container");
    //position.insertBefore(btn, position[0]);

    container.insertAdjacentElement("beforeend", btn);

    // var elemDiv = document.createElement('div');
    // elemDiv.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000;';
    // document.body.appendChild(elemDiv);

    // var text = document.createElement("p");
    // text.textContent = "Hello World!";
    // container.appendChild(text);
    // document.body.insertAdjacentElement(container.after,text)
    //
    //
    // var divAbove = document.createElement("div");
   //divAbove.id = "up";
   //divAbove.style.backgroundColor  = "red";
   //divAbove.style.width = "110px"
  //divAbove.style.height = "60px"
   //divAbove.innerHTML = "Added via JS".
   //container.appendChild(div);

  // container.insertBefore(divAbove, div);

}

