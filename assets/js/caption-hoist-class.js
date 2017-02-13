/* global _, tinymce */


var wpImageFilter = function(className) {
  return className && !className.match(/^wp-image/);
};

var wpImgSizeFilter = function(className) {
  return className && !className.match(/^size-/);
};


// TODO: Appears to be unnecessary, but this was a lot of work, so keeping it
// around for a little bit to be sure it's not needed.
//
// var hoistClass = function(content) {
//   var shortcodeRegex = /(?:<p>)?\[(?:wp_)?caption([^\]]+)\]([\s\S]+?)\[\/(?:wp_)?caption\](?:<\/p>)?/g;
//   var out = content.replace(shortcodeRegex, function( shortcode, attrs, contents ) {

//     var imgClasses, newAttrs;
//     var classRegex = /class=['"]([^'"]*)['"]/;
//     var img = contents.match(/<img [^>]+>/);

//     if (img) {
//       imgClasses = img[0].match(classRegex);
//       imgClasses = (imgClasses) ? imgClasses[1].split(' ') : [];
//       imgClasses = imgClasses.filter(wpImageFilter);
//     }

//     var captionClasses = attrs.match(classRegex);

//     if (captionClasses) {
//       newAttrs = attrs.replace(classRegex, function(classAttr, classes) {
//         var captionClasses = classes.split(' ').filter(wpImgSizeFilter);
//         captionClasses = _.union(captionClasses, imgClasses);
//         return 'class="' + captionClasses.join(' ') + '"';
//       });
//     } else {
//       newAttrs = newAttrs + ' class="' + imgClasses.join(' ') + '"';
//     }

//     return '[caption ' + newAttrs + ']' + contents + '[/caption]';
//   });
//   return out;
// };



tinymce.create('tinymce.plugins.captionHoistClass', {
  init: function(editor, url) {

    editor.on( 'ObjectSelected', function( event ) {

      var imgClasses = tinymce.DOM.getAttrib(event.target, 'class').split(' ').filter(wpImageFilter);
      // console.log(imgClasses);

      var caption = editor.dom.getParent(event.target, '.wp-caption');
      var captionClasses = tinymce.DOM.getAttrib(caption, 'class').split(' ').filter(wpImgSizeFilter);
      // console.log(captionClasses);

      captionClasses = _.union(captionClasses, imgClasses).join(' ');
      // console.log(captionClasses);

      tinymce.DOM.setAttrib(caption, 'class', captionClasses);
    });


    // editor.on('PostProcess', function(event) {
    //   if ( event.get ) {
    //     event.content = hoistClass(event.content);
    //   }
    // });

  }
});

tinymce.PluginManager.add('caption_hoist_class', tinymce.plugins.captionHoistClass);
