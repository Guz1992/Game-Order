/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #create-game */
    $(document).on("click", "#create-game", function(evt)
    {
         /*global activate_page */
         activate_page("#uib_page_game"); 
    });
    
        /* button  #back-home */
    $(document).on("click", "#back-home", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
    });
    
        /* button  #back-home */
    $(document).on("click", "#back-home", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
    });
    
    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();
