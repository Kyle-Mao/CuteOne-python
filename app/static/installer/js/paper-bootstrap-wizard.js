/*!

 =========================================================
 * Paper Bootstrap Wizard - v1.0.2
 =========================================================

 * Product Page: https://www.creative-tim.com/product/paper-bootstrap-wizard
 * Copyright 2017 Creative Tim (#)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-bootstrap-wizard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Paper Bootstrap Wizard Functions


$(document).ready(function(){

    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function(tab, navigation, index) {
            if(index == 1){
                if(!$('#mysql_ip').valid()) {
                    return false;
                }
                if(!$('#mysql_port').valid()) {
                    return false;
                }
                if(!$('#mysql_user').valid()) {
                    return false;
                }
                if(!$('#mysql_psw').valid()) {
                    return false;
                }
            }else if(index == 2){
                if(!$('#mongo_ip').valid()) {
                    return false;
                }
                if(!$('#mongo_port').valid()) {
                    return false;
                }
            }else{
                if(!$('#admin_user').validate()) {
                    return false;
                }
                if(!$('#admin_psw').validate()) {
                    return false;
                }
            }
        },

        onInit : function(tab, navigation, index){

          //check number of tabs and fill the entire row
          var $total = navigation.find('li').length;
          $width = 100/$total;

          navigation.find('li').css('width',$width + '%');

        },

        onTabClick : function(tab, navigation, index){

            var $valid = $('.wizard-card form').valid();

            if(!$valid){
                return false;
            } else{
                return true;
            }

        },

        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if($current >= 3) {
                $($wizard).find('.btn-next').val("????????????")
            } else {
                $($wizard).find('.btn-next').val("?????????")
            }
            if($current == 4){
                var infoText = $("#install-info");
                $.ajax({
                    url: "/install/index",
                    type: "POST",
                    dataType: "json",
                    data: $('#form1').serialize(),
                    success: function(data) {
                        if(data.code == "0"){
                            var count = 10;
                            timer = null
                            timer = setInterval(function () {
                                if (count > 0) {
                            ????????????  count = count - 1;
                            ????????????  infoText.html("?????????????????????????????????????????? " + count + "??????");
                            ????????}else {
                                    infoText.html("???????????????????????????????????? <a href='/admin' style='background: #2CA8FF;color: white;padding: 5px 10px;border-radius: 20px;font-size: 16px;'>????????????</a>");
                                    clearInterval(timer);
                            ????????}
                            }, 1000);
                        }else{
                            infoText.html(data.msg);
                        }
                    }
                })
            }

            //update progress
            var move_distance = 100 / $total;
            move_distance = move_distance * (index) + move_distance / 2;

            $wizard.find($('.progress-bar')).css({width: move_distance + '%'});
            //e.relatedTarget // previous tab

            $wizard.find($('.wizard-card .nav-pills li.active a .icon-circle')).addClass('checked');

        }
    });


});

