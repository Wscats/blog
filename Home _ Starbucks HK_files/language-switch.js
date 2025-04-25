define(
    [
        "jquery",
        "mage/translate"
    ],
    function ($, $t) {
        'use strict';
        return function languageSwitch(config) {
            let a = 0;
            // const mediaWidth = $(document).width();
            const myBody = $(document.body);
            let languageName = ''
            if ($(window).width() < 1024) {
                languageName = $('.mx-language-code')?.eq(0)?.text();

            }

            function ulShow(select, languageUl) {
                languageUl.css('display', 'block');
                let onMouse = false;
                a = 1;
                if ($(window).width() < 1024) {
                    select.find('.mx-language-code')?.eq(0)?.text(`${$t('Language')}`);
                    select.parent('div').parent('div').parent('div').siblings().css('display', 'none');
                    select.addClass("ui-state-active");
                } else {
                    languageUl.mouseleave(function () {
                        ulHidden(select, languageUl)
                    }).on('mouseenter', function () {
                        onMouse = true;
                    });
                    myBody.mousedown(function (e) {
                        !onMouse && (languageUl.css('display') === 'block' && e.target.className !== 'mx-language-cutOver' && e.target.className !== 'mx-language-code') &&
                        ulHidden(select, languageUl)
                    })
                }
            }

            function ulHidden(select, languageUl) {
                if ($(window).width() < 1024) {
                    select.find('.mx-language-code')?.eq(0)?.text(languageName);
                    select.parent('div').parent('div').parent('div').siblings().css('display', 'block');
                    select.removeClass("ui-state-active");
                }
                languageUl.css('display', 'none');
                a = 0;
                languageUl.off('mouseleave');
                myBody.off('mousedown');

            }

            $('.mx-language-cutOver').off('click').on("click", function (e) {
                a++;
                const myUl = $(this).parent('div').siblings('ul');
                a % 2 === 0 ? ulHidden($(this), myUl) : ulShow($(this), myUl);
                e.stopPropagation();
            })


        }
    })
