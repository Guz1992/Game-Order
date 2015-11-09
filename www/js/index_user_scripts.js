/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  Button */
    
    
        /* button  Criar Jogo */
    $(document).on("click", ".uib_w_3", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_page_1_game"); 
    });
    
        /* button  #back-home */
    $(document).on("click", "#back-home", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_46_75"); 
    });
    
        /* button  .uib_w_20 */
    $(document).on("click", ".uib_w_20", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_46_75"); 
    });
    
        /* button  #criar-jogo */
    $(document).on("click", "#criar-jogo", function(evt)
    {
         /*global activate_page */
         activate_page("#uib_page_game_start"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
