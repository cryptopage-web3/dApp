(function(){var a=(window.jQueryPlugin=function(c,b){return function(d){if(this.length>1){this.each(function(){var e=$(this);if(!e.data(c)){e.data(c,b(e,d))}});return this}else{if(this.length===1){if(!this.data(c)){this.data(c,b(this,d))}return this.data(c)}}}})})();(function(){function a(F){var p=F;var f=F.first(".video");var P=F.find("[data-video]");var h=F.find(".video-preview");var G=F.find(".video-top");var v=F.find(".video-start-btn");var D=F.find(".video-control-btn");var u=F.find(".video-control-play");var e=F.find(".video-control-pause");var L=F.find(".video-voice");var H=F.find(".video-voice-btn");var K=F.find(".video-voice-on");var N=F.find(".video-voice-off");var b=F.find(".full-screen-btn");var R=F.find(".full-screen-open");var C=F.find(".full-screen-exit");var j=F.find(".video-voice-slider-range");var g=F.find(".video-voice-slider-rail");var w=F.find(".video-voice-slider-buffer");var o=F.find(".video-slider-container");var k=F.find(".video-slider-rail");var l=F.find(".video-slider-buffer");var E=F.find(".video-count-time");var z=F.find(".video-count-fulltime");var A=F.find(".video-loading");var M=F.find(".video-reset");var m=F.find(".video-reset-btn");var i=F.find(".video-contextMenu");var c=$(P).get(0);function x(){c.play();u.hide();e.show()}function d(){c.pause();e.hide();u.show()}function O(){if(c.readyState===4){A.hide();x()}else{A.show();d()}}function J(){c.muted=true;$(K).hide();$(N).show()}function y(){c.muted=false;$(K).show();$(N).hide()}function q(S){if(S.requestFullscreen){S.requestFullscreen()}else{if(S.mozRequestFullScreen){S.mozRequestFullScreen()}else{if(S.webkitRequestFullscreen){S.webkitRequestFullscreen()}else{if(S.msRequestFullscreen){S.msRequestFullscreen()}}}}R.hide();C.show()}function t(){if(document.exitFullscreen){document.exitFullscreen()}else{if(document.mozCancelFullScreen){document.mozCancelFullScreen()}else{if(document.webkitExitFullscreen){document.webkitExitFullscreen()}else{if(document.msExitFullscreen){document.msExitFullscreen()}}}}R.show();C.hide()}function s(){var S=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||null;if(S===null){return false}else{return true}}function n(){var S=(c.currentTime/c.duration)*100;k.css({width:S+"%"});l.css({left:S-1+"%"});E.text(B());z.text(Q())}function I(){var U=event.pageX-o.offset().left,V=o.outerWidth();var T=Math.round((U/V)*c.duration);var S=Math.floor(T/60);if(S>0){T-=S*60}if(T.toString().length===1){T="0"+T}if(S.toString().length===1){S="0"+S}return S+":"+T}function r(){var S=event.pageX-o.offset().left,T=o.outerWidth();c.currentTime=(S/T)*c.duration;n()}function Q(){var T=Math.round(c.duration);var S=Math.floor(T/60);if(S>0){T-=S*60}if(T.toString().length===1){T="0"+T}if(S.toString().length===1){S="0"+S}return S+":"+T}function B(){var T=Math.round(c.currentTime);var S=Math.floor(T/60);if(S>0){T-=S*60}if(T.toString().length===1){T="0"+T}if(S.toString().length===1){S="0"+S}return S+":"+T}v.click(function(){$(h).hide();x()});$(c).on("progress",function(){O()});D.click(function(){if(c.paused){x()}else{d()}return false});G.click(function(){if(c.paused){x()}else{d()}return false});H.click(function(){if(c.muted===false){J()}else{y()}});b.click(function(){if(s()){t()}else{q(f[0])}});G.dblclick(function(){if(s()){t()}else{q(f[0])}});j.on("input change",function(){var S=(localStorage[this.id]=$(this).val());w.css("width",S*100+"%");c.volume=S;j.attr("value",S);if(S==0){J()}else{y()}});j.each(function(){if(typeof localStorage[this.id]!=="undefined"){$(this).val(localStorage[this.id])}});j.keyup(function(){var S=(localStorage[this.id]=$(this).val());w.css("width",S*100+"%");c.volume=S;j.attr("value",S);if(S==0){J()}else{y()}}).keyup();o.click(function(){r()});n();z.text(Q());$(c).on("timeupdate",function(){n()});$(l).on("input change",function(){n()});$(l).on("mousemove",function(){n()});$(l).on("mouseup",function(){n()});L.hover(function(){o.hide()},function(){o.show()});$(c).on("ended",function(){M.css("display","flex")});m.click(function(){x();M.css("display","none")});$(f).on("contextmenu",function(S){S.preventDefault();i.show().css({top:S.pageY,left:S.pageX})});$(window).click(function(){i.fadeOut("fast")})}$.fn.twitterVideoPlayer=jQueryPlugin("twitterVideoPlayer",a)})();$(".video").twitterVideoPlayer();