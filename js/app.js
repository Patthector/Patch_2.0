console.log("Boun pomerigio");

$(document).ready(function() {
let main_display = $("main").css("display");
  $("#nav li").mouseenter(function(e){
    if("nav__menu__submenu__item" === e.currentTarget.classList[1]){
      var w = $(this).children().eq(0).width();
      $(this).children().eq(1).css('left',w+5);
    }
  });

  $("#icon-menu").click(function(e){
    e.preventDefault();
    $("#nav").toggle("slide",{direction:"left"},200);
    $("#nav").animate({
      "background-color":"rgba(0,0,0,.5)"
    }, 500);
  });

  $("main").on("swiperight",function(e){
    let search_bar_display = $("#header__search-bar").css("display");
    //let main_display = $("main").css("display");
    if(main_display === "flex"){
      if(search_bar_display === "block"){
        $("#header__search-bar").hide("slide",{direction:"right"});
      }
      else{
        $("#nav").toggle("slide",{direction:"left"},200);
        $("#nav").animate({
          "background-color":"rgba(0,0,0,.5)"
        }, 500);
      }
    }
  });

  $("main").on("swipeleft",function(e){
    let menu_display = $("#nav").css("display");
    if(main_display === "flex"){
      if(menu_display === "block"){
        $("#nav").animate({
          "background-color":"transparent"
        }, 200,function(){
          $("#nav").toggle("slide",{direction:"left"},500);
        });
      }
      else{
        $("#header__search-bar").show("slide",{direction:"right"});

        $("#header__search-bar__button-exit").click(function(e){
            $("#header__search-bar").hide("slide",{direction:"right"});
        });
      }
    }
  });

  $("#link-search").click(function(e){
    e.preventDefault();
    $("#header__search-bar").show("slide",{direction:"right"});
    $("#header__search-bar__button-exit").click(function(e){
        $("#header__search-bar").hide("slide",{direction:"right"});
    });
  });

  $("#arrow-to-the-top").click(function(e){
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 700);
  });

  //hover and anchor in the menu with big screens
  $(".nav__menu__submenu__item").hover(function(){
    let width = $(".nav__menu__submenu__item a").width();
    let coordinates = $(this).offset();
    console.log(width);
    $(this).children(".submenu").css("top",coordinates.top - 10); //this is the margin of the menu, and we removed to aliniate the element with the menu
    $(this).children(".submenu").css("left",coordinates.left + width);
  });

  $("#nav").on("tap",function(e){
    if(e.target.tagName === "NAV"){
      $("#nav").animate({
        "background-color":"transparent"
      }, 200,function(){
        $("#nav").toggle("slide",{direction:"left"},500);
      });
    }
  });

  var lastScrollPosition = 0;
  $( window ).scroll(function(e) {
    var currentScrollPosition = $(this).scrollTop();
    if(currentScrollPosition > lastScrollPosition){ //BOTTOM
        if(currentScrollPosition<100){
          var newPosition = currentScrollPosition - 100;
          $(".logo").css("transform","translateY("+newPosition+"px)");
        }
        else{
          $(".logo").css("transform","translateY(0px)");
        }
    }
    else{ //TOP
      if(currentScrollPosition < 106){
        var newPosition = currentScrollPosition - 106;
        $(".logo").css("transform","translateY("+newPosition+"px)");
      }
    }
    lastScrollPosition = currentScrollPosition;
});
  //
  //THE GRID
  //
  function CreatingTheGrid(){
    let grid = $("#main");
    let children = grid.children();
    for (let i = 0; i < children.length; i++) {
      ///SETTING THE HEIGHTS OF ALL THE CARDS
      if(i==0){//if is the header
        BuildingCard(children.eq(i),i);
      }
      else{
        BuildingCard(children.eq(i),-1);//get just the article
      }
    }
  }

  function BuildingCard(card,o){
    let array;
    let height = 0;
    let arrayLength;
    if(o==0){//it is the header
      arrayLength = card.children().length;
      array = card.children();
      height +=20+60;
    }
    else{
      arrayLength = card.children().eq(1).children().length;
      console.log(arrayLength,"arrayLength");
      array = card.children().eq(1);//just the children of article
    }
    for (let i = 0; i < arrayLength; i++) {
      console.log(i,i);
      if(array.eq(i).css("display") === "none" || array.eq(i).hasClass("not-count")){
        //if the child/div is a "card__img-to-the-left-layout" DONT COUNT IT
        continue;
      }
      else if(array.eq(i).hasClass("card__post--img-to-the-left-layout")
              || array.eq(i).hasClass("card__post--img-to-the-right-layout")){
        console.log("Inside floating layout");
        height = FloatingLayouts(array);
        console.log("Total height:",height);
        //break;
      }
      else{
        height += array.eq(i).height();
        //Let's check the paragrah
        if(i == 2){//=>this is the paragrah
          console.log("lineHeight+++++");
        }
      }
      //ADD THE MARGIN&&PADDING OF PARAGRAPHs,DIVs,HEADINGs
      //height += 10 + 12;
    }

    if(o<0){//NON FOR THE HEADER
    height +=12+40+15;//15 is margin bottom
                      /*40 is the height of metainfo
                      /*12 is the margin of the text (headings and paragraphs)*/
    }

    let repetitions = Math.ceil(height / 10);/*10px*/
    card.css(`grid-row-end`,`span ${repetitions}`);
  }

  function FloatingLayouts(post){
    let array = post.children();
    console.log(array.length,"LENGHT FLOAT");
    let height = 0;
    let floatImgHeight = 0;
    let contentHeight = 0;
    for (var i = 0; i < array.length; i++) {
      if(array.eq(i).css("display") === "none" || array.eq(i).hasClass("not-count")){
        //if the child/div is a "card__img-to-the-left-layout" DONT COUNT IT
        continue;
      }
      else if(array.eq(i).hasClass("container-img--left")
           || array.eq(i).hasClass("container-img--right"))
      {
        floatImgHeight += array.eq(i).height();
      }
      else{
        contentHeight += array.eq(i).height();
        console.log(contentHeight);
      }
    }
    return Math.max(floatImgHeight,contentHeight);
  }
  //
  //END OF THE GRID
  //
  //CreatingTheGrid();
  $(window).on('load',function(){
    console.log("LOADING");
    CreatingTheGrid();
  })
  $(window).on('resize',function(){
    console.log("RESIZING");
    let main_display = $("main").css("display");
    if(main_display === "grid"){//if is the grid show the menu
      $("#nav").css("display","block");
    }
    else{
      $("#nav").css("display","none");
    }
    CreatingTheGrid();
  })
  $(window).on('orientationchange',function(){
    console.log("ORIENTATIONCHANGE");
    let main_display = $("main").css("display");
    if(main_display === "grid"){//if is the grid show the menu
      $("#nav").css("display","block");
    }
    else{
      $("#nav").css("display","none");
    }
    CreatingTheGrid();
  })
});
