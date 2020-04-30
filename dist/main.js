'use strict';

jQuery.fn.extend({
    sentance: function ()
    {
        return this.each(function ()
        {
            if ($(this).tagName() == "input")
            {
                var v = $(this).val();

                if (v.length > 0)
                {
                    $(this).val(v.charAt(0).toUpperCase() + v.slice(1));
                }
            }
            else
            {
                var v = $(this).html();

                if (v.length > 0)
                {
                    $(this).html(v.charAt(0).toUpperCase() + v.slice(1));
                }
            }
        });
    },
    tagName: function ()
    {
        return this.prop("tagName").toLowerCase();
    },
    chkSelectAll: function ()
    {
        return this.each(function()
        {
            if ($(this).hasClass("chkSelectAll-applied"))
            {
                return true;
            }
            
            $(this).addClass("chkSelectAll-applied");
            
            var _this = $(this);
            var target = $(this).attr("data-href");
            
            $(this).change(function ()
            {
                $(target).prop("checked", this.checked);
               
                if ($(target).hasClass("chkSelectAll-applied"))
                {
                    $(target).trigger("change");
                }
            });
            
            $(target).change(function ()
            {
                var t_c = $(target).length;                
                var c_c = $(target).filter(":checked").length;
                var checked = t_c == c_c;
                _this.prop("checked", checked);
                
                
            });
            
            var checked = $(target).length == $(target).filter(":checked").length;
            _this.prop("checked", checked);
        });
    },
    cssToggler : function()
    {
        return this.each(function()
        {
            if ($(this).hasClass("cssToggler-applied"))
            {
                return true;
            }
            
            $(this).addClass("cssToggler-applied");
            
            $(this).click(function()
            {
                var obj = $($(this).data("toggler-target"));
                var css = $(this).data("toggler-class");
                obj.toggleClass(css);
            });
        });
    },
    checkboxCssToggler : function()
    {
        return this.each(function()
        {
            if ($(this).hasClass("checkboxCssToggler-applied"))
            {
                return true;
            }
            
            $(this).addClass("checkboxCssToggler-applied");
            
            $(this).change(function()
            {
                var obj = $($(this).data("toggler-target"));
                var css = $(this).data("toggler-class");
                if (this.checked)
                {
                    obj.addClass(css);
                }
                else
                {
                    obj.removeClass(css);
                }
            });
            
            $(this).trigger("change");
        });
    },
    copyText : function()
    {
        return this.each(function()
        {
            if ($(this).hasClass("copy-applied"))
            {
                return true;
            }
            
            $(this).addClass("copy-applied");
            
            $(this).click(function()
            {                
                var obj = $($(this).data("copy-target"));
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val($(obj).text().trim()).select();
                document.execCommand("copy");
                $temp.remove();
            });
        });
    },
    copyValue : function()
    {
        return this.each(function()
        {
            if ($(this).hasClass("copy-applied"))
            {
                return true;
            }
            
            $(this).addClass("copy-applied");
            
            $(this).click(function()
            {                
                var obj = $($(this).data("copy-target"));
                $(obj).select();
                document.execCommand("copy");
            });
        });
    },
    ajaxLoader : function()
    {
        return this.each(function()
        {
            if ($(this).hasClass("ajaxLoader-applied"))
            {
                return true;
            }
            
            $(this).addClass("ajaxLoader-applied");
            
            $(this).click(function()
            {
                var obj = $($(this).data("loader-target"));
                
                if ($(obj).hasClass("ajaxLoader-load"))
                {
                    return;
                }
                
                var href = $(this).data("loader-href");
                
                if (!href)
                {
                    console.error("href or data-href not found");
                    return;
                }
                
                $(obj).load(href, function()
                {
                    $(obj).addClass("ajaxLoader-load");
                    $(obj).find("script").each(function()
                    {
                        //eval($(this).html());
                    });
                });
                
            });
            
            var autoload = $(this).data("loader-autoload");
            
            if (autoload == "1")
            {
                $(this).trigger("click", {trigger : 1});
            }
        });
    },
    ajaxifyLink : function(callback)
    {
        return this.each(function()
        {
            if ($(this).hasClass("ajaxifyLink-applied"))
            {
                return true;
            }
            
            $(this).addClass("ajaxifyLink-applied");
            
            $(this).click(function(e)
            {
                var href = $(this).attr("href");
                
                $.get(href, function(response)
                {
                    try
                    {
                        response = JSON.parse(response);
                    }
                    catch(e)
                    {
                        bootbox.alert(response);
                        return;
                    }

                    if (typeof callback == "function")
                    {
                        callback(response);
                    }
                    else
                    {
                        bootbox.alert(response["msg"]);
                    }
                });
                
                return false;
            });
        });
    },
    moreText : function()
    {
        return this.each(function()
        {
            if ($(this).hasClass("moreText-applied"))
            {
                return true;
            }
            
            $(this).addClass("moreText-applied");
            
            var charlen = $(this).data("more-text-char-len");
            
            var content = $(this).html();
            
            if(content.length > charlen) 
            {
                var c = content.substr(0, charlen);

                var html = '<span class="less-text-block">' + c + '<br/><a class="more-text-opener">...More</a></span>';
                html += "<span class='more-text-block hidden'>" + content + "<br/><a class='less-text-opener'>..Less</a></span>";

                $(this).html(html);
                
                $(this).find(".more-text-opener").click(function()
                {
                    $(this).parent().parent().find(".more-text-block").removeClass("hidden");
                    $(this).parent().addClass("hidden");
                });

                $(this).find(".less-text-opener").click(function()
                {
                    $(this).parent().parent().find(".less-text-block").removeClass("hidden");
                    $(this).parent().addClass("hidden");
                });
            }
        });        
    },    
    invalidURLChar : function()
    {
        var invalid_char = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "+", "=", "{", "}", "[", "]", ":", ";", '"', "'", "<", ">", ",", ".", "?", "/", "\\", "|"];
        
        return this.each(function()
        {
            if ($(this).hasClass("invalidURLChar-applied"))
            {
                return true;
            }
            
            $(this).addClass("invalidURLChar-applied");
            
            $(this).keydown(function(event)
            {
                var $span = $(this).parent().find(".invalidURLChar-error-message");
                
                if ($span.length == 0)
                {
                    $(this).parent().append('<span class="invalidURLChar-error-message error-message">&#9679 Invalid Character</span>');
                    $span = $(this).parent().find(".invalidURLChar-error-message");
                }
                
                if (invalid_char.indexOf(event.key) >= 0)
                {
                    $span.show();
                    return false;
                }
                else 
                {
                    $span.hide();
                }
                
                return true;
            });            
        }); 
    },
    invalidSqlChar : function()
    {
        var invalid_char = ["`", "~", "!", "#", "$", "%", "&", "=", ":", ";", '"', "'", "<", ">", "\\", "|", ","];
        
        return this.each(function()
        {
            if ($(this).hasClass("invalidSqlChar-applied"))
            {
                return true;
            }
            
            $(this).addClass("invalidSqlChar-applied");
            
            $(this).keydown(function(event)
            {
                var $span = $(this).parent().find(".invalidSqlChar-error-message");
                
                if ($span.length == 0)
                {
                    $(this).parent().append('<span class="invalidSqlChar-error-message error-message">&#9679 Invalid Character</span>');
                    $span = $(this).parent().find(".invalidSqlChar-error-message");
                }
                
                if (invalid_char.indexOf(event.key) >= 0)
                {
                    $span.show();
                    return false;
                }
                else 
                {
                    $span.hide();
                }
                
                return true;
            });            
        });
    },
    charLimitRequired : function()
    {
        return this.each(function()
        {
            if ($(this).hasClass("charLimitRequired-applied"))
            {
                return true;
            }
            
            if ( !$(this).data("char-required") )
            {
                console.error("charLimitRequired char required not set");
                return;
            }
            
            if ( !$(this).data("char-limit") )
            {
                console.error("charLimitRequired char limit not set");
                return;
            }
            
            $(this).addClass("charLimitRequired-applied");
            
            var require = parseInt($(this).attr("data-char-required"));
            var limit = parseInt($(this).attr("data-char-limit"));
            
            $(this).parent().append('<span class="charLimitRequired-info help-block"></span>');
            var span_info = $(this).parent().find(".charLimitRequired-info");
            
            $(this).parent().append('<span class="charLimitRequired-error-message error-message"></span>');
            var span_error = $(this).parent().find(".charLimitRequired-error-message");
                
            $(this).keydown(function(event)
            {
                var len = $(this).val().length;
                if ( len > limit)
                {
                    span_error.html("Max Limit is " + limit);
                    span_error.show();
                    return false;
                }
                else 
                {
                    console.log(len);
                    span_info.html("Min. : " + require + ", Max. : " + limit + ", Characters : " + len);
                    span_error.hide();
                }
                
                return true;
            });    
            
            $(this).blur(function(event)
            {
                if ( $(this).val().length < require)
                {
                    span_error.html("Minimum character should be " + require);
                    span_error.show();
                    return false;
                }
                else 
                {
                    span_error.hide();
                }
            });
        });
    },
    toggleTinyField : function()
    {
        return this.each(function()
        {
            if ($(this).hasClass("toggleTinyField-applied"))
            {
                return true;
            }
            
            $(this).addClass("toggleTinyField-applied");
            
            $(this).click(function()
            {
                var _this = $(this);
                var href = $(this).attr("href");
                var field = $(this).attr("data-field");
                var value = $(this).attr("data-value");
                
                if (!href)
                {
                    console.error("href not found");
                    return;
                }
                
                if (!field)
                {
                    console.error("data-field not found");
                    return;
                }
                
                if (!value)
                {
                    console.error("data-value not found");
                    return;
                }

                var request = {};
                request[field] = value;

                $.post(href, request, function(data)
                {
                    try
                    {
                        data = JSON.parse(data);
                    }
                    catch(e)
                    {
                        bootbox.alert(data);
                        return;
                    }

                    if (data["status"] == "1")
                    {
                        _this.attr("data-value", data[field]);
                        if (data[field] == "1")
                        {
                            _this.html('<i class="fa fa-check-circle-o font-green-meadow icon"></i>');
                        }
                        else
                        {
                            _this.html('<i class="fa fa-times-circle-o font-red-sunglo icon"></i>')
                        }
                    }
                    else
                    {
                        var msg = typeof data["msg"] != "undefined" ? data["msg"] : "Could not change status";
                        bootbox.alert(msg);
                    }
                });

                return false;
            });         
        });
    },
});