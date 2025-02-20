var $ = jQuery.noConflict();

function debounce(e, t, a) {
    var i, s, o, n, r;
    return function() {
        o = this, s = arguments, n = new Date;
        var l = function() {
                var d = new Date - n;
                d < t ? i = setTimeout(l, t - d) : (i = null, a || (r = e.apply(o, s)))
            },
            d = a && !i;
        return i || (i = setTimeout(l, t)), d && (r = e.apply(o, s)), r
    }
}
$.fn.inlineStyle = function(e) {
        return this.prop("style")[$.camelCase(e)]
    }, $.fn.doOnce = function(e) {
        return this.length && e.apply(this), this
    },
    function() {
        for (var e = 0, t = ["ms", "moz", "webkit", "o"], a = 0; a < t.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[t[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[a] + "CancelAnimationFrame"] || window[t[a] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, a) {
            var i = (new Date).getTime(),
                s = Math.max(0, 16 - (i - e)),
                o = window.setTimeout(function() {
                    t(i + s)
                }, s);
            return e = i + s, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }();
var requesting = !1,
    killRequesting = debounce(function() {
        requesting = !1
    }, 100);

function onScrollSliderParallax() {
    requesting || (requesting = !0, requestAnimationFrame(function() {
        SEMICOLON.slider.sliderParallax(), SEMICOLON.slider.sliderElementsFade()
    })), killRequesting()
}
var SEMICOLON = SEMICOLON || {};
! function($) {
    "use strict";
    SEMICOLON.initialize = {
        init: function() {
            SEMICOLON.initialize.responsiveClasses(), SEMICOLON.initialize.stickyElements(), SEMICOLON.initialize.goToTop(), SEMICOLON.initialize.lazyLoad(), SEMICOLON.initialize.fullScreen(), SEMICOLON.initialize.verticalMiddle(), SEMICOLON.initialize.lightbox(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.initialize.imageFade(), SEMICOLON.initialize.pageTransition(), SEMICOLON.initialize.dataResponsiveClasses(), SEMICOLON.initialize.dataResponsiveHeights(), SEMICOLON.initialize.stickFooterOnSmall(), SEMICOLON.initialize.stickyFooter(), $(".fslider").addClass("preloader2")
        },
        responsiveClasses: function() {
            if ("undefined" == typeof jRespond) return console.log("responsiveClasses: jRespond not Defined."), !0;
            jRespond([{
                label: "smallest",
                enter: 0,
                exit: 575
            }, {
                label: "handheld",
                enter: 576,
                exit: 767
            }, {
                label: "tablet",
                enter: 768,
                exit: 991
            }, {
                label: "laptop",
                enter: 992,
                exit: 1199
            }, {
                label: "desktop",
                enter: 1200,
                exit: 1e4
            }]).addFunc([{
                breakpoint: "desktop",
                enter: function() {
                    $body.addClass("device-xl")
                },
                exit: function() {
                    $body.removeClass("device-xl")
                }
            }, {
                breakpoint: "laptop",
                enter: function() {
                    $body.addClass("device-lg")
                },
                exit: function() {
                    $body.removeClass("device-lg")
                }
            }, {
                breakpoint: "tablet",
                enter: function() {
                    $body.addClass("device-md")
                },
                exit: function() {
                    $body.removeClass("device-md")
                }
            }, {
                breakpoint: "handheld",
                enter: function() {
                    $body.addClass("device-sm")
                },
                exit: function() {
                    $body.removeClass("device-sm")
                }
            }, {
                breakpoint: "smallest",
                enter: function() {
                    $body.addClass("device-xs")
                },
                exit: function() {
                    $body.removeClass("device-xs")
                }
            }])
        },
        verticalMiddle: function() {
            $verticalMiddleEl.length > 0 && $verticalMiddleEl.each(function() {
                var e = $(this),
                    t = e.outerHeight(),
                    a = $header.outerHeight();
                e.parents("#slider").length > 0 && !e.hasClass("ignore-header") && $header.hasClass("transparent-header") && ($body.hasClass("device-xl") || $body.hasClass("device-lg")) && (t -= 70, $slider.next("#header").length > 0 && (t += a)), ($body.hasClass("device-sm") || $body.hasClass("device-xs")) && e.parents(".full-screen").length && !e.parents(".force-full-screen").length ? e.children(".col-padding").length > 0 ? e.css({
                    position: "relative",
                    top: "0",
                    width: "auto",
                    marginTop: "0"
                }).addClass("clearfix") : e.css({
                    position: "relative",
                    top: "0",
                    width: "auto",
                    marginTop: "0",
                    paddingTop: "60px",
                    paddingBottom: "60px"
                }).addClass("clearfix") : e.css({
                    position: "absolute",
                    top: "50%",
                    width: "100%",
                    paddingTop: "0",
                    paddingBottom: "0",
                    marginTop: -t / 2 + "px"
                })
            })
        },
        stickyElements: function() {
            if ($siStickyEl.length > 0) {
                var e = $siStickyEl.outerHeight();
                $siStickyEl.css({
                    marginTop: -e / 2 + "px"
                })
            }
            if ($dotsMenuEl.length > 0) {
                var t = $dotsMenuEl.outerHeight();
                $dotsMenuEl.css({
                    marginTop: -t / 2 + "px"
                })
            }
        },
        goToTop: function() {
            var e = $goToTopEl.attr("data-speed"),
                t = $goToTopEl.attr("data-easing");
            e || (e = 700), t || (t = "easeOutQuad"), $goToTopEl.off("click").on("click", function() {
                return $("body,html").stop(!0).animate({
                    scrollTop: 0
                }, Number(e), t), !1
            })
        },
        goToTopScroll: function() {
            var e = $goToTopEl.attr("data-mobile"),
                t = $goToTopEl.attr("data-offset");
            if (t || (t = 450), "true" != e && ($body.hasClass("device-sm") || $body.hasClass("device-xs"))) return !0;
            $window.scrollTop() > Number(t) ? ($goToTopEl.fadeIn(), $body.addClass("gototop-active")) : ($goToTopEl.fadeOut(), $body.removeClass("gototop-active"))
        },
        fullScreen: function() {
            $fullScreenEl.length > 0 && $fullScreenEl.each(function() {
                var e = $(this),
                    t = window.innerHeight ? window.innerHeight : $window.height(),
                    a = e.attr("data-negative-height");
                if ("slider" == e.attr("id")) {
                    var i = $slider.offset().top;
                    if (t -= i, e.find(".slider-parallax-inner").length > 0) {
                        var s = e.find(".slider-parallax-inner").css("transform").match(/-?[\d\.]+/g);
                        if (s) o = s[5];
                        else var o = 0;
                        t = (window.innerHeight ? window.innerHeight : $window.height()) + Number(o) - i
                    }
                    if ($("#slider.with-header").next("#header:not(.transparent-header)").length > 0 && ($body.hasClass("device-xl") || $body.hasClass("device-lg"))) t -= $header.outerHeight()
                }
                e.parents(".full-screen").length > 0 && (t = e.parents(".full-screen").height()), ($body.hasClass("device-sm") || $body.hasClass("device-xs")) && (e.hasClass("force-full-screen") || (t = "auto")), a && (t -= Number(a)), e.css("height", t), "slider" != e.attr("id") || e.hasClass("canvas-slider-grid") || e.has(".swiper-slide") && e.find(".swiper-slide").css("height", t)
            })
        },
        testimonialsGrid: function() {
            if ($testimonialsGridEl.length > 0)
                if ($body.hasClass("device-md") || $body.hasClass("device-lg") || $body.hasClass("device-xl")) {
                    var e = 0;
                    $testimonialsGridEl.each(function() {
                        $(this).find("li > .testimonial").each(function() {
                            $(this).height() > e && (e = $(this).height())
                        }), $(this).find("li").height(e), e = 0
                    })
                } else $testimonialsGridEl.find("li").css({
                    height: "auto"
                })
        },
        lightbox: function() {
            if (!$().magnificPopup) return console.log("lightbox: Magnific Popup not Defined."), !0;
            var e = $('[data-lightbox="image"]'),
                t = $('[data-lightbox="gallery"]'),
                a = $('[data-lightbox="iframe"]'),
                i = $('[data-lightbox="inline"]'),
                s = $('[data-lightbox="ajax"]'),
                o = $('[data-lightbox="ajax-gallery"]');
            e.length > 0 && e.magnificPopup({
                type: "image",
                closeOnContentClick: !0,
                closeBtnInside: !1,
                fixedContentPos: !0,
                mainClass: "mfp-no-margins mfp-fade",
                image: {
                    verticalFit: !0
                }
            }), t.length > 0 && t.each(function() {
                var e = $(this);
                e.find('a[data-lightbox="gallery-item"]').parent(".clone").hasClass("clone") && e.find('a[data-lightbox="gallery-item"]').parent(".clone").find('a[data-lightbox="gallery-item"]').attr("data-lightbox", ""), e.find('a[data-lightbox="gallery-item"]').parents(".cloned").hasClass("cloned") && e.find('a[data-lightbox="gallery-item"]').parents(".cloned").find('a[data-lightbox="gallery-item"]').attr("data-lightbox", ""), e.magnificPopup({
                    delegate: 'a[data-lightbox="gallery-item"]',
                    type: "image",
                    closeOnContentClick: !0,
                    closeBtnInside: !1,
                    fixedContentPos: !0,
                    mainClass: "mfp-no-margins mfp-fade",
                    image: {
                        verticalFit: !0
                    },
                    gallery: {
                        enabled: !0,
                        navigateByImgClick: !0,
                        preload: [0, 1]
                    }
                })
            }), a.length > 0 && a.magnificPopup({
                disableOn: 600,
                type: "iframe",
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !1
            }), i.length > 0 && i.magnificPopup({
                type: "inline",
                mainClass: "mfp-no-margins mfp-fade",
                closeBtnInside: !1,
                fixedContentPos: !0,
                overflowY: "scroll"
            }), s.length > 0 && s.magnificPopup({
                type: "ajax",
                closeBtnInside: !1,
                callbacks: {
                    ajaxContentAdded: function(e) {
                        SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs()
                    },
                    open: function() {
                        $body.addClass("ohidden")
                    },
                    close: function() {
                        $body.removeClass("ohidden")
                    }
                }
            }), o.length > 0 && o.magnificPopup({
                delegate: 'a[data-lightbox="ajax-gallery-item"]',
                type: "ajax",
                closeBtnInside: !1,
                gallery: {
                    enabled: !0,
                    preload: 0,
                    navigateByImgClick: !1
                },
                callbacks: {
                    ajaxContentAdded: function(e) {
                        SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs()
                    },
                    open: function() {
                        $body.addClass("ohidden")
                    },
                    close: function() {
                        $body.removeClass("ohidden")
                    }
                }
            })
        },
        modal: function() {
            if (!$().magnificPopup) return console.log("modal: Magnific Popup not Defined."), !0;
            if ("undefined" === Cookies) return console.log("cookieNotify: Cookie Function not defined."), !0;
            var e = $(".modal-on-load:not(.customjs)");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-target"),
                    a = t.split("#")[1],
                    i = e.attr("data-delay"),
                    s = e.attr("data-timeout"),
                    o = e.attr("data-animate-in"),
                    n = e.attr("data-animate-out");
                if (e.hasClass("enable-cookie") || Cookies.remove(a), e.hasClass("enable-cookie")) {
                    var r = Cookies.get(a);
                    if (void 0 !== r && "0" == r) return !0
                }
                i = i ? Number(i) + 1500 : 1500;
                setTimeout(function() {
                    $.magnificPopup.open({
                        items: {
                            src: t
                        },
                        type: "inline",
                        mainClass: "mfp-no-margins mfp-fade",
                        closeBtnInside: !1,
                        fixedContentPos: !0,
                        removalDelay: 500,
                        callbacks: {
                            open: function() {
                                "" != o && $(t).addClass(o + " animated")
                            },
                            beforeClose: function() {
                                "" != n && $(t).removeClass(o).addClass(n)
                            },
                            afterClose: function() {
                                "" == o && "" == n || $(t).removeClass(o + " " + n + " animated"), e.hasClass("enable-cookie") && Cookies.set(a, "0")
                            }
                        }
                    }, 0)
                }, Number(i));
                if ("" != s) setTimeout(function() {
                    $.magnificPopup.close()
                }, Number(i) + Number(s))
            })
        },
        resizeVideos: function() {
            if (!$().fitVids) return console.log("resizeVideos: FitVids not Defined."), !0;
            $("#content,#footer,.slider-element:not(.revslider-wrap),.landing-offer-media,.portfolio-ajax-modal,.mega-menu-column").fitVids({
                customSelector: "iframe[src^='//www.dailymotion.com/embed'], iframe[src*='maps.google.com'], iframe[src*='google.com/maps'], iframe[src*='facebook.com/plugins/video']",
                ignore: ".no-fv"
            })
        },
        imageFade: function() {
            $(".image_fade").hover(function() {
                $(this).filter(":not(:animated)").animate({
                    opacity: .8
                }, 400)
            }, function() {
                $(this).animate({
                    opacity: 1
                }, 400)
            })
        },
        blogTimelineEntries: function() {
            $(".post-timeline.grid-2").find(".entry").each(function() {
                "0px" == $(this).inlineStyle("left") ? $(this).removeClass("alt") : $(this).addClass("alt"), $(this).find(".entry-timeline").fadeIn()
            }), $(".entry.entry-date-section").next().next().find(".entry-timeline").css({
                top: "70px"
            })
        },
        pageTransition: function() {
            if ($body.hasClass("no-transition")) return !0;
            if (!$().animsition) return $body.addClass("no-transition"), console.log("pageTransition: Animsition not Defined."), !0;
            window.onpageshow = function(e) {
                e.persisted && window.location.reload()
            };
            var e = $body.attr("data-animation-in"),
                t = $body.attr("data-animation-out"),
                a = $body.attr("data-speed-in"),
                i = $body.attr("data-speed-out"),
                s = !1,
                o = $body.attr("data-loader-timeout"),
                n = $body.attr("data-loader"),
                r = $body.attr("data-loader-color"),
                l = $body.attr("data-loader-html"),
                d = "",
                c = "",
                u = "",
                f = "",
                h = "",
                p = "";
            e || (e = "fadeIn"), t || (t = "fadeOut"), a || (a = 1500), i || (i = 800), l || (d = '<div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div>'), o ? (s = !0, o = Number(o)) : (s = !1, o = !1), r && ("theme" == r ? (f = " bgcolor", " border-color", h = ' class="bgcolor"', p = ' class="border-color"') : (c = ' style="background-color:' + r + ';"', u = ' style="border-color:' + r + ';"'), d = '<div class="css3-spinner-bounce1' + f + '"' + c + '></div><div class="css3-spinner-bounce2' + f + '"' + c + '></div><div class="css3-spinner-bounce3' + f + '"' + c + "></div>"), "2" == n ? d = '<div class="css3-spinner-flipper' + f + '"' + c + "></div>" : "3" == n ? d = '<div class="css3-spinner-double-bounce1' + f + '"' + c + '></div><div class="css3-spinner-double-bounce2' + f + '"' + c + "></div>" : "4" == n ? d = '<div class="css3-spinner-rect1' + f + '"' + c + '></div><div class="css3-spinner-rect2' + f + '"' + c + '></div><div class="css3-spinner-rect3' + f + '"' + c + '></div><div class="css3-spinner-rect4' + f + '"' + c + '></div><div class="css3-spinner-rect5' + f + '"' + c + "></div>" : "5" == n ? d = '<div class="css3-spinner-cube1' + f + '"' + c + '></div><div class="css3-spinner-cube2' + f + '"' + c + "></div>" : "6" == n ? d = '<div class="css3-spinner-scaler' + f + '"' + c + "></div>" : "7" == n ? d = '<div class="css3-spinner-grid-pulse"><div' + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div></div>" : "8" == n ? d = '<div class="css3-spinner-clip-rotate"><div' + p + u + "></div></div>" : "9" == n ? d = '<div class="css3-spinner-ball-rotate"><div' + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div></div>" : "10" == n ? d = '<div class="css3-spinner-zig-zag"><div' + h + c + "></div><div" + h + c + "></div></div>" : "11" == n ? d = '<div class="css3-spinner-triangle-path"><div' + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div></div>" : "12" == n ? d = '<div class="css3-spinner-ball-scale-multiple"><div' + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div></div>" : "13" == n ? d = '<div class="css3-spinner-ball-pulse-sync"><div' + h + c + "></div><div" + h + c + "></div><div" + h + c + "></div></div>" : "14" == n && (d = '<div class="css3-spinner-scale-ripple"><div' + p + u + "></div><div" + p + u + "></div><div" + p + u + "></div></div>"), l || (l = d), l = '<div class="css3-spinner">' + l + "</div>", $wrapper.css({
                opacity: 1
            }), $wrapper.animsition({
                inClass: e,
                outClass: t,
                inDuration: Number(a),
                outDuration: Number(i),
                linkElement: 'body:not(.device-md):not(.device-sm):not(.device-xs) #primary-menu:not(.on-click) ul li a:not([target="_blank"]):not([href*="#"]):not([data-lightbox]):not([href^="mailto"]):not([href^="tel"]):not([href^="sms"]):not([href^="call"])',
                loading: !0,
                loadingParentElement: "body",
                loadingClass: "page-transition-wrap",
                loadingInner: l + '<a href="?transition=disable" class="button button-small button-rounded disable-pagetransition">Disable Transition</a>',
                timeout: s,
                timeoutCountdown: o,
                onLoadEvent: !0,
                browser: ["animation-duration", "-webkit-animation-duration"],
                overlay: !1,
                overlayClass: "animsition-overlay-slide",
                overlayParentElement: "body"
            })
        },
        lazyLoad: function() {
            var e = $("[data-lazyload]");
            if (!$().appear) return console.log("lazyLoad: Appear not Defined."), !0;
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-lazyload");
                e.attr("src", "images/blank.svg").css({
                    background: "url(images/preloader.gif) no-repeat center center #FFF"
                }), e.appear(function() {
                    e.css({
                        background: "none"
                    }).removeAttr("width").removeAttr("height").attr("src", t)
                }, {
                    accX: 0,
                    accY: 120
                }, "easeInCubic")
            })
        },
        topScrollOffset: function() {
            var e = 0;
            return !$body.hasClass("device-xl") && !$body.hasClass("device-lg") || SEMICOLON.isMobile.any() ? e = 40 : (e = $header.hasClass("sticky-header") ? $pagemenu.hasClass("dots-menu") ? 100 : 144 : $pagemenu.hasClass("dots-menu") ? 140 : 184, $pagemenu.length || (e = $header.hasClass("sticky-header") ? 100 : 140)), e
        },
        defineColumns: function(e) {
            var t = 4,
                a = e.attr("data-xl-col"),
                i = e.attr("data-lg-col"),
                s = e.attr("data-md-col"),
                o = e.attr("data-sm-col"),
                n = e.attr("data-xs-col");
            return e.hasClass("portfolio-full") ? (t = e.hasClass("portfolio-3") ? 3 : e.hasClass("portfolio-5") ? 5 : e.hasClass("portfolio-6") ? 6 : 4, !$body.hasClass("device-md") || 4 != t && 5 != t && 6 != t ? !$body.hasClass("device-sm") || 3 != t && 4 != t && 5 != t && 6 != t ? $body.hasClass("device-xs") && (t = 1) : t = 2 : t = 3) : e.hasClass("masonry-thumbs") && (t = e.hasClass("grid-2") ? 2 : e.hasClass("grid-3") ? 3 : e.hasClass("grid-5") ? 5 : e.hasClass("grid-6") ? 6 : 4), $body.hasClass("device-xl") ? a && (t = Number(a)) : $body.hasClass("device-lg") ? i && (t = Number(i)) : $body.hasClass("device-md") ? s && (t = Number(s)) : $body.hasClass("device-sm") ? o && (t = Number(o)) : $body.hasClass("device-xs") && n && (t = Number(n)), t
        },
        setFullColumnWidth: function(e) {
            if (!$().isotope) return console.log("setFullColumnWidth: Isotope not Defined."), !0;
            if (e.css({
                    width: ""
                }), e.hasClass("portfolio-full")) {
                var t = SEMICOLON.initialize.defineColumns(e),
                    a = e.width(),
                    i = Math.floor(a / t);
                if ($body.hasClass("device-xs")) var s = 1;
                else s = 0;
                e.find(".portfolio-item").each(function(e) {
                    if (0 == s && $(this).hasClass("wide")) var t = 2 * i;
                    else t = i;
                    $(this).css({
                        width: t + "px"
                    })
                })
            } else if (e.hasClass("masonry-thumbs")) {
                t = SEMICOLON.initialize.defineColumns(e);
                (a = e.innerWidth()) == windowWidth && (a = 1.005 * windowWidth, e.css({
                    width: a + "px"
                }));
                i = a / t;
                (i = Math.floor(i)) * t >= a && e.css({
                    "margin-right": "-1px"
                }), e.children("a").css({
                    width: i + "px"
                });
                var o = e.find("a:eq(0)").outerWidth();
                e.isotope({
                    masonry: {
                        columnWidth: o
                    }
                });
                var n = e.attr("data-big");
                if (n) {
                    n = n.split(",");
                    var r = "",
                        l = "";
                    for (l = 0; l < n.length; l++) r = Number(n[l]) - 1, e.find("a:eq(" + r + ")").css({
                        width: 2 * o + "px"
                    });
                    setTimeout(function() {
                        e.isotope("layout")
                    }, 1e3)
                }
            }
        },
        aspectResizer: function() {
            var e = $(".aspect-resizer");
            e.length > 0 && e.each(function() {
                var e = $(this);
                e.inlineStyle("width"), e.inlineStyle("height"), e.parent().innerWidth()
            })
        },
        dataResponsiveClasses: function() {
            var e = $("[data-class-xs]"),
                t = $("[data-class-sm]"),
                a = $("[data-class-md]"),
                i = $("[data-class-lg]"),
                s = $("[data-class-xl]");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-class-xs"),
                    a = e.attr("data-class-sm") + " " + e.attr("data-class-md") + " " + e.attr("data-class-lg") + " " + e.attr("data-class-xl");
                $body.hasClass("device-xs") && (e.removeClass(a), e.addClass(t))
            }), t.length > 0 && t.each(function() {
                var e = $(this),
                    t = e.attr("data-class-sm"),
                    a = e.attr("data-class-xs") + " " + e.attr("data-class-md") + " " + e.attr("data-class-lg") + " " + e.attr("data-class-xl");
                $body.hasClass("device-sm") && (e.removeClass(a), e.addClass(t))
            }), a.length > 0 && a.each(function() {
                var e = $(this),
                    t = e.attr("data-class-md"),
                    a = e.attr("data-class-xs") + " " + e.attr("data-class-sm") + " " + e.attr("data-class-lg") + " " + e.attr("data-class-xl");
                $body.hasClass("device-md") && (e.removeClass(a), e.addClass(t))
            }), i.length > 0 && i.each(function() {
                var e = $(this),
                    t = e.attr("data-class-lg"),
                    a = e.attr("data-class-xs") + " " + e.attr("data-class-sm") + " " + e.attr("data-class-md") + " " + e.attr("data-class-xl");
                $body.hasClass("device-lg") && (e.removeClass(a), e.addClass(t))
            }), s.length > 0 && s.each(function() {
                var e = $(this),
                    t = e.attr("data-class-xl"),
                    a = e.attr("data-class-xs") + " " + e.attr("data-class-sm") + " " + e.attr("data-class-md") + " " + e.attr("data-class-lg");
                $body.hasClass("device-xl") && (e.removeClass(a), e.addClass(t))
            })
        },
        dataResponsiveHeights: function() {
            var e = $("[data-height-xs]"),
                t = $("[data-height-sm]"),
                a = $("[data-height-md]"),
                i = $("[data-height-lg]"),
                s = $("[data-height-xl]");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-height-xs");
                $body.hasClass("device-xs") && "" != t && e.css("height", t)
            }), t.length > 0 && t.each(function() {
                var e = $(this),
                    t = e.attr("data-height-sm");
                $body.hasClass("device-sm") && "" != t && e.css("height", t)
            }), a.length > 0 && a.each(function() {
                var e = $(this),
                    t = e.attr("data-height-md");
                $body.hasClass("device-md") && "" != t && e.css("height", t)
            }), i.length > 0 && i.each(function() {
                var e = $(this),
                    t = e.attr("data-height-lg");
                $body.hasClass("device-lg") && "" != t && e.css("height", t)
            }), s.length > 0 && s.each(function() {
                var e = $(this),
                    t = e.attr("data-height-xl");
                $body.hasClass("device-xl") && "" != t && e.css("height", t)
            })
        },
        stickFooterOnSmall: function() {
            $footer.css({
                "margin-top": ""
            });
            var e = $window.height(),
                t = $wrapper.height();
            !$body.hasClass("sticky-footer") && $footer.length > 0 && $wrapper.has("#footer") && e > t && $footer.css({
                "margin-top": e - t
            })
        },
        stickyFooter: function() {
            if ($body.hasClass("sticky-footer") && $footer.length > 0 && ($body.hasClass("device-xl") || $body.hasClass("device-lg"))) {
                var e = $footer.outerHeight();
                $content.css({
                    "margin-bottom": e
                })
            } else $content.css({
                "margin-bottom": 0
            })
        }
    }, SEMICOLON.header = {
        init: function() {
            SEMICOLON.header.superfish(), SEMICOLON.header.menufunctions(), SEMICOLON.header.fullWidthMenu(), SEMICOLON.header.overlayMenu(), SEMICOLON.header.stickyMenu(), SEMICOLON.header.stickyPageMenu(), SEMICOLON.header.sideHeader(), SEMICOLON.header.sidePanel(), SEMICOLON.header.onePageScroll(), SEMICOLON.header.onepageScroller(), SEMICOLON.header.logo(), SEMICOLON.header.topsearch(), SEMICOLON.header.topcart()
        },
        superfish: function() {
            if ($body.hasClass("device-xl") || $body.hasClass("device-lg")) {
                if ($("#primary-menu ul ul, #primary-menu ul .mega-menu-content").css("display", "block"), SEMICOLON.header.menuInvert(), $("#primary-menu ul ul, #primary-menu ul .mega-menu-content").css("display", ""), !$().superfish) return $body.addClass("no-superfish"), console.log("superfish: Superfish not Defined."), !0;
                $("body:not(.side-header) #primary-menu:not(.on-click) > ul, body:not(.side-header) #primary-menu:not(.on-click) > div > ul:not(.dropdown-menu), .top-links:not(.on-click) > ul").superfish({
                    popUpSelector: "ul,.mega-menu-content,.top-link-section",
                    delay: 250,
                    speed: 350,
                    animation: {
                        opacity: "show"
                    },
                    animationOut: {
                        opacity: "hide"
                    },
                    cssArrows: !1,
                    onShow: function() {
                        var e = $(this);
                        e.find(".owl-carousel.customjs").length > 0 && (e.find(".owl-carousel").removeClass("customjs"), SEMICOLON.widget.carousel()), e.find(".grid-container").length > 0 && e.find(".grid-container").isotope("layout")
                    }
                }), $("body.side-header #primary-menu:not(.on-click) > ul").superfish({
                    popUpSelector: "ul",
                    delay: 250,
                    speed: 350,
                    animation: {
                        opacity: "show",
                        height: "show"
                    },
                    animationOut: {
                        opacity: "hide",
                        height: "hide"
                    },
                    cssArrows: !1
                })
            }
        },
        menuInvert: function() {
            $("#primary-menu .mega-menu-content, #primary-menu ul ul").each(function(e, t) {
                var a = $(t),
                    i = a.offset(),
                    s = a.width(),
                    o = i.left;
                windowWidth - (s + o) < 0 && a.addClass("menu-pos-invert")
            })
        },
        menufunctions: function() {
            $("#primary-menu ul li:has(ul)").addClass("sub-menu"), $(".top-links ul li:has(ul) > a, #primary-menu.with-arrows > ul > li:has(ul) > a > div, #primary-menu.with-arrows > div > ul > li:has(ul) > a > div, #page-menu nav ul li:has(ul) > a > div").append('<i class="icon-angle-down"></i>'), $(".top-links > ul").addClass("clearfix"), ($body.hasClass("device-xl") || $body.hasClass("device-lg")) && ($("#primary-menu.sub-title > ul > li").hover(function() {
                $(this).prev().css({
                    backgroundImage: "none"
                })
            }, function() {
                $(this).prev().css({
                    backgroundImage: 'url("images/icons/menu-divider.png")'
                })
            }), $("#primary-menu.sub-title").children("ul").children(".current").prev().css({
                backgroundImage: "none"
            })), ($("#primary-menu").hasClass("on-click") || $body.hasClass("device-md") || $body.hasClass("device-sm") || $body.hasClass("device-xs")) && $("#primary-menu li:has(ul) > a").on("click touchend", function(e) {
                $(this).parents(".sub-menu").siblings().find("ul,.mega-menu-content").removeClass("d-block"), $(this).parent("li").children("ul,.mega-menu-content").toggleClass("d-block"), e.preventDefault()
            }), ($(".top-links").hasClass("on-click") || $body.hasClass("device-md") || $body.hasClass("device-sm") || $body.hasClass("device-xs")) && $(".top-links li:has(ul,.top-link-section) > a").on("click touchend", function(e) {
                $(this).parents("li").siblings().find("ul,.top-link-section").removeClass("d-block"), $(this).parent("li").children("ul,.top-link-section").toggleClass("d-block"), e.preventDefault()
            })
        },
        fullWidthMenu: function() {
            $body.hasClass("stretched") ? ($header.find(".container-fullwidth").length > 0 && $(".mega-menu .mega-menu-content").css({
                width: $wrapper.width() - 120
            }), $header.hasClass("full-header") && $(".mega-menu .mega-menu-content").css({
                width: $wrapper.width() - 60
            })) : ($header.find(".container-fullwidth").length > 0 && $(".mega-menu .mega-menu-content").css({
                width: $wrapper.width() - 120
            }), $header.hasClass("full-header") && $(".mega-menu .mega-menu-content").css({
                width: $wrapper.width() - 80
            }))
        },
        overlayMenu: function() {
            if ($body.hasClass("overlay-menu")) {
                var e = $("#primary-menu").children("ul").children("li"),
                    t = e.outerHeight(),
                    a = e.length * t,
                    i = ($window.height() - a) / 2;
                $("#primary-menu").children("ul").children("li:first-child").css({
                    "margin-top": i + "px"
                })
            }
        },
        stickyMenu: function(e) {
            $window.scrollTop() > e ? $body.hasClass("device-xl") || $body.hasClass("device-lg") ? ($("body:not(.side-header) #header:not(.no-sticky)").addClass("sticky-header"), $headerWrap.hasClass("force-not-dark") || $headerWrap.removeClass("not-dark"), SEMICOLON.header.stickyMenuClass()) : ($body.hasClass("device-sm") || $body.hasClass("device-xs") || $body.hasClass("device-md")) && $body.hasClass("sticky-responsive-menu") && ($("#header:not(.no-sticky)").addClass("responsive-sticky-header"), SEMICOLON.header.stickyMenuClass()) : SEMICOLON.header.removeStickyness()
        },
        stickyPageMenu: function(e) {
            $window.scrollTop() > e ? $body.hasClass("device-xl") || $body.hasClass("device-lg") ? $("#page-menu:not(.dots-menu,.no-sticky)").addClass("sticky-page-menu") : ($body.hasClass("device-sm") || $body.hasClass("device-xs") || $body.hasClass("device-md")) && $body.hasClass("sticky-responsive-pagemenu") && $("#page-menu:not(.dots-menu,.no-sticky)").addClass("sticky-page-menu") : $("#page-menu:not(.dots-menu,.no-sticky)").removeClass("sticky-page-menu")
        },
        removeStickyness: function() {
            $header.hasClass("sticky-header") && ($("body:not(.side-header) #header:not(.no-sticky)").removeClass("sticky-header"), $header.removeClass().addClass(oldHeaderClasses), $headerWrap.removeClass().addClass(oldHeaderWrapClasses), $headerWrap.hasClass("force-not-dark") || $headerWrap.removeClass("not-dark"), SEMICOLON.slider.swiperSliderMenu(), SEMICOLON.slider.revolutionSliderMenu()), $header.hasClass("responsive-sticky-header") && $("body.sticky-responsive-menu #header").removeClass("responsive-sticky-header"), ($body.hasClass("device-sm") || $body.hasClass("device-xs") || $body.hasClass("device-md")) && void 0 === responsiveMenuClasses && ($header.removeClass().addClass(oldHeaderClasses), $headerWrap.removeClass().addClass(oldHeaderWrapClasses), $headerWrap.hasClass("force-not-dark") || $headerWrap.removeClass("not-dark"))
        },
        sideHeader: function() {
            $("#header-trigger").off("click").on("click", function() {
                return $("body.open-header").toggleClass("side-header-open"), !1
            })
        },
        sidePanel: function() {
            $(".side-panel-trigger").off("click").on("click", function() {
                return $body.toggleClass("side-panel-open"), $body.hasClass("device-touch") && $body.hasClass("side-push-panel") && $body.toggleClass("ohidden"), !1
            })
        },
        onePageScroll: function() {
            if ($onePageMenuEl.length > 0) {
                var e = $onePageMenuEl.attr("data-speed"),
                    t = $onePageMenuEl.attr("data-offset"),
                    a = $onePageMenuEl.attr("data-easing");
                e || (e = 1e3), a || (a = "easeOutQuad"), $onePageMenuEl.find("a[data-href]").off("click").on("click", function() {
                    var i = $(this),
                        s = i.attr("data-href"),
                        o = i.attr("data-speed"),
                        n = i.attr("data-offset"),
                        r = i.attr("data-easing");
                    if ($(s).length > 0) {
                        if (t) l = t;
                        else var l = SEMICOLON.initialize.topScrollOffset();
                        o || (o = e), n || (n = l), r || (r = a), $onePageMenuEl.hasClass("no-offset") && (n = 0), onePageGlobalOffset = Number(n), $onePageMenuEl.find("li").removeClass("current"), $onePageMenuEl.find('a[data-href="' + s + '"]').parent("li").addClass("current"), (windowWidth < 768 || $body.hasClass("overlay-menu")) && ($("#primary-menu").find("ul.mobile-primary-menu").length > 0 ? $("#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu").toggleClass("d-block", !1) : $("#primary-menu > ul, #primary-menu > div > ul").toggleClass("d-block", !1), $pagemenu.toggleClass("pagemenu-active", !1), $body.toggleClass("primary-menu-open", !1)), $("html,body").stop(!0).animate({
                            scrollTop: $(s).offset().top - Number(n)
                        }, Number(o), r), onePageGlobalOffset = Number(n)
                    }
                    return !1
                })
            }
        },
        onepageScroller: function() {
            $onePageMenuEl.find("li").removeClass("current"), $onePageMenuEl.find('a[data-href="#' + SEMICOLON.header.onePageCurrentSection() + '"]').parent("li").addClass("current")
        },
        onePageCurrentSection: function() {
            var e = "home",
                t = $headerWrap.outerHeight();
            return $body.hasClass("side-header") && (t = 0), $pageSectionEl.each(function(a) {
                var i = $(this).offset().top,
                    s = $window.scrollTop();
                s + (t + onePageGlobalOffset) >= i && s < i + $(this).height() && $(this).attr("id") != e && (e = $(this).attr("id"))
            }), e
        },
        logo: function() {
            !$header.hasClass("dark") && !$body.hasClass("dark") || $headerWrap.hasClass("not-dark") ? (defaultLogoImg && defaultLogo.find("img").attr("src", defaultLogoImg), retinaLogoImg && retinaLogo.find("img").attr("src", retinaLogoImg)) : (defaultDarkLogo && defaultLogo.find("img").attr("src", defaultDarkLogo), retinaDarkLogo && retinaLogo.find("img").attr("src", retinaDarkLogo)), $header.hasClass("sticky-header") && (defaultStickyLogo && defaultLogo.find("img").attr("src", defaultStickyLogo), retinaStickyLogo && retinaLogo.find("img").attr("src", retinaStickyLogo)), ($body.hasClass("device-sm") || $body.hasClass("device-xs")) && (defaultMobileLogo && defaultLogo.find("img").attr("src", defaultMobileLogo), retinaMobileLogo && retinaLogo.find("img").attr("src", retinaMobileLogo))
        },
        stickyMenuClass: function() {
            if (stickyMenuClasses) var e = stickyMenuClasses.split(/ +/);
            else e = "";
            var t = e.length;
            if (t > 0) {
                var a = 0;
                for (a = 0; a < t; a++) "not-dark" == e[a] ? ($header.removeClass("dark"), $headerWrap.addClass("not-dark")) : "dark" == e[a] ? ($headerWrap.removeClass("not-dark force-not-dark"), $header.hasClass(e[a]) || $header.addClass(e[a])) : $header.hasClass(e[a]) || $header.addClass(e[a])
            }
        },
        responsiveMenuClass: function() {
            if ($body.hasClass("device-sm") || $body.hasClass("device-xs") || $body.hasClass("device-md")) {
                if (responsiveMenuClasses) var e = responsiveMenuClasses.split(/ +/);
                else e = "";
                var t = e.length;
                if (t > 0) {
                    var a = 0;
                    for (a = 0; a < t; a++) "not-dark" == e[a] ? ($header.removeClass("dark"), $headerWrap.addClass("not-dark")) : "dark" == e[a] ? ($headerWrap.removeClass("not-dark force-not-dark"), $header.hasClass(e[a]) || $header.addClass(e[a])) : $header.hasClass(e[a]) || $header.addClass(e[a])
                }
                SEMICOLON.header.logo()
            }
        },
        topsocial: function() {
            $topSocialEl.length > 0 && ($body.hasClass("device-lg") || $body.hasClass("device-xl") ? ($topSocialEl.show(), $topSocialEl.find("a").css({
                width: 40
            }), $topSocialEl.find(".ts-text").each(function() {
                var e = $(this).clone().css({
                        visibility: "hidden",
                        display: "inline-block",
                        "font-size": "13px",
                        "font-weight": "bold"
                    }).appendTo($body),
                    t = e.innerWidth() + 52;
                $(this).parent("a").attr("data-hover-width", t), e.remove()
            }), $topSocialEl.find("a").hover(function() {
                $(this).find(".ts-text").length > 0 && $(this).css({
                    width: $(this).attr("data-hover-width")
                })
            }, function() {
                $(this).css({
                    width: 40
                })
            })) : ($topSocialEl.show(), $topSocialEl.find("a").css({
                width: 40
            }), $topSocialEl.find("a").each(function() {
                var e = $(this).find(".ts-text").text();
                $(this).attr("title", e)
            }), $topSocialEl.find("a").hover(function() {
                $(this).css({
                    width: 40
                })
            }, function() {
                $(this).css({
                    width: 40
                })
            }), $body.hasClass("device-xs") && ($topSocialEl.hide(), $topSocialEl.slice(0, 8).show())))
        },
        topsearch: function() {
            $(document).on("click", function(e) {
                $(e.target).closest("#top-search").length || $body.toggleClass("top-search-open", !1), $(e.target).closest("#top-cart").length || $topCart.toggleClass("top-cart-open", !1), $(e.target).closest("#page-menu").length || $pagemenu.toggleClass("pagemenu-active", !1), $(e.target).closest("#side-panel").length || $body.toggleClass("side-panel-open", !1), $(e.target).closest("#primary-menu").length || $("#primary-menu.on-click > ul").find(".d-block").removeClass("d-block"), $(e.target).closest("#primary-menu.mobile-menu-off-canvas > ul").length || $("#primary-menu.mobile-menu-off-canvas > ul").toggleClass("d-block", !1), $(e.target).closest("#primary-menu.mobile-menu-off-canvas > div > ul").length || $("#primary-menu.mobile-menu-off-canvas > div > ul").toggleClass("d-block", !1)
            }), $("#top-search-trigger").off("click").on("click", function(e) {
                $body.toggleClass("top-search-open"), $topCart.toggleClass("top-cart-open", !1), $("#primary-menu > ul, #primary-menu > div > ul").toggleClass("d-block", !1), $pagemenu.toggleClass("pagemenu-active", !1), $body.hasClass("top-search-open") && $topSearch.find("input").focus(), e.stopPropagation(), e.preventDefault()
            })
        },
        topcart: function() {
            $("#top-cart-trigger").off("click").on("click", function(e) {
                $pagemenu.toggleClass("pagemenu-active", !1), $topCart.toggleClass("top-cart-open"), e.stopPropagation(), e.preventDefault()
            })
        }
    }, SEMICOLON.slider = {
        init: function() {
            SEMICOLON.slider.sliderParallaxDimensions(), SEMICOLON.slider.sliderRun(), SEMICOLON.slider.sliderParallax(), SEMICOLON.slider.sliderElementsFade(), SEMICOLON.slider.captionPosition()
        },
        sliderParallaxDimensions: function() {
            if ($sliderParallaxEl.find(".slider-parallax-inner").length < 1) return !0;
            if ($body.hasClass("device-xl") || $body.hasClass("device-lg") || $body.hasClass("device-md")) {
                var e = $sliderParallaxEl.outerHeight(),
                    t = $sliderParallaxEl.outerWidth();
                ($sliderParallaxEl.hasClass("revslider-wrap") || $sliderParallaxEl.find(".carousel-widget").length > 0) && (e = $sliderParallaxEl.find(".slider-parallax-inner").children().first().outerHeight(), $sliderParallaxEl.height(e)), $sliderParallaxEl.find(".slider-parallax-inner").height(e), $body.hasClass("side-header") && $sliderParallaxEl.find(".slider-parallax-inner").width(t), $body.hasClass("stretched") || (t = $wrapper.outerWidth(), $sliderParallaxEl.find(".slider-parallax-inner").width(t))
            } else $sliderParallaxEl.find(".slider-parallax-inner").css({
                width: "",
                height: ""
            });
            "" != swiperSlider && swiperSlider.update()
        },
        sliderRun: function() {
            if ("undefined" == typeof Swiper) return console.log("sliderRun: Swiper not Defined."), !0;
            var $sliderEl = $sliderElement.filter(":not(.customjs)");
            $sliderEl.each(function() {
                if ($(this).hasClass("swiper_wrapper")) {
                    if ($(this).find(".swiper-slide").length < 1) return !0;
                    var element = $(this).filter(".swiper_wrapper"),
                        elementDirection = element.attr("data-direction"),
                        elementSpeed = element.attr("data-speed"),
                        elementAutoPlay = element.attr("data-autoplay"),
                        elementLoop = element.attr("data-loop"),
                        elementEffect = element.attr("data-effect"),
                        elementGrabCursor = element.attr("data-grab"),
                        slideNumberTotal = element.find(".slide-number-total"),
                        slideNumberCurrent = element.find(".slide-number-current"),
                        sliderVideoAutoPlay = element.attr("data-video-autoplay"),
                        sliderSettings = element.attr("data-settings");
                    if (elementSpeed || (elementSpeed = 300), elementDirection || (elementDirection = "horizontal"), elementAutoPlay = elementAutoPlay ? Number(elementAutoPlay) : 999999999, elementLoop = "true" == elementLoop, elementEffect || (elementEffect = "slide"), elementGrabCursor = "false" != elementGrabCursor, sliderVideoAutoPlay = "false" != sliderVideoAutoPlay, element.find(".swiper-pagination").length > 0) var elementPagination = element.find(".swiper-pagination"),
                        elementPaginationClickable = !0;
                    else var elementPagination = "",
                        elementPaginationClickable = !1;
                    var elementNavNext = element.find(".slider-arrow-right"),
                        elementNavPrev = element.find(".slider-arrow-left"),
                        elementScollBar = element.find(".swiper-scrollbar");
                    if (swiperSlider = new Swiper(element.find(".swiper-parent"), {
                            direction: elementDirection,
                            speed: Number(elementSpeed),
                            autoplay: {
                                delay: elementAutoPlay
                            },
                            loop: elementLoop,
                            effect: elementEffect,
                            slidesPerView: 1,
                            grabCursor: elementGrabCursor,
                            pagination: {
                                el: elementPagination,
                                clickable: elementPaginationClickable
                            },
                            navigation: {
                                prevEl: elementNavPrev,
                                nextEl: elementNavNext
                            },
                            scrollbar: {
                                el: elementScollBar
                            },
                            on: {
                                init: function(e) {
                                    SEMICOLON.slider.sliderParallaxDimensions(), element.find(".yt-bg-player").attr("data-autoplay", "false").removeClass("customjs"), SEMICOLON.widget.youtubeBgVideo(), $(".swiper-slide-active [data-animate]").each(function() {
                                        var e = $(this),
                                            t = e.attr("data-delay"),
                                            a = 0;
                                        if (a = t ? Number(t) + 750 : 750, !e.hasClass("animated")) {
                                            e.addClass("not-animated");
                                            var i = e.attr("data-animate");
                                            setTimeout(function() {
                                                e.removeClass("not-animated").addClass(i + " animated")
                                            }, a)
                                        }
                                    }), element.find("[data-animate]").each(function() {
                                        var e = $(this),
                                            t = e.attr("data-animate");
                                        if (e.parents(".swiper-slide").hasClass("swiper-slide-active")) return !0;
                                        e.removeClass("animated").removeClass(t).addClass("not-animated")
                                    }), SEMICOLON.slider.swiperSliderMenu()
                                },
                                transitionStart: function(e) {
                                    slideNumberCurrent.length > 0 && (1 == elementLoop ? slideNumberCurrent.html(Number(element.find(".swiper-slide.swiper-slide-active").attr("data-swiper-slide-index")) + 1) : slideNumberCurrent.html(swiperSlider.activeIndex + 1)), element.find("[data-animate]").each(function() {
                                        var e = $(this),
                                            t = e.attr("data-animate");
                                        if (e.parents(".swiper-slide").hasClass("swiper-slide-active")) return !0;
                                        e.removeClass("animated").removeClass(t).addClass("not-animated")
                                    }), SEMICOLON.slider.swiperSliderMenu()
                                },
                                transitionEnd: function(e) {
                                    element.find(".swiper-slide").each(function() {
                                        var e = $(this);
                                        e.find("video").length > 0 && 1 == sliderVideoAutoPlay && e.find("video").get(0).pause(), e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").length > 0 && e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").YTPPause()
                                    }), element.find('.swiper-slide:not(".swiper-slide-active")').each(function() {
                                        var e = $(this);
                                        e.find("video").length > 0 && 0 != e.find("video").get(0).currentTime && (e.find("video").get(0).currentTime = 0), e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").length > 0 && e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").YTPSeekTo(e.find(".yt-bg-player.mb_YTPlayer:not(.customjs)").attr("data-start"))
                                    }), element.find(".swiper-slide.swiper-slide-active").find("video").length > 0 && 1 == sliderVideoAutoPlay && element.find(".swiper-slide.swiper-slide-active").find("video").get(0).play(), element.find(".swiper-slide.swiper-slide-active").find(".yt-bg-player.mb_YTPlayer:not(.customjs)").length > 0 && 1 == sliderVideoAutoPlay && element.find(".swiper-slide.swiper-slide-active").find(".yt-bg-player.mb_YTPlayer:not(.customjs)").YTPPlay(), element.find(".swiper-slide.swiper-slide-active [data-animate]").each(function() {
                                        var e = $(this),
                                            t = e.attr("data-delay"),
                                            a = 0;
                                        if (a = t ? Number(t) + 300 : 300, !e.hasClass("animated")) {
                                            e.addClass("not-animated");
                                            var i = e.attr("data-animate");
                                            setTimeout(function() {
                                                e.removeClass("not-animated").addClass(i + " animated")
                                            }, a)
                                        }
                                    })
                                }
                            }
                        }), slideNumberCurrent.length > 0 && (1 == elementLoop ? slideNumberCurrent.html(swiperSlider.realIndex + 1) : slideNumberCurrent.html(swiperSlider.activeIndex + 1)), slideNumberTotal.length > 0 && slideNumberTotal.html(element.find(".swiper-slide:not(.swiper-slide-duplicate)").length), sliderSettings)
                        for (var prop in sliderSettings = eval("(" + sliderSettings + ")"), sliderSettings) swiperSlider.params[prop] = sliderSettings[prop], swiperSlider.update()
                }
            })
        },
        sliderParallaxOffset: function() {
            var e = 0,
                t = $header.outerHeight();
            (($body.hasClass("side-header") || $header.hasClass("transparent-header")) && (t = 0), $pageTitle.length > 0) ? e = $pageTitle.outerHeight() + t: e = t;
            return $slider.next("#header").length > 0 && (e = 0), e
        },
        sliderParallax: function() {
            if ($sliderParallaxEl.length < 1) return !0;
            var e = SEMICOLON.slider.sliderParallaxOffset(),
                t = $sliderParallaxEl.outerHeight();
            if (!$body.hasClass("device-xl") && !$body.hasClass("device-lg") || SEMICOLON.isMobile.any()) $sliderParallaxEl.find(".slider-parallax-inner").length > 0 ? $(".slider-parallax-inner,.slider-parallax .slider-caption,.ei-title").css({
                transform: "translateY(0px)"
            }) : $(".slider-parallax,.slider-parallax .slider-caption,.ei-title").css({
                transform: "translateY(0px)"
            });
            else {
                if (t + e + 50 > $window.scrollTop())
                    if ($sliderParallaxEl.addClass("slider-parallax-visible").removeClass("slider-parallax-invisible"), $window.scrollTop() > e)
                        if ($sliderParallaxEl.find(".slider-parallax-inner").length > 0) {
                            var a = (-.4 * ($window.scrollTop() - e)).toFixed(0),
                                i = (-.15 * ($window.scrollTop() - e)).toFixed(0);
                            $sliderParallaxEl.find(".slider-parallax-inner").css({
                                transform: "translateY(" + a + "px)"
                            }), $(".slider-parallax .slider-caption,.ei-title").css({
                                transform: "translateY(" + i + "px)"
                            })
                        } else {
                            a = (($window.scrollTop() - e) / 1.5).toFixed(0), i = (($window.scrollTop() - e) / 7).toFixed(0);
                            $sliderParallaxEl.css({
                                transform: "translateY(" + a + "px)"
                            }), $(".slider-parallax .slider-caption,.ei-title").css({
                                transform: "translateY(" + -i + "px)"
                            })
                        }
                else $sliderParallaxEl.find(".slider-parallax-inner").length > 0 ? $(".slider-parallax-inner,.slider-parallax .slider-caption,.ei-title").css({
                    transform: "translateY(0px)"
                }) : $(".slider-parallax,.slider-parallax .slider-caption,.ei-title").css({
                    transform: "translateY(0px)"
                });
                else $sliderParallaxEl.addClass("slider-parallax-invisible").removeClass("slider-parallax-visible");
                requesting && requestAnimationFrame(function() {
                    SEMICOLON.slider.sliderParallax(), SEMICOLON.slider.sliderElementsFade()
                })
            }
        },
        sliderElementsFade: function() {
            if ($sliderParallaxEl.length > 0)
                if (!$body.hasClass("device-xl") && !$body.hasClass("device-lg") || SEMICOLON.isMobile.any()) $sliderParallaxEl.find(".slider-arrow-left,.slider-arrow-right,.vertical-middle:not(.no-fade),.slider-caption,.ei-title,.camera_prev,.camera_next").css({
                    opacity: 1
                });
                else {
                    SEMICOLON.slider.sliderParallaxOffset();
                    var e = $sliderParallaxEl.outerHeight();
                    if ($slider.length > 0) {
                        if ($header.hasClass("transparent-header") || $("body").hasClass("side-header")) var t = 100;
                        else t = 0;
                        $sliderParallaxEl.find(".slider-arrow-left,.slider-arrow-right,.vertical-middle:not(.no-fade),.slider-caption,.ei-title,.camera_prev,.camera_next").css({
                            opacity: 1 - 1.85 * ($window.scrollTop() - t) / e
                        })
                    }
                }
        },
        captionPosition: function() {
            $sliderElement.find(".slider-caption:not(.custom-caption-pos)").each(function() {
                var e = $(this).outerHeight(),
                    t = $sliderElement.outerHeight();
                $(this).parents("#slider").prev("#header").hasClass("transparent-header") && ($body.hasClass("device-xl") || $body.hasClass("device-lg")) ? $(this).parents("#slider").prev("#header").hasClass("floating-header") ? $(this).css({
                    top: (t + 160 - e) / 2 + "px"
                }) : $(this).css({
                    top: (t + 100 - e) / 2 + "px"
                }) : $(this).css({
                    top: (t - e) / 2 + "px"
                })
            })
        },
        swiperSliderMenu: function(e) {
            if (e = void 0 !== e && e, $body.hasClass("device-xl") || $body.hasClass("device-lg") || $header.hasClass("transparent-header-responsive") && !$body.hasClass("primary-menu-open")) {
                var t = $slider.find(".swiper-slide.swiper-slide-active");
                SEMICOLON.slider.headerSchemeChanger(t, e)
            }
        },
        revolutionSliderMenu: function(e) {
            if (e = void 0 !== e && e, $body.hasClass("device-xl") || $body.hasClass("device-lg") || $header.hasClass("transparent-header-responsive") && !$body.hasClass("primary-menu-open")) {
                var t = $slider.find(".active-revslide");
                SEMICOLON.slider.headerSchemeChanger(t, e)
            }
        },
        headerSchemeChanger: function(e, t) {
            if (e.length > 0) {
                var a = !1;
                if (e.hasClass("dark")) {
                    if (oldHeaderClasses) var i = oldHeaderClasses.split(/ +/);
                    else i = "";
                    var s = i.length;
                    if (s > 0) {
                        var o = 0;
                        for (o = 0; o < s; o++)
                            if ("dark" == i[o] && 1 == t) {
                                a = !0;
                                break
                            }
                    }
                    $("#header.transparent-header:not(.sticky-header,.semi-transparent,.floating-header)").addClass("dark"), a || $("#header.transparent-header.sticky-header,#header.transparent-header.semi-transparent.sticky-header,#header.transparent-header.floating-header.sticky-header").removeClass("dark"), $headerWrap.removeClass("not-dark")
                } else $body.hasClass("dark") ? (e.addClass("not-dark"), $("#header.transparent-header:not(.semi-transparent,.floating-header)").removeClass("dark"), $("#header.transparent-header:not(.sticky-header,.semi-transparent,.floating-header)").find("#header-wrap").addClass("not-dark")) : ($("#header.transparent-header:not(.semi-transparent,.floating-header)").removeClass("dark"), $headerWrap.removeClass("not-dark"));
                $header.hasClass("sticky-header") && SEMICOLON.header.stickyMenuClass(), SEMICOLON.header.logo()
            }
        },
        owlCaptionInit: function() {
            $owlCarouselEl.length > 0 && $owlCarouselEl.each(function() {
                var e = $(this);
                e.find(".owl-dot").length > 0 && e.addClass("with-carousel-dots")
            })
        }
    }, SEMICOLON.portfolio = {
        init: function() {
            SEMICOLON.portfolio.ajaxload()
        },
        gridInit: function(e) {
            return $().isotope ? e.length < 1 || (!!e.hasClass("customjs") || void e.each(function() {
                var e = $(this),
                    t = e.attr("data-transition"),
                    a = e.attr("data-layout"),
                    i = e.attr("data-stagger"),
                    s = !0;
                t || (t = "0.65s"), a || (a = "masonry"), i || (i = 0), $body.hasClass("rtl") && (s = !1), setTimeout(function() {
                    e.hasClass("portfolio") ? e.isotope({
                        layoutMode: a,
                        isOriginLeft: s,
                        transitionDuration: t,
                        stagger: Number(i),
                        masonry: {
                            columnWidth: e.find(".portfolio-item:not(.wide)")[0]
                        }
                    }) : e.isotope({
                        layoutMode: a,
                        isOriginLeft: s,
                        transitionDuration: t
                    })
                }, 300)
            })) : (console.log("gridInit: Isotope not Defined."), !0)
        },
        filterInit: function() {
            return $().isotope ? $portfolioFilter.length < 1 || (!!$portfolioFilter.hasClass("customjs") || void $portfolioFilter.each(function() {
                var e = $(this),
                    t = e.attr("data-container"),
                    a = e.attr("data-active-class"),
                    i = e.attr("data-default");
                a || (a = "activeFilter"), e.find("a").off("click").on("click", function() {
                    e.find("li").removeClass(a), $(this).parent("li").addClass(a);
                    var i = $(this).attr("data-filter");
                    return $(t).isotope({
                        filter: i
                    }), !1
                }), i && (e.find("li").removeClass(a), e.find('[data-filter="' + i + '"]').parent("li").addClass(a), $(t).isotope({
                    filter: i
                }))
            })) : (console.log("filterInit: Isotope not Defined."), !0)
        },
        shuffleInit: function() {
            return $().isotope ? $(".portfolio-shuffle").length < 1 || void $(".portfolio-shuffle").off("click").on("click", function() {
                var e = $(this).attr("data-container");
                $(e).isotope("shuffle")
            }) : (console.log("shuffleInit: Isotope not Defined."), !0)
        },
        portfolioDescMargin: function() {
            var e = $(".portfolio-overlay");
            e.length > 0 && e.each(function() {
                var e = $(this);
                if (e.find(".portfolio-desc").length > 0) {
                    var t = e.outerHeight(),
                        a = e.find(".portfolio-desc").outerHeight();
                    if (e.find("a.left-icon").length > 0 || e.find("a.right-icon").length > 0 || e.find("a.center-icon").length > 0) var i = 60;
                    else i = 0;
                    var s = (t - a - i) / 2;
                    e.find(".portfolio-desc").css({
                        "margin-top": s
                    })
                }
            })
        },
        arrange: function() {
            $portfolio.length > 0 && $portfolio.each(function() {
                var e = $(this);
                SEMICOLON.initialize.setFullColumnWidth(e)
            })
        },
        ajaxload: function() {
            $(".portfolio-ajax .portfolio-item a.center-icon").off("click").on("click", function(e) {
                var t = $(this).parents(".portfolio-item").attr("id");
                $(this).parents(".portfolio-item").hasClass("portfolio-active") || SEMICOLON.portfolio.loadItem(t, prevPostPortId), e.preventDefault()
            })
        },
        newNextPrev: function(e) {
            var t = SEMICOLON.portfolio.getNextItem(e),
                a = SEMICOLON.portfolio.getPrevItem(e);
            $("#next-portfolio").attr("data-id", t), $("#prev-portfolio").attr("data-id", a)
        },
        loadItem: function(e, t, a) {
            a || (a = !1);
            var i = SEMICOLON.portfolio.getNextItem(e),
                s = SEMICOLON.portfolio.getPrevItem(e);
            if (0 == a) {
                SEMICOLON.portfolio.closeItem(), $portfolioAjaxLoader.fadeIn();
                var o = $("#" + e).attr("data-loader");
                $portfolioDetailsContainer.load(o, {
                    portid: e,
                    portnext: i,
                    portprev: s
                }, function() {
                    SEMICOLON.portfolio.initializeAjax(e), SEMICOLON.portfolio.openItem(), $portfolioItems.removeClass("portfolio-active"), $("#" + e).addClass("portfolio-active")
                })
            }
        },
        closeItem: function() {
            $portfolioDetails && $portfolioDetails.height() > 32 && ($portfolioAjaxLoader.fadeIn(), $portfolioDetails.find("#portfolio-ajax-single").fadeOut("600", function() {
                $(this).remove()
            }), $portfolioDetails.removeClass("portfolio-ajax-opened"))
        },
        openItem: function() {
            var e = $portfolioDetails.find("img").length,
                t = 0;
            if (e > 0) $portfolioDetails.find("img").on("load", function() {
                t++;
                var a = SEMICOLON.initialize.topScrollOffset();
                if (e === t) {
                    $portfolioDetailsContainer.css({
                        display: "block"
                    }), $portfolioDetails.addClass("portfolio-ajax-opened"), $portfolioAjaxLoader.fadeOut();
                    setTimeout(function() {
                        SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.lightbox(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs(), $("html,body").stop(!0).animate({
                            scrollTop: $portfolioDetails.offset().top - a
                        }, 900, "easeOutQuad")
                    }, 500)
                }
            });
            else {
                var a = SEMICOLON.initialize.topScrollOffset();
                $portfolioDetailsContainer.css({
                    display: "block"
                }), $portfolioDetails.addClass("portfolio-ajax-opened"), $portfolioAjaxLoader.fadeOut();
                setTimeout(function() {
                    SEMICOLON.widget.loadFlexSlider(), SEMICOLON.initialize.lightbox(), SEMICOLON.initialize.resizeVideos(), SEMICOLON.widget.masonryThumbs(), $("html,body").stop(!0).animate({
                        scrollTop: $portfolioDetails.offset().top - a
                    }, 900, "easeOutQuad")
                }, 500)
            }
        },
        getNextItem: function(e) {
            var t = "",
                a = $("#" + e).next();
            return 0 != a.length && (t = a.attr("id")), t
        },
        getPrevItem: function(e) {
            var t = "",
                a = $("#" + e).prev();
            return 0 != a.length && (t = a.attr("id")), t
        },
        initializeAjax: function(e) {
            prevPostPortId = $("#" + e), $("#next-portfolio, #prev-portfolio").off("click").on("click", function() {
                var e = $(this).attr("data-id");
                return $portfolioItems.removeClass("portfolio-active"), $("#" + e).addClass("portfolio-active"), SEMICOLON.portfolio.loadItem(e, prevPostPortId), !1
            }), $("#close-portfolio").off("click").on("click", function() {
                return $portfolioDetailsContainer.fadeOut("600", function() {
                    $portfolioDetails.find("#portfolio-ajax-single").remove()
                }), $portfolioDetails.removeClass("portfolio-ajax-opened"), $portfolioItems.removeClass("portfolio-active"), !1
            })
        }
    }, SEMICOLON.widget = {
        init: function() {
            SEMICOLON.widget.animations(), SEMICOLON.widget.youtubeBgVideo(), SEMICOLON.widget.tabs(), SEMICOLON.widget.tabsJustify(), SEMICOLON.widget.tabsResponsive(), SEMICOLON.widget.tabsResponsiveResize(), SEMICOLON.widget.toggles(), SEMICOLON.widget.accordions(), SEMICOLON.widget.counter(), SEMICOLON.widget.roundedSkill(), SEMICOLON.widget.progress(), SEMICOLON.widget.twitterFeed(), SEMICOLON.widget.flickrFeed(), SEMICOLON.widget.instagramPhotos("5834720953.1677ed0.a0a26ba4c90845f9a844d64c316bf77a", "8e000fefe3024b2ead6a50ff005bf036"), SEMICOLON.widget.dribbbleShots("012d3d72d12f93e1d41a19195d7da2fc87e6b5afa48a184256e398eb793cfe56"), SEMICOLON.widget.navTree(), SEMICOLON.widget.textRotater(), SEMICOLON.widget.carousel(), SEMICOLON.widget.linkScroll(), SEMICOLON.widget.ajaxForm(), SEMICOLON.widget.subscription(), SEMICOLON.widget.stickySidebar(), SEMICOLON.widget.cookieNotify(), SEMICOLON.widget.cartQuantity(), SEMICOLON.widget.extras()
        },
        parallax: function() {
            if ("undefined" != typeof skrollr && $.isFunction(skrollr)) return console.log("parallax: skrollr not Defined."), !0;
            ($parallaxEl.length > 0 || $parallaxPageTitleEl.length > 0 || $parallaxPortfolioEl.length > 0) && (SEMICOLON.isMobile.any() ? ($parallaxEl.addClass("mobile-parallax"), $parallaxPageTitleEl.addClass("mobile-parallax"), $parallaxPortfolioEl.addClass("mobile-parallax")) : skrollr.init({
                forceHeight: !1
            }))
        },
        animations: function() {
            if (!$().appear) return console.log("animations: Appear not Defined."), !0;
            var e = $("[data-animate]");
            e.length > 0 && ($body.hasClass("device-xl") || $body.hasClass("device-lg") || $body.hasClass("device-md")) && e.each(function() {
                var e = $(this),
                    t = e.attr("data-animate-out"),
                    a = e.attr("data-delay"),
                    i = e.attr("data-delay-out"),
                    s = 0,
                    o = 3e3;
                if (e.parents(".fslider.no-thumbs-animate").length > 0) return !0;
                if (e.parents(".swiper-slide").length > 0) return !0;
                if (s = a ? Number(a) + 500 : 500, t && i && (o = Number(i) + s), !e.hasClass("animated")) {
                    e.addClass("not-animated");
                    var n = e.attr("data-animate");
                    e.appear(function() {
                        setTimeout(function() {
                            e.removeClass("not-animated").addClass(n + " animated")
                        }, s), t && setTimeout(function() {
                            e.removeClass(n).addClass(t)
                        }, o)
                    }, {
                        accX: 0,
                        accY: -120
                    }, "easeInCubic")
                }
            })
        },
        loadFlexSlider: function() {
            if (!$().flexslider) return console.log("loadFlexSlider: FlexSlider not Defined."), !0;
            var e = $(".fslider:not(.customjs)").find(".flexslider");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.parent(".fslider").attr("data-animation"),
                    a = e.parent(".fslider").attr("data-easing"),
                    i = e.parent(".fslider").attr("data-direction"),
                    s = e.parent(".fslider").attr("data-reverse"),
                    o = e.parent(".fslider").attr("data-slideshow"),
                    n = e.parent(".fslider").attr("data-pause"),
                    r = e.parent(".fslider").attr("data-speed"),
                    l = e.parent(".fslider").attr("data-video"),
                    d = e.parent(".fslider").attr("data-pagi"),
                    c = e.parent(".fslider").attr("data-arrows"),
                    u = e.parent(".fslider").attr("data-thumbs"),
                    f = e.parent(".fslider").attr("data-hover"),
                    h = e.parent(".fslider").attr("data-smooth-height"),
                    p = e.parent(".fslider").attr("data-touch"),
                    m = !1;
                t || (t = "slide"), a && "swing" != a || (a = "swing", m = !0), i || (i = "horizontal"), s = "true" == s, o = !o, n || (n = 5e3), r || (r = 600), l || (l = !1), h = "false" != h, "vertical" == i && (h = !1), d = "false" != d, d = "true" == u ? "thumbnails" : d, c = "false" != c, f = "false" != f, p = "false" != p, e.flexslider({
                    selector: ".slider-wrap > .slide",
                    animation: t,
                    easing: a,
                    direction: i,
                    reverse: s,
                    slideshow: o,
                    slideshowSpeed: Number(n),
                    animationSpeed: Number(r),
                    pauseOnHover: f,
                    video: l,
                    controlNav: d,
                    directionNav: c,
                    smoothHeight: h,
                    useCSS: m,
                    touch: p,
                    start: function(e) {
                        SEMICOLON.widget.animations(), SEMICOLON.initialize.verticalMiddle(), e.parent().removeClass("preloader2");
                        setTimeout(function() {
                            $(".grid-container").isotope("layout")
                        }, 1200);
                        SEMICOLON.initialize.lightbox(), $(".flex-prev").html('<i class="icon-angle-left"></i>'), $(".flex-next").html('<i class="icon-angle-right"></i>'), SEMICOLON.portfolio.portfolioDescMargin()
                    },
                    after: function() {
                        $(".grid-container").hasClass("portfolio-full") && ($(".grid-container.portfolio-full").isotope("layout"), SEMICOLON.portfolio.portfolioDescMargin()), $(".post-grid").hasClass("post-masonry-full") && $(".post-grid.post-masonry-full").isotope("layout")
                    }
                })
            })
        },
        html5Video: function() {
            var e = $(".video-wrap:has(video)");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.find("video"),
                    a = e.outerWidth(),
                    i = e.outerHeight(),
                    s = 16 * i / 9,
                    o = i;
                if (s < a && (s = a, o = 9 * a / 16), t.css({
                        width: s + "px",
                        height: o + "px"
                    }), o > i && t.css({
                        left: "",
                        top: -(o - i) / 2 + "px"
                    }), s > a && t.css({
                        top: "",
                        left: -(s - a) / 2 + "px"
                    }), SEMICOLON.isMobile.any() && !e.hasClass("no-placeholder")) {
                    var n = t.attr("poster");
                    "" != n && e.append('<div class="video-placeholder" style="background-image: url(' + n + ');"></div>'), t.hide()
                }
            })
        },
        youtubeBgVideo: function() {
            if (!$().YTPlayer) return console.log("youtubeBgVideo: YoutubeBG Plugin not Defined."), !0;
            var e = $(".yt-bg-player");
            if (e.hasClass("customjs")) return !0;
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-video"),
                    a = e.attr("data-mute"),
                    i = e.attr("data-ratio"),
                    s = e.attr("data-quality"),
                    o = e.attr("data-opacity"),
                    n = e.attr("data-container"),
                    r = e.attr("data-optimize"),
                    l = e.attr("data-loop"),
                    d = e.attr("data-volume"),
                    c = e.attr("data-start"),
                    u = e.attr("data-stop"),
                    f = e.attr("data-autoplay"),
                    h = e.attr("data-fullscreen");
                a = "false" != a, i || (i = "16/9"), s || (s = "hd720"), o || (o = 1), n || (n = "self"), r = "false" != r, l = "false" != l, d || (d = 1), c || (c = 0), u || (u = 0), f = "false" != f, h = "true" == h, e.YTPlayer({
                    videoURL: t,
                    mute: a,
                    ratio: i,
                    quality: s,
                    opacity: Number(o),
                    containment: n,
                    optimizeDisplay: r,
                    loop: l,
                    vol: Number(d),
                    startAt: Number(c),
                    stopAt: Number(u),
                    autoPlay: f,
                    realfullscreen: h,
                    showYTLogo: !1,
                    showControls: !1
                })
            })
        },
        tabs: function() {
            if (!$().tabs) return console.log("tabs: Tabs not Defined."), !0;
            var e = $(".tabs:not(.customjs)");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-speed"),
                    a = e.attr("data-active");
                t || (t = 400), a ? a -= 1 : a = 0;
                var i = window.location.hash;
                if (jQuery(i).length > 0) {
                    var s = i.split("#"),
                        o = document.getElementById(s[1]);
                    a = jQuery(".tab-content").index(o)
                }
                e.tabs({
                    active: Number(a),
                    show: {
                        effect: "fade",
                        duration: Number(t)
                    }
                })
            })
        },
        tabsJustify: function() {
            if ($("body").hasClass("device-xs") || $("body").hasClass("device-sm")) $(".tabs.tabs-justify").find(".tab-nav > li").css({
                width: ""
            });
            else {
                var e = $(".tabs.tabs-justify");
                e.length > 0 && e.each(function() {
                    var e, t = $(this),
                        a = t.find(".tab-nav > li"),
                        i = a.length,
                        s = 0;
                    s = t.hasClass("tabs-bordered") || t.hasClass("tabs-bb") ? t.find(".tab-nav").outerWidth() : t.find("tab-nav").hasClass("tab-nav2") ? t.find(".tab-nav").outerWidth() - 10 * i : t.find(".tab-nav").outerWidth() - 30, e = Math.floor(s / i), a.css({
                        width: e + "px"
                    })
                })
            }
        },
        tabsResponsive: function() {
            if (!$().tabs) return console.log("tabs: Tabs not Defined."), !0;
            var e = $(".tabs.tabs-responsive");
            if (e.length < 1) return !0;
            e.each(function() {
                var e = $(this),
                    t = e.find(".tab-nav"),
                    a = e.find(".tab-container");
                t.children("li").each(function() {
                    var e = $(this).children("a"),
                        t = e.attr("href"),
                        i = e.html();
                    a.find(t).before('<div class="acctitle d-none"><i class="acc-closed icon-ok-circle"></i><i class="acc-open icon-remove-circle"></i>' + i + "</div>")
                })
            })
        },
        tabsResponsiveResize: function() {
            if (!$().tabs) return console.log("tabs: Tabs not Defined."), !0;
            var e = $(".tabs.tabs-responsive");
            if (e.length < 1) return !0;
            e.each(function() {
                var e = $(this),
                    t = e.tabs("option", "active") + 1,
                    a = e.attr("data-accordion-style");
                $("body").hasClass("device-sm") || $("body").hasClass("device-xs") ? (e.find(".tab-nav").addClass("d-none"), e.find(".tab-container").addClass("accordion " + a + " clearfix").attr("data-active", t), e.find(".tab-content").addClass("acc_content"), e.find(".acctitle").removeClass("d-none"), SEMICOLON.widget.accordions()) : ($("body").hasClass("device-md") || $("body").hasClass("device-lg") || $("body").hasClass("device-xl")) && (e.find(".tab-nav").removeClass("d-none"), e.find(".tab-container").removeClass("accordion " + a + " clearfix").attr("data-active", ""), e.find(".tab-content").removeClass("acc_content"), e.find(".acctitle").addClass("d-none"), e.tabs("refresh"))
            })
        },
        toggles: function() {
            var e = $(".toggle");
            e.length > 0 && e.each(function() {
                var e = $(this);
                "open" != e.attr("data-state") ? e.children(".togglec").hide() : e.children(".togglet").addClass("toggleta"), e.children(".togglet").off("click").on("click", function() {
                    return $(this).toggleClass("toggleta").next(".togglec").slideToggle(300), !0
                })
            })
        },
        accordions: function() {
            var e = $(".accordion");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-state"),
                    a = e.attr("data-active");
                a ? a -= 1 : a = 0, e.find(".acc_content").hide(), "closed" != t && e.find(".acctitle:eq(" + Number(a) + ")").addClass("acctitlec").next().show(), e.find(".acctitle").off("click").on("click", function() {
                    if ($(this).next().is(":hidden")) {
                        e.find(".acctitle").removeClass("acctitlec").next().slideUp("normal");
                        var t = $(this);
                        $(this).toggleClass("acctitlec").next().stop().slideDown("normal", function() {
                            ($body.hasClass("device-sm") || $body.hasClass("device-xs")) && e.hasClass("scroll-on-open") && $("html,body").stop(!0).animate({
                                scrollTop: t.offset().top - (SEMICOLON.initialize.topScrollOffset() - 40)
                            }, 800, "easeOutQuad")
                        })
                    }
                    return !1
                })
            })
        },
        counter: function() {
            if (!$().appear) return console.log("counter: Appear not Defined."), !0;
            if (!$().countTo) return console.log("counter: countTo not Defined."), !0;
            var e = $(".counter:not(.counter-instant)");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = $(this).find("span").attr("data-comma");
                t = !!t, $body.hasClass("device-xl") || $body.hasClass("device-lg") ? e.appear(function() {
                    SEMICOLON.widget.runCounter(e, t)
                }, {
                    accX: 0,
                    accY: -120
                }, "easeInCubic") : SEMICOLON.widget.runCounter(e, t)
            })
        },
        runCounter: function(e, t) {
            1 == t ? e.find("span").countTo({
                formatter: function(e, t) {
                    return e = (e = e.toFixed(t.decimals)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
            }) : e.find("span").countTo()
        },
        roundedSkill: function() {
            if (!$().appear) return console.log("roundedSkill: Appear not Defined."), !0;
            if (!$().easyPieChart) return console.log("roundedSkill: EasyPieChart not Defined."), !0;
            var e = $(".rounded-skill");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-size"),
                    a = e.attr("data-speed"),
                    i = e.attr("data-width"),
                    s = e.attr("data-color"),
                    o = e.attr("data-trackcolor");
                t || (t = 140), a || (a = 2e3), i || (i = 8), s || (s = "#0093BF"), o || (o = "rgba(0,0,0,0.04)");
                var n = {
                    roundSkillSize: t,
                    roundSkillSpeed: a,
                    roundSkillWidth: i,
                    roundSkillColor: s,
                    roundSkillTrackColor: o
                };
                $body.hasClass("device-xl") || $body.hasClass("device-lg") ? (e.css({
                    width: t + "px",
                    height: t + "px",
                    "line-height": t + "px"
                }).animate({
                    opacity: 0
                }, 10), e.appear(function() {
                    if (!e.hasClass("skills-animated")) {
                        setTimeout(function() {
                            e.css({
                                opacity: 1
                            })
                        }, 100);
                        SEMICOLON.widget.runRoundedSkills(e, n), e.addClass("skills-animated")
                    }
                }, {
                    accX: 0,
                    accY: -120
                }, "easeInCubic")) : SEMICOLON.widget.runRoundedSkills(e, n)
            })
        },
        runRoundedSkills: function(e, t) {
            e.easyPieChart({
                size: Number(t.roundSkillSize),
                animate: Number(t.roundSkillSpeed),
                scaleColor: !1,
                trackColor: t.roundSkillTrackColor,
                lineWidth: Number(t.roundSkillWidth),
                lineCap: "square",
                barColor: t.roundSkillColor
            })
        },
        progress: function() {
            if (!$().appear) return console.log("progress: Appear not Defined."), !0;
            var e = $(".progress");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.parent("li"),
                    a = t.attr("data-percent");
                $body.hasClass("device-xl") || $body.hasClass("device-lg") ? e.appear(function() {
                    t.hasClass("skills-animated") || (e.find(".counter-instant span").countTo(), t.find(".progress").css({
                        width: a + "%"
                    }).addClass("skills-animated"))
                }, {
                    accX: 0,
                    accY: -120
                }, "easeInCubic") : (e.find(".counter-instant span").countTo(), t.find(".progress").css({
                    width: a + "%"
                }))
            })
        },
        twitterFeed: function() {
            if ("undefined" == typeof sm_format_twitter) return console.log("twitterFeed: sm_format_twitter() not Defined."), !0;
            if ("undefined" == typeof sm_format_twitter3) return console.log("twitterFeed: sm_format_twitter3() not Defined."), !0;
            var e = $(".twitter-feed");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-username"),
                    a = e.attr("data-count"),
                    i = e.attr("data-loader");
                t || (t = "twitter"), a || (a = 3), i || (i = "include/twitter/tweets.php"), $.getJSON(i + "?username=" + t + "&count=" + a, function(t) {
                    e.hasClass("fslider") ? e.find(".slider-wrap").html(sm_format_twitter3(t)).promise().done(function() {
                        var t = setInterval(function() {
                            if (e.find(".slide").length > 1) {
                                e.removeClass("customjs");
                                setTimeout(function() {
                                    SEMICOLON.widget.loadFlexSlider()
                                }, 500);
                                clearInterval(t)
                            }
                        }, 500)
                    }) : e.html(sm_format_twitter(t))
                })
            })
        },
        flickrFeed: function() {
            if (!$().jflickrfeed) return console.log("flickrFeed: jflickrfeed not Defined."), !0;
            var e = $(".flickr-feed");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-id"),
                    a = e.attr("data-count"),
                    i = "photos_public.gne";
                "group" == e.attr("data-type") && (i = "groups_pool.gne"), a || (a = 9), e.jflickrfeed({
                    feedapi: i,
                    limit: Number(a),
                    qstrings: {
                        id: t
                    },
                    itemTemplate: '<a href="{{image_b}}" title="{{title}}" data-lightbox="gallery-item"><img src="{{image_s}}" alt="{{title}}" /></a>'
                }, function(e) {
                    SEMICOLON.initialize.lightbox()
                })
            })
        },
        instagramPhotos: function(e, t) {
            if ("undefined" == typeof Instafeed) return console.log("Instafeed not Defined."), !0;
            var a = $(".instagram-photos");
            a.length > 0 && a.each(function() {
                var a = $(this),
                    i = a.attr("id"),
                    s = a.attr("data-user"),
                    o = a.attr("data-tag"),
                    n = (a.attr("data-location"), a.attr("data-count")),
                    r = a.attr("data-type"),
                    l = a.attr("data-sortBy"),
                    d = a.attr("data-resolution");
                if (n || (n = 9), l || (l = "none"), d || (d = "thumbnail"), "user" == r) var c = new Instafeed({
                    target: i,
                    get: r,
                    userId: Number(s),
                    limit: Number(n),
                    sortBy: l,
                    resolution: d,
                    accessToken: e,
                    clientId: t
                });
                else if ("tagged" == r) c = new Instafeed({
                    target: i,
                    get: r,
                    tagName: o,
                    limit: Number(n),
                    sortBy: l,
                    resolution: d,
                    clientId: t
                });
                else if ("location" == r) c = new Instafeed({
                    target: i,
                    get: r,
                    locationId: Number(s),
                    limit: Number(n),
                    sortBy: l,
                    resolution: d,
                    clientId: t
                });
                else c = new Instafeed({
                    target: i,
                    get: "popular",
                    limit: Number(n),
                    sortBy: l,
                    resolution: d,
                    clientId: t
                });
                c.run()
            })
        },
        dribbbleShots: function(e) {
            if (!$.jribbble) return console.log("dribbbleShots: Jribbble not Defined."), !0;
            if (!$().imagesLoaded) return console.log("dribbbleShots: imagesLoaded not Defined."), !0;
            var t = $(".dribbble-shots");
            t.length > 0 && ($.jribbble.setToken(e), t.each(function() {
                var e = $(this),
                    t = e.attr("data-user"),
                    a = e.attr("data-count"),
                    i = e.attr("data-list"),
                    s = e.attr("data-type");
                e.addClass("customjs"), a || (a = 9), "user" == s ? $.jribbble.users(t).shots({
                    sort: "recent",
                    page: 1,
                    per_page: Number(a)
                }).then(function(t) {
                    var a = [];
                    t.forEach(function(e) {
                        a.push('<a href="' + e.html_url + '" target="_blank">'), a.push('<img src="' + e.images.teaser + '" '), a.push('alt="' + e.title + '"></a>')
                    }), e.html(a.join("")), e.imagesLoaded().done(function() {
                        e.removeClass("customjs"), SEMICOLON.widget.masonryThumbs()
                    })
                }) : "list" == s && $.jribbble.shots(i, {
                    sort: "recent",
                    page: 1,
                    per_page: Number(a)
                }).then(function(t) {
                    var a = [];
                    t.forEach(function(e) {
                        a.push('<a href="' + e.html_url + '" target="_blank">'), a.push('<img src="' + e.images.teaser + '" '), a.push('alt="' + e.title + '"></a>')
                    }), e.html(a.join("")), e.imagesLoaded().done(function() {
                        e.removeClass("customjs"), SEMICOLON.widget.masonryThumbs()
                    })
                })
            }))
        },
        navTree: function() {
            var e = $(".nav-tree");
            e.length > 0 && e.each(function() {
                var e = $(this),
                    t = e.attr("data-speed"),
                    a = e.attr("data-easing");
                t || (t = 250), a || (a = "swing"), e.find("ul li:has(ul)").addClass("sub-menu"), e.find("ul li:has(ul) > a").append(' <i class="icon-angle-down"></i>'), e.hasClass("on-hover") ? e.find("ul li:has(ul):not(.active)").hover(function(e) {
                    $(this).children("ul").stop(!0, !0).slideDown(Number(t), a)
                }, function() {
                    $(this).children("ul").delay(250).slideUp(Number(t), a)
                }) : e.find("ul li:has(ul) > a").off("click").on("click", function(i) {
                    var s = $(this);
                    e.find("ul li").not(s.parents()).removeClass("active"), s.parent().children("ul").slideToggle(Number(t), a, function() {
                        $(this).find("ul").hide(), $(this).find("li.active").removeClass("active")
                    }), e.find("ul li > ul").not(s.parent().children("ul")).not(s.parents("ul")).slideUp(Number(t), a), s.parent("li:has(ul)").toggleClass("active"), i.preventDefault()
                })
            })
        },
        carousel: function() {
            if (!$().owlCarousel) return console.log("carousel: Owl Carousel not Defined."), !0;
            var e = $(".carousel-widget:not(.customjs)");
            if (e.length < 1) return !0;
            e.each(function() {
                var e = $(this),
                    t = e.attr("data-items"),
                    a = e.attr("data-items-xl"),
                    i = e.attr("data-items-lg"),
                    s = e.attr("data-items-md"),
                    o = e.attr("data-items-sm"),
                    n = e.attr("data-items-xs"),
                    r = e.attr("data-loop"),
                    l = e.attr("data-autoplay"),
                    d = e.attr("data-speed"),
                    c = e.attr("data-animate-in"),
                    u = e.attr("data-animate-out"),
                    f = e.attr("data-nav"),
                    h = e.attr("data-pagi"),
                    p = e.attr("data-margin"),
                    m = e.attr("data-stage-padding"),
                    g = e.attr("data-merge"),
                    v = e.attr("data-start"),
                    C = e.attr("data-rewind"),
                    b = e.attr("data-slideby"),
                    y = e.attr("data-center"),
                    O = e.attr("data-lazyload"),
                    w = e.attr("data-video"),
                    S = e.attr("data-rtl"),
                    x = 5e3,
                    E = !0;
                t || (t = 4), a || (a = Number(t)), i || (i = Number(a)), s || (s = Number(i)), o || (o = Number(s)), n || (n = Number(o)), d || (d = 250), p || (p = 20), m || (m = 0), v || (v = 0), b || (b = 1), b = "page" == b ? "page" : Number(b), r = "true" == r, l ? (x = Number(l), l = !0) : (l = !1, E = !1), c || (c = !1), u || (u = !1), f = "false" != f, h = "false" != h, C = "true" == C, g = "true" == g, y = "true" == y, O = "true" == O, w = "true" == w, S = !("true" != S && !$body.hasClass("rtl")), e.owlCarousel({
                    margin: Number(p),
                    loop: r,
                    stagePadding: Number(m),
                    merge: g,
                    startPosition: Number(v),
                    rewind: C,
                    slideBy: b,
                    center: y,
                    lazyLoad: O,
                    nav: f,
                    navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
                    autoplay: l,
                    autoplayTimeout: x,
                    autoplayHoverPause: E,
                    dots: h,
                    smartSpeed: Number(d),
                    fluidSpeed: Number(d),
                    video: w,
                    animateIn: c,
                    animateOut: u,
                    rtl: S,
                    responsive: {
                        0: {
                            items: Number(n)
                        },
                        576: {
                            items: Number(o)
                        },
                        768: {
                            items: Number(s)
                        },
                        992: {
                            items: Number(i)
                        },
                        1200: {
                            items: Number(a)
                        }
                    },
                    onInitialized: function() {
                        SEMICOLON.slider.owlCaptionInit(), SEMICOLON.slider.sliderParallaxDimensions(), SEMICOLON.initialize.lightbox()
                    }
                })
            })
        },
        masonryThumbs: function() {
            var e = $(".masonry-thumbs:not(.customjs)");
            e.length > 0 && e.each(function() {
                var e = $(this);
                SEMICOLON.widget.masonryThumbsArrange(e)
            })
        },
        masonryThumbsArrange: function(e) {
            if (!$().isotope) return console.log("masonryThumbsArrange: Isotope not Defined."), !0;
            SEMICOLON.initialize.setFullColumnWidth(e), e.isotope("layout")
        },
        notifications: function(e) {
            if ("undefined" == typeof toastr) return console.log("notifications: Toastr not Defined."), !0;
            toastr.remove();
            var t = $(e),
                a = t.attr("data-notify-position"),
                i = t.attr("data-notify-type"),
                s = t.attr("data-notify-msg"),
                o = t.attr("data-notify-timeout"),
                n = t.attr("data-notify-close");
            return a = a ? "toast-" + t.attr("data-notify-position") : "toast-top-right", s || (s = "Please set a message!"), o || (o = 5e3), n = "true" == n, toastr.options.positionClass = a, toastr.options.timeOut = Number(o), toastr.options.closeButton = n, toastr.options.closeHtml = '<button><i class="icon-remove"></i></button>', "warning" == i ? toastr.warning(s) : "error" == i ? toastr.error(s) : "success" == i ? toastr.success(s) : toastr.info(s), !1
        },
        textRotater: function() {
            if (!$().Morphext) return console.log("textRotater: Morphext not Defined."), !0;
            $textRotaterEl.length > 0 && $textRotaterEl.each(function() {
                $(this);
                var e = $(this).attr("data-rotate"),
                    t = $(this).attr("data-speed"),
                    a = $(this).attr("data-separator");
                e || (e = "fade"), t || (t = 1200), a || (a = ",");
                $(this).find(".t-rotate").Morphext({
                    animation: e,
                    separator: a,
                    speed: Number(t)
                })
            })
        },
        linkScroll: function() {
            $("a[data-scrollto]").off("click").on("click", function() {
                var e = $(this),
                    t = e.attr("data-scrollto"),
                    a = e.attr("data-speed"),
                    i = e.attr("data-offset"),
                    s = e.attr("data-easing"),
                    o = e.attr("data-highlight");
                return !!e.parents("#primary-menu").hasClass("on-click") || (a || (a = 750), i || (i = SEMICOLON.initialize.topScrollOffset()), s || (s = "easeOutQuad"), $("html,body").stop(!0).animate({
                    scrollTop: $(t).offset().top - Number(i)
                }, Number(a), s, function() {
                    if (o)
                        if ($(t).find(".highlight-me").length > 0) {
                            $(t).find(".highlight-me").animate({
                                backgroundColor: o
                            }, 300);
                            setTimeout(function() {
                                $(t).find(".highlight-me").animate({
                                    backgroundColor: "transparent"
                                }, 300)
                            }, 500)
                        } else {
                            $(t).animate({
                                backgroundColor: o
                            }, 300);
                            setTimeout(function() {
                                $(t).animate({
                                    backgroundColor: "transparent"
                                }, 300)
                            }, 500)
                        }
                }), !1)
            })
        },
        ajaxForm: function() {
            if (!$().validate) return console.log("ajaxForm: Form Validate not Defined."), !0;
            if (!$().ajaxSubmit) return console.log("ajaxForm: jQuery Form not Defined."), !0;
            var e = $(".form-widget:not(.customjs)");
            if (e.length < 1) return !0;
            e.each(function() {
                var e = $(this),
                    t = e.find("form").attr("id"),
                    a = e.attr("data-alert-type"),
                    i = e.attr("data-loader"),
                    s = e.find(".form-result"),
                    o = e.attr("data-redirect");
                a || (a = "notify"), t && $body.addClass(t + "-ready"), e.find("form").validate({
                    errorPlacement: function(e, t) {
                        t.parents(".form-group").length > 0 ? e.appendTo(t.parents(".form-group")) : e.insertAfter(t)
                    },
                    focusCleanup: !0,
                    submitHandler: function(e) {
                        if (s.hide(), "button" == i) {
                            var n = $(e).find("button"),
                                r = n.html();
                            n.html('<i class="icon-line-loader icon-spin nomargin"></i>')
                        } else $(e).find(".form-process").fadeIn();
                        t && $body.removeClass(t + "-ready " + t + "-complete " + t + "-success " + t + "-error").addClass(t + "-processing"), $(e).ajaxSubmit({
                            target: s,
                            dataType: "json",
                            success: function(l) {
                                if ("button" == i ? n.html(r) : $(e).find(".form-process").fadeOut(), "error" != l.alert && o) return window.location.replace(o), !0;
                                if ("inline" == a) {
                                    if ("error" == l.alert) var d = "alert-danger";
                                    else d = "alert-success";
                                    s.removeClass("alert-danger alert-success").addClass("alert " + d).html(l.message).slideDown(400)
                                } else "notify" == a && (s.attr("data-notify-type", l.alert).attr("data-notify-msg", l.message).html(""), SEMICOLON.widget.notifications(s));
                                if ("error" != l.alert) {
                                    $(e).resetForm(), $(e).find(".btn-group > .btn").removeClass("active"), "undefined" != typeof tinyMCE && tinyMCE.activeEditor && !tinyMCE.activeEditor.isHidden() && tinymce.activeEditor.setContent("");
                                    var c = $(e).find(".input-range-slider");
                                    c.length > 0 && c.each(function() {
                                        $(this).data("ionRangeSlider").reset()
                                    });
                                    var u = $(e).find(".input-rating");
                                    u.length > 0 && u.each(function() {
                                        $(this).rating("reset")
                                    });
                                    var f = $(e).find(".selectpicker");
                                    f.length > 0 && f.each(function() {
                                        $(this).selectpicker("val", ""), $(this).selectpicker("deselectAll")
                                    }), $(e).find(".input-select2,select[data-selectsplitter-firstselect-selector]").change(), $(e).trigger("formSubmitSuccess"), $body.removeClass(t + "-error").addClass(t + "-success")
                                } else $(e).trigger("formSubmitError"), $body.removeClass(t + "-success").addClass(t + "-error");
                                t && $body.removeClass(t + "-processing").addClass(t + "-complete"), $(e).find(".g-recaptcha").children("div").length > 0 && grecaptcha.reset()
                            }
                        })
                    }
                })
            })
        },
        subscription: function() {
            if (!$().validate) return console.log("subscription: Form Validate not Defined."), !0;
            if (!$().ajaxSubmit) return console.log("subscription: jQuery Form not Defined."), !0;
            var e = $(".subscribe-widget:not(.customjs)");
            if (e.length < 1) return !0;
            e.each(function() {
                var e = $(this),
                    t = e.attr("data-alert-type"),
                    a = e.attr("data-loader"),
                    i = e.find(".widget-subscribe-form-result"),
                    s = e.attr("data-redirect");
                e.find("form").validate({
                    submitHandler: function(e) {
                        if (i.hide(), "button" == a) {
                            var o = $(e).find("button"),
                                n = o.html();
                            o.html('<i class="icon-line-loader icon-spin nomargin"></i>')
                        } else $(e).find(".icon-email2").removeClass("icon-email2").addClass("icon-line-loader icon-spin");
                        $(e).ajaxSubmit({
                            target: i,
                            dataType: "json",
                            resetForm: !0,
                            success: function(r) {
                                if ("button" == a ? o.html(n) : $(e).find(".icon-line-loader").removeClass("icon-line-loader icon-spin").addClass("icon-email2"), "error" != r.alert && s) return window.location.replace(s), !0;
                                if ("inline" == t) {
                                    if ("error" == r.alert) var l = "alert-danger";
                                    else l = "alert-success";
                                    i.addClass("alert " + l).html(r.message).slideDown(400)
                                } else i.attr("data-notify-type", r.alert).attr("data-notify-msg", r.message).html(""), SEMICOLON.widget.notifications(i)
                            }
                        })
                    }
                })
            })
        },
        ticker: function() {
            var e = jQuery(".scw-ticker");
            if (e.length < 1) return !0;
            e.each(function() {
                var e, t, a = $(this),
                    i = a.find(".scw-ticker-item"),
                    s = i.length,
                    o = a.attr("data-speed"),
                    n = a.attr("data-hover"),
                    r = a.attr("data-items"),
                    l = a.attr("data-items-xl"),
                    d = a.attr("data-items-lg"),
                    c = a.attr("data-items-md"),
                    u = a.attr("data-items-sm"),
                    f = a.attr("data-items-xs");
                r || (r = 5), l || (l = Number(r)), d || (d = Number(l)), c || (c = Number(d)), u || (u = Number(c)), f || (f = Number(u)), t = (e = windowWidth / r) * s, a.find(".scw-ticker-wrap").after('<div class="scw-ticker-wrap-clone"></div>');
                var h = a.find(".scw-ticker-wrap,.scw-ticker-wrap-clone");
                i.css({
                    width: e
                }), setTimeout(function() {
                    h.css({
                        width: t
                    }), a.css({
                        width: 2 * t
                    }), i.clone().appendTo(a.find(".scw-ticker-wrap-clone"))
                }, 300), o || (o = 3e4), n = "false" != n;
                var p = t / windowWidth;
                h.css({
                    "animation-duration": Number(o) * p + "ms"
                }), 1 == n && (a.on("mouseover", function() {
                    h.addClass("scw-ticker-paused")
                }), a.on("mouseout", function() {
                    h.removeClass("scw-ticker-paused")
                }))
            })
        },
        stickySidebar: function() {
            if (!$().scwStickySidebar) return console.log("stickySidebar: Sticky Sidebar is not Defined."), !0;
            var e = jQuery(".sticky-sidebar-wrap");
            if (e.length < 1) return !0;
            e.each(function() {
                var e = $(this),
                    t = e.attr("data-offset-top"),
                    a = e.attr("data-offset-bottom");
                t || (t = 110), a || (a = 50), e.scwStickySidebar({
                    additionalMarginTop: Number(t),
                    additionalMarginBottom: Number(a)
                })
            })
        },
        cookieNotify: function() {
            if ("undefined" === Cookies) return console.log("cookieNotify: Cookie Function not defined."), !0;
            if ($cookieNotification.length > 0) {
                var e = $cookieNotification.outerHeight();
                $cookieNotification.css({
                    bottom: -e
                }), "yesConfirmed" != Cookies.get("websiteUsesCookies") && $cookieNotification.css({
                    bottom: 0,
                    opacity: 1
                }), $(".cookie-accept").off("click").on("click", function() {
                    return $cookieNotification.css({
                        bottom: -e,
                        opacity: 0
                    }), Cookies.set("websiteUsesCookies", "yesConfirmed", {
                        expires: 30
                    }), !1
                })
            }
        },
        cartQuantity: function() {
            $(".plus").off("click").on("click", function() {
                var e = $(this).parents(".quantity").find(".qty").val();
                if (/^\d+$/.test(e)) {
                    var t = Number(e) + 1;
                    $(this).parents(".quantity").find(".qty").val(t)
                } else $(this).parents(".quantity").find(".qty").val(1);
                return !1
            }), $(".minus").off("click").on("click", function() {
                var e = $(this).parents(".quantity").find(".qty").val();
                if (/^\d+$/.test(e)) {
                    if (Number(e) > 1) {
                        var t = Number(e) - 1;
                        $(this).parents(".quantity").find(".qty").val(t)
                    }
                } else $(this).parents(".quantity").find(".qty").val(1);
                return !1
            })
        },
        extras: function() {
            $().tooltip ? $('[data-toggle="tooltip"]').tooltip({
                container: "body"
            }) : console.log("extras: Bootstrap Tooltip not defined."), $().popover ? $("[data-toggle=popover]").popover() : console.log("extras: Bootstrap Popover not defined."), $(".style-msg").on("click", ".close", function(e) {
                $(this).parents(".style-msg").slideUp(), e.preventDefault()
            }), $("#primary-menu-trigger,#overlay-menu-close").off("click").on("click", function() {
                return $("#primary-menu").find("ul.mobile-primary-menu").length > 0 ? $("#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu").toggleClass("d-block") : $("#primary-menu > ul, #primary-menu > div > ul").toggleClass("d-block"), $body.toggleClass("primary-menu-open"), !1
            }), $("#page-submenu-trigger").off("click").on("click", function() {
                return $body.toggleClass("top-search-open", !1), $pagemenu.toggleClass("pagemenu-active"), !1
            }), $pagemenu.find("nav").off("click").on("click", function(e) {
                $body.toggleClass("top-search-open", !1), $topCart.toggleClass("top-cart-open", !1)
            }), SEMICOLON.isMobile.any() && $body.addClass("device-touch")
        }
    }, SEMICOLON.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return SEMICOLON.isMobile.Android() || SEMICOLON.isMobile.BlackBerry() || SEMICOLON.isMobile.iOS() || SEMICOLON.isMobile.Opera() || SEMICOLON.isMobile.Windows()
        }
    }, SEMICOLON.documentOnResize = {
        init: function() {
            setTimeout(function() {
                SEMICOLON.header.topsocial(), SEMICOLON.header.fullWidthMenu(), SEMICOLON.header.overlayMenu(), SEMICOLON.initialize.fullScreen(), SEMICOLON.initialize.dataResponsiveHeights(), SEMICOLON.initialize.verticalMiddle(), SEMICOLON.initialize.testimonialsGrid(), SEMICOLON.initialize.stickFooterOnSmall(), SEMICOLON.initialize.stickyFooter(), SEMICOLON.slider.sliderParallaxDimensions(), SEMICOLON.slider.captionPosition(), SEMICOLON.portfolio.arrange(), SEMICOLON.portfolio.portfolioDescMargin(), SEMICOLON.widget.tabsResponsiveResize(), SEMICOLON.widget.tabsJustify(), SEMICOLON.widget.html5Video(), SEMICOLON.widget.masonryThumbs(), SEMICOLON.initialize.dataResponsiveClasses(), $gridContainer.length > 0 && ($gridContainer.hasClass(".customjs") || ($().isotope ? $gridContainer.isotope("layout") : console.log("documentOnResize > init: Isotope not defined."))), ($body.hasClass("device-xl") || $body.hasClass("device-lg")) && $("#primary-menu").find("ul.mobile-primary-menu").removeClass("d-block")
            }, 500);
            windowWidth = $window.width()
        }
    }, SEMICOLON.documentOnReady = {
        init: function() {
            SEMICOLON.initialize.init(), SEMICOLON.header.init(), ($slider.length > 0 || $sliderElement.length > 0) && SEMICOLON.slider.init(), $portfolio.length > 0 && SEMICOLON.portfolio.init(), SEMICOLON.widget.init(), SEMICOLON.documentOnReady.windowscroll()
        },
        windowscroll: function() {
            var e = 0,
                t = 0,
                a = 0;
            $header.length > 0 && (e = $header.offset().top), $header.length > 0 && (t = $headerWrap.offset().top), $pagemenu.length > 0 && (a = $header.length > 0 && !$header.hasClass("no-sticky") ? $header.hasClass("sticky-style-2") || $header.hasClass("sticky-style-3") ? $pagemenu.offset().top - $headerWrap.outerHeight() : $pagemenu.offset().top - $header.outerHeight() : $pagemenu.offset().top);
            var i = $header.attr("data-sticky-offset");
            if (void 0 !== i)
                if ("full" == i) {
                    t = $window.height();
                    var s = $header.attr("data-sticky-offset-negative");
                    void 0 !== s && (t = t - s - 1)
                } else t = Number(i);
            else $header.hasClass("sticky-style-2") || $header.hasClass("sticky-style-3") ? "undefined" === t && (t = e) : t = e;
            SEMICOLON.header.stickyMenu(t), SEMICOLON.header.stickyPageMenu(a), $window.on("scroll", function() {
                SEMICOLON.initialize.goToTopScroll(), $("body.open-header.close-header-on-scroll").removeClass("side-header-open"), SEMICOLON.header.stickyMenu(t), SEMICOLON.header.stickyPageMenu(a), SEMICOLON.header.logo()
            }), window.addEventListener("scroll", onScrollSliderParallax, !1), $onePageMenuEl.length > 0 && ($().scrolled ? $window.scrolled(function() {
                SEMICOLON.header.onepageScroller()
            }) : console.log("windowscroll: Scrolled Function not defined."))
        }
    }, SEMICOLON.documentOnLoad = {
        init: function() {
            SEMICOLON.slider.captionPosition(), SEMICOLON.slider.swiperSliderMenu(!0), SEMICOLON.slider.revolutionSliderMenu(!0), SEMICOLON.initialize.testimonialsGrid(), SEMICOLON.initialize.verticalMiddle(), SEMICOLON.initialize.stickFooterOnSmall(), SEMICOLON.initialize.stickyFooter(), SEMICOLON.portfolio.gridInit($gridContainer), SEMICOLON.portfolio.filterInit(), SEMICOLON.portfolio.shuffleInit(), SEMICOLON.portfolio.arrange(), SEMICOLON.portfolio.portfolioDescMargin(), SEMICOLON.widget.parallax(), SEMICOLON.widget.loadFlexSlider(), SEMICOLON.widget.html5Video(), SEMICOLON.widget.masonryThumbs(), SEMICOLON.widget.ticker(), SEMICOLON.header.topsocial(), SEMICOLON.header.responsiveMenuClass(), SEMICOLON.initialize.modal()
        }
    };
    var $window = $(window),
        $body = $("body"),
        $wrapper = $("#wrapper"),
        $header = $("#header"),
        $headerWrap = $("#header-wrap"),
        $content = $("#content"),
        $footer = $("#footer"),
        windowWidth = $window.width(),
        oldHeaderClasses = $header.attr("class"),
        oldHeaderWrapClasses = $headerWrap.attr("class"),
        stickyMenuClasses = $header.attr("data-sticky-class"),
        responsiveMenuClasses = $header.attr("data-responsive-class"),
        defaultLogo = $("#logo").find(".standard-logo"),
        defaultLogoWidth = defaultLogo.find("img").outerWidth(),
        retinaLogo = $("#logo").find(".retina-logo"),
        defaultLogoImg = defaultLogo.find("img").attr("src"),
        retinaLogoImg = retinaLogo.find("img").attr("src"),
        defaultDarkLogo = defaultLogo.attr("data-dark-logo"),
        retinaDarkLogo = retinaLogo.attr("data-dark-logo"),
        defaultStickyLogo = defaultLogo.attr("data-sticky-logo"),
        retinaStickyLogo = retinaLogo.attr("data-sticky-logo"),
        defaultMobileLogo = defaultLogo.attr("data-mobile-logo"),
        retinaMobileLogo = retinaLogo.attr("data-mobile-logo"),
        $pagemenu = $("#page-menu"),
        $onePageMenuEl = $(".one-page-menu"),
        onePageGlobalOffset = 0,
        $portfolio = $(".portfolio"),
        $shop = $(".shop"),
        $gridContainer = $(".grid-container"),
        $slider = $("#slider"),
        $sliderParallaxEl = $(".slider-parallax"),
        $sliderElement = $(".slider-element"),
        swiperSlider = "",
        $pageTitle = $("#page-title"),
        $portfolioItems = $(".portfolio-ajax").find(".portfolio-item"),
        $portfolioDetails = $("#portfolio-ajax-wrap"),
        $portfolioDetailsContainer = $("#portfolio-ajax-container"),
        $portfolioAjaxLoader = $("#portfolio-ajax-loader"),
        $portfolioFilter = $(".portfolio-filter,.custom-filter"),
        prevPostPortId = "",
        $topSearch = $("#top-search"),
        $topCart = $("#top-cart"),
        $verticalMiddleEl = $(".vertical-middle"),
        $topSocialEl = $("#top-social").find("li"),
        $siStickyEl = $(".si-sticky"),
        $dotsMenuEl = $(".dots-menu"),
        $goToTopEl = $("#gotoTop"),
        $fullScreenEl = $(".full-screen"),
        $testimonialsGridEl = $(".testimonials-grid"),
        $pageSectionEl = $(".page-section"),
        $owlCarouselEl = $(".owl-carousel"),
        $parallaxEl = $(".parallax"),
        $parallaxPageTitleEl = $(".page-title-parallax"),
        $parallaxPortfolioEl = $(".portfolio-parallax").find(".portfolio-image"),
        $textRotaterEl = $(".text-rotater"),
        $cookieNotification = $("#cookie-notification");
    $(document).ready(SEMICOLON.documentOnReady.init), $window.on("load", SEMICOLON.documentOnLoad.init), $window.on("resize", SEMICOLON.documentOnResize.init)
}(jQuery),
function(e, t, a, i, s, n, o) {
    e.GoogleAnalyticsObject = s, e.ga = e.ga || function() {
        (e.ga.q = e.ga.q || []).push(arguments)
    }, e.ga.l = 1 * new Date, n = t.createElement("script"), o = t.getElementsByTagName("script")[0], n.async = 1, n.src = "//www.google-analytics.com/analytics.js", o.parentNode.insertBefore(n, o)
}(window, document, 0, 0, "ga"), ga("create", "U-12", "auto"), ga("send", "pageview"), jQuery(document).ready(function() {
    jQuery(".disable-pagetransition").on("click", function() {
        return jQuery("body").addClass("no-transition"), jQuery(".page-transition-wrap").fadeOut(400, function() {
            jQuery(this).remove()
        }), !1
    })
});
jQuery(document).one("ajaxComplete", function() {
    jQuery(".preloader-demo").on("click", function(s) {
        var i = jQuery(this),
            d = jQuery(".preloader-demo"),
            v = i.attr("data-loader");
        d.prop("disabled", !0), "1" == v ? css3Loader = '<div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div>' : "2" == v ? css3Loader = '<div class="css3-spinner-flipper"></div>' : "3" == v ? css3Loader = '<div class="css3-spinner-double-bounce1"></div><div class="css3-spinner-double-bounce2"></div>' : "4" == v ? css3Loader = '<div class="css3-spinner-rect1"></div><div class="css3-spinner-rect2"></div><div class="css3-spinner-rect3"></div><div class="css3-spinner-rect4"></div><div class="css3-spinner-rect5"></div>' : "5" == v ? css3Loader = '<div class="css3-spinner-cube1"></div><div class="css3-spinner-cube2"></div>' : "6" == v ? css3Loader = '<div class="css3-spinner-scaler"></div>' : "7" == v ? css3Loader = '<div class="css3-spinner-grid-pulse"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>' : "8" == v ? css3Loader = '<div class="css3-spinner-clip-rotate"><div></div></div>' : "9" == v ? css3Loader = '<div class="css3-spinner-ball-rotate"><div></div><div></div><div></div></div>' : "10" == v ? css3Loader = '<div class="css3-spinner-zig-zag"><div></div><div></div></div>' : "11" == v ? css3Loader = '<div class="css3-spinner-triangle-path"><div></div><div></div><div></div></div>' : "12" == v ? css3Loader = '<div class="css3-spinner-ball-scale-multiple"><div></div><div></div><div></div></div>' : "13" == v ? css3Loader = '<div class="css3-spinner-ball-pulse-sync"><div></div><div></div><div></div></div>' : "14" == v && (css3Loader = '<div class="css3-spinner-scale-ripple"><div></div><div></div><div></div></div>'), jQuery("body").append('<div class="page-transition-wrap"><div class="css3-spinner"></div></div>'), jQuery(".css3-spinner").html(css3Loader), setTimeout(function() {
            jQuery(".page-transition-wrap").fadeOut("400", function() {
                jQuery(this).remove(), d.prop("disabled", !1)
            })
        }, 2e3), s.preventDefault()
    })
});