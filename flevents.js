// ---------------------------------------------------------------------------
// Purpose of this class:
// ----------------------
// To easily add eventlisteners to formfields
//
// Usage:
// ------
// 
//   function handletypechangesubtype(event, idx = 0) {
//     console.log("function handletypechangesubtype called " + idx);
//   }
//   function handletypechangename(event, idx = 0) {
//     console.log("function handletypechangename called " + idx);
//   }
//   function handleprodtypechange(event, idx = 0) {
//      console.log("function handleprodtypechange called " + idx);
//   }
//   function initializeEvents() {
//      let testelement = document.getElementById("myId");
//      const eventhandler = new FLEventHandler();
//      eventhandler.addEvent().setEventType("change").setEventSenderId("fldtypeid").addEventReceiver("handletypechangesubtype").addEventReceiver("handletypechangename");
//      eventhandler.addEvent().setEventType("change").setEventSenderName("fldprodtype[]").addEventReceiver("handleprodtypechange");
//      eventhandler.addEvent().setEventType("click").setEventSender(testelement).addEventReceiver("handleprodtypechange");
//      eventhandler.activate();
//   }
//   FLFunctions.pageLoaded(initializeEvents());
//
// Dependencies:
// -------------
// Needs the FLFunctions class (provided in flfunctions.js)
// if you want to load the events after page loaded
//
// Extra events (non-standard javascript events)
// ---------------------------------------------
// if you use an event of type 'enterkey' on a text input field it
// may be used to trigger something when pressing enter on the field. 
// ---------------------------------------------------------------------------

class FLEvent {
    _type = "change";
    _sender = "";           // set the sender by element
    _sendername = "";       // you can set the sender either by name (for formfields for example)
    _senderid = "";         // or by id, for html elements that don't have a name property, or by blockid. Blockid is used to 
    // for mutationobserver. (typically this will be used to monitor changes anywhere in a div, article or span). Set Blockid to the id of the div, or whatever you want
    // to monitor.
    _senderblockid = "";    // 
    _receivers = new Set();

    setEventType(type = "change") {
        this._type = type;
        return this;
    }
    setEventSenderName(name) {
        this._sendername = name;
        this._sender = "";
        this._senderid = "";        // if name is set, then id can't be set.
        this._senderblockid = "";   // if name is set, then blockid can't be set.
        return this;
    }
    setEventSender(el) {
        this._sender = el;
        this._senderid = "";
        this._sendername = "";      // if id is set, then name can't be set.
        this._senderblockid = "";   // if id is set, then blockid can't be set.
        return this;
    }
    setEventSenderId(id) {
        this._senderid = id;
        this._sender = "";
        this._sendername = "";      // if id is set, then name can't be set.
        this._senderblockid = "";   // if id is set, then blockid can't be set.
        return this;
    }
    setEventSenderBlockId(id) {
        this._senderblockid = id;
        this._sender = "";
        this._senderid = "";        // if blockid is set, then id can't be set.
        this._sendername = "";      // if blockid is set, then name can't be set.
        return this;
    }
    addEventReceiver(handlerfunction = "") {
        this._receivers.add(handlerfunction);
        return this;
    }
    attachEventListenerByName() {
        // first check if the senderelement is part of an array (for example: text input fields in a table with name in the form of name="customername[]"
        // therefor we need the senderelement loop
        let senderel = document.getElementsByName(this._sendername);
        if (senderel.length > 0) {
            for (let i = 0; i < senderel.length; i++) {
                if (this._type === "enterkey") {
                    for (let receiver of this._receivers) {
                        senderel[i].addEventListener("keyup", function (e) {
                            e.preventDefault();
                            if (e.keyCode === 13) {
                                window[receiver](e, i);
                            }
                        });
                    }
                } else {
                    for (let receiver of this._receivers) {
                        senderel[i].addEventListener(this._type, function (e) {
                            window[receiver](e, i);
                        });
                    }
                }
            }
        }
    }
    attachEventListenerByElement() {
        let senderel = this._sender;
        for (let receiver of this._receivers) {
                if (this._type === "enterkey") {
                    for (let receiver of this._receivers) {
                        senderel.addEventListener("keyup", function (e) {
                            e.preventDefault();
                            if (e.keyCode === 13) {
                                window[receiver](e);
                            }
                        });
                    }
                } else {
                    senderel.addEventListener(this._type, function (e) {
                        window[receiver](e);
                    });
                }
        }
    }
    attachEventListenerById() {
        let senderel = document.getElementById(this._senderid);
        for (let receiver of this._receivers) {
                if (this._type === "enterkey") {
                    for (let receiver of this._receivers) {
                        senderel.addEventListener("keyup", function (e) {
                            e.preventDefault();
                            if (e.keyCode === 13) {
                                window[receiver](e);
                            }
                        });
                    }
                } else {
                    senderel.addEventListener(this._type, function (e) {
                        window[receiver](e);
                    });
                }
        }
    }
    activate() {
        if (this._sendername !== "") {
            this.attachEventListenerByName();
        } else {
            if (this._senderid !== "") {
                this.attachEventListenerById();
            } else {
                if (this._sender !== "") {
                    this.attachEventListenerByElement();
                }
            }
        }
    }

}

class FLEventHandler {
    _events = new Set();

    addEvent() {
        let eventinstance = new FLEvent();
        this._events.add(eventinstance);
        return eventinstance;
    }

    activate() {
        for (let event of this._events) {
            event.activate();
        }
    }
}