const items = document.querySelectorAll(".showcase-list li");

const preview = document.getElementById("preview-image");

let current = 0;

function updateShowcase(){

    items.forEach((item,index)=>{

        item.classList.toggle("active", index === current);

        const offset = index - current;

        const scale =
            offset === 0 ? 1.3 : 1;

        const spacing =
    window.innerWidth > 1200 ? 120 : 80;

    item.style.transform =
    `translate(-50%, calc(-50% + ${offset * spacing}px))
    scale(${scale})`;

        if(Math.abs(offset) > 2){
            item.style.opacity = 0;
        }
        else{
            item.style.opacity =
            1 - Math.abs(offset) * 0.3;
        }

    });

    const link = items[current].querySelector("a");

    preview.style.opacity = "0";

    setTimeout(() => {

        preview.src =
            link.dataset.image;

        preview.style.opacity = "1";

    },150);

}

function changeItem(direction){

    current += direction;

    if(current >= items.length){
        current = 0;
    }

    if(current < 0){
        current = items.length - 1;
    }

    updateShowcase();
}

let isScrolling = false;

window.addEventListener("wheel", function(e){

    if(isScrolling) return;

    if(Math.abs(e.deltaY) < 30){
        return;
    }

    isScrolling = true;

    if(e.deltaY > 0){
        changeItem(1);
    }
    else{
        changeItem(-1);
    }

    setTimeout(()=>{
        isScrolling = false;
    },600);

});

window.addEventListener("keydown", (e)=>{

    if(e.key === "ArrowDown"){
        changeItem(1);
    }

    if(e.key === "ArrowUp"){
        changeItem(-1);
    }

    if(e.key === "Enter"){
        openCurrentArticle();
    }

});

let startY = 0;

window.addEventListener("touchstart", (e)=>{
    startY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e)=>{

    const endY = e.changedTouches[0].clientY;

    const diff = startY - endY;

    if(Math.abs(diff) < 50){
        return;
    }

    if(diff > 0){
        changeItem(1);
    }
    else{
        changeItem(-1);
    }

});

function openCurrentArticle(){

    const link =
        items[current].querySelector("a");

    window.location.href = link.href;

}

updateShowcase();