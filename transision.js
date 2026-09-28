const transition =
    document.querySelector(".page-transition");

document.querySelectorAll("a").forEach(link=>{

    const href = link.getAttribute("href");

    if(
        href &&
        !href.startsWith("#") &&
        !href.startsWith("http")
    ){

        link.addEventListener("click",function(e){

            e.preventDefault();

            transition.classList.add("active");

            setTimeout(()=>{
                window.location.href = href;
            },500);

        });

    }

});

window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.classList.add("page-loaded");

        const transition =
            document.querySelector(".page-transition");

        if(transition){
            transition.classList.remove("active");
        }

    }, 100);

});