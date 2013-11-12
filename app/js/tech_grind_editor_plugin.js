techgrind = {};
/**
 * @namespace techgrind.richEditor
 * @version 0.7
 * @desc Responsible Rich Text editors
 */
techgrind.richEditor = (function() {"use strict";
	var isOpen = false;
	var GLOBAL_DIV_ID = 'composeGlobalDiv';
	function init() {
		if(!isOpen){
			isOpen = true;
		
			console.log('conpose activated');
			var $body = $('body');
			var $div = $('<div>',{
				'id' : GLOBAL_DIV_ID,
				'class' : 'fiftyPercent fixed fixed-bottom tray newpostform editor-form js_newpostform'
			});
			$body.append($div);
			$div.load('partials/richEditor.html', function() {
				console.log('Compose loaded....');
				activateCancel();
				activateTinyMce();
		});
		}
	}
	
	function activateCancel(){
		console.log('Cancel loaded....');
		$('#'+GLOBAL_DIV_ID).find('#cancelRichEditor').click(function(){
			close();
		});
	}
	

	function activateTinyMce(){
		console.log('Activate TinyMce loaded....');
		//var leftOver = $('#composeGlobalDiv').find('.row-fluid.newpostform').height();
		tinymce.init({
			selector : "#inputForRichText",
			//theme : 'advanced',
			//plugins : 'autoresize',
			width: '100%',
			height: 250,
			//autoresize_min_height: 400,
			//autoresize_max_height: 800,
			browser_spellcheck : true,
			statusbar : false,
			menubar : false,
			plugins: "paste",
			paste_as_text: true,
			//entity_encoding : "raw",
			charLimit : 100000, // this is a default value which can get modified later
			setup: function(editor) {
				editor.on('change', function() {
					//define local variables
					var tinymax, tinylen;
					//setting our max character limit
					tinymax = this.settings.charLimit;
					//grabbing the length of the curent editors content
					tinylen = this.getContent({"format":"raw"}).length;
					koSpacesDetail.leftCharacters(tinymax - tinylen+' characters left');
					if (tinylen > tinymax) {
						console.log('Html lo long : size: ' + tinylen);
					}
				});
			}
		});

	}

	/////////////////////////
	// Put Misc here
	/////////////////////////
	function close() {
		var $body = $('body');
		$body.find('#composeGlobalDiv').remove();
		isOpen = false;
	}

	//Public properties here
	return {
		init : init
	};
}());
// $(function() { "use strict";
	// $(document).ready(techgrind.richEditor.init);
// });