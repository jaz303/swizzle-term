module.exports = function(window, document) {
    global.window = window;
    global.document = document;

    var hk = require('hudkit');

    var rootPane = hk.init(document.body);
    rootPane.setResizeDelay(0);

    var tabs = new hk.TabPane();

    rootPane.setRootWidget(tabs);

    var nextId = 1;

    function newTerminal() {
        var console = new hk.Console();
        tabs.addTab("Term " + (nextId++), console, true);
    }

    function closeActiveTerminal() {
        tabs.removeActiveTab();
    }

    function previousTab() {
        var ix = tabs.activeIndex() - 1;
        if (ix < 0) ix = tabs.tabCount() - 1;
        tabs.selectTabAtIndex(ix);
    }

    function nextTab() {
        var ix = tabs.activeIndex() + 1;
        if (ix >= tabs.tabCount()) ix = 0;
        tabs.selectTabAtIndex(ix);
    }

    document.addEventListener('keydown', function(evt) {
        if (evt.metaKey) {
            if (evt.keyCode === 84) {
                newTerminal();
            } else if (evt.keyCode === 87) {
                closeActiveTerminal();
                if (tabs.tabCount() > 0) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            } else if (evt.shiftKey) {
                if (evt.keyCode === 219) {
                    previousTab();
                } else if (evt.keyCode === 221) {
                    nextTab();
                }
            }
        }
    });

    newTerminal();

}