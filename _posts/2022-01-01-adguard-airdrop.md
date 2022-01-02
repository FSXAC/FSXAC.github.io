---
title: AirDrop not working? AdGuard installed? Here's the Workaround
date: 2022-01-01
---

AirDrop is a feature of the Apple ecosystem that allows easy file transfer across devices. 
But for the last couple of months I just couldn't figure out why I cannot send files from my Mac to my other Apple devices.
I could receive using AirDrop just fine -- which indicates it's not an issue with bluetooth or WiFi on my Mac.

I've tried everything that a Google search might suggest, turning WiFi, bluetooth, computer off and on, doing updates etc.
Then I realized this has to be a network issue, so I started looking through all the apps I installed that may affect network -- and *AdGuard* stuck out.

How AdGuard works is that it essentially sets up a local mini-VPN such that network traffic flow through here.
This is where AdGuard blocks ads before websites gets rendered on the browser.

However, recently it's been noted [^1] that AirDrop affects Apple Bourjour service -- a network service that powers AirDrop.
Luckily, there is a workaroud:

1. Open the AdGuard settings panel (either through the app, or the browser extension) by clicking on the gear icon.
2. From the menu bar, click on *AdGuard*, then select Advanced > Advanced Settings
3. Find the entry `network.extension.monterey.force.split.tunnel` and set the value to `true`
4. Done.

Now my AirDrop works flawlessly with AdGuard turned on.

**Update**: Apparently, as of December 2021, the team behind AdGuard has rolled out an update in beta (2.7.0+) that fixes this issue.
But it's been weeks since the patch and I still haven't gotten my update (I installed AdGuard through Setapp) so I personally still find this workaround useful.


Thanks for reading!

[^1]: [Incompatibility with AirDrop on macOS Monterey](https://github.com/AdguardTeam/AdguardForMac/issues/973)
