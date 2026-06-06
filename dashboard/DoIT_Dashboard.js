function openSidebar() {
    document.getElementById("mySidebar").style.width = "240px";
    document.getElementById("mySidebar").classList.add("open");
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "90px";
    document.getElementById("mySidebar").classList.remove("open");
}

function toggleSidebar() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    sidebar.classList.toggle("open");


if (sidebar.classList.contains("open")){
    sidebar.style.width = "240px";
    main.style.marginLeft = "240px";
    sidebar.classList.add("open");
    openSidebar();
    
    }else{
        sidebar.style.width = "90px";
        main.style.marginLeft = "90px";
        toggle.style.left = "105px";
        closeSidebar();
    }
}

