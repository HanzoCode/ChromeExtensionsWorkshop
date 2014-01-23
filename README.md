# Chrome Extensions Workshop - Step 2
You can implement this step using:
- background page (which is a bit simpler)
- or event page (which is more ambitious).

## TODO (Background page)
1. Create `background.js` file and set it as your background script using `background` field in the manifest. If you decide later on that you want to use some kind of a library (e.g. jQuery) on your background page, just mention it in the manifest file.
	- you can debug background pages by clicking "background page" on the "Inspect views" list on `chrome://extensions/` page
<br /><img src='http://i.imgur.com/SoM1ROy.png' alt='Inspect views: background page'/><br />
2. Add "storage" permission to your extension using `permissions` field in the manifest.
3. Implement these changes:
	- use `setInterval` on your background page to download pollution data every 60 minutes. While testing, you can set this interval to 30 seconds.
	- store downloaded data using [storage API](http://developer.chrome.com/extensions/storage.html) (`chrome.storage.local.set()`)
	- remove AJAX request from the popup and use data from the storage instead (`chrome.storage.local.get()`)
	- use `chrome.browserAction.setBadgeText` and `chrome.browserAction.setBadgeBackgroundColor` on your background page to show pollution information on the browser action button
<br /><img src="http://i.imgur.com/X3UzJtM.png" alt="Browser action button with a badge"/><br />
4. Done! If you have extra time left you can polish your extension. Check list of possible improvements below.

## TODO (Event page)
1. Create `background.js` file and set it as your background script using `background` field in the manifest. Make sure to set `persistent` to `false` so that Chrome knows that this page doesn't need to run all the time. If you decide later on that you want to use some kind of a library (e.g. jQuery) on your event page, just mention it in the manifest file.
	- you can debug event (and background) pages by clicking "background page" on the "Inspect views" list on `chrome://extensions/` page
<br /><img src='http://i.imgur.com/SoM1ROy.png' alt='Inspect views: background page'/><br />
2. Add "storage" and "alarms" permission to your extension using `permissions` field in the manifest.
3. Implement these changes:
	- use alarm API on your event page to download pollution data every 60 minutes (`chrome.alarms.create()` and `chrome.alarms.onAlarm.addListener()`). While testing, you can set this interval to 30 seconds.
	- PRO TIP: `chrome.alarms.create()` shouldn't be called every time event page is loaded because it resets the timer. Check [onInstalled](http://developer.chrome.com/extensions/runtime.html#event-onInstalled) event. Listeners, on the other hand, *should* be created every time event page is loaded.
	- store downloaded data using [storage API](http://developer.chrome.com/extensions/storage.html) (`chrome.storage.local.set()`)
	- remove AJAX request from the popup and use data from the storage instead (`chrome.storage.local.get()`)
	- use `chrome.browserAction.setBadgeText` and `chrome.browserAction.setBadgeBackgroundColor` ([*](http://developer.chrome.com/extensions/browserAction.html#method-setBadgeText)) on your event page to show pollution information on the browser action button (e.g. red badge with number of pollutants exceeding norms or green badge when air quality is OK)
<br /><img src="http://i.imgur.com/X3UzJtM.png" alt="Browser action button with a badge"/><br />
4. Done! If you have extra time left you can polish your extension. Check list of possible improvements below.

## Links
- [Browser Action](http://developer.chrome.com/extensions/browserAction.html)
- [Manifest File Format](http://developer.chrome.com/extensions/manifest.html)
- [Background Pages](http://developer.chrome.com/extensions/background_pages.html)
- [Storage API](http://developer.chrome.com/extensions/storage.html)
- [Alarms API](http://developer.chrome.com/extensions/alarms.html)

## Extra time left?
- Change text in the tooltip that appears when mouse is over the browser action button. By default this tooltip shows only extension name ("SmogKrk"), but you can dynamically (same as with badges) change it to something more useful ("SmogKrk - 1 pollutant exceeds the norms"). Use `chrome.browserAction.setTitle()`.
- Show error message in the popup when there is no data in the storage.
- You can change whole icon of the browser action button dynamically and even animate it (check [this](http://developer.chrome.com/extensions/examples/extensions/gmail.zip) sample extension).
