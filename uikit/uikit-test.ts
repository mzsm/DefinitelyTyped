/// <reference path="./uikit.d.ts"/>

module Core {
    var dummyStr:string;
    dummyStr = $.UIkit.version;
    var dummyDoc:Document = $.UIkit.$doc;
    var dummyWin:Window = $.UIkit.$win;

    var newComponent = $.UIkit.component('foo', {
        init: function () {
        }
    });

    dummyStr = $.UIkit.langdirection;
}

module TouchEvent {
    var jqobj: JQuery = $('.foo')
        .uk('button')
        .swipe(function(){ return false; })
        .swipeLeft(function(){ return false; })
        .swipeRight(function(){ return false; })
        .swipeUp(function(){ return false; })
        .swipeDown(function(){ return false; })
        .doubleTap(function(){ return false; })
        .tap(function(){ return false; })
        .singleTap(function(){ return false; })
        .longTap(function(){ return false; });
}

module Support {
    if($.UIkit.support.transition){
        var dummyStr: string = $.UIkit.support.transition.end;
    }

    if($.UIkit.support.animation){
        var dummyStr: string = $.UIkit.support.animation.end;
    }

    $.UIkit.support.requestAnimationFrame(function(){});

    var dummyBool: boolean = $.UIkit.support.touch;

    new $.UIkit.support.mutationobserver();
}

module Utils {
    var dummyBool: boolean;
    var dummyStr: string;
    var dummyObj: Object;

    var selector: string = '.foo';
    var jqobj: JQuery = $(selector);
    var elem: Element = jqobj.get(0);
    var elemArray: Element[] = [jqobj.get(0), jqobj.get(1)];

    $.UIkit.Utils.debounce(function(){}, 50);
    $.UIkit.Utils.debounce(function(){}, 50, false);

    $.UIkit.Utils.removeCssRules(/\.uk-(?!navbar).*:hover/);

    var optionEmpty = {};
    var optionTop = {topoffset: 10};
    var optionLeft = {leftoffset: 10};
    var optionBoth = {topoffset: 10, leftoffset: 10};
    dummyBool = $.UIkit.Utils.isInView(selector);
    dummyBool = $.UIkit.Utils.isInView(selector, optionEmpty);
    dummyBool = $.UIkit.Utils.isInView(selector, optionTop);
    dummyBool = $.UIkit.Utils.isInView(selector, optionLeft);
    dummyBool = $.UIkit.Utils.isInView(selector, optionBoth);
    dummyBool = $.UIkit.Utils.isInView(jqobj);
    dummyBool = $.UIkit.Utils.isInView(jqobj, optionEmpty);
    dummyBool = $.UIkit.Utils.isInView(jqobj, optionTop);
    dummyBool = $.UIkit.Utils.isInView(jqobj, optionLeft);
    dummyBool = $.UIkit.Utils.isInView(jqobj, optionBoth);
    dummyBool = $.UIkit.Utils.isInView(elem);
    dummyBool = $.UIkit.Utils.isInView(elem, optionEmpty);
    dummyBool = $.UIkit.Utils.isInView(elem, optionTop);
    dummyBool = $.UIkit.Utils.isInView(elem, optionLeft);
    dummyBool = $.UIkit.Utils.isInView(elem, optionBoth);
    dummyBool = $.UIkit.Utils.isInView(elemArray, optionEmpty);
    dummyBool = $.UIkit.Utils.isInView(elemArray, optionTop);
    dummyBool = $.UIkit.Utils.isInView(elemArray, optionLeft);
    dummyBool = $.UIkit.Utils.isInView(elemArray, optionBoth);

    $.UIkit.Utils.checkDisplay(jqobj);
    $.UIkit.Utils.checkDisplay(elem);

    dummyObj = $.UIkit.Utils.options('{"foo":"bar", "baz": 2}');
    dummyObj = $.UIkit.Utils.options({"foo":"bar", "baz": 2});

    var templateStr: string = '<ul>{{~items}}<li>{{$item.value}}</li>{{/items}}</ul>';
    var payload = {"items": [{"value": "foo"}, {"value": "bar"}]};
    var tpl = $.UIkit.Utils.template(templateStr);
    dummyStr = tpl(payload);
    dummyStr = $.UIkit.Utils.template(templateStr, payload);
}

module Events {
    var dummyStr: string = $.UIkit.events.click;
}

module Components {
    var selector: string = '.foo';
    var jqobj: JQuery = $(selector);
    var elem: Element = jqobj.get(0);

    module StackMargin {
        var dummyJQ: JQuery;
        $.UIkit.stackMargin(selector);
        $.UIkit.stackMargin(jqobj);
        $.UIkit.stackMargin(elem);
        $.UIkit.stackMargin(elem, {cls: 'bar'});
        dummyJQ = $.UIkit.stackMargin(selector).columns;
        var dummy: UIkit.StackMargin = $.UIkit.stackMargin(jqobj).process();
        dummy = $.UIkit.stackMargin(elem).revert();

        var component: UIkit.Component = $.UIkit.stackMargin(elem);
        component.init();
        dummyJQ = component.on('click', function(eventObject: JQueryEventObject){ return false; });
        dummyJQ = component.on('click', {value: 1}, function(eventObject: JQueryEventObject){ return eventObject.data.value; });
        dummyJQ = component.on('click', selector, function(eventObject: JQueryEventObject){ return false; });
        dummyJQ = component.on('click', selector, {value: 1}, function(eventObject: JQueryEventObject){ return eventObject.data.value; });
        dummyJQ = component.on({
            'click': function(eventObject: JQueryEventObject){ return false; }
        });
        dummyJQ = component.on({
            'click': function(eventObject: JQueryEventObject){ return false; }
        }, selector);
        dummyJQ = component.on({
            'click': function(eventObject: JQueryEventObject){ return eventObject.data.value; }
        }, {value: 1});
        dummyJQ = component.on({
            'click': function(eventObject: JQueryEventObject){ return eventObject.data.value; }
        }, selector, {value: 1});
        dummyJQ = component.one('click', function(eventObject: JQueryEventObject){ return false; });
        dummyJQ = component.one('click', {value: 1}, function(eventObject: JQueryEventObject){ return eventObject.data.value; });
        dummyJQ = component.one('click', selector, function(eventObject: JQueryEventObject){ return false; });
        dummyJQ = component.one('click', selector, {value: 1}, function(eventObject: JQueryEventObject){ return eventObject.data.value; });
        dummyJQ = component.one({
            'click': function(eventObject: JQueryEventObject){ return false; }
        });
        dummyJQ = component.one({
            'click': function(eventObject: JQueryEventObject){ return false; }
        }, selector);
        //component.one({
        //    'click': function(eventObject: JQueryEventObject){ return eventObject.data.value; }
        //}, {value: 1});
        dummyJQ = component.one({
            'click': function(eventObject: JQueryEventObject){ return eventObject.data.value; }
        }, selector, {value: 1});
        dummyJQ = component.off();
        dummyJQ = component.off('click');
        dummyJQ = component.off({
            'click': function(eventObject: JQueryEventObject){ return false; }
        });
        dummyJQ = component.trigger('click');
        dummyJQ = component.trigger('click', ['foo', 'bar']);
        dummyJQ = component.trigger('click', {foo: 'bar'});
        dummyJQ = component.find(selector);
        dummyJQ = component.find(jqobj);
        dummyJQ = component.find(elem);
        component.proxy($.UIkit.stackMargin(elem), "show hide isActive");
        component.mixin($.UIkit.stackMargin(elem), "show hide isActive");
    }
    module Alert {

    }
}

module Modal {
    // from http://getuikit.com/docs/modal.html
    var modal = $.UIkit.modal(".modalSelector");
    if ( modal.isActive() ) {
        modal.hide();
    } else {
        modal.show();
    }
}