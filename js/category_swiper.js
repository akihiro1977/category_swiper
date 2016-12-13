/**
 *	Category Swiper v0.0.1
 *	
 *	(c) 2016 Akihiro Koyanagi http://i-section.net
 *	License: MIT
 *	
 *	
 *	@example
 *	<link rel="stylesheet" type="text/css" href="js/category_swiper.css">
 *	<script type="text/javascript" src="js/category_swiper.js"></script>
 *	<script type="text/javascript">
 *	$(function(){
 *		category_swiper.init();
 *	});
 *	</script>
 *	
 *	
 *	<nav>
 *		<div id="categories">
 *			<ul class="clearfix" data-cs-categories>
 *				<li><a href="#about">About</a></li>
 *				<li><a href="#use">Žg‚¢•û</a></li>
 *				...
 *				<span class="activeBar"></span>
 *			</ul>
 *		</div>
 *	</nav>
 *	<div id="contents" data-cs-content-wrapper>
 *		<section>
 *			<div id="about" class="cs-content">
 *				...
 *			</div>
 *		</section>
 *		<section>
 *			<div id="use" class="cs-content">
 *				...
 *			</div>
 *		</section>
 *		...
 *	</div>
 *	
 */

var category_swiper = {
	categoriesWrapper: "#categories",
	categoryIndex: 0,
	hideDirection: null,
	zIndex: 0,
	swipeDist: 70,
	touchStartX: 0,
	touchEndX: 0,
	swipeWait: false,
	
	categoriesMarginLeft: 0,
	categoriesMarginRight: 0,
	
	init: function(){
		
		// categories margin
		var _culcCategoriesMargin = function(){
			$("[data-cs-categories] li").css({ margin: 0 });
			
			// chk
			var w=0;
			$("[data-cs-categories] li").each(function(){
				w += $(this).outerWidth(true);
			});
			if (w<window.innerWidth){
				// no scroll
				category_swiper.categoriesMarginLeft = ~~((window.innerWidth - w)/2);
				category_swiper.categoriesMarginRight = 0;
				$("[data-cs-categories] li:first").css({ "margin-left": category_swiper.categoriesMarginLeft });
				$("[data-cs-categories]").width("auto");
			} else {
				category_swiper.categoriesMarginLeft = ~~((window.innerWidth - $("[data-cs-categories] li:first").width())/2);
				category_swiper.categoriesMarginRight = ~~((window.innerWidth - $("[data-cs-categories] li:last").width())/2);
				$("[data-cs-categories] li:first").css({ "margin-left": category_swiper.categoriesMarginLeft });
				$("[data-cs-categories] li:last").css({ "margin-right": category_swiper.categoriesMarginRight });
				
				// categories wrapper width
				w=0;
				$("[data-cs-categories] li").each(function(){
					w += $(this).outerWidth(true);
				});
				$("[data-cs-categories]").width(w+2);
			}
			
			// move activeBar
			category_swiper.moveActiveBar();
			
		};
		_culcCategoriesMargin();
		// categories margin setting
		$(window).on("load resize", _culcCategoriesMargin);
		
		
		// click categories
		$("[data-cs-categories] a").on("click.category_swiper", function(){
			
			event.preventDefault();
			
			// set active category index
			var index = $("[data-cs-categories] a").index($(this));
			category_swiper.hideDirection = category_swiper.categoryIndex<index ? "hideLeft" : "hideRight";
			category_swiper.categoryIndex = index;
			
			$("[data-cs-categories] a").removeClass("active");
			$(this).addClass("active");
			
			// move activeBar
			category_swiper.moveActiveBar();
			// move active category to center
			category_swiper.moveActiveCategoryCenter();
			
			// show content
			category_swiper.showContent($(this).attr("href"));
			
		});
		// first view
		$("[data-cs-categories] a:first").trigger("click");
		
		
		// event swipe
		$("[data-cs-content-wrapper]")
			.on("touchstart.category_swiper", function(event){
				category_swiper.touchStartX = event.originalEvent.touches[0].pageX;
				category_swiper.touchEndX = event.originalEvent.touches[0].pageX;
			})
			.on("touchmove.category_swiper", function(event){
				category_swiper.touchEndX = event.originalEvent.touches[0].pageX;
			})
			.on("touchend.category_swiper", function(event){
				dist = category_swiper.touchStartX - category_swiper.touchEndX;
				category_swiper.touchStartX = category_swiper.touchEndX = 0;
				
				if (category_swiper.swipeWait) return;
				
				if (dist>category_swiper.swipeDist){
					category_swiper.next();
				} else
				if (dist<-category_swiper.swipeDist){
					category_swiper.prev();
				}
				
			});
		
		
		
	},
	moveActiveBar: function(){
		if ($("[data-cs-categories] a.active").length){
			$("[data-cs-categories] .activeBar")
				.css({
					left: $("[data-cs-categories] a.active").position().left,
					width: $("[data-cs-categories] a.active").outerWidth()
				});
		}
	},
	moveActiveCategoryCenter: function(){
		
		var $active = $("[data-cs-categories] a.active");
		
		if (category_swiper.categoriesMarginRight>0 && $active.length){
			$(category_swiper.categoriesWrapper).animate({
				scrollLeft: $("[data-cs-categories] a.active").position().left - ~~((window.innerWidth-$active.width())/2)
			}, {
				duration: 400
			});
			
		}
	},
	showContent: function(id){
		
		category_swiper.zIndex++;
		
		// hide old content
		$(".cs-content:visible")
			.removeClass("active")
			.addClass(category_swiper.hideDirection);
		setTimeout(function(){
			$(".cs-content:not(.active)").css({ display:"none" });
			category_swiper.swipeWait = false;
		}, 700);
		
		// show
		$(id)
			.removeClass("hideLeft hideRight")
			.addClass("active")
			.css({
				display: "block",
				"z-index": category_swiper.zIndex
			});
		
		setTimeout(function(){
			$("[data-cs-content-wrapper]").height($(id).outerHeight(true));
		}, 0);
		
	},
	prev: function(){
		if (category_swiper.categoryIndex>0){
			var $t = $("[data-cs-categories] a:eq("+(category_swiper.categoryIndex-1)+")");
			$t.trigger("click");
		}
	},
	next: function(){
		var $t = $("[data-cs-categories] a:eq("+(category_swiper.categoryIndex+1)+")");
		if ($t.length) $t.trigger("click");
	}
};


