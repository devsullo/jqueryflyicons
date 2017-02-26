(function ($) {

	//default options
	var defaults = {
		durationInt : [4,5],
		animAreaHeightInt: [0,130],
		animAreaWidth: 0,
		translateYInt : [-40,70]
	};

	var iconCount = 0;
	var timeOut;

	/**
	 * Detect Vendor Prefix
	 */
	var Vprefix = (function () {
	  var styles = window.getComputedStyle(document.documentElement, ''),
	    pre = (Array.prototype.slice
	      .call(styles)
	      .join('') 
	      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	    )[1],
	    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	  return {
	    dom: dom,
	    lowercase: pre,
	    css: '-' + pre + '-',
	    js: pre[0].toUpperCase() + pre.substr(1)
	  };
	})();

	var methods = {

		/**
		 * Main method to fly icons
		 */
	   	letsFly : function(options) {

	   		_settings = $.extend( true, {}, defaults, options );
	   		var targetArea = $(this);
	   		targetArea.css('position', 'relative');


	   		var animationProp = {
	   			'duration' : methods.randomNumFromInterval(_settings.durationInt),
	   			'translateY' : methods.randomNumFromInterval(_settings.translateYInt),
	   			'translateX' : (_settings.animAreaWidth > 0) ? _settings.animAreaWidth : $(targetArea).width()+60
	   		};

	   		/**
	   		 * Create animation css
	   		 */
	   		var animationCss = ''+

	   		'.flyIcon_'+iconCount+'zm {'+
	   		 	Vprefix.css + 'animation'+': flyIcon_'+iconCount+'zm;'+
	   		 	'animation:flyIcon_'+iconCount+'zm;'+
	   			'animation-duration: '+animationProp.duration+'s;'+
	   			'animation-iteration-count:1;'+
	   		'}'+

	   		'.flyIcon_'+iconCount+'zn {'+
				Vprefix.css + 'animation'+': flyIcon_'+iconCount+'zn;'+
				'animation:flyIcon_'+iconCount+'zn;'+
	   		  	'animation-timing-function: cubic-bezier(0.5, 0, 1, 1);'+
	   		  	'animation-duration: '+animationProp.duration+'s;'+
	   		  	'animation-iteration-count:1;'+
	   		'}'+

	   		'.flyIcon_'+iconCount+'zo {'+
	   			Vprefix.css + 'animation'+': flyIcon_'+iconCount+'zo;'+
	   			'animation:flyIcon_'+iconCount+'zo;'+
	   		  	'animation-timing-function: linear;'+
	   		  	'animation-duration: '+animationProp.duration+'s;'+
	   		  	'animation-iteration-count:1;'+
	   		'}'+

	   		'@'+Vprefix.css+'keyframes ' + 'flyIcon_'+iconCount+'zm {'+
	   		  '0%{animation-timing-function: ease-in-out; transform: translateY(0px);}'+
	   		  '50%{animation-timing-function: ease-in-out; transform: translateY('+animationProp.translateY+'px);}'+
	   		  '100%{transform: translateY(0px);}'+
	   		'}'+

	   		'@'+Vprefix.css+'keyframes ' + 'flyIcon_'+iconCount+'zn {'+
	   		  '0% {transform: translateX(0px);}'+
	   		  '100% {transform: translateX(-'+animationProp.translateX+'px);}'+
	   		'}'+
	   		
	   		'@'+Vprefix.css+'keyframes ' + 'flyIcon_'+iconCount+'zo {'+
	   		  '0%{transform: scale(0.375);}'+
	   		  '80%{transform: scale(0.375);}'+
	   		  '100%{transform: scale(0.1);}'+
	   		'}'+

	   		'';

	   		/**
	   		 * Create icon html
	   		 */
	   		var flyIconHtml = $(
		   		'<div class="flyIcon flyIcon_'+iconCount+'zm" style="right: 0px; bottom: '+methods.randomNumFromInterval(_settings.animAreaHeightInt)+'px;">'+
					'<div class="flyIcon flyIcon_'+iconCount+'zn">'+
						'<div class="flyIcon flyIcon_bc flyIcon_'+iconCount+'zo" style="background-image: url('+_settings.iconSrc+')"></div>'+
					'</div>'+
				'</div>'
	   		);


	   		//Appends
	   		var styleElement = $('<style type="text/css">').appendTo('head');
	   		styleElement.text(animationCss);
	   		$(targetArea).append(flyIconHtml);

	   		//increase inconCound
	   		iconCount++;

	   		/**
	   		 * Delete complated animation markup
	   		 * and style tag
	   		 */
	   		timeOut = setTimeout(function(){
	   			$(flyIconHtml).remove();
	   			styleElement.remove();
	   		},animationProp.duration * 1000);


	   	},

	   	/**
	   	 * Take random number from interval
	   	 */
	   	randomNumFromInterval: function (arr) {
	   	    return (Math.random() * (arr[1] - arr[0]) + arr[0]).toFixed(5);
	   	}
	};

	$.fn.flyIcons = function(methodOrOptions) {
	    if ( methods[methodOrOptions] ) {
	        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
	        return methods.letsFly.apply( this, arguments );
	    } else {
	        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.flyIcons' );
	    }    
	};


}( jQuery ));