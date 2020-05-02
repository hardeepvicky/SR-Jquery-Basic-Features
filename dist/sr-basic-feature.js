'use strict';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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
            } else
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
    applyOnce: function (feature)
    {
        if ($(this).hasClass(feature + "-applied"))
        {
            return false;
        }

        $(this).addClass(feature + "-applied");
        return true;
    },
    hasEvent : function(find_e)
    {
        var events = $._data( $(this)[0], "events");        
        for(var e in events)
        {
            if (find_e == e)
            {
                return true;
            }
        }
        
        return false;
    },    
    getBoolFromData : function(name, default_value)
    {
        var _is = $(this).data(name);
            
        if (_is)
        {
            _is = _is.toLowerCase().trim();

            if (_is == "true" || _is == "1")
            {
                _is = true;
            }
            else
            {
                _is = false;
            }
        }
        else
        {
            _is = default_value;
        }
        
        return _is;
    },
    chkSelectAll: function ()
    {
        var feature = "sr-chkselect";
        
        var events = {
            childCheck: feature + ".childcheck",
            parentCheck: feature + ".parentcheck",
        };
        
        return this.each(function ()
        {
            var _this = $(this);
            
            var target = $(this).data(feature + "-children");

            if (!target)
            {
                console.error("data-" + feature + "-children is not defined in html");
                return;
            }

            if (_this.applyOnce(feature))
            {
                _this.on(events.childCheck, function ()
                {
                    $(target).prop("checked", _this.prop("checked"));
                    
                    $(target).each(function()
                    {
                        if ( $(this).hasEvent(events.childCheck))
                        {
                            $(this).trigger(events.childCheck);
                        }
                    });
                });

                $(target).on(events.parentCheck, function ()
                {
                    var t_c = $(target).length;
                    var c_c = $(target).filter(":checked").length;
                    var checked = t_c == c_c;
                    _this.prop("checked", checked);

                    if (_this.hasEvent(events.parentCheck))
                    {
                        _this.trigger(events.parentCheck);
                    }
                });

                _this.change(function ()
                {
                    $(this).trigger(events.childCheck);
                });

                $(target).change(function ()
                {
                    $(this).trigger(events.parentCheck);
                });
            }

            $(target).first().trigger(events.parentCheck);
        });
    },
    cssClassToggle: function ()
    {
        var feature = "sr-css-class-toggle";
        
        var events = {
            toggleClass : feature + ".toggle",
        };
        
        return this.each(function ()
        {
            var target = $(this).data(feature + "-target");
            if (!target)
            {
                console.error("data-" + feature + "-target is not defined in html");
                return;
            }

            var tag = $(this).tagName();
                
            if (tag == "select")
            {
                $(this).on(events.toggleClass, function()
                {
                    var prev_class_name = $(this).data(feature + "-prev-class");
                    
                    if (prev_class_name)
                    {
                        $(target).removeClass(prev_class_name);
                    }
                    
                    var class_name = $(this).val();
                    
                    if (class_name)
                    {
                        $(target).addClass(class_name);
                        $(this).data(feature + "-prev-class", class_name);
                    }                    
                });

                $(this).change(function()
                {
                    $(this).trigger(events.toggleClass);
                });
            }
            else
            {
                var class_name = $(this).data(feature + "-class");

                if (!class_name)
                {
                    console.error("data-" + feature + "-class is not defined in html");
                    return;
                }
                
                if ($(this).applyOnce(feature))
                {
                    if (tag == "input")
                    {
                        if ($(this).is(":checkbox"))
                        {
                            $(this).on(events.toggleClass, function()
                            {
                                if ($(this).prop("checked"))
                                {
                                    $(target).addClass(class_name);
                                }
                                else
                                {
                                    $(target).removeClass(class_name);
                                }
                            });

                            $(this).change(function()
                            {
                                $(this).trigger(events.toggleClass);
                            });
                        }
                    }
                    else
                    {
                        $(this).on(events.toggleClass, function()
                        {
                            if ( !$(target).hasClass(class_name) )
                            {
                                $(target).addClass(class_name);
                            }
                            else
                            {
                                $(target).removeClass(class_name);
                            }
                        });

                        $(this).click(function()
                        {
                            $(this).trigger(events.toggleClass);
                        });
                    }
                }
            }
        });
    },
    copyText: function ()
    {
        var feature = "sr-copy-text";
        
        var events = {
            copy : feature + ".copy",
        };
        
        return this.each(function ()
        {
            var src = $(this).data(feature + "-src");
            
            if (!src)
            {
                console.error("data-" + feature + "-src is not defined in html");
                return;
            }
            
            if ($(this).applyOnce(feature))
            {
                $(this).on(events.copy, function()
                {
                    var tag = $(src).tagName();
                    var will_remove = false;
                    if (tag == "input" && $(src).attr("type") == "text")
                    {
                        var obj = $(src);
                    }
                    else
                    {
                        var obj = $("<input>");
                        $("body").append(obj);
                        obj.val($(src).text().trim());
                        will_remove = true;
                    }
                    
                    obj.select();
                    document.execCommand("copy");
                    
                    $.toast({
                        text: 'Coppied',
                        position: 'bottom-center',
                        stack: false
                    })
                    
                    if (will_remove)
                    {
                        obj.remove();
                    }
                });
                
                $(this).click(function ()
                {
                    $(this).trigger(events.copy);
                });
            }
        });
    },
    ajaxLoad: function (callback)
    {
        var feature = "sr-ajax-load";
        
        var events = {
            get : feature + ".get",
        };
        
        return this.each(function ()
        {
            var _this = $(this);
            
            var url = $(this).data(feature + "-url");
            
            if (!url)
            {
                console.error("data-" + feature + "-url is not defined in html");
                return;
            }
            
            var target = $(this).data(feature + "-target");
            
            if (!target)
            {
                console.error("data-" + feature + "-target is not defined in html");
                return;
            }
            
            var auto_load = $(this).getBoolFromData(feature + "-auto-load", false);
            
            var auto_load_js = $(this).getBoolFromData(feature + "-auto-load-js", true);
            
            var load_once = $(this).getBoolFromData(feature + "-load-once", true);
            
            if ($(this).applyOnce(feature))
            {
                $(this).on(events.get, function ()
                {
                    if (load_once)
                    {
                        var is_load = $(target).getBoolFromData(feature + "-is_load", false);
                        if (is_load)
                        {
                            return;
                        }
                    }

                    $(target).load(url, function ()
                    {
                        $(target).data(feature + "-is_load", 1);
                        
                        if (auto_load_js)
                        {
                            $(target).find("script").each(function ()
                            {
                                eval($(this).html());
                            });
                        }
                        
                        if (typeof callback == "function")
                        {
                            callback(_this, target, url);
                        }
                    });

                });

                if (auto_load)
                {
                    $(this).trigger(events.get);
                }
            }
        });
    },
    ajaxJSON: function (callback)
    {
        var feature = "sr-ajax-json";
        
        var events = {
            get : feature + ".get",
        };
        
        return this.each(function ()
        {
            var _this = $(this);
            
            var url = $(this).data(feature + "-url");
            
            if (!url)
            {
                console.error("data-" + feature + "-url is not defined in html");
                return;
            }
            
            if ($(this).applyOnce(feature))
            {
                $(this).on(events.get, function()
                {
                    $.get(url, function (response)
                    {
                        try
                        {
                            response = JSON.parse(response);
                        } 
                        catch (e)
                        {
                            bootbox.alert(response);
                            return;
                        }

                        if (typeof callback == "function")
                        {
                            callback(_this, url, response);
                        }
                        else
                        {
                            bootbox.alert(response["msg"]);
                        }
                    });

                    return false;
                });
                
                $(this).click(function()
                {
                    $(this).trigger(events.get);
                });
                
            }
        });
    },
    srParagraph: function ()
    {
        var feature = "sr-paragraph";
        
        var events = {
            moreText : feature + ".moreText",
            lessText : feature + ".lessText",
        };
        
        return this.each(function ()
        {
            var _this = $(this);
            
            var max = $(this).data(feature + "-max");
            
            if (!max)
            {
                console.error("data-" + feature + "-max is not defined in html");
                return;
            }
            
            if ($(this).applyOnce(feature))
            {
                max = parseInt(max);

                var content = _this.html();

                if (content.length > max)
                {
                    var less_content = content.substr(0, max);

                    var html = '<span class="' + feature + '-less-text-block">' + less_content + '<br/><a class="' + feature + '-more-text-opener">...More</a></span>';
                    html += '<span class="' + feature + '-more-text-block hidden">' + content + '<br/><a class="' + feature + '-less-text-opener">...Less</a></span>';

                    $(this).html(html);
                    
                    var _this = $(this);

                    _this.on(events.lessText, function()
                    {
                        _this.find("." + feature + "-more-text-block").addClass("hidden");
                        _this.find("." + feature + "-less-text-block").removeClass("hidden");
                    });

                    _this.on(events.moreText, function()
                    {                        
                        _this.find("." + feature + "-less-text-block").addClass("hidden");
                        _this.find("." + feature + "-more-text-block").removeClass("hidden");
                    });

                    _this.find("." + feature + "-more-text-opener").click(function ()
                    {
                        $(this).trigger(events.moreText);
                    });

                    _this.find("." + feature + "-less-text-opener").click(function ()
                    {
                        $(this).trigger(events.lessText);
                    });
                }
            }
        });
    },
    invalidChar: function (invalid_chars)
    {
        var feature = "sr-invalid-char";
        
        var events = {
            validate : feature + ".validate",
        };
        
        if (typeof invalid_chars != "array")
        {
            console.error(feature + " invalid_chars list should be pass in args");
            return;
        }
        
        return this.each(function ()
        {
            var error_span = $(this).parent().append('<span class="' + feature + '-error-message error-message hidden">&#9679 Invalid Character</span>');
            
            $(this).on(events.validate, function()
            {
                error_span.addClass("hidden");
                
                var v = $(this).val();
                
                var result = true;
                
                invalid_chars.each(function(i, invalid_char)
                {
                    if (v.indexOf(invalid_char) >= 0)
                    {
                        error_span.removeClass("hidden");                        
                        result = false;
                    }
                });
                
                return result;
            });
            
            $(this).keyup(function (event)
            {
                return $(this).trigger(events.validate);
            });
        });
    },
    invalidURLChar: function ()
    {
        var invalid_chars = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "+", "=", "{", "}", "[", "]", ":", ";", '"', "'", "<", ">", ",", ".", "?", "/", "\\", "|"];
        $(this).invalidChar(invalid_chars);
    },
    invalidSqlChar: function ()
    {
        var invalid_chars = ["`", "~", "!", "#", "$", "%", "&", "=", ":", ";", '"', "'", "<", ">", "\\", "|", ","];
        $(this).invalidChar(invalid_chars);
    },
    srTextarea: function ()
    {
        var feature = "sr-text-area";
        
        return this.each(function ()
        {
            var min = $(this).data(feature + "-min");
            
            if (!min)
            {
                console.error("data-" + feature + "-min is not defined in html");
                return;
            }
            
            min = parseInt(min);
            
            var limit = $(this).data(feature + "-limit");
            
            if (!limit)
            {
                console.error("data-" + feature + "-limit is not defined in html");
                return;
            }
            
            limit = parseInt(limit);
            
            var tag = $(this).tagName();
            
            if (tag != "textarea" && !(tag == "input" && $(this).attr('type') == "text"))
            {
                console.error(feature + " will only implement on textarea or text input");
                return;
            }
            
            if ($(this).applyOnce(feature))
            {
                $(this).parent().append('<span class="' + feature + '-info help-block"></span>');
                var span_info = $(this).parent().find("." + feature + "-info");

                $(this).parent().append('<span class="' + feature + '-error-message error-message"></span>');
                var span_error = $(this).parent().find("." + feature + "-error-message");

                $(this).keydown(function (e)
                {
                    var keyCode = e.which;
                    
                    var len = $(this).val().length;
                    if (len > limit)
                    {
                        span_error.html("Max Limit is " + limit);
                        span_error.show();
                        
                        console.log(keyCode);
                        if (
                            //function keys
                            keyCode < 112 && keyCode > 123 
                            && $.inArray(keyCode, [8, 9, 16, 27, 37, 38, 39, 40, 46, ]) === -1
                        )
                        {
                            return false;
                        }
                    }
                    else
                    {
                        span_info.html("Min. : " + min + ", Max. : " + limit + ", Characters : " + len);
                        span_error.hide();
                    }

                    return true;
                });

                $(this).blur(function ()
                {
                    if ($(this).val().length < min)
                    {
                        span_error.html("Minimum character should be " + min);
                        span_error.show();
                    } 
                    else
                    {
                        span_error.hide();
                    }
                });
            }
        });
    },
    srTableTemplate : function(opt)
    {
        var feature = "sr-table-template";
        
        var events = {
            addRow : feature + ".addRow",
            delRow : feature + ".delRow",
            upRow : feature + ".upRow",
            downRow : feature + ".downRow",
            refresh : feature + ".refresh",
            getPlaceholder : feature + ".getPlaceholder",
        };
        
        var methods = {
            
        };
        
        var selector = {
            row : "> tbody > tr",
            templateRow : "." + feature + "-row",
            add : "." + feature + "-add",
            delete : "." + feature + "-delete",
            moveUp : "." + feature + "-move-up",
            moveDown : "." + feature + "-move-down",
        };
        
        var dataKeys = {
            rowId : feature + "-row-id"
        };
        
        var placeholder = {
            id : "sr-counter",
            counter : "sr-counter",
        };
        
        var settings = $.extend({
            brace_type : "{{",
            beforeRowAdd : function() { return true},
            beforeRowDel : function() { return true},
            afterRowAdd : function() { return true},
            afterRowDel : function() { return true},
        }, opt);
        

        this.each(function () 
        {
            var _table = $(this);

            var minimum_row = _table.data(feature + "-min-row");
            if (jQuery.type(minimum_row) == "undefined")
            {
                minimum_row = 0;
            }
            
            _table.bind(events.refresh, function ()
            {
                _table.find(selector.delete).show();
                
                _table.find(selector.row).not(selector.templateRow).each(function (a, tr)
                {
                    if (a <= minimum_row)
                    {
                        //find in first level only
                        $(tr).children(selector.delete).hide();
                    }
                });
            });
            
            methods.getPlaceholder = function (key)
            {
                var holder = "{{" + key +"}}";
                
                if (settings.brace_type == "{")
                {
                    holder = "{" + key + "}";
                }
                else if (settings.brace_type == "[")
                {
                    holder = "[" + key + "]";
                }
                else if (settings.brace_type == "[[")
                {
                    holder = "[[" + key + "]]";
                }
                else if (settings.brace_type == "[{")
                {
                    holder = "[{" + key + "}]";
                }
                else if (settings.brace_type == "{[")
                {
                    holder = "{[" + key + "]}";
                }
                return holder;
            };
            
            _table.on(events.addRow, function()
            {
                var last_id = _table.find(selector.row).last().data(dataKeys.rowId);
                
                if (typeof last_id == "undefined")
                {
                    last_id = 0;
                }
                else
                {
                    last_id = parseInt(last_id);
                }
                last_id += 1;
                
                var result = settings.beforeRowAdd(_table, last_id);

                if (!result)
                {
                    return false;
                }
                
                var template_row = _table.children("tbody").children("tr" + selector.templateRow).html();
                
                var id_holder = methods.getPlaceholder(placeholder.id);
                var counter_holder = methods.getPlaceholder(placeholder.counter);
                
                var len = _table.find(selector.row).length - 1;
                
                var tr_html = template_row.replaceAll(id_holder, last_id);
                tr_html = tr_html.replaceAll(counter_holder, len);
                tr_html= "<tr>" + tr_html + "</tr>";
                _table.append(tr_html);
                
                var _tr = _table.find(selector.row).last();
                _tr.data(dataKeys.rowId, last_id);
                
                settings.afterRowAdd(_table, last_id, _tr);
            });
            
            _table.on(events.delRow, function(e, opt)
            {
                var _tr = opt.tr;
                var last_id = _tr.data(dataKeys.rowId);
                
                var result = settings.beforeRowDel(_table, last_id, _tr);

                if (!result)
                {
                    return false;
                }
                
                _tr.remove();
                
                settings.afterRowDel(_table, last_id);
            });
            
            _table.on(events.upRow, function(e, opt)
            {
                var _tr = opt.tr;
                var index = _tr.index();
                if (index > 0)
                {
                    index--;
                    _tr.insertBefore(_table.find("> tbody > tr:eq(" + index + ")"));
                }
            });
            
            _table.on(events.downRow, function(e, opt)
            {
                var _tr = opt.tr;
                var index = _tr.index();
                if (index < _table.find("> tbody > tr").length - 1)
                {
                    index++;
                    _tr.insertAfter(_table.find("> tbody > tr:eq(" + index + ")"));
                }
            });
            
            _table.on("click", selector.add, function()
            {
                _table.trigger(events.addRow);
            });
            
            _table.on("click", selector.delete, function()
            {
                var _tr = $(this).closest("tr");
                _table.trigger(events.delRow, { tr : _tr});
            });
            
            _table.on("click", selector.moveUp, function()
            {
                var _tr = $(this).closest("tr");
                _table.trigger(events.upRow, { tr : _tr});
            });
            
            _table.on("click", selector.moveDown, function()
            {
                var _tr = $(this).closest("tr");
                _table.trigger(events.downRow, { tr : _tr});
            });
            
            var tr_count = _table.find(selector.row).length - 1;
            
            if (tr_count < minimum_row)
            {
                for (var i = tr_count; i < minimum_row; i++)
                {
                    _table.trigger(events.addRow);
                }
            }
            
            _table.trigger(events.refresh);
        });
    }
});