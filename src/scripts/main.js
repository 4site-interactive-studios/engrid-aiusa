const tippy = require('tippy.js').default;

document.onreadystatechange = () => {    
    if(document.readyState === "interactive" || document.readyState === "complete"){
        // Render Critical because it moves DOM elements that can be above the fold
        // Has also been added to the Page Template after main.js in a <script> tag that fires after DomContentLoaded
        let inlineMonthlyUpsell = document.querySelectorAll('.move-after-transaction-recurrfreq')[0];
        let recurrFrequencyField = document.querySelectorAll('.en__field--recurrfreq')[0];
        if (inlineMonthlyUpsell && recurrFrequencyField) {
          recurrFrequencyField.insertAdjacentElement("beforeend", inlineMonthlyUpsell);
          // inlineMonthlyUpsell.style.visibility='visible';
        }

        let inlineDonationAmountHeader = document.querySelectorAll('.move-before-transaction-donationamt')[0];
        let donationAmtField = document.querySelectorAll('.en__field--donationAmt')[0];
        if (inlineDonationAmountHeader && donationAmtField) {
          donationAmtField.insertAdjacentElement("afterbegin", inlineDonationAmountHeader);
          // inlineGiftAmountHeader.style.visibility='visible';
        }

        // Add placeholder to the Mobile Phone Field
        let enFieldMobilePhone = document.querySelectorAll('input#en__field_supporter_NOT_TAGGED_13')[0];
        if(enFieldMobilePhone){
            enFieldMobilePhone.placeholder = "Phone Number";
        }

        let enFieldAddressLine2 = document.querySelectorAll('input#en__field_supporter_address2')[0];
        if(enFieldAddressLine2){
          enFieldAddressLine2.placeholder = "#000";
        }
        
        let enFieldPostalCode = document.querySelectorAll('input#en__field_supporter_postcode')[0];
        if(enFieldPostalCode){
          enFieldPostalCode.placeholder = "00000";
        }
        
        let enFieldPhoneNumber = document.querySelectorAll('input#en__field_supporter_phoneNumber')[0];
        if(enFieldPhoneNumber){
          enFieldPhoneNumber.placeholder = "Phone Number";
        }

        // Add "Why is this required?" markup to the Title field
        // Only show it if the Title field is marked as required
        let titleLabel = document.querySelectorAll('.en__field--title.en__mandatory > label')[0];
        if(titleLabel){
            let el = document.createElement('span');
            let childEl = document.createElement('a');
            childEl.href='#';
            childEl.id = 'title-tooltip';
            childEl.className="label-tooltip";
            childEl.tabIndex="-1";
            childEl.innerText="Why is this required?";
            childEl.addEventListener('click',e=>e.preventDefault());
            el.appendChild(childEl);
            titleLabel.appendChild(el);
            tippy("#title-tooltip", {
              content:
                "The U.S. Senate is now requiring that all letters include a title. Please select one in order to ensure that your action lands in the inbox of your Senator.",
            });
        }        

        // Add "what's this" markup to the CVV field
        let ccvvLabel = document.querySelectorAll('.en__field--ccvv > label')[0];
        if(ccvvLabel){
            let el = document.createElement('span');
            let childEl = document.createElement('a');
            childEl.href='#';
            childEl.id = 'ccv-tooltip';
            childEl.className="label-tooltip";
            childEl.tabIndex="-1";
            childEl.innerText="What's this?";
            childEl.addEventListener('click',e=>e.preventDefault());
            el.appendChild(childEl);
            ccvvLabel.appendChild(el);
            tippy("#ccv-tooltip", {
              content:
                "The three or four digit security code on your debit or credit card",
            });
        }

        // Conversion Tracking if this is a thank you page
        if(typeof pageJson !== 'undefined' && pageJson.giftProcess && typeof dataLayer !== 'undefined') {
          // In the upsell portion of the engrid-scripts/packages/common, we are setting 'original' to the one-time donation amount if the donor was upsold
          let upsell = (window.sessionStorage.getItem('original')) ? window.sessionStorage.getItem('original') : 'No value';
          let quantity = 1;
          let total = pageJson.amount;
          // Defaulting to 'Recurring' for recurring donations in case the transactionExtra object isn't defined
          // That way those looking at the analytics data will understand that the total isn't necessarily correct because we don't know the quantity
          let frequency = (pageJson.recurring) ? 'Recurring' : 'One Time';

          // Fallbacks in case the transactionExtra object isn't defined
          let te_exists = (typeof transactionExtra !== 'undefined');
          let te_frequency = (te_exists && transactionExtra.frequency) ? transactionExtra.frequency : 'Unknown';
          let te_city = (te_exists && transactionExtra.city) ? transactionExtra.city : 'Unknown';
          let te_state = (te_exists && transactionExtra.state) ? transactionExtra.state : 'Unknown';

          switch(te_frequency) {
            case 'MONTHLY':
              frequency = 'Monthly';
              quantity = 12;
              total = 12 * pageJson.amount;
              let monthlyReceipt = document.getElementById('monthlyReceipt');
              if(monthlyReceipt) {
                monthlyReceipt.style.display = 'block';
              }
              break;
            case 'ANNUAL':
              frequency = 'Annual';
              let annualReceipt = document.getElementById('annualReceipt');
              if(annualReceipt) {
                annualReceipt.style.display = 'block';
              }
              break;
            default:
              break;
          }

          // Push analytics data and other custom GTM variables
          dataLayer.push({
            'en_transaction_amount' : total, // custom variable in GTM
            'en_payment_amount'     : pageJson.amount, // original payment amount not *12 for monthly gifts
            'en_transaction_id'     : pageJson.donationLogId, // custom variable in GTM
            'en_campaign_id'        : pageJson.campaignId,
            'transactionId'         : pageJson.donationLogId, 
            'transactionAffiliation': 'Donation Form',
            'transactionTotal'      : total,
            'transactionTax'        : 0,
            'transactionShipping'   : 0,
            'transactionCity'       : te_city,
            'transactionState'      : te_state,
            'transactionCountry'    : pageJson.country,
            'transactionProducts'   : [{
                id: pageJson.donationLogId,
                quantity: quantity,
                name: pageJson.pageName,
                price: pageJson.amount,
                sku: pageJson.campaignId,
                category: frequency
              }],
            'transactionPromoCode'  : upsell,
            'successful_donation'   : 'main form (EN)', // custom variable/event for GA
            'event'                 : frequency, // event used to determine transaction frequency for tag placement
            'donation_type'         : frequency
          });

          dataLayer.push({
            'event': 'en_donation' // used to signal that we're on the thank you page instead of url/parameters
          });
        }

        // Close's the menu when tapping the close button on mobile
        const menuBtn = document.querySelector('a[role="menuitem"]');
        
        // @TODO Make this a passive event listener to improce scrolling performance: https://web.dev/uses-passive-event-listeners/?utm_source=lighthouse&utm_medium=unknown
        menuBtn.addEventListener('touchstart', function(event){
          const menu = document.querySelector('ul#main-menu ul[role="menu"]');
          if(menu.style.display==="block"){
            menu.style.display="none";
            menuBtn.setAttribute('aria-expanded','false');
          }
        });

        // Menu copied from: https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html#
        // @TODO Move to this package https://github.com/NickDJM/accessible-menu/blob/HEAD/docs/basics/two-level-menu-with-toggle.md

        // MenubarItemLinks.js
        /*
        *   This content is licensed according to the W3C Software License at
        *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
        */
        var MenubarItem = function (domNode, menuObj) {

        this.menu = menuObj;
        this.domNode = domNode;
        this.popupMenu = false;

        this.hasFocus = false;
        this.hasHover = false;

        this.isMenubarItem = true;

        this.keyCode = Object.freeze({
        'TAB': 9,
        'RETURN': 13,
        'ESC': 27,
        'SPACE': 32,
        'PAGEUP': 33,
        'PAGEDOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT': 37,
        'UP': 38,
        'RIGHT': 39,
        'DOWN': 40
        });
        };

        MenubarItem.prototype.init = function () {
        this.domNode.tabIndex = -1;

        this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
        this.domNode.addEventListener('focus', this.handleFocus.bind(this));
        this.domNode.addEventListener('blur', this.handleBlur.bind(this));
        this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
        this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

        // Initialize pop up menus

        var nextElement = this.domNode.nextElementSibling;

        if (nextElement && nextElement.tagName === 'UL') {
        this.popupMenu = new PopupMenu(nextElement, this);
        this.popupMenu.init();
        }

        };

        MenubarItem.prototype.handleKeydown = function (event) {
        var tgt = event.currentTarget,
        char = event.key,
        flag = false,
        clickEvent;

        function isPrintableCharacter (str) {
        return str.length === 1 && str.match(/\S/);
        }

        switch (event.keyCode) {
        case this.keyCode.SPACE:
        case this.keyCode.RETURN:
        case this.keyCode.DOWN:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToFirstItem();
            flag = true;
          }
          break;

        case this.keyCode.LEFT:
          this.menu.setFocusToPreviousItem(this);
          flag = true;
          break;

        case this.keyCode.RIGHT:
          this.menu.setFocusToNextItem(this);
          flag = true;
          break;

        case this.keyCode.UP:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToLastItem();
            flag = true;
          }
          break;

        case this.keyCode.HOME:
        case this.keyCode.PAGEUP:
          this.menu.setFocusToFirstItem();
          flag = true;
          break;

        case this.keyCode.END:
        case this.keyCode.PAGEDOWN:
          this.menu.setFocusToLastItem();
          flag = true;
          break;

        case this.keyCode.TAB:
          this.popupMenu.close(true);
          break;

        case this.keyCode.ESC:
          this.popupMenu.close(true);
          break;

        default:
          if (isPrintableCharacter(char)) {
            this.menu.setFocusByFirstCharacter(this, char);
            flag = true;
          }
          break;
        }

        if (flag) {
        event.stopPropagation();
        event.preventDefault();
        }
        };

        MenubarItem.prototype.setExpanded = function (value) {
        if (value) {
        this.domNode.setAttribute('aria-expanded', 'true');
        }
        else {
        this.domNode.setAttribute('aria-expanded', 'false');
        }
        };

        MenubarItem.prototype.handleFocus = function (event) {
        this.menu.hasFocus = true;
        };

        MenubarItem.prototype.handleBlur = function (event) {
        this.menu.hasFocus = false;
        };

        MenubarItem.prototype.handleMouseover = function (event) {
        this.hasHover = true;
        this.popupMenu.open();
        };

        MenubarItem.prototype.handleMouseout = function (event) {
        this.hasHover = false;
        setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
        };

        // MenubarLinks.js
        /*
        *   This content is licensed according to the W3C Software License at
        *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
        */

        var Menubar = function (domNode) {
        var elementChildren,
        msgPrefix = 'Menubar constructor argument menubarNode ';

        // Check whether menubarNode is a DOM element
        if (!(domNode instanceof Element)) {
        throw new TypeError(msgPrefix + 'is not a DOM Element.');
        }

        // Check whether menubarNode has descendant elements
        if (domNode.childElementCount === 0) {
        throw new Error(msgPrefix + 'has no element children.');
        }

        // Check whether menubarNode has A elements
        var e = domNode.firstElementChild;
        while (e) {
        var menubarItem = e.firstElementChild;
        if (e && menubarItem && menubarItem.tagName !== 'A') {
          throw new Error(msgPrefix + 'has child elements are not A elements.');
        }
        e = e.nextElementSibling;
        }

        this.isMenubar = true;

        this.domNode = domNode;

        this.menubarItems = []; // See Menubar init method
        this.firstChars = []; // See Menubar init method

        this.firstItem = null; // See Menubar init method
        this.lastItem = null; // See Menubar init method

        this.hasFocus = false; // See MenubarItem handleFocus, handleBlur
        this.hasHover = false; // See Menubar handleMouseover, handleMouseout
        };

        /*
        *   @method Menubar.prototype.init
        *
        *   @desc
        *       Adds ARIA role to the menubar node
        *       Traverse menubar children for A elements to configure each A element as a ARIA menuitem
        *       and populate menuitems array. Initialize firstItem and lastItem properties.
        */
        Menubar.prototype.init = function () {
        var menubarItem, childElement, menuElement, textContent, numItems;


        // Traverse the element children of menubarNode: configure each with
        // menuitem role behavior and store reference in menuitems array.
        var elem = this.domNode.firstElementChild;

        while (elem) {
        menuElement = elem.firstElementChild;

        if (elem && menuElement && menuElement.tagName === 'A') {
          menubarItem = new MenubarItem(menuElement, this);
          menubarItem.init();
          this.menubarItems.push(menubarItem);
          textContent = menuElement.textContent.trim();
          this.firstChars.push(textContent.substring(0, 1).toLowerCase());
        }

        elem = elem.nextElementSibling;
        }

        // Use populated menuitems array to initialize firstItem and lastItem.
        numItems = this.menubarItems.length;
        if (numItems > 0) {
        this.firstItem = this.menubarItems[ 0 ];
        this.lastItem = this.menubarItems[ numItems - 1 ];
        }
        this.firstItem.domNode.tabIndex = 0;
        };

        /* FOCUS MANAGEMENT METHODS */

        Menubar.prototype.setFocusToItem = function (newItem) {

        var flag = false;

        for (var i = 0; i < this.menubarItems.length; i++) {
        var mbi = this.menubarItems[i];

        if (mbi.domNode.tabIndex == 0) {
          flag = mbi.domNode.getAttribute('aria-expanded') === 'true';
        }

        mbi.domNode.tabIndex = -1;
        if (mbi.popupMenu) {
          mbi.popupMenu.close();
        }
        }

        newItem.domNode.focus();
        newItem.domNode.tabIndex = 0;

        if (flag && newItem.popupMenu) {
        newItem.popupMenu.open();
        }
        };

        Menubar.prototype.setFocusToFirstItem = function (flag) {
        this.setFocusToItem(this.firstItem);
        };

        Menubar.prototype.setFocusToLastItem = function (flag) {
        this.setFocusToItem(this.lastItem);
        };

        Menubar.prototype.setFocusToPreviousItem = function (currentItem) {
        var index;

        if (currentItem === this.firstItem) {
        newItem = this.lastItem;
        }
        else {
        index = this.menubarItems.indexOf(currentItem);
        newItem = this.menubarItems[ index - 1 ];
        }

        this.setFocusToItem(newItem);

        };

        Menubar.prototype.setFocusToNextItem = function (currentItem) {
        var index;

        if (currentItem === this.lastItem) {
        newItem = this.firstItem;
        }
        else {
        index = this.menubarItems.indexOf(currentItem);
        newItem = this.menubarItems[ index + 1 ];
        }

        this.setFocusToItem(newItem);

        };

        Menubar.prototype.setFocusByFirstCharacter = function (currentItem, char) {
        var start, index;
        var flag = currentItem.domNode.getAttribute('aria-expanded') === 'true';

        char = char.toLowerCase();

        // Get start index for search based on position of currentItem
        start = this.menubarItems.indexOf(currentItem) + 1;
        if (start === this.menubarItems.length) {
        start = 0;
        }

        // Check remaining slots in the menu
        index = this.getIndexFirstChars(start, char);

        // If not found in remaining slots, check from beginning
        if (index === -1) {
        index = this.getIndexFirstChars(0, char);
        }

        // If match was found...
        if (index > -1) {
        this.setFocusToItem(this.menubarItems[ index ]);
        }
        };

        Menubar.prototype.getIndexFirstChars = function (startIndex, char) {
        for (var i = startIndex; i < this.firstChars.length; i++) {
        if (char === this.firstChars[ i ]) {
          return i;
        }
        }
        return -1;
        };

        // PopupMenuItemLinks.js
        /*
        *   This content is licensed according to the W3C Software License at
        *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
        */
        var MenuItem = function (domNode, menuObj) {

        if (typeof popupObj !== 'object') {
        var popupObj = false;
        }

        this.domNode = domNode;
        this.menu = menuObj;
        this.popupMenu = false;
        this.isMenubarItem = false;

        this.keyCode = Object.freeze({
        'TAB': 9,
        'RETURN': 13,
        'ESC': 27,
        'SPACE': 32,
        'PAGEUP': 33,
        'PAGEDOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT': 37,
        'UP': 38,
        'RIGHT': 39,
        'DOWN': 40
        });
        };

        MenuItem.prototype.init = function () {
        this.domNode.tabIndex = -1;

        this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
        this.domNode.addEventListener('click', this.handleClick.bind(this));
        this.domNode.addEventListener('focus', this.handleFocus.bind(this));
        this.domNode.addEventListener('blur', this.handleBlur.bind(this));
        this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
        this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

        // Initialize flyout menu

        var nextElement = this.domNode.nextElementSibling;

        if (nextElement && nextElement.tagName === 'UL') {
        this.popupMenu = new PopupMenu(nextElement, this);
        this.popupMenu.init();
        }

        };

        MenuItem.prototype.isExpanded = function () {
        return this.domNode.getAttribute('aria-expanded') === 'true';
        };

        /* EVENT HANDLERS */

        MenuItem.prototype.handleKeydown = function (event) {
        var tgt  = event.currentTarget,
        char = event.key,
        flag = false,
        clickEvent;

        function isPrintableCharacter (str) {
        return str.length === 1 && str.match(/\S/);
        }

        switch (event.keyCode) {
        case this.keyCode.SPACE:
        case this.keyCode.RETURN:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToFirstItem();
          }
          else {

            // Create simulated mouse event to mimic the behavior of ATs
            // and let the event handler handleClick do the housekeeping.
            try {
              clickEvent = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
            }
            catch (err) {
              if (document.createEvent) {
                // DOM Level 3 for IE 9+
                clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('click', true, true);
              }
            }
            tgt.dispatchEvent(clickEvent);
          }

          flag = true;
          break;

        case this.keyCode.UP:
          this.menu.setFocusToPreviousItem(this);
          flag = true;
          break;

        case this.keyCode.DOWN:
          this.menu.setFocusToNextItem(this);
          flag = true;
          break;

        case this.keyCode.LEFT:
          this.menu.setFocusToController('previous', true);
          this.menu.close(true);
          flag = true;
          break;

        case this.keyCode.RIGHT:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToFirstItem();
          }
          else {
            this.menu.setFocusToController('next', true);
            this.menu.close(true);
          }
          flag = true;
          break;

        case this.keyCode.HOME:
        case this.keyCode.PAGEUP:
          this.menu.setFocusToFirstItem();
          flag = true;
          break;

        case this.keyCode.END:
        case this.keyCode.PAGEDOWN:
          this.menu.setFocusToLastItem();
          flag = true;
          break;

        case this.keyCode.ESC:
          this.menu.setFocusToController();
          this.menu.close(true);
          flag = true;
          break;

        case this.keyCode.TAB:
          this.menu.setFocusToController();
          break;

        default:
          if (isPrintableCharacter(char)) {
            this.menu.setFocusByFirstCharacter(this, char);
            flag = true;
          }
          break;
        }

        if (flag) {
        event.stopPropagation();
        event.preventDefault();
        }
        };

        MenuItem.prototype.setExpanded = function (value) {
        if (value) {
        this.domNode.setAttribute('aria-expanded', 'true');
        }
        else {
        this.domNode.setAttribute('aria-expanded', 'false');
        }
        };

        MenuItem.prototype.handleClick = function (event) {
        this.menu.setFocusToController();
        this.menu.close(true);
        };

        MenuItem.prototype.handleFocus = function (event) {
        this.menu.hasFocus = true;
        };

        MenuItem.prototype.handleBlur = function (event) {
        this.menu.hasFocus = false;
        setTimeout(this.menu.close.bind(this.menu, false), 300);
        };

        MenuItem.prototype.handleMouseover = function (event) {
        this.menu.hasHover = true;
        this.menu.open();
        if (this.popupMenu) {
        this.popupMenu.hasHover = true;
        this.popupMenu.open();
        }
        };

        MenuItem.prototype.handleMouseout = function (event) {
        if (this.popupMenu) {
        this.popupMenu.hasHover = false;
        this.popupMenu.close(true);
        }

        this.menu.hasHover = false;
        setTimeout(this.menu.close.bind(this.menu, false), 300);
        };

        // PopupMenuLinks.js
        /*
        *   This content is licensed according to the W3C Software License at
        *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
        */
        var PopupMenu = function (domNode, controllerObj) {
        var elementChildren,
        msgPrefix = 'PopupMenu constructor argument domNode ';

        // Check whether domNode is a DOM element
        if (!(domNode instanceof Element)) {
        throw new TypeError(msgPrefix + 'is not a DOM Element.');
        }
        // Check whether domNode has child elements
        if (domNode.childElementCount === 0) {
        throw new Error(msgPrefix + 'has no element children.');
        }
        // Check whether domNode descendant elements have A elements
        var childElement = domNode.firstElementChild;
        while (childElement) {
        var menuitem = childElement.firstElementChild;
        if (menuitem && menuitem === 'A') {
          throw new Error(msgPrefix + 'has descendant elements that are not A elements.');
        }
        childElement = childElement.nextElementSibling;
        }

        this.isMenubar = false;

        this.domNode    = domNode;
        this.controller = controllerObj;

        this.menuitems = []; // See PopupMenu init method
        this.firstChars = []; // See PopupMenu init method

        this.firstItem = null; // See PopupMenu init method
        this.lastItem = null; // See PopupMenu init method

        this.hasFocus = false; // See MenuItem handleFocus, handleBlur
        this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout
        };

        /*
        *   @method PopupMenu.prototype.init
        *
        *   @desc
        *       Add domNode event listeners for mouseover and mouseout. Traverse
        *       domNode children to configure each menuitem and populate menuitems
        *       array. Initialize firstItem and lastItem properties.
        */
        PopupMenu.prototype.init = function () {
        var childElement, menuElement, menuItem, textContent, numItems, label;

        // Configure the domNode itself

        this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
        this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

        // Traverse the element children of domNode: configure each with
        // menuitem role behavior and store reference in menuitems array.
        childElement = this.domNode.firstElementChild;

        while (childElement) {
        menuElement = childElement.firstElementChild;

        if (menuElement && menuElement.tagName === 'A') {
          menuItem = new MenuItem(menuElement, this);
          menuItem.init();
          this.menuitems.push(menuItem);
          textContent = menuElement.textContent.trim();
          this.firstChars.push(textContent.substring(0, 1).toLowerCase());
        }
        childElement = childElement.nextElementSibling;
        }

        // Use populated menuitems array to initialize firstItem and lastItem.
        numItems = this.menuitems.length;
        if (numItems > 0) {
        this.firstItem = this.menuitems[ 0 ];
        this.lastItem = this.menuitems[ numItems - 1 ];
        }
        };

        /* EVENT HANDLERS */

        PopupMenu.prototype.handleMouseover = function (event) {
        this.hasHover = true;
        };

        PopupMenu.prototype.handleMouseout = function (event) {
        this.hasHover = false;
        setTimeout(this.close.bind(this, false), 1);
        };

        /* FOCUS MANAGEMENT METHODS */

        PopupMenu.prototype.setFocusToController = function (command, flag) {

        if (typeof command !== 'string') {
        command = '';
        }

        function setFocusToMenubarItem (controller, close) {
        while (controller) {
          if (controller.isMenubarItem) {
            controller.domNode.focus();
            return controller;
          }
          else {
            if (close) {
              controller.menu.close(true);
            }
            controller.hasFocus = false;
          }
          controller = controller.menu.controller;
        }
        return false;
        }

        if (command === '') {
        if (this.controller && this.controller.domNode) {
          this.controller.domNode.focus();
        }
        return;
        }

        if (!this.controller.isMenubarItem) {
        this.controller.domNode.focus();
        this.close();

        if (command === 'next') {
          var menubarItem = setFocusToMenubarItem(this.controller, false);
          if (menubarItem) {
            menubarItem.menu.setFocusToNextItem(menubarItem, flag);
          }
        }
        }
        else {
        if (command === 'previous') {
          this.controller.menu.setFocusToPreviousItem(this.controller, flag);
        }
        else if (command === 'next') {
          this.controller.menu.setFocusToNextItem(this.controller, flag);
        }
        }

        };

        PopupMenu.prototype.setFocusToFirstItem = function () {
        this.firstItem.domNode.focus();
        };

        PopupMenu.prototype.setFocusToLastItem = function () {
        this.lastItem.domNode.focus();
        };

        PopupMenu.prototype.setFocusToPreviousItem = function (currentItem) {
        var index;

        if (currentItem === this.firstItem) {
        this.lastItem.domNode.focus();
        }
        else {
        index = this.menuitems.indexOf(currentItem);
        this.menuitems[ index - 1 ].domNode.focus();
        }
        };

        PopupMenu.prototype.setFocusToNextItem = function (currentItem) {
        var index;

        if (currentItem === this.lastItem) {
        this.firstItem.domNode.focus();
        }
        else {
        index = this.menuitems.indexOf(currentItem);
        this.menuitems[ index + 1 ].domNode.focus();
        }
        };

        PopupMenu.prototype.setFocusByFirstCharacter = function (currentItem, char) {
        var start, index;

        char = char.toLowerCase();

        // Get start index for search based on position of currentItem
        start = this.menuitems.indexOf(currentItem) + 1;
        if (start === this.menuitems.length) {
        start = 0;
        }

        // Check remaining slots in the menu
        index = this.getIndexFirstChars(start, char);

        // If not found in remaining slots, check from beginning
        if (index === -1) {
        index = this.getIndexFirstChars(0, char);
        }

        // If match was found...
        if (index > -1) {
        this.menuitems[ index ].domNode.focus();
        }
        };

        PopupMenu.prototype.getIndexFirstChars = function (startIndex, char) {
        for (var i = startIndex; i < this.firstChars.length; i++) {
        if (char === this.firstChars[ i ]) {
          return i;
        }
        }
        return -1;
        };

        /* MENU DISPLAY METHODS */

        PopupMenu.prototype.open = function () {
        // Get position and bounding rectangle of controller object's DOM node
        var rect = this.controller.domNode.getBoundingClientRect();

        // Set CSS properties
        if (!this.controller.isMenubarItem) {
        this.domNode.parentNode.style.position = 'relative';
        this.domNode.style.display = 'block';
        this.domNode.style.position = 'absolute';
        this.domNode.style.left = rect.width + 'px';
        this.domNode.style.zIndex = 100;
        }
        else {
        this.domNode.style.display = 'block';
        this.domNode.style.position = 'absolute';
        //this.domNode.style.top = (rect.height - 1) + 'px';
        this.domNode.style.zIndex = 100;
        }

        this.controller.setExpanded(true);

        };

        PopupMenu.prototype.close = function (force) {

        var controllerHasHover = this.controller.hasHover;

        var hasFocus = this.hasFocus;

        for (var i = 0; i < this.menuitems.length; i++) {
        var mi = this.menuitems[i];
        if (mi.popupMenu) {
          hasFocus = hasFocus | mi.popupMenu.hasFocus;
        }
        }

        if (!this.controller.isMenubarItem) {
        controllerHasHover = false;
        }

        if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
        this.domNode.style.display = 'none';
        this.domNode.style.zIndex = 0;
        this.controller.setExpanded(false);
        }
        };

        var menubar = new Menubar(document.getElementById('main-menu'));
        if(menubar){
          menubar.init();
        }

  }
};
