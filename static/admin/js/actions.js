/*global gettext, interpolate, ngettext*/
'use strict';
{
    function show(selector) {
        document.querySelectorAll(selector).forEach(function(el) {
            el.classList.remove('hidden');
    ***REMOVED***);
***REMOVED***

    function hide(selector) {
        document.querySelectorAll(selector).forEach(function(el) {
            el.classList.add('hidden');
    ***REMOVED***);
***REMOVED***

    function showQuestion(options) {
        hide(options.acrossClears);
        show(options.acrossQuestions);
        hide(options.allContainer);
***REMOVED***

    function showClear(options) {
        show(options.acrossClears);
        hide(options.acrossQuestions);
        document.querySelector(options.actionContainer).classList.remove(options.selectedClass);
        show(options.allContainer);
        hide(options.counterContainer);
***REMOVED***

    function reset(options) {
        hide(options.acrossClears);
        hide(options.acrossQuestions);
        hide(options.allContainer);
        show(options.counterContainer);
***REMOVED***

    function clearAcross(options) {
        reset(options);
        document.querySelector(options.acrossInput).value = 0;
        document.querySelector(options.actionContainer).classList.remove(options.selectedClass);
***REMOVED***

    function checker(actionCheckboxes, options, checked) {
        if (checked) {
            showQuestion(options);
    ***REMOVED*** else {
            reset(options);
    ***REMOVED***
        actionCheckboxes.forEach(function(el) {
            el.checked = checked;
            el.closest('tr').classList.toggle(options.selectedClass, checked);
    ***REMOVED***);
***REMOVED***

    function updateCounter(actionCheckboxes, options) {
        const sel = Array.from(actionCheckboxes).filter(function(el) {
            return el.checked;
    ***REMOVED***).length;
        const counter = document.querySelector(options.counterContainer);
        // data-actions-icnt is defined in the generated HTML
        // and contains the total amount of objects in the queryset
        const actions_icnt = Number(counter.dataset.actionsIcnt);
        counter.textContent = interpolate(
            ngettext('%(sel)s of %(cnt)s selected', '%(sel)s of %(cnt)s selected', sel), {
                sel: sel,
                cnt: actions_icnt
    ***REMOVED*** true);
        const allToggle = document.getElementById(options.allToggleId);
        allToggle.checked = sel === actionCheckboxes.length;
        if (allToggle.checked) {
            showQuestion(options);
    ***REMOVED*** else {
            clearAcross(options);
    ***REMOVED***
***REMOVED***

    const defaults = {
        actionContainer: "div.actions",
        counterContainer: "span.action-counter",
        allContainer: "div.actions span.all",
        acrossInput: "div.actions input.select-across",
        acrossQuestions: "div.actions span.question",
        acrossClears: "div.actions span.clear",
        allToggleId: "action-toggle",
        selectedClass: "selected"
***REMOVED***;

    window.Actions = function(actionCheckboxes, options) {
        options = Object.assign({***REMOVED***, defaults, options);
        let list_editable_changed = false;
        let lastChecked = null;
        let shiftPressed = false;

        document.addEventListener('keydown', (event) => {
            shiftPressed = event.shiftKey;
    ***REMOVED***);

        document.addEventListener('keyup', (event) => {
            shiftPressed = event.shiftKey;
    ***REMOVED***);

        document.getElementById(options.allToggleId).addEventListener('click', function(event) {
            checker(actionCheckboxes, options, this.checked);
            updateCounter(actionCheckboxes, options);
    ***REMOVED***);

        document.querySelectorAll(options.acrossQuestions + " a").forEach(function(el) {
            el.addEventListener('click', function(event) {
                event.preventDefault();
                const acrossInput = document.querySelector(options.acrossInput);
                acrossInput.value = 1;
                showClear(options);
        ***REMOVED***);
    ***REMOVED***);

        document.querySelectorAll(options.acrossClears + " a").forEach(function(el) {
            el.addEventListener('click', function(event) {
                event.preventDefault();
                document.getElementById(options.allToggleId).checked = false;
                clearAcross(options);
                checker(actionCheckboxes, options, false);
                updateCounter(actionCheckboxes, options);
        ***REMOVED***);
    ***REMOVED***);

        function affectedCheckboxes(target, withModifier) {
            const multiSelect = (lastChecked && withModifier && lastChecked !== target);
            if (!multiSelect) {
                return [target***REMOVED***;
        ***REMOVED***
            const checkboxes = Array.from(actionCheckboxes);
            const targetIndex = checkboxes.findIndex(el => el === target);
            const lastCheckedIndex = checkboxes.findIndex(el => el === lastChecked);
            const startIndex = Math.min(targetIndex, lastCheckedIndex);
            const endIndex = Math.max(targetIndex, lastCheckedIndex);
            const filtered = checkboxes.filter((el, index) => (startIndex <= index) && (index <= endIndex));
            return filtered;
    ***REMOVED***;

        Array.from(document.getElementById('result_list').tBodies).forEach(function(el) {
            el.addEventListener('change', function(event) {
                const target = event.target;
                if (target.classList.contains('action-select')) {
                    const checkboxes = affectedCheckboxes(target, shiftPressed);
                    checker(checkboxes, options, target.checked);
                    updateCounter(actionCheckboxes, options);
                    lastChecked = target;
            ***REMOVED*** else {
                    list_editable_changed = true;
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***);

        document.querySelector('#changelist-form button[name=index***REMOVED***').addEventListener('click', function() {
            if (list_editable_changed) {
                const confirmed = confirm(gettext("You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost."));
                if (!confirmed) {
                    event.preventDefault();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***);

        const el = document.querySelector('#changelist-form input[name=_save***REMOVED***');
        // The button does not exist if no fields are editable.
        if (el) {
            el.addEventListener('click', function(event) {
                if (document.querySelector('[name=action***REMOVED***').value) {
                    const text = list_editable_changed
                        ? gettext("You have selected an action, but you haven’t saved your changes to individual fields yet. Please click OK to save. You’ll need to re-run the action.")
                        : gettext("You have selected an action, and you haven’t made any changes on individual fields. You’re probably looking for the Go button rather than the Save button.");
                    if (!confirm(text)) {
                        event.preventDefault();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***
***REMOVED***;

    // Call function fn when the DOM is loaded and ready. If it is already
    // loaded, call the function now.
    // http://youmightnotneedjquery.com/#ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
    ***REMOVED*** else {
            document.addEventListener('DOMContentLoaded', fn);
    ***REMOVED***
***REMOVED***

    ready(function() {
        const actionsEls = document.querySelectorAll('tr input.action-select');
        if (actionsEls.length > 0) {
            Actions(actionsEls);
    ***REMOVED***
***REMOVED***);
***REMOVED***
