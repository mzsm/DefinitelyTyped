// Type definitions for UIkit 2.9.0
// Project: http://www.getuikit.com
// Definitions by: mzsm <https://github.com/mzsm/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


/// <reference path="../jquery/jquery.d.ts"/>

declare module UIkit {
    interface Support {
        transition: {end: string};
        animation: {end: string};
        requestAnimationFrame(callback: Function): any;   //void or number;
        touch: boolean;
        mutationobserver: any;
    }

    interface PositionOffset {
        topoffset?: number;
        leftoffset?: number
    }
    interface Utils {
        debounce(func: Function, wait: number, immediate?: boolean): () => void;
        removeCssRules(selectorRegEx: RegExp): void;
        isInView(element: string, options?: PositionOffset): boolean;
        isInView(element: Element, options?: PositionOffset): boolean;
        isInView(element: Element[], options?: PositionOffset): boolean;
        isInView(element: JQuery, options?: PositionOffset): boolean;
        checkDisplay(context: Element): void;
        checkDisplay(context: JQuery): void;
        options(string: string): Object;
        options(string: Object): Object;
        template(str: string): (data: Object) => string;
        template(str: string, data: Object): string;
    }

    interface Events {
        click: string;
    }

    interface Component {
        element: JQuery;
        options: any;
        plugins: any;
        //prototype
        defaults: any;
        init(): void;

        // from jquery.d.ts ...
        /**
         * Attach an event handler function for one or more events to the selected elements.
         *
         * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
         * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false. Rest parameter args is for optional parameters passed to jQuery.trigger(). Note that the actual parameters on the event handler function must be marked as optional (? syntax).
         */
        on(events: string, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): JQuery;
        /**
         * Attach an event handler function for one or more events to the selected elements.
         *
         * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
         * @param data Data to be passed to the handler in event.data when an event is triggered.
         * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
         */
        on(events: string, data : any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): JQuery;
        /**
         * Attach an event handler function for one or more events to the selected elements.
         *
         * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
         * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
         * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
         */
        on(events: string, selector: string, handler: (eventObject: JQueryEventObject, ...eventData: any[]) => any): JQuery;
        /**
         * Attach an event handler function for one or more events to the selected elements.
         *
         * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
         * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
         * @param data Data to be passed to the handler in event.data when an event is triggered.
         * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
         */
        on(events: string, selector: string, data: any, handler: (eventObject: JQueryEventObject, ...eventData: any[]) => any): JQuery;
        /**
         * Attach an event handler function for one or more events to the selected elements.
         *
         * @param events An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
         * @param selector A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.
         * @param data Data to be passed to the handler in event.data when an event occurs.
         */
        on(events: { [key: string]: any; }, selector?: any, data?: any): JQuery;

        /**
         * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
         *
         * @param events A string containing one or more JavaScript event types, such as "click" or "submit," or custom event names.
         * @param handler A function to execute at the time the event is triggered.
         */
        one(events: string, handler: (eventObject: JQueryEventObject) => any): JQuery;
        /**
         * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
         *
         * @param events A string containing one or more JavaScript event types, such as "click" or "submit," or custom event names.
         * @param data An object containing data that will be passed to the event handler.
         * @param handler A function to execute at the time the event is triggered.
         */
        one(events: string, data: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;
        /**
         * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
         *
         * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
         * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
         * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
         */
        one(events: string, selector: string, handler: (eventObject: JQueryEventObject) => any): JQuery;
        /**
         * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
         *
         * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
         * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
         * @param data Data to be passed to the handler in event.data when an event is triggered.
         * @param handler A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
         */
        one(events: string, selector: string, data: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
        /**
         * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
         *
         * @param events An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
         * @param selector A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.
         * @param data Data to be passed to the handler in event.data when an event occurs.
         */
        one(events: { [key: string]: any; }, selector?: string, data?: any): JQuery;

        /**
         * Remove an event handler.
         */
        off(): JQuery;
        /**
         * Remove an event handler.
         *
         * @param events One or more space-separated event types and optional namespaces, or just namespaces, such as "click", "keydown.myPlugin", or ".myPlugin".
         */
        off(events: string): JQuery;
        /**
         * Remove an event handler.
         *
         * @param events An object where the string keys represent one or more space-separated event types and optional namespaces, and the values represent handler functions previously attached for the event(s).
         */
        off(events: { [key: string]: any; }): JQuery;

        /**
         * Execute all handlers and behaviors attached to the matched elements for the given event type.
         *
         * @param eventType A string containing a JavaScript event type, such as click or submit.
         * @param extraParameters Additional parameters to pass along to the event handler.
         */
        trigger(eventType: string, extraParameters?: any[]): JQuery;
        /**
         * Execute all handlers and behaviors attached to the matched elements for the given event type.
         *
         * @param eventType A string containing a JavaScript event type, such as click or submit.
         * @param extraParameters Additional parameters to pass along to the event handler.
         */
        trigger(eventType: string, extraParameters?: Object): JQuery;
        /**
         * Execute all handlers and behaviors attached to the matched elements for the given event type.
         *
         * @param event A jQuery.Event object.
         * @param extraParameters Additional parameters to pass along to the event handler.
         */
        trigger(event: JQueryEventObject, extraParameters?: any[]): JQuery;
        /**
         * Execute all handlers and behaviors attached to the matched elements for the given event type.
         *
         * @param event A jQuery.Event object.
         * @param extraParameters Additional parameters to pass along to the event handler.
         */
        trigger(event: JQueryEventObject, extraParameters?: Object): JQuery;

        /**
         * Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
         *
         * @param selector A string containing a selector expression to match elements against.
         */
        find(selector: string): JQuery;
        /**
         * Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
         *
         * @param element An element to match elements against.
         */
        find(element: Element): JQuery;
        /**
         * Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
         *
         * @param obj A jQuery object to match elements against.
         */
        find(obj: JQuery): JQuery;
        // ... from jquery.d.ts

        proxy(obj: Component, methods: string): void;
        mixin(obj: Component, methods: string): void;
    }
    interface DefaultOptions {
        plugins?: Object;
    }

    interface StackMarginOptions extends DefaultOptions{
        cls?: string;
    }
    interface StackMargin extends Component {
        defaults: StackMarginOptions;
        columns: JQuery;
        process(): StackMargin;
        revert(): StackMargin;
    }

    interface AlertOptions extends DefaultOptions {
        fade?: boolean;
        duration?: number;
        trigger?: string;
    }
    interface Alert extends Component {
        defaults: AlertOptions;
        close(): void;
    }

    interface ButtonRadioOptions extends DefaultOptions {
        target?: string;
    }
    interface ButtonRadio extends Component {
        defaults: ButtonRadioOptions;
        getSelected(): JQuery;
    }

    interface ButtonCheckboxOptions extends ButtonRadioOptions {
    }
    interface ButtonCheckbox extends ButtonRadio {
        defaults: ButtonCheckboxOptions;
    }

    interface ButtonOptions extends DefaultOptions {
    }
    interface Button extends Component {
        defaults: ButtonOptions;
        toggle(): void;
    }

    interface DropdownOptions extends DefaultOptions {
        mode?: string;
        remaintime?: number;
        justify?: boolean;
        boundary?: any;
        delay?: number;
    }
    interface Dropdown extends Component {
        defaults: DropdownOptions;
        remainIdle: boolean;
        show(): void;
        registerOuterClick(): void;
        checkDimensions(): void;
        dropdown: JQuery;
        centered: boolean;
        justified: boolean;
        boundary: JQuery;
        flipped: boolean;
    }

    interface GridMatchHeightOptions extends DefaultOptions {
        target?: boolean;
        row?: boolean;
    }
    interface GridMatchHeight extends Component {
        defaults: GridMatchHeightOptions;
        match(): GridMatchHeight;
        revert(): GridMatchHeight;
        matchHeights(): void;
        columns: JQuery;
        elements: JQuery;
    }

    interface GridMarginOptions extends DefaultOptions {
        cls?: string;
    }
    interface GridMargin extends Component {
        defualts: GridMarginOptions;
    }

    interface ModalOptions extends DefaultOptions {
        keyboard?: boolean;
        bgclose?: boolean;
        minScrollHeight?: number;
    }

    interface Modal extends Component {
        defaluts: ModalOptions;
        scrollable: boolean;
        transition: any; /* {end: string} or boolean */
        toggle(): Modal;
        show(): Modal;
        hide(force?: boolean): Modal;
        resize(): void;
        updateScrollable(): void;
        _hide(): JQuery;
        isActive(): boolean;
    }
    interface ModalDialog {
        (content: string, options?: ModalOptions): Modal;
        (content: number, options?: ModalOptions): Modal;
        (content: Element, options?: ModalOptions): Modal;
        (content: JQuery, options?: ModalOptions): Modal;
        template: string;
    }

    interface ModalTrigger extends Component {
        modal: Modal;
    }

    interface Offcanvas {
        show(element: string): void;
        show(element: Element): void;
        show(element: JQuery): void;
        hide(force?: boolean): void;
    }

    interface OffcanvasTrigger extends Component {
    }

    interface NavOptions extends DefaultOptions {
        toggle?: string;
        lists?: string;
        multiple?: boolean;
    }
    interface Nav extends Component {
        defaults: NavOptions;
        open(li: string, noanimation?: boolean): void;
        open(li: Element, noanimation?: boolean): void;
        open(li: JQuery, noanimation?: boolean): void;
    }

    interface TooltipOptions extends DefaultOptions {
        offset?: number;
        pos?: string;
        animation?: boolean;
        delay?: number;
        cls?: string;
        src?: any; /* string or () => string */
    }
    interface Tooltip extends Component {
        defaults: TooltipOptions;
        tip: string;
        show(): void;
        hide(): void;
        content(): string;
        checkBoundary(left: number, top: number, width: number, height: number): string;
    }

    interface SwitcherOptions extends DefaultOptions {
        connect?: any; /* JQuery or string or boolean(false) */
        toggle?: string;
        active?: any; /* JQuery or string or number */
    }
    interface Switcher extends Component {
        defaults: SwitcherOptions;
        show(tab: string): void;
        show(tab: number): void;
        show(tab: Element): void;
        show(tab: JQuery): void;
        connect?: JQuery;
        index?: number;
    }

    interface TabOptions extends DefaultOptions {
        target?: string;
        connect?: any; /* JQuery or string or boolean(false) */
        active?: any; /* JQuery or string or number */
    }
    interface ResponsiveTab extends JQuery {
        dropdown: JQuery;
        lst: JQuery;
        caption: JQuery;
    }
    interface Tab extends Component {
        defaults: TabOptions;
        check(): void;
        connect?: JQuery;
        responsivetab: ResponsiveTab;
    }

    interface ScrollspyOptions extends DefaultOptions {
        cls?: string;
        initcls?: string;
        topoffset?: number;
        leftoffset?: number;
        repeat?: boolean;
        delay?: number;
    }
    interface Scrollspy extends Component {
        defaults: ScrollspyOptions;
        check(): void;
    }

    interface ScrollspynavOptions extends DefaultOptions {
        cls?: string;
        closest?: any; /* JQuery or string or boolean(false) */
        topoffset?: number;
        leftoffset?: number;
        smoothscroll?: boolean;
    }
    interface Scrollspynav extends Component {
        defaults: ScrollspynavOptions;
        check(): void;
    }

    interface SmoothScrollOptions extends DefaultOptions {
        duration?: number;
        transition?: string;
        offset?: number;
        complete?: Function;
    }
    interface SmoothScroll extends Component {
        defaults: SmoothScrollOptions;
    }

    interface ToggleOptions extends DefaultOptions {
        target?: any; /* JQuery or string or boolean(false) */
        cls?: string;
    }
    interface Toggle extends Component {
        defaults: ToggleOptions;
        totoggle: any; /* JQuery or Array */
        toggle(): void;
        getTogglers(): void;
    }

    interface UIkit {
        version: string;
        $doc: Document;
        $win: Window;
        //fn(command: string, options?: any): UIkit;
        component(name: string, def: Object): (element: any, options: any) => void;
        support: Support;
        Utils: Utils;
        events: Events;
        langdirection: string;
        domObservers: any[];
        domObserve(selector: string, fn: Function): void;
        ready(fn: (document: Document) => any): void;

        stackMargin(element: string, options?: StackMarginOptions): StackMargin;
        stackMargin(element: Element, options?: StackMarginOptions): StackMargin;
        stackMargin(element: JQuery, options?: StackMarginOptions): StackMargin;
        alert(element: string, options?: AlertOptions): Alert;
        alert(element: Element, options?: AlertOptions): Alert;
        alert(element: JQuery, options?: AlertOptions): Alert;
        buttonRadio(element: string, options?: ButtonRadioOptions): ButtonRadio;
        buttonRadio(element: Element, options?: ButtonRadioOptions): ButtonRadio;
        buttonRadio(element: JQuery, options?: ButtonRadioOptions): ButtonRadio;
        buttonCheckbox(element: string, options?: ButtonCheckboxOptions): ButtonCheckbox;
        buttonCheckbox(element: Element, options?: ButtonCheckboxOptions): ButtonCheckbox;
        buttonCheckbox(element: JQuery, options?: ButtonCheckboxOptions): ButtonCheckbox;
        button(element: string, options?: ButtonOptions): Button;
        button(element: Element, options?: ButtonOptions): Button;
        button(element: JQuery, options?: ButtonOptions): Button;
        dropdown(element: string, options?: DropdownOptions): Dropdown;
        dropdown(element: Element, options?: DropdownOptions): Dropdown;
        dropdown(element: JQuery, options?: DropdownOptions): Dropdown;
        gridMatchHeight(element: string, options?: GridMatchHeightOptions): GridMatchHeight;
        gridMatchHeight(element: Element, options?: GridMatchHeightOptions): GridMatchHeight;
        gridMatchHeight(element: JQuery, options?: GridMatchHeightOptions): GridMatchHeight;
        gridMargin(element: string, options?: GridMarginOptions): GridMargin;
        gridMargin(element: Element, options?: GridMarginOptions): GridMargin;
        gridMargin(element: JQuery, options?: GridMarginOptions): GridMargin;
        modal: {
            (element: string, options?: ModalOptions): Modal;
            (element: Element, options?: ModalOptions): Modal;
            (element: JQuery, options?: ModalOptions): Modal;
            dialog: ModalDialog;
            alert(content: string, options?: ModalOptions): void;
            confirm(content: string, options?: ModalOptions): void;
        };
        modalTrigger(element: string, options?: DefaultOptions): ModalTrigger;
        modalTrigger(element: Element, options?: DefaultOptions): ModalTrigger;
        modalTrigger(element: JQuery, options?: DefaultOptions): ModalTrigger;
        offcanvas: Offcanvas;
        offcanvasTrigger(element: string, options?: DefaultOptions): OffcanvasTrigger;
        offcanvasTrigger(element: Element, options?: DefaultOptions): OffcanvasTrigger;
        offcanvasTrigger(element: JQuery, options?: DefaultOptions): OffcanvasTrigger;
        nav(element: string, options?: NavOptions): Nav;
        nav(element: Element, options?: NavOptions): Nav;
        nav(element: JQuery, options?: NavOptions): Nav;
        tooltip(element: string, options?: TooltipOptions): Tooltip;
        tooltip(element: Element, options?: TooltipOptions): Tooltip;
        tooltip(element: JQuery, options?: TooltipOptions): Tooltip;
        switcher(element: string, options?: SwitcherOptions): Switcher;
        switcher(element: Element, options?: SwitcherOptions): Switcher;
        switcher(element: JQuery, options?: SwitcherOptions): Switcher;
        tab(element: string, options?: TabOptions): Tab;
        tab(element: Element, options?: TabOptions): Tab;
        tab(element: JQuery, options?: TabOptions): Tab;
        scrollspy(element: string, options?: ScrollspyOptions): Scrollspy;
        scrollspy(element: Element, options?: ScrollspyOptions): Scrollspy;
        scrollspy(element: JQuery, options?: ScrollspyOptions): Scrollspy;
        scrollspynav(element: string, options?: ScrollspynavOptions): Scrollspynav;
        scrollspynav(element: Element, options?: ScrollspynavOptions): Scrollspynav;
        scrollspynav(element: JQuery, options?: ScrollspynavOptions): Scrollspynav;
        smoothScroll(element: string, options?: SmoothScrollOptions): SmoothScroll;
        smoothScroll(element: Element, options?: SmoothScrollOptions): SmoothScroll;
        smoothScroll(element: JQuery, options?: SmoothScrollOptions): SmoothScroll;
        toggle(element: string, options?: ToggleOptions): Toggle;
        toggle(element: Element, options?: ToggleOptions): Toggle;
        toggle(element: JQuery, options?: ToggleOptions): Toggle;
    }
}

interface JQueryStatic {
    UIkit: UIkit.UIkit;
}

interface JQuery {
    uk(command: string, ...options: any[]): JQuery;
    swipe(callback: Function): JQuery;
    swipeLeft(callback: Function): JQuery;
    swipeRight(callback: Function): JQuery;
    swipeUp(callback: Function): JQuery;
    swipeDown(callback: Function): JQuery;
    doubleTap(callback: Function): JQuery;
    tap(callback: Function): JQuery;
    singleTap(callback: Function): JQuery;
    longTap(callback: Function): JQuery;
}