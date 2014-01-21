(function () {
    "use strict";

    function countDangerousPollutants(pollutants) {
        return pollutants.filter(function(pollutant) {
            return (pollutant.normPercent > 100);
        }).length;
    }

    function updateBadge(data) {
        var count = countDangerousPollutants(data.pollutants);

        chrome.browserAction.setBadgeText({text: '' + count});
        chrome.browserAction.setBadgeBackgroundColor({
            color: (count > 0) ? '#FF0000' : '#00FF00'
        });
    }

    function saveData(data) {
        //append download date
        data.downloadDate = (new Date()).toString();

        chrome.storage.local.set(data);

        console.log('Data updated.', new Date());
    }

    function loadingFailed() {
        console.warn('Data loading failed.', new Date());
    }

    function checkForStatusChanges(newData) {
        var deferred = new $.Deferred();

        chrome.storage.local.get(function(oldData) {
            if(oldData && oldData.pollutants) {
                var oldValue = countDangerousPollutants(oldData.pollutants),
                    newValue = countDangerousPollutants(newData.pollutants),
                    title = null,
                    msg = null;

                if(oldValue === 0 && newValue > 0) {
                    title = "Smog Notification";
                    msg = "Pollution just got really bad, consider staying at home (" + newValue + " pollutant(s) exceeded their norms).";
                } else if(newValue === 0 && oldValue > 0) {
                    title = "Smog Notification";
                    msg = "It's safe to go outside again. There are no pollutants that exceed their norms at the moment.";
                }

                if(title !== null && msg !== null) {
                    //ATM only osx, windows and chrome os support chrome.notifications
                    if(chrome.notifications) {
                        chrome.notifications.create("smog msg", {
                            type: "basic",
                            title: title,
                            message: msg,
                            iconUrl: 'img/icon_64.png'
                        }, function(){});
                    } else if(window.Notification) {
                        //we use default HTML5 notifications for Linux
                        new Notification(title, {body: msg});
                    }
                }
            }

            deferred.resolve(newData);
        });

        return deferred.promise();
    }

    function updateData() {
        $.when( $.getJSON('http://smogalert.pl/api/stats/krakow-krasinskiego') )
            .then(checkForStatusChanges)
            .done(saveData)
            .done(updateBadge)
            .fail(loadingFailed);
    }

    //this runs only once - when extension is loaded/installed/enabled, everything outside this callback runs every time
    //background page is reloaded
    chrome.runtime.onInstalled.addListener(function(){
        chrome.alarms.create("Get pollution info", {
            periodInMinutes: 60
        });

        //load data right away
        updateData();
    });

    //load data every X minutes
    chrome.alarms.onAlarm.addListener(updateData);
})();